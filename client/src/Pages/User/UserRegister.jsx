import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserRegister = ({ isLoggedIn, setIsLoggedIn }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [userType, setUserType] = useState("wedding_party"); // Default role
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be 6-12 characters long, contain at least 1 uppercase letter and 1 number."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await api.post("/users/register", {
        firstName,
        lastName,
        mobileNumber,
        emailId,
        userType,
        password,
      });
      if (response.status === 201) {
        toast.success(
          "Registration successful! Kindly wait for admin approval."
        );
        setTimeout(() => {
          navigate("/");
        }, 6000);
      }
    } catch (error) {
      toast.error("An error occurred during registration. Please try again.");
      console.error(error);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#f8f9fa",
        backgroundImage: "linear-gradient(135deg, #e0eafc, #cfdef3)",
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "2rem",
          borderRadius: "15px",
          background: "linear-gradient(135deg, #8d0cc8, #9c27b0)",
          transition: "transform 0.3s ease",
        }}
      >
        <h2 className="text-center mb-4" style={{ color: "#fff" }}>
          User Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group p-1 m-2">
            <label htmlFor="firstName" style={{ color: "white" }}>
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              placeholder="Enter your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group p-1 m-2">
            <label htmlFor="lastName" style={{ color: "white" }}>
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              className="form-control"
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group p-1 m-2">
            <label htmlFor="mobileNumber" style={{ color: "white" }}>
              Mobile Number:
            </label>
            <input
              type="text"
              id="mobileNumber"
              className="form-control"
              placeholder="Enter your Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group p-1 m-2">
            <label htmlFor="emailId" style={{ color: "white" }}>
              Email ID:
            </label>
            <input
              type="email"
              id="emailId"
              className="form-control"
              placeholder="Enter your Email ID"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </div>
          <div className="form-group p-1 m-2">
            <label htmlFor="userType" style={{ color: "white" }}>
              User Type:
            </label>
            <select
              id="userType"
              className="form-control"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="wedding_party">Wedding Party</option>
              <option value="relative">Relative</option>
            </select>
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
            <label htmlFor="confirmPassword" style={{ color: "white" }}>
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
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
                transform: "skewX(-15deg)",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)",
              }}
            >
              <span
                style={{
                  transform: "skewX(15deg)",
                  color: "#ff69b4",
                }}
              >
                Register
              </span>
            </button>
          </center>
        </form>
      </div>

      <ToastContainer />

      <style>
        {`
          .custom-button:hover {
            transform: scale(1.05) skewX(-15deg);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
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

export default UserRegister;
