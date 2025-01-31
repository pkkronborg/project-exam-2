import React, { useState, useEffect } from "react";
import { getVenuesMadeByProfile } from "../../api/profile";
import CreateVenueModal from "../CreateVenueModal";
import Grid from "../Grid";
import VenueCard from "../VenueCard";

function MyVenuesList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true); // Show loading when fetching
      const name = localStorage.getItem("name");
      if (!name) throw new Error("Name is not available in localStorage.");

      await new Promise((resolve) => setTimeout(resolve, 5000));

      const response = await getVenuesMadeByProfile(name);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAddVenue = () => {
    fetchBookings();
  };

  if (error) return <div className="my-5 text-center">Error: {error}</div>;

  return (
    <div className="container px-0">
      <h1 className="my-5 text-center fw-bold">My Venues</h1>
      <div className="d-flex justify-content-start ps-1">
        <button
          className="btn btn-primary mb-4 ms-2"
          onClick={() => setIsModalOpen(true)}
        >
          Add Venue
        </button>
      </div>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-center mt-4 alert alert-danger">{error}</div>
      ) : data.length === 0 ? (
        <h3 className="mt-4 text-center">No venues, please create a venue!</h3>
      ) : (
        <Grid
          items={data}
          renderItem={(venue) => (
            <VenueCard key={venue.id} venue={venue}>
              <div className="d-flex justify-content-between text-muted small mt-2">
                <span>{venue.location.city || "No location"}</span>
                <span className="fw-bold text-dark">
                  ${venue.price} / night
                </span>
              </div>
            </VenueCard>
          )}
        />
      )}

      {isModalOpen && (
        <CreateVenueModal
          show={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          onVenueCreated={handleAddVenue}
        />
      )}
    </div>
  );
}

export default MyVenuesList;
