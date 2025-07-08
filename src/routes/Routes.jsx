import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/Login";
import Dashboard from "../pages/admin/Dashboard";
import RegisterPatient from "../pages/admin/RegisterPatient";
import PatientDetails from "../pages/admin/PatientDetails";
import AppointmentCalendar from "../pages/admin/AppointmentCalendar";
import UserDashboard from "../pages/user/UserDashboard";
import Info from "../pages/user/Info";
import Visits from "../pages/user/Visits"; 


const AppRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {

      }
      {user.role === "Admin" && (
  <>
    <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/register" element={<RegisterPatient />} />
    <Route path="/admin/patients" element={<PatientDetails />} />
    <Route path="/admin/appointments" element={<AppointmentCalendar />} />

    {

    }
    <Route path="/admin/patient/edit/:id" element={<RegisterPatient />} />
    
  </>
)}
      {

      }
      {user.role === "Patient" && (
  <>
    <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
    <Route path="/user/dashboard" element={<UserDashboard />} />
    <Route path="/user/info" element={<Info />} />
    <Route path="/user/visits" element={<Visits />} />
  </>
)}
      {

      }
      <Route path="*" element={<Navigate to={user.role === "Admin" ? "/admin/dashboard" : "/user/dashboard"} replace />} />
    </Routes>
  );
};

export default AppRoutes;
