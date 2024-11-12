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
      const response = await api.post("/users/login", {
        mobileNumber,
        password,
        userType: role,
      });

      console.log(response);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", response.data.userType);
        setIsLoggedIn(!isLoggedIn);
        toast.success("Login successful!");
        navigate("/invitation");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("User not found. Please check your mobile number.");
      } else if (error.response && error.response.status === 401) {
        toast.error("Invalid credentials or role. Please try again.");
      } else {
        toast.error("An error occurred during login. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container-fluid flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="card max-w-lg w-full p-8 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 animate-fadeIn">
        <h2 className="text-center mb-6 text-2xl font-bold text-white">
          User Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-white mb-2">
              Mobile Number:
            </label>
            <input
              type="text"
              id="mobileNumber"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your Mobile Number"
              autoComplete="off"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-white mb-2">
              Role:
            </label>
            <select
              id="role"
              className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="wedding_party">Wedding Party</option>
              <option value="relative">Relative</option>
            </select>
          </div>

          <div className="text-center mt-6">
            <p className="text-white mb-4">
              <Link to="/admin-login" className="text-white hover:underline">
                Login as Admin
              </Link>
            </p>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="custom-button inline-flex items-center px-6 py-3 bg-white text-pink-500 font-bold uppercase rounded-lg transform -skew-x-12 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            >
              <span className="transform skew-x-12">Login</span>
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease;
        }
        .custom-button:hover {
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default UserLogin;
