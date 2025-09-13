import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import AppContext from "./utils/context";
import Cancel from "./Cancel";
import Success from "./Success";

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
