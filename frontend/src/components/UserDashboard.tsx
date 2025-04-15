import React, { useEffect, useState } from 'react';
import { Item } from '../types';
import { api } from '../services/api';

export const UserDashboard: React.FC = () => {
  const [listedItems, setListedItems] = useState<Item[]>([]);
  const [biddingItems, setBiddingItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [listed, bidding] = await Promise.all([
          api.items.getByUser(1, 'listed'), // TODO: Replace with actual user ID
          api.items.getByUser(1, 'bidding')
        ]);
        setListedItems(listed);
        setBiddingItems(bidding);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">My Listed Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listedItems.map(item => (
            <div key={item.itemId} className="border rounded-lg p-4">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="mt-2">
                <span className="font-semibold">Current Price: ${item.currentPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Items I'm Bidding On</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {biddingItems.map(item => (
            <div key={item.itemId} className="border rounded-lg p-4">
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="mt-2">
                <span className="font-semibold">Current Price: ${item.currentPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};