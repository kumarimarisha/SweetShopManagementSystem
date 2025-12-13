import { auth, db } from '../config/firebase.js';

// Register
export const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required' });
  }

  try {
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Save user to Firestore
    await db.collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      name,
      role: 'user',
      createdAt: new Date(),
    });

    res.status(201).json({
      message: 'User registered successfully',
      uid: userRecord.uid,
      email: userRecord.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Firebase Admin SDK doesn't directly validate password
    // User should get token from Firebase Auth frontend library
    // This endpoint is informational - actual login happens on frontend

    const userRecord = await auth.getUserByEmail(email);

    res.json({
      message: 'Login successful. Use Firebase Auth frontend to get ID token.',
      uid: userRecord.uid,
      email: userRecord.email,
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
