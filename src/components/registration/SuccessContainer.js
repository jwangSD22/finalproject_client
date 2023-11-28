import React from "react";
import "animate.css";
import "./success-container.css";

const SuccessContainer = ({ setShowRegistration }) => {
  const onClose = () => {
    setShowRegistration(null);
  };

  return (
    <div className="success-container container col-lg-4 d-flex flex-column bg-success animate__animated animate__bounceInUp">
      <div
        className="alert alert-success d-flex justify-content-between"
        role="alert"
      >
        <h4>User created successfully!</h4>
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
      <p className="text-light">Please login with your credentials.</p>
    </div>
  );
};

export default SuccessContainer;
