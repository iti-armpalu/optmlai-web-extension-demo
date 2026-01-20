export const aiUnderstanding = {
  objective: {
    description:
      "The advertorial introduces the Gerber Life Grow-Up Plan, a whole life insurance product designed for children, referred to as 'your little superhero', emphasizing security and long-term benefits for the child's future. It encourages parents to invest in their children's future with the stability and financial coverage offered by life insurance.",
    intent: "Lead Generation & Education",
    primaryGoal: "Drive qualified leads through low-friction quote requests",
    secondaryGoals: [
      "Educate parents about the benefits of early life insurance",
      "Position Gerber Life as the trusted children's insurance expert",
      "Build emotional connection through parental protection instinct",
    ],
    targetAction: "Request free quote and contact information",
    expectedOutcome: "Warm leads interested in protecting their child's financial future",
  },
  brand: {
    detected: "Gerber Life Insurance",
    confidence: 96,
    positioning:
      "Positioned as a trusted, family-focused life insurance provider specializing in affordable children's insurance products. Emphasizes financial security, peace of mind for parents, and legacy protection for families with young children.",
    personality: ["Trustworthy", "Caring", "Family-Oriented", "Reliable", "Protective"],
    visualIdentity:
      "The AI interprets the visual identity as warm and family-focused, with approachable typography and imagery that highlights caring parent–child moments.",
  },
  product: {
    category: "Insurance, Life Insurance, Children's Insurance",
    type: "Grow-Up Plan (Whole Life Insurance for Children)",
    keyFeatures: ["Guaranteed Acceptance", "Cash Value Growth", "Locked-In Low Rates", "Convertible to Adult Policy"],
    pricePoint: "Affordable Entry-Level ($10-30 per month)",
    targetDemographic:
      "Parents and grandparents of young children (ages 0-14), typically ages 25-65, who want to ensure their children's financial future and secure affordable coverage early.",
  },
  message: {
    primary: "Protect your child's future with guaranteed life insurance coverage starting at just pennies a day",
    secondary: [
      "Lock in affordable rates that never increase",
      "Build cash value your child can use for education or their future",
      "Guaranteed acceptance - no medical exams for children",
    ],
    clarity: 91,
    comprehensionTime: "2.1s",
  },
  narrative: {
    structure: "Emotional Journey - Fear to Hope to Security Arc",
    hook: 'Visual opening shows tender parent-child moments (bedtime stories, teaching to ride a bike) paired with "What if you could protect their tomorrow?"',
    journey: [
      "Emotional Hook: Parent-child moments trigger protective instinct",
      "Problem: Future uncertainty and rising insurance costs",
      "Solution: Affordable guaranteed coverage starting early",
      "Credibility: 50+ year legacy, millions of families served",
      "Resolution: Child protected through life's milestones",
    ],
    resolution:
      "Peace of mind knowing your child has lifelong protection and financial foundation, regardless of future health changes",
  },
  cta: {
    text: "Get Your Free Quote in 30 Seconds",
    type: "Low-Friction Information Request",
    placement: "Bottom-Center, Prominent with Form Fields",
    clarity: 94,
    urgency: 62,
  },
  valueProposition: {
    primary:
      "Secure guaranteed, affordable life insurance for your child that builds cash value and locks in low rates for life",
    supporting: [
      "Functional: Guaranteed acceptance coverage with no medical exams required for children",
      "Emotional: Peace of mind and protection for your child's entire life",
      "Financial: Cash value accumulation that can support college, first home, or wedding expenses",
    ],
    uniqueness: 82,
    believability: 89,
  },
  emotionalTone: {
    primary: "Protective",
    valence: "positive" as const,
    secondary: ["Reassuring", "Hopeful", "Caring", "Responsible", "Forward-Thinking"],
    intensity: 78,
    arousal: "moderate-high" as const,
  },
  thematicFraming: {
    theme: "Parental Love, Legacy & Financial Security",
    associations: [
      "Family Protection",
      "Future Planning",
      "Generational Wealth",
      "Peace of Mind",
      "Parental Responsibility",
    ],
    culturalRelevance:
      "Resonates with growing awareness of financial planning, millennial parents seeking security, and desire to give children advantages. Aligns with life milestone moments (births, birthdays) and family protection instinct.",
    seasonality:
      "Peak resonance during birth announcements, back-to-school season (August-September), and New Year (financial planning resolutions). Holiday season (Q4) also strong for legacy/gift framing.",
  },
}


export const contextPerformanceData = {
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
      fitLevel: "Best fit" as const,
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
      fitLevel: "Good fit" as const,
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
}

export const allContexts = [
  ...contextPerformanceData.retail.map((c) => ({ ...c, category: "Retail" })),
  ...contextPerformanceData.ecommerce.map((c) => ({ ...c, category: "E-commerce" })),
  ...contextPerformanceData.social.map((c) => ({ ...c, category: "Social" })),
]

export const bestContext = allContexts.reduce((best, current) => (current.fitLevel === "Best fit" ? current : best))

