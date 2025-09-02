import { Platform, AdFormatSpec, HelpTopic } from './types';

export const PLATFORMS: Platform[] = [
  Platform.META,
  Platform.YOUTUBE,
  Platform.GOOGLE_ADS, // Grouping with YouTube as per some Google Ads docs
  Platform.TIKTOK,
  Platform.LINKEDIN,
  Platform.X_TWITTER,
  Platform.AMAZON,
  Platform.SPOTIFY,
  Platform.DV360, // Digital Out Of Home is often managed via DV360
  Platform.IAB, // General IAB standards
];


export const AD_SPECS_DATA: AdFormatSpec[] = [
  // Meta (Instagram/Facebook)
  {
    id: "meta_reels_video_script",
    platform: Platform.META,
    formatNameKey: "adFormatNames.meta_reels_video_script",
    generationType: "video_script",
    aspectRatio: "9:16",
    maxLength: { value: 90, unit: "seconds" },
    fileTypes: ["MP4", "MOV"],
    maxFileSize: "4GB",
    resolution: "1080x1920 minimum",
    bestPracticesKeys: [
      "meta_reels_video_script_bp.hook", 
      "meta_reels_video_script_bp.trending",
      "meta_reels_video_script_bp.vertical",
      "meta_reels_video_script_bp.length",
      "meta_reels_video_script_bp.cta",
      "meta_reels_video_script_bp.captions"
    ],
    promptGuidanceKey: "meta_reels_video_script_pg",
    notesKey: "meta_ads_guide_general_link",
    sourceUrl: "https://www.facebook.com/business/ads-guide/update?content_id=T8wuJkRscrVtGVS"
  },
  {
    id: "meta_stories_image",
    platform: Platform.META,
    formatNameKey: "adFormatNames.meta_stories_image",
    generationType: "image",
    dimensions: { width: 1080, height: 1920, unit: "px" },
    aspectRatio: "9:16",
    fileTypes: ["JPEG", "PNG"],
    maxFileSize: "30MB",
    bestPracticesKeys: [
      "meta_stories_image_bp.fullscreen",
      "meta_stories_image_bp.interactive",
      "meta_stories_image_bp.branding",
      "meta_stories_image_bp.compelling"
    ],
    promptGuidanceKey: "meta_stories_image_pg",
    notesKey: "meta_ads_guide_general_link",
    sourceUrl: "https://www.facebook.com/business/ads-guide/update?content_id=T8wuJkRscrVtGVS"
  },
   {
    id: "meta_stories_video_script",
    platform: Platform.META,
    formatNameKey: "adFormatNames.meta_stories_video_script",
    generationType: "video_script",
    aspectRatio: "9:16",
    maxLength: { value: 60, unit: "seconds" }, // Max 15s recommended per card for organic, ads can be longer
    fileTypes: ["MP4", "MOV"],
    maxFileSize: "4GB",
    bestPracticesKeys: [
        "meta_stories_video_script_bp.fastpaced",
        "meta_stories_video_script_bp.overlays",
        "meta_stories_video_script_bp.sound",
        "meta_stories_video_script_bp.swipeup"
    ],
    promptGuidanceKey: "meta_stories_video_script_pg",
    notesKey: "meta_ads_guide_general_link",
    sourceUrl: "https://www.facebook.com/business/ads-guide/update?content_id=T8wuJkRscrVtGVS"
  },
  {
    id: "meta_feed_image",
    platform: Platform.META,
    formatNameKey: "adFormatNames.meta_feed_image",
    generationType: "image",
    dimensions: { width: 1080, height: 1080, unit: "px" }, // or 1080x1350 for 4:5
    aspectRatio: "1:1 or 4:5", // 1.91:1 also supported
    fileTypes: ["JPEG", "PNG"],
    maxFileSize: "30MB",
    bestPracticesKeys: [
        "meta_feed_image_bp.quality",
        "meta_feed_image_bp.minimaltext", // Adhere to text in image policies
        "meta_feed_image_bp.alignbrand",
        "meta_feed_image_bp.focalpoint",
    ],
    promptGuidanceKey: "meta_feed_image_pg",
    notesKey: "meta_ads_guide_general_link",
    sourceUrl: "https://www.facebook.com/business/ads-guide/update?content_id=T8wuJkRscrVtGVS"
  },
  {
    id: "meta_feed_ad_copy",
    platform: Platform.META,
    formatNameKey: "adFormatNames.meta_feed_ad_copy",
    generationType: "ad_copy",
    maxLength: { value: 125, unit: "characters" }, // Primary text. Headline: 40 chars. Description: 30 chars.
    bestPracticesKeys: [
        "meta_feed_ad_copy_bp.valueprop",
        "meta_feed_ad_copy_bp.headline",
        "meta_feed_ad_copy_bp.cta",
        "meta_feed_ad_copy_bp.emojis",
        "meta_feed_ad_copy_bp.concise"
    ],
    promptGuidanceKey: "meta_feed_ad_copy_pg",
    notesKey: "meta_ads_guide_general_link",
    sourceUrl: "https://www.facebook.com/business/ads-guide/update?content_id=T8wuJkRscrVtGVS"
  },

  // YouTube Ads / Google Ads Video
  {
    id: "youtube_non_skippable_in_stream_video_script",
    platform: Platform.YOUTUBE, // Could also be GOOGLE_ADS
    formatNameKey: "adFormatNames.youtube_non_skippable_in_stream_video_script",
    generationType: "video_script",
    maxLength: { value: 15, unit: "seconds" }, // Max 15 or 20 secs depending on region, 30s in some cases. Check Google Ads specs.
    aspectRatio: "16:9, 1:1, 4:5, 9:16",
    fileTypes: ["MP4"],
    resolution: "Recommended: 1080p (1920x1080)",
    bestPracticesKeys: [
        "youtube_non_skippable_bp.keymessage",
        "youtube_non_skippable_bp.branding",
        "youtube_non_skippable_bp.visuals",
        "youtube_non_skippable_bp.cta_non_skip"
    ],
    notesKey: "google_ads_video_specs_link",
    sourceUrl: "https://support.google.com/google-ads/answer/2375464?hl=en&ref_topic=10275346#zippy=%2Cnon-skippable-in-stream-ads",
    promptGuidanceKey: "youtube_non_skippable_pg"
  },
  {
    id: "youtube_bumper_ad_video_script",
    platform: Platform.YOUTUBE, // Could also be GOOGLE_ADS
    formatNameKey: "adFormatNames.youtube_bumper_ad_video_script",
    generationType: "video_script",
    maxLength: { value: 6, unit: "seconds" },
    aspectRatio: "16:9",
    fileTypes: ["MP4"],
    bestPracticesKeys: [
        "youtube_bumper_bp.shortmemorable",
        "youtube_bumper_bp.oneidea",
        "youtube_bumper_bp.visualsbranding",
        "youtube_bumper_bp.sequence",
        "youtube_abcds_effectiveness"
    ],
    notesKey: "google_ads_bumper_specs_link",
    sourceUrl: "https://support.google.com/google-ads/answer/2375464?hl=en&ref_topic=10275346#zippy=%2Cbumper-ads",
    promptGuidanceKey: "youtube_bumper_pg"
  },
   {
    id: "youtube_trueview_instream_video_script", // Skippable in-stream
    platform: Platform.YOUTUBE, // Could also be GOOGLE_ADS
    formatNameKey: "adFormatNames.youtube_trueview_in_stream_video_script",
    generationType: "video_script",
    // No max length, but viewers can skip after 5s. Recommended < 3 mins.
    maxLength: { value: 180, unit: "seconds" }, // Example, technically no limit
    aspectRatio: "16:9",
    fileTypes: ["MP4"],
    bestPracticesKeys: [
        "youtube_trueview_instream_bp.hook5s",
        "youtube_trueview_instream_bp.story",
        "youtube_trueview_instream_bp.showdonttell",
        "youtube_trueview_instream_bp.cta",
        "youtube_trueview_instream_bp.endscreen",
        "youtube_abcds_effectiveness"
    ],
    notesKey: "google_ads_skippable_specs_link",
    sourceUrl: "https://support.google.com/google-ads/answer/2375464?hl=en&ref_topic=10275346#zippy=%2Cskippable-in-stream-ads",
    promptGuidanceKey: "youtube_trueview_instream_pg"
  },
  {
    id: "google_ads_video_action_campaign",
    platform: Platform.GOOGLE_ADS,
    formatNameKey: "adFormatNames.google_ads_video_action_campaign",
    generationType: "video_script", // and text assets
    aspectRatio: "16:9, 1:1, 4:5, 9:16",
    fileTypes: ["MP4"],
    bestPracticesKeys: [
        "google_ads_video_action_bp.clear_cta",
        "google_ads_video_action_bp.value_prop",
        "google_ads_video_action_bp.various_lengths",
        "youtube_abcds_effectiveness"
    ],
    notesKey: "google_ads_video_action_specs_link",
    sourceUrl: "https://support.google.com/google-ads/answer/2375464?hl=en&ref_topic=10275346#zippy=%2Cvideo-action-campaigns",
    promptGuidanceKey: "google_ads_video_action_pg"
  },


  // TikTok Ads
  {
    id: "tiktok_in_feed_ad_video_script",
    platform: Platform.TIKTOK,
    formatNameKey: "adFormatNames.tiktok_in_feed_ad_video_script",
    generationType: "video_script",
    aspectRatio: "9:16",
    maxLength: { value: 60, unit: "seconds" }, // Recommended 5-60s, sweet spot often 9-15s.
    fileTypes: ["MP4", "MOV", "MPEG", "3GP"],
    maxFileSize: "500MB",
    resolution: "720x1280px",
    bestPracticesKeys: [
        "tiktok_infeed_bp.nativelook",
        "tiktok_infeed_bp.ugc",
        "tiktok_infeed_bp.hook3s",
        "tiktok_infeed_bp.trends",
        "tiktok_infeed_bp.ctaontext",
        "tiktok_bp_sound_on",
        "tiktok_bp_vertical_video"
    ],
    promptGuidanceKey: "tiktok_infeed_pg",
    notesKey: "tiktok_ads_guide_link",
    sourceUrl: "https://ads.tiktok.com/help/category?id=6dGs4bNMAZSdPr4pQ0KFuX" // General category, best to also link best practices
  },
   {
    id: "tiktok_lead_gen_form_concept",
    platform: Platform.TIKTOK,
    formatNameKey: "adFormatNames.tiktok_lead_gen_form_concept",
    generationType: "form_concept",
    bestPracticesKeys: [
        "tiktok_leadgen_bp.offer",
        "tiktok_leadgen_bp.minimalfields",
        "tiktok_leadgen_bp.compellingcopy",
        "tiktok_leadgen_bp.visuals"
    ],
    promptGuidanceKey: "tiktok_leadgen_pg",
    notesKey: "tiktok_ads_lead_gen_link",
    sourceUrl: "https://ads.tiktok.com/help/article/lead-generation?lang=en" // More specific than category
  },

  // LinkedIn Ads
  {
    id: "linkedin_single_image_ad",
    platform: Platform.LINKEDIN,
    formatNameKey: "adFormatNames.linkedin_single_image_ad_concept",
    generationType: "image",
    dimensions: { width: 1200, height: 627, unit: "px" }, // For 1.91:1. Also 1:1 (1200x1200)
    aspectRatio: "1.91:1 or 1:1",
    fileTypes: ["JPEG", "PNG", "GIF"],
    maxFileSize: "5MB",
    bestPracticesKeys: [
        "linkedin_singleimage_bp.professionalimage",
        "linkedin_singleimage_bp.valuepropcopy",
        "linkedin_singleimage_bp.targetedmessaging",
        "linkedin_singleimage_bp.strongcta",
        "linkedin_bp_clear_headline",
        "linkedin_bp_concise_intro_text" // Max 150 chars intro text recommended
    ],
    promptGuidanceKey: "linkedin_singleimage_pg",
    notesKey: "linkedin_ads_guide_image_link",
    sourceUrl: "https://www.linkedin.com/business/marketing/ads-guide" // Updated to main ads guide
  },
  {
    id: "linkedin_video_ad_script",
    platform: Platform.LINKEDIN,
    formatNameKey: "adFormatNames.linkedin_video_ad_script",
    generationType: "video_script",
    maxLength: { value: 1800, unit: "seconds" }, // Recommended < 15 seconds for awareness, <30s for consideration. Max 30 mins (1800s).
    aspectRatio: "16:9, 1:1, 4:5, 9:16",
    fileTypes: ["MP4"],
    maxFileSize: "200MB",
    bestPracticesKeys: [
        "linkedin_video_bp.capture_attention_early",
        "linkedin_video_bp.design_for_sound_off",
        "linkedin_video_bp.clear_narrative",
        "linkedin_video_bp.strong_cta_video",
        "linkedin_bp_show_what_you_do"
    ],
    promptGuidanceKey: "linkedin_video_pg",
    notesKey: "linkedin_ads_guide_video_link",
    sourceUrl: "https://www.linkedin.com/business/marketing/ads-guide" // Updated to main ads guide
  },


  // Google Ads (Display, Search)
   {
    id: "google_display_ad_image", 
    platform: Platform.GOOGLE_ADS,
    formatNameKey: "adFormatNames.google_display_ad_image_concept",
    generationType: "image",
    dimensions: { width: 300, height: 250, unit: "px" }, // Example, many sizes
    aspectRatio: "1.2:1", // For 300x250, simplified from 1.2
    fileTypes: ["JPEG", "PNG", "GIF"],
    maxFileSize: "150KB",
    bestPracticesKeys: [
        "google_display_bp.appealingclear",
        "google_display_bp.strongbranding",
        "google_display_bp.concisemessage",
        "google_display_bp.clearcta_display",
        "google_display_bp.policies",
        "google_display_bp_landing_page_relevance"
    ],
    promptGuidanceKey: "google_display_pg",
    notesKey: "google_ads_display_specs_link",
    sourceUrl: "https://support.google.com/google-ads/answer/9823397?hl=en"
  },
  {
    id: "google_search_ad_copy",
    platform: Platform.GOOGLE_ADS,
    formatNameKey: "adFormatNames.google_search_ad_copy",
    generationType: "ad_copy",
    // Responsive Search Ads: Multiple Headlines (3-15, 30 chars each), Descriptions (2-4, 90 chars each)
    maxLength: { value: 30, unit: "characters" }, // Per headline
    bestPracticesKeys: [
        "google_search_bp.keywords",
        "google_search_bp.usps",
        "google_search_bp.strongcta_search",
        "google_search_bp.extensions",
        "google_search_bp.matchlandingpage",
        "google_search_bp_pinning_assets"
    ],
    promptGuidanceKey: "google_search_pg",
    notesKey: "google_ads_search_specs_link",
    sourceUrl: "https://support.google.com/google-ads/answer/7057010" // RSA specs
  },
  {
    id: "google_ads_performance_max_assets",
    platform: Platform.GOOGLE_ADS,
    formatNameKey: "adFormatNames.google_ads_performance_max_assets",
    generationType: "asset_ideas", // Text, Image, Video
    bestPracticesKeys: [
        "google_pmax_bp.provide_variety_assets",
        "google_pmax_bp.high_quality_creative",
        "google_pmax_bp.audience_signals",
        "google_pmax_bp.refresh_creatives"
    ],
    notesKey: "google_ads_pmax_specs_link",
    sourceUrl: "https://support.google.com/google-ads/answer/10724492",
    promptGuidanceKey: "google_ads_pmax_pg"
  },

  // IAB Formats
  {
    id: "iab_digital_video_linear_ad_concept",
    platform: Platform.IAB, // Often delivered via DV360 or other DSPs
    formatNameKey: "adFormatNames.iab_digital_video_linear_ad_concept",
    generationType: "video_script",
    aspectRatio: "16:9, 4:3, 21:9",
    maxLength: {value: 30, unit: "seconds"}, // Common, but varies
    fileTypes: ["MP4"],
    bestPracticesKeys: [
        "iab_linearvideo_bp.soundon",
        "iab_linearvideo_bp.skippable", // Consider skippable nature
        "iab_linearvideo_bp.brandingmessaging",
        "iab_linearvideo_bp.controls", // User controls awareness
        "iab_lean_principles" // Apply LEAN principles
    ],
    notesKey: "iab_new_ad_portfolio_link",
    sourceUrl: "https://iabtechlab.com/standards/iab-new-ad-portfolio-guidelines/",
    promptGuidanceKey: "iab_linearvideo_pg"
  },
  {
    id: "iab_new_ad_portfolio_lean_concept", // Example: Flexible Ad Format
    platform: Platform.IAB,
    formatNameKey: "adFormatNames.iab_new_ad_portfolio_lean_concept",
    generationType: "creative_concept",
    bestPracticesKeys: [
        "iab_lean_bp.leanprinciples", // L.E.A.N. = Light, Encrypted, AdChoices supported, Non-invasive
        "iab_lean_bp.userexp",
        "iab_lean_bp.fastload",
        "iab_lean_bp.respect_user_choice"
    ],
    notesKey: "iab_lean_guide_link",
    sourceUrl: "https://iabtechlab.com/what-does-it-mean-to-be-lean/",
    promptGuidanceKey: "iab_lean_pg"
  },

  // DV360
  {
    id: "dv360_dooh_concept",
    platform: Platform.DV360,
    formatNameKey: "adFormatNames.dv360_dooh_concept",
    generationType: "creative_concept", // Can be static image or short video
    // Specs vary wildly by screen provider. Focus on general best practices.
    bestPracticesKeys: [
        "dv360_dooh_bp.bold_visuals",
        "dv360_dooh_bp.minimal_text",
        "dv360_dooh_bp.context_awareness", // Time of day, location
        "dv360_dooh_bp.clear_branding",
        "dv360_dooh_bp.dynamic_capabilities" // If using dynamic content
    ],
    notesKey: "dv360_dooh_support_link",
    sourceUrl: "https://support.google.com/displayvideo/answer/12488167?hl=en",
    promptGuidanceKey: "dv360_dooh_pg"
  },
  {
    id: "dv360_video_best_practices_script", // General video for DV360
    platform: Platform.DV360,
    formatNameKey: "adFormatNames.dv360_video_concept",
    generationType: "video_script",
    fileTypes: ["MP4"],
    bestPracticesKeys: [
      "dv360_video_bp.hook_early",
      "dv360_video_bp.sound_off_design",
      "dv360_video_bp.branding_prominent",
      "dv360_video_bp.clear_cta_dv_video",
      "dv360_video_bp.mobile_first_consideration"
    ],
    notesKey: "dv360_video_best_practices_link_es",
    sourceUrl: "https://developers.google.com/authorized-buyers/rtb/video_best_practices?hl=es-419",
    promptGuidanceKey: "dv360_video_pg"
  },

  // Amazon Advertising
  {
    id: "amazon_sponsored_products_copy",
    platform: Platform.AMAZON,
    formatNameKey: "adFormatNames.amazon_sponsored_products_copy",
    generationType: "listing_copy", // Focus on title, bullet points, description for product listing
    bestPracticesKeys: [
      "amazon_sp_bp.keyword_rich_title",
      "amazon_sp_bp.benefit_driven_bullets",
      "amazon_sp_bp.clear_description",
      "amazon_sp_bp.high_quality_images_concept" // Though we generate copy, image concept is related
    ],
    notesKey: "amazon_sp_link",
    sourceUrl: "https://advertising.amazon.com/solutions/products/sponsored-products",
    promptGuidanceKey: "amazon_sp_pg"
  },
  {
    id: "amazon_sponsored_brands_headline_concept",
    platform: Platform.AMAZON,
    formatNameKey: "adFormatNames.amazon_sponsored_brands_headline_logo_concept",
    generationType: "creative_concept", // Headline, logo, product images selection
    maxLength: {value: 50, unit: "characters"}, // Custom headline for some formats
    bestPracticesKeys: [
      "amazon_sb_bp.compelling_headline",
      "amazon_sb_bp.consistent_branding",
      "amazon_sb_bp.feature_multiple_products",
      "amazon_sb_bp.landing_page_relevance"
    ],
    notesKey: "amazon_sb_link",
    sourceUrl: "https://advertising.amazon.com/solutions/products/sponsored-brands",
    promptGuidanceKey: "amazon_sb_pg"
  },
  {
    id: "amazon_video_ad_script_streaming",
    platform: Platform.AMAZON,
    formatNameKey: "adFormatNames.amazon_video_ad_script",
    generationType: "video_script",
    maxLength: {value: 15, unit: "seconds"}, // Common for non-skippable on FireTV/Twitch
    aspectRatio: "16:9",
    fileTypes: ["MP4"],
    bestPracticesKeys: [
      "amazon_video_bp.clear_message_video",
      "amazon_video_bp.high_quality_production",
      "amazon_video_bp.prominent_branding_video",
      "amazon_video_bp.relevant_cta_video"
    ],
    notesKey: "amazon_video_specs_link",
    sourceUrl: "https://advertising.amazon.com/resources/ad-specs/custom-media/amazon-video-ads",
    promptGuidanceKey: "amazon_video_pg"
  },
  {
    id: "amazon_audio_ad_script",
    platform: Platform.AMAZON,
    formatNameKey: "adFormatNames.amazon_audio_ad_script",
    generationType: "audio_script",
    maxLength: {value: 30, unit: "seconds"}, // Typically 10-30s
    bestPracticesKeys: [
      "amazon_audio_bp.clear_voiceover",
      "amazon_audio_bp.engaging_script",
      "amazon_audio_bp.mention_brand_early",
      "amazon_audio_bp.specific_cta_audio"
    ],
    notesKey: "amazon_audio_link",
    sourceUrl: "https://advertising.amazon.com/solutions/products/audio-ads",
    promptGuidanceKey: "amazon_audio_pg"
  },


  // Spotify Ads
  {
    id: "spotify_audio_ad_script",
    platform: Platform.SPOTIFY,
    formatNameKey: "adFormatNames.spotify_audio_ad_script",
    generationType: "audio_script",
    maxLength: { value: 30, unit: "seconds" }, // Max 30s
    bestPracticesKeys: [
      "spotify_audio_bp.speak_to_listener",
      "spotify_audio_bp.clear_cta_audio",
      "spotify_audio_bp.create_scene_sound",
      "spotify_audio_bp.music_selection_important",
      "spotify_audio_bp.voice_actor_match"
    ],
    notesKey: "spotify_audio_specs_link",
    sourceUrl: "https://ads.spotify.com/es-ES/ad-formats/audio-ads/",
    promptGuidanceKey: "spotify_audio_pg"
  },
  {
    id: "spotify_video_takeover_script", // Vertical Video
    platform: Platform.SPOTIFY,
    formatNameKey: "adFormatNames.spotify_video_takeover_script",
    generationType: "video_script",
    aspectRatio: "9:16",
    maxLength: { value: 30, unit: "seconds" },
    fileTypes: ["MP4", "MOV"],
    maxFileSize: "500MB",
    bestPracticesKeys: [
      "spotify_video_bp.sound_on_experience",
      "spotify_video_bp.vertical_first",
      "spotify_video_bp.quick_cuts_engaging",
      "spotify_video_bp.brand_early_often"
    ],
    notesKey: "spotify_video_specs_link",
    sourceUrl: "https://ads.spotify.com/es-ES/ad-formats/video-ads/",
    promptGuidanceKey: "spotify_video_pg"
  },

  // X (Twitter) Ads
  {
    id: "x_twitter_image_ad",
    platform: Platform.X_TWITTER,
    formatNameKey: "adFormatNames.x_twitter_image_ad_concept",
    generationType: "image",
    aspectRatio: "16:9 or 1:1",
    fileTypes: ["JPEG", "PNG", "GIF"],
    maxFileSize: "5MB",
    maxLength: { value: 280, unit: "characters"}, // Tweet copy
    bestPracticesKeys: [
      "x_image_bp.visually_compelling",
      "x_image_bp.minimal_text_on_image",
      "x_image_bp.clear_branding_x",
      "x_image_bp.concise_tweet_copy",
      "x_image_bp.relevant_hashtags"
    ],
    notesKey: "x_ads_creative_specs_link",
    sourceUrl: "https://business.x.com/en/help/campaign-setup/creative-ad-specifications",
    promptGuidanceKey: "x_image_pg"
  },
  {
    id: "x_twitter_video_ad_script",
    platform: Platform.X_TWITTER,
    formatNameKey: "adFormatNames.x_twitter_video_ad_script",
    generationType: "video_script",
    maxLength: { value: 140, unit: "seconds" }, // Max 2 min 20 secs. Recommended < 15s.
    aspectRatio: "1:1 or 16:9",
    fileTypes: ["MP4", "MOV"],
    maxFileSize: "1GB",
    bestPracticesKeys: [
      "x_video_bp.hook_first_3s",
      "x_video_bp.brand_prominently_video",
      "x_video_bp.captions_sound_off",
      "x_video_bp.clear_cta_x_video",
      "x_video_bp.mobile_optimized_video"
    ],
    notesKey: "x_ads_creative_specs_link",
    sourceUrl: "https://business.x.com/en/help/campaign-setup/creative-ad-specifications",
    promptGuidanceKey: "x_video_pg"
  },

];

export const DEFAULT_FEEDBACK_RECIPIENTS = "luisma.nunez@llyc.global,marta.devicente@llyc.global,cesar.diez@llyc.global";

export const HELP_TOPICS_LIST: HelpTopic[] = [
  {
    id: 'topic_about_app',
    questionKey: 'helpTopics.aboutApp.question',
    answerKey: 'helpTopics.aboutApp.answer',
  },
  {
    id: 'topic_generating_assets',
    questionKey: 'helpTopics.generatingAssets.question',
    answerKey: 'helpTopics.generatingAssets.answer',
  },
   {
    id: 'topic_validating_assets',
    questionKey: 'helpTopics.validatingAssets.question',
    answerKey: 'helpTopics.validatingAssets.answer',
  },
  {
    id: 'topic_api_key',
    questionKey: 'helpTopics.apiKey.question',
    answerKey: 'helpTopics.apiKey.answer',
  },
  {
    id: 'topic_interpreting_results',
    questionKey: 'helpTopics.interpretingResults.question',
    answerKey: 'helpTopics.interpretingResults.answer',
  }
];