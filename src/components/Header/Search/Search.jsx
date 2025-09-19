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

  let { data } = useFetch(
    `/api/products?populate=*&filters[title][$contains]=${query}`
  );

  if (!query.length) data = null;

  return (
    <div className="search-modal" role="dialog" aria-modal="true">
      <Helmet>
        <title>{query ? `Search results for "${query}"` : "Search"} | JSDEV STORE</title>
        <meta
          name="description"
          content={query ? `Search results for "${query}" in JSDEV STORE.` : "Search products in JSDEV STORE."}
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
          {data?.data?.map((item) => (
            <div
              className="search-result-item"
              key={item.id}
              onClick={() => {
                navigate("/product/" + item.id);
                setSearchModal(false);
              }}
            >
              <div className="image-container">
                <img
                  src={
                    process.env.REACT_APP_STRIPE_APP_DEV_URL +
                    (item?.img?.[0]?.url || "")
                  }
                  alt={item?.title || "Product Image"}
                />
              </div>
              <div className="prod-details">
                <span className="name">{item?.title}</span>
                <span className="desc">{item?.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
