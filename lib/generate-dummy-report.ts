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
