import React from 'react';

export default function Badge({ label, color = 'primary', className = '' }) {
  const colorMap = {
    primary: 'bg-gradient-primary text-white',
    accent: 'bg-gradient-accent text-white',
    yellow: 'bg-yellow-100 text-yellow-700',
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700',
    gray: 'bg-gray-100 text-gray-700',
  };
  return (
    <span
      className={`inline-block px-3 py-1 rounded-2xl text-xs font-semibold shadow-soft ${colorMap[color] || colorMap.primary} ${className}`}
    >
      {label}
    </span>
  );
}
