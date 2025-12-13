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
