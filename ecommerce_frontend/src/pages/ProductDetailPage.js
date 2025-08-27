import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    api
      .get(`products/${slug}/`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.main_image); // default main image
      })
      .catch(console.error);
  }, [slug]);

  if (!product) return <p>Loading…</p>;

  return (
    <div className="product-detail">
      {/* LEFT: Product Images */}
      <div className="product-images">
        <img
          src={selectedImage}
          alt={product.name}
          className="main-image"
        />

        <div className="thumbnail-gallery">
          {product.images &&
            product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} ${idx}`}
                className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
        </div>
      </div>

      {/* RIGHT: Product Info */}
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <strong className="price">${product.price}</strong>

        <div>
          <button className="add-to-cart" onClick={() => addToCart(product, 1)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
