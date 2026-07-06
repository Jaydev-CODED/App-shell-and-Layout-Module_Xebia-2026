import { Router, Response } from 'express';
import { z } from 'zod';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { db } from '../services/db.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';
import { enqueueReportJob } from '../services/reportsQueue.js';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GenerateReportSchema = z.object({
  title: z.string().min(3),
  type: z.enum(['PDF', 'CSV'])
});

// 1. Get historical reports for user
router.get('/reports', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User session not found.' });
    }

    const reports = await db.report.findMany({
      where: { requestedBy: userId }
    });

    return res.status(200).json({ reports });
  } catch (error) {
    console.error('[Reports List] Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve reports.' });
  }
});

// 2. Enqueue an offline report generation job
router.post('/reports/generate', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User session not found.' });
    }

    const body = GenerateReportSchema.parse(req.body);

    // Create report entry in PENDING state
    const report = await db.report.create({
      data: {
        title: body.title,
        type: body.type,
        status: 'PENDING',
        requestedBy: userId
      }
    });

    // Enqueue the job asynchronously
    await enqueueReportJob(report.id, report.title, report.type);

    // Return 202 Accepted with Report details
    return res.status(202).json({
      message: 'Report generation enqueued successfully.',
      reportId: report.id,
      status: report.status
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('[Reports Generate] Error:', error);
    return res.status(500).json({ error: 'Failed to generate report.' });
  }
});

// 3. Get status of a report job
router.get('/reports/status/:id', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const report = await db.report.findUnique({
      where: { id }
    });

    if (!report) {
      return res.status(404).json({ error: 'Report job not found.' });
    }

    return res.status(200).json({
      reportId: report.id,
      status: report.status,
      fileSizeKb: report.fileSizeKb,
      completedAt: report.completedAt
    });
  } catch (error) {
    console.error('[Reports Status] Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve report status.' });
  }
});

// 4. Download generated report file
router.get('/reports/download/:id', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const report = await db.report.findUnique({
      where: { id }
    });

    if (!report) {
      return res.status(404).json({ error: 'Report not found.' });
    }

    if (report.status !== 'COMPLETED' || !report.fileUrl) {
      return res.status(400).json({ error: 'Report is not ready for download yet.' });
    }

    // Extract filename from fileUrl
    const filename = path.basename(report.fileUrl);
    const filePath = path.resolve(__dirname, '../../public/downloads', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Report file does not exist on disk.' });
    }

    // Stream download
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', report.type === 'CSV' ? 'text/csv' : 'application/pdf');
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('[Reports Download] Error:', error);
    return res.status(500).json({ error: 'Failed to download report.' });
  }
});

export default router;
