# 💄 BeautiBridge

> **AI-powered beauty marketplace connecting customers with verified beauty professionals — book, discover, and transform.**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=flat-square&logo=tailwindcss)
![Google Gemini](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-4285F4?style=flat-square&logo=google)
![License](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)

---

## 🚨 Problem Statement

Finding a trusted beauty professional is frustrating. Customers struggle with:

- **No centralized platform** to discover and compare verified beauty artists
- **Zero transparency** in pricing, availability, and reviews before booking
- **No personalized guidance** — customers don't know which services suit their skin type, face shape, or style
- **Scattered booking experiences** — WhatsApp, DMs, and phone calls with no confirmation system

Beauty artists face the flip side — no professional storefront, no easy booking management, and no way to showcase their portfolio digitally.

---

## 💡 Solution

**BeautiBridge** bridges this gap with an AI-powered marketplace:

- A **verified artist discovery platform** where customers can explore profiles, view portfolios, check pricing, and read real reviews
- An **intelligent booking system** for seamless appointment scheduling and management
- A **Google Gemini-powered AI beauty assistant** that gives personalized skincare, makeup, and hairstyle recommendations through natural conversation
- **Role-based dashboards** for both customers and artists to manage their entire experience in one place

> *Think of BeautiBridge as the "Airbnb meets AI stylist" for the beauty industry.*

---

## ✨ Features

### 👤 Authentication & Access Control
- Secure Email & Password login
- Google OAuth (one-click sign-in)
- Role selection — **Customer** or **Artist**
- JWT-based sessions with middleware route protection
- Secure password hashing via `bcryptjs`

### 🎨 Artist Marketplace
- Browse and search verified beauty professionals
- Rich artist profiles with bio, specializations, and availability status
- Portfolio gallery with uploaded work images
- Services listing with descriptions and pricing
- Customer ratings & reviews

### 📅 Booking System
- Multi-step appointment booking flow
- Booking confirmation & status tracking
- Upcoming and past booking history
- Cancel & reschedule support

### 🤖 AI Beauty Assistant *(powered by Google Gemini 2.5 Flash)*
- Personalized skincare, makeup & hairstyle recommendations
- Streaming conversational responses
- Persistent multi-session chat history
- Context-aware beauty advice

### 📊 Customer Dashboard
- Active bookings overview
- Booking history & status
- Saved favourite artists
- AI chat history
- Profile & notification settings

### 🖌️ Artist Dashboard
- Booking request management
- Portfolio & services manager
- Earnings overview
- Availability scheduling
- Studio profile editor
- Review management

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4, Framer Motion |
| **UI Components** | shadcn/ui, Lucide Icons |
| **State Management** | Zustand, TanStack React Query |
| **Authentication** | NextAuth.js v5 (JWT + Prisma Adapter) |
| **ORM** | Prisma ORM |
| **Database** | PostgreSQL (Neon serverless) |
| **AI** | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| **Forms** | React Hook Form + Zod |
| **Deployment** | Vercel + Neon PostgreSQL |

---

## ⚙️ Installation

### Prerequisites

- Node.js `v18+`
- npm or yarn
- A [Neon](https://neon.tech) PostgreSQL database
- A [Google Gemini](https://ai.google.dev) API key
- *(Optional)* Google OAuth credentials & Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/deepthi-ai-dev/BeautiBridge.git
cd BeautiBridge
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=your_neon_postgres_connection_string

# Auth
AUTH_SECRET=your_nextauth_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI
GEMINI_API_KEY=your_google_gemini_api_key

# Google OAuth (optional)
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# Cloudinary (optional — for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> Refer to `.env.example` for a full reference template.

### 4. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

---

## 🚀 Usage

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other available scripts

```bash
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run typecheck    # TypeScript type checking
npm run format       # Format code with Prettier
npm run prisma:push  # Push Prisma schema changes
```

---

## 📂 Project Structure

```
beautibridge/
├── app/                    # Next.js App Router — pages & layouts
│   ├── (auth)/             # Login, register, role selection pages
│   ├── (marketing)/        # Landing page & public-facing pages
│   ├── (marketplace)/      # Artist discovery & booking pages
│   ├── (artist-dashboard)/ # Artist management dashboard
│   └── api/                # API route handlers
├── components/             # Shared reusable UI components
├── features/               # Feature-specific logic & components
│   ├── ai/                 # AI chat assistant
│   ├── artist/             # Artist profile & studio
│   ├── artists/            # Marketplace browsing & search
│   ├── auth/               # Auth forms & logic
│   ├── bookings/           # Booking flow & management
│   ├── reviews/            # Ratings & reviews
│   └── search/             # Search & filter functionality
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions & shared logic
├── prisma/                 # Prisma schema & migrations
├── public/                 # Static assets
├── server/                 # Server actions & data layer
├── stores/                 # Zustand state stores
└── types/                  # Shared TypeScript types
```

---

## 📸 Screenshots

> *Screenshots coming soon — app deployment in progress.*

| Page | Description |
|---|---|
| 🏠 Landing Page | Hero section with CTA, features overview |
| 🔐 Auth Pages | Sign up / Sign in with role selection |
| 🗂️ Marketplace | Browse & filter verified beauty artists |
| 👤 Artist Profile | Portfolio, services, reviews & booking |
| 📅 Booking Flow | Multi-step appointment scheduler |
| 📊 Customer Dashboard | Bookings, favourites, AI chat history |
| 🎨 Artist Dashboard | Studio management, earnings, calendar |
| 🤖 AI Assistant | Gemini-powered beauty chat experience |

---

## 🔭 Future Scope

- 💳 **Payments Integration** — Stripe / Razorpay for in-app transactions
- 💬 **Real-time Chat** — Customer ↔ Artist messaging via WebSockets
- 📧 **Email Notifications** — Booking confirmations & reminders
- 🔔 **Push Notifications** — Real-time alerts for booking updates
- 🖼️ **AI Image Consultation** — Upload a photo and get personalized suggestions
- 🎥 **Video Consultations** — Virtual beauty sessions
- ✅ **Artist Verification Workflow** — Badge system for verified professionals
- 🗓️ **Calendar Sync** — Google Calendar integration for appointments
- 📈 **Admin Dashboard** — Platform-wide analytics & moderation
- 🌍 **Location-based Search** — Find artists near you

---

## 👥 Team — TechNova 🚀

- **Arshini**
- **Deepthi**
- **Manasa**

> Built with ❤️ by Team TechNova for the beauty community.

GitHub: [github.com/deepthi-ai-dev](https://github.com/deepthi-ai-dev)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>💄 BeautiBridge — Where beauty meets technology.</sub>
</div>
