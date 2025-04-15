import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gavel, User, LogOut, ChevronDown, Phone, Info, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      setShowProfileMenu(false);
      await signOut();
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Gavel className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-800">AuctionHub</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/items" className="text-gray-600 hover:text-indigo-600">
                Browse Auctions
              </Link>
              <Link to="/how-it-works" className="text-gray-600 hover:text-indigo-600">
                How It Works
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-indigo-600">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 focus:outline-none"
                >
                  <User className="h-5 w-5" />
                  <span>{user?.username}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{user?.username}</div>
                      <div className="text-gray-500 capitalize">{user?.role}</div>
                    </div>
                    
                    <Link
                      to="/help"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Help Center
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;