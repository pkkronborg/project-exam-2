import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { getAllVenues, getVenuesBySearch } from "../../api/venues";

function VenueList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getVenues = async (query, page = 1) => {
    try {
      setLoading(true);
      let responseData = [];
      if (query) {
        responseData = await getVenuesBySearch(query, page);
      } else {
        responseData = await getAllVenues(page);
      }
      console.log(responseData);
      setData(responseData.data);
      if (responseData.meta && responseData.meta.pageCount) {
        setTotalPages(responseData.meta.pageCount);
      } else {
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVenues(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  if (error) return <div>Error: {error}</div>;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    let stars = "";
    for (let i = 1; i <= totalStars; i++) {
      stars += i <= rating ? "★" : "☆";
    }
    return stars;
  };

  return (
    <div className="mt-5">
      {
        <form
          className="mb-4 d-flex justify-content-center"
          onSubmit={handleSearch}
        >
          <div className="input-group w-50 w-md-25">
            <input
              type="text"
              className="form-control"
              placeholder="Search for venues..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </form>
      }

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
              <div key={venue.id} className="col mb-3">
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
                  <div className="text-center pb-3">
                    <Link to={`venue/${venue.id}`}>
                      <button className="btn btn-primary">View venue</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            className="btn btn-secondary me-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="fs-5">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default VenueList;
