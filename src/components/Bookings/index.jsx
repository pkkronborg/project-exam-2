import React, { useState, useEffect } from "react";
import { getBookingsByProfile } from "../../api/profile";
import Grid from "../Grid";
import VenueCard from "../VenueCard";

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
        setData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

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
        <h3 className="mt-4 text-center">No bookings found</h3>
      ) : (
        <Grid
          items={data}
          renderItem={(booking) => (
            <VenueCard key={booking.id} venue={booking.venue}>
              <div className="d-flex justify-content-center mt-2">
                <span>
                  {new Date(booking.dateFrom).toLocaleDateString()} -
                  {new Date(booking.dateTo).toLocaleDateString()}
                </span>
              </div>
            </VenueCard>
          )}
        />
      )}
    </div>
  );
}

export default Bookings;
