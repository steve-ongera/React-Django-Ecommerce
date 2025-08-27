// src/context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQty = (productId, quantity) => {
    setCart(prev => prev.map(i => i.product.id === productId ? { ...i, quantity } : i));
  };

  const removeItem = (productId) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.reduce((s, i) => s + Number(i.product.price) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
