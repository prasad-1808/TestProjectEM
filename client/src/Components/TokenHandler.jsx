// TokenHandler.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function TokenHandler({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get access token from URL parameters
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      // Save token to localStorage
      localStorage.setItem("access_token", accessToken);
      setIsLoggedIn(true); // Update login state

      // Clear URL parameters and navigate to home page
      navigate("/", { replace: true });
    } else {
      // Check local storage for token if no access token in URL
      const token = localStorage.getItem("access_token");
      if (token) {
        setIsLoggedIn(true);
      }
    }
  }, [location, navigate, setIsLoggedIn]);

  return null; // No UI needed, this component just handles the token
}

export default TokenHandler;
