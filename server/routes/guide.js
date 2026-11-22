import express from 'express';
import { laundryGuideData, sampleLabels } from '../data/laundryGuideData.js';

const router = express.Router();

// GET all guide symbols, optionally filtered by category or search query
router.get('/', (req, res) => {
  const { category, search } = req.query;
  let items = [...laundryGuideData];

  if (category && category !== 'all') {
    items = items.filter(item => item.category === category);
  }

  if (search && typeof search === 'string' && search.trim()) {
    const query = search.trim().toLowerCase();
    items = items.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.meaning.toLowerCase().includes(query) ||
      item.guide.toLowerCase().includes(query) ||
      item.cautions.toLowerCase().includes(query) ||
      (item.keywords && item.keywords.some(k => k.toLowerCase().includes(query)))
    );
  }

  res.json({
    total: items.length,
    symbols: items
  });
});

// GET predefined sample care labels
router.get('/samples', (req, res) => {
  res.json({
    samples: sampleLabels
  });
});

export default router;
