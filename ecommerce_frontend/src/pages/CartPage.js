import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, updateQty, removeItem, totalPrice } = useCart();

  return (
    <div className="cart-container" style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
         Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Your cart is empty —{" "}
          <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
            Shop now
          </Link>
        </p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "2rem",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>Image</th>
                <th style={thStyle}>Product</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product.id}>
                  <td style={tdStyle}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: "60px", borderRadius: "4px" }}
                    />
                  </td>
                  <td style={tdStyle}>{item.product.name}</td>
                  <td style={tdStyle}>${item.product.price}</td>
                  <td style={tdStyle}>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQty(item.product.id, Number(e.target.value))
                      }
                      style={{
                        width: "60px",
                        padding: "4px",
                        textAlign: "center",
                      }}
                    />
                  </td>
                  <td style={tdStyle}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ textAlign: "right" }}>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <Link to="/checkout">
              <button
                style={{
                  background: "green",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

const thStyle = {
  borderBottom: "2px solid #ddd",
  padding: "10px",
  textAlign: "left",
  background: "#f4f4f4",
};

const tdStyle = {
  borderBottom: "1px solid #ddd",
  padding: "10px",
};
