import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(email, password);
      const stored = JSON.parse(localStorage.getItem("entnt_user"));
      if (stored.role === "Admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fillAdmin = () => {
    setEmail("admin@entnt.in");
    setPassword("admin123");
    setError("");
  };

  const fillPatient = () => {
    setEmail("john@entnt.in");
    setPassword("patient123");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">ENTNT Login</h2>

        {/* Quick login buttons */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={fillAdmin}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-sm px-3 py-2 rounded"
          >
            Login as Admin
          </button>
          <button
            type="button"
            onClick={fillPatient}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-sm px-3 py-2 rounded"
          >
            Login as Patient
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <label className="block mb-2">
          <span className="text-gray-700 text-sm">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 text-sm">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
