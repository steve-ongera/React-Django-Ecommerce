import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function CheckoutPage(){
  const { cart, clearCart, totalPrice } = useCart();
  const { authTokens } = useAuth();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (!authTokens) {
      alert("You must log in to place an order");
      nav("/login");
      return;
    }
    try {
      setLoading(true);
      // 1) create order
      const orderRes = await api.post("orders/", {}); // backend creates user via perform_create
      const orderId = orderRes.data.id;

      // 2) create order items
      for (const item of cart) {
        await api.post("order-items/", {
          order: orderId,
          product_id: item.product.id,
          quantity: item.quantity
        });
      }

      clearCart();
      nav("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total: ${totalPrice.toFixed(2)}</p>
      <button onClick={placeOrder} disabled={loading}>{loading ? "Placing..." : "Place order"}</button>
    </div>
  );
}
