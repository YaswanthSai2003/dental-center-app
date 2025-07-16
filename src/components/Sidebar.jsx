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

  const links = user?.role === "Admin"
    ? [
        { to: "/admin/dashboard", icon: <MdDashboard size={20} />, label: "Dashboard" },
        { to: "/admin/register", icon: <MdPersonAdd size={20} />, label: "Register Patient" },
        { to: "/admin/patients", icon: <MdList size={20} />, label: "Patient Details" },
        { to: "/admin/appointments", icon: <MdEvent size={20} />, label: "Appointments" },
      ]
    : [
        { to: "/user/dashboard", icon: <MdDashboard size={20} />, label: "My Dashboard" },
        { to: "/user/info", icon: <MdInfo size={20} />, label: "My Info" },
        { to: "/user/visits", icon: <MdHistory size={20} />, label: "Visits" },
      ];

  const sidebarWidth = collapsed ? 64 : 256;

  return (
    <div
      className="fixed top-16 left-0 z-40 bg-white flex flex-col overflow-hidden"
      style={{
        width: sidebarWidth,
        height: "calc(100vh - 64px)",
      }}
    >
      
      <div className="flex items-center justify-between p-4 shrink-0">
        {!collapsed && <h2 className="text-lg font-bold text-gray-700">MENU</h2>}
        <FiMenu
          size={20}
          className="cursor-pointer text-gray-600"
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded transition ${
                isActive ? "text-red-600 font-semibold" : "text-gray-700"
              } hover:bg-red-50`
            }
          >
            <span className="text-lg text-red-600">{icon}</span>
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </div>

      <div className="p-4 shrink-0">
        <button
          onClick={logout}
          title="Logout"
          className={`w-full flex items-center justify-center ${
            collapsed ? "p-2" : "gap-2 px-4 py-2"
          } bg-red-100 text-red-700 rounded hover:bg-red-600 hover:text-white transition`}
        >
          <FiLogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
