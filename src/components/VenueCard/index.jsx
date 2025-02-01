import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function VenueCard({ venue, children }) {
  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = "";
    for (let i = 1; i <= totalStars; i++) {
      stars += i <= rating ? "★" : "☆";
    }
    return stars;
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        {venue.media?.[0]?.url ? (
          <img
            className="card-img-top img-fluid object-fit-cover placeholder-img"
            src={venue.media[0].url}
            alt={venue.media[0].alt || "Venue image"}
          />
        ) : (
          <div className="card-img-top d-flex align-items-center justify-content-center bg-light text-muted">
            Image coming soon...
          </div>
        )}
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bold m-0 text-truncate">{venue.name}</h2>
            <span className="text-warning fs-6">
              {renderStars(venue.rating)}
            </span>
          </div>

          {children}
        </div>
        <div className="text-center pb-3">
          <Link to={`/venue/${venue.id}`}>
            <button className="btn btn-primary">View venue</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VenueCard;
