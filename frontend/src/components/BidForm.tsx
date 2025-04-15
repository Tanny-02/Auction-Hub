import React, { useState } from 'react';
import { api } from '../services/api';

interface BidFormProps {
  itemId: number;
  currentPrice: number;
  onBidPlaced: () => void;
}

export const BidForm: React.FC<BidFormProps> = ({ itemId, currentPrice, onBidPlaced }) => {
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const amount = parseFloat(bidAmount);
    if (amount <= currentPrice) {
      setError('Bid must be higher than current price');
      return;
    }

    try {
      await api.bids.place({
        itemId,
        buyerId: 1, // TODO: Replace with actual user ID
        bidAmount: amount,
      });
      setBidAmount('');
      onBidPlaced();
    } catch (error) {
      setError('Failed to place bid');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-2">
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter bid amount"
          className="flex-1 p-2 border rounded"
          min={currentPrice + 0.01}
          step="0.01"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Place Bid
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};