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
  const [userType, setUserType] = useState("wedding_party");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="max-w-md w-full p-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          User Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-white mb-1">
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-white mb-1">
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-white mb-1">
              Mobile Number:
            </label>
            <input
              type="text"
              id="mobileNumber"
              className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="emailId" className="block text-white mb-1">
              Email ID:
            </label>
            <input
              type="email"
              id="emailId"
              className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your Email ID"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="userType" className="block text-white mb-1">
              User Type:
            </label>
            <select
              id="userType"
              className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="wedding_party">Wedding Party</option>
              <option value="relative">Relative</option>
            </select>
          </div>
          <div>
            <label htmlFor="password" className="block text-white mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-white mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-white text-pink-500 font-bold uppercase rounded-lg transform -skew-x-12 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            >
              <span className="inline-block transform skew-x-12">Register</span>
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
      `}</style>
    </div>
  );
};

export default UserRegister;
