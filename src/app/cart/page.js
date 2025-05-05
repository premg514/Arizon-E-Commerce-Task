'use client';
import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { CartContext } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import { ShoppingCart, ArrowLeft,  } from 'lucide-react';

export default function CartPage() {
  const { cartItems } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);


  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        <span className="text-gray-500 text-lg">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingCart size={32} className="text-gray-400" />
            </div>
          </div>
          <h2 className="text-2xl font-medium text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet. Start shopping to fill it up!
          </p>
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-medium text-gray-800">Shopping Cart</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {cartItems.map(item => (
                <div key={item.id} className="p-1">
                  <CartItem product={item} />
                </div>
              ))}
            </div>
          </div>
            
         
        </>
      )}
    </div>
  );
}