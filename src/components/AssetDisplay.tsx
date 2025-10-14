import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreativeAsset, Platform, PlatformTranslationKeys } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface AssetDisplayProps {
  asset: CreativeAsset;
  platform: Platform;
  formatNameKey: string;
  onRefine: (refinementPrompt: string) => void;
  isRefining: boolean;
  onRemoveText: () => void;
  isRemovingText: boolean;
}

export const AssetDisplay: React.FC<AssetDisplayProps> = ({ asset, platform, formatNameKey, onRefine, isRefining, onRemoveText, isRemovingText }) => {
  const { t } = useTranslation();
  const [refinementPrompt, setRefinementPrompt] = useState('');

  const translatedPlatform = t(PlatformTranslationKeys[platform]);
  const translatedFormatName = t(formatNameKey);
  const displayDescription = asset.assetFormatDescription || `${translatedPlatform} - ${translatedFormatName}`;

  const handleRefineClick = () => {
    if (refinementPrompt.trim()) {
      onRefine(refinementPrompt);
    }
  };

  return (
    <section className="bg-[var(--llyc-card-bg)] p-6 rounded-xl shadow-md mt-8 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--llyc-red)]/30 border border-[var(--llyc-gray-4)]">
      <h2 className="text-2xl font-montserrat font-semibold mb-4 text-[var(--llyc-red)] border-b-2 border-[var(--llyc-red)] pb-2">
        {t('assetDisplay.titlePrefix')} <span className="text-[var(--llyc-dark-blue)] font-normal">{displayDescription}</span>
      </h2>
      {asset.type === 'image' && asset.data && (
        <div className="flex justify-center items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
          <img 
            src={asset.data} 
            alt={t('assetDisplay.imageAlt')}
            className="max-w-full max-h-[500px] object-contain rounded-md shadow-lg"
          />
        </div>
      )}
      {asset.type === 'text' && (
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 max-h-[400px] overflow-y-auto">
          <pre className="whitespace-pre-wrap font-open-sans text-[var(--llyc-gray-1)] text-sm leading-relaxed">{asset.data}</pre>
        </div>
      )}
      {asset.type === 'image' && asset.data && (
         <p className="text-xs text-[var(--llyc-gray-2)] mt-2 text-center font-open-sans">{t('assetDisplay.saveImageHint')}</p>
      )}
       {asset.type === 'text' && (
         <p className="text-xs text-[var(--llyc-gray-2)] mt-2 text-center font-open-sans">{t('assetDisplay.copyTextHint')}</p>
      )}

      {/* Image Refinement Section */}
      {asset.type === 'image' && asset.data && (
        <div className="mt-6 pt-6 border-t border-[var(--llyc-gray-4)]">
           <h3 className="text-lg font-montserrat font-semibold text-[var(--llyc-turquoise)] mb-2">{t('refineImage.title')}</h3>
           
           {isRefining && <LoadingSpinner message={t('refineImage.loading')} />}
           {isRemovingText && <LoadingSpinner message={t('refineImage.removeTextLoading')} />}

           {!(isRefining || isRemovingText) && (
             <div className="space-y-4">
               <textarea
                 value={refinementPrompt}
                 onChange={(e) => setRefinementPrompt(e.target.value)}
                 rows={3}
                 placeholder={t('refineImage.placeholder')}
                 className="w-full p-3 font-open-sans bg-[var(--llyc-input-bg)] border border-[var(--llyc-gray-3)] rounded-md shadow-sm focus:ring-2 focus:ring-[var(--llyc-red)] focus:border-[var(--llyc-red)] text-[var(--llyc-dark-blue)] placeholder-[var(--llyc-gray-2)]"
                 disabled={isRefining || isRemovingText}
               />
               <div className="flex flex-col sm:flex-row justify-end items-center space-y-2 sm:space-y-0 sm:space-x-4">
                 <button
                   onClick={onRemoveText}
                   disabled={isRefining || isRemovingText}
                   className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-montserrat font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-500 transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                 >
                   {t('refineImage.removeTextButton')}
                 </button>
                 <button
                   onClick={handleRefineClick}
                   disabled={!refinementPrompt.trim() || isRefining || isRemovingText}
                   className="px-6 py-2 bg-[var(--llyc-turquoise)] hover:bg-teal-600 text-white font-montserrat font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[var(--llyc-turquoise)] transition-all duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                 >
                   {t('refineImage.button')}
                 </button>
               </div>
             </div>
           )}
        </div>
      )}
    </section>
  );
};