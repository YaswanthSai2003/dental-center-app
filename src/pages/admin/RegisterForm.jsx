import React from "react";
import { TREATMENT_OPTIONS } from "./RegisterPatient";

export default function RegisterForm({
  form,
  setForm,
  errors,
  setErrors,
  refs,
  previewUrl,
  setPreviewUrl,
  onSubmit,
}) {
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "treatmentPlan") {
      const updated = checked
        ? [...form.treatmentPlan, value]
        : form.treatmentPlan.filter((t) => t !== value);

      const cost = updated.reduce((sum, t) => {
        const opt = TREATMENT_OPTIONS.find((o) => o.name === t);
        return sum + (opt?.cost || 0);
      }, 0);

      setForm((prev) => ({ ...prev, treatmentPlan: updated, sessionCost: cost }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    Promise.all(
      files.map((file, idx) => {
        return new Promise((res) => {
          const reader = new FileReader();
          reader.onload = () =>
            res({ name: `file-${form.incidentFiles.length + idx + 1}`, url: reader.result });
          reader.readAsDataURL(file);
        });
      })
    ).then((newFiles) => {
      setForm((prev) => ({
        ...prev,
        incidentFiles: [...prev.incidentFiles, ...newFiles],
      }));
    });
  };

  const removeFile = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      incidentFiles: prev.incidentFiles.filter((_, i) => i !== indexToRemove),
    }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded shadow"
    >
      {/* FULL NAME */}
      <div ref={refs.fullName}>
        <label className="block text-sm">Full Name</label>
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className={`w-full border px-3 py-2 mt-1 rounded ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
      </div>

      {/* DOB */}
      <div ref={refs.dob}>
        <label className="block text-sm">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className={`w-full border px-3 py-2 mt-1 rounded ${
            errors.dob ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.dob && <p className="text-sm text-red-500">{errors.dob}</p>}
      </div>

      {/* CONTACT */}
      <div ref={refs.contact}>
        <label className="block text-sm">Contact</label>
        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          className={`w-full border px-3 py-2 mt-1 rounded ${
            errors.contact ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.contact && <p className="text-sm text-red-500">{errors.contact}</p>}
      </div>

      {/* HEALTH INFO */}
      <div>
        <label className="block text-sm">Health Info</label>
        <textarea
          name="healthInfo"
          value={form.healthInfo}
          onChange={handleChange}
          rows={3}
          className="w-full border px-3 py-2 mt-1 rounded border-gray-300"
        />
      </div>

      {/* INCIDENT TITLE & DATE */}
      <div>
        <label className="block text-sm">Incident Title</label>
        <input
          name="incidentTitle"
          value={form.incidentTitle}
          onChange={handleChange}
          className="w-full border px-3 py-2 mt-1 rounded border-gray-300"
        />
      </div>

      <div ref={refs.appointmentDate}>
        <label className="block text-sm">Appointment Date</label>
        <input
          type="date"
          name="appointmentDate"
          value={form.appointmentDate}
          onChange={handleChange}
          className={`w-full border px-3 py-2 mt-1 rounded ${
            errors.appointmentDate ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.appointmentDate && (
          <p className="text-sm text-red-500">{errors.appointmentDate}</p>
        )}
      </div>

      {/* INCIDENT DESCRIPTION & COMMENTS */}
      <div className="md:col-span-2">
        <label className="block text-sm">Description</label>
        <textarea
          name="incidentDescription"
          value={form.incidentDescription}
          onChange={handleChange}
          className="w-full border px-3 py-2 mt-1 rounded border-gray-300"
          rows={2}
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm">Comments</label>
        <textarea
          name="incidentComments"
          value={form.incidentComments}
          onChange={handleChange}
          className="w-full border px-3 py-2 mt-1 rounded border-gray-300"
          rows={2}
        />
      </div>

      {/* TREATMENTS */}
      <div ref={refs.treatmentPlan} className="md:col-span-2">
        <label className="block text-sm mb-1">Treatment Plan</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {TREATMENT_OPTIONS.map((opt) => (
            <label key={opt.name} className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                name="treatmentPlan"
                value={opt.name}
                checked={form.treatmentPlan.includes(opt.name)}
                onChange={handleChange}
              />
              {opt.name} (₹{opt.cost})
            </label>
          ))}
        </div>
        {errors.treatmentPlan && (
          <p className="text-sm text-red-500">{errors.treatmentPlan}</p>
        )}
      </div>

      {/* STATUS DROPDOWN */}
      <div className="md:col-span-2">
        <label className="block text-sm">Visit Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border px-3 py-2 mt-1 rounded border-gray-300"
        >
          <option value="Completed">Completed</option>
          <option value="Under Observation">Under Observation</option>
          <option value="Process">Process</option>
          <option value="Results Await">Results Await</option>
        </select>
      </div>

      {/* FILES */}
      <div className="md:col-span-2">
        <label className="block text-sm">Attach Files</label>
        <input type="file" multiple onChange={handleFileSelect} />
      </div>

      {/* FILE PREVIEW */}
      {form.incidentFiles.length > 0 && (
        <div className="md:col-span-2 mt-4">
          <h4 className="font-semibold mb-2">Uploaded Files</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {form.incidentFiles.map((file, idx) => {
              const isImage = typeof file.url === "string" && file.url.startsWith("data:image/");
              return (
                <div key={idx} className="relative text-center border rounded p-1">
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded"
                    onClick={() => removeFile(idx)}
                  >
                    ✕
                  </button>
                  {isImage ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="h-24 w-full object-cover rounded border cursor-pointer"
                      onClick={() => setPreviewUrl(file.url)}
                    />
                  ) : (
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-blue-600 underline block truncate"
                    >
                      {file.name}
                    </a>
                  )}
                  <div className="text-xs truncate">{file.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBMIT */}
      <div className="md:col-span-2 text-right mt-4">
        <p className="text-sm text-gray-600 mb-2">
          This Visit: ₹{form.sessionCost}
          <br />
          {form.totalCost > 0 && <>Total Spent: ₹{form.totalCost}</>}
        </p>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Save Visit
        </button>
      </div>
    </form>
  );
}
