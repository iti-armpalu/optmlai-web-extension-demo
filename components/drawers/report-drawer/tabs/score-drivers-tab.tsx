import type React from "react"

import { cn } from "@/lib/utils"
import {
  Info,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

const CREATIVE_IMAGE_URL =
  "https://images.squarespace-cdn.com/content/v1/5ef0ef1b02a1d05e6faff7ac/1593379290858-GI2TYZN1I701KK95J8W2/Ad_page_01.jpg"

/** Highlight region as percentage-based coordinates */
interface HighlightRegion {
  top: number
  left: number
  width: number
  height: number
}

interface DetectedItem {
  label: string
  region: HighlightRegion
}

interface SignalData {
  id: string
  title: string
  summary: string
  description: string
  detected: DetectedItem[]
}

const signals: SignalData[] = [
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
]


function SignalCard({
  signal,
  isOpen,
  onToggle,
}: {
  signal: SignalData
  isOpen: boolean
  onToggle: () => void
}) {
  const [activeDetection, setActiveDetection] = useState<number | null>(null)

  const handleDetectionClick = (index: number) => {
    setActiveDetection((prev) => (prev === index ? null : index))
  }

  return (
    <Collapsible open={isOpen} onOpenChange={(open) => {
      onToggle()
      if (!open) setActiveDetection(null)
    }}>
      <Card
        className={cn(
          "transition-all duration-200",
          isOpen
            ? "border-primary/40 shadow-sm"
            : "hover:border-primary/20 hover:bg-muted/30",
        )}
      >
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
          >
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">
                      {signal.title}
                    </h3>
                  </div>
                  {!isOpen && (
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {signal.summary}
                    </p>
                  )}
                </div>
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
            <div className="space-y-8">

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                  Signal explanation
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {signal.description}
                </p>
              </div>

              <Separator className="bg-border/60" />

              {/* Side-by-side: detected items list + image (equal halves) */}
              <div className="grid grid-cols-2 gap-4 items-start">
                {/* Detected items (clickable) - left side */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2.5">
                    Detected in creative
                  </p>
                  <p className="text-[11px] text-muted-foreground/50 mb-2">
                    Click to highlight in preview
                  </p>
                  <ul className="space-y-1.5">
                    {signal.detected.map((item, index) => (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() => handleDetectionClick(index)}
                          className={cn(
                            "group w-full text-left text-xs flex items-center gap-3 pl-3 pr-3 py-2.5 rounded-lg transition-all duration-150 cursor-pointer border",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            activeDetection === index
                              ? "bg-emerald-500/10 text-emerald-700 border-emerald-300 shadow-sm"
                              : "text-muted-foreground border-border/60 hover:border-emerald-200 hover:bg-emerald-500/5 hover:text-foreground",
                          )}
                        >
                          <span
                            className={cn(
                              "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-[10px] font-semibold transition-colors duration-150",
                              activeDetection === index
                                ? "bg-emerald-500 text-white"
                                : "bg-muted text-muted-foreground group-hover:bg-emerald-100 group-hover:text-emerald-600",
                            )}
                          >
                            {index + 1}
                          </span>
                          <span className="flex-1 leading-snug">{item.label}</span>
                          {activeDetection === index && (
                            <span className="text-[10px] text-emerald-600 font-medium flex-shrink-0">
                              viewing
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Creative image with highlight overlay - right side */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2.5">
                    Preview
                  </p>
                  <div className="relative overflow-hidden border border-border/50 bg-muted/20">
                    {/* Base image */}
                    <img
                      src={CREATIVE_IMAGE_URL}
                      alt="Creative being analyzed"
                      className="w-full h-auto block"
                    />

                    {/* Bright highlight region on top of dim */}
                    {activeDetection !== null && signal.detected[activeDetection] && (() => {
                      const r = signal.detected[activeDetection].region
                      return (
                        <div
                          className="absolute overflow-hidden rounded pointer-events-none"
                          style={{
                            top: `${r.top}%`,
                            left: `${r.left}%`,
                            width: `${r.width}%`,
                            height: `${r.height}%`,
                            zIndex: 2,
                          }}
                        >
                          <img
                            src={CREATIVE_IMAGE_URL}
                            alt=""
                            className="absolute block"
                            style={{
                              top: `-${(r.top / r.height) * 100}%`,
                              left: `-${(r.left / r.width) * 100}%`,
                              width: `${(100 / r.width) * 100}%`,
                              height: `${(100 / r.height) * 100}%`,
                            }}
                          />
                        </div>
                      )
                    })()}

                    {/* Green border around the highlight */}
                    {activeDetection !== null && signal.detected[activeDetection] && (() => {
                      const r = signal.detected[activeDetection].region
                      return (
                        <div
                          className="absolute transition-all duration-300 ease-out border-2 border-emerald-400 pointer-events-none"
                          style={{
                            top: `${r.top}%`,
                            left: `${r.left}%`,
                            width: `${r.width}%`,
                            height: `${r.height}%`,
                            boxShadow: "0 0 0 2px rgba(52, 211, 153, 0.25), inset 0 0 12px rgba(52, 211, 153, 0.08)",
                            zIndex: 3,
                          }}
                        />
                      )
                    })()}
                  </div>
                </div>
              </div>


            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

export function ScoreDriversTab() {
  const [openSignal, setOpenSignal] = useState<string | null>(null)

  return (
    <div className="space-y-8">

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted flex-shrink-0">
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
        <p>
          These signals explain why your creative scored the way it did.
          <br />
          Expand a signal to see what the model detected.
        </p>
      </div>

      <Card className="bg-card/10 ">
        <CardHeader>
          <CardTitle className="text-xl">What Drove Your Scores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Signal cards with accordion behavior */}
          <div className="space-y-3">
            {/* Brief item 4: microcopy hint */}

            {signals.map((signal) => (
              <SignalCard
                key={signal.id}
                signal={signal}
                isOpen={openSignal === signal.id}
                onToggle={() =>
                  setOpenSignal((prev) =>
                    prev === signal.id ? null : signal.id,
                  )
                }
              />
            ))}
          </div>

        </CardContent>
      </Card>

      {/* Footer card */}
      <Card className="bg-card/10">
        <CardContent>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted flex-shrink-0">
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Why this matters</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                Understanding these drivers helps you separate design issues from context mismatch, before making changes to the creative.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
