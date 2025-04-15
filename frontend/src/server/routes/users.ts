import { Router } from 'express';
import { db } from '../db';

const router = Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const [user] = await db.query(
      'SELECT user_id, username, email, role FROM users WHERE user_id = ?',
      [req.params.id]
    );
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  const { username, email } = req.body;
  try {
    await db.execute(
      'UPDATE users SET username = ?, email = ? WHERE user_id = ?',
      [username, email, req.params.id]
    );
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

export const userRoutes = router;