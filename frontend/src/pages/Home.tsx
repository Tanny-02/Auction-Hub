import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Gavel, TrendingUp, Shield, Clock } from 'lucide-react';
import { api } from '../services/api';
import { Item } from '../types';

const Home = () => {
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
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Add loading state UI
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Active Auctions</h1>
        <Link
          to="/items/new"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Create New Auction
        </Link>
      </div>
      
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Discover Unique Auctions
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Bid on exclusive items, sell your valuables, and join our thriving auction community.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/items"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Browse Auctions
          </Link>
          <Link
            to="/profile"
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition"
          >
            Start Selling
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 py-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Gavel className="h-12 w-12 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold">Real-time Bidding</h3>
          <p className="text-gray-600">
            Experience the thrill of live auctions with our real-time bidding system
          </p>
        </div>
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold">Secure Transactions</h3>
          <p className="text-gray-600">
            Your payments and personal information are protected with bank-level security
          </p>
        </div>
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Clock className="h-12 w-12 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold">24/7 Auctions</h3>
          <p className="text-gray-600">
            Browse and bid on items around the clock from anywhere in the world
          </p>
        </div>
      </div>

      {/* Featured Auctions */}
      <div className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Auctions</h2>
        {error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.itemId} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${item.currentPrice}</span>
                  <Link
                    to={`/items/${item.itemId}`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;