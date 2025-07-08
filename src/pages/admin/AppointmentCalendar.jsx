import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Layout from "../../components/Layout";
import { get } from "../../utils/storage";

const formatDate = (date) => {
  if (!date) return "";
  const local = new Date(date);
  if (isNaN(local)) return "";
  const offset = local.getTimezoneOffset();
  local.setMinutes(local.getMinutes() - offset);
  return local.toISOString().split("T")[0];
};

const formatReadableDate = (d) => {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const AppointmentCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const patientData = get("patients") || [];
    setAppointments(patientData);
  }, []);

  const dateStr = formatDate(date);

  const appointmentsOnDate = appointments.filter((a) => {
    const apptDate = formatDate(a.appointmentDate);
    return apptDate && apptDate === dateStr;
  });

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Appointments Calendar
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar UI */}
          <div className="bg-white shadow-md rounded-md p-4">
            <Calendar
              onChange={setDate}
              value={date}
              tileClassName={({ date: d }) => {
                const dStr = formatDate(d);
                const hasAppointment = appointments.some(
                  (a) => formatDate(a.appointmentDate) === dStr
                );
                return hasAppointment ? "highlight-date" : null;
              }}
            />
            <style>
              {`
              .highlight-date {
                background-color: #cceeff !important;
                border-radius: 8px;
                color: black !important;
                font-weight: bold;
              }
              .react-calendar {
                border: none;
                width: 100%;
              }
              .react-calendar__tile--now {
                background: #e2f0ff !important;
              }
              `}
            </style>
          </div>

          {/* Appointment List */}
          <div className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Appointments on {formatReadableDate(dateStr)}
            </h3>

            {appointmentsOnDate.length > 0 ? (
              <ul className="space-y-4">
                {appointmentsOnDate.map((a) => (
                  <li
                    key={a.id}
                    className="border border-gray-200 rounded p-4 shadow-sm"
                  >
                    <div className="font-semibold text-gray-800">
                      {a.fullName || "Unnamed Patient"}
                    </div>
                    <div className="text-sm text-gray-600">
                      Contact: {a.contact || "—"}
                    </div>
                    <div className="text-sm text-gray-600">
                      Treatment:{" "}
                      {Array.isArray(a.treatmentPlan)
                        ? a.treatmentPlan.filter(Boolean).join(", ")
                        : a.treatmentPlan || "—"}
                    </div>
                    <div className="text-sm text-gray-600">
                      Scheduled On: {formatReadableDate(a.appointmentDate)}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500 text-sm">
                No appointments on this day.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AppointmentCalendar;
