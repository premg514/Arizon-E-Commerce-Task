"use client";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import { ShoppingCart, Home, Menu, X } from "lucide-react";

export default function Header() {
  const { cartItems } = useContext(CartContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(cartItems.length);

  // Add scroll event listener to change header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animate cart count when it changes
  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems.length]);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm shadow-lg" : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center transition-transform duration-300 hover:scale-105"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              🛒 Arizon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 flex items-center gap-1 text-sm font-medium"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 relative group"
            >
              <ShoppingCart size={16} className="group-hover:animate-bounce" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-6 flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 text-white text-xs font-bold animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <div className="relative">
                  <Menu size={24} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-blue-500 text-white text-xs font-bold">
                      {totalItems}
                    </span>
                  )}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            <Link
              href="/"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home size={18} />
              Home
            </Link>
            <Link
              href="/cart"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingCart size={18} />
              Cart ({totalItems})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
