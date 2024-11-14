import React, { useState } from "react";

const RegisterEventForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    eventType: "",
    eventName: "",
    eventDate: "",
    eventTime: "",
    place: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="mb-4">
        <label htmlFor="eventType" className="block text-gray-700">Event Type</label>
        <select
          id="eventType"
          name="eventType"
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={formData.eventType}
          onChange={handleChange}
        >
          <option value="">Select Event Type</option>
          <option value="marriage">Marriage</option>
          <option value="birthday">Birthday</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="eventName" className="block text-gray-700">Event Name</label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={formData.eventName}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="eventDate" className="block text-gray-700">Event Date</label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={formData.eventDate}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="eventTime" className="block text-gray-700">Event Time</label>
        <input
          type="time"
          id="eventTime"
          name="eventTime"
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={formData.eventTime}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="place" className="block text-gray-700">Place</label>
        <input
          type="text"
          id="place"
          name="place"
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={formData.place}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700">Address</label>
        <textarea
          id="address"
          name="address"
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-300"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700">
        Register Event
      </button>
      <button onClick={onClose} className="ml-4 text-red-500">Cancel</button>
    </form>
  );
};

export default RegisterEventForm;
