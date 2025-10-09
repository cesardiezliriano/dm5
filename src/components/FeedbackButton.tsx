import React from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_FEEDBACK_RECIPIENTS } from '../constants';

interface FeedbackButtonProps {
  recipients?: string;
}

const FeedbackIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const FeedbackButton: React.FC<FeedbackButtonProps> = ({ recipients }) => {
  const { t } = useTranslation();
  const mailRecipients = recipients || DEFAULT_FEEDBACK_RECIPIENTS;
  const appName = t('header.title');

  const handleFeedbackClick = () => {
    const subject = encodeURIComponent(t('feedbackButton.emailSubject', { appName }));
    const body = encodeURIComponent(t('feedbackButton.emailBodyPlaceholder', { appName }));
    window.location.href = `mailto:${mailRecipients}?subject=${subject}&body=${body}`;
  };

  return (
    <button
      onClick={handleFeedbackClick}
      title={t('feedbackButton.tooltip')}
      aria-label={t('feedbackButton.tooltip')}
      className="group relative flex items-center justify-center w-14 h-14 bg-[var(--llyc-red)] text-[var(--llyc-white)] rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--llyc-white)] focus:ring-[var(--llyc-red)] transition-all duration-150 ease-in-out"
    >
      <FeedbackIcon />
      <span
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-[var(--llyc-dark-blue)] text-[var(--llyc-white)] text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        role="tooltip"
      >
        {t('feedbackButton.tooltip')}
      </span>
    </button>
  );
};