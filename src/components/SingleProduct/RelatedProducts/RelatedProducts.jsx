import useFetch from "../../../hooks/useFetch.js";
import Products from "../../Products/Products.jsx";
import Skeleton from "../../skelton/Skelton.jsx";

const RelatedProducts = ({ categoryId, productId }) => {
  const { data, loading } = useFetch(
    `/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoryId}&pagination[start]=0&pagination[limit]=4`
  );

  if (loading || !data) return <Skeleton type="products-grid" />;

  return (
    <div className="related-products">
      <Products headingText="Related Products" products={data} />
    </div>
  );
};

export default RelatedProducts;
