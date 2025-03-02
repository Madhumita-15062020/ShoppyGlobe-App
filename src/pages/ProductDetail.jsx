import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  if (!product) return <p className="text-center text-lg text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-teal-50">
      <div className="max-w-4xl bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
        
        {/* Product Image */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full max-w-md h-100 object-contain mt-6 rounded-lg border-4 border-teal-300 shadow-md"
        />

        {/* Product Description */}
        <p className="text-lg mt-6 text-gray-700 text-center">{product.description}</p>
        
        {/* Product Price */}
        <p className="text-2xl font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-600">
          ${product.price}
        </p>

        {/* Add to Cart Button with Icon */}
        <button
          onClick={() =>{ dispatch(addToCart(product));
            alert('Item added to cart!');
          }}
          className="mt-6 bg-teal-500 text-white px-6 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 hover:bg-teal-600 transition"
        >
          <FaShoppingCart size={20} /> {/* Cart Icon */}
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
