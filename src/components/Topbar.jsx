import React from "react";
import { FiMenu } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Topbar = ({ onMobileMenuToggle }) => {
  const { user } = useAuth();

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white px-6 flex items-center justify-between z-40 shadow-sm">
      {/* Left: Logo and Menu */}
      <div className="flex items-center gap-3">
        <button
          className="sm:hidden block text-gray-700 mr-2"
          onClick={onMobileMenuToggle}
        >
          <FiMenu size={22} />
        </button>
        <img
          src="/hospital.jpg"
          alt="Hospital Logo"
          className="h-10 w-10 object-cover rounded-full"
        />
        <h1 className="text-lg font-semibold tracking-wide text-red-600">
          ENTNT Dental Center
        </h1>
      </div>

      {/* Right: Welcome text */}
      <div className="text-sm text-gray-600 hidden sm:block">
        Welcome, <strong>{user?.fullName}</strong>
      </div>
    </div>
  );
};

export default Topbar;
