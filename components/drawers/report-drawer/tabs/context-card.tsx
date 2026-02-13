import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

import { useMemo, useState } from "react"
import { Clock, CheckCircle2, Info, AlertCircle, ChevronRight } from "lucide-react"

const CREATIVE_IMAGE_URL =
  "https://images.squarespace-cdn.com/content/v1/5ef0ef1b02a1d05e6faff7ac/1593379290858-GI2TYZN1I701KK95J8W2/Ad_page_01.jpg"

interface ContextCardProps {
  context: {
    id: string
    name: string
    environment: string
    exposureTime: string
    behaviorTitle: string
    behaviorDescription: string
    performanceVerdict: string
    fitLevel: "Best fit" | "Good fit" | "Conditional fit" | "Weak fit"
    designImplications: readonly string[]
    recommendation?: string
  }
  value: string
  isOpen: boolean
  onToggle: () => void
}

// Random/POC AOI boxes (percent-based, relative to the image container)
const aoiRegions: Record<string, { x: number; y: number; width: number; height: number }> = {
  headline: { x: 30, y: 10, width: 40, height: 10 },
  hero: { x: 15, y: 40, width: 70, height: 35 },
  benefits: { x: 10, y: 60, width: 80, height: 25 },
  cta: { x: 35, y: 85, width: 30, height: 10 },
}

const AOI_KEYS = Object.keys(aoiRegions) as Array<keyof typeof aoiRegions>

// Keyword-based mapping from text -> AOI keys.
// IMPORTANT: This can return multiple matches; for this POC we use the FIRST match only.
const getAOIForText = (text: string): string[] => {
  const lowerText = text.toLowerCase()
  const aois: string[] = []

  if (lowerText.includes("headline")) aois.push("headline")
  if (lowerText.includes("hero") || lowerText.includes("image")) aois.push("hero")
  if (lowerText.includes("benefit") || lowerText.includes("copy") || lowerText.includes("text")) aois.push("benefits")
  if (lowerText.includes("cta") || lowerText.includes("call to action")) aois.push("cta")

  return aois
}

const getSingleAOIForText = (text: string): string | null => {
  const matches = getAOIForText(text)
  return matches[0] ?? null
}

