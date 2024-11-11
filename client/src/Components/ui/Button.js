// src/Components/ui/Button.js
import React from 'react';

const Button = ({ children, onClick, className, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

// Make sure you're exporting it as default
export default Button;
