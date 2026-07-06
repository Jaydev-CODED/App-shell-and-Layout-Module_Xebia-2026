import { Router, Response } from 'express';
import { z } from 'zod';
import { db } from '../services/db.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

const ProjectCreateSchema = z.object({
  name: z.string().min(3),
  ownerId: z.string().optional()
});

const ProjectUpdateSchema = z.object({
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'IN_REVIEW', 'ACTIVE_CODING', 'COMPLETED']).optional(),
  progress: z.number().min(0).max(100).optional(),
  name: z.string().min(3).optional()
});

// 1. Get all projects (supports query search)
router.get('/projects', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const search = req.query.search as string || '';
    
    // Fetch from db (Mock or Prisma)
    const projects = await db.project.findMany();
    
    // Filter manually if query is supplied (Mock handles this, but safety check)
    let filtered = projects;
    if (search) {
      const query = search.toLowerCase();
      filtered = projects.filter((p: any) => 
        p.name.toLowerCase().includes(query) ||
        (p.owner?.name && p.owner.name.toLowerCase().includes(query)) ||
        p.status.toLowerCase().includes(query)
      );
    }

    return res.status(200).json({ projects: filtered });
  } catch (error) {
    console.error('[Projects List] Error:', error);
    return res.status(500).json({ error: 'Failed to retrieve projects.' });
  }
});

// 2. Create a project
router.post('/projects', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const body = ProjectCreateSchema.parse(req.body);
    const ownerId = body.ownerId || req.user?.id; // default to logging user

    if (!ownerId) {
      return res.status(400).json({ error: 'Owner ID is required.' });
    }

    const project = await db.project.create({
      data: {
        name: body.name,
        ownerId,
        status: 'NOT_STARTED',
        progress: 0
      }
    });

    return res.status(201).json({ message: 'Project created successfully.', project });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('[Projects Create] Error:', error);
    return res.status(500).json({ error: 'Failed to create project.' });
  }
});

// 3. Update a project
router.patch('/projects/:id', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const body = ProjectUpdateSchema.parse(req.body);

    const project = await db.project.update({
      where: { id },
      data: body
    });

    return res.status(200).json({ message: 'Project updated successfully.', project });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('[Projects Update] Error:', error);
    return res.status(500).json({ error: 'Failed to update project.' });
  }
});

// 4. Delete a project
router.delete('/projects/:id', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    await db.project.delete({
      where: { id }
    });

    return res.status(200).json({ message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('[Projects Delete] Error:', error);
    return res.status(500).json({ error: 'Failed to delete project.' });
  }
});

export default router;
