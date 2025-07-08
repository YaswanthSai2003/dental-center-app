import { get, set } from "./utils/storage";

if (!get("patients")) {
  set("patients", [
    {
      id: "p1",
      fullName: "John Doe",
      email: "john@entnt.in",
      dob: "1990-05-10",
      contact: "+91 9876543210",
      healthInfo: "No known allergies",
      treatmentPlan: ["General Checkup", "Tooth Cleaning"],
      cost: 1500,
      appointmentDate: "2025-07-01",
      files: []
    },
  ]);
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
