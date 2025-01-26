import React from "react";

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
              <td>{new Date(booking.dateFrom).toLocaleDateString()}</td>
              <td>{new Date(booking.dateTo).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VenueBookings;
