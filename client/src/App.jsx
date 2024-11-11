// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar"; // Import the Navbar component
// import Invitation from "./Pages/Invitation";
import Home from "./Pages/Home";
import UserLogin from "./Pages/User/UserLogin";
import UserRegister from "./Pages/User/UserRegister";
import UserProfile from "./Pages/User/UserProfile";
import EventAlbum from "./Pages/Event/EventAlbum";
import EventMemories from "./Pages/Event/EventMemories";
// import GoogleSignup from "./Components/GoogleSignup";
import GoogleDriveFileList from "./Components/GoogleDriveFileList";
import TokenHandler from "./Components/TokenHandler";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} /> {/* Render Navbar */}
        {localStorage.getItem("access_token") ? (
          <></>
        ) : (
          // <GoogleSignup setIsLoggedIn={setIsLoggedIn} />
          <></>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <TokenHandler setIsLoggedIn={setIsLoggedIn} />
                <Home />
              </>
            }
          />
          <Route
            path="/login"
            element={<UserLogin setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<UserRegister />} />
          <Route
            path="/event-album"
            element={
              <ProtectedRoute>
                <EventAlbum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/event-memories"
            element={
              <ProtectedRoute>
                <EventMemories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/drive-files" element={<GoogleDriveFileList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
