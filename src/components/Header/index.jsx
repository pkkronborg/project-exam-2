import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../state/auth";
import "./styles.css";

function Header({ onRegisterClick, onLoginClick }) {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary fixed-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
          Holidaze
        </Link>

        {/* Show Log In (Button) & Register (Link) ONLY IF NOT LOGGED IN */}
        {!isLoggedIn && (
          <div className="d-flex gap-2 align-items-center">
            <button
              className="btn btn-warning text-dark fw-bold px-3"
              onClick={onLoginClick}
            >
              Log In
            </button>

            <button
              className="btn nav-link nav-item ms-lg-3"
              onClick={onRegisterClick}
            >
              Register
            </button>
          </div>
        )}

        {/* Show Hamburger Menu ONLY IF LOGGED IN */}
        {isLoggedIn && (
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {/* Navbar Links (ONLY IF LOGGED IN) */}
        {isLoggedIn && (
          <div
            className={`collapse navbar-collapse justify-content-end ${
              isOpen ? "show" : ""
            }`}
          >
            <Nav closeMenu={closeMenu} />
          </div>
        )}
      </div>
    </nav>
  );
}

function Nav({ closeMenu }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <ul className="nav ms-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/myProfile" onClick={closeMenu}>
          My Profile
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/myBookings" onClick={closeMenu}>
          My Bookings
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/myVenues" onClick={closeMenu}>
          My Venues
        </Link>
      </li>
      <li className="nav-item">
        <button className="btn nav-link text-start" onClick={handleLogout}>
          Log Out
        </button>
      </li>
    </ul>
  );
}

export default Header;
