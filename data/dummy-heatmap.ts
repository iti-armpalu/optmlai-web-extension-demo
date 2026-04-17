export const dummyHeatmapData = {
    keyInsight:
        'Viewers notice the headline and hero imagery first (immediate), followed by the product benefits section (early). Body text and CTA receive minimal attention during fast-scrolling or quick-glance moments.',
    imageSrc:
        'https://images.squarespace-cdn.com/content/v1/5ef0ef1b02a1d05e6faff7ac/1593379290858-GI2TYZN1I701KK95J8W2/Ad_page_01.jpg',
    heatmapSrc: '/heatmaps/bose-heatmap-overlay.jpeg',
    intensityScale: [
        { key: 'immediate', label: 'Very High', detail: '85%+ fixation · under 0.5s' },
        { key: 'early', label: 'High', detail: '70–84% fixation · 0.5–1s' },
        { key: 'mid', label: 'Medium', detail: '50–69% fixation · 1–2s' },
        { key: 'late', label: 'Low', detail: '30–49% fixation · 2–4s' },
        { key: 'veryLate', label: 'Very Low', detail: '<30% fixation · 4s+' },
    ],
} as const