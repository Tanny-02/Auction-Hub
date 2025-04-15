import React, { useEffect, useState } from 'react';
import { Item, Bid } from '../types';
import { api } from '../services/api';

interface ItemDetailProps {
  itemId: number;
}

export const ItemDetail: React.FC<ItemDetailProps> = ({ itemId }) => {
  const [item, setItem] = useState<Item | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemData, bidsData] = await Promise.all([
          api.items.getById(itemId),
          api.bids.getByItem(itemId)
        ]);
        setItem(itemData);
        setBids(bidsData);
      } catch (error) {
        console.error('Error fetching item details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  if (loading) return <div>Loading...</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-gray-700 mb-4">{item.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">
            Current Price: ${item.currentPrice}
          </span>
          <span className="text-gray-500">
            Ends: {new Date(item.endTime).toLocaleString()}
          </span>
        </div>
        
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Bid History</h2>
          <div className="space-y-2">
            {bids.map(bid => (
              <div key={bid.bidId} className="flex justify-between items-center border-b py-2">
                <span>Bid Amount: ${bid.bidAmount}</span>
                <span className="text-gray-500">
                  {new Date(bid.bidDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};