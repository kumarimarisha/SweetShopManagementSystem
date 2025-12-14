import { db } from '../config/firebase.js';

// POST - Purchase sweet (decrease quantity)
export const purchaseSweet = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Quantity must be greater than 0' });
  }

  try {
    const sweetRef = db.collection('sweets').doc(id);
    const sweetDoc = await sweetRef.get();

    if (!sweetDoc.exists) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    const currentQuantity = sweetDoc.data().quantity;
    if (currentQuantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    await sweetRef.update({
      quantity: currentQuantity - parseInt(quantity),
    });

    res.json({
      message: 'Purchase successful',
      id,
      newQuantity: currentQuantity - parseInt(quantity),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST - Restock sweet (increase quantity, Admin only)
export const restockSweet = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: 'Quantity must be greater than 0' });
  }

  try {
    const sweetRef = db.collection('sweets').doc(id);
    const sweetDoc = await sweetRef.get();

    if (!sweetDoc.exists) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    const currentQuantity = sweetDoc.data().quantity;

    await sweetRef.update({
      quantity: currentQuantity + parseInt(quantity),
    });

    res.json({
      message: 'Restock successful',
      id,
      newQuantity: currentQuantity + parseInt(quantity),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update inventoryController.js with these functions


// GET - Get all inventory (with optional category filter)
export const getInventory = async (req, res) => {
  try {
    let query = db.collection('sweets');
    
    // Add category filter if provided
    if (req.query.category) {
      query = query.where('category', '==', req.query.category);
    }
    
    const snapshot = await query.get();
    const inventory = [];
    
    snapshot.forEach(doc => {
      inventory.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.status(200).json({
      totalItems: inventory.length,
      items: inventory
    });
  } catch (error) {
    console.error('Error getting inventory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT - Update inventory
export const updateInventory = async (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;
  
  if (quantity !== undefined && quantity < 0) {
    return res.status(400).json({ 
      error: 'Quantity must be a positive number' 
    });
  }
  
  try {
    const sweetRef = db.collection('sweets').doc(id);
    const doc = await sweetRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Sweet not found' });
    }
    
    const updateData = { lastUpdated: new Date() };
    if (quantity !== undefined) updateData.quantity = quantity;
    if (price !== undefined) updateData.price = price;
    
    await sweetRef.update(updateData);
    
    res.status(200).json({
      message: 'Inventory updated successfully'
    });
  } catch (error) {
    console.error('Error updating inventory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};