import React, { useState } from "react";
import RegisterForm from "../RegisterForm";
import { register } from "../../api/auth";

function RegisterModal({ show, handleClose }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  if (!show) return null; // Render nothing if the modal is not visible

  const handleSubmit = async (data) => {
    setErrorMessage("");
    try {
      const response = await register(data);
      console.log("Registration successful:", response);
      setSuccessMessage("Registration successful! You can now log in.");
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleModalClose = () => {
    setSuccessMessage("");
    setErrorMessage("");
    handleClose();
  };

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      aria-labelledby="registerModalLabel"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-4">
          <div className="modal-header border-0">
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h2 className="text-center mb-4">Register</h2>
            {successMessage ? (
              <div>
                <div className="text-center">{successMessage}</div>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={handleModalClose}
                  >
                    OK!
                  </button>
                </div>
              </div>
            ) : (
              <RegisterForm
                onSubmit={handleSubmit}
                errorMessage={errorMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
