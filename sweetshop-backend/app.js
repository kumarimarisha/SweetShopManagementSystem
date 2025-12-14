// app.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import sweetsRoutes from './routes/sweetsRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);
app.use('/api/inventory', inventoryRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

export default app;
