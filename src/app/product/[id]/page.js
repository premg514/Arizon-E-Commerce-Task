'use client';
import { useEffect, useState, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CartContext } from '@/context/CartContext';
import { Star, ShoppingCart, ArrowLeft, ChevronRight, Truck, Shield, Clock } from 'lucide-react';
import Image from 'next/image';

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching product:', err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const productWithQuantity = { ...product, quantity };
      addToCart(productWithQuantity);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };
console.log(quantity)
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };


  // Format price with proper currency symbol
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-100 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h2>
        <p className="text-gray-600 mb-6">Sorry, we couldn&apos;t find the product you&apos;re looking for.</p>

        <Link 
          href="/" 
          className="inline-flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Shop
        </Link>
      </div>
    );
  }

  // Calculate random rating if not provided by API
  const rating = product.rating?.rate || (3 + Math.random() * 2).toFixed(1);
  const reviewCount = product.rating?.count || Math.floor(Math.random() * 500) + 20;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link href="/" className="hover:text-blue-600 transition-colors">Shop</Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-800">{product.category}</span>
      </nav>

      {/* Product Detail Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white rounded-xl p-6 flex items-center justify-center">
            <div className="relative aspect-square w-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
              {!imageLoaded && <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>}
              <Image
                src={product.image} 
                alt={product.title} 
                className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
          
          {/* Ratings */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  fill={i < Math.floor(rating) ? "#FBBF24" : "none"}
                  stroke={i < Math.floor(rating) ? "#FBBF24" : "#D1D5DB"}
                />
              ))}
            </div>
            <span className="text-gray-700 mr-2">{rating}</span>
            <span className="text-gray-500">({reviewCount} reviews)</span>
          </div>
          
          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-blue-600">{formatPrice(product.price)}</span>
            <span className="text-sm text-gray-500 ml-2">In stock</span>
          </div>
          
          {/* Tabs for Description */}
          <div className="mb-6">
            <div className="flex border-b border-gray-200">
              <button 
                onClick={() => setActiveTab('description')}
                className={`pb-2 pt-1 px-4 font-medium text-sm ${
                  activeTab === 'description' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('details')}
                className={`pb-2 pt-1 px-4 font-medium text-sm ${
                  activeTab === 'details' 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Details
              </button>
            </div>
            
            <div className="py-4">
              {activeTab === 'description' ? (
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              ) : (
                <div className="space-y-2">
                  <p className="flex justify-between text-sm">
                    <span className="text-gray-500">Category</span>
                    <span className="text-gray-800 font-medium capitalize">{product.category}</span>
                  </p>
                  <p className="flex justify-between text-sm">
                    <span className="text-gray-500">ID</span>
                    <span className="text-gray-800 font-medium">{product.id}</span>
                  </p>
                  <p className="flex justify-between text-sm">
                    <span className="text-gray-500">Rating</span>
                    <span className="text-gray-800 font-medium">{rating} out of 5</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="text-gray-700 mr-4">Quantity:</span>
            <div className="flex border border-gray-300 rounded-md">
              <button 
                onClick={decrementQuantity}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors border-r border-gray-300"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center focus:outline-none text-gray-700"
              />
              <button 
                onClick={incrementQuantity}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors border-l border-gray-300"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart and Wishlist Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            
           
          </div>
          
          {/* Shipping Information */}
          <div className="border-t border-gray-200 pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Truck size={20} className="text-gray-400" />
              <span className="text-sm text-gray-700">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-gray-400" />
              <span className="text-sm text-gray-700">Delivery within 3-5 business days</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-gray-400" />
              <span className="text-sm text-gray-700">1 year warranty included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}