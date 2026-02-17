# 🚀 Real-Time Task Collaboration Platform

A lightweight Trello/Notion-style task collaboration platform built using:

- ⚛️ React (Frontend SPA)
- 🟢 Node.js + Express (Backend)
- 🗄 PostgreSQL + Prisma ORM
- 🔄 Socket.IO (Real-time updates)
- 🔐 JWT Authentication

---

## 📌 Features

### 🔐 Authentication
- User registration
- Login with JWT
- Protected routes

### 📋 Board Management
- Create boards
- Delete boards
- View all boards

### 📂 Lists
- Create lists inside boards
- View lists per board

### ✅ Tasks
- Create tasks inside lists
- Delete tasks
- Inline task input
- Task activity logging

### 📡 Real-Time Updates
- Real-time activity updates via WebSockets
- Board-level socket rooms

### 📝 Activity Tracking
- Logs:
  - Task created
  - Task deleted
  - List created
- Activity panel updates instantly

### 🔎 Pagination
- Activity pagination support (page-based)

---

## 🏗 Architecture Overview

### 🖥 Frontend (React SPA)

frontend/
│
├── components/

│ ├── ListColumn.jsx
│ ├── TaskCard.jsx
│ └── ActivityPanel.jsx
│
├── pages/
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── Dashboard.jsx
│ └── BoardPage.jsx
│
├── features/ (Redux slices)
├── services/
│ ├── api.js
│ └── socket.js


### State Management
- Redux Toolkit for authentication & boards
- Local state for board-level updates

---

### 🧠 Backend (Node + Express)


backend/
│
├── prisma/
│   └── schema.prisma
│
├── controllers/
│   ├── auth.controller.js
│   ├── board.controller.js
│   ├── list.controller.js
│   ├── task.controller.js
│   └── activity.controller.js
│
├── routes/
│   ├── auth.routes.js
│   ├── board.routes.js
│   ├── list.routes.js
│   ├── task.routes.js
│   └── index.js
│
├── middleware/
│   └── auth.middleware.js
│
├── sockets/
│   └── index.js
│
├── utils/
│   └── prisma.js
│
├── .env
├── package.json
└── server.js


---

### 🗄 Database Schema (Prisma)

Core Models:

- User
- Board
- List
- Task
- Activity

### Relationships

User → Boards  
Board → Lists  
List → Tasks  
Board → Activity  

---


---

### 🔄 Real-Time Strategy

- Socket.IO used for live updates
- Users join board-specific rooms
- Backend emits events:
  - `activityCreated`
- Frontend listens and updates ActivityPanel instantly

---

## ⚙️ Setup Instructions

### Installation & Setup Guide
### 1️⃣ Clone the Repository
git clone <your-repo-url>
cd task-collab-platform

### 2️⃣ Backend Setup

### Navigate to backend folder:

cd backend


### Install dependencies:

npm install

### Create Environment Variables

Create a .env file inside the backend/ folder:

DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/task-collab"
JWT_SECRET="supersecret"


Replace YOUR_PASSWORD with your PostgreSQL password.

### Run Prisma Migration

Initialize database schema:

npx prisma migrate dev --name init


### Generate Prisma client:

npx prisma generate

### Start Backend Server
npm run dev


### Backend will run at:

http://localhost:5000

## 3️⃣ Frontend Setup

### Open a new terminal and navigate to frontend:

cd frontend


### Install dependencies:

npm install


### Start React app:

npm start


### Frontend will run at:

http://localhost:3000
