import React from 'react';
import { useTranslation } from 'react-i18next';

interface CreativeInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const CreativeInput: React.FC<CreativeInputProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  return (
    <div>
      <label htmlFor="creative-idea" className="block text-sm font-open-sans font-semibold text-[var(--llyc-turquoise)] mb-1">
        {t('creativeInput.label')}
      </label>
      <textarea
        id="creative-idea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder={t('creativeInput.placeholder')}
        className="w-full p-3 font-open-sans bg-[var(--llyc-input-bg)] border border-[var(--llyc-gray-3)] rounded-md shadow-sm focus:ring-2 focus:ring-[var(--llyc-red)] focus:border-[var(--llyc-red)] text-[var(--llyc-white)] placeholder-[var(--llyc-gray-2)]"
      />
       <p className="mt-1 text-xs text-[var(--llyc-gray-2)] font-open-sans">{t('creativeInput.subtext')}</p>
    </div>
  );
};