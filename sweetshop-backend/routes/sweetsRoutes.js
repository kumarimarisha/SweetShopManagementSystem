import express from 'express';
import { addSweet, getAllSweets, searchSweets, updateSweet, deleteSweet } from '../controllers/sweetsController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyAdmin, addSweet);
router.get('/', getAllSweets);
router.get('/search', searchSweets);
router.put('/:id', verifyAdmin, updateSweet);
router.delete('/:id', verifyAdmin, deleteSweet);

export default router;
