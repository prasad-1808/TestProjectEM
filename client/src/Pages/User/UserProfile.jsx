import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "./../../assests/UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    firstname: "",
    lastname: "",
    role: "",
    yearOfJoining: "",
    status: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`users/${userId}`);
        setUser(response.data);
        setFormData({
          userId: response.data.userId,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          role: response.data.role,
          yearOfJoining: response.data.yearOfJoining,
          status: response.data.status,
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
        firstname: formData.firstname,
        lastname: formData.lastname,
        role: formData.role,
        yearOfJoining: formData.yearOfJoining,
      };

      await api.put(`/users/${userId}`, updatedData);
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

  const handleAddSkillClick = () => {
    navigate("/add-skill");
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
                <label htmlFor="firstname" style={{ color: "white" }}>
                  First Name:
                </label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  autoComplete="off"
                  className="form-control"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname" style={{ color: "white" }}>
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  autoComplete="off"
                  className="form-control"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="role" style={{ color: "white" }}>
                  Role:
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="yearOfJoining" style={{ color: "white" }}>
                  Year of Joining:
                </label>
                <input
                  type="number"
                  id="yearOfJoining"
                  name="yearOfJoining"
                  className="form-control"
                  value={formData.yearOfJoining}
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
                      <td>{user.firstname}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Last Name</td>
                      <td>{user.lastname}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Role</td>
                      <td>{user.role}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Year of Joining</td>
                      <td>{user.yearOfJoining}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold">Status</td>
                      <td>{user.status ? "Active" : "Inactive"}</td>
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
