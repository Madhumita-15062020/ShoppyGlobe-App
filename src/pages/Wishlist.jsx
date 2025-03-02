import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();   

  return (
    <div className="min-h-screen p-8 bg-teal-50 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Your Wishlist ❤️</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">No items in wishlist.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
              <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
              
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-600 text-md">${item.price.toFixed(2)}</p>
              </div>

              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="bg-red-400 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition cursor-pointer"
              >
                <FaTrashAlt /> Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <Link to="/" className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-teal-600 transition">
        Back to Shopping
      </Link>
    </div>
  );
};

export default Wishlist;