export function ContextCard({ context, value, isOpen, onToggle }: ContextCardProps) {
  // Single-selection: one list item active at a time.
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const getBadgeColor = (fit: string) => {
    switch (fit) {
      case "Best fit":
        return "border-green-600/10 bg-green-50/50 text-green-600 dark:bg-green-950/30 dark:text-green-500"
      case "Good fit":
        return "border-blue-600/10 bg-blue-50/50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-500"
      case "Conditional fit":
        return "border-amber-600/10 bg-amber-50/50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-500"
      case "Weak fit":
        return "border-rose-600/10 bg-rose-50/50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-500"
      default:
        return ""
    }
  }

  const getFitIcon = (fit: string) => {
    switch (fit) {
      case "Best fit":
      case "Good fit":
        return <CheckCircle2 className="h-3.5 w-3.5" />
      case "Conditional fit":
        return <AlertCircle className="h-3.5 w-3.5" />
      case "Weak fit":
        return <Info className="h-3.5 w-3.5" />
      default:
        return null
    }
  }

  // For the preview highlight: compute the single active AOI key from activeIndex.
  const activeAOIKey = useMemo(() => {
    if (activeIndex === null) return null
    return AOI_KEYS[activeIndex % AOI_KEYS.length]
  }, [activeIndex])


  const handleDetectionClick = (index: number) => {
    // Requirement: clicking a different one highlights only that one (unhighlights previous).
    // Optional: clicking the same one again toggles it off.
    setActiveIndex((prev) => (prev === index ? null : index))
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={() => {
        onToggle()
      }}
    >
      <Card
        className={cn(
          "transition-all duration-200",
          isOpen ? "border-primary/40 shadow-sm" : "hover:border-primary/20 hover:bg-muted/30",
        )}
      >
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
          >
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 flex-wrap">
                    <h3 className="font-semibold text-foreground">{context.name}</h3>
                    <div className="flex items-center gap-1">
                      <Badge className={`${getBadgeColor(context.fitLevel)} inline-flex items-center gap-1.5`}>
                        {getFitIcon(context.fitLevel)}
                        {context.fitLevel}
                      </Badge>
                      {context.fitLevel === "Best fit" && (
                        <span className="text-[10px] text-muted-foreground ml-1">Compared to other tested contexts</span>
                      )}
                    </div>
                  </div>

                  {!isOpen && <p className="text-sm text-muted-foreground mt-1 truncate">{context.environment}</p>}
                </div>

                <Badge variant="outline" className="text-xs font-medium">
                  <Clock className="h-3 w-3 mr-1.5" />
                  {context.exposureTime}
                </Badge>

                <ChevronRight
                  className={cn(
                    "w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                    isOpen && "rotate-90",
                  )}
                />
              </div>
            </CardContent>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-6 pb-6">
            <div className="space-y-4">

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                  Context environment
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{context.environment}</p>
              </div>

              <Separator className="bg-border/60" />

              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                  {context.behaviorTitle}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{context.behaviorDescription}</p>
              </div>

              <Separator className="bg-border/60" />

              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                  How the creative behaves in this context
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{context.performanceVerdict}</p>
              </div>

              <Separator className="bg-border/60" />

              <div className="grid grid-cols-2 gap-4 items-start">
                {/* Detected items (clickable) */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2.5">
                    Detected in creative
                  </p>
                  <p className="text-[11px] text-muted-foreground/50 mb-2">Click to highlight in preview</p>

                  <ul className="space-y-1.5">
                    {context.designImplications.map((point, index) => {
                      const isActive = activeIndex === index
                      const hasAOI = AOI_KEYS.length > 0

                      return (
                        <li key={`${index}-${point}`}>
                          <button
                            type="button"
                            onClick={() => hasAOI && handleDetectionClick(index)}
                            disabled={!hasAOI}
                            className={cn(
                              "group w-full text-left text-xs flex items-center gap-3 pl-3 pr-3 py-2.5 rounded-lg transition-all duration-150 border",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              isActive
                                ? "bg-emerald-500/10 text-emerald-700 border-emerald-300 shadow-sm"
                                : "text-muted-foreground border-border/60 hover:border-emerald-200 hover:bg-emerald-500/5 hover:text-foreground",
                              !hasAOI && "opacity-60 cursor-not-allowed",
                            )}
                          >
                            <span
                              className={cn(
                                "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-[10px] font-semibold transition-colors duration-150",
                                isActive
                                  ? "bg-emerald-500 text-white"
                                  : "bg-muted text-muted-foreground group-hover:bg-emerald-100 group-hover:text-emerald-600",
                              )}
                            >
                              {index + 1}
                            </span>
                            <span className="flex-1 leading-snug">{point}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>

                {/* Preview image + highlight */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2.5">
                    Preview
                  </p>

                  <div className="relative overflow-hidden border border-border/50 bg-muted/20">
                    <img src={CREATIVE_IMAGE_URL} alt="Creative being analyzed" className="w-full h-auto block" />

                    {Object.entries(aoiRegions).map(([key, region]) => {
                      const isHighlighted = activeAOIKey === key

                      return (
                        <div
                          key={key}
                          className={cn(
                            "absolute border-2 rounded transition-all duration-300",
                            isHighlighted
                              ? "border-emerald-500 bg-emerald-500/20 opacity-100"
                              : "border-transparent opacity-0",
                          )}
                          style={{
                            left: `${region.x}%`,
                            top: `${region.y}%`,
                            width: `${region.width}%`,
                            height: `${region.height}%`,
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>

              <Separator className="bg-border/60" />

              {context.recommendation && (
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                    How to use this context effectively
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{context.recommendation}</p>
                </div>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
