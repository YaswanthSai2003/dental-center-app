import React from "react";

const statusStyles = {
  Completed: "bg-green-100 text-green-800",
  "Under Observation": "bg-yellow-100 text-yellow-800",
  "Process": "bg-red-100 text-red-800",
  "Awaiting Tests": "bg-blue-100 text-blue-800",
};

const PastIncidents = ({ history, setPreviewUrl }) => {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Past Incidents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((h, idx) => (
          <div key={idx} className="border rounded p-4 shadow space-y-2">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <strong>Date:</strong> {new Date(h.timestamp).toLocaleString("en-IN")}
              </div>
              {h.status && (
                <span
                  className={`text-xs px-2 py-1 rounded font-medium ${statusStyles[h.status] || "bg-gray-100 text-gray-800"}`}
                >
                  {h.status}
                </span>
              )}
            </div>

            {h.title && (
              <div className="text-sm">
                <strong>Title:</strong> {h.title}
              </div>
            )}

            <div className="text-sm">
              <strong>Treatments:</strong> {h.treatmentPlan?.join(", ") || "—"}
            </div>

            <div className="text-sm">
              <strong>Cost:</strong> ₹{h.cost}
            </div>

            {h.comments && (
              <div className="text-sm">
                <strong>Comments:</strong> {h.comments}
              </div>
            )}

            {Array.isArray(h.files) && h.files.length > 0 && (
              <div>
                <strong className="block">Files:</strong>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {h.files.map((f, i) => (
                    <div key={i} className="text-center">
                      {f.url.startsWith("data:image/") ? (
                        <img
                          src={f.url}
                          alt={f.name}
                          className="h-20 w-full object-cover rounded border cursor-pointer"
                          onClick={() => setPreviewUrl(f.url)}
                        />
                      ) : (
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-blue-600 underline block truncate"
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
        ))}
      </div>
    </div>
  );
};

export default PastIncidents;
