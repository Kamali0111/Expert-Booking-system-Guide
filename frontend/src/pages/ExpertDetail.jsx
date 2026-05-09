import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { expertService } from '../services/api';
import {
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  SkeletonLoader,
} from '../components/Common';
import { Header, Footer } from '../components/Layout';
import { joinExpertDetail, leaveExpertDetail, onSlotUpdated, offSlotUpdated } from '../services/socket';

export default function ExpertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchExpert = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await expertService.getExpertById(id);
      setExpert(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load expert');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchSlots = useCallback(async () => {
    try {
      const res = await expertService.getAvailableSlots(id);
      setSlots(res.data.data);
    } catch {
      setSlots([]);
    }
  }, [id]);

  useEffect(() => {
    fetchExpert();
    fetchSlots();
    joinExpertDetail(id);
    onSlotUpdated(handleSlotUpdate);
    return () => {
      leaveExpertDetail(id);
      offSlotUpdated(handleSlotUpdate);
    };
    // eslint-disable-next-line
  }, [id]);

  const handleSlotUpdate = useCallback((data) => {
    if (data.expertId === id) {
      fetchSlots();
    }
  }, [id, fetchSlots]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchExpert} />;
  if (!expert) return <EmptyState title="Expert not found" description="This expert does not exist." />;

return (
  <>
    <Header />

    <main className="max-w-7xl mx-auto px-6 py-10 min-h-screen">

      {loading ? (
        <SkeletonLoader count={1} />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : expert ? (
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            {/* PROFILE CARD */}
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
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

                <img
                  src={`https://ui-avatars.com/api/?name=${expert.name}&background=6366f1&color=fff&size=200`}
                  alt={expert.name}
                  className="
                    w-40 h-40
                    rounded-full
                    shadow-2xl
                  "
                />

                <div className="flex-1">

                  <h1
                    className="
                      text-5xl
                      font-extrabold
                      bg-gradient-to-r
                      from-indigo-600
                      to-purple-600
                      text-transparent
                      bg-clip-text
                    "
                  >
                    {expert.name}
                  </h1>

                  <p className="text-xl text-indigo-600 mt-3">
                    {expert.category}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">

                    <span className="
                      bg-indigo-100
                      text-indigo-700
                      px-4 py-2
                      rounded-full
                      font-medium
                    ">
                      ⭐ {expert.rating} Rating
                    </span>

                    <span className="
                      bg-cyan-100
                      text-cyan-700
                      px-4 py-2
                      rounded-full
                      font-medium
                    ">
                      {expert.experience} Years Experience
                    </span>

                  </div>

                  <p className="mt-6 text-gray-600 leading-relaxed">
                    {expert.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* ABOUT */}
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
              <h2 className="text-3xl font-bold mb-4">
                About Expert
              </h2>

              <p className="text-gray-600 leading-8">
                {expert.bio}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* BOOKING PANEL */}
            <div
              className="
                sticky top-24
                bg-white/70
                backdrop-blur-xl
                border border-white/20
                rounded-3xl
                p-8
                shadow-xl
              "
            >
              <h2 className="text-3xl font-bold mb-6">
                Available Slots
              </h2>

              <div className="space-y-6">

                {expert.slots?.map((slotGroup, idx) => (
                  <div key={idx}>

                    <h3 className="
                      text-lg
                      font-semibold
                      text-gray-700
                      mb-3
                    ">
                      {slotGroup.date}
                    </h3>

                    <div className="flex flex-wrap gap-3">

                      {slotGroup.slots.map((slot, i) => (
  <button
    key={i}
    onClick={() =>
      navigate(
        `/book/${expert._id}?date=${slotGroup.date}&time=${slot.time}`
      )
    }
    disabled={slot.isBooked}
    className={`
      px-4 py-3
      rounded-2xl
      font-medium
      transition-all
      duration-300
      shadow-lg

      ${
        slot.isBooked
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105"
      }
    `}
  >
    {slot.time}
  </button>
))}

                    </div>
                  </div>
                ))}

              </div>

              <button
                  onClick={() => navigate(`/book/${expert._id}`)}
                className="
                  mt-8
                  w-full
                  bg-gradient-to-r
                  from-cyan-500
                  to-indigo-600
                  text-white
                  py-4
                  rounded-2xl
                  text-lg
                  font-bold
                  shadow-xl
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                Book Session
              </button>
            </div>

          </div>
        </div>
      ) : null}
    </main>

    <Footer />
  </>
);
}
