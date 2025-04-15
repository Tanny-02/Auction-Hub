import React, { useEffect, useState } from 'react';
import { Item } from '../types';
import { api } from '../services/api';

export const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await api.items.getAll();
        setItems(data);
      } catch (err) {
        setError('Failed to load items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map((item) => (
        <div key={item.itemId} className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-bold mb-2">{item.title}</h2>
          <p className="text-gray-600 mb-2">{item.description}</p>
          <div className="flex justify-between items-center">
            <span className="font-semibold">
              Current Price: ${item.currentPrice}
            </span>
            <span className="text-sm text-gray-500">
              Ends: {new Date(item.endTime).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};