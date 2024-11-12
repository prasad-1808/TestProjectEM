import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleCallback({ setIsLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      setIsLoggedIn(true);
      setTimeout(() => navigate("/"), 2000); // Delay navigation for 2 seconds
    } else {
      setTimeout(() => navigate("/login"), 2000); // Delay navigation for 2 seconds
    }
  }, [navigate, setIsLoggedIn]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-2xl">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Processing Your Login
          </h2>
          <p className="text-gray-600 text-center">
            Please wait while we securely log you in...
          </p>
        </div>
      </div>
    </div>
  );
}

export default GoogleCallback;
