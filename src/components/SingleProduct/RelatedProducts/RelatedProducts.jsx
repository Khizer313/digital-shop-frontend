import React from "react";
import useFetch from "../../../hooks/useFetch";
import Products from "../../Products/Products";
import Skeleton from "../../skelton/Skelton";

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
