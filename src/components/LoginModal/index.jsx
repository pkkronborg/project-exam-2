import React from "react";
import { login } from "../../api/auth";
import LoginForm from "../LoginForm";
import { useAuth } from "../../state/auth";

function LoginModal({ show, handleClose }) {
  const { login: authLogin } = useAuth();
  if (!show) return null; // Render nothing if the modal is not visible

  const handleSubmit = async (data) => {
    try {
      const response = await login(data);
      authLogin(response.data);
      handleClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
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
            <h2 className="text-center mb-4">Log In</h2>
            <LoginForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
