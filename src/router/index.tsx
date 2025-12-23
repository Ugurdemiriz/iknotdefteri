import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ContentPage from "../pages/ContentPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* TAKVİM EKRANI */}
        <Route path="/app" element={<ContentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
