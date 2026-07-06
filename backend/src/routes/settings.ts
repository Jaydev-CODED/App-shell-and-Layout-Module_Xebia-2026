import { Router, Response } from 'express';
import { z } from 'zod';
import { db } from '../services/db.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

const SettingsUpdateSchema = z.object({
  routerTransitions: z.boolean().optional(),
  routerTelemetry: z.boolean().optional(),
  routerCache: z.boolean().optional()
});

// 1. Get settings
router.get('/settings', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User session not found.' });
    }

    let settings = await db.workspaceSettings.findUnique({
      where: { userId }
    });

    // If no settings exist yet, create default settings
    if (!settings) {
      settings = await db.workspaceSettings.upsert({
        where: { userId },
        update: {},
        create: {
          userId,
          routerTransitions: true,
          routerTelemetry: true,
          routerCache: false
        }
      });
    }

    return res.status(200).json({ settings });
  } catch (error) {
    console.error('[Settings Get] Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve workspace settings.' });
  }
});

// 2. Update settings
router.put('/settings', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: 'User session not found.' });
    }

    const body = SettingsUpdateSchema.parse(req.body);

    const settings = await db.workspaceSettings.upsert({
      where: { userId },
      update: body,
      create: {
        userId,
        routerTransitions: true,
        routerTelemetry: true,
        routerCache: false,
        ...body
      }
    });

    return res.status(200).json({ 
      message: 'Workspace settings updated successfully.', 
      settings 
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('[Settings Update] Error:', error);
    return res.status(500).json({ error: 'Failed to update workspace settings.' });
  }
});

export default router;
