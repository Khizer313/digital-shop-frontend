import React, { useContext } from "react";
import "./Footer.scss";
import { FaLocationArrow, FaMobileAlt, FaEnvelope } from "react-icons/fa";
import Payment from "../../assets/payments.png";
import { Context } from "../../utils/context";
import { Helmet } from "react-helmet-async";

const Footer = () => {
  const { name, abouts, contacts } = useContext(Context);

  const aboutText = abouts?.[0]?.description || "Check your internet connection!";
  const storeName = name?.[0]?.name || "JSDEVSTORE";
  const address = contacts?.[0]?.address || "Your address";
  const phone = contacts?.[0]?.phone || "Your Phone";
  const email = contacts?.[0]?.email || "Your Email";

  return (
    <div id="Footer" className="footer">
      <Helmet>
        <title>{storeName} | About & Contact</title>
        <meta name="description" content={aboutText} />
        <meta property="og:title" content={storeName} />
        <meta property="og:description" content={aboutText} />
      </Helmet>

      <div className="footer-content">
        <div className="col">
          <div className="title">About</div>
          <div className="text">{aboutText}</div>
        </div>
        <div className="col">
          <div className="title">Contact</div>
          <div className="c-item">
            <FaLocationArrow />
            <div className="text">{address}</div>
          </div>
          <div className="c-item">
            <FaMobileAlt />
            <div className="text">Phone: {phone}</div>
          </div>
          <div className="c-item">
            <FaEnvelope />
            <div className="text">Email: {email}</div>
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <div className="bottom-bar-content">
          <span className="text">
            {storeName} 2025 CREATED BY {storeName}. PREMIUM E-COMMERCE SOLUTIONS.
          </span>
          <img src={Payment} alt="Payment Methods" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
