import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
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
