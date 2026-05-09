import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Expert APIs
export const expertService = {
  getExperts: (page = 1, limit = 10, search = '', category = '') =>
    api.get('/experts', {
      params: { page, limit, search, category },
    }),

  getExpertById: (id) =>
    api.get(`/experts/${id}`),

  getAvailableSlots: (id) =>
    api.get(`/experts/${id}/slots`),
};

// Booking APIs
export const bookingService = {
  createBooking: (bookingData) =>
    api.post('/bookings', bookingData),

  getBookings: (email, page = 1, limit = 10) =>
    api.get('/bookings', {
      params: { email, page, limit },
    }),

  getBookingById: (id) =>
    api.get(`/bookings/${id}`),

  updateBookingStatus: (id, status) =>
    api.patch(`/bookings/${id}/status`, { status }),
};

export default api;
