import React from "react";
import RegisterForm from "../RegisterForm";
import { register } from "../../api/auth";

function RegisterModal({ show, handleClose }) {
  console.log("Modal visibility:", show);
  if (!show) return null; // Render nothing if the modal is not visible

  const handleSubmit = async (data) => {
    try {
      const response = await register(data);
      console.log("Registration successful:", response);
      alert("You have successfully registered!");
      handleClose();
    } catch (error) {
      console.error("Registration failed:", error.message);
      alert(error.message);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex="-1"
      aria-labelledby="registerModalLabel"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="registerModalLabel">
              Register
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <RegisterForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
