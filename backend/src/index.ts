import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

import { PORT } from './config.js';
import { initSocketServer } from './services/socket.js';

// Routers
import authRouter from './routes/auth.js';
import dashboardRouter from './routes/dashboard.js';
import projectsRouter from './routes/projects.js';
import reportsRouter from './routes/reports.js';
import settingsRouter from './routes/settings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

// Global Socket.io instance reference (exported for router usage)
export const io = new Server(httpServer, {
  cors: {
    origin: '*', // Allow all origins for local testing, restrict in prod
    methods: ['GET', 'POST']
  }
});

// Configure Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});

// Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false // Allows files to be downloaded locally in dev
}));
app.use(cors());
app.use(express.json());
app.use('/api/', limiter);

// Serve static compiled downloads
app.use('/public/downloads', express.static(path.resolve(__dirname, '../public/downloads')));

// API Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1', dashboardRouter);
app.use('/api/v1', projectsRouter);
app.use('/api/v1', reportsRouter);
app.use('/api/v1', settingsRouter);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Init Socket.io Telemetry Server
initSocketServer(io);

// Start server
httpServer.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  Full-Stack API Gateway listening on port ${PORT} `);
  console.log(`  Health Check: http://localhost:${PORT}/health     `);
  console.log(`==================================================`);
});

export default app;
