import DetailProduct from "pages/DetailProduct";
import Home from "pages/Home";
import * as React from "react";
import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="product/:slug" element={<DetailProduct />} />
    </Routes>
  );
}
