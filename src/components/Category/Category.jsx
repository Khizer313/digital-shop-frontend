import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useFetch from "../../hooks/useFetch";
import Products from "../Products/Products";
import "./Category.scss";
import Skeleton from "../skelton/Skelton";

const Category = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(
    `/api/products?populate=*&[filters][categories][id]=${id}`
  );

  // Fetch category title from first product
  const categoryTitle =
    data?.data?.[0]?.attributes?.categories?.data?.[0]?.attributes?.title || "Category";

  // SEO meta description (first product description or fallback)
  const metaDescription =
    data?.data?.[0]?.attributes?.description ||
    `Explore products under the ${categoryTitle} category at JSDEV STORE.`;

  return (
    <div className="category-main-content">
      <Helmet>
        <title>{categoryTitle} | JSDEV STORE</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={categoryTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content="/logo192.png" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="layout">
        {loading ? (
          <Skeleton type="category" />
        ) : (
          <div className="category-title">{categoryTitle}</div>
        )}
        <Products innerPage={true} products={data} loading={loading} />
      </div>
    </div>
  );
};

export default Category;
