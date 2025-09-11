import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import "./Newsletter.scss";

const Newsletter = () => {
    return (
        <div className="newsletter-section" id="About">
            <div className="newsletter-content">
                <span className="small-text">Newsletter</span>
                <span className="big-text">
                    Get the latest updates and exclusive offers delivered directly to your inbox
                </span>

                {/* Removed input field, replaced with static text */}
                <div className="form">
                    <span className="text">
                        Subscribe to our newsletter to stay updated with new products and promotions.
                    </span>
                </div>

                <span className="social-icons">
                    <div className="icon">
                        <FaLinkedinIn size={14} />
                    </div>
                    <div className="icon">
                        <FaFacebookF size={14} />
                    </div>
                    <div className="icon">
                        <FaTwitter size={14} />
                    </div>
                    <div className="icon">
                        <FaInstagram size={14} />
                    </div>
                </span>
            </div>
        </div>
    );
};

export default Newsletter;
