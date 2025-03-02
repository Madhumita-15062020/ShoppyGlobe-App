import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import NotFound from "./pages/NotFound";
import Wishlist from './pages/WishList';

const ProductList = lazy(() => import("./pages/ProductList"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));

const App = () => {
  return (
    <Router>
      <div className="container mx-auto px-4">
        <Header />
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
