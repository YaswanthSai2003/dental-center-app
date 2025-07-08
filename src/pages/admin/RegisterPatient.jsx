import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { get, set } from "../../utils/storage";
import RegisterForm from "./RegisterForm";
import PastIncidents from "./PastIncidents";

// Generate ID
const generatePatientID = () => {
  const now = new Date();
  const datePart = now.toLocaleDateString("en-CA").replace(/-/g, "");
  const tsPart = now.getTime().toString().slice(-5);
  return `ENT-${datePart}-${tsPart}`;
};

// Treatment Options
export const TREATMENT_OPTIONS = [
  { name: "General Checkup", cost: 500 },
  { name: "Tooth Cleaning", cost: 1000 },
  { name: "Root Canal", cost: 3000 },
  { name: "Braces Consultation", cost: 1500 },
  { name: "Surgery Consultation", cost: 2500 },
];

// Status Options
export const STATUS_OPTIONS = [
  "Ongoing",
  "Recovered",
  "Process",
  "Results Await",
];

export default function RegisterPatient() {
  const { id: editId } = useParams();
  const isEdit = Boolean(editId);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: generatePatientID(),
    fullName: "",
    dob: "",
    contact: "",
    healthInfo: "",
    appointmentDate: "",
    treatmentPlan: [],
    sessionCost: 0,
    incidentTitle: "",
    incidentDescription: "",
    incidentComments: "",
    incidentFiles: [],
    history: [],
    totalCost: 0,
    status: "Ongoing",
  });

  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const refs = {
    fullName: useRef(),
    dob: useRef(),
    contact: useRef(),
    appointmentDate: useRef(),
    treatmentPlan: useRef(),
  };

  useEffect(() => {
    if (!isEdit) return;

    const pts = get("patients") || [];
    const patient = pts.find((p) => p.id === editId);
    if (!patient) {
      alert("Patient not found");
      return navigate("/admin/patients");
    }

    const cost = (patient.treatmentPlan || []).reduce((s, t) => {
      const opt = TREATMENT_OPTIONS.find((o) => o.name === t);
      return s + (opt?.cost || 0);
    }, 0);

    setForm({ ...patient, sessionCost: cost });
  }, [isEdit, editId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.dob) errs.dob = "Date of birth is required";
    if (!form.contact.trim()) errs.contact = "Contact is required";
    if (!form.appointmentDate) errs.appointmentDate = "Appointment date is required";
    if (!form.treatmentPlan.length) errs.treatmentPlan = "Choose at least one treatment";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const first = Object.keys(errs)[0];
      refs[first]?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      refs[first]?.current?.focus();
      return;
    }

    const allPatients = get("patients") || [];
    const timestamp = new Date().toISOString();

    const visit = {
      timestamp,
      appointmentDate: form.appointmentDate,
      treatmentPlan: [...form.treatmentPlan],
      cost: form.sessionCost,
      title: form.incidentTitle,
      description: form.incidentDescription,
      comments: form.incidentComments,
      files: [...form.incidentFiles],
      status: form.status,
    };

    const todayStr = new Date().toISOString().split("T")[0];
    const isFuture = form.appointmentDate > todayStr;
    const upcoming = isFuture
      ? [{ date: form.appointmentDate, treatmentPlan: [...form.treatmentPlan] }]
      : [];

    let updatedPatients;

    if (isEdit) {
      updatedPatients = allPatients.map((p) => {
        if (p.id !== form.id) return p;

        const newHistory = [...(p.history || []), visit];
        const total = newHistory.reduce((sum, h) => sum + h.cost, 0);

        return {
          ...p,
          ...form,
          history: newHistory,
          totalCost: total,
          lastUpdated: timestamp,
          upcoming: isFuture ? [...(p.upcoming || []), ...upcoming] : p.upcoming || [],
        };
      });
    } else {
      updatedPatients = [
        ...allPatients,
        {
          ...form,
          history: [visit],
          totalCost: visit.cost,
          lastUpdated: timestamp,
          upcoming,
        },
      ];
    }

    set("patients", updatedPatients);
    navigate("/admin/patients");
  };

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">
          {isEdit ? "Edit Patient & Add Visit" : "Register New Patient"}
        </h2>

        <RegisterForm
          form={form}
          setForm={setForm}
          errors={errors}
          setErrors={setErrors}
          refs={refs}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          onSubmit={handleSubmit}
        />

        {isEdit && form.history.length > 0 && (
          <PastIncidents history={form.history} setPreviewUrl={setPreviewUrl} />
        )}

        {/* Fullscreen Image Preview */}
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
}
