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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="my-4">My Venues</h1>
      <div className="d-flex justify-content-start">
        <button
          className="btn btn-success mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Add Venue
        </button>
      </div>
      <div className="row">
        {data.map((data) => {
          return (
            <div key={data.id} className="col-md-4 mb-3">
              <div className="card h-100 d-flex justify-content-between">
                {data.media[0] && data.media[0].url && (
                  <img
                    className="card-img-top"
                    src={data.media[0].url}
                    alt={data.media[0].alt || "Venue image"}
                  />
                )}
                <div>
                  <h2 className="card-title ps-3">{data.name}</h2>
                  <Link
                    className="d-flex justify-content-center pb-3"
                    to={`../venue/${data.id}`}
                  >
                    <div className="btn btn-primary">View venue</div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
