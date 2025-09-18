import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ data, id }) => {
  const navigate = useNavigate();

  // Image URL handling (Cloudinary OR local Strapi upload)
  const rawUrl =
    data?.attributes?.image?.data?.[0]?.attributes?.url || "";

  const imgUrl = rawUrl.startsWith("http")
    ? rawUrl
    : process.env.REACT_APP_STRIPE_APP_DEV_URL + rawUrl || "/placeholder.png";

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
