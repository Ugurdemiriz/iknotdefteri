import React from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  sticky?: boolean;
}

const Header: React.FC<HeaderProps> = ({ sticky = false }) => {
  return (
    <header
      className={`w-full py-4 z-50 ${
        sticky ? "sticky top-0 backdrop-blur bg-white/70 shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-brand">
          İK Not Defteri
        </Link>

        <nav className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-brand transition">
            Ana Sayfa
          </Link>
          <Link to="/app" className="hover:text-brand transition">
            Uygulama
          </Link>
          <Link to="/pricing" className="hover:text-brand transition">
            Fiyatlandırma
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

