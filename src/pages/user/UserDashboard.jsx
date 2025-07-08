import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { get, set } from "../../utils/storage";
import { useAuth } from "../../context/AuthContext";


const TREATMENT_OPTIONS = [
  { name: "General Checkup", cost: 500 },
  { name: "Tooth Cleaning", cost: 1000 },
  { name: "Root Canal", cost: 3000 },
  { name: "Braces Consultation", cost: 1500 },
  { name: "Surgery Consultation", cost: 2500 },
];

const UserDashboard = () => {
  const { user } = useAuth();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
  if (!user?.patientId) return;

  const all = get("patients") || [];
  const found = all.find((p) => p.id === user.patientId);
  if (!found) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = [];
  const toHistory = [];

  (found.upcoming || []).forEach((appt) => {
    if (!appt.date) return;

    const apptDate = new Date(appt.date);
    apptDate.setHours(0, 0, 0, 0);

    if (apptDate < today) {
      toHistory.push({
        timestamp: appt.date,
        treatmentPlan: appt.treatmentPlan || [],
        cost: 0,
      });
    } else {
      upcoming.push(appt);
    }
  });

  found.upcoming = upcoming;

  if (toHistory.length > 0) {
    found.history = [...(found.history || []), ...toHistory];
    const updated = all.map((p) => (p.id === found.id ? found : p));
    set("patients", updated);
  }

  setPatient(found);
}, [user]);


  const getUpcomingAppointments = () => {
  if (!patient?.upcoming) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return patient.upcoming
    .filter((a) => {
      const date = new Date(a.date);
      date.setHours(0, 0, 0, 0);
      return date >= today;
    })
    .map((a) => ({
      date: new Date(a.date),
      treatment: (a.treatmentPlan || []).join(", "),
      cost: (a.treatmentPlan || []).reduce((sum, t) => {
        const match = TREATMENT_OPTIONS.find((opt) => opt.name === t);
        return sum + (match?.cost || 0);
      }, 0),
    }))
    .sort((a, b) => a.date - b.date);
};


  const formatDate = (d) => {
    if (!d) return "—";
    const date = new Date(d);
    return date.toLocaleDateString("en-IN");
  };

  const totalCost =
    patient?.history?.reduce((acc, h) => acc + (h.cost || 0), 0) || 0;

  const upcoming = getUpcomingAppointments();
  const nextAppointmentDate = upcoming[0]?.date;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold">Welcome, {user.fullName}!</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded shadow text-center">
            <div className="text-sm text-gray-600">Next Appointment</div>
            <div className="text-2xl font-bold">
              {nextAppointmentDate ? formatDate(nextAppointmentDate) : "—"}
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded shadow text-center">
            <div className="text-sm text-gray-600">Past Visits</div>
            <div className="text-2xl font-bold">
              {patient?.history?.length || 0}
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow text-center">
            <div className="text-sm text-gray-600">Total Spend</div>
            <div className="text-2xl font-bold">₹{totalCost}</div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        {upcoming.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mt-6 mb-2">
              Upcoming Appointments
            </h3>
            <table className="min-w-full border text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Date</th>
                  <th className="p-2">Treatment</th>
                  <th className="p-2">Cost</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((appt, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2">{formatDate(appt.date)}</td>
                    <td className="p-2">{appt.treatment}</td>
                    <td className="p-2">₹{appt.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserDashboard;
