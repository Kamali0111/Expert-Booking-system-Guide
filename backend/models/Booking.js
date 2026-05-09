import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expert',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String, // Format: YYYY-MM-DD
      required: true,
    },
    timeSlot: {
      type: String, // Format: HH:MM
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

// Create compound unique index to prevent double booking
bookingSchema.index(
  { expertId: 1, date: 1, timeSlot: 1 },
  {
    unique: true,
    sparse: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
