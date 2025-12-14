import { auth, db } from '../config/firebase.js';

// Register
// controllers/authController.js
export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();
    
    if (!snapshot.empty) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    });

    // Save user data to Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email,
      name,
      role: 'user',
      createdAt: new Date()
    });

    res.status(201).json({
      uid: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Failed to register user' });
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
