import express from 'express';
import { 
  getInventory,         // Add this import
  updateInventory,      // Add this import
  purchaseSweet, 
  restockSweet 
} from '../controllers/inventoryController.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public route
router.get('/', getInventory);  // Add this line for getting inventory

// Protected routes
router.put('/:id', verifyAdmin, updateInventory);  // Add this line for updating inventory
router.post('/:id/purchase', verifyToken, purchaseSweet);
router.post('/:id/restock', verifyAdmin, restockSweet);

export default router;