
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { bookingService } from "../services/api";

import {
  Header,
  Footer,
} from "../components/Layout";

import {
  SkeletonLoader,
  ErrorMessage,
  EmptyState,
} from "../components/Common";

export default function MyBookings() {
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(
    searchParams.get("email") || ""
  );

  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const fetchBookings = async () => {
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res =
        await bookingService.getBookingsByEmail(
          email
        );

      setBookings(res.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to fetch bookings"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10 min-h-screen">

        {/* HERO */}

        <section className="text-center mb-12">

          <h1
            className="
              text-5xl md:text-6xl
              font-extrabold
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              text-transparent
              bg-clip-text
            "
          >
            My Bookings
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            View and manage your expert sessions.
          </p>
        </section>

        {/* SEARCH */}

        <div
          className="
            bg-white/70
            backdrop-blur-xl
            border border-white/20
            rounded-3xl
            p-6
            shadow-xl
            mb-10
          "
        >
          <div className="
            flex flex-col md:flex-row
            gap-5
          ">

            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                flex-1
                rounded-2xl
                border-0
                bg-gray-100/80
                px-5 py-4
                focus:ring-2
                focus:ring-indigo-500
              "
            />

            <button
              onClick={fetchBookings}
              className="
                bg-gradient-to-r
                from-indigo-500
                to-purple-600
                text-white
                px-8 py-4
                rounded-2xl
                font-semibold
                shadow-lg
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Search
            </button>
          </div>
        </div>

        {/* CONTENT */}

        {loading ? (
          <SkeletonLoader count={4} />
        ) : error ? (
          <ErrorMessage
            message={error}
            onRetry={fetchBookings}
          />
        ) : bookings.length === 0 ? (
          <EmptyState
            title="No Bookings Found"
            description="Your bookings will appear here."
          />
        ) : (
          <div className="grid gap-8">

            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="
                  bg-white/70
                  backdrop-blur-xl
                  border border-white/20
                  rounded-3xl
                  p-8
                  shadow-xl
                  hover:shadow-glow
                  transition-all
                  duration-300
                "
              >
                <div
                  className="
                    flex flex-col lg:flex-row
                    justify-between
                    gap-8
                  "
                >

                  {/* LEFT */}

                  <div className="space-y-4">

                    <div>

                      <h2 className="
                        text-3xl font-bold
                        text-gray-800
                      ">
                        {booking.expertId?.name}
                      </h2>

                      <p className="
                        text-indigo-600 mt-1
                      ">
                        {booking.expertId?.category}
                      </p>
                    </div>

                    <div className="
                      grid sm:grid-cols-2
                      gap-4
                    ">

                      <div
                        className="
                          bg-gray-100/80
                          rounded-2xl
                          px-5 py-4
                        "
                      >
                        <p className="
                          text-sm text-gray-500
                        ">
                          Booking Date
                        </p>

                        <p className="
                          font-semibold mt-1
                        ">
                          {booking.date}
                        </p>
                      </div>

                      <div
                        className="
                          bg-gray-100/80
                          rounded-2xl
                          px-5 py-4
                        "
                      >
                        <p className="
                          text-sm text-gray-500
                        ">
                          Time Slot
                        </p>

                        <p className="
                          font-semibold mt-1
                        ">
                          {booking.timeSlot}
                        </p>
                      </div>
                    </div>

                    {booking.notes && (
                      <div
                        className="
                          bg-indigo-50
                          rounded-2xl
                          p-5
                        "
                      >
                        <p className="
                          text-sm text-gray-500
                          mb-2
                        ">
                          Notes
                        </p>

                        <p className="text-gray-700">
                          {booking.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* RIGHT */}

                  <div
                    className="
                      flex flex-col
                      items-start lg:items-end
                      justify-between
                      gap-6
                    "
                  >

                    <span
                      className={`
                        px-5 py-2
                        rounded-full
                        text-sm
                        font-semibold

                        ${
                          booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : booking.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      `}
                    >
                      {booking.status}
                    </span>

                    <div className="
                      text-gray-500 text-sm
                    ">
                      Booking ID:

                      <span className="
                        font-medium ml-2
                      ">
                        {booking._id.slice(-6)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
