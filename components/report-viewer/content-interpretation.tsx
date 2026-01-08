import type React from "react"

import { cn } from "@/lib/utils"
import {
  Building2,
  Package,
  MessageCircle,
  BookOpen,
  MousePointerClick,
  Gem,
  Heart,
  Palette,
  Sparkles,
  CheckCircle,
  Info,
  ArrowRight,
  Sparkle,
  CheckCircle2,
  InfoIcon,
  MessageSquare,
} from "lucide-react"
import { aiUnderstanding } from "./_data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

const ObjectiveCard = ({
  icon: Icon,
  title,
  subtitle,
  children,
  delay = 0,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
  children: React.ReactNode
  delay?: number
}) => (
  <Card
    className="border-purple-600/10 bg-purple-50/50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-500 transition-all duration-300 animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <CardContent>{children}</CardContent>
  </Card>
)

const SectionCard = ({
  icon: Icon,
  title,
  subtitle,
  children,
  delay = 0,
}: {
  icon: React.ElementType
  title: string
  subtitle: string
  children: React.ReactNode
  delay?: number
}) => (
  <Card>
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription className="text-sm">{subtitle}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)

const ConfidenceMeter = ({ value, label }: { value: number; label: string }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-primary font-medium">{value}%</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500",
          value >= 80 ? "bg-green-500" : value >= 60 ? "bg-primary" : "bg-accent",
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
)

const TagList = ({ tags, color = "primary" }: { tags: string[]; color?: string }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <span
        key={tag}
        className={cn(
          "px-2.5 py-1 rounded-md text-xs",
          color === "primary" && "bg-purple-50 text-purple-500",
          color === "accent" && "bg-accent/10 text-accent",
          color === "success" && "bg-success/10 text-success",
        )}
      >
        {tag}
      </span>
    ))}
  </div>
)

