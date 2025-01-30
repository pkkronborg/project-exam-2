import React, { useState, useEffect } from "react";
import { getVenuesMadeByProfile } from "../../api/profile";
import { Link } from "react-router-dom";
import CreateVenueModal from "../CreateVenueModal";

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

      const response = await getVenuesMadeByProfile(name);
      console.log(response.data);
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

  if (error) return <div>Error: {error}</div>;

  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = "";
    for (let i = 1; i <= totalStars; i++) {
      stars += i <= rating ? "★" : "☆";
    }
    return stars;
  };

  return (
    <div className="container px-0">
      <h1 className="my-5 text-center fw-bold">My Venues</h1>
      <div className="d-flex justify-content-start ps-1">
        <button
          className="btn btn-success mb-4 ms-2"
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
        <h3 className="mt-4">No venues found</h3>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mx-0">
          {data.map((venue) => {
            return (
              <div key={venue.id} className="col">
                <div className="card h-100 shadow-sm">
                  {venue.media[0] && venue.media[0].url && (
                    <img
                      className="card-img-top img-fluid object-fit-cover"
                      src={venue.media[0].url}
                      alt={venue.media[0].alt || "Venue image"}
                      style={{ height: "200px" }}
                    />
                  )}
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h2 className="fw-bold m-0">{venue.name}</h2>
                      <span className="text-warning fs-6">
                        {renderStars(venue.rating)}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between text-muted small mt-2">
                      <span>{venue.location.city || "No location"}</span>
                      <span className="fw-bold text-dark">
                        ${venue.price} / night
                      </span>
                    </div>
                  </div>
                  <Link
                    className="d-flex justify-content-center pb-3"
                    to={`../venue/${venue.id}`}
                  >
                    <div className="btn btn-primary">View venue</div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
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
