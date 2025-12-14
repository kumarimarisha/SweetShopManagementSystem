// tests/unit/controllers/sweetsController.test.js
import { getSweet } from '../../../controllers/sweetsController.js';
import { db } from '../../../config/firebase.js';

// Mock Firebase
jest.mock('../../../config/firebase.js', () => ({
  db: {
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn()
  }
}));

describe('Sweets Controller', () => {
  describe('getSweet', () => {
    it('should return 404 if sweet not found', async () => {
      // Mock implementation
      db.collection('sweets').doc('nonexistent').get.mockResolvedValueOnce({ 
        exists: false 
      });
      
      const req = { params: { id: 'nonexistent' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      
      await getSweet(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Sweet not found' });
    });

    it('should return sweet data if found', async () => {
      const mockSweet = { 
        id: '123', 
        name: 'Gulab Jamun', 
        category: 'Indian',
        price: 50,
        quantity: 10
      };
      
      db.collection('sweets').doc('123').get.mockResolvedValueOnce({ 
        exists: true,
        id: '123',
        data: () => mockSweet
      });
      
      const req = { params: { id: '123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      
      await getSweet(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: '123', ...mockSweet });
    });
  });
});