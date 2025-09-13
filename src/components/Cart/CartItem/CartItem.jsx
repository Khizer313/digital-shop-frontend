import React, { useContext } from "react";
import { Context } from "../../../utils/context.js";
import { MdClose } from "react-icons/md";
import "./CartItem.scss";

const CartItem = () => {
  const { cartItems, handleRemoveFromCart, handleCartProductQuantity } =
    useContext(Context);
console.log(JSON.stringify(cartItems, null, 2));

  return (
    <div className="cart-products">
      {cartItems?.map((item) => (
        <div className="search-result-item" key={item?.id}>
          {/* ✅ Image */}
          <div className="image-container">
            {item?.img?.url ? (
              <img
                src={process.env.REACT_APP_STRIPE_APP_DEV_URL + item?.img?.url}
                alt={item?.title}
              />
            ) : (
              <div className="no-image">Image not available</div>
            )}
          </div>

          {/* ✅ Product Details */}
          <div className="prod-details">
            {/* Title */}
            <span className="name">{item?.title}</span>

            {/* Remove Button */}
            <MdClose
              className="close-btn"
              onClick={() => handleRemoveFromCart(item)}
            />

            {/* Quantity Control */}
            <div className="quantity-buttons">
              <span onClick={() => handleCartProductQuantity("dec", item)}>-</span>
              <span>{item?.quantity}</span>
              <span onClick={() => handleCartProductQuantity("inc", item)}>+</span>
            </div>

            {/* Price Calculation */}
            <div className="text">
              <span>{item?.quantity}</span> x
              <span>&#8377;{item?.price}</span> =
              <span className="highlight">
                &#8377;{item?.price * item?.quantity}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
