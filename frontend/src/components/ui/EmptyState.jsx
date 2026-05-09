import React from 'react';

export default function EmptyState({
  icon = '📭',
  title = 'Nothing here',
  description = '',
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
      <div className="text-6xl mb-4 drop-shadow-lg">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-center max-w-xs">{description}</p>
    </div>
  );
}
