export const dummyOverviewTab = {
    intro:
        "This evaluation is a summary of 10 different contexts across retail, e-commerce, and social environments. View detailed performance for each context in the Contexts tab.",

    metrics: [
        {
            title: "Visual Impact",
            value: "High",
            description: "Above average attention capture",
            tooltip: "Measures how effectively the creative captures and holds visual attention within the first 2-3 seconds.",
            explanation: "Strong product imagery and brand placement drive high visual salience, though CTA contrast could be improved.",
            tone: "positive",
        },
        {
            title: "Cognitive Impact",
            value: "Medium",
            description: "Moderate message processing ease",
            tooltip: "Measures how quickly and easily the viewer can understand the core message and value proposition.",
            explanation: "Clear headline hierarchy aids comprehension, but information density in the body slows processing slightly.",
            tone: "neutral",
        },
        {
            title: "Best Performing Context",
            value: "Retail - Proximity",
            description: "Highest predicted effectiveness near point of sale",
            tooltip: "Identifies the viewing context where this creative is predicted to perform strongest based on signal alignment.",
            explanation: "Strong brand presence and clear CTA align well with purchase-intent environments like retail and e-commerce.",
            tone: "positive",
        },
    ],

    summary: {
        title: "Performance Summary & Strategic Recommendation",

        bestPerforming: {
            label: "Best Performing",
            value: "{{bestContext.name}}",
            context: "{{bestContext.category}} Context",
        },

        needsImprovement: {
            label: "Needs Improvement",
            value: "Evaluation Contexts",
            detail: "PDP Features & Destination",
            range: "52–58%",
            rangeLabel: "Clarity Range",
        },

        quickWin: {
            label: "Quick Win",
            value: "Text Hierarchy",
            impact: "+15% clarity gain",
            effort: "Low Effort",
        },

        recommendation:
            "Deploy this creative in {{bestContext.name}} contexts first to maximize immediate ROI. For longer-dwell contexts, create a variant with improved text hierarchy, bullet points instead of paragraphs, and prominent social proof elements.",

        actions: [
            {
                title: "Increase CTA contrast and size",
                description: "Use a bolder color and larger button to create a stronger visual anchor in the lower section of the creative."
            },
            {
                title: "Simplify the message hierarchy",
                description: "Reduce competing value propositions to a single primary message, moving secondary points to supporting materials."
            },   {
                title: "Add whitespace around key elements",
                description: "Give the headline and CTA more breathing room to improve scanning speed and reduce cognitive load."
            }
        ]
    },


} as const