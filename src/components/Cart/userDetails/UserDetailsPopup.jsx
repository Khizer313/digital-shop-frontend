import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./UserDetailsPopup.scss"; // separate SCSS file

const UserDetailsPopup = ({ onClose, onSend }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    gali: "",
    nearest: "",
    homeNumber: "",
    city: "",
    contact1: "",
    contact2: "",
  });

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    if (
      !userDetails.name ||
      !userDetails.address ||
      !userDetails.gali ||
      !userDetails.nearest ||
      !userDetails.homeNumber ||
      !userDetails.city ||
      !userDetails.contact1
    ) {
      alert("Please fill all required fields");
      return;
    }
    onSend(userDetails);
  };

  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Enter Your Details</h2>
        <form className="popup-form" onSubmit={(e) => e.preventDefault()}>
          <input name="name" placeholder="Name" onChange={handleChange} required />
          <input name="address" placeholder="Address" onChange={handleChange} required />
          <input name="gali" placeholder="Gali Number" onChange={handleChange} required />
          <input name="nearest" placeholder="Nearest Mashoor Jaga" onChange={handleChange} required />
          <input name="homeNumber" placeholder="Home Number" onChange={handleChange} required />
          <input name="city" placeholder="City" onChange={handleChange} required />
          <input name="contact1" placeholder="Contact Number 1" onChange={handleChange} required />
          <input name="contact2" placeholder="Contact Number 2 (Optional)" onChange={handleChange} />

          <div className="popup-buttons">
            <button type="button" onClick={handleSend}>Send to WhatsApp</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default UserDetailsPopup;
