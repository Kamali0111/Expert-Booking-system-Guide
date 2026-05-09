import mongoose from 'mongoose';

const expertSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Web Development', 'Mobile Development', 'UI/UX Design', 'Data Science', 'Cloud Architecture', 'DevOps'],
    },
    experience: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4.5,
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    availableSlots: [
      {
        date: {
          type: String, // Format: YYYY-MM-DD
          required: true,
        },
        slots: [
          {
            time: {
              type: String, // Format: HH:MM
              required: true,
            },
            isBooked: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Expert = mongoose.model('Expert', expertSchema);

export default Expert;
