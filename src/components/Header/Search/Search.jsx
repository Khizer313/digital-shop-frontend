import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import "./Search.scss";
import useFetch from "../../../hooks/useFetch.js";
import { useNavigate } from "react-router-dom";

const Search = ({ setSearchModal }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => setQuery(e.target.value);

  // ✅ Search in title, desc, and price
  let { data } = useFetch(
    query.length
      ? `/api/products?populate=*&filters[$or][0][title][$containsi]=${query}&filters[$or][1][desc][$containsi]=${query}&filters[$or][2][price][$containsi]=${query}`
      : null
  );

  return (
    <div className="search-modal" role="dialog" aria-modal="true">
      <Helmet>
        <title>
          {query ? `Search results for "${query}"` : "Search"} | JSDEV STORE
        </title>
        <meta
          name="description"
          content={
            query
              ? `Search results for "${query}" in JSDEV STORE.`
              : "Search products in JSDEV STORE."
          }
        />
      </Helmet>

      <div className="form-field">
        <input
          autoFocus
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={onChange}
          aria-label="Search products"
        />
        <MdClose className="close-btn" onClick={() => setSearchModal(false)} />
      </div>

      <div className="search-result-content">
        {!data?.data?.length && (
          <div className="start-msg">
            Start typing to see products you are looking for.
          </div>
        )}
        <div className="search-results">
          {data?.data?.map((item) => {
            const attributes = item?.attributes;
            const imageData = attributes?.image?.data?.[0]?.attributes;
            const imgUrl =
              imageData?.url ||
              imageData?.formats?.thumbnail?.url ||
              imageData?.formats?.small?.url ||
              "";

            return (
              <div
                className="search-result-item"
                key={item.id}
                onClick={() => {
                  navigate("/product/" + item.id);
                  setSearchModal(false);
                }}
              >
                <div className="image-container">
                  {imgUrl ? (
                    <img
                      src={process.env.REACT_APP_STRIPE_APP_DEV_URL + imgUrl}
                      alt={attributes?.title || "Product Image"}
                    />
                  ) : (
                    <div className="no-image">Image not available</div>
                  )}
                </div>
                <div className="prod-details">
                  <span className="name">{attributes?.title}</span>
                  <span className="desc">{attributes?.desc}</span>
                  <span className="price">&#8377;{attributes?.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
