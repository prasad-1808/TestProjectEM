import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegCircleUser } from "react-icons/fa6";
import "./../../assests/UserProfile.css";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container-fluid profile p-4" style={{ marginTop: "7rem" }}>
      <h2 className="text-center mb-4" style={{ color: "#b11aa4" }}>
        User Profile
      </h2>
      <div className="card shadow-lg" style={{ borderRadius: "15px" }}>
        <div className="card-body">
          {editing ? (
            <div>
              <div className="form-group">
                <label htmlFor="firstName" style={{ color: "white" }}>
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  autoComplete="off"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName" style={{ color: "white" }}>
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="off"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobileNumber" style={{ color: "white" }}>
                  Mobile Number:
                </label>
                <input
                  type="text"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="form-control"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="emailId" style={{ color: "white" }}>
                  Email ID:
                </label>
                <input
                  type="email"
                  id="emailId"
                  name="emailId"
                  className="form-control"
                  value={formData.emailId}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="userType" style={{ color: "white" }}>
                  User Type:
                </label>
                <input
                  type="text"
                  id="userType"
                  name="userType"
                  className="form-control"
                  value={formData.userType}
                  onChange={handleChange}
                />
              </div>
              <center>
                <button
                  className="custom-button d-inline-flex align-items-center mt-3"
                  style={{
                    backgroundColor: "white",
                    color: "#ff69b4",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    display: "inline-block",
                    transform: "skewX(-15deg)",
                    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)",
                    marginLeft: "15px",
                  }}
                  onClick={handleSave}
                >
                  <span style={{ transform: "skewX(15deg)", color: "#ff69b4" }}>
                    Save
                  </span>
                </button>
              </center>
            </div>
          ) : (
            <div>
              <center>
                <FaRegCircleUser
                  className="profile-pic-icon"
                  style={{ fontSize: "3rem", color: "#fffff" }}
                />
              </center>
              <div className="card-body rounded">
                <table className="table table-bordered rounded user-profile-table">
                  <tbody>
                    <tr>
                      <td className="fw-bold">User ID</td>
                      <td>{user.userId}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">First Name</td>
                      <td>{user.firstName}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Last Name</td>
                      <td>{user.lastName}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Mobile Number</td>
                      <td>{user.mobileNumber}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Email ID</td>
                      <td>{user.emailId}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">User Type</td>
                      <td>{user.userType}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <center>
                <button
                  className="custom-button d-inline-flex align-items-center mt-3"
                  style={{
                    backgroundColor: "white",
                    color: "#ff69b4",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    display: "inline-block",
                    transform: "skewX(-15deg)",
                    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.15)",
                    marginLeft: "15px",
                  }}
                  onClick={handleEditClick}
                >
                  <span style={{ transform: "skewX(15deg)", color: "#ff69b4" }}>
                    Edit Profile
                  </span>
                </button>
              </center>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
