import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function HomePage(){
  const [products, setProducts] = useState([]);
  useEffect(() => {
    api.get("products/").then(res => setProducts(res.data)).catch(console.error);
  }, []);
  return (
    <div>
      <h1>Products</h1>
      <div className="grid">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
