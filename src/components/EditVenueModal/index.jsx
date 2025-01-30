import React from "react";
import EditVenueForm from "../EditVenueForm";
import "../../styles/modal.css";

function EditVenueModal({ show, handleClose, initialValues, onSubmit }) {
  if (!show) return null;

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
    handleClose();
  };

  return (
    <div
      className="modal fade show d-flex justify-content-center align-items-center"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
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
            <h2 className="text-center mb-4">Edit Venue</h2>
            <EditVenueForm
              initialValues={initialValues}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditVenueModal;
