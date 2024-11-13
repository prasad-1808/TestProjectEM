import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    }
  };

  return (
    <div className="pt-20 container-fluid mx-auto flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="max-w-md w-full p-8 rounded-lg shadow-xl bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="mobileNumber" className="block text-gray-600 mb-2">
              Mobile Number:
            </label>
            <input
              type="text"
              id="mobileNumber"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your Mobile Number"
              autoComplete="off"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-600 mb-2">
              Role:
            </label>
            <select
              id="role"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="wedding_party">Wedding Party</option>
              <option value="relative">Relative</option>
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-purple-600 text-white font-bold rounded-lg transition duration-300 hover:bg-purple-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserLogin;
