import React, { useState } from 'react';
import { api } from '../services/api';

export const AddItemForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingPrice: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.items.create({
        ...formData,
        startingPrice: parseFloat(formData.startingPrice),
        currentPrice: parseFloat(formData.startingPrice),
        endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        sellerId: 1 // TODO: Replace with actual user ID
      });
      
      setFormData({ title: '', description: '', startingPrice: '' });
    } catch (error) {
      console.error('Failed to create item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Item Title"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Starting Price"
          value={formData.startingPrice}
          onChange={e => setFormData(prev => ({ ...prev, startingPrice: e.target.value }))}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button 
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Item
      </button>
    </form>
  );
};