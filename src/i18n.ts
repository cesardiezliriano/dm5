import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const en = {
  "header": {
    "llycLogo": "LLYC",
    "title": "Specs & Creatives",
    "subtitle": "DM 5: Generate and validate optimized ad creatives with AI."
  },
  "tabs": {
    "generator": "Creative Generator",
    "validator": "Creative Validator"
  },
  "platformSelector": {
    "label": "Advertising Platform",
    "selectPlaceholder": "Select a Platform"
  },
  "formatSelector": {
    "label": "Ad Format / Creative Type",
    "selectPlaceholder": "Select a Format",
    "disabledPlaceholder": "Select a platform first",
    "allFormats": "All Formats for Platform"
  },
  "objectiveInput": {
    "label": "Campaign Objective (Optional)",
    "placeholder": "e.g., Increase brand awareness, Drive website traffic, App installs"
  },
  "creativeInput": {
    "label": "Creative Idea / Base Asset Description",
    "placeholder": "Describe your product, service, target audience, key message, desired style, or any existing assets. For example: 'A minimalist ad for a new eco-friendly coffee brand targeting young professionals. Show a sleek product shot with natural elements.'",
    "subtext": "The more detail you provide, the better the AI can assist."
  },
  "detailedCreativeInput": {
    "inclusions": {
      "label": "Mandatory Inclusions (Optional)",
      "placeholder": "e.g., Brand name 'EcoMornings', the color green, a toucan",
      "subtext": "Keywords, objects, or themes that must be in the asset."
    },
    "exclusions": {
      "label": "Negative Keywords / Exclusions (Optional)",
      "placeholder": "e.g., No plastic, no cities, avoid the color red",
      "subtext": "Keywords, objects, or themes to strictly avoid."
    }
  },
  "assetGenerator": {
    "buttonText": "✨ Generate Creative Asset"
  },
  "loadingSpinner": {
    "message": "Generating your creative masterpiece..."
  },
  "errorMessage": {
    "prefix": "Oops! An error occurred:",
    "userErrorPrefix": "Please select a platform, format, and provide a creative idea."
  },
  "assetDisplay": {
    "titlePrefix": "Generated Asset:",
    "imageAlt": "Generated Creative",
    "saveImageHint": "Right-click or long-press on the image to save.",
    "copyTextHint": "You can copy the text above."
  },
  "specsDisplay": {
    "titlePrefix": "Format Details:",
    "forPlatform": "for",
    "techSpecsTitle": "Technical Specifications:",
    "generationTypeLabel": "Generation Type",
    "dimensionsLabel": "Dimensions",
    "aspectRatioLabel": "Aspect Ratio",
    "maxLengthSizeLabel": "Max Length/Size",
    "fileTypesLabel": "File Types",
    "maxFileSizeLabel": "Max File Size",
    "resolutionLabel": "Resolution",
    "safeZoneLabel": "Safe Zone",
    "iabEquivalentLabel": "IAB Equivalent",
    "bestPracticesTitle": "Creative Best Practices:",
    "noBestPractices": "No specific best practices listed for this format.",
    "promptGuidanceTitle": "AI Prompt Guidance:",
    "notesTitle": "Notes:",
    "ctaButtonRecommendationsLabel": "CTA Button Recommendations"
  },
  "footer": {
    "apiKeyWarning": "Ensure your API_KEY is correctly configured for Gemini API interactions.",
    "copyright": "Creative Campaign Assistant - LLYC"
  },
  "platforms": {
    "META": "Meta (Instagram/Facebook)",
    "YOUTUBE": "YouTube Ads",
    "DV360": "DV360 / DOOH / CTV",
    "LINKEDIN": "LinkedIn Ads",
    "TIKTOK": "TikTok Ads",
    "IAB": "IAB New Ad Portfolio",
    "GOOGLE_ADS": "Google Ads (Display/Search/Video)",
    "AMAZON": "Amazon Advertising",
    "SPOTIFY": "Spotify Ads",
    "X_TWITTER": "X (Twitter) Ads"
  },
  "adFormatNames": {
    "meta_reels_video_script": "Reels (Video Script/Ideas)",
    "meta_stories_image": "Stories (Image)",
    "meta_stories_video_script": "Stories (Video Script/Ideas)",
    "meta_feed_image": "Feed (Image)",
    "meta_feed_ad_copy": "Feed (Ad Copy)",
    "youtube_non_skippable_in_stream_video_script": "Non-Skippable In-Stream Ad (Video Script/Concept)",
    "youtube_bumper_ad_video_script": "Bumper Ad (Video Script/Concept)",
    "youtube_trueview_in_stream_video_script": "TrueView In-Stream Ad (Skippable) (Video Script/Concept)",
    "google_ads_video_action_campaign": "Google Ads: Video Action Campaign (Assets)",
    "tiktok_in_feed_ad_video_script": "In-Feed Ad (Video Script)",
    "tiktok_lead_gen_form_concept": "Lead Gen Instant Form (Concept & Questions)",
    "linkedin_single_image_ad_concept": "Single Image Ad (Image & Copy)",
    "linkedin_video_ad_script": "Video Ad (Script)",
    "google_display_ad_image_concept": "Google Ads: Display Ad (Image)",
    "google_search_ad_copy": "Google Ads: Search Ad (Copy)",
    "google_ads_performance_max_assets": "Google Ads: Performance Max (Asset Group Ideas)",
    "iab_digital_video_linear_ad_concept": "IAB: Digital Video Linear Ad (Concept/Script)",
    "iab_new_ad_portfolio_lean_concept": "IAB: LEAN Ad (Concept)",
    "dv360_dooh_concept": "DV360: Digital Out-of-Home (DOOH) (Concept)",
    "dv360_video_concept": "DV360: Video Ad (Script/Concept)",
    "amazon_sponsored_products_copy": "Amazon: Sponsored Products (Listing Copy)",
    "amazon_sponsored_brands_headline_logo_concept": "Amazon: Sponsored Brands (Headline & Logo/Image Concept)",
    "amazon_video_ad_script": "Amazon: Video Ad (Streaming TV / Online Video Script)",
    "amazon_audio_ad_script": "Amazon: Audio Ad (Script)",
    "spotify_audio_ad_script": "Spotify: Audio Ad (Script & Concept)",
    "spotify_video_takeover_script": "Spotify: Video Takeover (Vertical Video Script)",
    "x_twitter_image_ad_concept": "X/Twitter: Image Ad (Concept & Copy)",
    "x_twitter_video_ad_script": "X/Twitter: Video Ad (Script)"
  },
  "generationTypes": {
    "image_concept": "Image Concept", "image": "Image", "text": "Text", "video_script": "Video Script", "ad_copy": "Ad Copy", "creative_concept": "Creative Concept", "asset_ideas": "Asset Ideas", "form_concept": "Form Concept", "audio_script": "Audio Script", "listing_copy": "Product Listing Copy"
  },
  "imageGeneration": {
    "textWarning": "<strong>AI Note:</strong> Text within images generated by AI can sometimes be inaccurate. For critical text, use the 'Refine Image' feature below to make corrections, or consider adding text with a separate design tool for best results."
  },
  "refineImage": {
    "title": "Refine This Image",
    "placeholder": "Describe the changes you want, e.g., 'Change the text to `Hello World`', 'Make the background blue', 'Add a cat'.",
    "button": "🎨 Refine",
    "loading": "Refining image...",
    "removeTextButton": "Remove Text",
    "removeTextLoading": "Removing text..."
  },
  "fallbackError": "An unexpected error occurred during generation.",
  "geminiService": { "errors": { "apiKeyMissing": "API_KEY is not configured. Please set the API_KEY environment variable.", "imageGenFailed": "Image generation failed or returned no data.", "refinementFailed": "Image refinement failed or returned no data.", "textGenFailed": "Text generation failed or returned no data.", "unknown": "An unknown error occurred while communicating with the Gemini API.", "apiKeyInvalid": "Gemini API Error: API Key is invalid or missing, or you lack permissions. Please ensure the API_KEY environment variable is correctly set and valid. Original error: {{originalError}}", "quotaExceeded": "Gemini API Error: You have exceeded your API quota. Please check your usage and limits. Original error: {{originalError}}", "apiError": "Gemini API Error: {{originalError}}" } },
  "meta_reels_video_script_bp.hook": "Hook in first 3s.", "meta_reels_video_script_bp.trending": "Use trending audio/effects.", "meta_reels_video_script_bp.vertical": "Shoot vertical (9:16).", "meta_reels_video_script_bp.length": "Keep it short (max 90s).", "meta_reels_video_script_bp.cta": "Clear Call to Action.", "meta_reels_video_script_bp.captions": "Use captions/text overlays.", "meta_reels_video_script_pg": "Generate a concept or script for a Meta Reel. Emphasize visual storytelling, a strong hook, and use of native features like trending audio or text overlays. Aim for authenticity and quick engagement.", "meta_ads_guide_general_link": "Refer to Meta Ads Guide for detailed specs.", "meta_stories_image_bp.fullscreen": "Design for fullscreen vertical (9:16).", "meta_stories_image_bp.interactive": "Utilize interactive elements (polls, stickers).", "meta_stories_image_bp.branding": "Clear branding, visible quickly.", "meta_stories_image_bp.compelling": "Compelling visuals, concise text.", "meta_stories_image_pg": "Generate an image for Meta Stories. Focus on vertical, full-screen impact, and opportunities for interactive elements. Visuals should be captivating and messaging brief.", "meta_stories_video_script_bp.fastpaced": "Fast-paced, engaging content.", "meta_stories_video_script_bp.overlays": "Use text overlays and stickers.", "meta_stories_video_script_bp.sound": "Design for sound-on, but make sense sound-off.", "meta_stories_video_script_bp.swipeup": "Include a clear 'Swipe Up' or CTA.", "meta_stories_video_script_pg": "Create a video script for Meta Stories. Emphasize quick, visually engaging scenes, native features like polls or quizzes, and a clear call to action. Max 60 seconds, but 15s often better.", "meta_feed_image_bp.quality": "High-quality, visually appealing image.", "meta_feed_image_bp.minimaltext": "Minimize text on image.", "meta_feed_image_bp.alignbrand": "Align with brand identity.", "meta_feed_image_bp.focalpoint": "Clear focal point.", "meta_feed_image_pg": "Generate an image for Meta Feed. Consider 1:1 or 4:5 aspect ratios. Image should be high quality with minimal text on it. Focus on a clear message and brand alignment.", "meta_feed_ad_copy_bp.valueprop": "Clear value proposition.", "meta_feed_ad_copy_bp.headline": "Compelling headline (40 chars).", "meta_feed_ad_copy_bp.cta": "Strong Call to Action.", "meta_feed_ad_copy_bp.emojis": "Use emojis appropriately.", "meta_feed_ad_copy_bp.concise": "Keep primary text concise (around 125 chars).", "meta_feed_ad_copy_pg": "Write ad copy for Meta Feed. Include a primary text (approx 125 chars), a headline (40 chars), and a link description (30 chars optional). Focus on clarity, value, and a strong CTA.", "youtube_non_skippable_bp.keymessage": "Deliver key message upfront.", "youtube_non_skippable_bp.branding": "Strong branding within first few seconds.", "youtube_non_skippable_bp.visuals": "Compelling visuals.", "youtube_non_skippable_bp.cta_non_skip": "Clear CTA if applicable (though often for awareness).", "youtube_non_skippable_pg": "Generate a video script for a YouTube Non-Skippable In-Stream Ad (max 15-20s). Focus on immediate impact, clear branding, and delivering the core message quickly.", "google_ads_video_specs_link": "Refer to Google Ads Video specifications for details.", "youtube_bumper_bp.shortmemorable": "Short, memorable message (6s).", "youtube_bumper_bp.oneidea": "Focus on a single, simple idea.", "youtube_bumper_bp.visualsbranding": "Strong visuals and branding.", "youtube_bumper_bp.sequence": "Consider using in a sequence.", "youtube_bumper_pg": "Create a script for a YouTube Bumper Ad (6 seconds). It must be concise, impactful, and leave a lasting impression. Focus on one key message or brand element.", "youtube_abcds_effectiveness": "Follow YouTube's ABCD framework for effective ads (Attract, Brand, Connect, Direct).", "google_ads_bumper_specs_link": "Refer to Google Ads Bumper Ad specifications.", "youtube_trueview_instream_bp.hook5s": "Hook viewers in the first 5 seconds.", "youtube_trueview_instream_bp.story": "Tell a compelling story.", "youtube_trueview_instream_bp.showdonttell": "Show, don't just tell.", "youtube_trueview_instream_bp.cta": "Clear Call to Action.", "youtube_trueview_instream_bp.endscreen": "Use end screens effectively.", "youtube_trueview_instream_pg": "Develop a video script for a YouTube Skippable In-Stream Ad. Grab attention in the first 5 seconds. Provide value to encourage viewers not to skip. Include a clear CTA.", "google_ads_skippable_specs_link": "Refer to Google Ads Skippable In-Stream Ad specifications.", "google_ads_video_action_bp.clear_cta": "Prominent and clear call-to-action.", "google_ads_video_action_bp.value_prop": "Highlight value proposition early.", "google_ads_video_action_bp.various_lengths": "Test various video lengths (10s+ recommended).", "google_ads_video_action_pg": "Generate asset ideas (video script, headlines, descriptions) for a Google Ads Video Action Campaign. Focus on driving conversions with clear CTAs and value propositions.", "google_ads_video_action_specs_link": "Refer to Google Ads Video Action Campaign specs.",
  "validator": {
    "uploadLabel": "Upload your creative asset",
    "uploadAction": "Upload a file",
    "uploadOrDrag": "or drag and drop",
    "fileTypesHint": "Supports: {{types}}",
    "textInputLabel": "Paste your text asset",
    "textInputPlaceholder": "Paste your ad copy, headline, or script here...",
    "textInputSubtext": "The content will be validated against the selected format's text length specifications.",
    "validateButton": "🔍 Validate Asset",
    "loading": "Analyzing your creative...",
    "errors": {
      "noAssetOrFormat": "Please select a format and provide an asset to validate."
    },
    "results": {
      "title": "Validation Results",
      "overallStatus": "Overall Status",
      "compliant": "Compliant",
      "nonCompliant": "Non-Compliant",
      "table": {
        "spec": "Specification",
        "expected": "Expected",
        "actual": "Actual",
        "status": "Status"
      },
      "status": {
        "ok": "OK",
        "fail": "Fail"
      }
    },
    "spec": {
        "noSpec": "No specific technical specs to validate for this text format."
    }
  },
  "feedbackButton": {
    "tooltip": "Send Feedback",
    "emailSubject": "Feedback for {{appName}}",
    "emailBodyPlaceholder": "Hi team,\n\nI have some feedback regarding the {{appName}} application:\n\n"
  },
  "helpBotButton": {
    "tooltip": "Get Help"
  },
  "helpBotModal": {
    "title": "Help Center",
    "closeButtonAriaLabel": "Close help modal",
    "topicsListHeader": "Topics",
    "noTopicSelected": "Select a topic from the list to see the answer.",
    "introduction": "How can we help you today?",
    "backToTopics": "Back to Topics"
  },
  "helpTopics": {
    "aboutApp": {
        "question": "What is this application for?",
        "answer": "<strong>Specs & Creatives</strong> is a tool to help you create and validate advertising materials. <br/>Use the <strong>Creative Generator</strong> to produce images, ad copy, or video scripts with AI. <br/>Use the <strong>Creative Validator</strong> to check if your existing assets meet the technical requirements for different ad platforms."
    },
    "generatingAssets": {
        "question": "How do I generate an asset?",
        "answer": "1. Go to the 'Creative Generator' tab.<br/>2. Select an <strong>Advertising Platform</strong> (e.g., Meta).<br/>3. Select an <strong>Ad Format</strong> (e.g., Feed Image).<br/>4. Describe your <strong>Creative Idea</strong> in the text box. The more detail, the better!<br/>5. (Optional) Add a campaign objective, mandatory inclusions, or exclusions.<br/>6. Click the 'Generate' button and wait for the AI to create your asset."
    },
    "validatingAssets": {
        "question": "How do I validate an asset?",
        "answer": "1. Go to the 'Creative Validator' tab.<br/>2. Select the <strong>Platform</strong> and <strong>Format</strong> your asset was designed for. You can also select 'All Formats for Platform' to check against every format.<br/>3. Upload your file (image, video) or paste your text into the input area.<br/>4. Click the 'Validate Asset' button.<br/>5. The results will show a table comparing your asset's properties (like dimensions, file size, or length) against the platform's requirements."
    },
    "apiKey": {
        "question": "Do I need an API key?",
        "answer": "Yes, this application requires a Google Gemini API key to function. The application is designed to use an `API_KEY` environment variable that should be configured in the environment where it's deployed. If the key is missing or invalid, the generation will fail."
    },
    "interpretingResults": {
        "question": "How do I interpret the validation results?",
        "answer": "The results table shows a row for each technical specification.<ul><li><strong>Expected:</strong> The requirement from the ad platform.</li><li><strong>Actual:</strong> The property measured from your asset.</li><li><strong>Status:</strong> 'OK' if your asset is compliant, 'Fail' if it is not.</li></ul> The 'Overall Status' at the top tells you if your asset passed all checks."
    }
  }
};

