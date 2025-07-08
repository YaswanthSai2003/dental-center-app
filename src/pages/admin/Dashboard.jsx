import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { get } from "../../utils/storage";
import { format } from "date-fns";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const data = get("patients") || [];
    setPatients(data);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const patientsToday = patients.filter((p) => {
    return p?.appointmentDate === format(today, "yyyy-MM-dd");
  });

  const revenueThisMonth = patients.reduce((sum, patient) => {
  if (!Array.isArray(patient.history)) return sum;

  return (
    sum +
    patient.history.reduce((subSum, visit) => {
      if (!visit.timestamp || visit.cost == null) return subSum;

      const visitDate = new Date(visit.timestamp);
      const now = new Date();

      return (
        visitDate.getMonth() === now.getMonth() &&
        visitDate.getFullYear() === now.getFullYear() &&
        visitDate < today
      )
        ? subSum + visit.cost
        : subSum;
    }, 0)
  );
}, 0);


  const pendingTreatments = patients.filter((p) => {
    const appt = new Date(p.appointmentDate || null);
    appt.setHours(0, 0, 0, 0);
    return (
      Array.isArray(p.treatmentPlan) &&
      p.treatmentPlan.length > 0 &&
      appt >= today
    );
  }).length;

  const recentPatients = [...patients].slice(-5).reverse();

  const upcomingPatients = [...patients]
    .filter((p) => {
      const appt = new Date(p.appointmentDate || null);
      appt.setHours(0, 0, 0, 0);
      return appt >= today;
    })
    .sort(
      (a, b) =>
        new Date(a.appointmentDate).getTime() -
        new Date(b.appointmentDate).getTime()
    )
    .slice(0, 5);

  const formatDate = (d) => {
    if (!d) return "—";
    try {
      return format(new Date(d), "dd/MM/yyyy");
    } catch {
      return "—";
    }
  };

  const formatTreatments = (t) =>
    Array.isArray(t)
      ? t.join(", ")
      : typeof t === "string"
      ? t
      : "—";

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard</h2>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 shadow rounded border-l-4 border-blue-500">
            <h3 className="text-sm text-gray-600">Total Patients</h3>
            <p className="text-2xl font-bold text-gray-800">{patients.length}</p>
          </div>

          <div className="bg-white p-4 shadow rounded border-l-4 border-green-500">
            <h3 className="text-sm text-gray-600">Today's Appointments</h3>
            <p className="text-2xl font-bold text-gray-800">{patientsToday.length}</p>
          </div>

          <div className="bg-white p-4 shadow rounded border-l-4 border-yellow-500">
            <h3 className="text-sm text-gray-600">Revenue This Month</h3>
            <p className="text-2xl font-bold text-gray-800">₹{revenueThisMonth}</p>
          </div>

          <div className="bg-white p-4 shadow rounded border-l-4 border-red-500">
            <h3 className="text-sm text-gray-600">Pending Treatments</h3>
            <p className="text-2xl font-bold text-gray-800">{pendingTreatments}</p>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Recent Patients
          </h3>
          <div className="bg-white rounded shadow p-3 divide-y text-sm">
            {recentPatients.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No recent patients.
              </div>
            )}
            {recentPatients.map((p) => (
              <div key={p.id} className="py-2">
                <span className="font-medium">{p.id}</span> —{" "}
                <span>{p.fullName || "—"}</span> —{" "}
                <span>{formatTreatments(p.treatmentPlan)}</span> —{" "}
                <span>{formatDate(p.appointmentDate)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Upcoming Appointments
          </h3>
          <div className="bg-white rounded shadow p-3 divide-y text-sm">
            {upcomingPatients.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No upcoming appointments.
              </div>
            ) : (
              upcomingPatients.map((p) => (
                <div key={p.id} className="py-2">
                  <span className="font-medium">{p.id}</span> —{" "}
                  <span>{p.fullName || "—"}</span> —{" "}
                  <span>{formatTreatments(p.treatmentPlan)}</span> —{" "}
                  <span>{formatDate(p.appointmentDate)}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
