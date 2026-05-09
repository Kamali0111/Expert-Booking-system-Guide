import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AppProvider } from "./context/AppContext";

import ExpertList from "./pages/ExpertList";
import ExpertDetail from "./pages/ExpertDetail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";

import "./index.css";

export default function App() {
  return (
    <AppProvider>

      {/* TOAST */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "16px",
            background: "#111827",
            color: "#fff",
          },
        }}
      />

      {/* BACKGROUND BLOBS */}

      <div
        className="
          fixed top-0 left-0
          w-[500px] h-[500px]
          bg-indigo-300/30
          rounded-full
          blur-3xl
          z-[-1]
          -translate-x-1/2
          -translate-y-1/2
        "
      />

      <div
        className="
          fixed bottom-0 right-0
          w-[500px] h-[500px]
          bg-purple-300/30
          rounded-full
          blur-3xl
          z-[-1]
          translate-x-1/3
          translate-y-1/3
        "
      />

      <div
        className="
          fixed top-1/2 left-1/2
          w-[400px] h-[400px]
          bg-cyan-200/20
          rounded-full
          blur-3xl
          z-[-1]
          -translate-x-1/2
          -translate-y-1/2
        "
      />

      {/* ROUTES */}

      <Routes>
        <Route
          path="/"
          element={<ExpertList />}
        />

        <Route
          path="/expert/:id"
          element={<ExpertDetail />}
        />

        <Route
          path="/book/:id"
          element={<Booking />}
        />

        <Route
          path="/my-bookings"
          element={<MyBookings />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </AppProvider>
  );
}

