'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Change this to adjust the number of items per page

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  const filterByCategory = (category) => {
    if (category === 'all') return setFiltered(products);
    setFiltered(products.filter((p) => p.category === category));
    setCurrentPage(1); // Reset to the first page when filtering by category
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div>
      <CategoryFilter onFilter={filterByCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-lg">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}
