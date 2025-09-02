import React from 'react';
import { useTranslation } from 'react-i18next';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { t } = useTranslation();
  if (!message) return null;
  return (
    <div className="bg-[var(--llyc-red)] border border-red-900/50 text-[var(--llyc-white)] px-4 py-3 rounded-lg relative my-6 shadow-lg" role="alert">
      <strong className="font-bold font-montserrat">{t('errorMessage.prefix')}</strong>
      <p className="block sm:inline ml-1 font-open-sans">{message}</p>
    </div>
  );
};