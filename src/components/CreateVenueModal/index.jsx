import React from "react";
import { createVenue } from "../../api/venues";
import CreateVenueForm from "../CreateVenueForm";
import "../../styles/modal.css";

function CreateVenueModal({ show, handleClose, onVenueCreated }) {
  if (!show) return null;

  const handleSubmit = async (data) => {
    try {
      await createVenue(data);
      onVenueCreated();
      handleClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="modal fade show d-flex justify-content-center align-items-center"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      tabIndex="-1"
      aria-labelledby="registerVenueModal"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
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
            <h2 className="text-center mb-4">Register Venue</h2>
            <CreateVenueForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateVenueModal;
