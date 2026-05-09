import React, { useState } from 'react';
import { bookingService } from '../services/api';
import { Header, Footer } from '../components/Layout';
import { LoadingSpinner, ErrorMessage, EmptyState, InputField, Button } from '../components/Common';

const STATUS_VARIANTS = {
  Pending: 'warning',
  Confirmed: 'success',
  Completed: 'primary',
};

export default function MyBookings() {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSearched(true);
    try {
      const res = await bookingService.getBookings(email);
      setBookings(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

return (
  <>
    <Header />

    <main className="max-w-5xl mx-auto px-6 py-12 min-h-screen">

      {/* PAGE TITLE */}
      <div className="text-center mb-12">

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
          Book Your Session
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Schedule a real-time expert consultation instantly.
        </p>
      </div>

      {/* BOOKING CARD */}
      <div
        className="
          bg-white/70
          backdrop-blur-xl
          border border-white/20
          rounded-3xl
          shadow-2xl
          p-8 md:p-12
        "
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="
                  w-full
                  rounded-2xl
                  border-0
                  bg-gray-100/80
                  px-5 py-4
                  focus:ring-2
                  focus:ring-indigo-500
                  transition-all
                "
                required
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="
                  w-full
                  rounded-2xl
                  border-0
                  bg-gray-100/80
                  px-5 py-4
                  focus:ring-2
                  focus:ring-indigo-500
                "
                required
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="
                  w-full
                  rounded-2xl
                  border-0
                  bg-gray-100/80
                  px-5 py-4
                  focus:ring-2
                  focus:ring-indigo-500
                "
                required
              />
            </div>

            {/* DATE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border-0
                  bg-gray-100/80
                  px-5 py-4
                  focus:ring-2
                  focus:ring-indigo-500
                "
                required
              />
            </div>

          </div>

          {/* SLOT */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Select Time Slot
            </label>

            <div className="flex flex-wrap gap-4">

              {slots.map((slot, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setForm({ ...form, timeSlot: slot })
                  }
                  className={`
                    px-5 py-3
                    rounded-2xl
                    font-medium
                    transition-all
                    duration-300
                    ${
                      form.timeSlot === slot
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 hover:bg-indigo-100"
                    }
                  `}
                >
                  {slot}
                </button>
              ))}

            </div>
          </div>

          {/* NOTES */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes
            </label>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="5"
              placeholder="Add additional notes..."
              className="
                w-full
                rounded-2xl
                border-0
                bg-gray-100/80
                px-5 py-4
                focus:ring-2
                focus:ring-indigo-500
              "
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-gradient-to-r
              from-indigo-500
              via-purple-600
              to-cyan-500
              text-white
              py-5
              rounded-2xl
              text-lg
              font-bold
              shadow-xl
              hover:scale-[1.02]
              transition-all
              duration-300
              disabled:opacity-50
            "
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>

        </form>
      </div>
    </main>

    <Footer />
  </>
);
}
