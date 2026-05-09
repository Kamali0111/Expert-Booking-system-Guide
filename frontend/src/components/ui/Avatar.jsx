import React from 'react';

export default function Avatar({ src, alt, size = 56, className = '' }) {
  return src ? (
    <img
      src={src}
      alt={alt}
      className={`object-cover rounded-full border-4 border-white shadow-soft ${className}`}
      style={{ width: size, height: size }}
    />
  ) : (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-primary text-white font-bold shadow-soft ${className}`}
      style={{ width: size, height: size, fontSize: size / 2.2 }}
    >
      {alt?.[0] || '?'}
    </div>
  );
}
