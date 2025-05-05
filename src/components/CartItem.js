'use client';
import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import { Trash2, Minus, Plus } from 'lucide-react';
import Image from 'next/image';

export default function CartItem({ product }) {
  const { removeFromCart, updateQuantity } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleIncrement = () => {
    updateQuantity(product.id, product.quantity + 1);
  };

  const handleDecrement = () => {
    if (product.quantity > 1) {
      updateQuantity(product.id, product.quantity - 1);
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price);

  const totalPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(product.price * product.quantity);

  return (
    <div 
      className="flex flex-col sm:flex-row justify-between items-center rounded-lg p-4 mb-4 transition-all duration-300 ease-in-out shadow hover:shadow-md border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image and Details */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-3 sm:mb-0">
        <div className={`relative rounded-md overflow-hidden bg-gray-50 p-2 transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}>
          <Image
            src={product.image} 
            alt={product.title}
            className="h-24 w-24 object-contain" 
          />
        </div>
        
        <div className="text-center sm:text-left">
          <h3 className="font-medium text-gray-800 text-lg mb-1 line-clamp-1">{product.title}</h3>
          <p className="text-green-600 font-medium">{formattedPrice} each</p>
          <p className="text-sm text-gray-500 mt-1">Total: <span className="font-bold text-gray-700">{totalPrice}</span></p>
        </div>
      </div>

      {/* Quantity Controls and Remove Button */}
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <button
            onClick={handleDecrement}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-l-md transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          
          <div className="flex justify-center items-center bg-white border-y border-gray-200 px-4 py-1 min-w-10">
            <span className="font-medium text-gray-800">{product.quantity}</span>
          </div>
          
          <button
            onClick={handleIncrement}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-r-md transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <button
          onClick={() => removeFromCart(product.id)}
          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}