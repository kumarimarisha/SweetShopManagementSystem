import { admin, db } from '../config/firebase.js';

// POST - Add new sweet (Admin only)
export const addSweet = async (req, res) => {
  const { name, category, price, quantity, description, image } = req.body;

  if (!name || !category || price === undefined || quantity === undefined) {
    return res.status(400).json({ error: 'Name, category, price, and quantity are required' });
  }

  try {
    const docRef = await db.collection('sweets').add({
      name,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description: description || '',
      image: image || '',
      createdAt: new Date(),
    });

    res.status(201).json({
      message: 'Sweet added successfully',
      id: docRef.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET - All sweets
export const getAllSweets = async (req, res) => {
  try {
    const snapshot = await db.collection('sweets').get();
    const sweets = [];

    snapshot.forEach(doc => {
      sweets.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    res.json(sweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET - Search sweets (by name, category, price range)
export const searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  try {
    let query = db.collection('sweets');

    if (name) {
      // Simple contains search
      const snapshot = await query.get();
      const results = snapshot.docs
        .filter(doc => doc.data().name.toLowerCase().includes(name.toLowerCase()))
        .map(doc => ({ id: doc.id, ...doc.data() }));
      return res.json(results);
    }

    if (category) {
      query = query.where('category', '==', category);
    }

    const snapshot = await query.get();
    let results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Filter by price range
    if (minPrice) {
      results = results.filter(sweet => sweet.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      results = results.filter(sweet => sweet.price <= parseFloat(maxPrice));
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT - Update sweet (Admin only)
export const updateSweet = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, quantity, description, image } = req.body;

  try {
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (quantity !== undefined) updateData.quantity = parseInt(quantity);
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;

    await db.collection('sweets').doc(id).update(updateData);

    res.json({ message: 'Sweet updated successfully', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE - Delete sweet (Admin only)
export const deleteSweet = async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('sweets').doc(id).delete();
    res.json({ message: 'Sweet deleted successfully', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
