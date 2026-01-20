import { Info, Trophy, Target, Zap, Sparkle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "./metric-card"
import { dummyReportOverview } from "@/lib/dummy-report-data"


const toneToColor = {
  positive: "text-green-500",
  warning: "text-orange-500",
  negative: "text-red-500",
} as const

export function OverviewTab() {

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <Info className="h-4 w-4 shrink-0" />
        <p>{dummyReportOverview.intro}</p>
      </div>

      {/* Metrics */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dummyReportOverview.metrics.map((m) => (
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

      {/* Key Insight */}
      <Card className="border-green-600/10 bg-green-50/50 dark:bg-green-950/30">
        <CardContent>
          <div className="flex gap-3">
            <Sparkle className="h-5 w-5" />
            <div>
              <h3 className="text-sm font-semibold">
                {dummyReportOverview.keyInsight.title}
              </h3>
              <p className="leading-relaxed">
                {/* {tpl(dummyReportOverview.keyInsight.body, vars)} */}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            {dummyReportOverview.summary.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  {dummyReportOverview.summary.bestPerforming.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">
                  {/* {tpl(dummyReportOverview.summary.bestPerforming.value, vars)} */}
                </div>
                <div className="text-sm text-muted-foreground">
                  {/* {tpl(dummyReportOverview.summary.bestPerforming.context, vars)} */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  {dummyReportOverview.summary.needsImprovement.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold">
                  {dummyReportOverview.summary.needsImprovement.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {dummyReportOverview.summary.needsImprovement.detail}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  {dummyReportOverview.summary.quickWin.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold">
                  {dummyReportOverview.summary.quickWin.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {dummyReportOverview.summary.quickWin.impact}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Priority actions */}
          <div>
            <h3 className="font-semibold flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5" />
              Priority Actions
            </h3>
            <ul className="space-y-2">
              {dummyReportOverview.summary.priorityActions.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="font-semibold">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
