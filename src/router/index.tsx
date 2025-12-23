// src/router/index.tsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ContentPage from "../pages/ContentPage";
import PricingPage from "../pages/PricingPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* TAKVİM EKRANI */}
      <Route path="/app" element={<ContentPage />} />

      <Route path="/pricing" element={<PricingPage />} />
    </Routes>
  );
}

