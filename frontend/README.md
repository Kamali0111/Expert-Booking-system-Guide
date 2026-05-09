# Real-Time Expert Session Booking System

A modern, production-ready full-stack application for booking expert sessions in real time.

## Features
- Browse and search experts by name or category
- View expert details and real-time available slots
- Book sessions with instant slot updates (Socket.io)
- Prevents double booking
- View your bookings by email
- Responsive, clean, mobile-first UI (Tailwind CSS)
- Toast notifications, skeleton loaders, error/empty states

## Tech Stack
- **Frontend:** React.js (Vite), Tailwind CSS, Axios, React Router DOM, Socket.io Client
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), Socket.io

## Folder Structure

```
backend/
  controllers/
  routes/
  models/
  middleware/
  config/
  socket/
  server.js
frontend/src/
  pages/
  components/
  services/
  context/
  App.jsx
```

## Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/expert-booking
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## Installation & Running Locally

### 1. Backend
```
cd backend
npm install
cp .env.example .env
# (Edit .env if needed)
npm run dev
```

### 2. Seed Sample Data
```
node seed.js
```

### 3. Frontend
```
cd frontend
npm install
cp .env.example .env
# (Edit .env if needed)
npm run dev
```

## Deployment
- Set environment variables for production
- Use `npm run build` in frontend for static assets
- Use a process manager (e.g. PM2) for backend

## API Endpoints
- `GET /api/experts` (pagination, search, filter)
- `GET /api/experts/:id`
- `GET /api/experts/:id/slots`
- `POST /api/bookings`
- `PATCH /api/bookings/:id/status`
- `GET /api/bookings?email=`

## License
MIT
