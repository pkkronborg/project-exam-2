import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../state/auth";
import "./styles.css";

function Nav({ onRegisterClick, onLoginClick, closeMenu }) {
  const { isLoggedIn, venueManager, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    closeMenu();
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
          .map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li className="nav-item" key={index}>
                {item.path ? (
                  <Link
                    className={`nav-link ${isActive ? "active" : ""}`}
                    to={item.path}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button className="btn nav-link" onClick={item.action}>
                    {item.label}
                  </button>
                )}
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

function Header({ onRegisterClick, onLoginClick }) {
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
        <Link className="navbar-brand fw-bold" to="/" onClick={closeMenu}>
          Holidaze
        </Link>

        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse justify-content-end ${
            isOpen ? "show" : ""
          }`}
        >
          <Nav
            onRegisterClick={onRegisterClick}
            onLoginClick={onLoginClick}
            closeMenu={closeMenu}
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;
