import React from 'react';

export default function Input({
  label,
  floating = false,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="relative mb-6">
      {floating ? (
        <>
          <input
            className={`peer block w-full rounded-2xl border-0 bg-glass px-4 py-3 text-gray-900 placeholder-transparent shadow-soft ring-1 ring-inset ring-primary/20 focus:ring-2 focus:ring-primary/60 focus:bg-white/80 transition ${
              error ? 'ring-red-400' : ''
            } ${className}`}
            placeholder={label}
            {...props}
          />
          <label
            className="pointer-events-none absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary bg-transparent px-1"
          >
            {label}
          </label>
        </>
      ) : (
        <>
          {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
          <input
            className={`block w-full rounded-2xl border-0 bg-glass px-4 py-3 text-gray-900 shadow-soft ring-1 ring-inset ring-primary/20 focus:ring-2 focus:ring-primary/60 focus:bg-white/80 transition ${
              error ? 'ring-red-400' : ''
            } ${className}`}
            {...props}
          />
        </>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
