import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { initDb } from './db.js';

import analyzeRouter from './routes/analyze.js';
import historyRouter from './routes/history.js';
import guideRouter from './routes/guide.js';
import configRouter from './routes/config.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// Middlewares
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Static file hosting for uploads and samples
// Support Render Persistent Disk via DATA_DIR if configured
const UPLOADS_DIR = process.env.DATA_DIR 
  ? path.join(process.env.DATA_DIR, 'uploads') 
  : path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/samples', express.static(path.join(__dirname, 'public', 'samples')));

// API Routes
app.use('/api/analyze', analyzeRouter);
app.use('/api/history', historyRouter);
app.use('/api/guide', guideRouter);
app.use('/api/config', configRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'LAUNDRY VISION API Server',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend dist for production deployment
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  console.log(`📦 Serving frontend from: ${clientDistPath}`);
}
app.use(express.static(clientDistPath));

// SPA Routing: Fallback all GET requests (excluding API & static assets) to index.html
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path.startsWith('/samples')) {
    return next();
  }
  const indexPath = path.join(clientDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

// Start server after DB init
async function startServer() {
  try {
    await initDb();
    console.log('✅ SQLite Database successfully initialized.');

    app.listen(PORT, HOST, () => {
      console.log(`🚀 LAUNDRY VISION server is running on http://${HOST}:${PORT}`);
      console.log(`🔑 Gemini API Key configured: ${Boolean(process.env.GEMINI_API_KEY)}`);
    });
  } catch (err) {
    console.error('Failed to initialize server:', err);
    process.exit(1);
  }
}

startServer();
