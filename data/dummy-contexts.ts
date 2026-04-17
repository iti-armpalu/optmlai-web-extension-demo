import type { ContextCardData } from '@/types/context-card'

// ─── New typed data for new ContextCard components ───────────────────────────

export const dummyContextData: ContextCardData[] = [

    // RETAIL
    {
        id: 'proximity',
        name: 'Proximity (Billboards / OOH)',
        channel: 'Retail',
        environmentDescription: 'Billboards, transit ads, outdoor signage',
        exposureTime: '1–2s',
        fixationWindow: '1–2s',
        deploymentState: 'fix-first',
        recommendation: 'Fix the 2 issues below before running here, or accept reduced brand recall and missed CTA.',
        behavioralContext: 'People are passing by with limited attention and no purchase intent. Messages are processed quickly and remembered later — not acted on immediately.',
        heatmapSrc: '/heatmaps/placeholder.jpg',
        observations: [
            {
                id: 'proximity-obs-1',
                type: 'issue',
                text: 'Product benefits require more time than available in pass-by scenarios.',
                boundingBox: { x: 10, y: 55, width: 80, height: 20, label: 'Product Benefits' },
            },
            {
                id: 'proximity-obs-2',
                type: 'issue',
                text: 'CTA is rarely processed in quick-glance contexts.',
                boundingBox: { x: 20, y: 78, width: 60, height: 12, label: 'CTA Button' },
            },
            {
                id: 'proximity-obs-3',
                type: 'strength',
                text: 'Headline and hero image capture attention immediately.',
                boundingBox: { x: 5, y: 5, width: 90, height: 45, label: 'Hero Image' },
            },
        ],
    },

    {
        id: 'transition',
        name: 'Transition (Entrance / Windows)',
        channel: 'Retail',
        environmentDescription: 'Store entrances, window displays, escalator ads',
        exposureTime: '2–4s',
        fixationWindow: '2–4s',
        deploymentState: 'run-it',
        recommendation: 'This creative is ready to run in this context.',
        behavioralContext: 'People are in motion but mentally transitioning into shopping mode. They are open to new information but not yet evaluating deeply.',
        heatmapSrc: '/heatmaps/placeholder.jpg',
        observations: [
            {
                id: 'transition-obs-1',
                type: 'strength',
                text: 'Strong initial visual hook maintains interest during transition.',
                boundingBox: { x: 5, y: 5, width: 90, height: 50, label: 'Hero Image' },
            },
            {
                id: 'transition-obs-2',
                type: 'strength',
                text: 'Message hierarchy supports quick scanning.',
                boundingBox: { x: 5, y: 55, width: 90, height: 25, label: 'Message Block' },
            },
        ],
    },

    {
        id: 'impulse',
        name: 'Impulse (Checkout / Promo)',
        channel: 'Retail',
        environmentDescription: 'Checkout lanes, end caps, promotional displays',
        exposureTime: '3–5s',
        fixationWindow: '3–5s',
        deploymentState: 'fix-first',
        recommendation: 'Simplify before running here — reduce text and surface one clear benefit or lose the impulse window.',
        behavioralContext: 'People are in decision mode with wallet out. They are evaluating if something is worth adding to their cart right now.',
        heatmapSrc: '/heatmaps/placeholder.jpg',
        observations: [
            {
                id: 'impulse-obs-1',
                type: 'issue',
                text: 'Dense copy slows comprehension at the critical decision moment.',
                boundingBox: { x: 10, y: 40, width: 80, height: 35, label: 'Body Copy' },
            },
            {
                id: 'impulse-obs-2',
                type: 'issue',
                text: 'Value proposition is not instantly clear at 3–5s.',
                boundingBox: { x: 10, y: 60, width: 80, height: 20, label: 'Value Prop' },
            },
            {
                id: 'impulse-obs-3',
                type: 'strength',
                text: 'Visual strength creates initial interest.',
                boundingBox: { x: 5, y: 5, width: 90, height: 35, label: 'Hero Image' },
            },
        ],
    },

    {
        id: 'destination',
        name: 'Destination (Shelf / Aisle)',
        channel: 'Retail',
        environmentDescription: 'Product shelves, in-aisle displays, comparison shopping',
        exposureTime: '5–15s',
        fixationWindow: '5–15s',
        deploymentState: 'wrong-context',
        recommendation: "Don't place this creative here. Extended viewing exposes clarity gaps that break down evaluation confidence.",
        behavioralContext: 'People are actively comparing options with time to read details. They are looking for reasons to choose one product over another.',
        heatmapSrc: '/heatmaps/placeholder.jpg',
        observations: [
            {
                id: 'destination-obs-1',
                type: 'issue',
                text: 'Text density and lack of hierarchy make information hard to absorb.',
                boundingBox: { x: 10, y: 30, width: 80, height: 40, label: 'Copy Block' },
            },
            {
                id: 'destination-obs-2',
                type: 'issue',
                text: 'Missing clear differentiation points for comparison shopping.',
                boundingBox: { x: 10, y: 70, width: 80, height: 20, label: 'Benefits Area' },
            },
            {
                id: 'destination-obs-3',
                type: 'strength',
                text: 'Visual design attracts initial attention.',
                boundingBox: { x: 5, y: 5, width: 90, height: 25, label: 'Hero Image' },
            },
        ],
    },

    // E-COMMERCE
    {
        id: 'discovery',
        name: 'Discovery (Category Pages)',
        channel: 'E-commerce',
        environmentDescription: 'Product grid thumbnails, category browsing, search results',
        exposureTime: '0.5–3s',
        fixationWindow: '0.5–3s',
        deploymentState: 'run-it',
        recommendation: 'This creative is ready to run. Strong visual contrast optimized for grid scanning.',
        behavioralContext: 'People are rapidly scanning dozens of options looking for anything that stands out. They are not reading — they are filtering visually.',
        heatmapSrc: '/heatmaps/placeholder.jpg',
        observations: [
            {
                id: 'discovery-obs-1',
                type: 'strength',
                text: 'High contrast and bold elements capture attention in crowded grids.',
                boundingBox: { x: 0, y: 0, width: 100, height: 60, label: 'Hero Zone' },
            },
            {
                id: 'discovery-obs-2',
                type: 'strength',
                text: 'Headline remains legible when scaled down to thumbnail.',
                boundingBox: { x: 5, y: 60, width: 90, height: 20, label: 'Headline' },
            },
        ],
    },

    {
        id: 'evaluation',
        name: 'Evaluation (PDP Features)',
        channel: 'E-commerce',
        environmentDescription: 'Product detail pages, feature comparisons, specification reading',
        exposureTime: '5–20s',
        fixationWindow: '5–20s',
        deploymentState: 'wrong-context',
        recommendation: "Don't place this creative here. Restructure with clear sections and bullet points before using in evaluation contexts.",
        behavioralContext: 'People are invested and reading carefully. They want to understand exactly what they are getting before committing to purchase.',
        heatmapSrc: '/heatmaps/placeholder.jpg',
        observations: [
            {
                id: 'evaluation-obs-1',
                type: 'issue',
                text: 'Dense paragraphs slow down information processing at evaluation stage.',
                boundingBox: { x: 10, y: 30, width: 80, height: 45, label: 'Body Copy' },
            },
            {
                id: 'evaluation-obs-2',
                type: 'issue',
                text: 'Key differentiators are not prominently called out.',
                boundingBox: { x: 10, y: 60, width: 80, height: 25, label: 'Benefits' },
            },
        ],
    },

    {
        id: 'conversion',
        name: 'Conversion (Cart / Checkout)',
        channel: 'E-commerce',
        environmentDescription: 'Shopping cart, checkout page, last-mile reassurance',
        exposureTime: '5–15s',
        fixationWindow: '5–15s',
        deploymentState: 'fix-first',
        recommendation: 'Add trust signals and simplify messaging before running here to reduce conversion hesitation.',
        behavioralContext: 'People are on the verge of purchasing but seeking final reassurance. Any confusion or uncertainty can cause cart abandonment.',
        heatmapSrc: '/heatmaps/placeholder.jpg',
        observations: [
            {
                id: 'conversion-obs-1',
                type: 'issue',
                text: 'Message complexity creates cognitive friction at the decision point.',
                boundingBox: { x: 10, y: 35, width: 80, height: 35, label: 'Message Block' },
            },
            {
                id: 'conversion-obs-2',
                type: 'issue',
                text: 'Missing clear trust signals and guarantees.',
                boundingBox: { x: 10, y: 72, width: 80, height: 15, label: 'Trust Zone' },
            },
            {
                id: 'conversion-obs-3',
                type: 'strength',
                text: 'Visual appeal maintains interest at checkout.',
                boundingBox: { x: 5, y: 5, width: 90, height: 30, label: 'Hero Image' },
            },
        ],
    },

    // SOCIAL
    {
        id: 'awareness',
        name: 'Awareness (Thumb-Stop)',
        channel: 'Social',
        environmentDescription: 'Social media feeds, story placements, scroll-based content',
        exposureTime: '0.5–2s',
        fixationWindow: '0.5–2s',
        deploymentState: 'run-it',
        recommendation: 'This creative is ready to run. Exceptional thumb-stopping power for feed environments.',
        behavioralContext: 'People are mindlessly scrolling through entertainment content. They are not looking for ads — you have to physically stop their thumb.',
        heatmapSrc: '/heatmaps/placeholder.jpg',
        observations: [
            {
                id: 'awareness-obs-1',
                type: 'strength',
                text: 'High visual contrast breaks the scroll pattern instantly.',
                boundingBox: { x: 0, y: 0, width: 100, height: 55, label: 'Hero Zone' },
            },
            {
                id: 'awareness-obs-2',
                type: 'strength',
                text: 'Headline front-loads the message in the first few words.',
                boundingBox: { x: 5, y: 55, width: 90, height: 18, label: 'Headline' },
            },
        ],
    },

    {
        id: 'consideration',
        name: 'Consideration (Pause & Evaluate)',
        channel: 'Social',
        environmentDescription: 'Paused feed viewing, saved posts, second looks',
        exposureTime: '3–8s',
        fixationWindow: '3–8s',
        deploymentState: 'run-it',
        recommendation: 'Ready to run. Test adding social proof to further strengthen conversion from this context.',
        behavioralContext: "People have stopped scrolling and are considering if this is relevant to them. They are asking 'Is this for me? Why should I care?'",
        heatmapSrc: '/heatmaps/placeholder.jpg',
        observations: [
            {
                id: 'consideration-obs-1',
                type: 'strength',
                text: 'Strong visual and emotional appeal sustains engagement past the scroll.',
                boundingBox: { x: 0, y: 0, width: 100, height: 55, label: 'Hero Zone' },
            },
            {
                id: 'consideration-obs-2',
                type: 'strength',
                text: 'Supporting copy provides enough context for consideration.',
                boundingBox: { x: 5, y: 55, width: 90, height: 25, label: 'Body Copy' },
            },
        ],
    },

    {
        id: 'validation',
        name: 'Validation (Social Proof Check)',
        channel: 'Social',
        environmentDescription: 'Profile visits, comment reading, credibility assessment',
        exposureTime: '5–15s',
        fixationWindow: '5–15s',
        deploymentState: 'fix-first',
        recommendation: 'Add visible reviews or credentials before running here — validation-seekers need trust signals this creative lacks.',
        behavioralContext: 'People are interested but skeptical. They are checking comments, looking at the brand profile, and seeking validation before taking action.',
        heatmapSrc: '/heatmaps/placeholder.jpg',
        observations: [
            {
                id: 'validation-obs-1',
                type: 'issue',
                text: 'No visible social proof or authority markers.',
                boundingBox: { x: 10, y: 60, width: 80, height: 25, label: 'Trust Zone' },
            },
            {
                id: 'validation-obs-2',
                type: 'issue',
                text: 'Dense copy makes credibility assessment harder.',
                boundingBox: { x: 10, y: 35, width: 80, height: 25, label: 'Body Copy' },
            },
            {
                id: 'validation-obs-3',
                type: 'strength',
                text: 'Visual appeal gets attention and creates initial interest.',
                boundingBox: { x: 0, y: 0, width: 100, height: 35, label: 'Hero Zone' },
            },
        ],
    },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getContextsByChannel(channel: ContextCardData['channel']) {
    return dummyContextData.filter((c) => c.channel === channel)
}

export function getAllContexts() {
    return dummyContextData
}

// ─── Key insight — still used by ContextsTab banner ──────────────────────────

export const keyInsight =
    'This creative performs strongest in fast-scanning environments where brand and message are processed quickly, but loses effectiveness in slower, comparison-driven contexts that require deeper product understanding.'