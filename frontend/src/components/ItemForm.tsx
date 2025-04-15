import { useState, FormEvent } from 'react';
import { Item } from '../types';
import { api } from '../services/api';

interface ItemFormProps {
  item?: Partial<Item>;
  onSubmit: () => void;
  onCancel: () => void;
}

export function ItemForm({ item, onSubmit, onCancel }: ItemFormProps) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    startingPrice: item?.startingPrice || 0,
    currentPrice: item?.currentPrice || 0, // Added
    sellerId: item?.sellerId || 1, // Added - replace with actual user ID
    endTime: item?.endTime ? new Date(item.endTime).toISOString().slice(0, 16) : ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (item?.itemId) {
        await api.items.update(item.itemId, formData);
      } else {
        await api.items.create(formData);
      }
      onSubmit();
    } catch (error) {
      console.error('Failed to save item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Starting Price</label>
        <input
          type="number"
          value={formData.startingPrice}
          onChange={(e) => setFormData({ ...formData, startingPrice: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">End Time</label>
        <input
          type="datetime-local"
          value={formData.endTime}
          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700"
        >
          {item?.itemId ? 'Update' : 'Create'} Item
        </button>
      </div>
    </form>
  );
}