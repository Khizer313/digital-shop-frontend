import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Products from "../Products/Products";
import "./Category.scss";
import Skeleton from "../skelton/Skelton";

const Category = () => {
  const { id } = useParams();
  const { data, loading } = useFetch(
    `/api/products?populate=*&[filters][categories][id]=${id}`
  );

  const categoryTitle =
    data?.data?.[0]?.attributes?.categories?.data?.[0]?.attributes?.title;

  return (
    <div className="category-main-content">
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
