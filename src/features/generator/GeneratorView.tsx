import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// Components
import { PlatformSelector } from '../../components/PlatformSelector';
import { FormatSelector } from '../../components/FormatSelector';
import { ObjectiveInput } from '../../components/ObjectiveInput';
import { CreativeInput } from '../../components/CreativeInput';
import { DetailedCreativeInput } from '../../components/DetailedCreativeInput';
import { AssetGenerator } from '../../components/AssetGenerator';
import { AssetDisplay } from '../../components/AssetDisplay';
import { SpecsDisplay } from '../../components/SpecsDisplay';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';

// Types
import { Platform, AdFormatSpec, CreativeAsset } from '../../types';

// Constants
import { PLATFORMS, AD_SPECS_DATA } from '../../constants';

// Services
import { generateCreativeAsset, refineImage, removeTextFromImage } from '../../services/geminiService';

export const GeneratorView: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [selectedFormatId, setSelectedFormatId] = useState<string | null>(null);
  const [campaignObjective, setCampaignObjective] = useState<string>('');
  const [creativeIdea, setCreativeIdea] = useState<string>('');
  const [inclusions, setInclusions] = useState<string>('');
  const [exclusions, setExclusions] = useState<string>('');

  const [generatedAsset, setGeneratedAsset] = useState<CreativeAsset | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [isRemovingText, setIsRemovingText] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const availableFormats = useMemo(() => {
    if (!selectedPlatform) return [];
    return AD_SPECS_DATA.filter(spec => spec.platform === selectedPlatform);
  }, [selectedPlatform]);

  const selectedFormatSpec = useMemo((): AdFormatSpec | null => {
    if (!selectedFormatId) return null;
    return AD_SPECS_DATA.find(spec => spec.id === selectedFormatId) || null;
  }, [selectedFormatId]);

  const handlePlatformChange = useCallback((platform: Platform | null) => {
    setSelectedPlatform(platform);
    setSelectedFormatId(null); // Reset format when platform changes
    setGeneratedAsset(null);
    setError(null);
    // Also reset all creative inputs if platform changes for a cleaner flow
    setCampaignObjective('');
    setCreativeIdea('');
    setInclusions('');
    setExclusions('');
  }, []);

  const handleFormatChange = useCallback((formatId: string | null) => {
    setSelectedFormatId(formatId);
    setGeneratedAsset(null); // Reset asset if format changes
    setError(null);
     // Also reset all creative inputs if format changes for a cleaner flow
    setCampaignObjective('');
    setCreativeIdea('');
    setInclusions('');
    setExclusions('');
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
      const asset = await generateCreativeAsset(
          selectedFormatSpec, 
          creativeIdea, 
          campaignObjective,
          inclusions,
          exclusions
      );
      setGeneratedAsset(asset);
    } catch (e: any) {
      setError(e.message || t("fallbackError"));
      console.error("Generation failed:", e);
    } finally {
      setIsLoading(false);
    }
  }, [selectedFormatSpec, creativeIdea, campaignObjective, inclusions, exclusions, t]);

  const handleRefineImage = useCallback(async (refinementPrompt: string) => {
      if (!generatedAsset || generatedAsset.type !== 'image') return;

      setIsRefining(true);
      setError(null);
      
      try {
        const refinedAsset = await refineImage({
          base64ImageData: generatedAsset.data,
          refinementPrompt
        }, generatedAsset);
        setGeneratedAsset(refinedAsset);
      } catch (e: any) {
        setError(e.message || t("fallbackError"));
        console.error("Refinement failed:", e);
      } finally {
        setIsRefining(false);
      }

  }, [generatedAsset, t]);

  const handleRemoveTextFromImage = useCallback(async () => {
    if (!generatedAsset || generatedAsset.type !== 'image') return;

    setIsRemovingText(true);
    setError(null);
    
    try {
      const textlessAsset = await removeTextFromImage(generatedAsset.data, generatedAsset);
      setGeneratedAsset(textlessAsset);
    } catch (e: any) {
      setError(e.message || t("fallbackError"));
      console.error("Text removal failed:", e);
    } finally {
      setIsRemovingText(false);
    }
  }, [generatedAsset, t]);


  const isGenerationDisabled = !selectedPlatform || !selectedFormatId || !creativeIdea.trim() || isLoading || isRefining || isRemovingText;
  const isImageFormatSelected = selectedFormatSpec?.generationType === 'image';

  const showFormatSelector = selectedPlatform !== null;
  const showCreativeInputs = selectedPlatform !== null && selectedFormatId !== null;

  return (
    <div id="generator-panel" role="tabpanel" aria-labelledby="generator-tab">
      <div className="space-y-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailedCreativeInput 
                    id="inclusions-input"
                    labelKey="detailedCreativeInput.inclusions.label"
                    placeholderKey="detailedCreativeInput.inclusions.placeholder"
                    subtextKey="detailedCreativeInput.inclusions.subtext"
                    value={inclusions}
                    onChange={setInclusions}
                />
                 <DetailedCreativeInput 
                    id="exclusions-input"
                    labelKey="detailedCreativeInput.exclusions.label"
                    placeholderKey="detailedCreativeInput.exclusions.placeholder"
                    subtextKey="detailedCreativeInput.exclusions.subtext"
                    value={exclusions}
                    onChange={setExclusions}
                />
              </div>
              {isImageFormatSelected && (
                 <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                       <svg className="h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 5a1 1 0 011 1v3a1 1 0 01-2 0V6a1 1 0 011-1zm1 5a1 1 0 10-2 0v2a1 1 0 102 0v-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-700" dangerouslySetInnerHTML={{ __html: t('imageGeneration.textWarning') }} />
                    </div>
                  </div>
                </div>
              )}
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
            onRefine={handleRefineImage}
            isRefining={isRefining}
            onRemoveText={handleRemoveTextFromImage}
            isRemovingText={isRemovingText}
          />
        )}
        
        {selectedFormatSpec && ( // Always show specs if a format is selected
            <SpecsDisplay spec={selectedFormatSpec} />
        )}
      </div>
    </div>
  );
};