
import React from "react";
import { Link, useLocation } from "react-router-dom";

/* ================= HEADER ================= */

export function Header() {
  const location = useLocation();

  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-xl
        bg-white/70
        border-b border-white/20
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          px-6 py-4
          flex justify-between items-center
        "
      >
        {/* LOGO */}

        <Link to="/">
          <h1
            className="
              text-3xl font-extrabold
              bg-gradient-to-r
              from-indigo-500
              to-purple-600
              text-transparent
              bg-clip-text
            "
          >
            ExpertBook
          </h1>
        </Link>

        {/* NAV */}

        <nav className="flex items-center gap-6">

          <Link
            to="/"
            className={`
              font-medium transition-all

              ${
                location.pathname === "/"
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }
            `}
          >
            Experts
          </Link>

          <Link
            to="/my-bookings"
            className={`
              font-medium transition-all

              ${
                location.pathname === "/my-bookings"
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }
            `}
          >
            My Bookings
          </Link>

          <Link
            to="/"
            className="
              hidden md:flex
              bg-gradient-to-r
              from-indigo-500
              to-purple-600
              text-white
              px-5 py-2.5
              rounded-2xl
              shadow-lg
              hover:scale-105
              transition-all
              duration-300
            "
          >
            Find Experts
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* ================= FOOTER ================= */

export function Footer() {
  return (
    <footer
      className="
        mt-20
        border-t border-white/20
        bg-white/50
        backdrop-blur-xl
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          px-6 py-8
          flex flex-col md:flex-row
          justify-between
          items-center
          gap-4
        "
      >
        <h2
          className="
            text-2xl font-bold
            bg-gradient-to-r
            from-indigo-500
            to-purple-600
            text-transparent
            bg-clip-text
          "
        >
          ExpertBook
        </h2>

        <p className="text-gray-500 text-sm text-center">
          © 2026 ExpertBook — Real-Time Expert Booking Platform
        </p>
      </div>
    </footer>
  );
}

/* ================= PAGINATION ================= */

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center flex-wrap gap-3">

      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            w-12 h-12
            rounded-full
            font-semibold
            shadow-md
            transition-all
            duration-300

            ${
              currentPage === page
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white scale-110"
                : "bg-white/70 backdrop-blur-xl hover:bg-indigo-100"
            }
          `}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

