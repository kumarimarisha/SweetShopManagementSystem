import express from 'express';
import { purchaseSweet, restockSweet } from '../controllers/inventoryController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/:id/purchase', verifyToken, purchaseSweet);
router.post('/:id/restock', verifyAdmin, restockSweet);

export default router;
