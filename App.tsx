import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// Components
import { Header } from './components/Header';
import { PlatformSelector } from './components/PlatformSelector';
import { FormatSelector }from './components/FormatSelector';
import { ObjectiveInput } from './components/ObjectiveInput';
import { CreativeInput } from './components/CreativeInput';
import { AssetGenerator } from './components/AssetGenerator';
import { AssetDisplay } from './components/AssetDisplay';
import { SpecsDisplay } from './components/SpecsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

// Types
import { Platform, AdFormatSpec, CreativeAsset } from './types';

// Constants
import { PLATFORMS, AD_SPECS_DATA } from './constants';

// Services
import { generateCreativeAsset } from './services/geminiService';

const App: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [selectedFormatId, setSelectedFormatId] = useState<string | null>(null);
  const [campaignObjective, setCampaignObjective] = useState<string>('');
  const [creativeIdea, setCreativeIdea] = useState<string>('');

  const [generatedAsset, setGeneratedAsset] = useState<CreativeAsset | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const availableFormats = useMemo(() => {
    if (!selectedPlatform) return [];
    return AD_SPECS_DATA.filter(spec => spec.platform === selectedPlatform);
  }, [selectedPlatform]);

  const selectedFormatSpec = useMemo(() => {
    if (!selectedFormatId) return null;
    return AD_SPECS_DATA.find(spec => spec.id === selectedFormatId) || null;
  }, [selectedFormatId]);

  const handlePlatformChange = useCallback((platform: Platform | null) => {
    setSelectedPlatform(platform);
    setSelectedFormatId(null); // Reset format when platform changes
    setGeneratedAsset(null);
    setError(null);
    // Also reset objective and creative idea if platform changes for a cleaner flow
    setCampaignObjective('');
    setCreativeIdea('');
  }, []);

  const handleFormatChange = useCallback((formatId: string | null) => {
    setSelectedFormatId(formatId);
    setGeneratedAsset(null); // Reset asset if format changes
    setError(null);
     // Reset objective and creative idea if format changes for a cleaner flow
    setCampaignObjective('');
    setCreativeIdea('');
  }, []);

  const handleGenerateAsset = useCallback(async () => {
    if (!selectedFormatSpec || !creativeIdea.trim()) {
      setError(t("errorMessage.userErrorPrefix", "Please select a platform, format, and provide a creative idea."));
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedAsset(null);

    try {
      const asset = await generateCreativeAsset(selectedFormatSpec, creativeIdea, campaignObjective);
      setGeneratedAsset(asset);
    } catch (e: any) {
      setError(e.message || t("fallbackError"));
      console.error("Generation failed:", e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFormatSpec, creativeIdea, campaignObjective, t]);

  const isGenerationDisabled = !selectedPlatform || !selectedFormatId || !creativeIdea.trim() || isLoading;

  const showFormatSelector = selectedPlatform !== null;
  const showCreativeInputs = selectedPlatform !== null && selectedFormatId !== null;

  return (
    <div className="container mx-auto p-4 max-w-4xl min-h-screen flex flex-col font-open-sans">
      <Header />

      <main className="flex-grow space-y-6 bg-[var(--llyc-dark-blue)] p-6 sm:p-8 rounded-xl shadow-2xl mb-8 border border-[var(--llyc-gray-2)]/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PlatformSelector
            platforms={PLATFORMS}
            selectedPlatform={selectedPlatform}
            onChange={handlePlatformChange}
          />
          <div className={`disclosure-section ${showFormatSelector ? 'expanded' : 'collapsed'}`}>
            {showFormatSelector && (
              <FormatSelector
                formats={availableFormats}
                selectedFormatId={selectedFormatId}
                onChange={handleFormatChange}
                disabled={availableFormats.length === 0}
              />
            )}
          </div>
        </div>

        <div className={`disclosure-section ${showCreativeInputs ? 'expanded' : 'collapsed'} space-y-6`}>
          {showCreativeInputs && (
            <>
              <ObjectiveInput value={campaignObjective} onChange={setCampaignObjective} />
              <CreativeInput value={creativeIdea} onChange={setCreativeIdea} />
              <AssetGenerator onGenerate={handleGenerateAsset} disabled={isGenerationDisabled} />
            </>
          )}
        </div>

        {isLoading && <LoadingSpinner message={t('loadingSpinner.message')} />}
        {error && <ErrorMessage message={error} />}
        
        {generatedAsset && selectedFormatSpec && (
          <AssetDisplay 
            asset={generatedAsset} 
            platform={selectedFormatSpec.platform} 
            formatNameKey={selectedFormatSpec.formatNameKey} 
          />
        )}
        
        {selectedFormatSpec && ( // Always show specs if a format is selected, even if asset not generated yet
            <SpecsDisplay spec={selectedFormatSpec} />
        )}
      </main>

      <footer className="text-center py-6 text-[var(--llyc-gray-2)] text-sm font-open-sans">
        <p>{t('footer.apiKeyWarning')}</p>
        <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
      </footer>
    </div>
  );
};

export default App;