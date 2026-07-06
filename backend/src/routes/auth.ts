import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db } from '../services/db.js';
import { JWT_SECRET } from '../config.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';

const router = Router();

// Zod schemas for request validation
const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2)
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

// 1. Register User
router.post('/register', async (req: any, res: any) => {
  try {
    const body = RegisterSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email: body.email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(body.password, 10);
    const user = await db.user.create({
      data: {
        email: body.email,
        name: body.name,
        passwordHash,
        role: 'MEMBER'
      }
    });

    // Create token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    return res.status(201).json({
      message: 'Registration successful',
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('[Auth Register] Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. Login User
router.post('/login', async (req: any, res: any) => {
  try {
    const body = LoginSchema.parse(req.body);

    const user = await db.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const validPassword = await bcrypt.compare(body.password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Create token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: error.errors });
    }
    console.error('[Auth Login] Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// 3. Logout User (Invalidates token on frontend; backend returns success status)
router.post('/logout', (req: any, res: any) => {
  return res.status(200).json({ message: 'Logout successful' });
});

// 4. Get Current User profile
router.get('/me', authenticateToken as any, async (req: AuthenticatedRequest, res: Response) => {
  return res.status(200).json({ user: req.user });
});

export default router;
