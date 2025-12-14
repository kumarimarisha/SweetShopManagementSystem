import { admin } from '../config/firebase.js';

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader ? 'Present' : 'Missing');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No bearer token found');
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.substring(7);
    console.log('Token received:', token.substring(0, 30) + '...');

    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log('Token verified for user:', decodedToken.uid);
    
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    await verifyToken(req, res, () => {});
    
    const userDoc = await admin.firestore().collection('users').doc(req.user.uid).get();
    if (!userDoc.exists || userDoc.data().role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    next();
  } catch (error) {
   return res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

export { verifyToken, verifyAdmin };