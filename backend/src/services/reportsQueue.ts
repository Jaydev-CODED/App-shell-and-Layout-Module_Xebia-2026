import { Queue, Worker } from 'bullmq';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { db } from './db.js';
import { REDIS_URL, USE_MOCK_REDIS } from '../config.js';
import PDFDocument from 'pdfkit';
import { stringify } from 'csv-stringify/sync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure downloads directory exists
const downloadsDir = path.resolve(__dirname, '../../public/downloads');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// Job definition
interface ReportJobData {
  reportId: string;
  title: string;
  type: string;
}

// -------------------------------------------------------------
// Real BullMQ Queue Implementation
// -------------------------------------------------------------
let reportsQueue: Queue | null = null;
let reportWorker: Worker | null = null;

if (!USE_MOCK_REDIS) {
  try {
    const connectionOpts = {
      url: REDIS_URL
    };
    
    reportsQueue = new Queue('reports-queue', { connection: connectionOpts });
    
    // Register worker
    reportWorker = new Worker('reports-queue', async (job) => {
      const { reportId, title, type } = job.data as ReportJobData;
      console.log(`[BullMQ Worker] Processing report job ${job.id} for report ${reportId}`);
      await compileReport(reportId, title, type);
    }, { connection: connectionOpts });

    reportWorker.on('completed', (job) => {
      console.log(`[BullMQ Worker] Job ${job.id} completed successfully.`);
    });

    reportWorker.on('failed', (job, err) => {
      console.error(`[BullMQ Worker] Job ${job?.id} failed:`, err);
    });
  } catch (error) {
    console.warn('[BullMQ] Failed to connect to Redis, falling back to mock queue mode:', error);
  }
}

// -------------------------------------------------------------
// Core Report Compiler (shared between mock and real queue)
// -------------------------------------------------------------
export async function compileReport(reportId: string, title: string, type: string): Promise<string> {
  // Update status in DB to PROCESSING
  await db.report.update({
    where: { id: reportId },
    data: { status: 'PROCESSING' }
  });

  // Generate unique filename
  const filename = `report_${reportId}_${Date.now()}.${type === 'CSV' ? 'csv' : 'pdf'}`;
  const filePath = path.join(downloadsDir, filename);

  // Simulate file generation (takes ~3 seconds to compile)
  await new Promise(resolve => setTimeout(resolve, 3000));

  if (type === 'CSV') {
    // Generate CSV report
    const data = [
      ['Metric', 'Value', 'Timestamp'],
      ['API Throughput', '250 rps', new Date().toISOString()],
      ['Database Connection Count', '14', new Date().toISOString()],
      ['Active Sessions', '12,482', new Date().toISOString()],
      ['CPU Usage', '42%', new Date().toISOString()],
      ['Memory Load', '68%', new Date().toISOString()]
    ];
    const csvContent = stringify(data);
    fs.writeFileSync(filePath, csvContent);
  } else {
    // Generate PDF report
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Write PDF contents
    doc.fontSize(22).text('System Status & Telemetry Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Report ID: ${reportId}`);
    doc.text(`Title: ${title}`);
    doc.text(`Generated At: ${new Date().toLocaleString()}`);
    doc.moveDown();
    doc.text('Performance Summary:');
    doc.fontSize(11).text('- System Gateway Status: Optimal (99.98% uptime)');
    doc.text('- Redis cache hits: 84.2%');
    doc.text('- Average database response latency: 12ms');
    doc.text('- Real-time Active Socket Connections: 12,482');
    doc.end();

    await new Promise<void>((resolve, reject) => {
      writeStream.on('finish', () => resolve());
      writeStream.on('error', reject);
    });
  }

  // Get file size
  const stats = fs.statSync(filePath);
  const fileSizeKb = Math.round(stats.size / 1024);

  // Update DB status to COMPLETED
  await db.report.update({
    where: { id: reportId },
    data: {
      status: 'COMPLETED',
      fileUrl: `/public/downloads/${filename}`,
      fileSizeKb,
      completedAt: new Date()
    }
  });

  console.log(`[Report Compiler] Compiled report ${reportId} size: ${fileSizeKb}KB`);
  return filename;
}

// -------------------------------------------------------------
// Enqueue Method
// -------------------------------------------------------------
export async function enqueueReportJob(reportId: string, title: string, type: string) {
  if (reportsQueue && !USE_MOCK_REDIS) {
    // Real Redis enqueue
    await reportsQueue.add(`job-${reportId}`, { reportId, title, type });
    console.log(`[Queue] Added job to real Redis queue for report ${reportId}`);
  } else {
    // Mock Queue fallback - compile in background asynchronously using setTimeout
    console.log(`[Queue Mock] Simulating async queue compilation for report ${reportId}`);
    
    // Simulate background worker trigger
    setTimeout(async () => {
      try {
        await compileReport(reportId, title, type);
      } catch (err) {
        console.error('[Queue Mock] Compilation failed:', err);
        await db.report.update({
          where: { id: reportId },
          data: { status: 'FAILED' }
        });
      }
    }, 1000);
  }
}
