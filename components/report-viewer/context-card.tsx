import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Trophy, Clock, Brain, Lightbulb, MousePointerClick, Zap, ChevronDown, Target, CheckCircle2, Info, AlertCircle } from "lucide-react"
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

interface ContextCardProps {
    context: {
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
    isBest: boolean
    value: string
}

export function ContextCard({ context, isBest, value }: ContextCardProps) {
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
            className={`border rounded-lg transition-all ${isBest ? "ring-2 ring-emerald-500 shadow-lg" : ""}`}
        >
            <AccordionTrigger className="px-6 hover:no-underline">
                {/* Accordion Header - Always visible */}
                <div className="flex items-center justify-between w-full gap-4 text-left">
                    <div className="flex items-center gap-6 flex-1">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">{context.name}</h3>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">{context.environment}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Badge className={`${getBadgeColor(context.fitLevel)} inline-flex items-center gap-1.5`}>
                                {getFitIcon(context.fitLevel)}
                                {context.fitLevel}
                            </Badge>
                            {context.fitLevel === "Best fit" && (
                                <span className="text-[10px] text-muted-foreground ml-1">Compared to other tested contexts</span>
                            )}
                        </div>
                    </div>

                </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
                <div className="space-y-5 pt-4">
                    {/* 1. Viewing Reality */}
                    {/* <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{context.environment}</p>
                    </div> */}

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
                        <h4 className="text-sm font-medium text-foreground">Why this happens</h4>
                        <ul className="space-y-2">
                            {context.designImplications.map((point, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                                    <span className="text-primary mt-1">•</span>
                                    <span className="flex-1">{point}</span>
                                </li>
                            ))}
                        </ul>
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



            {/* <Card className={`transition-all ${isBest ? "border-2 border-chart-1 bg-chart-1/5" : ""}`}> */}
            {/* <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                        <CardTitle className="text-base flex items-center gap-2 flex-wrap">
                            {context.name}
                            {isBest && (
                                <Badge className="bg-chart-1 hover:bg-chart-1/90">
                                    <Trophy className="h-3 w-3 mr-1" />
                                    Best Overall
                                </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {context.attentionTime}
                            </Badge>
                        </CardTitle>
                        <CardDescription className="mt-2">{context.insights}</CardDescription>
                    </div>
                    <Badge
                        variant={
                            context.recommendedUse === "High"
                                ? "default"
                                : context.recommendedUse.includes("Medium")
                                    ? "secondary"
                                    : "outline"
                        }
                        className="shrink-0"
                    >
                        {context.recommendedUse}
                    </Badge>
                </div>
            </CardHeader> */}
            {/* <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Attention Score</span>
              <span className="font-semibold">{context.attentionScore}/100</span>
            </div>
            <Progress value={context.attentionScore} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Clarity Score</span>
              <span className="font-semibold">{context.clarityScore}/100</span>
            </div>
            <Progress value={context.clarityScore} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Conversion Potential</span>
              <span className="font-semibold text-chart-1">{context.conversionPotential}%</span>
            </div>
            <Progress value={context.conversionPotential} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Engagement Likelihood</span>
              <span className="font-semibold">{context.metrics.engagementLikelihood}</span>
            </div>
            <Progress value={Number.parseInt(context.metrics.engagementLikelihood)} className="h-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-border">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Cognitive Load</div>
            <div className="text-sm font-medium flex items-center gap-1">
              <Brain className="h-3 w-3" />
              {context.metrics.cognitiveLoad}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Processing Time</div>
            <div className="text-sm font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {context.metrics.processingTime}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Recall Rate</div>
            <div className="text-sm font-medium flex items-center gap-1">
              <Lightbulb className="h-3 w-3" />
              {context.metrics.recallRate}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Click Intent</div>
            <div className="text-sm font-medium flex items-center gap-1">
              <MousePointerClick className="h-3 w-3" />
              {context.metrics.engagementLikelihood}
            </div>
          </div>
        </div>

        <Collapsible>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Zap className="h-3 w-3 mr-2" />
              View Tailored Recommendations
              <ChevronDown className="h-4 w-4 ml-auto" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-3 space-y-2">
            {context.recommendations.map((rec, recIdx) => (
              <div key={recIdx} className="flex gap-2 text-sm">
                <Target className="h-4 w-4 text-chart-1 shrink-0 mt-0.5" />
                <span className="text-muted-foreground leading-relaxed">{rec}</span>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent> */}
            {/* </Card> */}
        </AccordionItem>
    )
}
