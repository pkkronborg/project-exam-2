import React, { useState, useEffect } from "react";
import { getBookingsByProfile } from "../../api/profile";
import { Link } from "react-router-dom";

function Bookings() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const name = localStorage.getItem("name");
        if (!name) throw new Error("Name is not available in localStorage.");
        const data = await getBookingsByProfile(name);
        console.log(data.data);
        setData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = "";
    for (let i = 1; i <= totalStars; i++) {
      stars += i <= rating ? "★" : "☆";
    }
    return stars;
  };

  return (
    <div className="container">
      <h1 className="my-5 text-center fw-bold">My bookings</h1>
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
          {data.map((data) => {
            return (
              <div key={data.id} className="col">
                <div className="card h-100 shadow-sm">
                  {data.venue.media[0] && data.venue.media[0].url && (
                    <img
                      className="card-img-top img-fluid object-fit-cover"
                      src={data.venue.media[0].url}
                      alt={data.venue.media[0].alt || "venue image"}
                      style={{ height: "200px" }}
                    />
                  )}
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h2 className="fw-bold m-0">{data.venue.name}</h2>
                      <span className="text-warning fs-6">
                        {renderStars(data.venue.rating)}
                      </span>
                    </div>

                    <div className="d-flex justify-content-center mt-2">
                      <span>
                        {new Date(data.dateFrom).toLocaleDateString()}
                        {" - "}
                        {new Date(data.dateTo).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Link
                    className="d-flex justify-content-center pb-3"
                    to={`../venue/${data.venue.id}`}
                  >
                    <div className="btn btn-primary">View venue</div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Bookings;
