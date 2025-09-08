

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AdFormatSpec, CreativeAsset, Platform, PlatformTranslationKeys } from '../types';
import i18n from '../i18n'; // Import i18n instance for translations

const API_KEY = process.env.API_KEY;

let ai: GoogleGenAI;

if (!API_KEY || API_KEY === "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER") { // Use a more specific placeholder
  console.warn("API_KEY environment variable is not set or is a placeholder. Gemini API calls will fail if not configured in the execution environment.");
  // Initialize with a placeholder, but calls will be blocked or fail clearly
  ai = new GoogleGenAI({ apiKey: "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER" });
} else {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

const TEXT_MODEL = 'gemini-2.5-flash';
const IMAGE_MODEL = 'imagen-4.0-generate-001';

function constructPrompt(
  spec: AdFormatSpec,
  creativeIdea: string,
  campaignObjective?: string
): string {
  const originalFormatName = i18n.t(spec.formatNameKey, { lng: 'en', defaultValue: spec.formatNameKey });
  const originalPlatformName = i18n.t(PlatformTranslationKeys[spec.platform], { lng: 'en', defaultValue: spec.platform });
  const originalPromptGuidance = spec.promptGuidanceKey ? i18n.t(spec.promptGuidanceKey, { lng: 'en', defaultValue: spec.promptGuidanceKey }) : "";
  const originalBestPractices = spec.bestPracticesKeys.map(key => i18n.t(key, { lng: 'en', defaultValue: key.substring(key.lastIndexOf('.') + 1).replace(/_/g, ' ') })).join(', ');
  const targetAudienceCountry = "Spain"; // As per new instructions

  let prompt = `You are a creative assistant for digital advertising. Your task is to generate content for an ad targeted at an audience in ${targetAudienceCountry}.
Platform: ${originalPlatformName}
Format: ${originalFormatName}
`;

  if (campaignObjective) {
    prompt += `Campaign Objective: ${campaignObjective}\n`;
  }

  prompt += `Creative Idea/Base Assets: "${creativeIdea}"\n`;

  if (originalPromptGuidance) {
    prompt += `Specific Guidance for this format: ${originalPromptGuidance}\n`;
  }
  
  prompt += `\nKey Best Practices to incorporate: ${originalBestPractices}\n`;
  prompt += `\nOutput Instructions for ${spec.generationType}:\n`;

  switch (spec.generationType) {
    case 'image_concept':
      prompt += `Describe a compelling image concept. Provide a detailed visual description suitable for guiding an image generation model or a human designer. The concept should be culturally relevant for ${targetAudienceCountry}.`;
      if (spec.dimensions) prompt += ` The image concept should be for dimensions around ${spec.dimensions.width}x${spec.dimensions.height}px.`;
      if (spec.aspectRatio) prompt += ` Consider aspect ratio: ${spec.aspectRatio}.`;
      prompt += ` Focus on generating only the descriptive text for the image concept.`;
      break;
    case 'image': // This case will use the IMAGE_MODEL directly, prompt here is for context if needed
      prompt += `The user wants an image for: ${creativeIdea}. Consider aspect ratio ${spec.aspectRatio || 'any'} and dimensions like ${spec.dimensions ? spec.dimensions.width + 'x' + spec.dimensions.height + 'px' : 'standard for the format'}. The image should be culturally relevant for ${targetAudienceCountry} and embody best practices.`;
      break;
    case 'video_script':
      prompt += ` Your output should be ONLY a complete, professional video script, structured for production. Do not add any conversational text. Start directly with Scene 1.
For each scene, provide:
- **Visuals:** A detailed, cinematic description of the action, setting, and key elements. Specify camera shots (e.g., 'Wide shot', 'Close-up on product', 'Drone shot of landscape'), camera movement (e.g., 'slow pan left', 'dolly in'), lighting (e.g., 'golden hour', 'soft natural light', 'dramatic studio lighting'), and overall mood.
- **Audio:** The full voice-over or dialogue script (in Spanish, as it is relevant for ${targetAudienceCountry}), plus suggestions for music style or key sound effects (SFX).
- **On-Screen Text:** Any text overlays required, including the final Call to Action (CTA).`;
      if(spec.maxLength) prompt += `\nThe video's total duration should be approximately ${spec.maxLength.value} ${spec.maxLength.unit}.`;
      break;
    case 'ad_copy':
      prompt += `Generate compelling ad copy (e.g., headlines, primary text, descriptions). Write in Spanish if the creative idea is in Spanish or if explicitly targeting ${targetAudienceCountry} with Spanish copy.`;
      if(spec.maxLength) prompt += ` Aim for approximately ${spec.maxLength.value} ${spec.maxLength.unit}.`;
      break;
    case 'audio_script':
      prompt += `Generate an engaging audio ad script. Include voice-over text, sound effect suggestions, and music cues. The script should be culturally relevant for ${targetAudienceCountry} (e.g. in Spanish).`;
      if(spec.maxLength) prompt += ` The audio ad should be approximately ${spec.maxLength.value} ${spec.maxLength.unit} long.`;
      break;
    case 'listing_copy':
      prompt += `Generate optimized product listing copy (e.g., title, bullet points, description). Focus on clarity, benefits, and keywords relevant to the product and ${targetAudienceCountry}. Write in Spanish if appropriate.`;
      break;
    case 'creative_concept':
      prompt += `Generate a creative concept. This should be a high-level idea that can be developed further, culturally attuned for ${targetAudienceCountry}.`;
      break;
    case 'asset_ideas':
       prompt += `Generate ideas for multiple assets or components for this format (e.g., for a carousel, list different card ideas), suitable for ${targetAudienceCountry}.`;
       break;
    case 'form_concept':
        prompt += `Generate a concept for a lead generation form. Specify the offer, headline, description, and suggest essential form fields, keeping in mind users in ${targetAudienceCountry}.`;
        break;
    default:
      prompt += `Generate relevant creative content for ${targetAudienceCountry} according to the format specifications and best practices.`;
  }
  return prompt;
}


export const generateCreativeAsset = async (
  spec: AdFormatSpec,
  creativeIdea: string,
  campaignObjective?: string
): Promise<CreativeAsset> => {
  if (!API_KEY || API_KEY === "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER") {
    throw new Error(i18n.t('geminiService.errors.apiKeyMissing', "API_KEY is not configured. Please set the API_KEY environment variable."));
  }

  const translatedPlatformName = i18n.t(PlatformTranslationKeys[spec.platform], {defaultValue: spec.platform});
  const translatedFormatName = i18n.t(spec.formatNameKey, {defaultValue: spec.formatNameKey});
  const assetFormatDescription = `${translatedPlatformName} - ${translatedFormatName}`;

  try {
    if (spec.generationType === 'image') {
      const t = (key: string, options?: any) => i18n.t(key, { lng: 'en', ...options });
      const guidance = spec.promptGuidanceKey ? t(spec.promptGuidanceKey) : '';
      const bestPractices = spec.bestPracticesKeys.map(key => t(key)).join(', ');

      let imageGenPrompt = `Generate a single, professional, high-quality, photorealistic advertisement image. The image must visually represent this core idea: "${creativeIdea}".

**Style and Mood:** Cinematic, clean, modern, engaging. The lighting should be professional (e.g., soft natural light or dramatic studio lighting, as appropriate for the subject). The image should have a sharp focus and high detail.`;

      if (campaignObjective) {
        imageGenPrompt += `\n\n**Campaign Context:** The objective is to "${campaignObjective}". The image should support this goal.`;
      }
      if (guidance) {
        imageGenPrompt += `\n\n**Format Specifics:** Follow this guidance for the ad format: "${guidance}".`;
      }
      if (bestPractices) {
        imageGenPrompt += `\n\n**Creative Best Practices to follow:** ${bestPractices}.`;
      }
      imageGenPrompt += `\n\n**Audience:** The entire scene, including any models, environment, and objects, must be culturally authentic and relevant for an audience in Spain.`;

      console.log("Constructed Image Prompt:", imageGenPrompt);

      const imageGenConfig: any = {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
      };

      if (spec.aspectRatio) {
          const supportedRatios = ["1:1", "3:4", "4:3", "9:16", "16:9"];
          const availableRatios = spec.aspectRatio.split(/[,;]|\sor\s/).map(r => r.trim());
          const chosenRatio = availableRatios.find(r => supportedRatios.includes(r));
          if (chosenRatio) {
              imageGenConfig.aspectRatio = chosenRatio;
          }
      }
      
      const response = await ai.models.generateImages({
        model: IMAGE_MODEL,
        prompt: imageGenPrompt,
        config: imageGenConfig,
      });

      if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return {
          type: 'image',
          data: `data:image/jpeg;base64,${base64ImageBytes}`,
          assetFormatDescription: assetFormatDescription
        };
      } else {
        console.error("Image generation response was empty or invalid:", response);
        throw new Error(i18n.t('geminiService.errors.imageGenFailed', "Image generation failed or returned no data."));
      }
    } else { // Handles text, video_script, ad_copy, image_concept, audio_script etc.
      const prompt = constructPrompt(spec, creativeIdea, campaignObjective);
      console.log("Constructed Prompt for Gemini:", prompt);

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: TEXT_MODEL,
        contents: prompt,
      });
      
      const text = response.text;
      if (text === null || text === undefined) {
        console.error("Text generation response was null or undefined:", response);
        throw new Error(i18n.t('geminiService.errors.textGenFailed', "Text generation failed or returned no data."));
      }
      
      const assetType = (spec.generationType === 'audio_script') ? 'audio' : 'text';

      return {
        type: assetType,
        data: text.trim(),
        assetFormatDescription: assetFormatDescription
      };
    }
  } catch (error: unknown) {
    console.error("Gemini API Error:", error);
    let errorMessageKey = 'geminiService.errors.unknown';
    let errorMessageDefault = "An unknown error occurred while communicating with the Gemini API.";
    let originalErrorMessage = (error instanceof Error ? error.message : String(error));
    
    if (error instanceof Error) {
        if (originalErrorMessage.toLowerCase().includes("api key not valid") || 
            originalErrorMessage.toLowerCase().includes("permission denied") ||
            originalErrorMessage.toLowerCase().includes("api_key_invalid") ||
            originalErrorMessage.toLowerCase().includes("provide an api key") || // Updated check
            API_KEY === "MISSING_API_KEY_DO_NOT_USE_PLACEHOLDER" // Explicit check for placeholder
          ) {
             errorMessageKey = 'geminiService.errors.apiKeyInvalid';
        } else if (originalErrorMessage.toLowerCase().includes("quota")) {
            errorMessageKey = 'geminiService.errors.quotaExceeded';
        } else {
             errorMessageKey = 'geminiService.errors.apiError';
        }
    }
    // Use i18n.t with the determined key, providing the original error message for interpolation
    throw new Error(i18n.t(errorMessageKey, { ns: 'translation', defaultValue: errorMessageDefault, originalError: originalErrorMessage }));
  }
};