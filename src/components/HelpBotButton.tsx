import React from 'react';
import { useTranslation } from 'react-i18next';

interface HelpBotButtonProps {
  onClick: () => void;
}

const HelpIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
  </svg>
);

export const HelpBotButton: React.FC<HelpBotButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      title={t('helpBotButton.tooltip')}
      aria-label={t('helpBotButton.tooltip')}
      className="group relative flex items-center justify-center w-14 h-14 bg-[var(--llyc-turquoise)] text-[var(--llyc-white)] rounded-full shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--llyc-dark-blue)] focus:ring-[var(--llyc-turquoise)] transition-all duration-150 ease-in-out"
    >
      <HelpIcon />
       <span
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-[var(--llyc-gray-1)] text-[var(--llyc-white)] text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        role="tooltip"
      >
        {t('helpBotButton.tooltip')}
      </span>
    </button>
  );
};