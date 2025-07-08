import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { get } from "../../utils/storage";
import { useAuth } from "../../context/AuthContext";

const Visits = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const all = get("patients") || [];
    const patient = all.find((p) => p.id === user?.patientId);
    if (patient?.history) {
      setHistory(patient.history);
    }
  }, [user]);

  const formatDate = (d) => {
    const date = new Date(d);
    return isNaN(date) ? "—" : date.toLocaleString("en-IN", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold">My Visits</h2>

        {history.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {history.map((visit, idx) => {
      const isImageFile = (f) =>
        typeof f.url === "string" && f.url.startsWith("data:image/");
      return (
        <div key={idx} className="bg-white p-4 rounded shadow space-y-3">
          <div className="text-sm text-gray-600">
            <strong>Date:</strong> {formatDate(visit.timestamp)}
          </div>
          {visit.title && (
            <div className="text-sm">
              <strong>Title:</strong> {visit.title}
            </div>
          )}
          <div className="text-sm">
            <strong>Treatments:</strong>{" "}
            <span className="flex flex-wrap gap-1 mt-1">
              {visit.treatmentPlan.map((t, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs"
                >
                  {t}
                </span>
              ))}
            </span>
          </div>
          <div className="text-sm">
            <strong>Cost:</strong> ₹{visit.cost}
          </div>
          {visit.comments && (
            <div className="text-sm">
              <strong>Comments:</strong> {visit.comments}
            </div>
          )}
          {Array.isArray(visit.files) && visit.files.length > 0 && (
            <div className="pt-2">
              <strong className="block mb-1">Files:</strong>
              <div className="grid grid-cols-2 gap-2">
                {visit.files.map((f, i) => (
                  <div key={i} className="text-center">
                    {isImageFile(f) ? (
                      <img
                        src={f.url}
                        alt={f.name}
                        className="h-24 w-full object-cover rounded border cursor-pointer"
                        onClick={() => setPreviewUrl(f.url)}
                      />
                    ) : (
                      <a
                        href={f.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline block truncate"
                      >
                        {f.name}
                      </a>
                    )}
                    <div className="text-xs truncate">{f.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div>
) : (
  <p>No visit records found.</p>
)}


        {/* Full-screen image preview */}
        {previewUrl && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            onClick={() => setPreviewUrl(null)}
          >
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Visits;
