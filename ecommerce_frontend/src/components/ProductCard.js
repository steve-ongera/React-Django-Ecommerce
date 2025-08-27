import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }){
  return (
    <div className="card">
      <Link to={`/product/${product.slug}`}>
        <h3>{product.name}</h3>
      </Link>
      <p>${product.price}</p>
    </div>
  );
}
