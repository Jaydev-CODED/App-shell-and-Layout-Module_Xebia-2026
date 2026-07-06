# App Shell & Layout Model (Full-Stack Version)

This repository contains a full-stack application featuring a responsive **React frontend** and a structured **Node.js/Express backend**, designed in accordance with the `backend_roadmap.pdf` architectural specifications.

## Project Structure

```
├── frontend/             # React + Vite client application
│   ├── src/              # React code (Components, Pages, App.jsx)
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── backend/              # Node.js + Express + TypeScript server
│   ├── src/              # Server source code (Routes, Workers, Services)
│   ├── prisma/           # Database schema & migrations
│   └── package.json      # Backend dependencies
├── package.json          # Root scripts to run both apps concurrently
└── README.md             # This documentation
```

## Prerequisites

To run this application, make sure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- **PostgreSQL** (for database, optional - defaults to PostgreSQL but supports fallback)
- **Redis** (for real-time metrics & async report queues, optional - falls back to in-memory processing if offline)

## Getting Started

### 1. Install Dependencies
Run the install command at the root to set up all packages for the root, frontend, and backend projects:
```bash
npm run install:all
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/app_shell_db?schema=public"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-super-secret-jwt-key"
```

*Note: If you do not have PostgreSQL or Redis running locally, the server will automatically mock these services in memory, allowing you to test the app out-of-the-box.*

### 3. Run the Application
Start both the React dev server and Express backend server concurrently:
```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

---

## Architecture Overview

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Features**: Hash router, collapsible layout sidebars, telemetry logging, performance graphs, project board, reports downloader.

### Backend
- **Core**: Express.js + TypeScript
- **Database**: Prisma ORM (mapped to PostgreSQL)
- **Real-Time**: Socket.io for telemetry streaming (e.g., active user counts and latency updates)
- **Async Queue**: BullMQ (Redis-backed) for offloading PDF and CSV report compilation jobs.
- **Security**: JWT session authentication, bcryptjs password hashing, helmet HTTP headers, rate-limiting on API endpoints.
