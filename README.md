# 💄 BeautiBridge

> AI-powered beauty marketplace connecting customers with verified beauty professionals.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

BeautiBridge is a modern AI-powered beauty services marketplace that helps customers discover, compare, and book verified beauty professionals while providing artists with a dedicated platform to manage their business.

The platform includes secure authentication, role-based dashboards, an AI beauty assistant, artist discovery, appointment booking, and responsive user experiences.

---

# ✨ Features

## 👤 Authentication

- Secure Email & Password Authentication
- Google OAuth (optional)
- Customer & Artist Roles
- JWT Session Authentication
- Protected Routes
- Role Selection
- Secure Password Hashing

---

## 🎨 Artist Marketplace

- Browse verified beauty artists
- Advanced artist profiles
- Services & Pricing
- Portfolio Gallery
- Ratings & Reviews
- Availability Status
- Search & Filtering

---

## 📅 Booking System

- Appointment Booking
- Booking Confirmation
- Booking History
- Upcoming Appointments
- Cancel & Reschedule UI
- Booking Status Tracking

---

## 🤖 AI Beauty Assistant

Powered by **Google Gemini**

- Beauty Recommendations
- Makeup Suggestions
- Skincare Advice
- Hairstyle Recommendations
- Personalized Conversations
- Multi-chat History
- Streaming Responses

---

## 📊 Dashboards

### Customer Dashboard

- Active Bookings
- Booking History
- Favorites
- AI Chat History
- Notifications
- Profile
- Settings

### Artist Dashboard

- Booking Requests
- Calendar
- Portfolio Manager
- Services Management
- Reviews
- Earnings
- Availability
- Studio Profile
- Settings

---

# 🛠 Tech Stack

## Frontend

- Next.js 15 (App Router)
- React
- TypeScript
- Tailwind CSS v4
- Zustand
- React Markdown
- Lucide Icons

## Backend

- NextAuth.js v5
- Prisma ORM
- PostgreSQL (Neon)
- Server Actions
- Route Handlers

## AI

- Google Gemini 2.5 Flash

## Deployment

- Vercel
- Neon PostgreSQL

---

# 📂 Project Structure

```
app/
components/
features/
hooks/
lib/
prisma/
public/
server/
stores/
types/
```

---

# 🚀 Getting Started

## Clone

```bash
git clone https://github.com/deepthi-ai-dev/BeautiBridge.git

cd BeautiBridge
```

---

## Install

```bash
npm install
```

---

## Environment Variables

Create a `.env` file.

```env
DATABASE_URL=

AUTH_SECRET=

NEXT_PUBLIC_APP_URL=http://localhost:3000

GEMINI_API_KEY=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Prisma

Generate Prisma Client

```bash
npx prisma generate
```

Push schema

```bash
npx prisma db push
```

---

## Run

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

# 📸 Screenshots

- Landing Page
- Artist Marketplace
- Artist Profile
- Booking Flow
- Customer Dashboard
- Artist Dashboard
- AI Assistant

---

# 🔒 Authentication

BeautiBridge uses:

- JWT Sessions
- NextAuth.js v5
- Prisma Adapter
- Role-Based Access Control
- Protected Routes
- Middleware Authorization

---

# 📱 Responsive Design

Supports

- Desktop
- Laptop
- Tablet
- Mobile

---

# 🌟 Future Improvements

- Real-time Chat
- Payments (Stripe/Razorpay)
- Email Notifications
- Push Notifications
- Artist Verification Workflow
- AI Image Consultation
- Video Consultations
- Admin Dashboard
- Analytics
- Booking Calendar Sync

---

# 🧪 Available Scripts

```bash
npm run dev

npm run build

npm run start

npm run lint

npm run typecheck
```

---

# 👨‍💻 Author

**Deepthi**

GitHub:
https://github.com/deepthi-ai-dev

---

# 📄 License

This project is licensed under the MIT License.
