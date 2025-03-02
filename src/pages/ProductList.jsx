import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState(""); // Sorting state
  const [priceRange, setPriceRange] = useState(""); // Price filter
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle live search filtering
  useEffect(() => {
    let updatedProducts = [...products];

    if (searchQuery.trim() !== "") {
      updatedProducts = updatedProducts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priceRange === "low") {
      updatedProducts = updatedProducts.filter((p) => p.price < 50);
    } else if (priceRange === "mid") {
      updatedProducts = updatedProducts.filter(
        (p) => p.price >= 50 && p.price <= 150
      );
    } else if (priceRange === "high") {
      updatedProducts = updatedProducts.filter((p) => p.price > 150);
    }

    if (sortOption === "priceLow") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHigh") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "nameAsc") {
      updatedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "nameDesc") {
      updatedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(updatedProducts);
  }, [searchQuery, products, sortOption, priceRange]);

  return (
    <div className="p-6 bg-teal-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-black">
        Shoppers Shop
      </h1>

      {/* Search & Filter Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {/* Search Box */}
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
        />

        {/* Price Filter */}
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
        >
          <option value="">💲 All Prices</option>
          <option value="low">⬇️ Below $50</option>
          <option value="mid">💲 $50 - $150</option>
          <option value="high">⬆️ Above $150</option>
        </select>

        {/* Sorting */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
        >
          <option value="">🔽 Sort By</option>
          <option value="priceLow">💰 Price: Low to High</option>
          <option value="priceHigh">💰 Price: High to Low</option>
          <option value="nameAsc">🔠 Name: A-Z</option>
          <option value="nameDesc">🔡 Name: Z-A</option>
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistItems.some(
            (item) => item.id === product.id
          );

          return (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-xl border border-gray-300 relative"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-contain rounded-lg mb-4"
              />
              <h2 className="text-2xl font-semibold text-gray-800">
                {product.title}
              </h2>
              <p className="text-lg text-gray-600 mb-4">${product.price}</p>

              {/* Wishlist Button */}
              <button
                onClick={() =>
                  isWishlisted
                    ? dispatch(removeFromWishlist(product.id))
                    : dispatch(addToWishlist(product))
                }
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                {isWishlisted ? (
                  <FaHeart size={24} />
                ) : (
                  <FaRegHeart size={24} />
                )}
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={() => {dispatch(addToCart(product));
                  alert('Item added to cart!');
                }}
                className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition cursor-pointer"
              >
                Add to Cart
              </button>

              <Link
                to={`/product/${product.id}`}
                className="block text-center mt-3 text-black hover:text-white hover:bg-teal-500 transition px-4 py-2 rounded-lg border-2 border-black"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
