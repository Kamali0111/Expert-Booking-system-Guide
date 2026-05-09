import React from 'react';

export default function Card({ children, className = '', glass = false }) {
  return (
    <div
      className={`rounded-3xl shadow-glass ${glass ? 'bg-glass backdrop-blur-md border border-white/30' : 'bg-white'} ${className}`}
    >
      {children}
    </div>
  );
}
