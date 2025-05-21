# Oneworld Energy Platform

Full-stack web application for Oneworld Energy USA — a B2B oil and gas trading platform.

---

## 🔧 Tech Stack

| Layer      | Tech                               |
| ---------- | ---------------------------------- |
| Frontend   | React, Vite, Tailwind CSS          |
| Backend    | Node.js, Express, TypeScript       |
| Database   | PostgreSQL                         |
| ORM        | Prisma                             |
| API Format | REST (JSON)                        |
| Auth       | (Planned: JWT or session-based)    |
| Hosting    | (Planned: Vercel + Render/Railway) |

---

## 📁 Folder Structure

oneworld_energy/
├── frontend/ # React app (Vite + Tailwind)
├── backend/ # Node.js API (Express + TypeScript)
├── shared/ # shared assets or configs
└── README.md # You're here!

---

## Getting Started

### 🧩 Clone the repository

```bash
git clone https://github.com/your-username/oneworld_energy.git
cd oneworld_energy
```

## << Backend Setup

cd backend
npm install
npx prisma generate
npm run dev

## >> Frontend Setup

cd ../frontend
npm install
npm run dev

## Project Structure Highlights

🔹 Backend
/routes – Express endpoints

/controllers – Logic for each route

/models – Prisma schemas

/middleware – Auth, validation

/utils – Utility helpers

🔹 Frontend
/components – Reusable React UI elements

/pages – Main views (dashboard, profile, etc.)

/services – API calls (fetch/axios)

/layouts – Shared layout wrappers

/assets – Static files like logos, icons
