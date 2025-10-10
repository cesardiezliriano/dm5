import React from 'react';
import { useTranslation } from 'react-i18next';

interface DetailedCreativeInputProps {
  id: string;
  labelKey: string;
  placeholderKey: string;
  subtextKey: string;
  value: string;
  onChange: (value: string) => void;
}

export const DetailedCreativeInput: React.FC<DetailedCreativeInputProps> = ({ id, labelKey, placeholderKey, subtextKey, value, onChange }) => {
  const { t } = useTranslation();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-open-sans font-semibold text-[var(--llyc-turquoise)] mb-1">
        {t(labelKey)}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        placeholder={t(placeholderKey)}
        className="w-full p-3 font-open-sans bg-[var(--llyc-input-bg)] border border-[var(--llyc-gray-3)] rounded-md shadow-sm focus:ring-2 focus:ring-[var(--llyc-red)] focus:border-[var(--llyc-red)] text-[var(--llyc-dark-blue)] placeholder-[var(--llyc-gray-2)]"
      />
       <p className="mt-1 text-xs text-[var(--llyc-gray-2)] font-open-sans">{t(subtextKey)}</p>
    </div>
  );
};
