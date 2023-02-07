import Cart from "features/cart";
import DetailProduct from "pages/DetailProduct";
import FilterProduct from "pages/Filter";
import Home from "pages/Home";
import Payment from "pages/Payment";
import Profile from "pages/Profile";
import * as React from "react";
import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="profile/*" element={<Profile />} />

      <Route path="product/:slug" element={<DetailProduct />} />

      <Route path="cart" element={<Cart />} />

      <Route path="payment" element={<Payment />} />

      <Route path="filter/:slug" element={<FilterProduct />} />
    </Routes>
  );
}
