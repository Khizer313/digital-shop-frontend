import React, { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Context } from "./utils/context";

const Success = () => {
      const { clearCart } = useContext(Context);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      // Direct URL access blocked
      navigate("/");
    }
     clearCart();
  }, [searchParams, navigate, clearCart]);

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundImage: "linear-gradient(to right, #8e2de2, #4a00e0)",
  };

  const containerStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    padding: "40px 30px",
    borderRadius: "20px",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  };

  const headingStyle = {
    color: "white",
    fontSize: "2rem",
    marginBottom: "15px",
  };

  const textStyle = {
    color: "white",
    fontSize: "1.1rem",
    marginBottom: "25px",
  };

  const buttonStyle = {
    padding: "10px 25px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#4a00e0",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const handleHover = (e) => {
    e.target.style.backgroundColor = "#8e2de2";
    e.target.style.transform = "scale(1.05)";
  };

  const handleLeave = (e) => {
    e.target.style.backgroundColor = "#4a00e0";
    e.target.style.transform = "scale(1)";
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Payment Successful!</h1>
        <p style={textStyle}>
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <button
          style={buttonStyle}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
