import React from "react";
import { Heart, Calendar, MapPin } from "lucide-react";

const Invitation = () => (
  <div className="pt-20 font-serif text-gray-800 leading-relaxed">
    <header className="bg-cover bg-center h-screen flex flex-col justify-center items-center text-center text-white shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.5)]">
      <h1 className="text-6xl mb-2 font-bold">Emily & Michael</h1>
      <p className="text-4xl font-light">August 15, 2024</p>
    </header>

    <main className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          We're Getting Married!
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join us in celebrating the beginning of our new life together.
        </p>
      </div>

      <div className="flex flex-wrap justify-center mt-12 gap-8">
        <div className="w-full md:w-1/3 text-center p-8 border border-gray-200 rounded-lg transition-shadow duration-300 hover:shadow-lg">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
          <h3 className="text-2xl font-semibold mb-2">When</h3>
          <p>August 15, 2024</p>
          <p>4:00 PM</p>
        </div>
        <div className="w-full md:w-1/3 text-center p-8 border border-gray-200 rounded-lg transition-shadow duration-300 hover:shadow-lg">
          <MapPin className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
          <h3 className="text-2xl font-semibold mb-2">Where</h3>
          <p>Rosewood Gardens</p>
          <p>123 Blossom Street, Springville</p>
        </div>
      </div>

      <div className="text-center mt-12">
        <button className="px-12 py-3 text-xl font-bold border-2 border-gray-800 rounded-lg transition-all duration-300 hover:bg-yellow-600 hover:border-yellow-600 hover:text-white">
          RSVP
        </button>
      </div>

      <div className="text-center mt-16 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Story</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui
          mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor
          neque eu tellus rhoncus ut eleifend nibh porttitor.
        </p>
      </div>

      {/* Uncomment and adjust the Image component usage if needed
      <div className="flex flex-wrap justify-center mt-12 gap-4">
        {[1, 2, 3].map((num) => (
          <div key={num} className="w-full sm:w-1/2 md:w-1/3 p-2">
            <img
              src={`/placeholder.svg?height=300&width=300`}
              alt={`Couple Photo ${num}`}
              className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
      */}
    </main>

    <footer className="bg-gray-100 py-8 text-center text-lg">
      <p className="flex items-center justify-center">
        <Heart className="w-6 h-6 text-red-500 mx-2" />
        We can't wait to celebrate with you!
        <Heart className="w-6 h-6 text-red-500 mx-2" />
      </p>
    </footer>
  </div>
);

export default Invitation;
