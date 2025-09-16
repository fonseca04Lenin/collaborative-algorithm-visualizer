import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { randomBytes } from 'crypto';
import { SessionState, AlgorithmType } from '../../shared/dist/types.js';

// Configuration
const config = {
  port: parseInt(process.env.PORT || '3001'),
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'],
  sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || '86400000'), // 24 hours default
  cleanupInterval: parseInt(process.env.CLEANUP_INTERVAL || '3600000'), // 1 hour default
  nodeEnv: process.env.NODE_ENV || 'development'
};

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: config.corsOrigins,
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

interface Session {
  id: string;
  state: SessionState;
  cursors: Map<string, { x: number; y: number; userId: string }>;
  replayData: SessionState[];
  lastActivity: number;
}

const sessions = new Map<string, Session>();

setInterval(() => {
  const now = Date.now();
  for (const [sessionId, session] of sessions.entries()) {
    if (session.cursors.size === 0 && now - session.lastActivity > config.sessionTimeout) {
      sessions.delete(sessionId);
    }
  }
}, config.cleanupInterval);

app.get('/api/sessions/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId;
  const session = sessions.get(sessionId);
  
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  res.json({ sessionId, state: session.state });
});

app.post('/api/sessions', (req, res) => {
  const sessionId = generateSessionId();
  const initialState: SessionState = {
    algorithm: 'bubbleSort',
    currentStep: 0,
    totalSteps: 0,
    isPlaying: false,
    inputData: { array: [5, 3, 8, 1, 2] },
    steps: []
  };
  
  const session: Session = {
    id: sessionId,
    state: initialState,
    cursors: new Map(),
    replayData: [],
    lastActivity: Date.now()
  };
  
  sessions.set(sessionId, session);
  res.json({ sessionId, state: initialState });
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-session', (sessionId: string) => {
    try {
      if (!sessionId || typeof sessionId !== 'string' || sessionId.length !== 8) {
        socket.emit('error', { message: 'Invalid session ID format' });
        return;
      }

      socket.join(sessionId);
      const session = sessions.get(sessionId);

      if (session) {
        session.lastActivity = Date.now();
        socket.emit('session-state', session.state);
        socket.emit('cursors-update', Array.from(session.cursors.values()));
      } else {
        socket.emit('error', { message: 'Session not found' });
      }
    } catch (error) {
      console.error('Error in join-session:', error);
      socket.emit('error', { message: 'Failed to join session' });
    }
  });
  
  socket.on('cursor-move', (data: { sessionId: string; x: number; y: number }) => {
    try {
      if (!data || !data.sessionId || typeof data.sessionId !== 'string' ||
          typeof data.x !== 'number' || typeof data.y !== 'number' ||
          isNaN(data.x) || isNaN(data.y)) {
        socket.emit('error', { message: 'Invalid cursor move data' });
        return;
      }

      const session = sessions.get(data.sessionId);
      if (session) {
        session.lastActivity = Date.now();
        session.cursors.set(socket.id, {
          x: data.x,
          y: data.y,
          userId: socket.id
        });

        socket.to(data.sessionId).emit('cursor-move', {
          userId: socket.id,
          x: data.x,
          y: data.y
        });
      } else {
        socket.emit('error', { message: 'Session not found' });
      }
    } catch (error) {
      console.error('Error in cursor-move:', error);
      socket.emit('error', { message: 'Failed to update cursor position' });
    }
  });
  
  socket.on('update-session-state', (data: { sessionId: string; state: SessionState }) => {
    try {
      if (!data || !data.sessionId || typeof data.sessionId !== 'string' || !data.state) {
        socket.emit('error', { message: 'Invalid session state data' });
        return;
      }

      const session = sessions.get(data.sessionId);
      if (session) {
        session.lastActivity = Date.now();
        session.state = data.state;

        if (data.state.isPlaying) {
          session.replayData.push({ ...data.state });
        }

        socket.to(data.sessionId).emit('session-state-updated', data.state);
      } else {
        socket.emit('error', { message: 'Session not found' });
      }
    } catch (error) {
      console.error('Error in update-session-state:', error);
      socket.emit('error', { message: 'Failed to update session state' });
    }
  });
  
  socket.on('start-algorithm', (data: { sessionId: string; algorithm: AlgorithmType; inputData: any }) => {
    try {
      if (!data || !data.sessionId || typeof data.sessionId !== 'string' ||
          !data.algorithm || !['bubbleSort', 'mergeSort', 'quickSort', 'bfs', 'dfs'].includes(data.algorithm)) {
        socket.emit('error', { message: 'Invalid algorithm start data' });
        return;
      }

      const session = sessions.get(data.sessionId);
      if (session) {
        session.lastActivity = Date.now();
        session.state.algorithm = data.algorithm;
        session.state.inputData = data.inputData;
        session.state.currentStep = 0;
        session.state.isPlaying = false;
        session.replayData = [];

        io.to(data.sessionId).emit('session-state-updated', session.state);
      } else {
        socket.emit('error', { message: 'Session not found' });
      }
    } catch (error) {
      console.error('Error in start-algorithm:', error);
      socket.emit('error', { message: 'Failed to start algorithm' });
    }
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    sessions.forEach((session) => {
      if (session.cursors.has(socket.id)) {
        session.cursors.delete(socket.id);
        socket.to(session.id).emit('cursor-remove', socket.id);
      }
    });
  });
});

function generateSessionId(): string {
  return randomBytes(4).toString('hex').toUpperCase();
}

const httpServer = server.listen(config.port, () => {
  console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
