export interface DummyReport {
  summary: string
  strengths: string[]
  issues: string[]
  recommendations: string[]

  heatmap: {
    image: string
    description: string
    hotspots: {
      x: number
      y: number
      area: string
      intensity: number
    }[]
  }

  designRules: {
    contrast: string
    spacing: string
    hierarchy: string
    alignment: string
  }

  readability: {
    estimatedGrade: string
    densityScore: number
    clarityNotes: string[]
  }

  insights: string[]
}

export function generateDummyReport() {
  return {
    summary:
      `This channel capture was analyzed with our Content Optimization Engine. ` +
      `Based on the chosen purpose (purpose), here’s an overview of alignment with best practices.`,

    strengths: [
      "Strong visual focus on key content",
      "Clear contrast in primary CTA",
      "Good initial eye-scanning flow"
    ],

    issues: [
      "Secondary content competes with the visual hierarchy",
      "Text density may overwhelm first-time viewers",
      "Spacing inconsistent in mid-section"
    ],

    recommendations: [
      "Increase whitespace around hero content",
      "Improve CTA contrast for higher visibility",
      "Shorten long text blocks by 20–30%"
    ],

    heatmap: {
      image: "/bose-heatmap-overlay.jpeg",
      description:
        "Simulated heatmap predicts user attention hotspots based on visual saliency modeling.",
      hotspots: [
        { x: 320, y: 140, area: "Primary CTA", intensity: 0.92 },
        { x: 220, y: 400, area: "Main headline", intensity: 0.78 },
        { x: 50, y: 600, area: "Side graphic", intensity: 0.61 }
      ]
    },

    designRules: {
      contrast: "Primary text is WCAG AA compliant; secondary text borderline.",
      spacing: "Spacing around mid-section feels compressed.",
      hierarchy: "Good headline → body hierarchy, weak tertiary labels.",
      alignment: "Left alignment mostly consistent; minor grid deviations."
    },

    readability: {
      estimatedGrade: "Grade 6–7",
      densityScore: 0.72,
      clarityNotes: [
        "Paragraphs could be shorter.",
        "CTA copy slightly long.",
        "Body text slightly dense for social-first content."
      ]
    },

    insights: [
      "Users will likely engage with the top-left visual first.",
      "CTA is visible but lacks emotional impetus.",
      "Simplifying layout for mobile will improve clarity.",
      "Increasing whitespace will improve visual quality."
    ],
  }
}

export const dummyReportOverview = {
  intro:
    "This evaluation is a summary of 10 different contexts across retail, e-commerce, and social environments. View detailed performance for each context in the Contexts tab.",

  metrics: [
    {
      title: "Overall Visual Impact",
      value: "High",
      description: "Avg: 82/100 across all contexts",
      tooltip:
        "Visual Impact Score measures how quickly and effectively your creative captures visual focus. It predicts the likelihood users will notice key elements within the first 3 seconds based on eye-tracking patterns and visual hierarchy analysis.",
      explanation: "Effectively attracts audience attention",
      tone: "positive",
    },
    {
      title: "Overall Cognitive",
      value: "Medium",
      description: "Avg: 66/100 across all contexts",
      tooltip:
        "Cognitive Score evaluates how easily users can understand your message, value proposition, and call-to-action. It analyzes text hierarchy, information density, visual structure, and cognitive load to predict comprehension and decision-making ease.",
      explanation: "Message is moderately clear, some refinement needed",
      tone: "warning",
    },
  ],

  keyInsight: {
    title: "Key Insight",
    body:
      "Your content excels in Retail - Proximity contexts with strong visual impact. However, clarity drops significantly in E-commerce - Evaluation contexts where users spend 5+ seconds analyzing details. Optimizing for {{bestContext.name}} will maximize immediate impact, while improving text structure will unlock performance in consideration phases.",
  },

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

    priorityActions: [
      "Launch in social feeds and discovery pages immediately (88–90% conversion potential)",
      "Simplify body text structure with bullet points and headers (+15–20% clarity gain)",
      "A/B test CTA prominence variations for mid-dwell contexts",
    ],
  },
} as const


