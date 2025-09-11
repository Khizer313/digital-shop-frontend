// Skeleton.jsx
import "./Skelton.scss";

const Skeleton = ({ type }) => {
  return (
    <div className={`skeleton ${type}`}>
      <div className="skeleton-shimmer"></div>
    </div>
  );
};

export default Skeleton;
