import { Router, Response } from 'express';
import { db } from '../services/db.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';
import { io } from '../index.js'; // imported from server entrypoint to emit socket updates

const router = Router();

// Store live throughput in memory
export let throughputData = [120, 150, 95, 140, 110, 190, 160, 210, 185, 230, 200, 250];

// 1. Dashboard metrics summary
router.get('/dashboard/stats', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Aggregates
    const projects = await db.project.findMany();
    
    // Average completion progress of all projects
    const totalProjects = projects.length;
    const completedProgress = projects.reduce((acc: number, p: any) => acc + p.progress, 0);
    const avgCompletion = totalProjects > 0 ? parseFloat((completedProgress / totalProjects).toFixed(1)) : 0;
    
    // In a real database, revenue might be aggregated. Here we'll return a calculated or static total
    const revenue = 48259.00;
    const activeUsers = 12482; // Handled dynamically in WS, but returned as baseline here

    return res.status(200).json({
      revenue,
      activeUsers,
      projectCompletionPercent: avgCompletion,
      totalProjects
    });
  } catch (error) {
    console.error('[Dashboard Stats] Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve stats.' });
  }
});

// 2. Throughput details
router.get('/analytics/throughput', authenticateToken as any, (req: AuthenticatedRequest, res: Response) => {
  return res.status(200).json({ throughput: throughputData });
});

// 3. Simulate spike
router.post('/analytics/simulate-spike', authenticateToken as any, (req: AuthenticatedRequest, res: Response) => {
  // Generate spiked throughput points (higher range 180-350)
  throughputData = throughputData.map(() => Math.floor(Math.random() * 170) + 180);

  // If Socket.io is running, emit the update to all clients in real-time!
  if (io) {
    io.emit('telemetry_throughput_spike', { throughput: throughputData });
    console.log('[Telemetry WS] Broadcasted simulated traffic spike:', throughputData);
  }

  return res.status(200).json({ 
    message: 'Traffic spike simulated successfully.', 
    throughput: throughputData 
  });
});

export default router;
