import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa"; // Importing icons

const Header = () => {
  return (
    <nav className="bg-teal-200 text-black p-4 flex justify-between items-center shadow-md">
      <h1 className="text-3xl font-bold tracking-wide">ShoppyGlobe</h1>
      <div className="space-x-6 flex items-center">
        <Link 
          to="/" 
          className="px-4 py-2 rounded-lg transition duration-300 hover:bg-teal-600 hover:text-white"
        >
          Home
        </Link>
        
        <Link 
          to="/cart" 
          className="px-4 py-2 rounded-lg flex items-center gap-2 transition duration-300 hover:bg-teal-600 hover:text-white"
        >
          <FaShoppingCart size={20} />
          Cart
        </Link>

        {/* Wishlist Button with Heart Icon */}
        <Link 
          to="/wishlist" 
          className="px-4 py-2 rounded-lg flex items-center gap-2 transition duration-300 hover:bg-teal-600 hover:text-white"
        >
          <FaHeart size={20} className="text-red-500" /> {/* Heart icon in red color */}
          Wishlist
        </Link>
      </div>
    </nav>
  );
};

export default Header;
