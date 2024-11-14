import React, { useEffect, useState } from "react";
import api from "../../services/api";
import RegisterEventForm from "./../../Components/RegisterEventForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegCircleUser } from "react-icons/fa6";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const userId = parseInt(localStorage.getItem("userId"), 10);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/users/id/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
      }
    };

    const fetchUserEvents = async () => {
      try {
        const response = await api.get(`/events/user/${userId}`);
        setEvents(response.data);
      } catch (err) {
        setError("Failed to fetch user events");
      }
    };

    fetchUserData();
    fetchUserEvents();
    setLoading(false);
  }, [userId]);

  const handleRegisterEvent = async (eventData) => {
    try {
      await api.post("/events/register", { ...eventData, userId });
      toast.success("Event registered successfully");
      setShowModal(false);
      setEvents([...events, eventData]);
    } catch (err) {
      toast.error("Failed to register event");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto my-6 p-8 rounded-lg shadow-lg bg-white">
        <h2 className="text-3xl font-bold mb-8">User Profile</h2>
        <div className="text-center mb-4">
          <FaRegCircleUser className="text-6xl" />
        </div>

        {/* Display User Info */}
        <table className="w-full text-left mb-8">
          <tbody>
            {user &&
              Object.entries(user).map(([key, value]) => (
                <tr key={key}>
                  <td className="font-bold">{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Event Section */}
        <div className="my-8">
          <h3 className="text-xl font-semibold mb-4">Registered Events</h3>
          {events.length > 0 ? (
            <table className="w-full border">
              <thead>
                <tr>
                  <th className="px-4 py-2">Event ID</th>
                  <th className="px-4 py-2">Event Type</th>
                  <th className="px-4 py-2">Event Date</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.eventId} className="border-b">
                    <td className="px-4 py-2">{event.eventId}</td>
                    <td className="px-4 py-2">{event.eventType}</td>
                    <td className="px-4 py-2">{event.eventDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-6 bg-gray-100 text-gray-600 rounded-lg text-center">
              <p className="text-lg font-semibold">No events registered yet.</p>
              <p className="mt-2">Click on "Register for a New Event" to get started.</p>
            </div>
          )}
        </div>

        {/* Register Event Button */}
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg transition duration-300 hover:bg-purple-700"
        >
          Register for a New Event
        </button>
      </div>

      {/* Modal for Event Registration */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Register Event</h2>
            <RegisterEventForm
              onSubmit={handleRegisterEvent}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default UserProfile;
