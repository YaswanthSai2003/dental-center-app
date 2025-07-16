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
    { to: "/admin/register",  icon: <MdPersonAdd size={20} />, label: "Register Patient" },
    { to: "/admin/patients",  icon: <MdList size={20} />, label: "Patient Details" },
    { to: "/admin/appointments", icon: <MdEvent size={20} />, label: "Appointments" },
  ];
  const patientLinks = [
    { to: "/user/dashboard", icon: <MdDashboard size={20} />, label: "My Dashboard" },
    { to: "/user/info",      icon: <MdInfo size={20} />,      label: "My Info" },
    { to: "/user/visits",     icon: <MdHistory size={20} />,   label: "Visits" },
  ];
  const navItems = user?.role === "Admin" ? adminLinks : patientLinks;

  const widthClass = collapsed
    ? "w-16"
    : "w-[60vw] sm:w-64";

  return (
    <div
      className={`fixed top-16 bottom-0 left-0 bg-white flex flex-col justify-between z-30 transition-all duration-300 ${widthClass}`}
    >
      { }
      <div>
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && <h2 className="text-lg font-bold text-gray-700">MENU</h2>}
          <FiMenu
            size={20}
            className="cursor-pointer text-gray-600"
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        {
          
        }
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
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
      </div>

      {
        
      }
      <div className="p-4 border-t">
        {collapsed ? (
          <button
            onClick={logout}
            title="Logout"
            className="flex items-center justify-center w-full p-2 bg-red-100 text-red-700 rounded-md hover:bg-red-600 hover:text-white transition"
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
