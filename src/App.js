import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./components/Home/Home.jsx";
import Category from "./components/Category/Category.jsx";
import SingleProduct from "./components/SingleProduct/SingleProduct.jsx";
import Newsletter from "./components/Footer/Newsletter/Newsletter.jsx";
import AppContext from "./utils/context.js";
import Cancel from "./Cancel.jsx";
import Success from "./Success.jsx";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContext>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/product/:id" element={<SingleProduct />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
          <Newsletter />
          <Footer />
        </AppContext>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
