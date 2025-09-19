import React, { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context.js";
import CartItem from "./CartItem/CartItem.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "../../utils/api.js";
import UserDetailsPopup from "./userDetails/UserDetailsPopup.jsx"; // ✅ import

import "./Cart.scss";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, setShowCart, cartSubTotal } = useContext(Context);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

const handlePayment = async () => {
  try {
    const stripe = await stripePromise;

    const payload = {
      data: {
        products: cartItems.map((item) => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        total: cartSubTotal,
        status: "pending",
      },
    };

    const res = await makePaymentRequest.post("/api/orders", payload);

    if (!res.data?.stripeSession) {
      console.error("No Stripe session returned:", res.data);
      alert("Order created but Stripe session missing!");
      return;
    }

    await stripe.redirectToCheckout({
      sessionId: res.data.stripeSession.id,
    });
  } catch (err) {
    console.error("Checkout Error:", err.response?.data || err.message);
    alert(
      "Checkout failed: " +
        (err.response?.data?.error?.message || "Unknown error")
    );
  }
};



  const handleWhatsappSend = (userDetails) => {
    const { name, address, gali, nearest, homeNumber, city, contact1, contact2 } = userDetails;

    const adminNumber = "923376333235";
    let message = `New Order:%0A`;

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.title} - Qty: ${item.quantity} - Price: ₹${item.price}%0A`;
    });

    message += `Subtotal: ₹${cartSubTotal}%0A%0A`;
    message += `Customer Details:%0A`;
    message += `Name: ${name}%0A`;
    message += `Address: ${address}%0A`;
    message += `Gali: ${gali}%0A`;
    message += `Nearest: ${nearest}%0A`;
    message += `Home Number: ${homeNumber}%0A`;
    message += `City: ${city}%0A`;
    message += `Contact 1: ${contact1}%0A`;
    if (contact2) message += `Contact 2: ${contact2}%0A`;

    window.open(`https://wa.me/${adminNumber}?text=${message}`, "_blank");

    setWhatsappSent(true);
    setShowPopup(false);
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer" onClick={() => setShowCart(false)}></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose className="close-btn" />
            <span className="text">close</span>
          </span>
        </div>

        {!cartItems.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <button className="return-cta" onClick={() => {navigate("/");setShowCart(false); }}>
              RETURN TO SHOP
            </button>
          </div>
        )}

        {!!cartItems.length && (
          <>
            <CartItem />
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                <span className="text total">&#8377;{cartSubTotal}</span>
              </div>
              <div className="button">
                {!whatsappSent && (
                  <button
                    className="whatsapp-cta"
                    onClick={() => setShowPopup(true)}
                  >
                    Send Order on WhatsApp
                  </button>
                )}

                <button
                  className={`checkout-cta ${!whatsappSent ? "disabled" : ""}`}
                  onClick={handlePayment}
                  disabled={!whatsappSent}
                >
                  {whatsappSent ? "Payment" : "Payment after WhatsApp"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Show popup as separate component */}
      {showPopup && (
        <UserDetailsPopup
          onClose={() => setShowPopup(false)}
          onSend={handleWhatsappSend}
        />
      )}
    </div>
  );
};

export default Cart;
