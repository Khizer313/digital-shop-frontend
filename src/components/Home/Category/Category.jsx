import { useNavigate } from "react-router-dom";
import "./Category.scss";
import Skeleton from "../../skelton/Skelton";

const Category = ({ categories }) => {
  const navigate = useNavigate();

  // Permanent skeleton fallback
  const categoryItems = categories?.data;
  const showSkeleton = !categoryItems || categoryItems.length === 0;

  return (
    <div id="Category" className="shop-by-category">
      <div className="categories">
        {showSkeleton
          ? Array(4)
              .fill(0)
              .map((_, i) => <Skeleton key={i} type="category" />)
          : categoryItems.map((item) => {
              const imgUrl =
                process.env.REACT_APP_STRIPE_APP_DEV_URL +
                (item?.img?.url || item?.img?.formats?.small?.url || "");
              return (
                <div
                  key={item.id}
                  className="category"
                  onClick={() => navigate(`/category/${item.id}`)}
                >
                  <img src={imgUrl} alt={item?.title || "Category"} />
                  <h3>{item?.title}</h3>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Category;
