import React from 'react';

export default function StatusDot({ status }) {
  const color =
    status === 'Pending'
      ? 'bg-yellow-400'
      : status === 'Confirmed'
      ? 'bg-green-500'
      : status === 'Completed'
      ? 'bg-blue-500'
      : 'bg-gray-300';
  return <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${color}`} />;
}
