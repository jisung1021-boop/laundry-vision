import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllHistory, getHistoryById, saveHistory, deleteHistory, clearAllHistory } from '../db.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = process.env.DATA_DIR 
  ? path.join(process.env.DATA_DIR, 'uploads') 
  : path.join(__dirname, '..', 'uploads');

// GET all history records
router.get('/', async (req, res) => {
  try {
    const list = await getAllHistory();
    res.json({
      success: true,
      count: list.length,
      history: list
    });
  } catch (err) {
    console.error('History fetch error:', err);
    res.status(500).json({ error: '분석 기록을 불러오는 중 오류가 발생했습니다.' });
  }
});

// GET specific history item
router.get('/:id', async (req, res) => {
  try {
    const item = await getHistoryById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: '해당 기록을 찾을 수 없습니다.' });
    }
    res.json({
      success: true,
      item
    });
  } catch (err) {
    console.error('History fetch single item error:', err);
    res.status(500).json({ error: '기록 조회 중 오류가 발생했습니다.' });
  }
});

// POST save a new analysis result
router.post('/', async (req, res) => {
  try {
    const { image_name, image_path, analysis_result, user_id } = req.body;
    
    if (!image_name || !analysis_result) {
      return res.status(400).json({ error: '저장할 이미지 정보 또는 분석 결과가 누락되었습니다.' });
    }

    const saved = await saveHistory({
      image_name,
      image_path: image_path || '',
      analysis_result,
      user_id: user_id || 'guest'
    });

    res.status(201).json({
      success: true,
      message: '분석 결과가 안전하게 저장되었습니다.',
      item: saved
    });
  } catch (err) {
    console.error('History save error:', err);
    res.status(500).json({ error: '분석 결과를 저장하는 중 오류가 발생했습니다.' });
  }
});

// DELETE single history item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteHistory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: '삭제할 기록이 존재하지 않습니다.' });
    }

    // Try to remove file from uploads folder if it's an uploaded file
    if (deleted.image_path && deleted.image_path.startsWith('/uploads/')) {
      const filename = path.basename(deleted.image_path);
      const filePath = path.join(UPLOADS_DIR, filename);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, () => {});
      }
    }

    res.json({
      success: true,
      message: '기록이 성공적으로 삭제되었습니다.',
      deletedId: req.params.id
    });
  } catch (err) {
    console.error('History delete error:', err);
    res.status(500).json({ error: '기록 삭제 중 오류가 발생했습니다.' });
  }
});

// DELETE clear all history
router.delete('/', async (req, res) => {
  try {
    await clearAllHistory();
    res.json({
      success: true,
      message: '모든 분석 기록이 초기화되었습니다.'
    });
  } catch (err) {
    console.error('History clear all error:', err);
    res.status(500).json({ error: '기록 초기화 중 오류가 발생했습니다.' });
  }
});

export default router;
