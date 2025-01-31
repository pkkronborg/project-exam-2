import React, { useState } from "react";
import { createVenue } from "../../api/venues";
import CreateVenueForm from "../CreateVenueForm";
import { useNavigate } from "react-router-dom";

function CreateVenueModal({ show, handleClose, onVenueCreated }) {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  if (!show) return null;

  const handleSubmit = async (data) => {
    setErrorMessage("");
    try {
      await createVenue(data);
      onVenueCreated();
      handleClose();
      navigate("../profile/myVenues");
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div
      className="modal fade show d-flex justify-content-center align-items-center"
      tabIndex="-1"
      aria-labelledby="registerVenueModal"
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
            <h2 className="text-center mb-4">Create Venue</h2>
            <CreateVenueForm
              onSubmit={handleSubmit}
              errorMessage={errorMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateVenueModal;
