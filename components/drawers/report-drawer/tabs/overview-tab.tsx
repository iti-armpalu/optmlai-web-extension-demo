import { Info, Trophy, Target, Zap, Sparkle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "./metric-card"
import { LockedSection } from "../locked-report-overlay"
import { dummyOverviewTab } from "../_content/dummy-overview"

type MetricTone = "positive" | "neutral" | "negative"

const toneToColor: Record<MetricTone, string> = {
  positive: "text-emerald-600",
  neutral: "text-amber-600",
  negative: "text-red-500",
}

interface OverviewTabProps {
  analysisSetupConfirmed: boolean
  onOpenDialog: () => void
}

export function OverviewTab({ analysisSetupConfirmed, onOpenDialog }: OverviewTabProps) {

  return (
    <div className="space-y-8">

      {/* Intro */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted flex-shrink-0">
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
        <p>
          {dummyOverviewTab.intro}
        </p>
      </div>

      <LockedSection
        locked={!analysisSetupConfirmed}
        onUnlock={onOpenDialog}
        overlayTitle="Confirmation Required"
        overlayDescription="Confirm detected elements to view this insight."
      >

        {/* Metrics */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dummyOverviewTab.metrics.map((m) => (
            <MetricCard
              key={m.title}
              title={m.title}
              value={m.value}
              description={m.description}
              tooltipContent={m.tooltip}
              ratingExplanation={m.explanation}
              valueColor={toneToColor[m.tone]}
            />
          ))}
        </section>

        {/* Summary */}
        <Card className="bg-card/10 ">
          <CardHeader>
            <CardTitle className="text-xl">
              {dummyOverviewTab.summary.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* Creative Performance Summary */}
            <Card>
              <CardContent>
                <h3 className="text-sm font-semibold text-foreground mb-2">Creative Performance Summary</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This creative demonstrates strong visual foundations with effective brand presence and product imagery that
                  capture attention quickly. However, message density and a low-contrast CTA reduce its ability to convert
                  attention into action. The overall score of 71 places it above average but below top-performing benchmarks,
                  suggesting targeted refinements rather than a full redesign.
                </p>
              </CardContent>
            </Card>


            {/* Recommended Improvements */}
            <Card>
              <CardContent>
                <h3 className="text-sm font-semibold text-foreground mb-3">Priority Actions</h3>
                <ol className="space-y-3">
                  {dummyOverviewTab.summary.actions.map((action, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{action.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                          {action.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Context Usage Guidance */}
            <Card className="border-purple-600/10 bg-purple-50/50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-500">
              <CardContent>
                <div className="flex items-start gap-3">
                  <div>
                    <p className="text-xs font-medium text-foreground uppercase tracking-wider mb-1">
                      Best Used In
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">
                      Retail proximity and e-commerce placements where
                      purchase intent is already high and brand recognition
                      drives conversion.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>



          </CardContent>
        </Card>
      </LockedSection>

    </div>
  )
}
