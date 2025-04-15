import { Router } from 'express';
import { db } from '../db';

const router = Router();

// Get bids for an item
router.get('/item/:itemId', async (req, res) => {
  try {
    const bids = await db.query(
      'SELECT * FROM bids WHERE item_id = ? ORDER BY bid_amount DESC',
      [req.params.itemId]
    );
    res.json(bids);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bids' });
  }
});

// Place a new bid
router.post('/', async (req, res) => {
  const { item_id, buyer_id, bid_amount } = req.body;
  try {
    // Check if bid amount is higher than current price
    const [item] = await db.query(
      'SELECT current_price FROM items WHERE item_id = ?',
      [item_id]
    );
    
    if (bid_amount <= item.current_price) {
      res.status(400).json({ error: 'Bid amount must be higher than current price' });
      return;
    }

    // Start transaction
    await db.execute('START TRANSACTION');

    // Insert new bid
    await db.execute(
      'INSERT INTO bids (item_id, buyer_id, bid_amount, bid_date) VALUES (?, ?, ?, NOW())',
      [item_id, buyer_id, bid_amount]
    );

    // Update item's current price
    await db.execute(
      'UPDATE items SET current_price = ? WHERE item_id = ?',
      [bid_amount, item_id]
    );

    await db.execute('COMMIT');
    res.status(201).json({ message: 'Bid placed successfully' });
  } catch (error) {
    await db.execute('ROLLBACK');
    res.status(500).json({ error: 'Failed to place bid' });
  }
});

export const bidRoutes = router;