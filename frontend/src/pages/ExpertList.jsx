import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { expertService } from "../services/api";

import {
  Pagination,
  Header,
  Footer,
} from "../components/Layout";

import {
  SkeletonLoader,
  ErrorMessage,
  EmptyState,
} from "../components/Common";

const CATEGORIES = [
  "",
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Data Science",
  "Cloud Architecture",
  "DevOps",
];

export default function ExpertList() {
  const navigate = useNavigate();

  const [experts, setExperts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  // SEARCH DEBOUNCE
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  // FETCH EXPERTS
  const fetchExperts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await expertService.getExperts(
        page,
        8,
        debouncedSearch,
        category
      );

      setExperts(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load experts"
      );
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, category]);

  useEffect(() => {
    fetchExperts();
  }, [fetchExperts]);

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10 min-h-screen">

        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <h1
            className="
              text-5xl md:text-7xl
              font-extrabold
              bg-gradient-to-r
              from-indigo-600
              via-purple-600
              to-cyan-500
              text-transparent
              bg-clip-text
              leading-tight
            "
          >
            Book Expert Sessions
          </h1>

          <p className="
            mt-6
            text-gray-600
            text-lg md:text-xl
            max-w-2xl
            mx-auto
          ">
            Connect instantly with industry experts,
            mentors, and professionals in real-time.
          </p>
        </motion.section>

        {/* SEARCH */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="
            bg-white/70
            backdrop-blur-xl
            border border-white/20
            shadow-xl
            rounded-3xl
            p-6
            mb-12
          "
        >
          <div className="
            flex flex-col
            md:flex-row
            gap-5
          ">

            {/* SEARCH INPUT */}
            <div className="flex-1">

              <label className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              ">
                Search Experts
              </label>

              <input
                type="text"
                placeholder="Search experts..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
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
              />
            </div>

            {/* CATEGORY */}
            <div className="md:w-72">

              <label className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              ">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="
                  w-full
                  rounded-2xl
                  border-0
                  bg-gray-100/80
                  px-5 py-4
                  focus:ring-2
                  focus:ring-indigo-500
                "
              >
                {CATEGORIES.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                  >
                    {cat || "All Categories"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* CONTENT */}
        {loading ? (
          <SkeletonLoader count={4} />
        ) : error ? (
          <ErrorMessage
            message={error}
            onRetry={fetchExperts}
          />
        ) : experts.length === 0 ? (
          <EmptyState
            title="No experts found"
            description="Try adjusting your filters."
          />
        ) : (
          <>
            {/* GRID */}
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-8
              "
            >
              {experts.map((expert, index) => (
                <motion.div
                  key={expert._id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="
                    bg-white/70
                    backdrop-blur-xl
                    border border-white/20
                    rounded-3xl
                    p-6
                    shadow-xl
                    hover:shadow-glow
                    transition-all
                    duration-300
                  "
                >
                  <div className="
                    flex flex-col
                    items-center
                    text-center
                  ">

                    {/* AVATAR */}
                    <img
                      src={`https://ui-avatars.com/api/?name=${expert.name}&background=6366f1&color=fff`}
                      alt={expert.name}
                      className="
                        w-24 h-24
                        rounded-full
                        shadow-xl
                        mb-5
                      "
                    />

                    {/* NAME */}
                    <h2 className="
                      text-2xl
                      font-bold
                      text-gray-800
                    ">
                      {expert.name}
                    </h2>

                    {/* CATEGORY */}
                    <p className="
                      text-indigo-600
                      font-medium
                      mt-1
                    ">
                      {expert.category}
                    </p>

                    {/* TAGS */}
                    <div className="
                      mt-4
                      flex gap-2
                      flex-wrap
                      justify-center
                    ">

                      <span
                        className="
                          bg-indigo-100
                          text-indigo-700
                          px-3 py-1
                          rounded-full
                          text-sm
                          font-medium
                        "
                      >
                        ⭐ {expert.rating}
                      </span>

                      <span
                        className="
                          bg-cyan-100
                          text-cyan-700
                          px-3 py-1
                          rounded-full
                          text-sm
                          font-medium
                        "
                      >
                        {expert.experience} Years
                      </span>

                    </div>

                    {/* BUTTON */}
                    <button
                      onClick={() =>
                        navigate(
                          `/expert/${expert._id}`
                        )
                      }
                      className="
                        mt-6
                        w-full
                        bg-gradient-to-r
                        from-indigo-500
                        to-purple-600
                        text-white
                        py-3
                        rounded-2xl
                        font-semibold
                        shadow-lg
                        hover:scale-105
                        transition-all
                        duration-300
                      "
                    >
                      Book Session
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="mt-14">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

