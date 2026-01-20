import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {  Clock, MousePointerClick, CheckCircle2, Info, AlertCircle, ChevronRight } from "lucide-react"

import { useState } from "react"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ContextCardProps {
  context: {
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
}

const aoiRegions: Record<string, { x: number; y: number; width: number; height: number }> = {
  headline: { x: 30, y: 10, width: 40, height: 10 },
  hero: { x: 15, y: 40, width: 70, height: 35 },
  benefits: { x: 10, y: 60, width: 80, height: 25 },
  cta: { x: 35, y: 85, width: 30, height: 10 },
}

const getAOIForText = (text: string): string[] => {
  const lowerText = text.toLowerCase()
  const aois: string[] = []

  if (lowerText.includes("headline")) aois.push("headline")
  if (lowerText.includes("hero") || lowerText.includes("image")) aois.push("hero")
  if (lowerText.includes("benefit") || lowerText.includes("copy") || lowerText.includes("text")) aois.push("benefits")
  if (lowerText.includes("cta") || lowerText.includes("call to action")) aois.push("cta")

  return aois
}

export function ContextCard({ context, value }: ContextCardProps) {
  const [highlightedAOIs, setHighlightedAOIs] = useState<string[]>([])

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
        return <CheckCircle2 className="h-3.5 w-3.5" />
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

  return (
    <AccordionItem
      value={value}
      className={`border rounded-lg transition-all`}
    >
      <AccordionTrigger>
          {/* Accordion Header - Always visible */}
          <div className="flex flex-col w-full gap-0">
            <div className="flex items-center justify-between w-full gap-4 text-left">

              <div className="flex items-center justify-between flex-1">
                <div className="flex items-center gap-6 flex-1">


                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{context.name}</h3>

                  </div>

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

                <Badge variant="outline" className="text-xs font-medium">
                  <Clock className="h-3 w-3 mr-1.5" />
                  {context.exposureTime}
                </Badge>
              </div>


            </div>
            <div>
              <p className="text-sm text-muted-foreground">{context.environment}</p>
            </div>
          </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">



        <div className="space-y-5">

          <div className="grid lg:grid-cols-[1fr_300px] gap-6">
            <div className="space-y-5 pt-4">

              {/* 2. What people are doing here */}
              <div className="space-y-2 pt-3 border-t">
                <h4 className="text-sm font-medium text-foreground">{context.behaviorTitle}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{context.behaviorDescription}</p>
              </div>

              {/* 3. How this creative performs */}
              <div className="space-y-3 pt-3 border-t">
                <h4 className="text-sm font-medium text-foreground">How the creative behaves in this context</h4>
                <p className="text-sm text-foreground leading-relaxed">{context.performanceVerdict}</p>
              </div>

              {/* 4. Why it works or struggles */}
              <div className="space-y-2 pt-3 border-t">
                <div className="flex items-center justify-start gap-2">
                  <h4 className="text-sm font-medium text-foreground">Why this happens</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                    <MousePointerClick className="h-3 w-3" />
                    <span>Hover to see what the model detected</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {context.designImplications.map((point) => {
                    const hasAOI = getAOIForText(point).length > 0
                    return (
                      <li
                        key={point}
                        className={`text-sm text-muted-foreground leading-relaxed flex items-center gap-3 transition-all ${hasAOI
                          ? "cursor-pointer hover:text-foreground hover:bg-accent/40 px-3 py-2.5 -mx-3 border-l-2 border-transparent hover:border-emerald-500 hover:shadow-sm"
                          : "py-1"
                          }`}
                        onMouseEnter={() => hasAOI && setHighlightedAOIs(getAOIForText(point))}
                        onMouseLeave={() => setHighlightedAOIs([])}
                      >
                        {hasAOI ? (
                          <ChevronRight className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                        ) : (
                          <span className="flex-shrink-0 font-semibold text-primary">•</span>
                        )}
                        <span className="flex-1">{point}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>


            </div>

            <div className="lg:sticky lg:top-4 lg:self-start">
              {/* <div className="space-y-2"> */}
              <Card className="overflow-hidden shadow-xl rounded-md bg-emerald-300/10 border-none gap-2 py-1">
                <div className="flex items-center justify-between p-3 border-b">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Creative Preview</p>
                  {highlightedAOIs.length > 0 && (
                    <Badge
                      variant="outline"
                      className="text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                    >
                      Area highlighted
                    </Badge>
                  )}
                </div>
                <CardContent className="p-3">
                  <div className="relative aspect-[3/4] bg-muted overflow-hidden">

                    <img
                      src="https://images.squarespace-cdn.com/content/v1/5ef0ef1b02a1d05e6faff7ac/1593379290858-GI2TYZN1I701KK95J8W2/Ad_page_01.jpg"
                      alt="Creative preview"
                      className="w-full h-full object-cover"
                    />


                    {Object.entries(aoiRegions).map(([key, region]) => (
                      <div
                        key={key}
                        className={`absolute border-2 rounded transition-all duration-300 ${highlightedAOIs.includes(key)
                          ? "border-emerald-500 bg-emerald-500/20 opacity-100"
                          : "border-transparent opacity-0"
                          }`}
                        style={{
                          left: `${region.x}%`,
                          top: `${region.y}%`,
                          width: `${region.width}%`,
                          height: `${region.height}%`,
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
                <div className="p-3 bg-muted/20 border-t">
                  <p className="text-[11px] text-muted-foreground italic flex items-center gap-1.5">
                    <MousePointerClick className="h-3 w-3 flex-shrink-0" />
                    Hover over items with ▸ to see highlighted areas
                  </p>
                </div>

              </Card>
              {/* </div> */}

            </div>



          </div>

          {/* 5. Optional: What to do with this insight */}
          {context.recommendation && (
            <div className="space-y-2 pt-3 border-t bg-muted/30 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
              <h4 className="text-sm font-medium text-foreground">How to use this context effectively</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{context.recommendation}</p>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
