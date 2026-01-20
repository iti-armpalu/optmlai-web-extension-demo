"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportItem } from "@/store/report-store"
import HeatmapSlider from "./heatmap-slider"
import { Info, Sparkle } from "lucide-react"
import { dummyHeatmapTab } from "../_content/dummy-heatmap"
import { renderBold } from "../_content/rich-text"

interface HeatmapTabProps {
    report: ReportItem
}

const intensitySwatchClassByKey: Record<string, string> = {
    immediate: "from-red-600 to-red-500",
    early: "from-orange-500 to-orange-400",
    mid: "from-yellow-400 to-yellow-300",
    late: "from-green-400 to-green-300",
    veryLate: "from-blue-400 to-blue-300",
}

export function HeatmapTab({ report }: HeatmapTabProps) {

    return (
        <div className="space-y-8">

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Info className="h-4 w-4 shrink-0" />
                <p>{dummyHeatmapTab.intro}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-3 border-green-600/10 bg-green-50/50 text-green-600 dark:bg-green-950/30 dark:text-green-500">
                    <CardContent>
                        <div className="flex items-start gap-3">
                            <Sparkle className="w-5 h-5" />
                            <div className="flex-1 space-y-1">
                                <h3 className="text-sm font-semibold">Key Insight</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {renderBold(dummyHeatmapTab.keyInsight.body)}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>


            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Visual Attention Map</CardTitle>
                    <CardDescription>See where viewers are most likely to look first</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                    <div className="flex justify-between items-start gap-6 p-4 rounded-lg border border-border bg-muted/30">
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold">Original</span>
                                {/* <Info className="w-3.5 h-3.5 text-muted-foreground" /> */}
                            </div>
                            <div className="flex items-center gap-2">
                                {/* <Info className="w-3.5 h-3.5 text-muted-foreground" /> */}
                                <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
                                    This is the captured screenshot before analysis. Compare the original screenshot with
                                    its attention heatmap.
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 space-y-1 text-right">
                            <div className="flex items-center gap-2 justify-end">
                                {/* <Info className="w-3.5 h-3.5 text-muted-foreground" /> */}
                                <span className="text-sm font-semibold">Attention Heatmap Overlay</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed  max-w-xs ml-auto">
                                Drag the slider to reveal where users are most visually focused.
                            </p>
                        </div>
                    </div>

                    <HeatmapSlider
                        beforeSrc={report.image}
                        afterSrc={report.report.heatmap.image}
                    />
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                            <span>Attention Intensity Scale</span>
                            <span>Based on predicted likelihood of fixation</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                            {dummyHeatmapTab.intensityScale.levels.map((lvl) => (
                                <div
                                    key={lvl.key}
                                    className="flex flex-col items-start gap-2 p-2 rounded-md border border-border bg-background/50"
                                >
                                    <div
                                        className={[
                                            "w-6 h-6 rounded bg-gradient-to-br shadow-sm",
                                            intensitySwatchClassByKey[lvl.key] ?? "from-muted to-muted",
                                        ].join(" ")}
                                    />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">{lvl.label}</div>
                                        <div className="text-xs text-muted-foreground">{lvl.detail}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Footer Note */}
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">Why this matters:{" "}</strong>{dummyHeatmapTab.footerNote}
                    </div>
                </div>
            </div>
        </div>

    )
}
