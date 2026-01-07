import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Zap, Sparkle, Info } from "lucide-react"
import { MetricCard } from "./metric-card"


interface OverviewTabProps {
    bestContext: {
        name: string
        category: string
    }
}

export function OverviewTab({ bestContext }: OverviewTabProps) {
    return (
        <div className="space-y-8">

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Info className="h-4 w-4 shrink-0" />
                <p>
                    This evaluation is a summary of 10 different contexts across
                    retail, e-commerce, and social environments. View detailed
                    performance for each context in the Contexts tab.
                </p>
            </div>

            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-stretch">
                <MetricCard
                    title="Overall Attention"
                    value="High"
                    description="Avg: 82/100 across all contexts"
                    valueColor="text-green-500"
                    tooltipContent="Attention Score measures how quickly and effectively your creative captures visual focus. It predicts the likelihood users will notice key elements within the first 3 seconds based on eye-tracking patterns and visual hierarchy analysis."
                    ratingExplanation="Effectively attracts audience attention"
                />
                <MetricCard
                    title="Overall Clarity"
                    value="Medium"
                    description="Avg: 66/100 across all contexts"
                    valueColor="text-orange-500"
                    tooltipContent="Clarity Score evaluates how easily users can understand your message, value proposition, and call-to-action. It analyzes text hierarchy, information density, visual structure, and cognitive load to predict comprehension and decision-making ease."
                    ratingExplanation="Message is moderately clear, some refinement needed"
                />

                {/* <MetricCard
                    title="Best Performing Context"
                    value={bestContext.name}
                    // description={`${bestContext.conversionPotential}% conversion potential`}
                    valueColor="text-purple-600"
                    badge={`${bestContext.category} Context`}
                    tooltipContent="The context with the highest predicted conversion potential based on attention capture, message clarity, and user behavior patterns. This indicates where your creative will perform best."
                    ratingExplanation="Highest predicted performance across all contexts"
                /> */}
                {/* <Card className="border-purple-600/10 bg-purple-50/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            Best Performing Context
                            
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold text-chart-1 leading-tight">{bestContext.name}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {bestContext.conversionPotential}% conversion potential
                        </p>
                    </CardContent>
                </Card> */}
                {/* <Card className="border-chart-4 bg-chart-4/5">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Top Priority
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-medium leading-tight">Improve clarity for evaluation contexts</div>
                    </CardContent>
                </Card> */}
            </section>

            <Card className="border-green-600/10 bg-green-50/50 text-green-600 dark:bg-green-950/30 dark:text-green-500">
                <CardContent>
                    <div className="flex items-start gap-3">
                        <Sparkle className="w-5 h-5" />
                        <div className="flex-1 space-y-1">
                            <h3 className="text-sm font-semibold">Key Insight</h3>
                            <p className="text-foreground leading-relaxed">
                                Your content excels in quick-attention scenarios (billboards, social feeds, discovery pages) with strong
                                visual impact. However, clarity drops significantly in evaluation contexts where users spend 5+ seconds
                                analyzing details.
                                <strong className="text-foreground"> Optimizing for {bestContext.name}</strong> will maximize immediate impact,
                                while improving text structure will unlock performance in consideration phases.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-2 border-chart-1 bg-gradient-to-br from-chart-1/10 via-chart-1/5 to-transparent shadow-[0_0_20px_rgba(var(--chart-1-rgb),0.15)]">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Trophy className="h-6 w-6 text-chart-1" />
                        Performance Summary & Strategic Recommendation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-3">
                        <Card className="bg-background">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm text-muted-foreground">Best Performing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-xl font-bold text-chart-1">{bestContext.name}</div>
                                <div className="text-sm text-muted-foreground mt-1">{bestContext.category} Context</div>
                                {/* <div className="text-2xl font-bold text-chart-1 mt-2">{bestContext.conversionPotential}%</div> */}
                                <div className="text-xs text-muted-foreground">Conversion Potential</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-background">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm text-muted-foreground">Needs Improvement</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg font-bold">Evaluation Contexts</div>
                                <div className="text-sm text-muted-foreground mt-1">PDP Features & Destination</div>
                                <div className="text-2xl font-bold text-destructive mt-2">52-58%</div>
                                <div className="text-xs text-muted-foreground">Clarity Range</div>
                            </CardContent>
                        </Card>

                        <Card className="bg-background">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm text-muted-foreground">Quick Win</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg font-bold">Text Hierarchy</div>
                                <div className="text-sm text-muted-foreground mt-1">+15% clarity gain</div>
                                <div className="text-2xl font-bold text-success mt-2">High Impact</div>
                                <div className="text-xs text-muted-foreground">Low Effort</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Target className="h-5 w-5 text-chart-1" />
                                Strategic Recommendation
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Deploy this creative in <strong className="text-foreground">{bestContext.name}</strong> contexts first
                                to maximize immediate ROI. For longer-dwell contexts (evaluation, validation), create a variant with
                                improved text hierarchy, bullet points instead of paragraphs, and prominent social proof elements.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Zap className="h-5 w-5 text-chart-4" />
                                Priority Actions
                            </h3>
                            <div className="space-y-2">
                                <div className="flex gap-2 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-chart-1 text-white flex items-center justify-center shrink-0 font-semibold">
                                        1
                                    </div>
                                    <span className="text-muted-foreground leading-relaxed">
                                        Launch in social feeds and discovery pages immediately (88-90% conversion potential)
                                    </span>
                                </div>
                                <div className="flex gap-2 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-chart-1 text-white flex items-center justify-center shrink-0 font-semibold">
                                        2
                                    </div>
                                    <span className="text-muted-foreground leading-relaxed">
                                        Simplify body text structure with bullet points and headers (+15-20% clarity gain)
                                    </span>
                                </div>
                                <div className="flex gap-2 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-chart-1 text-white flex items-center justify-center shrink-0 font-semibold">
                                        3
                                    </div>
                                    <span className="text-muted-foreground leading-relaxed">
                                        A/B test CTA prominence variations for mid-dwell contexts (checkout, transition)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
