import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AdFormatSpec } from '../types';

interface ValidatorInputProps {
  spec: AdFormatSpec;
  onAssetChange: (asset: File | string | null) => void;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[var(--llyc-gray-2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


export const ValidatorInput: React.FC<ValidatorInputProps> = ({ spec, onAssetChange }) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState<string>('');

  const isTextFormat = useMemo(() => {
    const textTypes: (AdFormatSpec['generationType'])[] = ['ad_copy', 'listing_copy'];
    // Only consider it a text format if it's explicitly for copy and doesn't also list file types
    return textTypes.includes(spec.generationType) && (!spec.fileTypes || spec.fileTypes.length === 0);
  }, [spec.generationType, spec.fileTypes]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAssetChange(file);
      setFileName(file.name);
    } else {
      onAssetChange(null);
      setFileName('');
    }
  };
  
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
     if (file) {
      onAssetChange(file);
      setFileName(file.name);
    } else {
      onAssetChange(null);
      setFileName('');
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    if (text) {
      onAssetChange(text);
    } else {
      onAssetChange(null);
    }
  };

  const acceptedFileTypes = useMemo(() => {
    const allMimeTypes: {[key: string]: string} = {
        'MP4': 'video/mp4', 'MOV': 'video/quicktime', 'MPEG': 'video/mpeg', '3GP': 'video/3gpp',
        'JPEG': 'image/jpeg', 'JPG': 'image/jpeg', 'PNG': 'image/png', 'GIF': 'image/gif'
    };

    return spec.fileTypes?.map(ft => {
        const upperFt = ft.toUpperCase();
        return allMimeTypes[upperFt] || `.${ft.toLowerCase()}`;
    }).join(',');
  }, [spec.fileTypes]);


  if (isTextFormat) {
    return (
        <div>
            <label htmlFor="text-validator-input" className="block text-sm font-open-sans font-semibold text-[var(--llyc-turquoise)] mb-1">
                {t('validator.textInputLabel')}
            </label>
            <textarea
                id="text-validator-input"
                onChange={handleTextChange}
                rows={5}
                placeholder={t('validator.textInputPlaceholder')}
                className="w-full p-3 font-open-sans bg-[var(--llyc-input-bg)] border border-[var(--llyc-gray-3)] rounded-md shadow-sm focus:ring-2 focus:ring-[var(--llyc-red)] focus:border-[var(--llyc-red)] text-[var(--llyc-dark-blue)] placeholder-[var(--llyc-gray-2)]"
            />
            <p className="mt-1 text-xs text-[var(--llyc-gray-2)] font-open-sans">{t('validator.textInputSubtext')}</p>
        </div>
      );
  }

  // Default to file/image input for other types
  return (
    <div>
      <label className="block text-sm font-open-sans font-semibold text-[var(--llyc-turquoise)] mb-2">
          {t('validator.uploadLabel')}
      </label>
      <div 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-[var(--llyc-gray-3)] border-dashed rounded-md bg-slate-50"
        >
        <div className="space-y-1 text-center">
          <UploadIcon />
          <div className="flex text-sm text-[var(--llyc-gray-1)]">
            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-[var(--llyc-red)] hover:text-red-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-50 focus-within:ring-[var(--llyc-red)] px-1">
              <span>{t('validator.uploadAction')}</span>
              <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept={acceptedFileTypes} />
            </label>
            <p className="pl-1">{t('validator.uploadOrDrag')}</p>
          </div>
          {fileName ? (
              <p className="text-sm text-[var(--llyc-turquoise)]">{fileName}</p>
          ) : (
              <p className="text-xs text-[var(--llyc-gray-2)]">{t('validator.fileTypesHint', { types: spec.fileTypes?.join(', ') || 'N/A' })}</p>
          )}
        </div>
      </div>
    </div>
  );
};