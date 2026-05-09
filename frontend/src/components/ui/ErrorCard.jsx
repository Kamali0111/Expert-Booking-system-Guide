import React from 'react';
import Card from './Card';

export default function ErrorCard({ message, onRetry }) {
  return (
    <Card glass className="p-8 flex flex-col items-center text-center border border-red-200">
      <div className="text-4xl mb-2">❌</div>
      <div className="text-lg font-semibold text-red-700 mb-2">{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-5 py-2 rounded-2xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Retry
        </button>
      )}
    </Card>
  );
}
