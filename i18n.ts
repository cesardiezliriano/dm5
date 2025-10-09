import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const en = {
  "header": {
    "llycLogo": "LLYC",
    "title": "DM 5 - Specs & Creatives",
    "subtitle": "Generate and validate optimized ad creatives with AI.",
    "langSwitcherLabel": "Language:"
  },
  "platformSelector": {
    "label": "Advertising Platform",
    "selectPlaceholder": "Select a Platform"
  },
  "formatSelector": {
    "label": "Ad Format / Creative Type",
    "selectPlaceholder": "Select a Format",
    "disabledPlaceholder": "Select a platform first"
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
  "fallbackError": "An unexpected error occurred during generation.",
  "geminiService": { "errors": { "apiKeyMissing": "API_KEY is not configured. Please set the API_KEY environment variable.", "imageGenFailed": "Image generation failed or returned no data.", "textGenFailed": "Text generation failed or returned no data.", "unknown": "An unknown error occurred while communicating with the Gemini API.", "apiKeyInvalid": "Gemini API Error: API Key is invalid or missing, or you lack permissions. Please ensure the API_KEY environment variable is correctly set and valid. Original error: {{originalError}}", "quotaExceeded": "Gemini API Error: You have exceeded your API quota. Please check your usage and limits. Original error: {{originalError}}", "apiError": "Gemini API Error: {{originalError}}" } },
  "meta_reels_video_script_bp.hook": "Hook in first 3s.", "meta_reels_video_script_bp.trending": "Use trending audio/effects.", "meta_reels_video_script_bp.vertical": "Shoot vertical (9:16).", "meta_reels_video_script_bp.length": "Keep it short (max 90s).", "meta_reels_video_script_bp.cta": "Clear Call to Action.", "meta_reels_video_script_bp.captions": "Use captions/text overlays.", "meta_reels_video_script_pg": "Generate a concept or script for a Meta Reel. Emphasize visual storytelling, a strong hook, and use of native features like trending audio or text overlays. Aim for authenticity and quick engagement.", "meta_ads_guide_general_link": "Refer to Meta Ads Guide for detailed specs.", "meta_stories_image_bp.fullscreen": "Design for fullscreen vertical (9:16).", "meta_stories_image_bp.interactive": "Utilize interactive elements (polls, stickers).", "meta_stories_image_bp.branding": "Clear branding, visible quickly.", "meta_stories_image_bp.compelling": "Compelling visuals, concise text.", "meta_stories_image_pg": "Generate an image for Meta Stories. Focus on vertical, full-screen impact, and opportunities for interactive elements. Visuals should be captivating and messaging brief.", "meta_stories_video_script_bp.fastpaced": "Fast-paced, engaging content.", "meta_stories_video_script_bp.overlays": "Use text overlays and stickers.", "meta_stories_video_script_bp.sound": "Design for sound-on, but make sense sound-off.", "meta_stories_video_script_bp.swipeup": "Include a clear 'Swipe Up' or CTA.", "meta_stories_video_script_pg": "Create a video script for Meta Stories. Emphasize quick, visually engaging scenes, native features like polls or quizzes, and a clear call to action. Max 60 seconds, but 15s often better.", "meta_feed_image_bp.quality": "High-quality, visually appealing image.", "meta_feed_image_bp.minimaltext": "Minimize text on image.", "meta_feed_image_bp.alignbrand": "Align with brand identity.", "meta_feed_image_bp.focalpoint": "Clear focal point.", "meta_feed_image_pg": "Generate an image for Meta Feed. Consider 1:1 or 4:5 aspect ratios. Image should be high quality with minimal text on it. Focus on a clear message and brand alignment.", "meta_feed_ad_copy_bp.valueprop": "Clear value proposition.", "meta_feed_ad_copy_bp.headline": "Compelling headline (40 chars).", "meta_feed_ad_copy_bp.cta": "Strong Call to Action.", "meta_feed_ad_copy_bp.emojis": "Use emojis appropriately.", "meta_feed_ad_copy_bp.concise": "Keep primary text concise (around 125 chars).", "meta_feed_ad_copy_pg": "Write ad copy for Meta Feed. Include a primary text (approx 125 chars), a headline (40 chars), and a link description (30 chars optional). Focus on clarity, value, and a strong CTA.", "youtube_non_skippable_bp.keymessage": "Deliver key message upfront.", "youtube_non_skippable_bp.branding": "Strong branding within first few seconds.", "youtube_non_skippable_bp.visuals": "Compelling visuals.", "youtube_non_skippable_bp.cta_non_skip": "Clear CTA if applicable (though often for awareness).", "youtube_non_skippable_pg": "Generate a video script for a YouTube Non-Skippable In-Stream Ad (max 15-20s). Focus on immediate impact, clear branding, and delivering the core message quickly.", "google_ads_video_specs_link": "Refer to Google Ads Video specifications for details.", "youtube_bumper_bp.shortmemorable": "Short, memorable message (6s).", "youtube_bumper_bp.oneidea": "Focus on a single, simple idea.", "youtube_bumper_bp.visualsbranding": "Strong visuals and branding.", "youtube_bumper_bp.sequence": "Consider using in a sequence.", "youtube_bumper_pg": "Create a script for a YouTube Bumper Ad (6 seconds). It must be concise, impactful, and leave a lasting impression. Focus on one key message or brand element.", "youtube_abcds_effectiveness": "Follow YouTube's ABCD framework for effective ads (Attract, Brand, Connect, Direct).", "google_ads_bumper_specs_link": "Refer to Google Ads Bumper Ad specifications.", "youtube_trueview_instream_bp.hook5s": "Hook viewers in the first 5 seconds.", "youtube_trueview_instream_bp.story": "Tell a compelling story.", "youtube_trueview_instream_bp.showdonttell": "Show, don't just tell.", "youtube_trueview_instream_bp.cta": "Clear Call to Action.", "youtube_trueview_instream_bp.endscreen": "Use end screens effectively.", "youtube_trueview_instream_pg": "Develop a video script for a YouTube Skippable In-Stream Ad. Grab attention in the first 5 seconds. Provide value to encourage viewers not to skip. Include a clear CTA.", "google_ads_skippable_specs_link": "Refer to Google Ads Skippable In-Stream Ad specifications.", "google_ads_video_action_bp.clear_cta": "Prominent and clear call-to-action.", "google_ads_video_action_bp.value_prop": "Highlight value proposition early.", "google_ads_video_action_bp.various_lengths": "Test various video lengths (10s+ recommended).", "google_ads_video_action_pg": "Generate asset ideas (video script, headlines, descriptions) for a Google Ads Video Action Campaign. Focus on driving conversions with clear CTAs and value propositions.", "google_ads_video_action_specs_link": "Refer to Google Ads Video Action Campaign specs."
};

// Spanish translations
const es = {
  "header": {
    "llycLogo": "LLYC",
    "title": "DM 5 - Specs & Creatives",
    "subtitle": "Genera y valida creatividades publicitarias optimizadas con IA.",
    "langSwitcherLabel": "Idioma:"
  },
  "platformSelector": {
    "label": "Plataforma Publicitaria",
    "selectPlaceholder": "Selecciona una Plataforma"
  },
  "formatSelector": {
    "label": "Formato de Anuncio / Tipo de Creatividad",
    "selectPlaceholder": "Selecciona un Formato",
    "disabledPlaceholder": "Selecciona una plataforma primero"
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
  "fallbackError": "Ocurrió un error inesperado durante la generación.",
  "geminiService": { "errors": { "apiKeyMissing": "API_KEY no está configurada. Por favor, establece la variable de entorno API_KEY.", "imageGenFailed": "La generación de imagen falló o no devolvió datos.", "textGenFailed": "La generación de texto falló o no devolvió datos.", "unknown": "Ocurrió un error desconocido al comunicarse con la API de Gemini.", "apiKeyInvalid": "Error API Gemini: La API Key es inválida, no existe o careces de permisos. Asegúrate de que la variable de entorno API_KEY está correctamente configurada y es válida. Error original: {{originalError}}", "quotaExceeded": "Error API Gemini: Has excedido tu cuota de API. Por favor, revisa tu uso y límites. Error original: {{originalError}}", "apiError": "Error API Gemini: {{originalError}}" } },
  "meta_reels_video_script_bp.hook": "Engancha en los primeros 3s.", "meta_reels_video_script_bp.trending": "Usa audio/efectos en tendencia.", "meta_reels_video_script_bp.vertical": "Graba en vertical (9:16).", "meta_reels_video_script_bp.length": "Sé breve (máx 90s).", "meta_reels_video_script_bp.cta": "Llamada a la Acción clara.", "meta_reels_video_script_bp.captions": "Usa subtítulos/texto superpuesto.", "meta_reels_video_script_pg": "Genera un concepto o guion para un Reel de Meta. Enfatiza la narración visual, un gancho fuerte y el uso de funciones nativas como audio en tendencia o superposiciones de texto. Busca autenticidad y engagement rápido.", "meta_ads_guide_general_link": "Consulta la Guía de Anuncios de Meta para especificaciones detalladas.", "meta_stories_image_bp.fullscreen": "Diseña para vertical a pantalla completa (9:16).", "meta_stories_image_bp.interactive": "Utiliza elementos interactivos (encuestas, stickers).", "meta_stories_image_bp.branding": "Branding claro, visible rápidamente.", "meta_stories_image_bp.compelling": "Visuales atractivos, texto conciso.", "meta_stories_image_pg": "Genera una imagen para Meta Stories. Enfócate en el impacto vertical a pantalla completa y oportunidades para elementos interactivos. Los visuales deben ser cautivadores y el mensaje breve.", "meta_stories_video_script_bp.fastpaced": "Contenido rápido y atractivo.", "meta_stories_video_script_bp.overlays": "Usa superposiciones de texto y stickers.", "meta_stories_video_script_bp.sound": "Diseña para sonido activado, pero que tenga sentido sin sonido.", "meta_stories_video_script_bp.swipeup": "Incluye un 'Desliza hacia arriba' o CTA claro.", "meta_stories_video_script_pg": "Crea un guion de video para Meta Stories. Enfatiza escenas rápidas y visualmente atractivas, funciones nativas como encuestas o quizzes, y una llamada a la acción clara. Máx 60 segundos, pero 15s suele ser mejor.", "meta_feed_image_bp.quality": "Imagen de alta calidad y visualmente atractiva.", "meta_feed_image_bp.minimaltext": "Minimiza el texto en la imagen.", "meta_feed_image_bp.alignbrand": "Alinea con la identidad de marca.", "meta_feed_image_bp.focalpoint": "Punto focal claro.", "meta_feed_image_pg": "Genera una imagen para el Feed de Meta. Considera relaciones de aspecto 1:1 o 4:5. La imagen debe ser de alta calidad con texto mínimo sobre ella. Enfócate en un mensaje claro y alineación de marca.", "meta_feed_ad_copy_bp.valueprop": "Propuesta de valor clara.", "meta_feed_ad_copy_bp.headline": "Titular atractivo (40 car.).", "meta_feed_ad_copy_bp.cta": "Llamada a la Acción fuerte.", "meta_feed_ad_copy_bp.emojis": "Usa emojis apropiadamente.", "meta_feed_ad_copy_bp.concise": "Mantén el texto principal conciso (alrededor de 125 car.).", "meta_feed_ad_copy_pg": "Escribe un copy para un anuncio de Feed de Meta. Incluye un texto principal (aprox 125 car.), un titular (40 car.) y una descripción del enlace (30 car. opcional). Enfócate en claridad, valor y una CTA fuerte.", "youtube_non_skippable_bp.keymessage": "Entrega el mensaje clave al inicio.", "youtube_non_skippable_bp.branding": "Branding fuerte en los primeros segundos.", "youtube_non_skippable_bp.visuals": "Visuales atractivos.", "youtube_non_skippable_bp.cta_non_skip": "CTA claro si aplica (aunque suele ser para notoriedad).", "youtube_non_skippable_pg": "Genera un guion para un anuncio In-Stream No Saltable de YouTube (máx 15-20s). Enfócate en impacto inmediato, branding claro y entrega rápida del mensaje central.", "google_ads_video_specs_link": "Consulta las especificaciones de Vídeo de Google Ads para detalles.", "youtube_bumper_bp.shortmemorable": "Mensaje corto y memorable (6s).", "youtube_bumper_bp.oneidea": "Enfócate en una idea simple y única.", "youtube_bumper_bp.visualsbranding": "Visuales y branding fuertes.", "youtube_bumper_bp.sequence": "Considera usar en secuencia.", "youtube_bumper_pg": "Crea un guion para un Bumper Ad de YouTube (6 segundos). Debe ser conciso, impactante y dejar una impresión duradera. Enfócate en un mensaje clave o elemento de marca.", "youtube_abcds_effectiveness": "Sigue el framework ABCD de YouTube para anuncios efectivos (Atraer, Brandear, Conectar, Dirigir).", "google_ads_bumper_specs_link": "Consulta las especificaciones de Bumper Ads de Google Ads.", "youtube_trueview_instream_bp.hook5s": "Engancha a los espectadores en los primeros 5 segundos.", "youtube_trueview_instream_bp.story": "Cuenta una historia atractiva.", "youtube_trueview_instream_bp.showdonttell": "Muestra, no solo cuentes.", "youtube_trueview_instream_bp.cta": "Llamada a la Acción clara.", "youtube_trueview_instream_bp.endscreen": "Usa las pantallas finales eficazmente.", "youtube_trueview_instream_pg": "Desarrolla un guion para un anuncio In-Stream Saltable de YouTube. Capta la atención en los primeros 5 segundos. Proporciona valor para animar a los espectadores a no saltar. Incluye una CTA clara.", "google_ads_skippable_specs_link": "Consulta las especificaciones de Anuncios In-Stream Saltables de Google Ads.", "google_ads_video_action_bp.clear_cta": "Llamada a la acción prominente y clara.", "google_ads_video_action_bp.value_prop": "Destaca la propuesta de valor pronto.", "google_ads_video_action_bp.various_lengths": "Prueba varias duraciones de video (10s+ recomendado).", "google_ads_video_action_pg": "Genera ideas de activos (guion de video, titulares, descripciones) para una Campaña de Vídeo de Acción de Google Ads. Enfócate en impulsar conversiones con CTAs claras y propuestas de valor.", "google_ads_video_action_specs_link": "Consulta las especificaciones de Campañas de Vídeo de Acción de Google Ads."
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
