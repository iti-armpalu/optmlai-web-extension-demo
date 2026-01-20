export const dummyHeatmapTab = {
    intro:
      "This view shows where visual attention is most likely to go in the first few seconds, based on eye-tracking prediction models.",
  
    keyInsight: {
      body:
        "Viewers notice the **headline and superhero imagery** first (immediate), followed by the **product benefits section** (early). Body text and CTA receive minimal attention during fast-scrolling or quick-glance moments.",
    },
  
    intensityScale: {
      title: "Attention Intensity Scale",
      subtitle: "Based on predicted likelihood of fixation",
      levels: [
        {
          key: "immediate",
          label: "Immediate (very high)",
          detail: "85%+ likelihood of drawing first attention",
        },
        {
          key: "early",
          label: "Early (high)",
          detail: "70–84% likelihood of early attention",
        },
        {
          key: "mid",
          label: "Mid (medium)",
          detail: "50–69% likelihood of mid-sequence attention",
        },
        {
          key: "late",
          label: "Late (low)",
          detail: "30–49% likelihood of low attention",
        },
        {
          key: "veryLate",
          label: "Very late (very low)",
          detail: "<30% likelihood of receiving attention",
        },
      ],
    },
  
    footerNote:
      "Understanding which elements attract attention first helps you optimize layout, hierarchy, and CTA visibility for faster comprehension and higher engagement.",
  } as const