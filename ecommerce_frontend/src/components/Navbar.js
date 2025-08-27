import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar(){
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  return (
    <nav className="nav">
      <Link to="/">MyShop</Link>
      <div>
        <Link to="/cart">Cart ({totalItems})</Link>
        {user ? (
          <>
            <Link to="/orders">Orders</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
