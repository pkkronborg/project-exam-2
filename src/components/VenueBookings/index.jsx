import React from "react";
import "./styles.css";

function VenueBookings({ bookings }) {
  if (!bookings || bookings.length === 0) {
    return <p>No bookings available for this venue.</p>;
  }

  return (
    <div className="mt-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Guests</th>
            <th>Check-In</th>
            <th>Check-Out</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.customer.name}</td>
              <td>{booking.guests}</td>
              <td>
                {new Date(booking.dateFrom).toLocaleDateString("en-GB", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </td>
              <td>
                {new Date(booking.dateTo).toLocaleDateString("en-GB", {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VenueBookings;
