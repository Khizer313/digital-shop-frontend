import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ data, id }) => {
  const navigate = useNavigate();

  // --- Image URL handling ---
  const imageData = data?.attributes?.image?.data?.[0]?.attributes;

  // Pehle direct Cloudinary ya absolute URL check karo
  let rawUrl = imageData?.url || imageData?.formats?.small?.url || "";

  // ✅ Agar relative path hai ("/uploads/..."), tabhi backend URL prepend karna
  const imgUrl = rawUrl.startsWith("/")
    ? `${process.env.REACT_APP_STRIPE_APP_DEV_URL || "http://localhost:1337"}${rawUrl}`
    : rawUrl;

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
