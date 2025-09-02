import React from 'react';
import { useTranslation } from 'react-i18next';
import { CreativeAsset, Platform, PlatformTranslationKeys } from '../types';

interface AssetDisplayProps {
  asset: CreativeAsset;
  platform: Platform;
  formatNameKey: string;
}

export const AssetDisplay: React.FC<AssetDisplayProps> = ({ asset, platform, formatNameKey }) => {
  const { t } = useTranslation();

  const translatedPlatform = t(PlatformTranslationKeys[platform]);
  const translatedFormatName = t(formatNameKey);
  // Construct a more dynamic description or use the one from asset if already translated/set by geminiService
  const displayDescription = asset.assetFormatDescription || `${translatedPlatform} - ${translatedFormatName}`;


  return (
    <section className="bg-[var(--llyc-card-bg)] p-6 rounded-xl shadow-xl mt-8 transition-all duration-300 hover:shadow-[var(--llyc-red)]/30 border border-[var(--llyc-gray-3)]/20">
      <h2 className="text-2xl font-montserrat font-semibold mb-4 text-[var(--llyc-red)] border-b-2 border-[var(--llyc-red)] pb-2">
        {t('assetDisplay.titlePrefix')} <span className="text-[var(--llyc-white)] font-normal">{displayDescription}</span>
      </h2>
      {asset.type === 'image' && asset.data && (
        <div className="flex justify-center items-center bg-[var(--llyc-input-bg)] p-4 rounded-lg">
          <img 
            src={asset.data} 
            alt={t('assetDisplay.imageAlt')}
            className="max-w-full max-h-[500px] object-contain rounded-md shadow-lg"
          />
        </div>
      )}
      {asset.type === 'text' && (
        <div className="bg-[var(--llyc-input-bg)] p-4 rounded-lg max-h-[400px] overflow-y-auto">
          <pre className="whitespace-pre-wrap font-open-sans text-[var(--llyc-white)] text-sm leading-relaxed">{asset.data}</pre>
        </div>
      )}
      {asset.type === 'image' && asset.data && (
         <p className="text-xs text-[var(--llyc-gray-2)] mt-2 text-center font-open-sans">{t('assetDisplay.saveImageHint')}</p>
      )}
       {asset.type === 'text' && (
         <p className="text-xs text-[var(--llyc-gray-2)] mt-2 text-center font-open-sans">{t('assetDisplay.copyTextHint')}</p>
      )}
    </section>
  );
};