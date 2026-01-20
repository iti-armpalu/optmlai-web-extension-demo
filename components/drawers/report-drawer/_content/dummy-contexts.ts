export interface ContextData {
  name: string
  environment: string
  exposureTime: string
  behaviorTitle: string
  behaviorDescription: string
  performanceVerdict: string
  fitLevel: "Best fit" | "Good fit" | "Conditional fit" | "Weak fit"
  designImplications: string[]
  recommendation?: string
}

export const dummyContextsTab = {
  intro:
    "This section evaluates how well your creative performs across different real-world viewing contexts, based on attention, clarity, and decision timing.",
  contextPerformanceData: {
    retail: [
      {
        name: "Proximity (Billboards / OOH)",
        environment: "Billboards, transit ads, outdoor signage",
        exposureTime: "1–2s exposure",
        behaviorTitle: "What people are doing in this moment",
        behaviorDescription:
          "People are passing by with limited attention and no purchase intent. Messages are processed quickly and remembered later, not acted on immediately.",
        performanceVerdict:
          "Strong visual impact makes this creative effective for quick-glance exposure, despite moderate message depth.",
        fitLevel: "Best fit",
        designImplications: [
          "Headline and hero image capture attention immediately",
          "Product benefits require more time than available in pass-by scenarios",
          "CTA is rarely processed in quick-glance contexts",
        ],
        recommendation: "Best used for awareness and brand recall, not direct response.",
      },
      {
        name: "Transition (Entrance / Windows)",
        environment: "Store entrances, window displays, escalator ads",
        exposureTime: "2–4s exposure",
        behaviorTitle: "What people are doing in this moment",
        behaviorDescription:
          "People are in motion but mentally transitioning into shopping mode. They're open to new information but not yet evaluating deeply.",
        performanceVerdict:
          "Good attention retention and visual appeal work well for this moderately-paced viewing window.",
        fitLevel: "Good fit",
        designImplications: [
          "Strong initial visual hook maintains interest during transition",
          "Message hierarchy supports quick scanning",
          "Clarity limitations become noticeable with extended viewing",
        ],
        recommendation: "Run as-is for building interest during the entry phase.",
      },
      {
        name: "Impulse (Checkout / Promo)",
        environment: "Checkout lanes, end caps, promotional displays",
        exposureTime: "3–5s exposure",
        behaviorTitle: "What people are doing in this moment",
        behaviorDescription:
          "People are in decision mode with wallet out. They're evaluating if something is worth adding to their cart right now.",
        performanceVerdict: "Attention is captured but message complexity slows down the impulse decision process.",
        fitLevel: "Conditional fit" as const,
        designImplications: [
          "Visual strength creates initial interest",
          "Dense copy slows comprehension at the critical decision moment",
          "Value proposition isn't instantly clear",
        ],
        recommendation: "Simplify for this context by reducing text and emphasizing one clear benefit.",
      },
      {
        name: "Destination (Shelf / Aisle)",
        environment: "Product shelves, in-aisle displays, comparison shopping",
        exposureTime: "5–15s exposure",
        behaviorTitle: "What people are doing in this moment",
        behaviorDescription:
          "People are actively comparing options with time to read details. They're looking for reasons to choose one product over another.",
        performanceVerdict:
          "Extended viewing time exposes clarity weaknesses that reduce effectiveness in detailed evaluation contexts.",
        fitLevel: "Weak fit" as const,
        designImplications: [
          "Visual design attracts initial attention successfully",
          "Text density and lack of hierarchy make information hard to absorb",
          "Missing clear differentiation points that help with comparison",
        ],
        recommendation:
          "Redesign with bullet points, clearer hierarchy, and prominent differentiators before using in evaluation contexts.",
      },
    ],

    ecommerce: [
      {
        name: "Discovery (Category Pages)",
        environment: "Product grid thumbnails, category browsing, search results",
        exposureTime: "0.5–3s exposure",
        behaviorTitle: "What people are doing in this moment",
        behaviorDescription:
          "People are rapidly scanning dozens of options looking for anything that stands out. They're not reading—they're filtering visually.",
        performanceVerdict:
          "Excellent thumbnail appeal and visual contrast make this creative highly effective for stopping the scroll.",
        fitLevel: "Best fit" as const,
        designImplications: [
          "Strong visual hierarchy works at small thumbnail sizes",
          "High contrast and bold elements capture attention in crowded grids",
          "Headline remains legible even when scaled down",
        ],
        recommendation: "Run as-is. This creative is optimized for discovery and click-through.",
      },
      {
        name: "Evaluation (PDP Features)",
        environment: "Product detail pages, feature comparisons, specification reading",
        exposureTime: "5–20s exposure",
        behaviorTitle: "What people are doing in this moment",
        behaviorDescription:
          "People are invested and reading carefully. They want to understand exactly what they're getting before committing to purchase.",
        performanceVerdict:
          "Extended viewing reveals significant clarity issues that undermine confidence during detailed evaluation.",
        fitLevel: "Weak fit" as const,
        designImplications: [
          "Dense paragraphs slow down information processing",
          "Lack of visual hierarchy makes scanning difficult",
          "Key differentiators and benefits aren't prominently called out",
        ],
        recommendation:
          "Restructure with clear sections, bullet points, and visual aids before using in evaluation contexts.",
      },
      {
        name: "Conversion (Cart / Checkout)",
        environment: "Shopping cart, checkout page, last-mile reassurance",
        exposureTime: "5–15s exposure",
        behaviorTitle: "What people are doing in this moment",
        behaviorDescription:
          "People are on the verge of purchasing but seeking final reassurance. Any confusion or uncertainty can cause cart abandonment.",
        performanceVerdict: "Moderate performance at critical conversion moment. Clarity gaps may introduce hesitation.",
        fitLevel: "Conditional fit" as const,
        designImplications: [
          "Visual appeal maintains interest",
          "Message complexity creates cognitive friction at decision point",
          "Missing clear trust signals and guarantees",
        ],
        recommendation: "Add prominent trust signals and simplify messaging to reduce conversion hesitation.",
      },
    ],

    social: [
      {
        name: "Awareness (Thumb-Stop)",
        environment: "Social media feeds, story placements, scroll-based content",
        exposureTime: "0.5–2s exposure",
        behaviorTitle: "What people are doing in this moment",
        behaviorDescription:
          "People are mindlessly scrolling through entertainment content. They're not looking for ads—you have to physically stop their thumb.",
        performanceVerdict:
          "Exceptional thumb-stopping power. Visual strength creates immediate scroll interruption and engagement.",
        fitLevel: "Best fit" as const,
        designImplications: [
          "High visual contrast breaks the scroll pattern instantly",
          "Headline front-loads the message in first few words",
          "Emotional appeal creates curiosity that delays the scroll",
        ],
        recommendation: "Run as-is. This creative is optimized for feed visibility and engagement.",
      },
      {
        name: "Consideration (Pause & Evaluate)",
        environment: "Paused feed viewing, saved posts, second looks",
        exposureTime: "3–8s exposure",
        behaviorTitle: "What people are doing in this moment",
        behaviorDescription:
          "People have stopped scrolling and are now considering if this is relevant to them. They're asking 'Is this for me? Why should I care?'",
        performanceVerdict:
          "Good initial hook maintains attention through consideration, but clarity could accelerate the decision.",
        fitLevel: "Good fit" as const,
        designImplications: [
          "Strong visual and emotional appeal sustains engagement",
          "Supporting copy provides enough context for consideration",
          "Could benefit from stronger proof points or urgency signals",
        ],
        recommendation: "Run as-is, or test adding social proof to strengthen conversion.",
      },
      {
        name: "Validation (Social Proof Check)",
        environment: "Profile visits, comment reading, credibility assessment",
        exposureTime: "5–15s exposure",
        behaviorTitle: "What people are doing in this moment",
        behaviorDescription:
          "People are interested but skeptical. They're checking comments, looking at the brand profile, and seeking validation before taking action.",
        performanceVerdict:
          "User seeking validation encounters message complexity as a barrier. Needs clearer credibility signals.",
        fitLevel: "Conditional fit" as const,
        designImplications: [
          "Visual appeal gets attention but lacks trust indicators",
          "Dense copy makes credibility assessment harder",
          "Missing obvious social proof or authority markers",
        ],
        recommendation: "Add visible reviews, testimonials, or credentials to support validation-seekers.",
      },
    ],
  },
  footerNote:
    "XXX.",

} as const

export function getAllContexts() {
  const { contextPerformanceData } = dummyContextsTab
  return [
    ...contextPerformanceData.retail.map((c) => ({ ...c, category: "Retail" })),
    ...contextPerformanceData.ecommerce.map((c) => ({ ...c, category: "E-commerce" })),
    ...contextPerformanceData.social.map((c) => ({ ...c, category: "Social" })),
  ]
}

export function getBestContext() {
  const all = getAllContexts()
  if (!all.length) return null

  const fitRank = { "Best fit": 3, "Good fit": 2, "Conditional fit": 1, "Weak fit": 0 } as const
  return all.reduce((best, current) =>
    fitRank[current.fitLevel] > fitRank[best.fitLevel] ? current : best
  )
}

