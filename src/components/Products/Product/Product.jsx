import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ data, id }) => {
  const navigate = useNavigate();

  const rawUrl = data?.attributes?.image?.data?.[0]?.attributes?.url || "";

  // ✅ Fix: Agar "http" ya "https" se shuru hoti hai to waise hi use karo
  // warna backend ke domain se prepend karo
  const imgUrl =
    rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
      ? rawUrl
      : (process.env.REACT_APP_STRIPE_APP_DEV_URL || "http://localhost:1337") + rawUrl;

  return (
    <div
      id="Product"
      className="product-card"
      onClick={() => navigate("/product/" + id)}
    >
      <div className="thumbnail">
        <img
          alt={data?.attributes?.title || "Product Image"}
          src={imgUrl || "/placeholder.png"}
        />
      </div>
      <div className="prod-details">
        <span className="name">{data?.attributes?.title}</span>
        <span className="price">₹{data?.attributes?.price || "N/A"}</span>
      </div>
    </div>
  );
};

export default Product;
