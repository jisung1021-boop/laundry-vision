import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENV_PATH = path.join(__dirname, '..', '.env');

// Get current API status
router.get('/', (req, res) => {
  const key = process.env.GEMINI_API_KEY;
  const hasKey = Boolean(key && key.trim().length > 5 && !key.includes('YOUR_GEMINI_API_KEY'));
  
  res.json({
    hasGeminiKey: hasKey,
    mode: hasKey ? 'live' : 'test',
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    maskedKey: hasKey ? `${key.substring(0, 4)}...${key.substring(key.length - 4)}` : null
  });
});

// Update API key dynamically (convenient for testing and persists to .env)
router.post('/key', (req, res) => {
  const { apiKey } = req.body;
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length < 5) {
    return res.status(400).json({ error: '올바른 API 키 형식이 아닙니다.' });
  }

  const trimmedKey = apiKey.trim();
  process.env.GEMINI_API_KEY = trimmedKey;

  // Persist to .env file
  try {
    let envContent = '';
    if (fs.existsSync(ENV_PATH)) {
      envContent = fs.readFileSync(ENV_PATH, 'utf-8');
      if (envContent.includes('GEMINI_API_KEY=')) {
        envContent = envContent.replace(/GEMINI_API_KEY=.*/g, `GEMINI_API_KEY=${trimmedKey}`);
      } else {
        envContent += `\nGEMINI_API_KEY=${trimmedKey}\n`;
      }
    } else {
      envContent = `PORT=5000\nGEMINI_API_KEY=${trimmedKey}\nGEMINI_MODEL=gemini-1.5-flash\n`;
    }
    fs.writeFileSync(ENV_PATH, envContent.trim() + '\n', 'utf-8');
  } catch (err) {
    console.warn('Could not write to .env file:', err.message);
  }

  res.json({
    success: true,
    message: 'Gemini API 키가 성공적으로 등록되었습니다. 실시간 분석 모드로 전환됩니다.',
    hasGeminiKey: true,
    mode: 'live'
  });
});

export default router;
