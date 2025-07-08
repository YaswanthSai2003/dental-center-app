import React from "react";
import { useAuth } from "../../context/AuthContext";
import Layout from "../../components/Layout";
import { get } from "../../utils/storage";

const Info = () => {
  const { user } = useAuth();
  const allPatients = get("patients") || [];
  const patient = allPatients.find((p) => p.id === user?.patientId);

  const infoList = [
    { label: "Name", value: patient?.fullName || "—" },
    {
  label: "Date of Birth",
  value: patient?.dob
    ? new Date(patient.dob).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—",
},

    { label: "Contact", value: patient?.contact || "—" },
    { label: "Health Info", value: patient?.healthInfo || "—" },
    {
      label: "Treatment Plan",
      value: Array.isArray(patient?.treatmentPlan)
        ? patient.treatmentPlan.join(", ")
        : patient?.treatmentPlan || "—",
    },
    {
      label: "Total Cost",
      value: `₹${patient?.totalCost || 0}`,
    },
    {
      label: "Last Updated",
      value: patient?.lastUpdated
        ? new Date(patient.lastUpdated).toLocaleString("en-IN")
        : "—",
    },
  ];

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Info</h2>

        <div className="bg-white shadow border rounded-lg">
          <table className="min-w-full text-sm text-left table-auto">
            <tbody>
              {infoList.map(({ label, value }) => (
                <tr key={label} className="border-b last:border-none">
                  <td className="px-4 py-3 font-medium text-gray-700 w-1/3">
                    {label}
                  </td>
                  <td className="px-4 py-3 text-gray-900">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Info;
