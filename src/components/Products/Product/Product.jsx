import React from "react";
import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ data, id }) => {
  const navigate = useNavigate();

  // Handle single or array images
  const imgUrl =
    process.env.REACT_APP_STRIPE_APP_DEV_URL +
    (Array.isArray(data?.img)
      ? data.img[0]?.url || ""
      : data?.img?.url || "");

  return (
    <div
      id="Product"
      className="product-card"
      onClick={() => navigate("/product/" + id)}
    >
      <div className="thumbnail">
        <img alt={data?.title || "Product Image"} src={imgUrl} />
      </div>
      <div className="prod-details">
        <span className="name">{data?.title}</span>
        <span className="price">₹{data?.price || "N/A"}</span>
      </div>
    </div>
  );
};

export default Product;
