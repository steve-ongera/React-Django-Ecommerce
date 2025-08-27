import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetailPage(){
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`products/${slug}/`).then(res => setProduct(res.data)).catch(console.error);
  }, [slug]);

  if (!product) return <p>Loading…</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <strong>${product.price}</strong>
      <div>
        <button onClick={() => addToCart(product, 1)}>Add to cart</button>
      </div>
    </div>
  );
}
