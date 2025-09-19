import { useNavigate } from "react-router-dom";
import "./Product.scss";

const Product = ({ data }) => {
  const navigate = useNavigate();

  // Product data destructure
  const productId = data?.id;
  const title = data?.title;
  const desc = data?.desc;
  const price = data?.price;

  // Image (first image from array)
  const imageUrl = data?.img?.[0]?.url || "";

  // First category (if exists)
  const category = data?.categories?.[0]?.title;

  return (
    <div 
      className="product-card" 
      onClick={() => navigate(`/product/${productId}`)}
    >
      {/* Image */}
      <div className="product-image">
        {imageUrl ? (
          <img src={imageUrl} alt={title} />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>

      {/* Info */}
      <div className="product-info">
        <h3>{title}</h3>
        <p className="product-desc">{desc}</p>
        <p className="product-price">Rs {price}</p>
        {category && <span className="product-category">{category}</span>}
      </div>
    </div>
  );
};

export default Product;
