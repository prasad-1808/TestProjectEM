import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = ({ isLoggedIn, setIsLoggedIn }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userResponse = await api.get(`/users/${mobileNumber}`);
      if (userResponse.status === 200) {
        const user = userResponse.data;
        if (user.role !== "employee") {
          toast.error("Access restricted to employees only");
          return;
        }
        try {
          const response = await api.post("/users/login", {
            mobileNumber,
            password,
            role,
          });
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", user.userId);
            localStorage.setItem("role", user.role);
            setIsLoggedIn(true);
            navigate("/dashboard");
          }
        } catch {
          toast.error("Invalid Mobile Number, Password, or Role");
        }
      } else {
        toast.error("User not found");
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
      console.error(error);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#f8f9fa",
        backgroundImage: "linear-gradient(135deg, #e0eafc, #cfdef3)", // Matching background gradient
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "2rem",
          borderRadius: "15px", // Rounded corners
          background: "linear-gradient(135deg, #8d0cc8, #9c27b0)", // Card gradient
          transition: "transform 0.3s ease", // Smooth animation
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#fff" }}>
          User Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group p-1 m-2">
            <label htmlFor="mobileNumber" style={{ color: "white" }}>
              Mobile Number:
            </label>
            <input
              type="text"
              id="mobileNumber"
              className="form-control"
              placeholder="Enter your Mobile Number"
              autoComplete="off"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group p-1 m-2">
            <label htmlFor="password" style={{ color: "white" }}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group p-1 m-2">
            <label htmlFor="role" style={{ color: "white" }}>
              Role:
            </label>
            <select
              id="role"
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="wedding_party">Wedding Party</option>
              <option value="relative">Relative</option>
            </select>
          </div>

          <center className="mt-4">
            <p className="text-muted">
              <Link
                to="/admin-login"
                className="text-decoration-none"
                style={{ color: "white" }}
              >
                Login as Admin
              </Link>
            </p>
          </center>

          <center>
            <button
              type="submit"
              className="custom-button d-inline-flex align-items-center"
              style={{
                backgroundColor: "white",
                color: "#ff69b4",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: "bold",
                textTransform: "uppercase",
                textDecoration: "none",
                display: "inline-block",
                transform: "skewX(-15deg)", // Slanted button style
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)", // Button shadow
              }}
            >
              <span
                style={{
                  transform: "skewX(15deg)", // Reset text skew
                  color: "#ff69b4",
                }}
              >
                Login
              </span>
            </button>
          </center>
        </form>
      </div>

      {/* Toast notifications */}
      <ToastContainer />

      {/* Custom styles for hover and button animation */}
      <style>
        {`
          .custom-button:hover {
            transform: scale(1.05) skewX(-15deg); /* Enlarge on hover */
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* Stronger shadow on hover */
          }

          .card {
            animation: fadeIn 1.5s ease;
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default UserLogin;
