import { useContext, useState } from "react";
import { Context } from "../../utils/context";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import Skeleton from "../skelton/Skelton";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import "./SingleProduct.scss";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { handleAddToCart } = useContext(Context);

  const { data, loading } = useFetch(
    `/api/products?populate=*&[filters][id]=${id}`
  );

  const decrement = () => setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  const increment = () => setQuantity((prev) => prev + 1);

  if (loading || !data) {
    // Skeleton for single product
    return <Skeleton type="single-product" />;
  }

  const product = data?.data?.[0];

  const imgUrl =
    process.env.REACT_APP_STRIPE_APP_DEV_URL +
    (Array.isArray(product?.img) && product?.img.length > 0
      ? product.img[0].url
      : "");

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            {imgUrl ? (
              <img src={imgUrl} alt={product?.title} />
            ) : (
              <div className="no-image">Image not available</div>
            )}
          </div>
          <div className="right">
            <span className="name">{product?.title}</span>
            <span className="price">
              &#8377;{product?.price ? product.price * quantity : "N/A"}
            </span>
            <span className="desc">{product?.desc}</span>

            <div className="cart-buttons">
              <div className="quantity-buttons">
                <span onClick={decrement}>-</span>
                <span>{quantity}</span>
                <span onClick={increment}>+</span>
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => {
                  handleAddToCart(id, product, quantity);
                  setQuantity(1);
                }}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
            </div>

            <span className="divider" />
            <div className="info-item">
              <span className="text-bold">
                Category:{" "}
                <span>{product?.categories?.[0]?.title || "N/A"}</span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </span>
            </div>
          </div>
        </div>

        <RelatedProducts
          productId={id}
          categoryId={product?.categories?.[0]?.id}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
