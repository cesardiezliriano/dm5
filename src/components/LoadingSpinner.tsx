import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  // A fallback component cannot use the useTranslation hook, as it would cause an infinite suspense loop.
  // We use the message prop or a hardcoded string instead.
  const loadingMessage = message || 'Loading...';
  return (
    <div className="flex flex-col items-center justify-center my-8 p-4">
      <div className="w-16 h-16 border-4 border-t-[var(--llyc-red)] border-r-[var(--llyc-red)] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-[var(--llyc-red)] text-lg font-open-sans">{loadingMessage}</p>
    </div>
  );
};