import { getInventory, updateInventory } from '../../../controllers/inventoryController.js';
import { db } from '../../../config/firebase.js';

// Mock Firebase
jest.mock('../../../config/firebase.js', () => {
  const mockCollection = {
    where: jest.fn().mockReturnThis(),
    get: jest.fn(),
    doc: jest.fn().mockReturnThis(),
    update: jest.fn().mockResolvedValue()
  };

  return {
    db: {
      collection: jest.fn(() => mockCollection)
    }
  };
});

describe('Inventory Controller', () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getInventory', () => {
    it('should return inventory data', async () => {
      const mockInventory = [
        { id: '1', name: 'Barfi', quantity: 10, category: 'Indian' },
        { id: '2', name: 'Gulab Jamun', quantity: 15, category: 'Indian' }
      ];

      const mockSnapshot = {
        empty: false,
        forEach: (callback) => {
          mockInventory.forEach(item => {
            callback({ 
              id: item.id, 
              data: () => item 
            });
          });
        }
      };

      db.collection('sweets').get.mockResolvedValueOnce(mockSnapshot);
      
      const req = { query: {} };
      const res = mockResponse();

      await getInventory(req, res);

      expect(db.collection).toHaveBeenCalledWith('sweets');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        totalItems: 2,
        items: mockInventory
      });
    });

    it('should filter inventory by category', async () => {
      const mockInventory = [
        { id: '1', name: 'Barfi', quantity: 10, category: 'Indian' }
      ];

      const mockSnapshot = {
        empty: false,
        forEach: (callback) => {
          mockInventory.forEach(item => {
            callback({ 
              id: item.id, 
              data: () => item 
            });
          });
        }
      };

      const mockWhere = jest.fn().mockReturnThis();
      const mockCollection = {
        where: mockWhere,
        get: jest.fn().mockResolvedValue(mockSnapshot)
      };
      db.collection.mockReturnValueOnce(mockCollection);

      const req = { query: { category: 'Indian' } };
      const res = mockResponse();

      await getInventory(req, res);

      expect(mockWhere).toHaveBeenCalledWith('category', '==', 'Indian');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        totalItems: 1,
        items: mockInventory
      });
    });

    it('should return empty array when no items found', async () => {
      const mockSnapshot = {
        empty: true,
        forEach: () => {}
      };

      db.collection('sweets').get.mockResolvedValueOnce(mockSnapshot);
      
      const req = { query: {} };
      const res = mockResponse();

      await getInventory(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        totalItems: 0,
        items: []
      });
    });
  });

  describe('updateInventory', () => {
    it('should return 404 if item not found', async () => {
      const mockDoc = {
        get: jest.fn().mockResolvedValueOnce({ exists: false })
      };
      
      db.collection('sweets').doc.mockReturnValue(mockDoc);
      
      const req = { 
        params: { id: 'nonexistent' },
        body: { quantity: 20 }
      };
      const res = mockResponse();

      await updateInventory(req, res);

      expect(db.collection).toHaveBeenCalledWith('sweets');
      expect(db.collection().doc).toHaveBeenCalledWith('nonexistent');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Sweet not found'
      });
    });

    it('should update inventory successfully', async () => {
      const mockDoc = {
        exists: true,
        get: jest.fn().mockResolvedValue({ exists: true }),
        update: jest.fn().mockResolvedValue({})
      };
      
      db.collection('sweets').doc.mockReturnValue(mockDoc);
      
      const req = { 
        params: { id: '123' },
        body: { quantity: 25, price: 15.99 }
      };
      const res = mockResponse();

      await updateInventory(req, res);

      expect(db.collection().doc).toHaveBeenCalledWith('123');
      expect(mockDoc.update).toHaveBeenCalledWith({
        quantity: 25,
        price: 15.99,
        lastUpdated: expect.any(Date)
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Inventory updated successfully'
      });
    });

    it('should return 400 for invalid quantity', async () => {
      const req = { 
        params: { id: '123' },
        body: { quantity: -5 }
      };
      const res = mockResponse();

      await updateInventory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Quantity must be a positive number'
      });
    });
  });
});