import React from 'react';
import { useTranslation } from 'react-i18next';

interface AssetGeneratorProps {
  onGenerate: () => void;
  disabled: boolean;
}

export const AssetGenerator: React.FC<AssetGeneratorProps> = ({ onGenerate, disabled }) => {
  const { t } = useTranslation();
  return (
    <div className="my-8 text-center">
      <button
        onClick={onGenerate}
        disabled={disabled}
        className="px-8 py-4 bg-[var(--llyc-red)] hover:bg-red-700 text-[var(--llyc-white)] font-montserrat font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--llyc-dark-blue)] focus:ring-[var(--llyc-red)] transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
      >
        {t('assetGenerator.buttonText')}
      </button>
    </div>
  );
};