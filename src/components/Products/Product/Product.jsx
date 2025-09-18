import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ data, id }) => {
  const navigate = useNavigate();

  const imageData = data?.attributes?.image?.data?.[0]?.attributes;
  const imgPath =
    imageData?.url || imageData?.formats?.small?.url || "";

  const imgUrl = imgPath.startsWith("http")
    ? imgPath
    : (process.env.REACT_APP_STRIPE_APP_DEV_URL || "http://localhost:1337") + imgPath;

  return (
    <div
      id="Product"
      className="product-card"
      onClick={() => navigate("/product/" + id)}
    >
      <div className="thumbnail">
        <img
          src={imgUrl || "/placeholder.png"}
          alt={data?.attributes?.title || "Product"}
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
