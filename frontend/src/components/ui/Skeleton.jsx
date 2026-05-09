import React from 'react';

export default function Skeleton({ className = '', rounded = '2xl', style = {} }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 ${
        rounded ? `rounded-${rounded}` : ''
      } ${className}`}
      style={style}
    />
  );
}
