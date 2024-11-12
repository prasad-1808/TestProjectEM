import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegCircleUser } from "react-icons/fa6";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    emailId: "",
    userType: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/users/${userId}`);
        setUser(response.data);
        setFormData({
          userId: response.data.userId,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          mobileNumber: response.data.mobileNumber,
          emailId: response.data.emailId,
          userType: response.data.userType,
        });
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId, editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        emailId: formData.emailId,
        userType: formData.userType,
      };

      await api.put(`/users/edit/${userId}`, updatedData);
      toast.success("Profile updated successfully");

      setUser((prevUser) => ({
        ...prevUser,
        ...updatedData,
      }));

      setEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="pt-24 container mx-auto px-4 mt-28">
      <h2 className="text-center mb-8 text-3xl font-bold text-purple-600">
        User Profile
      </h2>
      <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl shadow-lg p-6">
        <div className="bg-white bg-opacity-10 rounded-xl p-6">
          {editing ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-white mb-1">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  autoComplete="off"
                  className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-white mb-1">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="off"
                  className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="mobileNumber" className="block text-white mb-1">
                  Mobile Number:
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="emailId" className="block text-white mb-1">
                  Email ID:
                </label>
                <input
                  type="email"
                  id="emailId"
                  name="emailId"
                  className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={formData.emailId}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="userType" className="block text-white mb-1">
                  User Type:
                </label>
                <input
                  type="text"
                  id="userType"
                  name="userType"
                  className="w-full px-3 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={formData.userType}
                  onChange={handleChange}
                />
              </div>
              <div className="text-center">
                <button
                  className="mt-4 px-6 py-2 bg-white text-pink-500 font-bold uppercase rounded-lg transform -skew-x-12 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                  onClick={handleSave}
                >
                  <span className="inline-block transform skew-x-12">Save</span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <FaRegCircleUser className="inline-block text-6xl text-white" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <tbody>
                    {Object.entries(user).map(([key, value]) => (
                      <tr
                        key={key}
                        className="border-b border-white border-opacity-20"
                      >
                        <td className="py-2 px-4 font-bold">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </td>
                        <td className="py-2 px-4">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-center mt-6">
                <button
                  className="px-6 py-2 bg-white text-pink-500 font-bold uppercase rounded-lg transform -skew-x-12 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                  onClick={handleEditClick}
                >
                  <span className="inline-block transform skew-x-12">
                    Edit Profile
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
