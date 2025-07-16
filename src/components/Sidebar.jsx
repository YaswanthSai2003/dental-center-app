import React from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiLogOut, FiX } from "react-icons/fi";
import {
  MdDashboard,
  MdPersonAdd,
  MdList,
  MdEvent,
  MdInfo,
  MdHistory,
} from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { logout, user } = useAuth();

  const adminLinks = [
    { to: "/admin/dashboard", icon: <MdDashboard size={20} />, label: "Dashboard" },
    { to: "/admin/register", icon: <MdPersonAdd size={20} />, label: "Register Patient" },
    { to: "/admin/patients", icon: <MdList size={20} />, label: "Patient Details" },
    { to: "/admin/appointments", icon: <MdEvent size={20} />, label: "Appointments" },
  ];

  const patientLinks = [
    { to: "/user/dashboard", icon: <MdDashboard size={20} />, label: "My Dashboard" },
    { to: "/user/info", icon: <MdInfo size={20} />, label: "My Info" },
    { to: "/user/visits", icon: <MdHistory size={20} />, label: "Visits" },
  ];

  const navItems = user?.role === "Admin" ? adminLinks : patientLinks;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity sm:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
        onClick={() => setMobileOpen(false)}
      ></div>

      {/* Sidebar itself */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] bg-white flex flex-col z-50 transition-all duration-300 ${
          mobileOpen
            ? "w-64 sm:w-64"
            : collapsed
            ? "w-16"
            : "w-64"
        } ${mobileOpen ? "sm:relative" : "hidden sm:flex"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <h2 className="text-lg font-bold text-gray-700">MENU</h2>
          )}
          <button
            onClick={() => {
              if (window.innerWidth < 640) {
                setMobileOpen(false);
              } else {
                setCollapsed(!collapsed);
              }
            }}
          >
            {mobileOpen && window.innerWidth < 640 ? (
              <FiX size={20} />
            ) : (
              <FiMenu size={20} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                  isActive ? "text-red-600 font-semibold" : "text-gray-700"
                } hover:bg-red-50`
              }
            >
              <span className="text-lg text-red-600">{icon}</span>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 mt-auto">
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-600 hover:text-white transition"
          >
            <FiLogOut size={20} />
            {!collapsed && <span className="text-base font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
