import React, { useEffect, useContext, useState } from "react";
import { Helmet } from "react-helmet-async"; // ✅ Helmet import
import "./Home.scss";
import Banner from "./Banner/Banner.jsx";
import Category from "./Category/Category.jsx";
import Products from "../Products/Products.jsx";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context.js";

const Home = () => {
  const {
    products,
    setProducts,
    categories,
    setCategories,
    name,
    setName,
    abouts,
    setAbouts,
    contacts,
    setContacts,
  } = useContext(Context);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // --- Fetch products & categories ---
  useEffect(() => {
    const getProducts = () => {
      setLoadingProducts(true);
      fetchDataFromApi("/api/products?populate=*")
        .then((res) => setProducts(res))
        .finally(() => setLoadingProducts(false));
    };

    const getCategories = () => {
      setLoadingCategories(true);
      fetchDataFromApi("/api/categories?populate=*")
        .then((res) => setCategories(res))
        .finally(() => setLoadingCategories(false));
    };

    getProducts();
    getCategories();
  }, [setProducts, setCategories]);

  // --- Fetch other data ---
  useEffect(() => { fetchDataFromApi("/api/names").then(setName); }, [setName]);
  useEffect(() => { fetchDataFromApi("/api/abouts").then((res) => setAbouts(res.data)); }, [setAbouts]);
  useEffect(() => { fetchDataFromApi("/api/contacts").then((res) => setContacts(res.data)); }, [setContacts]);

  // --- Auto notifications ---
  useEffect(() => {
    if (!("Notification" in window)) return;

    let timers = [];

    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") return;

      const fetchAndNotify = async () => {
        try {
          const res = await fetchDataFromApi("/api/notifications?populate=*");
          const notifications = res?.data || [];

          notifications.forEach(({ title, mint }) => {
            const interval = (mint || 1) * 60 * 1000; // 1 min default

            const showNotification = () => {
              new Notification(title, {
                body: "Check our latest update 🔔",
                icon: "/logo192.png",
              });
            };

            // Show immediately
            showNotification();

            // Repeat based on interval
            const timer = setInterval(showNotification, interval);
            timers.push(timer);
          });
        } catch (err) {
          console.error("Failed to fetch notifications:", err);
        }
      };

      fetchAndNotify();
    });

    // Cleanup timers on unmount
    return () => timers.forEach((t) => clearInterval(t));
  }, []);

  // --- Dynamic SEO ---
  const pageTitle = name?.data?.attributes?.title || "JSDEV | STORE";
  const pageDesc =
    name?.data?.attributes?.description ||
    "Best online store for electronics and gadgets.";

  return (
    <div>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content="/logo192.png" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} loading={loadingCategories} />
          <Products products={products} loading={loadingProducts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