const SignalCard = ({
  icon: Icon,
  title,
  description,
  impactType,
}: {
  icon: React.ElementType
  title: string
  description: string
  impactType: "Visual Impact" | "Cognitive Impact" | "Both"
}) => (
  <Card className="hover:border-primary/40 transition-all duration-200">
    <CardContent className="pt-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <span
              className={cn(
                "text-[10px] font-medium px-2 py-0.5 rounded-full",
                impactType === "Visual Impact" && "bg-blue-500/10 text-blue-600",
                impactType === "Cognitive Impact" && "bg-purple-500/10 text-purple-600",
                impactType === "Both" && "bg-green-500/10 text-green-600",
              )}
            >
              {impactType}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

export function ContentInterpretationTab() {
  const data = aiUnderstanding

  return (
    <div className="space-y-8">

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <Info className="h-4 w-4 shrink-0" />
        <p>
          {/* This view shows how our AI ‘reads’ your creative: the brand it sees, the product
          it thinks you’re selling, the message it detects, and the emotions and themes it
          picks up. It describes interpretation only and does not judge performance. */}
          This view explains which creative signals most influenced your Visual and Cognitive Impact scores. It highlights how brand presence, 
          message structure, product information, and calls to action shaped attention capture and message understanding.
        </p>
      </div>

      <div className="flex items-start gap-6">

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">What Drove Your Scores</h2>
          <p className="text-sm text-muted-foreground">
            These signals directly influenced your Visual and Cognitive Impact scores
          </p>
          <div className="mt-2 p-3 bg-muted/30 rounded-lg border border-border/50">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground space-y-1">
                <p>
                  <span className="font-medium text-blue-600">Visual Impact</span> reflects attention capture and
                  visual salience
                </p>
                <p>
                  <span className="font-medium text-purple-600">Cognitive Impact</span> reflects ease of understanding
                  and message processing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="space-y-3">
        <SignalCard
          icon={Building2}
          title="Brand Presence Signals"
          description="Strong brand visibility through consistent visual identity reduces cognitive processing effort, though subtle branding may require repeated exposure for full recognition."
          impactType="Both"
        />

        <SignalCard
          icon={MessageSquare}
          title="Message Structure & Density"
          description="Clear message hierarchy with moderate information density enables comprehension within 3-5 seconds, though complex concepts may benefit from secondary touchpoints."
          impactType="Cognitive Impact"
        />

        <SignalCard
          icon={Package}
          title="Product Information Signals"
          description="Visual presentation of product features supports immediate recognition of the SaaS offering, though technical depth requires extended engagement to fully understand."
          impactType="Visual Impact"
        />

        <SignalCard
          icon={MousePointerClick}
          title="Call-to-Action Signals"
          description="Multiple strategic CTA placements drive visual attention effectively, though the premium positioning may create friction for price-sensitive audiences."
          impactType="Both"
        />
      </div>

      {/* <ObjectiveCard
        icon={Sparkles}
        title="Ad Creative Objective"
        subtitle="The primary goal and intent of this advertorial"
        delay={0}
      >
        <div className="space-y-6">

          <div className="flex items-start gap-3">
            <Sparkle className="w-5 h-5" />
            <div className="flex-1 space-y-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold">Interpretation Snapshot</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">
                          This reflects how the AI perceives and understands your creative based
                          solely on the visuals and messaging within the ad itself. It summarizes the core meaning, tone, and themes the AI detects.
                          In other words: the Interpretation Snapshot describes what the AI believes the ad is saying.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-muted-foreground">
                  How the AI perceives the ad
                </p>
              </div>

              <p className="text-foreground leading-relaxed">
                The AI perceives this ad as a family-focused life insurance
                message centered on parental protection, financial security,
                and long-term planning for children. The tone is warm and protective,
                and the primary action it detects is requesting a free quote.
              </p>
            </div>
          </div>
        </div>
      </ObjectiveCard> */}



      {/* Creative Objective section at the top */}
      <ObjectiveCard
        icon={Sparkles}
        title="Ad Creative Objective"
        subtitle="The primary goal and intent of this advertorial"
        delay={0}
      >
        <div className="space-y-6">

          {/* <div className="flex items-start gap-3">
            <Sparkle className="w-5 h-5" />
            <div className="flex-1 space-y-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold">Ad Creative Objective</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">
                          This reflects what the ad is intended to achieve from a marketing perspective. It represents the
                          strategic purpose behind the creative — such as educating viewers, driving awareness, or
                          generating leads. In other words: the Objective describes why the ad was created.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <p className="text-sm text-muted-foreground">The primary goal and intent of this advertorial</p>
              </div>

              <p className="text-foreground leading-relaxed">
                {data.objective.description}
              </p>
            </div>
          </div> */}

          {/* <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/5 border border-primary/20"> */}
          {/* <p className="text-foreground leading-relaxed">{data.objective.description}</p> */}
          {/* </div> */}

          {/* Key Details Grid */}
          {/* <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="border-none shadow-none bg-purple-100">
              <CardContent className="px-3 pt-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-purple-600">Campaign Type</span>
                </div>
                <p className="text-sm text-foreground">{data.objective.intent}</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none bg-purple-100">
              <CardContent className="px-3 pt-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-purple-600">Desired Action</span>
                </div>
                <p className="text-sm text-foreground">{data.objective.targetAction}</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-none bg-purple-100">
              <CardContent className="px-3 pt-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-purple-600">Expected Outcome</span>
                </div>
                <p className="text-sm text-foreground">{data.objective.expectedOutcome}</p>
              </CardContent>
            </Card>
          </div> */}


          {/* Primary Goal & Supporting Objectives - Side by Side */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* <Card className="border-none shadow-none bg-purple-100">
              <CardContent className="px-3 pt-0">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">Primary Goal</span>
                </div>
                <p className="text-base font-medium text-foreground">{data.objective.primaryGoal}</p>
              </CardContent>
            </Card> */}

            {/* Supporting Objectives - Right Side */}

            {/* <Card className="border-none shadow-none bg-transparent">
              <CardContent className="px-3 pt-0">


                <div className="flex flex-col items-start gap-1 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Supporting Objectives
                  </span>
                  <span className="text-xs text-muted-foreground">Tactics that help achieve the primary goal</span>
                </div>

                <div className="space-y-3">
                  {data.objective.secondaryGoals.map((goal, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-foreground leading-relaxed">{goal}</span>
                    </div>
                  ))}
                </div>
       
              </CardContent>
            </Card> */}


          </div>

          {/* <div className="p-4 rounded-lg bg-success/5 border border-success/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-xs font-semibold text-success">Primary Goal</span>
            </div>
            <p className="text-sm text-foreground">{data.objective.primaryGoal}</p>
          </div>

          <div>
            <span className="text-xs text-muted-foreground mb-2 block">Secondary Objectives</span>
            <div className="space-y-2">
              {data.objective.secondaryGoals.map((goal, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-muted/30">
                  <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground/80">{goal}</span>
                </div>
              ))}
            </div>
          </div> */}

        </div>
      </ObjectiveCard>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Brand Detection */}
        {/* <SectionCard icon={Building2} title="Brand Interpretation" subtitle="How the AI interprets your brand signals and identity" delay={50}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Detected Brand</span>
              <span className="font-semibold text-foreground">{data.brand.detected}</span>
            </div>
            <ConfidenceMeter value={data.brand.confidence} label="Detection Confidence" />
            <div>
              <span className="text-xs text-muted-foreground">Brand Positioning (as interpreted)</span>
              <p className="text-sm text-foreground mt-1">{data.brand.positioning}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground mb-2 block">Brand Personality</span>
              <TagList tags={data.brand.personality} />
            </div>
            <div>
              <span className="text-xs text-muted-foreground mb-2 block">Visual Identity Notes</span>
              <p className="text-sm text-foreground mt-1">{data.brand.visualIdentity}</p>
            </div>
          </div>
        </SectionCard> */}

        {/* Product Understanding */}
        {/* <SectionCard
          icon={Package}
          title="Product Interpretation"
          subtitle="How the AI interprets your product and key features"
          delay={100}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-muted/40">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Category Detected</span>
                <p className="text-sm font-medium text-foreground mt-1">{data.product.category}</p>
              </div>
              <div className="p-3 rounded-lg  bg-muted/40">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Product Type</span>
                <p className="text-sm font-medium text-foreground mt-1">{data.product.type}</p>
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground mb-2 block">Key Features Identified</span>
              <TagList tags={data.product.keyFeatures} />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Target Audience (as inferred)</span>
              <p className="text-sm text-foreground mt-1">{data.product.targetDemographic}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Price Tier Inference (based on visual cues)</span>
              <p className="text-sm text-foreground mt-1">{data.product.pricePoint}</p>
            </div>
          </div>
        </SectionCard> */}

        {/* Message Interpretation */}
        {/* <SectionCard
          icon={MessageCircle}
          title="Message Interpretation"
          subtitle="How the AI interprets your main and supporting messages"
          delay={150}
        >
          <div className="space-y-4">

            <div className="p-3 rounded-lg bg-muted/40">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">Primary Message Detected</span>
              <p className="text-sm font-medium text-foreground mt-1">"{data.message.primary}"</p>
            </div>

            <div>
              <span className="text-xs text-muted-foreground mb-2 block">Secondary Messages</span>
              <div className="space-y-2">
                {data.message.secondary.map((msg, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{msg}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs text-muted-foreground mb-2 block">
                  Estimated Comprehension Time
                </span>
                <span className="text-sm text-foreground mt-1">Model estimate: {data.message.comprehensionTime}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <ConfidenceMeter value={data.message.clarity} label="Message Clarity" />
            </div>

          </div>
        </SectionCard> */}

        {/* Narrative Structure */}
        {/* <SectionCard
          icon={BookOpen}
          title="Narrative Structure"
          subtitle="How the AI interprets your creative’s story flow"
          delay={200}
        >
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/40">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Narrative Type Detected</span>
              <p className="text-sm font-medium text-foreground mt-1">{data.narrative.structure}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground mb-2 block">Opening Hook Description</span>
              <p className="text-sm text-foreground mt-1">{data.narrative.hook}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground mb-2 block">Emotional Journey</span>
              <div className="space-y-2">
                {data.narrative.journey.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-50 text-purple-400 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground mb-2 block">Resolution</span>
              <p className="text-sm text-foreground mt-1">{data.narrative.resolution}</p>
            </div>
          </div>
        </SectionCard> */}

        {/* CTA Analysis */}
        {/* <SectionCard
          icon={MousePointerClick}
          title="Call-to-Action Interpretation"
          subtitle="How the AI interprets your CTA and its phrasing"
          delay={250}
        >
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/40">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">CTA Detected</span>
              <p className="text-sm font-medium text-foreground mt-1">Get Started Now</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-secondary/30">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">CTA Type</span>
                <p className="text-sm font-medium text-foreground mt-1">{data.cta.type}</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">CTA Placement</span>
                <p className="text-sm font-medium text-foreground mt-1">{data.cta.placement}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <ConfidenceMeter value={data.cta.clarity} label="CTA Clarity" />
            </div>
          </div>
        </SectionCard> */}

        {/* Value Proposition */}
        {/* <SectionCard
          icon={Gem}
          title="Value Proposition Interpretation"
          subtitle="How the AI interprets your ad’s communicated value"
          delay={300}
        >
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/40">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Primary Value Proposition</span>
              <p className="text-sm font-medium text-foreground mt-1">{data.valueProposition.primary}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground mb-2 block">Supporting Value Points</span>
              <div className="space-y-2">
                {data.valueProposition.supporting.map((point, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <ConfidenceMeter value={data.valueProposition.uniqueness} label="Perceived Uniqueness *" />
              <ConfidenceMeter value={data.valueProposition.believability} label="Perceived Believability *" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">* Model interpretation</p>
          </div>
        </SectionCard> */}

        {/* Emotional Tone */}
        {/* <SectionCard icon={Heart} title="Emotional Tone Interpretation" subtitle="How the AI interprets your creative’s emotional tone" delay={350}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/40">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Primary Emotion</span>
                <p className="text-sm font-medium text-foreground mt-1">{data.emotionalTone.primary}</p>
              </div>
              <div className="text-right">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    data.emotionalTone.valence === "positive" && "bg-green-100 text-green-600",
                    // data.emotionalTone.valence === "negative" && "bg-destructive/20 text-destructive",
                    // data.emotionalTone.valence === "neutral" && "bg-muted text-muted-foreground",
                  )}
                >
                  {data.emotionalTone.valence.charAt(0).toUpperCase() + data.emotionalTone.valence.slice(1)} Valence
                </span>
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground mb-2 block">Secondary Emotions</span>
              <TagList tags={data.emotionalTone.secondary} />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Emotional Strength</span>
              <p className="text-sm text-foreground mt-1">Strong</p>
              <p className="text-sm text-foreground mt-1">Indicates the AI detects a clear, prominent emotional tone in the creative.</p>

            </div>
          </div>
        </SectionCard> */}

        {/* Thematic Framing */}
        {/* <SectionCard icon={Palette} title="Thematic Framing" subtitle="How the AI interprets your creative’s underlying themes" delay={400}>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/40">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Central Theme</span>
              <p className="text-sm font-medium text-foreground mt-1">{data.thematicFraming.theme}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground mb-2 block">Thematic Associations</span>
              <TagList tags={data.thematicFraming.associations} />
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Cultural Relevance</span>
              <p className="text-sm text-foreground mt-1">{data.thematicFraming.culturalRelevance}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Seasonality or Life-Moment Alignment</span>
              <p className="text-sm text-foreground mt-1">{data.thematicFraming.seasonality}</p>
            </div>
          </div>
        </SectionCard> */}
      </div>

      {/* Footer Note */}
      <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Why this matters:</strong> Understanding
            how the AI interprets your creative helps reveal gaps between your intended message
            and how it may be perceived. These insights directly inform the performance predictions
            and recommendations shown in other tabs.
          </div>
        </div>
      </div>
    </div>
  )
}
