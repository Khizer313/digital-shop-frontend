import React, { useContext } from "react";
import { Context } from "../../../utils/context.js";
import { MdClose } from "react-icons/md";
import "./CartItem.scss";

const CartItem = () => {
  const { cartItems, handleRemoveFromCart, handleCartProductQuantity } =
    useContext(Context);

  // console.log(JSON.stringify(cartItems, null, 2));

  return (
    <div className="cart-products">
      {cartItems?.map((item) => {
        // ✅ Handle image same as Product/Category/SingleProduct
        const imageData = Array.isArray(item?.img) ? item.img[0] : item?.img;
        const imgPath =
          imageData?.url || imageData?.formats?.small?.url || "/placeholder.png";

        const imgUrl = imgPath.startsWith("http")
          ? imgPath
          : (process.env.REACT_APP_STRIPE_APP_DEV_URL ||
              "https://digital-shop-backend-production.up.railway.app") + imgPath;

        return (
          <div className="search-result-item" key={item?.id}>
            {/* ✅ Image */}
            <div className="image-container">
              <img src={imgUrl} alt={item?.title || "Product"} />
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
                <span onClick={() => handleCartProductQuantity("dec", item)}>
                  -
                </span>
                <span>{item?.quantity}</span>
                <span onClick={() => handleCartProductQuantity("inc", item)}>
                  +
                </span>
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
        );
      })}
    </div>
  );
};

export default CartItem;
