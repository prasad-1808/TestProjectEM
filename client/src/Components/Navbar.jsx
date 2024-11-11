// src/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../assests/Navbar.css";

function Navbar({ isLoggedIn }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Event Memories</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/event-album">EventAlbum</Link>
            <Link to="/event-memories">Memories</Link>
            <Link to="/user-profile">Profile</Link>
            <Link
              to="/"
              onClick={() => localStorage.removeItem("access_token")}
            >
              Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
