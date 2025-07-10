// src/pages/admin/PatientDetails.jsx

import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { get, set } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { TREATMENT_OPTIONS } from "./RegisterPatient";  // ← for seeded-cost fallback

export default function PatientDetails() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    setPatients(get("patients") || []);
  }, []);

  const removePatient = (id) => {
    if (!window.confirm("Delete this patient?")) return;
    const updated = patients.filter((p) => p.id !== id);
    set("patients", updated);
    setPatients(updated);
  };

  const fmtDate = (d) => {
    if (!d) return "—";
    const dt = new Date(d);
    return isNaN(dt) ? "—" : dt.toLocaleDateString("en-IN");
  };

  const fmtDateTime = (d) => {
    if (!d) return "—";
    const dt = new Date(d);
    return isNaN(dt)
      ? "—"
      : dt.toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  const calcAge = (dob) => {
    if (!dob) return "—";
    const birth = new Date(dob),
      today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return `${age} yrs`;
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Patient Details</h2>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name/contact/ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-full md:w-1/3"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm text-left">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr>
                <th className="p-2">PID</th>
                <th className="p-2">Name</th>
                <th className="p-2">DOB</th>
                <th className="p-2">Age</th>
                <th className="p-2">Contact</th>
                <th className="p-2">Health Info</th>
                <th className="p-2">Total Cost</th>
                <th className="p-2">Visits</th>
                <th className="p-2">Last Visit</th>
                <th className="p-2">Files</th>
                <th className="p-2">Last Updated</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients
                .filter((p) =>
                  [p.fullName, p.contact, p.id]
                    .join(" ")
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((p) => {
                  // Determine last visit & its files
                  const lastHist =
                    Array.isArray(p.history) && p.history.length
                      ? p.history[p.history.length - 1]
                      : null;
                  const lastVisit = lastHist?.timestamp || p.appointmentDate;
                  const files = lastHist?.files || [];

                  // Compute fallback cost if p.totalCost is missing
                  let displayCost = 0;
                  if (p.totalCost != null) {
                    displayCost = p.totalCost;
                  } else if (Array.isArray(p.history) && p.history.length) {
                    displayCost = p.history.reduce((sum, h) => sum + (h.cost || 0), 0);
                  } else if (Array.isArray(p.treatmentPlan)) {
                    displayCost = p.treatmentPlan.reduce((sum, t) => {
                      const opt = TREATMENT_OPTIONS.find((o) => o.name === t);
                      return sum + (opt?.cost || 0);
                    }, 0);
                  }

                  return (
                    <tr key={p.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{p.id}</td>
                      <td className="p-2">{p.fullName}</td>
                      <td className="p-2">{fmtDate(p.dob)}</td>
                      <td className="p-2">{calcAge(p.dob)}</td>
                      <td className="p-2">{p.contact}</td>
                      <td className="p-2">{p.healthInfo}</td>
                      <td className="p-2">₹{displayCost}</td>
                      <td className="p-2">{p.history?.length || 0}</td>
                      <td className="p-2">{fmtDateTime(lastVisit)}</td>
                      <td className="p-2">
                        {files.length > 0 ? (
                          <ul className="space-y-1">
                            {files.map((f, i) => (
                              <li key={i}>
                                <a
                                  href={f.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="underline text-blue-600 text-xs"
                                >
                                  {f.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-2">{fmtDateTime(p.lastUpdated)}</td>
                      <td className="p-2 flex gap-2 whitespace-nowrap">
                        <button
                          onClick={() => nav(`/admin/patient/edit/${p.id}`)}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Manage
                        </button>
                        <button
                          onClick={() => removePatient(p.id)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
