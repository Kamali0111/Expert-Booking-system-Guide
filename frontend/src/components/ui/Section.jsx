import React from 'react';

export default function Section({ children, className = '' }) {
  return (
    <section className={`w-full max-w-7xl mx-auto px-4 ${className}`}>{children}</section>
  );
}
