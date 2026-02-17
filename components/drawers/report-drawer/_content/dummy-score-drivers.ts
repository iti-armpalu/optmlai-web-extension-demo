/** Highlight region as percentage-based coordinates */
export interface HighlightRegion {
    top: number
    left: number
    width: number
    height: number
}

export interface DetectedItem {
    label: string
    region: HighlightRegion
}

export interface SignalData {
    id: string
    title: string
    summary: string
    description: string
    detected: DetectedItem[]
}

export const dummyScoreDriversTab = {
    intro:
        "These signals explain why your creative scored the way it did. Expand a signal to see what the model detected.",

    signals: [
        {
            id: "brand",
            title: "Brand Presence Signals",
            summary:
                "Strong brand visibility through consistent visual identity reduces cognitive effort.",
            description:
                "Strong brand visibility through consistent visual identity reduces cognitive processing effort, though subtle branding may require repeated exposure for full recognition.",
            detected: [
                {
                    label: "Logo present in top-left",
                    region: { top: 2, left: 2, width: 22, height: 8 },
                },
                {
                    label: "Consistent brand typography",
                    region: { top: 18, left: 5, width: 55, height: 14 },
                },
                {
                    label: "Brand color palette used throughout",
                    region: { top: 0, left: 0, width: 100, height: 100 },
                },
            ],
        },
        {
            id: "message",
            title: "Message Structure & Density",
            summary:
                "Clear message hierarchy enables comprehension within 3\u20135 seconds.",
            description:
                "Clear message hierarchy with moderate information density enables comprehension within 3-5 seconds, though complex concepts may benefit from secondary touchpoints.",
            detected: [
                {
                    label: "Primary headline detected with clear hierarchy",
                    region: { top: 15, left: 5, width: 60, height: 18 },
                },
                {
                    label: "Supporting copy limited to two lines",
                    region: { top: 34, left: 5, width: 50, height: 10 },
                },
            ],
        },
        {
            id: "product",
            title: "Product Information Signals",
            summary:
                "Visual presentation of product features supports immediate recognition.",
            description:
                "Visual presentation of product features supports immediate recognition of the SaaS offering, though technical depth requires extended engagement to fully understand.",
            detected: [
                {
                    label: "Product shown prominently",
                    region: { top: 20, left: 45, width: 52, height: 55 },
                },
                {
                    label: "Feature imagery supports value proposition",
                    region: { top: 45, left: 5, width: 38, height: 30 },
                },
                {
                    label: "UI screenshot visible in hero section",
                    region: { top: 25, left: 48, width: 48, height: 45 },
                },
            ],
        },
        {
            id: "cta",
            title: "Call-to-Action Signals",
            summary:
                "Multiple strategic CTA placements drive visual attention effectively.",
            description:
                "Multiple strategic CTA placements drive visual attention effectively, though the premium positioning may create friction for price-sensitive audiences.",
            detected: [
                {
                    label: "CTA visible in lower section",
                    region: { top: 78, left: 5, width: 30, height: 10 },
                },
                {
                    label: "Contrasting button color draws attention",
                    region: { top: 78, left: 5, width: 20, height: 6 },
                },
            ],
        },
    ],

    footerNote:
        "Understanding these drivers helps you separate design issues from context mismatch, before making changes to the creative.",

} satisfies {
    intro: string
    signals: SignalData[]
    footerNote: string
}