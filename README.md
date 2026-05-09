```md id="readme"
# Expert Booking System

A real-time expert booking platform built with:

- React + Vite
- Tailwind CSS
- Node.js + Express
- MongoDB
- Socket.io

## Features

- Expert listing with search/filter/pagination
- Real-time slot updates
- Prevent double booking
- Booking management
- Premium SaaS UI
- Responsive design

## Installation

### Backend

cd backend
npm install
npm run dev

### Frontend

cd frontend
npm install
npm run dev

## Environment Variables

### Backend (.env)

PORT=5001
MONGO_URI=your_mongodb_uri
CLIENT_URL=http://localhost:5173

### Frontend (.env)

VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001

## Real-Time Features

Uses Socket.io for:
- live slot updates
- booking synchronization

## Author

Katta Kamali
```
