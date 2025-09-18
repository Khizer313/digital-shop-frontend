import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ data, id }) => {
  const navigate = useNavigate();

  // --- Image URL handling ---
  const imageData = data?.attributes?.image?.data?.[0]?.attributes;

  // URL nikaalo
  let rawUrl = imageData?.url || imageData?.formats?.small?.url || "";

  // ✅ Agar absolute (http/https) hai → as-is use karo
  // ✅ Agar relative ("/uploads/...") hai → backend prepend karo
  const imgUrl = rawUrl.startsWith("http")
    ? rawUrl
    : `${process.env.REACT_APP_STRIPE_APP_DEV_URL || "http://localhost:1337"}${rawUrl}`;

  console.log("Product Image URL =>", imgUrl);

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
