import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, incrementQuantity, decrementQuantity } from "../redux/cartSlice";
import { FaTrashAlt, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen p-8 bg-teal-50 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <FaShoppingCart /> Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">🛒 Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-3xl space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg border-2 border-teal-300"
              />

              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-600 text-md">${item.price.toFixed(2)}</p>

                <div className="flex items-center mt-2">
                  <button
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    className="bg-gray-300 text-gray-800 px-3 py-2 rounded-full hover:bg-gray-400 transition"
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-3 text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item.id))}
                    className="bg-gray-300 text-gray-800 px-3 py-2 rounded-full hover:bg-gray-400 transition"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="bg-red-400 text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition cursor-pointer"
              >
                <FaTrashAlt /> Remove
              </button>
            </div>
          ))}

          <div className="text-right text-2xl font-bold mt-6 p-4 bg-white rounded-lg shadow-md">
            Total Amount: <span className="text-green-600">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
