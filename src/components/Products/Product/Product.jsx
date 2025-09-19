import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ data, id }) => {
  const navigate = useNavigate();
console.log(data);

  // 👇 Category.jsx ki tarah simple access
  const imgPath = data?.img?.url || data?.img?.formats?.small?.url || "";

  // ✅ Only prepend backend URL if relative
  const imgUrl = imgPath.startsWith("http")
    ? imgPath
    : (process.env.REACT_APP_STRIPE_APP_DEV_URL ||
       "https://digital-shop-backend-production.up.railway.app") + imgPath;
console.log(imgPath, 'path of imageeeeeeeee');
console.log(imgUrl,"urllllllllll of image");

  return (
    <div
      id="Product"
      className="product-card"
      onClick={() => navigate("/product/" + id)}
    >
      <div className="thumbnail">
        <img
          src={imgUrl || "/placeholder.png"}
          alt={data?.title || "Product"}
        />
      </div>
      <div className="prod-details">
        <span className="name">{data?.title}</span>
        <span className="price">₹{data?.price || "N/A"}</span>
      </div>
    </div>
  );
};

export default Product;
