import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

let activeConnections = 0;

export function initSocketServer(io: Server) {
  // Authentication Middleware for socket connections
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.headers['sec-websocket-protocol'];
    
    if (!token) {
      console.log('[Socket WS] Connection rejected: No auth token provided.');
      return next(new Error('Authentication error: Token required.'));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.data.user = decoded;
      next();
    } catch (err) {
      console.log('[Socket WS] Connection rejected: Invalid auth token.');
      return next(new Error('Authentication error: Invalid token.'));
    }
  });

  io.on('connection', (socket) => {
    activeConnections++;
    console.log(`[Socket WS] Client connected: ${socket.id} (User: ${socket.data.user?.email}). Active connections: ${activeConnections}`);

    // Welcome handshake
    socket.emit('handshake_ack', { 
      message: 'Connection Handshake Succeeded', 
      connectionId: socket.id 
    });

    socket.on('disconnect', () => {
      activeConnections--;
      console.log(`[Socket WS] Client disconnected: ${socket.id}. Active connections: ${activeConnections}`);
    });
  });

  // Start periodic telemetry update loop (every 3 seconds)
  setInterval(() => {
    if (activeConnections > 0) {
      // Generate simulated telemetry data with slight fluctuations
      const baseActiveUsers = 12480;
      const userFluctuation = Math.floor(Math.random() * 21) - 10; // -10 to +10
      const activeUsersCount = baseActiveUsers + userFluctuation;

      const baseLatency = 14;
      const latencyFluctuation = Math.floor(Math.random() * 5) - 2; // -2 to +2
      const currentLatency = Math.max(10, baseLatency + latencyFluctuation);

      // Emit to all connected clients
      io.emit('telemetry_update', {
        activeUsers: activeUsersCount,
        latency: currentLatency,
        timestamp: new Date().toISOString()
      });
      
      // console.log(`[Socket WS] Telemetry broadcasted: ${activeUsersCount} users, ${currentLatency}ms`);
    }
  }, 3000);
}
