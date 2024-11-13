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

  const userId = parseInt(localStorage.getItem("userId"), 10);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isNaN(userId)) {
        console.error("Invalid userId format");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/users/id/${userId}`);
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
        console.error(err);
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
    <div className="pt-20 container-fluid mx-auto flex justify-center items-center min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="max-w-md w-full p-8 rounded-lg shadow-xl bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">User Profile</h2>
        <div className="bg-white p-6">
          {editing ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-gray-600 mb-1">
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  autoComplete="off"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-600 mb-1">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="off"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-gray-600 mb-1"
                >
                  Mobile Number:
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="emailId" className="block text-gray-600 mb-1">
                  Email ID:
                </label>
                <input
                  type="email"
                  id="emailId"
                  name="emailId"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={formData.emailId}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="userType" className="block text-gray-600 mb-1">
                  User Type:
                </label>
                <select
                  id="userType"
                  name="userType"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="">Select User Type</option>
                  <option value="wedding_party">Wedding Party</option>
                  <option value="relative">Relative</option>
                </select>
              </div>
              <div className="text-center">
                <button
                  className="mt-4 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg transition duration-300 hover:bg-purple-700"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <FaRegCircleUser className="inline-block text-6xl text-gray-600" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-gray-600">
                  <tbody>
                    {Object.entries(user)
                      .slice(0, -1)
                      .map(([key, value]) => (
                        <tr key={key} className="border-b border-gray-300">
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
                  className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg transition duration-300 hover:bg-purple-700"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserProfile;
