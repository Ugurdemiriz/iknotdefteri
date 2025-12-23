// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ContentPage from "./pages/ContentPage";
import PricingPage from "./pages/PricingPage";



const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app" element={<ContentPage />} />
      <Route path="/pricing" element={<PricingPage />} />
    </Routes>
  );
};

export default App;


