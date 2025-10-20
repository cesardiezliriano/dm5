
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HistoryItem } from '../../types';
import { AD_SPECS_DATA } from '../../constants';

interface HistoryListProps {
  history: HistoryItem[];
  onUseHistoryItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

const ReloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.18-3.185m-3.181 9.348a8.25 8.25 0 00-11.664 0l-3.18 3.185m3.181-9.348L2.985 19.644" />
    </svg>
);


const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.134H8.09a2.09 2.09 0 00-2.09 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

export const HistoryList: React.FC<HistoryListProps> = ({ history, onUseHistoryItem, onClearHistory }) => {
  const { t } = useTranslation();

  const handleClearClick = () => {
    if (window.confirm(t('history.clearConfirm'))) {
      onClearHistory();
    }
  };

  const getFormatName = (formatId: string) => {
    const format = AD_SPECS_DATA.find(f => f.id === formatId);
    return format ? t(format.formatNameKey) : formatId;
  };

  if (!history || history.length === 0) {
    return (
       <div className="mt-8 text-center p-6 bg-slate-50 rounded-lg border border-slate-200">
          <h3 className="text-lg font-montserrat font-semibold text-[var(--llyc-dark-blue)]">{t('history.title')}</h3>
          <p className="text-sm text-[var(--llyc-gray-2)] mt-2">{t('history.empty')}</p>
      </div>
    );
  }

  return (
    <section className="my-8 pt-6 border-t border-[var(--llyc-gray-4)]" aria-labelledby="history-heading">
      <div className="flex justify-between items-center mb-4">
        <h3 id="history-heading" className="text-xl font-montserrat font-semibold text-[var(--llyc-dark-blue)]">
          {t('history.title')}
        </h3>
        <button
          onClick={handleClearClick}
          className="flex items-center text-sm font-open-sans text-[var(--llyc-gray-2)] hover:text-[var(--llyc-red)] transition-colors duration-150"
        >
          <TrashIcon />
          {t('history.clearButton')}
        </button>
      </div>
      <ul className="space-y-3">
        {history.map(item => (
          <li key={item.id} className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center transition-shadow hover:shadow-md">
            <div className="flex-grow mb-3 sm:mb-0">
              <p className="font-semibold font-open-sans text-[var(--llyc-dark-blue)]">
                {item.platform} - <span className="font-normal">{getFormatName(item.formatId)}</span>
              </p>
              <p className="text-sm text-[var(--llyc-gray-1)] italic mt-1 truncate">
                "{item.creativeIdea}"
              </p>
            </div>
            <button
              onClick={() => onUseHistoryItem(item)}
              className="flex-shrink-0 flex items-center justify-center px-4 py-2 bg-[var(--llyc-turquoise)] hover:bg-teal-600 text-[var(--llyc-white)] font-montserrat text-sm font-semibold rounded-md shadow-sm transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`${t('history.useButton')} for ${item.creativeIdea}`}
            >
             <ReloadIcon/>
              {t('history.useButton')}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
