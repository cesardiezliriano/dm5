import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormattedValidationResult } from '../types';

interface ValidationResultsProps {
  results: FormattedValidationResult[];
}

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const CrossIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);


export const ValidationResults: React.FC<ValidationResultsProps> = ({ results }) => {
  const { t } = useTranslation();

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <section className="bg-[var(--llyc-white)] p-6 rounded-xl shadow-md my-8 border border-[var(--llyc-gray-4)] space-y-8">
      <h2 className="text-2xl font-montserrat font-semibold text-[var(--llyc-turquoise)] border-b-2 border-[var(--llyc-turquoise)] pb-2 m-0">
        {t('validator.results.title')}
      </h2>

      {results.map(({ formatNameKey, result }) => (
        <div key={formatNameKey}>
            <h3 className="text-lg font-montserrat font-semibold text-[var(--llyc-dark-blue)] mb-3">
                {t(formatNameKey)}
            </h3>
            <div className={`flex items-center p-3 rounded-lg mb-4 ${result.overallCompliant ? 'bg-green-100' : 'bg-red-100'}`}>
                {result.overallCompliant ? <CheckIcon /> : <CrossIcon />}
                <span className={`ml-3 font-semibold font-montserrat text-sm ${result.overallCompliant ? 'text-green-800' : 'text-red-800'}`}>
                    {t('validator.results.overallStatus')}: {result.overallCompliant ? t('validator.results.compliant') : t('validator.results.nonCompliant')}
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left font-open-sans">
                    <thead className="bg-slate-50 text-[var(--llyc-gray-2)] uppercase text-xs">
                        <tr>
                            <th scope="col" className="px-4 py-2 rounded-l-md">{t('validator.results.table.spec')}</th>
                            <th scope="col" className="px-4 py-2">{t('validator.results.table.expected')}</th>
                            <th scope="col" className="px-4 py-2">{t('validator.results.table.actual')}</th>
                            <th scope="col" className="px-4 py-2 rounded-r-md">{t('validator.results.table.status')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.results.length > 0 ? (
                            result.results.map(item => (
                                <tr key={item.key} className="border-b border-[var(--llyc-gray-4)] last:border-0">
                                    <td className="px-4 py-3 font-semibold text-[var(--llyc-dark-blue)]">{item.specName}</td>
                                    <td className="px-4 py-3 text-[var(--llyc-gray-1)]">{item.expected}</td>
                                    <td className="px-4 py-3 text-[var(--llyc-gray-1)]">{item.actual}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.compliant ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {item.compliant ? t('validator.results.status.ok') : t('validator.results.status.fail')}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                             <tr>
                                <td colSpan={4} className="px-4 py-3 text-center text-[var(--llyc-gray-2)]">{t('validator.spec.noSpec')}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      ))}
    </section>
  );
};