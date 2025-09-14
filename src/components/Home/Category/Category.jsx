import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Category.scss";
import Skeleton from "../../skelton/Skelton.jsx";

const Category = ({ categories }) => {
  const navigate = useNavigate();
  const categoryItems = categories?.data;
  const showSkeleton = !categoryItems || categoryItems.length === 0;

  const firstCategory = categoryItems && categoryItems[0];
  const pageTitle = firstCategory?.title || "Shop Categories | JSDEV STORE";
  const pageDesc =
    firstCategory?.description ||
    "Explore our wide range of categories and find the best products.";

  return (
    <div id="Category" className="shop-by-category">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content="/logo192.png" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="categories">
        {showSkeleton
          ? Array(4)
              .fill(0)
              .map((_, i) => <Skeleton key={i} type="category" />)
          : categoryItems.map((item) => {
              const imgUrl =
                process.env.REACT_APP_STRIPE_APP_DEV_URL +
                (item?.img?.url ||
                  item?.img?.formats?.small?.url ||
                  "");
              return (
                <div
                  key={item.id}
                  className="category-card"
                  onClick={() => navigate(`/category/${item.id}`)}
                >
                  <div className="category-img">
                    <img src={imgUrl} alt={item?.title || "Category"} />
                  </div>
                  <h3>{item?.title}</h3>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Category;
