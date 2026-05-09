
import React from "react";
import { motion } from "framer-motion";

/* BUTTON */

export function Button({
  children,
  className = "",
  loading = false,
  ...props
}) {
  return (
    <button
      className={`
        bg-gradient-to-r
        from-indigo-500
        to-purple-600
        text-white
        px-6 py-3
        rounded-2xl
        font-semibold
        shadow-lg
        hover:scale-105
        transition-all
        duration-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      disabled={loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

/* INPUT */

export function InputField({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="mb-5">

      {label && (
        <label
          className="
            block
            text-sm
            font-semibold
            text-gray-700
            mb-2
          "
        >
          {label}
        </label>
      )}

      <input
        className={`
          w-full
          rounded-2xl
          border-0
          bg-gray-100/80
          px-5 py-4
          focus:ring-2
          focus:ring-indigo-500
          transition-all
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="
          text-red-500
          text-sm
          mt-2
        ">
          {error}
        </p>
      )}
    </div>
  );
}

/* TEXTAREA */

export function TextArea({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="mb-5">

      {label && (
        <label
          className="
            block
            text-sm
            font-semibold
            text-gray-700
            mb-2
          "
        >
          {label}
        </label>
      )}

      <textarea
        className={`
          w-full
          rounded-2xl
          border-0
          bg-gray-100/80
          px-5 py-4
          focus:ring-2
          focus:ring-indigo-500
          transition-all
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="
          text-red-500
          text-sm
          mt-2
        ">
          {error}
        </p>
      )}
    </div>
  );
}

/* LOADING */

export function LoadingSpinner() {
  return (
    <div className="
      flex justify-center
      items-center
      py-20
    ">
      <div
        className="
          w-14 h-14
          border-4
          border-indigo-200
          border-t-indigo-600
          rounded-full
          animate-spin
        "
      />
    </div>
  );
}

/* SKELETON */

export function SkeletonLoader({
  count = 4,
}) {
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-8
      "
    >
      {Array.from({ length: count }).map(
        (_, index) => (
          <div
            key={index}
            className="
              animate-pulse
              bg-white/60
              backdrop-blur-xl
              rounded-3xl
              h-72
              shadow-xl
            "
          />
        )
      )}
    </div>
  );
}

/* ERROR */

export function ErrorMessage({
  message,
  onRetry,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        bg-red-50
        border border-red-200
        text-red-600
        rounded-3xl
        p-8
        text-center
        shadow-lg
      "
    >
      <div className="text-5xl mb-4">
        ⚠️
      </div>

      <h2 className="
        text-2xl
        font-bold
        mb-3
      ">
        Something went wrong
      </h2>

      <p>{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="
            mt-6
            bg-red-500
            text-white
            px-6 py-3
            rounded-2xl
            font-semibold
          "
        >
          Retry
        </button>
      )}
    </motion.div>
  );
}

/* EMPTY STATE */

export function EmptyState({
  title,
  description,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        text-center
        py-20
      "
    >
      <div className="text-7xl mb-6">
        📭
      </div>

      <h2 className="
        text-3xl
        font-bold
        text-gray-800
      ">
        {title}
      </h2>

      <p className="
        text-gray-500
        mt-4
        text-lg
      ">
        {description}
      </p>
    </motion.div>
  );
}
