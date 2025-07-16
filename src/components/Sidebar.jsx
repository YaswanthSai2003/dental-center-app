// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiLogOut } from "react-icons/fi";
import {
  MdDashboard,
  MdPersonAdd,
  MdList,
  MdEvent,
  MdInfo,
  MdHistory,
} from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ collapsed, setCollapsed }) => {
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

  // Compute width style
  const widthStyle = collapsed
    ? { width: 64 } 
    : { width: window.innerWidth <= 640 ? "60vw" : 256 };

  return (
    <div
      className="fixed top-16 left-0 h-[calc(100vh-64px)] bg-white flex flex-col z-30 transition-all duration-300"
      style={widthStyle}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h2 className="text-lg font-bold text-gray-700">MENU</h2>}
        <FiMenu
          size={20}
          className="cursor-pointer text-gray-600"
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
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

      <div className="p-4 mt-auto">
        {collapsed ? (
          <button
            onClick={logout}
            className="flex items-center justify-center w-full p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-600 hover:text-white transition"
            title="Logout"
          >
            <FiLogOut size={20} />
          </button>
        ) : (
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-600 hover:text-white transition"
          >
            <FiLogOut size={20} />
            <span className="text-base font-medium">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
