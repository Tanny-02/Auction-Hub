import { Router } from 'express';
import { db } from '../db';

const router = Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await db.query(
      'SELECT * FROM items WHERE end_time > NOW() ORDER BY end_time ASC'
    );
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Get item by ID
router.get('/:id', async (req, res) => {
  try {
    const [item] = await db.query(
      'SELECT * FROM items WHERE item_id = ?',
      [req.params.id]
    );
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// Create new item
router.post('/', async (req, res) => {
  const { seller_id, title, description, starting_price, end_time } = req.body;
  try {
    await db.execute(
      'INSERT INTO items (seller_id, title, description, starting_price, current_price, end_time) VALUES (?, ?, ?, ?, ?, ?)',
      [seller_id, title, description, starting_price, starting_price, end_time]
    );
    res.status(201).json({ message: 'Item created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

export const itemRoutes = router;