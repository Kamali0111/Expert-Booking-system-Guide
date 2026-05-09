import React, { useState } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { bookingService, expertService } from '../services/api';
import { emitSlotBooked } from '../services/socket';
import { Header, Footer } from '../components/Layout';
import { InputField, TextArea, Button, LoadingSpinner, ErrorMessage } from '../components/Common';
import toast from 'react-hot-toast';

export default function Booking() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: searchParams.get('date') || '',
    timeSlot: searchParams.get('time') || '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [expert, setExpert] = useState(null);
  const [fetchingExpert, setFetchingExpert] = useState(true);
  const [fetchError, setFetchError] = useState('');

  React.useEffect(() => {
    async function fetchExpert() {
      setFetchingExpert(true);
      setFetchError('');
      try {
        const res = await expertService.getExpertById(id);
        setExpert(res.data.data);
      } catch (err) {
        setFetchError(err.response?.data?.message || 'Failed to load expert');
      } finally {
        setFetchingExpert(false);
      }
    }
    fetchExpert();
  }, [id]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    else if (!/^\d{10,15}$/.test(form.phone.replace(/\D/g, ''))) errs.phone = 'Invalid phone number';
    if (!form.date) errs.date = 'Date is required';
    if (!form.timeSlot) errs.timeSlot = 'Time slot is required';
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await bookingService.createBooking({
        ...form,
        expertId: id,
      });
      emitSlotBooked({ expertId: id, date: form.date, timeSlot: form.timeSlot });
      toast.success('Booking successful!');
      navigate(`/my-bookings?email=${encodeURIComponent(form.email)}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingExpert) return <LoadingSpinner />;
  if (fetchError) return <ErrorMessage message={fetchError} />;
  if (!expert) return null;

return (
  <>
    <Header />

    <main className="max-w-4xl mx-auto px-6 py-10 min-h-screen">

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
          Book Session
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Complete your booking with {expert.name}
        </p>
      </section>

      {/* FORM CARD */}

      <div
        className="
          bg-white/70
          backdrop-blur-xl
          border border-white/20
          rounded-3xl
          p-8
          shadow-xl
        "
      >

        {/* EXPERT INFO */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            {expert.name}
          </h2>

          <p className="text-indigo-600 mt-2">
            {expert.category}
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <InputField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Enter your name"
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Enter your email"
          />

          <InputField
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="Enter your phone number"
          />

          <div className="
            grid md:grid-cols-2
            gap-6
          ">

            <InputField
              label="Date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              error={errors.date}
            />

            <InputField
              label="Time Slot"
              name="timeSlot"
              value={form.timeSlot}
              onChange={handleChange}
              error={errors.timeSlot}
              placeholder="10:00 AM"
            />
          </div>

          <TextArea
            label="Additional Notes"
            name="notes"
            rows={4}
            value={form.notes}
            onChange={handleChange}
            placeholder="Any special requirements..."
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Confirm Booking
          </Button>

        </form>
      </div>
    </main>

    <Footer />
  </>
);

}
