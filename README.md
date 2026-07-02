# Audit Log Portal

This is the front-end interface for the University Management System (UMS) Audit Log Portal, featuring a complete "Stitch Velvet" design system overhaul.

## How to Run the Project Locally

If you have just cloned or downloaded this repository, follow these steps to get the app running on your computer:

### 1. Prerequisites
You must have **Node.js** installed on your computer. 
* If you don't have it, download and install it from the official website: [https://nodejs.org/](https://nodejs.org/) (The "LTS" version is recommended).

### 2. Install Dependencies
Open your terminal (Command Prompt, PowerShell, or Mac Terminal), navigate into the `audit-log-portal` folder, and run:
```bash
npm install
```
This will download all the necessary packages (like React, Tailwind CSS, etc.) required to run the project.

### 3. Start the Development Server
Once the installation is complete, start the app by running:
```bash
npm run dev
```

### 4. View the App
The terminal will display a local URL (usually `http://localhost:5173`). 
* Cmd+Click (Mac) or Ctrl+Click (Windows) the link, or copy and paste it into your browser to view the app!

---

## Features Built
* **Dynamic Routing**: Full React-Router implementation across 5 distinct views.
* **Audit Trail**: Main data grid for tracking all system events.
* **Activity Timeline**: Chronological tracking of specific entity events.
* **Compliance Reports**: Mock report generation and history tracking.
* **Export Logs**: Configurable file format exports with mock downloads.
* **Tailwind v4 Integration**: Custom color palette variables and modern utility configurations.
