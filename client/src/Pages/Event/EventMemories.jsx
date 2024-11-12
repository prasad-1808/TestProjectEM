import React from "react";
import { Camera, Calendar, MapPin, Heart } from "lucide-react";

const MemoryCard = ({ title, date, location, imageUrl }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="flex items-center text-gray-600 mb-2">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{date}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <MapPin className="w-4 h-4 mr-2" />
        <span>{location}</span>
      </div>
    </div>
  </div>
);

const EventMemories = () => {
  const memories = [
    {
      id: 1,
      title: "Wedding Ceremony",
      date: "June 15, 2023",
      location: "St. Mary's Church",
      imageUrl: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "Reception Party",
      date: "June 15, 2023",
      location: "Grand Hotel Ballroom",
      imageUrl: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "Honeymoon in Bali",
      date: "June 20, 2023",
      location: "Bali, Indonesia",
      imageUrl: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: "First Anniversary",
      date: "June 15, 2024",
      location: "Home Sweet Home",
      imageUrl: "/placeholder.svg?height=300&width=400",
    },
  ];

  return (
    <div className="pt-24 bg-gradient-to-br from-purple-100 to-pink-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Event Memories
          </h1>
          <p className="text-xl text-gray-600">
            Cherishing the moments that last a lifetime
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((memory) => (
            <MemoryCard key={memory.id} {...memory} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow-md hover:bg-purple-700 transition-colors duration-300 flex items-center mx-auto">
            <Camera className="w-5 h-5 mr-2" />
            Add New Memory
          </button>
        </div>

        <div className="mt-16 text-center text-gray-600">
          <p className="text-lg mb-2">
            Memories are the treasures that we keep locked deep within the
            storehouse of our souls.
          </p>
          <Heart className="w-6 h-6 text-red-500 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default EventMemories;