// Spanish translations
const es = {
  "header": {
    "llycLogo": "LLYC",
    "title": "Specs & Creatives",
    "subtitle": "DM 5: Genera y valida creatividades publicitarias optimizadas con IA."
  },
  "tabs": {
    "generator": "Generador Creativo",
    "validator": "Validador Creativo"
  },
  "platformSelector": {
    "label": "Plataforma Publicitaria",
    "selectPlaceholder": "Selecciona una Plataforma"
  },
  "formatSelector": {
    "label": "Formato de Anuncio / Tipo de Creatividad",
    "selectPlaceholder": "Selecciona un Formato",
    "disabledPlaceholder": "Selecciona una plataforma primero",
    "allFormats": "Todos los Formatos de la Plataforma"
  },
  "objectiveInput": {
    "label": "Objetivo de Campaña (Opcional)",
    "placeholder": "Ej: Aumentar notoriedad de marca, Generar tráfico web, Instalaciones de app"
  },
  "creativeInput": {
    "label": "Idea Creativa / Descripción Base del Activo",
    "placeholder": "Describe tu producto, servicio, público objetivo, mensaje clave, estilo deseado o cualquier activo existente. Por ejemplo: 'Un anuncio minimalista para una nueva marca de café ecológico dirigida a jóvenes profesionales. Mostrar una foto de producto elegante con elementos naturales.'",
    "subtext": "Cuanto más detalle proporciones, mejor podrá ayudarte la IA."
  },
  "detailedCreativeInput": {
    "inclusions": {
      "label": "Inclusiones Obligatorias (Opcional)",
      "placeholder": "Ej: Nombre de marca 'EcoMornings', el color verde, un tucán",
      "subtext": "Palabras clave, objetos o temas que deben estar en el activo."
    },
    "exclusions": {
      "label": "Palabras Clave Negativas / Exclusiones (Opcional)",
      "placeholder": "Ej: Nada de plástico, no ciudades, evitar el color rojo",
      "subtext": "Palabras clave, objetos o temas a evitar estrictamente."
    }
  },
  "assetGenerator": {
    "buttonText": "✨ Generar Activo Creativo"
  },
  "loadingSpinner": {
    "message": "Generando tu obra maestra creativa..."
  },
  "errorMessage": {
    "prefix": "¡Ups! Ocurrió un error:",
    "userErrorPrefix": "Por favor, selecciona una plataforma, un formato y proporciona una idea creativa."
  },
  "assetDisplay": {
    "titlePrefix": "Activo Generado:",
    "imageAlt": "Creatividad Generada",
    "saveImageHint": "Haz clic derecho o mantén pulsado sobre la imagen para guardarla.",
    "copyTextHint": "Puedes copiar el texto de arriba."
  },
  "specsDisplay": {
    "titlePrefix": "Detalles del Formato:",
    "forPlatform": "para",
    "techSpecsTitle": "Especificaciones Técnicas:",
    "generationTypeLabel": "Tipo de Generación",
    "dimensionsLabel": "Dimensiones",
    "aspectRatioLabel": "Relación de Aspecto",
    "maxLengthSizeLabel": "Longitud/Tamaño Máx.",
    "fileTypesLabel": "Tipos de Archivo",
    "maxFileSizeLabel": "Tamaño Máx. Archivo",
    "resolutionLabel": "Resolución",
    "safeZoneLabel": "Zona Segura",
    "iabEquivalentLabel": "Equivalente IAB",
    "bestPracticesTitle": "Mejores Prácticas Creativas:",
    "noBestPractices": "No hay mejores prácticas específicas listadas para este formato.",
    "promptGuidanceTitle": "Guía para el Prompt de IA:",
    "notesTitle": "Notas:",
    "ctaButtonRecommendationsLabel": "Recomendaciones Botón CTA"
  },
  "footer": {
    "apiKeyWarning": "Asegúrate de que tu API_KEY esté configurada correctamente para las interacciones con la API de Gemini.",
    "copyright": "Asistente de Campañas Creativas - LLYC"
  },
  "platforms": {
    "META": "Meta (Instagram/Facebook)",
    "YOUTUBE": "YouTube Ads",
    "DV360": "DV360 / DOOH / CTV",
    "LINKEDIN": "LinkedIn Ads",
    "TIKTOK": "TikTok Ads",
    "IAB": "IAB New Ad Portfolio",
    "GOOGLE_ADS": "Google Ads (Display/Search/Video)",
    "AMAZON": "Amazon Advertising",
    "SPOTIFY": "Spotify Ads",
    "X_TWITTER": "X (Twitter) Ads"
  },
  "adFormatNames": {
    "meta_reels_video_script": "Reels (Guion/Ideas de Video)",
    "meta_stories_image": "Stories (Imagen)",
    "meta_stories_video_script": "Stories (Guion/Ideas de Video)",
    "meta_feed_image": "Feed (Imagen)",
    "meta_feed_ad_copy": "Feed (Copy de Anuncio)",
    "youtube_non_skippable_in_stream_video_script": "Anuncio In-Stream No Saltable (Guion/Concepto de Video)",
    "youtube_bumper_ad_video_script": "Bumper Ad (Guion/Concepto de Video)",
    "youtube_trueview_in_stream_video_script": "Anuncio TrueView In-Stream (Saltable) (Guion/Concepto de Video)",
    "google_ads_video_action_campaign": "Google Ads: Campaña de Vídeo de Acción (Activos)",
    "tiktok_in_feed_ad_video_script": "Anuncio In-Feed (Guion de Video)",
    "tiktok_lead_gen_form_concept": "Formulario Instantáneo Lead Gen (Concepto y Preguntas)",
    "linkedin_single_image_ad_concept": "Anuncio de Imagen Única (Imagen y Copy)",
    "linkedin_video_ad_script": "Anuncio de Video (Guion)",
    "google_display_ad_image_concept": "Google Ads: Anuncio de Display (Imagen)",
    "google_search_ad_copy": "Google Ads: Anuncio de Búsqueda (Copy)",
    "google_ads_performance_max_assets": "Google Ads: Máximo Rendimiento (Ideas para Grupos de Activos)",
    "iab_digital_video_linear_ad_concept": "IAB: Anuncio Lineal de Video Digital (Concepto/Guion)",
    "iab_new_ad_portfolio_lean_concept": "IAB: Anuncio LEAN (Concepto)",
    "dv360_dooh_concept": "DV360: Digital Out-of-Home (DOOH) (Concepto)",
    "dv360_video_concept": "DV360: Anuncio de Video (Guion/Concepto)",
    "amazon_sponsored_products_copy": "Amazon: Sponsored Products (Copy de Listing)",
    "amazon_sponsored_brands_headline_logo_concept": "Amazon: Sponsored Brands (Concepto Titular y Logo/Imagen)",
    "amazon_video_ad_script": "Amazon: Anuncio de Video (Streaming TV / Video Online - Guion)",
    "amazon_audio_ad_script": "Amazon: Anuncio de Audio (Guion)",
    "spotify_audio_ad_script": "Spotify: Anuncio de Audio (Guion y Concepto)",
    "spotify_video_takeover_script": "Spotify: Video Takeover (Guion Video Vertical)",
    "x_twitter_image_ad_concept": "X/Twitter: Anuncio con Imagen (Concepto y Copy)",
    "x_twitter_video_ad_script": "X/Twitter: Anuncio de Video (Guion)"
  },
  "generationTypes": {
    "image_concept": "Concepto de Imagen", "image": "Imagen", "text": "Texto", "video_script": "Guion de Video", "ad_copy": "Copy de Anuncio", "creative_concept": "Concepto Creativo", "asset_ideas": "Ideas de Activos", "form_concept": "Concepto de Formulario", "audio_script": "Guion de Audio", "listing_copy": "Copy de Ficha de Producto"
  },
   "imageGeneration": {
    "textWarning": "<strong>Nota de IA:</strong> El texto dentro de las imágenes generadas por IA a veces puede ser impreciso. Para texto crítico, usa la función 'Refinar Imagen' para hacer correcciones, o considera añadir el texto con una herramienta de diseño externa para mejores resultados."
  },
  "refineImage": {
    "title": "Refinar Esta Imagen",
    "placeholder": "Describe los cambios que quieres, ej: 'Cambia el texto a `Hola Mundo`', 'Haz el fondo azul', 'Añade un gato'.",
    "button": "🎨 Refinar",
    "loading": "Refinando imagen...",
    "removeTextButton": "Quitar Texto",
    "removeTextLoading": "Quitando texto..."
  },
  "fallbackError": "Ocurrió un error inesperado durante la generación.",
  "geminiService": { "errors": { "apiKeyMissing": "API_KEY no está configurada. Por favor, establece la variable de entorno API_KEY.", "imageGenFailed": "La generación de imagen falló o no devolvió datos.", "refinementFailed": "El refinamiento de la imagen falló o no devolvió datos.", "textGenFailed": "La generación de texto falló o no devolvió datos.", "unknown": "Ocurrió un error desconocido al comunicarse con la API de Gemini.", "apiKeyInvalid": "Error API Gemini: La API Key es inválida, no existe o careces de permisos. Asegúrate de que la variable de entorno API_KEY está correctamente configurada y es válida. Error original: {{originalError}}", "quotaExceeded": "Error API Gemini: Has excedido tu cuota de API. Por favor, revisa tu uso y límites. Error original: {{originalError}}", "apiError": "Error API Gemini: {{originalError}}" } },
  "meta_reels_video_script_bp.hook": "Engancha en los primeros 3s.", "meta_reels_video_script_bp.trending": "Usa audio/efectos en tendencia.", "meta_reels_video_script_bp.vertical": "Graba en vertical (9:16).", "meta_reels_video_script_bp.length": "Sé breve (máx 90s).", "meta_reels_video_script_bp.cta": "Llamada a la Acción clara.", "meta_reels_video_script_bp.captions": "Usa subtítulos/texto superpuesto.", "meta_reels_video_script_pg": "Genera un concepto o guion para un Reel de Meta. Enfatiza la narración visual, un gancho fuerte y el uso de funciones nativas como audio en tendencia o superposiciones de texto. Busca autenticidad y engagement rápido.", "meta_ads_guide_general_link": "Consulta la Guía de Anuncios de Meta para especificaciones detalladas.", "meta_stories_image_bp.fullscreen": "Diseña para vertical a pantalla completa (9:16).", "meta_stories_image_bp.interactive": "Utiliza elementos interactivos (encuestas, stickers).", "meta_stories_image_bp.branding": "Branding claro, visible rápidamente.", "meta_stories_image_bp.compelling": "Visuales atractivos, texto conciso.", "meta_stories_image_pg": "Genera una imagen para Meta Stories. Enfócate en el impacto vertical a pantalla completa y oportunidades para elementos interactivos. Los visuales deben ser cautivadores y el mensaje breve.", "meta_stories_video_script_bp.fastpaced": "Contenido rápido y atractivo.", "meta_stories_video_script_bp.overlays": "Usa superposiciones de texto y stickers.", "meta_stories_video_script_bp.sound": "Diseña para sonido activado, pero que tenga sentido sin sonido.", "meta_stories_video_script_bp.swipeup": "Incluye un 'Desliza hacia arriba' o CTA claro.", "meta_stories_video_script_pg": "Crea un guion de video para Meta Stories. Enfatiza escenas rápidas y visualmente atractivas, funciones nativas como encuestas o quizzes, y una llamada a la acción clara. Máx 60 segundos, pero 15s suele ser mejor.", "meta_feed_image_bp.quality": "Imagen de alta calidad y visualmente atractiva.", "meta_feed_image_bp.minimaltext": "Minimiza el texto en la imagen.", "meta_feed_image_bp.alignbrand": "Alinea con la identidad de marca.", "meta_feed_image_bp.focalpoint": "Punto focal claro.", "meta_feed_image_pg": "Genera una imagen para el Feed de Meta. Considera relaciones de aspecto 1:1 o 4:5. La imagen debe ser de alta calidad con texto mínimo sobre ella. Enfócate en un mensaje claro y alineación de marca.", "meta_feed_ad_copy_bp.valueprop": "Propuesta de valor clara.", "meta_feed_ad_copy_bp.headline": "Titular atractivo (40 car.).", "meta_feed_ad_copy_bp.cta": "Llamada a la Acción fuerte.", "meta_feed_ad_copy_bp.emojis": "Usa emojis apropiadamente.", "meta_feed_ad_copy_bp.concise": "Mantén el texto principal conciso (alrededor de 125 car.).", "meta_feed_ad_copy_pg": "Escribe un copy para un anuncio de Feed de Meta. Incluye un texto principal (aprox 125 car.), un titular (40 car.) y una descripción del enlace (30 car. opcional). Enfócate en claridad, valor y una CTA fuerte.", "youtube_non_skippable_bp.keymessage": "Entrega el mensaje clave al inicio.", "youtube_non_skippable_bp.branding": "Branding fuerte en los primeros segundos.", "youtube_non_skippable_bp.visuals": "Visuales atractivos.", "youtube_non_skippable_bp.cta_non_skip": "CTA claro si aplica (aunque suele ser para notoriedad).", "youtube_non_skippable_pg": "Genera un guion para un anuncio In-Stream No Saltable de YouTube (máx 15-20s). Enfócate en impacto inmediato, branding claro y entrega rápida del mensaje central.", "google_ads_video_specs_link": "Consulta las especificaciones de Vídeo de Google Ads para detalles.", "youtube_bumper_bp.shortmemorable": "Mensaje corto y memorable (6s).", "youtube_bumper_bp.oneidea": "Enfócate en una idea simple y única.", "youtube_bumper_bp.visualsbranding": "Visuales y branding fuertes.", "youtube_bumper_bp.sequence": "Considera usar en secuencia.", "youtube_bumper_pg": "Crea un guion para un Bumper Ad de YouTube (6 segundos). Debe ser conciso, impactante y dejar una impresión duradera. Enfócate en un mensaje clave o elemento de marca.", "youtube_abcds_effectiveness": "Sigue el framework ABCD de YouTube para anuncios efectivos (Atraer, Brandear, Conectar, Dirigir).", "google_ads_bumper_specs_link": "Consulta las especificaciones de Bumper Ads de Google Ads.", "youtube_trueview_instream_bp.hook5s": "Engancha a los espectadores en los primeros 5 segundos.", "youtube_trueview_instream_bp.story": "Cuenta una historia atractiva.", "youtube_trueview_instream_bp.showdonttell": "Muestra, no solo cuentes.", "youtube_trueview_instream_bp.cta": "Llamada a la Acción clara.", "youtube_trueview_instream_bp.endscreen": "Usa las pantallas finales eficazmente.", "youtube_trueview_instream_pg": "Desarrolla un guion para un anuncio In-Stream Saltable de YouTube. Capta la atención en los primeros 5 segundos. Proporciona valor para animar a los espectadores a no saltar. Incluye una CTA clara.", "google_ads_skippable_specs_link": "Consulta las especificaciones de Anuncios In-Stream Saltables de Google Ads.", "google_ads_video_action_bp.clear_cta": "Llamada a la acción prominente y clara.", "google_ads_video_action_bp.value_prop": "Destaca la propuesta de valor pronto.", "google_ads_video_action_bp.various_lengths": "Prueba varias duraciones de video (10s+ recomendado).", "google_ads_video_action_pg": "Genera ideas de activos (guion de video, titulares, descripciones) para una Campaña de Vídeo de Acción de Google Ads. Enfócate en impulsar conversiones con CTAs claras y propuestas de valor.", "google_ads_video_action_specs_link": "Consulta las especificaciones de Campañas de Vídeo de Acción de Google Ads.",
  "validator": {
    "uploadLabel": "Sube tu activo creativo",
    "uploadAction": "Sube un archivo",
    "uploadOrDrag": "o arrastra y suelta",
    "fileTypesHint": "Soportados: {{types}}",
    "textInputLabel": "Pega tu activo de texto",
    "textInputPlaceholder": "Pega aquí el copy de tu anuncio, titular o guion...",
    "textInputSubtext": "El contenido se validará según las especificaciones de longitud del formato seleccionado.",
    "validateButton": "🔍 Validar Activo",
    "loading": "Analizando tu creatividad...",
    "errors": {
      "noAssetOrFormat": "Por favor, selecciona un formato y proporciona un activo para validar."
    },
    "results": {
      "title": "Resultados de la Validación",
      "overallStatus": "Estado General",
      "compliant": "Cumple",
      "nonCompliant": "No Cumple",
      "table": {
        "spec": "Especificación",
        "expected": "Esperado",
        "actual": "Actual",
        "status": "Estado"
      },
      "status": {
        "ok": "OK",
        "fail": "Fallo"
      }
    },
    "spec": {
        "noSpec": "No hay especificaciones técnicas específicas para validar en este formato de texto."
    }
  },
  "feedbackButton": {
    "tooltip": "Enviar Feedback",
    "emailSubject": "Feedback para {{appName}}",
    "emailBodyPlaceholder": "Hola equipo,\n\nTengo algunas sugerencias sobre la aplicación {{appName}}:\n\n"
  },
  "helpBotButton": {
    "tooltip": "Obtener Ayuda"
  },
  "helpBotModal": {
    "title": "Centro de Ayuda",
    "closeButtonAriaLabel": "Cerrar modal de ayuda",
    "topicsListHeader": "Temas",
    "noTopicSelected": "Selecciona un tema de la lista para ver la respuesta.",
    "introduction": "¿En qué podemos ayudarte?",
    "backToTopics": "Volver a Temas"
  },
  "helpTopics": {
    "aboutApp": {
        "question": "¿Para qué sirve esta aplicación?",
        "answer": "<strong>Specs & Creatives</strong> es una herramienta para ayudarte a crear y validar materiales publicitarios. <br/>Usa el <strong>Generador Creativo</strong> para producir imágenes, copys o guiones de vídeo con IA. <br/>Usa el <strong>Validador Creativo</strong> para comprobar si tus activos existentes cumplen los requisitos técnicos de las diferentes plataformas publicitarias."
    },
    "generatingAssets": {
        "question": "¿Cómo genero un activo?",
        "answer": "1. Ve a la pestaña 'Generador Creativo'.<br/>2. Selecciona una <strong>Plataforma Publicitaria</strong> (ej. Meta).<br/>3. Selecciona un <strong>Formato de Anuncio</strong> (ej. Imagen para Feed).<br/>4. Describe tu <strong>Idea Creativa</strong> en el cuadro de texto. ¡Cuanto más detalle, mejor!<br/>5. (Opcional) Añade un objetivo de campaña, inclusiones obligatorias o exclusiones.<br/>6. Haz clic en el botón 'Generar' y espera a que la IA cree tu activo."
    },
    "validatingAssets": {
        "question": "¿Cómo valido un activo?",
        "answer": "1. Ve a la pestaña 'Validador Creativo'.<br/>2. Selecciona la <strong>Plataforma</strong> y el <strong>Formato</strong> para el que fue diseñado tu activo. También puedes seleccionar 'Todos los Formatos' para comprobarlo con todos los de la plataforma.<br/>3. Sube tu archivo (imagen, vídeo) o pega tu texto en el área de entrada.<br/>4. Haz clic en el botón 'Validar Activo'.<br/>5. Los resultados mostrarán una tabla comparando las propiedades de tu activo (como dimensiones, tamaño de archivo o longitud) con los requisitos de la plataforma."
    },
    "apiKey": {
        "question": "¿Necesito una clave de API?",
        "answer": "Sí, esta aplicación requiere una clave de API de Google Gemini para funcionar. La aplicación está diseñada para usar una variable de entorno `API_KEY` que debe ser configurada en el entorno donde se despliega. Si la clave falta o es inválida, la generación fallará."
    },
    "interpretingResults": {
        "question": "¿Cómo interpreto los resultados de la validación?",
        "answer": "La tabla de resultados muestra una fila por cada especificación técnica.<ul><li><strong>Esperado:</strong> El requisito de la plataforma publicitaria.</li><li><strong>Actual:</strong> La propiedad medida de tu activo.</li><li><strong>Estado:</strong> 'OK' si tu activo cumple, 'Fallo' si no.</li></ul> El 'Estado General' en la parte superior te dice si tu activo pasó todas las comprobaciones."
    }
  }
};


i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      es: {
        translation: es
      }
    },
    lng: 'es', // Set a default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    debug: false,
  });

export default i18next;