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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="my-4">My bookings</h1>
      <div className="row">
        {data.map((data) => {
          return (
            <div key={data.id} className="col-md-4 mb-3">
              <div className="card h-100 d-flex justify-content-between">
                {data.venue.media[0] && data.venue.media[0].url && (
                  <img
                    className="card-img-top"
                    src={data.venue.media[0].url}
                    alt={data.venue.media[0].alt || "Venue image"}
                  />
                )}
                <div>
                  <h2 className="card-title ps-3">{data.venue.name}</h2>
                  <Link
                    className="d-flex justify-content-center pb-3"
                    to={`../venue/${data.venue.id}`}
                  >
                    <div className="btn btn-primary">View venue</div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Bookings;
