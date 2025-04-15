import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, Clock } from 'lucide-react';

const ItemList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const items = [
    {
      id: 1,
      title: "Vintage Camera Collection",
      image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&q=80&w=600",
      description: "A collection of rare vintage cameras from the 1950s",
      currentPrice: 299.99,
      endTime: "2024-03-25T18:00:00",
      bids: 12
    },
    {
      id: 2,
      title: "Handcrafted Leather Bag",
      image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600",
      description: "Genuine leather handmade bag with unique design",
      currentPrice: 159.99,
      endTime: "2024-03-24T20:00:00",
      bids: 8
    },
    {
      id: 3,
      title: "Limited Edition Watch",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=600",
      description: "Exclusive limited edition timepiece",
      currentPrice: 499.99,
      endTime: "2024-03-26T15:00:00",
      bids: 15
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Active Auctions</h1>
        <div className="flex w-full md:w-auto gap-4">
          <div className="relative flex-1 md:flex-initial">
            <input
              type="text"
              placeholder="Search auctions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <SlidersHorizontal className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/items/${item.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-4">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 line-clamp-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Current Bid</p>
                  <p className="text-xl font-bold text-indigo-600">
                    ${item.currentPrice}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-sm text-gray-500">
                    {item.bids} bids
                  </p>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {new Date(item.endTime).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ItemList;