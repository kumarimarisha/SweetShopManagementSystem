import express from 'express';
import { 
  addSweet, 
  getAllSweets, 
  getSweet,
  searchSweets, 
  updateSweet, 
  deleteSweet 
} from '../controllers/sweetsController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllSweets);
router.get('/search', searchSweets);
router.get('/:id', getSweet);

// Protected routes (admin only)
router.post('/', verifyToken, verifyAdmin, addSweet);
router.put('/:id', verifyToken, verifyAdmin, updateSweet);
router.delete('/:id', verifyToken, verifyAdmin, deleteSweet);

export default router;