import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ data, id }) => {
  const navigate = useNavigate();

  const imageData = data?.attributes?.image?.data?.[0]?.attributes;
  const imgPath =
    imageData?.url || imageData?.formats?.small?.url || "";

  // ✅ Only prepend backend URL if relative
  const imgUrl = imgPath.startsWith("http")
    ? imgPath
    : (process.env.REACT_APP_STRIPE_APP_DEV_URL || "https://digital-shop-backend-production.up.railway.app") + imgPath;
console.log(imgUrl, 'urlllllllll of img');
console.log(imgPath, 'pathhhhhhhh of img');

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
