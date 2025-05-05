"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { ShoppingCart, Eye, Star } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Format price with proper currency symbol
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(product.price);

  // Truncate long titles
  const truncateTitle = (title, maxLength = 50) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength - 3) + "...";
  };

  // Handle add to cart with animation
  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);

    // Reset animation after a delay
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  // Random rating for demo purposes (between 3.5 and 5)
  const rating = product.rating?.rate || (3.5 + Math.random() * 1.5).toFixed(1);
  const reviewCount =
    product.rating?.count || Math.floor(Math.random() * 500) + 50;

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full ${
        isHovered ? "scale-[1.03] shadow-lg" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product image with hover effect */}
      <div className="relative pt-4 px-4 flex-shrink-0 overflow-hidden bg-gray-50">
        <div className="absolute top-2 left-2 z-10">
          {product.category && (
            <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full capitalize">
              {product.category.split(" ")[0]}
            </span>
          )}
        </div>

        <div
          className={`relative h-48 w-full flex items-center justify-center transition-transform duration-500 ${
            isHovered ? "scale-110" : ""
          }`}
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-h-48 max-w-full object-contain"
          />
        </div>
      </div>

      {/* Product details */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          {/* Title */}
          <h2 className="font-medium text-gray-800 mb-1 line-clamp-2 min-h-12">
            {truncateTitle(product.title)}
          </h2>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400 mr-1">
              <Star size={14} fill="#FBBF24" />
            </div>
            <span className="text-sm font-medium text-gray-700">{rating}</span>
            <span className="text-xs text-gray-500 ml-1">
              ({reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <p className="text-lg font-bold text-blue-600 mb-3">
            {formattedPrice}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/product/${product.id}`}
            className="flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm flex-1"
          >
            <Eye className="text-black" size={14} />
            <span className="text-black">View</span>
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`cursor-pointer
flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm text-white flex-1 transition-all ${
              isAdding
                ? "bg-green-500 scale-105"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <ShoppingCart
              size={14}
              className={isAdding ? "animate-bounce" : ""}
            />
            <span>{isAdding ? "Added!" : "Add to Cart"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
