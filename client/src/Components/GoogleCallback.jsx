// GoogleCallback.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleCallback({ setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Get access token from URL parameters
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      // Save token to localStorage
      localStorage.setItem("access_token", accessToken);
      setIsLoggedIn(true); // Update login state
      navigate("/"); // Redirect to the home page or any other route
    } else {
      // Redirect to login if access token is missing
      navigate("/login");
    }
  }, [navigate, setIsLoggedIn]);

  return <div>Redirecting...</div>;
}

export default GoogleCallback;
