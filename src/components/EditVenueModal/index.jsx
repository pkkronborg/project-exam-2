import React, { useState } from "react";
import EditVenueForm from "../EditVenueForm";
import { updateVenue } from "../../api/venues";

function EditVenueModal({ show, handleClose, initialValues, onUpdateSuccess }) {
  const [errorMessage, setErrorMessage] = useState("");
  if (!show) return null;

  const handleFormSubmit = async (formData) => {
    setErrorMessage("");
    try {
      await updateVenue(formData, initialValues.id);
      handleClose();
      if (onUpdateSuccess) onUpdateSuccess();
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div className="modal fade show d-flex justify-content-center align-items-center">
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
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditVenueModal;
