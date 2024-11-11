// src/App.jsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import UserLogin from "./Pages/User/UserLogin";
import UserRegister from "./Pages/User/UserRegister";
import UserProfile from "./Pages/User/UserProfile";
import EventAlbum from "./Pages/Event/EventAlbum";
import EventMemories from "./Pages/Event/EventMemories";
import GoogleSignup from "./Components/GoogleSignup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Control login state here

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <h1>Google Drive Integration App</h1>
        <GoogleSignup />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<UserLogin setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/register" element={<UserRegister />} />

          {/* Protected Routes */}
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
          {/* Redirect unknown paths to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
