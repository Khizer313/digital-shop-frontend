import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ data, id }) => {
  const navigate = useNavigate();

  // --- Image URL handling ---
  const rawUrl =
    data?.attributes?.image?.data?.[0]?.attributes?.url ||
    data?.attributes?.image?.data?.[0]?.attributes?.formats?.small?.url ||
    "";

  // ✅ Only prepend backend URL if it's relative (starts with "/")
  const imgUrl = rawUrl.startsWith("/")
    ? (process.env.REACT_APP_STRIPE_APP_DEV_URL || "http://localhost:1337") + rawUrl
    : rawUrl;

  return (
    <div
      id="Product"
      className="product-card"
      onClick={() => navigate("/product/" + id)}
    >
      <div className="thumbnail">
        <img alt={data?.attributes?.title || "Product Image"} src={imgUrl} />
      </div>
      <div className="prod-details">
        <span className="name">{data?.attributes?.title}</span>
        <span className="price">₹{data?.attributes?.price || "N/A"}</span>
      </div>
    </div>
  );
};

export default Product;
