# 🦷 Dental Center Management Dashboard

This is a complete frontend-only application built for managing a dental clinic's operations. It supports both **Admin (Dentist)** and **Patient** roles. The system simulates real-world workflows like patient registration, appointment tracking, treatment history, and file uploads — all handled with `localStorage`.

---

## 👨‍⚕️ User Roles

### 1. Admin (Dentist)

- Email: `admin@entnt.in`
- Password: `admin123`
- Role: Full access (add/edit patients, treatments, view dashboard, calendar)

### 2. Patient

- Email: `john@entnt.in`
- Password: `patient123`
- Role: Can view only their personal records

---

## ✨ Features

### 🔐 Login (Simulated)

- Login system with hardcoded users
- Role-based access (Context API used for session handling)

### 🧾 Patient Management (Admin)

- Add new patients with full details
- Add treatment plan with dynamic cost calculation
- Attach files (PDFs, images) for each visit
- Medical status selector (e.g. Completed, In Progress)

### 📅 Calendar

- Monthly calendar to view all scheduled appointments
- Days with treatments are highlighted
- Click to see patient list for selected day

### 📊 Admin Dashboard

- KPIs like total patients, today’s appointments, revenue
- Upcoming treatments
- Recently added patients

### 🧑‍⚕️ Patient View

- Patient can log in and view their upcoming appointments
- See past treatment history and attached files
- Track amount spent across visits

---

## 💾 Data Storage

All data is stored in the browser’s **localStorage**.

- No backend or external APIs used
- All treatments, appointments, and files persist across sessions

---

## ⚙️ Tech Stack

- **React** (Functional Components)
- **React Router** (Navigation)
- **TailwindCSS** (Styling)
- **Context API** (Auth and Role Management)
- **Vite** (Bundler)
- **localStorage** (Data persistence)

---

## 🏁 How to Run Locally

```bash
git clone https://github.com/your-username/dental-center-dashboard.git
cd dental-center-dashboard

npm install
npm run dev
```

Open your browser at http://localhost:5173

## 💬 Technical Decisions

- **Context API** was preferred over Redux for a lighter setup and easier session handling.
- **TailwindCSS** was used to make layout development fast and fully responsive.
- **Base64** encoding was used for file upload preview since the project simulates a backend.

---

## 📂 Sample Data (Users)

```json
{
  "users": [
    { "id": "1", "email": "admin@entnt.in", "password": "admin123", "role": "Admin" },
    { "id": "2", "email": "john@entnt.in", "password": "patient123", "role": "Patient", "patientId": "p1" }
  ]
}

## 🌍 Deployed Demo
- 🔗 **Live App:** [https://your-vercel-link.vercel.app](https://your-vercel-link.vercel.app)
- 🔗 **GitHub Repo:** [https://github.com/your-username/dental-center-dashboard](https://github.com/your-username/dental-center-dashboard)


## 📌 Notes
- No backend or API is used; this is a frontend-only simulation.
- No external libraries like Firebase, Auth0, Redux, or database tools are used.
- All validation, file preview, and role-based access control are implemented manually.
- Forms include basic error handling and scroll automatically to the first invalid input on submit.

```
