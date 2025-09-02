import React from 'react';
import { useTranslation } from 'react-i18next';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  const { t } = useTranslation();
  const loadingMessage = message || t('loadingSpinner.message');
  return (
    <div className="flex flex-col items-center justify-center my-8 p-4">
      <div className="w-16 h-16 border-4 border-t-[var(--llyc-red)] border-r-[var(--llyc-red)] border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-[var(--llyc-red)] text-lg font-open-sans">{loadingMessage}</p>
    </div>
  );
};