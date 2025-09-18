import "./Products.scss";
import Product from "./Product/Product.jsx";
import Skeleton from "../skelton/Skelton.jsx";

const Products = ({ products }) => {
  const productItems = products?.data || [];
  const showSkeleton = productItems.length === 0;

  return (
    <div className="products-container" id="Products">
      <h2 className="sec-heading">Our Products</h2>

      <div className="products">
        {showSkeleton
          ? Array.from({ length: 4 }, (_, i) => <Skeleton key={i} type="product" />)
          : productItems.map((item) => (
              <Product key={item.id} data={item} id={item.id} />
            ))}
      </div>
    </div>
  );
};

export default Products;
