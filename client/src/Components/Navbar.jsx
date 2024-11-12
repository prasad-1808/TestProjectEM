import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar({ isLoggedIn, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Event Memories
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                  <Link to="/register" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/invitation" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium">
                    Invitation
                  </Link>
                  <Link to="/event-album" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium">
                    Event Album
                  </Link>
                  <Link to="/event-memories" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium">
                    Memories
                  </Link>
                  <Link to="/user-profile" className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium">
                    Profile
                  </Link>
                  <Link to="/" onClick={handleLogout} className="text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium">
                    Logout
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium">
                  Login
                </Link>
                <Link to="/register" className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/invitation" className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium">
                  Invitation
                </Link>
                <Link to="/event-album" className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium">
                  Event Album
                </Link>
                <Link to="/event-memories" className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium">
                  Memories
                </Link>
                <Link to="/user-profile" className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium">
                  Profile
                </Link>
                <Link to="/" onClick={handleLogout} className="text-white hover:bg-purple-700 block px-3 py-2 rounded-md text-base font-medium">
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
