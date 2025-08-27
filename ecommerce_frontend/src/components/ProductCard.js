import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <Link to={`/product/${product.slug}`}>
        {/* Display main image */}
        {product.main_image && (
          <img
            src={product.main_image}
            alt={product.name}
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        )}
        <h3>{product.name}</h3>
      </Link>
      <p>${product.price}</p>

      
    </div>
  );
}
