"use client";
import { useEffect, useState } from "react";

export default function CategoryFilter({ onFilter }) {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setIsLoading(false);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onFilter(category);
  };

  // Capitalize first letter of each word
  const formatCategoryName = (category) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="my-6">
      <h2 className="text-lg font-medium text-gray-800 mb-3">Categories</h2>

      <div className="flex gap-2 flex-wrap">
        {isLoading ? (
          <div className="flex gap-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-10 w-24 bg-gray-200 animate-pulse rounded-full"
              ></div>
            ))}
          </div>
        ) : (
          <>
            <button
              onClick={() => handleCategoryClick("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                activeCategory === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Products
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer
px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md ${
                  activeCategory === category
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {formatCategoryName(category)}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
