import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HELP_TOPICS_LIST } from '../constants';
import { HelpTopic } from '../types';

interface HelpBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CloseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const BackIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-1">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>
);


export const HelpBotModal: React.FC<HelpBotModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [selectedTopic, setSelectedTopic] = useState<HelpTopic | null>(null);
  const [showTopicsListOnMobile, setShowTopicsListOnMobile] = useState(true);


  useEffect(() => {
    if (isOpen) {
      setSelectedTopic(null); // Reset selected topic when modal opens
      setShowTopicsListOnMobile(true); // Show topic list by default on mobile when modal opens
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleTopicSelect = (topic: HelpTopic) => {
    setSelectedTopic(topic);
    setShowTopicsListOnMobile(false); // Hide topic list on mobile when a topic is selected
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setShowTopicsListOnMobile(true);
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
    >
      <div 
        className="bg-[var(--llyc-white)] text-[var(--llyc-dark-blue)] rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-[var(--llyc-gray-3)]"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--llyc-gray-4)]">
          <h2 id="help-modal-title" className="text-2xl font-montserrat font-semibold text-[var(--llyc-turquoise)]">
            {t('helpBotModal.title')}
          </h2>
          <button
            onClick={onClose}
            className="text-[var(--llyc-gray-2)] hover:text-[var(--llyc-red)] transition-colors"
            aria-label={t('helpBotModal.closeButtonAriaLabel')}
          >
            <CloseIcon />
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
          {/* Topics List (Sidebar for Desktop, Full for Mobile initial view) */}
          <aside 
            className={`
              ${showTopicsListOnMobile ? 'block' : 'hidden md:block'} 
              md:w-1/3 w-full p-4 sm:p-6 border-r-0 md:border-r border-[var(--llyc-gray-4)] overflow-y-auto bg-slate-50
            `}
          >
            <h3 className="text-lg font-montserrat font-medium text-[var(--llyc-dark-blue)] mb-4">{t('helpBotModal.topicsListHeader')}</h3>
            <ul className="space-y-2">
              {HELP_TOPICS_LIST.map((topic) => (
                <li key={topic.id}>
                  <button
                    onClick={() => handleTopicSelect(topic)}
                    className={`w-full text-left px-3 py-2 rounded-md font-open-sans text-sm transition-colors duration-150 
                                ${selectedTopic?.id === topic.id ? 'bg-[var(--llyc-turquoise)] text-[var(--llyc-white)]' : 'text-[var(--llyc-gray-1)] hover:bg-slate-200 hover:text-[var(--llyc-dark-blue)]'}`}
                    aria-current={selectedTopic?.id === topic.id ? "page" : undefined}
                  >
                    {t(topic.questionKey)}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Selected Topic Content */}
          <main 
             className={`
              ${!showTopicsListOnMobile ? 'block' : 'hidden md:block'} 
              flex-grow md:w-2/3 w-full p-4 sm:p-6 overflow-y-auto 
            `}
          >
            {selectedTopic ? (
              <article>
                <button 
                  onClick={handleBackToTopics} 
                  className="md:hidden flex items-center text-sm text-[var(--llyc-turquoise)] hover:text-[var(--llyc-red)] mb-3 font-open-sans"
                >
                  <BackIcon/> {t('helpBotModal.backToTopics')}
                </button>
                <h3 className="text-xl font-montserrat font-semibold text-[var(--llyc-turquoise)] mb-3">{t(selectedTopic.questionKey)}</h3>
                <div 
                  className="prose prose-sm font-open-sans text-[var(--llyc-gray-1)] max-w-none 
                             prose-headings:text-[var(--llyc-dark-blue)] prose-headings:font-montserrat 
                             prose-strong:text-[var(--llyc-dark-blue)] 
                             prose-a:text-[var(--llyc-turquoise)] hover:prose-a:text-[var(--llyc-red)]
                             prose-ul:list-disc prose-ol:list-decimal prose-li:my-1"
                  dangerouslySetInnerHTML={{ __html: t(selectedTopic.answerKey) }} 
                />
              </article>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <p className="text-[var(--llyc-gray-2)] font-open-sans">{t('helpBotModal.noTopicSelected')}</p>
              </div>
            )}
             {!selectedTopic && <p className="mt-4 text-sm text-[var(--llyc-gray-2)] font-open-sans md:hidden text-center">{t('helpBotModal.introduction')}</p>}
          </main>
        </div>
      </div>
    </div>
  );
};