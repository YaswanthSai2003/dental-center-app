import React, { createContext, useContext, useState, useEffect } from "react";

const USERS = [
  {
    id: "1",
    role: "Admin",
    fullName: "Dr. Admin",
    email: "admin@entnt.in",
    password: "admin123"
  },
  {
    id: "2",
    role: "Patient",
    fullName: "John Doe",
    email: "john@entnt.in",
    password: "patient123",
    patientId: "p1" 
  }
];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("entnt_user"));
    if (stored) setUser(stored);

    const existingPatients = JSON.parse(localStorage.getItem("patients"));
    if (!Array.isArray(existingPatients) || existingPatients.length === 0) {
      const demoPatients = [
        {
          id: "p1",
          fullName: "John Doe",
          dob: "1990-05-10",
          contact: "9999999999",
          healthInfo: "None",
          treatmentPlan: ["General Checkup"],
          appointmentDate: "2025-07-17",
          totalCost: 1500,
          history: [
            {
              timestamp: "2025-07-01",
              treatmentPlan: ["General Checkup", "Tooth Cleaning"],
              cost: 1500
            }
          ],
          lastUpdated: new Date().toISOString()
        }
      ];
      localStorage.setItem("patients", JSON.stringify(demoPatients));
    }
  }, []);

  //login
  
  const login = (email, password) => {
    const found = USERS.find(
      (u) => u.email.trim() === email.trim() && u.password === password
    );
    if (!found) throw new Error("Invalid credentials");

    setUser(found);
    localStorage.setItem("entnt_user", JSON.stringify(found));
  };

  //logout

  const logout = () => {
    setUser(null);
    localStorage.removeItem("entnt_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
