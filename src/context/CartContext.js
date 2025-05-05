'use client';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles

// Fake Store API base URL
const API_URL = 'https://fakestoreapi.com/products';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart items from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // Save cart items to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add an item to the cart
  const addToCart = async (product) => {
    setLoading(true);  // Set loader to true
    const existing = cartItems.find((item) => item.id === product.id);
    try {
      if (existing) {
        // Update quantity if item already exists in the cart
        await updateQuantity(product.id, product.quantity?product.quantity+existing.quantity:existing.quantity+1 );
        toast.success('Updated item in cart!');
      } else {
        // Add new item to the cart
        setCartItems((prev) => [...prev, { ...product,quantity: product.quantity?product.quantity: 1 }]);
        toast.success('Item added to cart!');
      }
    } catch (error) {
      toast.error('Error adding item to cart');
    } finally {
      setLoading(false);  // Set loader to false
    }
  };

  // Function to update quantity of a cart item
  const updateQuantity = async (id, newQuantity) => {
    setLoading(true);  // Set loader to true
    try {
      // Call your API to update the quantity
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (response.ok) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
        toast.success('Quantity updated!');
      } else {
        throw new Error('Failed to update quantity');
      }
    } catch (error) {
      toast.error('Error updating quantity');
    } finally {
      setLoading(false);  // Set loader to false
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = async (id) => {
    setLoading(true);  // Set loader to true
    try {
      // Call your API to remove the item
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        toast.success('Item removed from cart!');
      } else {
        throw new Error('Failed to remove item');
      }
    } catch (error) {
      toast.error('Error removing item');
    } finally {
      setLoading(false);  // Set loader to false
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, loading }}>
      {children}
    </CartContext.Provider>
  );
}
