import express from 'express';
import cors from 'cors';
import { db } from './db';
import { itemRoutes } from './routes/items';
import { userRoutes } from './routes/users';
import { bidRoutes } from './routes/bids';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize database connection
db.init().catch(console.error);

// Routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bids', bidRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});