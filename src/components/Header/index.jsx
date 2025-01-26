import { Link } from "react-router-dom";
import React from "react";

import { useAuth } from "../../state/auth";

function Nav({ onRegisterClick, onLoginClick }) {
  const { isLoggedIn, venueManager, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { path: "/myProfile", label: "My Profile", show: isLoggedIn },
    { path: "/myBookings", label: "My Bookings", show: isLoggedIn },
    { path: "/myVenues", label: "My Venues", show: isLoggedIn && venueManager },
    { action: onRegisterClick, label: "Register", show: !isLoggedIn },
    { action: onLoginClick, label: "Log in", show: !isLoggedIn },
    { action: handleLogout, label: "Log out", show: isLoggedIn },
  ];

  return (
    <nav>
      <ul className="nav ms-auto">
        {navItems
          .filter((item) => item.show)
          .map((item, index) => (
            <li className="nav-item" key={index}>
              {item.path ? (
                <Link className="nav-link" to={item.path}>
                  {item.label}
                </Link>
              ) : (
                <button className="btn nav-link" onClick={item.action}>
                  {item.label}
                </button>
              )}
            </li>
          ))}
      </ul>
    </nav>
  );
}

function Header({ onRegisterClick, onLoginClick }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Holidaze
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <Nav onRegisterClick={onRegisterClick} onLoginClick={onLoginClick} />
        </div>
      </div>
    </nav>
  );
}

export default Header;
