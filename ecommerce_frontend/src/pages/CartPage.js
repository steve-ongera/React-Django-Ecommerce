import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage(){
  const { cart, updateQty, removeItem, totalPrice } = useCart();
  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? <p>Cart is empty — <Link to="/">Shop now</Link></p> : (
        <>
          {cart.map(item => (
            <div key={item.product.id}>
              <h4>{item.product.name}</h4>
              <p>Price: ${item.product.price}</p>
              <p>
                Qty: <input type="number" min="1" value={item.quantity}
                     onChange={e => updateQty(item.product.id, Number(e.target.value))} />
                <button onClick={() => removeItem(item.product.id)}>Remove</button>
              </p>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <Link to="/checkout"><button>Proceed to Checkout</button></Link>
        </>
      )}
    </div>
  );
}
