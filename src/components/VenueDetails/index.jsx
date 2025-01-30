import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingCalendar from "../Calendar";
import { book } from "../../api/bookings";
import VenueBookings from "../VenueBookings";
import EditVenueModal from "../EditVenueModal";
import { deleteVenue, getVenueById, updateVenue } from "../../api/venues";
import {
  FaBreadSlice,
  FaDog,
  FaMapMarkerAlt,
  FaParking,
  FaUsers,
  FaWifi,
} from "react-icons/fa";
import "./styles.css";

function VenueDetails({ isLoggedIn }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const venueManager = localStorage.getItem("venueManager");
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch venue details
  const fetchVenueDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getVenueById(id);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchVenueDetails();
  }, [fetchVenueDetails]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-4 alert alert-danger">{error}</div>;
  }

  if (!data) {
    return <h3 className="mt-4 text-center">No venue data available</h3>;
  }

  const maxGuests = data?.maxGuests || 1;

  const handleGuestChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1 && value <= maxGuests) {
      setGuestCount(value);
    }
  };

  const handleBookNow = async () => {
    if (!selectedRange) return;

    const bookingData = {
      dateFrom: selectedRange[0]?.toISOString() || "",
      dateTo:
        selectedRange[1]?.toISOString() || selectedRange[0]?.toISOString(),
      guests: guestCount,
      venueId: id,
    };

    try {
      const response = await book(bookingData);
      if (response) navigate("/myBookings");
    } catch (error) {
      console.error("Booking failed:", error.message);
    }
  };

  const handleEditVenue = async (formData) => {
    try {
      await updateVenue(formData, id);
      setIsModalOpen(false);
      fetchVenueDetails();
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  const handleDeleteVenue = async () => {
    try {
      await deleteVenue(id);
      setIsDeleteModalOpen(false);
      navigate("/myVenues");
    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  };

  const calculateTotalPrice = () => {
    if (!selectedRange?.[0] || !selectedRange?.[1]) return 0;
    const startDate = new Date(selectedRange[0]);
    const endDate = new Date(selectedRange[1]);
    const numberOfDays = Math.ceil((endDate - startDate) / (1000 * 3600 * 24));
    return numberOfDays * data.price;
  };

  return (
    <div className="mt-4">
      <h1 className="my-5 text-center fw-bold">{data.name}</h1>
      {venueManager === "true" && name === data.owner?.name && (
        <div className="d-flex justify-content-start gap-2 my-3">
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Edit Venue
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete Venue
          </button>
        </div>
      )}

      <div className="row">
        <div className="col-md-6 venue-section venue-image">
          {data.media?.length > 0 ? (
            <div
              id="venueCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {data.media.map((image, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                  >
                    <img
                      src={image.url}
                      className="d-block w-100 img-fluid object-fit-cover rounded"
                      alt={image.alt || "Venue image"}
                    />
                  </div>
                ))}
              </div>
              {data.media.length > 1 && (
                <>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#venueCarousel"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#venueCarousel"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                  </button>
                </>
              )}
            </div>
          ) : (
            <p>No images available</p>
          )}
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column align-items-center">
              <div className="booking-calendar">
                <BookingCalendar
                  bookings={data.bookings || []}
                  isLoggedIn={isLoggedIn}
                  onDateChange={setSelectedRange}
                />
              </div>
              <p>
                {selectedRange?.[0]?.toLocaleDateString()} -{" "}
                {selectedRange?.[1]?.toLocaleDateString() ||
                  selectedRange?.[0]?.toLocaleDateString()}
              </p>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <label htmlFor="guestCount">Guests</label>
                <input
                  type="number"
                  id="guestCount"
                  className="form-control w-50 text-center"
                  min="1"
                  max={maxGuests}
                  value={guestCount}
                  onChange={handleGuestChange}
                />
              </div>
              <div className="d-flex justify-content-between fw-bold">
                <span>Total Price:</span>
                <span>${calculateTotalPrice()}</span>
              </div>
              <button className="btn btn-primary mt-3" onClick={handleBookNow}>
                Book now!
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h2 className="my-4">About this property</h2>
        <div className="col-md-3 text-start venue-section venue-info">
          <p>
            <FaUsers className="me-2 fs-5" /> {maxGuests} Guests allowed
          </p>
          <p>
            <FaWifi className="me-2 fs-5" />{" "}
            {data?.meta?.wifi ? "Wifi included" : "No Wifi"}
          </p>
          <p>
            <FaDog className="me-2 fs-5" />{" "}
            {data?.meta?.pets ? "Pets allowed" : "No pets"}
          </p>
          <p>
            <FaParking className="me-2 fs-5" />{" "}
            {data?.meta?.parking ? "Parking available" : "No parking"}
          </p>
          <p>
            <FaBreadSlice className="me-2 fs-5" />{" "}
            {data?.meta?.breakfast ? "Breakfast included" : "No breakfast"}
          </p>
        </div>
        <div className="col-md-3 venue-section venue-info">
          <p className="fw-bold">
            <FaMapMarkerAlt className="me-2 fs-5" /> Location
          </p>
          {data?.location?.address ||
          data?.location?.city ||
          data?.location?.country ? (
            <>
              {data.location.address && <p>{data.location.address}</p>}
              {data.location.city && <p>{data.location.city}</p>}
              {data.location.country && <p>{data.location.country}</p>}
            </>
          ) : (
            <p>No location</p>
          )}
        </div>
        <div className="col-md-6 venue-section venue-info">
          <p className="fw-bold">Description</p>
          <p>{data.description}</p>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div
          className="modal fade show d-flex justify-content-center align-items-center"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 text-center">
              {/* Close Button */}
              <div className="d-flex justify-content-end">
                <button
                  className="btn-close"
                  onClick={() => setIsDeleteModalOpen(false)}
                ></button>
              </div>

              <h3 className="fw-bold">Delete Venue</h3>
              <p>Are you sure you want to delete the venue?</p>

              {/* Buttons */}
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button
                  className="btn btn-danger px-4"
                  onClick={handleDeleteVenue}
                >
                  Delete
                </button>
                <button
                  className="btn btn-secondary px-4"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {venueManager === "true" && name === data.owner?.name && (
        <>
          <h2 className="my-3">Bookings</h2>
          <VenueBookings bookings={data.bookings} />
        </>
      )}
      <EditVenueModal
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        initialValues={data}
        onSubmit={handleEditVenue}
      />
    </div>
  );
}

export default VenueDetails;
