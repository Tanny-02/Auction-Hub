import { Item, Bid, User } from '../types';

const API_URL = 'http://localhost:8080/api';

export const api = {
  items: {
    // Read all items
    getAll: async (): Promise<Item[]> => {
      const response = await fetch(`${API_URL}/items`);
      if (!response.ok) throw new Error('Failed to fetch items');
      return response.json();
    },
    
    // Read single item
    getById: async (id: number): Promise<Item> => {
      const response = await fetch(`${API_URL}/items/${id}`);
      if (!response.ok) throw new Error('Item not found');
      return response.json();
    },

    // Create item
    create: async (item: Omit<Item, 'itemId'>): Promise<Item> => {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (!response.ok) throw new Error('Failed to create item');
      return response.json();
    },

    // Update item
    update: async (id: number, item: Partial<Item>): Promise<Item> => {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (!response.ok) throw new Error('Failed to update item');
      return response.json();
    },

    // Delete item
    delete: async (id: number): Promise<void> => {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete item');
    },

    // Additional operations
    placeBid: async (itemId: number, amount: number): Promise<void> => {
      const response = await fetch(`${API_URL}/items/${itemId}/bid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      if (!response.ok) throw new Error('Failed to place bid');
    },

    getByUser: async (userId: number, type: 'listed' | 'bidding'): Promise<Item[]> => {
      const response = await fetch(`${API_URL}/items/user/${userId}/${type}`);
      if (!response.ok) throw new Error(`Failed to fetch ${type} items`);
      return response.json();
    }
  },
  
  users: {
    getStats: async (userId: number) => {
      const response = await fetch(`${API_URL}/users/${userId}/stats`);
      if (!response.ok) throw new Error('Failed to fetch user stats');
      return response.json();
    },
    
    getCurrent: async () => {
      const response = await fetch(`${API_URL}/users/me`);
      if (!response.ok) throw new Error('Failed to fetch current user');
      return response.json();
    },

    update: async (userId: number, data: Partial<User>) => {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update user');
      return response.json();
    }
  }
};