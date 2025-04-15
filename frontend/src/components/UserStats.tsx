import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

export const UserStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.users.getStats(1); // Replace 1 with actual userId
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading stats...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Items Listed</h3>
        <p className="text-2xl font-bold text-indigo-600">{stats.itemsListed}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Active Bids</h3>
        <p className="text-2xl font-bold text-indigo-600">{stats.bidsPlaced}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Auctions Won</h3>
        <p className="text-2xl font-bold text-indigo-600">{stats.auctionsWon}</p>
      </div>
    </div>
  );
};