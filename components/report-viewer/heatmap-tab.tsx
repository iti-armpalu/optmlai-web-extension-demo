"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReportItem } from "@/store/report-store"
import HeatmapSlider from "./heatmap-slider"
import { Info, Sparkle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

interface HeatmapTabProps {
    report: ReportItem
}

export function HeatmapTab({ report }: HeatmapTabProps) {

    return (
        <TooltipProvider>
            <div className="space-y-8">

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Info className="h-4 w-4 shrink-0" />
                    <p>
                        This view shows where visual attention is most likely to go in the first few seconds, based on eye-tracking prediction models.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card className="lg:col-span-3 border-green-600/10 bg-green-50/50 text-green-600 dark:bg-green-950/30 dark:text-green-500">
                        <CardContent>
                            <div className="flex items-start gap-3">
                                <Sparkle className="w-5 h-5" />
                                <div className="flex-1 space-y-1">
                                    <h3 className="text-sm font-semibold">Key Insight</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Viewers notice the <strong className="text-foreground">headline and superhero imagery</strong> first
                                        (immediate), followed by the <strong className="text-foreground">product benefits section</strong>{" "}
                                        (early). Body text and CTA receive minimal attention during fast-scrolling or quick-glance moments.
                                    </p>

                                    {/* <div className="flex gap-4 pt-2">
                                        <div className="text-xs flex items-center gap-1.5">
                                            <span className="text-muted-foreground">Attention Score: </span>
                                            <span className="font-semibold text-foreground">92%</span>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-xs">
                                                    <p className="text-xs">
                                                        Measures how effectively your content captures and holds visual attention. Based on predicted
                                                        eye-tracking patterns, color contrast, and visual hierarchy.
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                        <div className="text-xs flex items-center gap-1.5">
                                            <span className="text-muted-foreground">Clarity Score: </span>
                                            <span className="font-semibold text-foreground">72%</span>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-xs">
                                                    <p className="text-xs">
                                                        Evaluates how easily viewers can understand your message. Analyzes text readability,
                                                        information density, and cognitive load required to process the content.
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* <div className="border-l border-border pl-6">
                        <h4 className="text-xs font-semibold text-foreground mb-1">Attention Levels</h4>
                        <p className="text-[10px] text-muted-foreground mb-3 leading-tight">
                            (Based on predicted likelihood of fixation)
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-start gap-2">
                                <div>
                                    <div className="text-xs font-medium">Immediate (very high)</div>
                                    <div className="text-[10px] text-muted-foreground leading-tight">
                                        85%+ likelihood of drawing first attention
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div>
                                    <div className="text-xs font-medium">Early (high)</div>
                                    <div className="text-[10px] text-muted-foreground leading-tight">
                                        70–84% likelihood of early attention
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div>
                                    <div className="text-xs font-medium">Mid (medium)</div>
                                    <div className="text-[10px] text-muted-foreground leading-tight">
                                        50–69% likelihood of mid-sequence attention
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div>
                                    <div className="text-xs font-medium">Late (low)</div>
                                    <div className="text-[10px] text-muted-foreground leading-tight">
                                        30–49% likelihood of low attention
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-2">
                                <div>
                                    <div className="text-xs font-medium">Very Late (very low)</div>
                                    <div className="text-[10px] text-muted-foreground leading-tight">
                                        &lt;30% likelihood of receiving attention
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
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
                                        This is the captured screenshot before analysis. Compare the original screenshot with its attention
                                        heatmap.
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


                        {/* <div className="flex gap-2">
                        <Button
                            variant={heatmapMode === "heatmap" ? "default" : "outline"}
                            onClick={() => setHeatmapMode("heatmap")}
                            size="sm"
                        >
                            Heatmap
                        </Button>
                        <Button
                            variant={heatmapMode === "focus" ? "default" : "outline"}
                            onClick={() => setHeatmapMode("focus")}
                            size="sm"
                        >
                            Focus
                        </Button>
                        <Button
                            variant={heatmapMode === "original" ? "default" : "outline"}
                            onClick={() => setHeatmapMode("original")}
                            size="sm"
                        >
                            Original
                        </Button>
                    </div> */}

                        <HeatmapSlider
                            beforeSrc={report.image}
                            afterSrc={report.report.heatmap.image}
                        />
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                                <span>Attention Intensity Scale</span>
                                <span>Based on eye-tracking prediction</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                                <div className="flex items-center gap-2 p-2 rounded-md border border-border bg-background/50">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-red-600 to-red-500 shadow-sm" />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">Very High</div>
                                        <div className="text-xs text-muted-foreground">0-0.5s, 85%+</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 p-2 rounded-md border border-border bg-background/50">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-500 to-orange-400 shadow-sm" />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">High</div>
                                        <div className="text-xs text-muted-foreground">0.5-1s, 70-84%</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 p-2 rounded-md border border-border bg-background/50">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-yellow-400 to-yellow-300 shadow-sm" />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">Medium</div>
                                        <div className="text-xs text-muted-foreground">1-2s, 50-69%</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 p-2 rounded-md border border-border bg-background/50">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-green-400 to-green-300 shadow-sm" />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">Low</div>
                                        <div className="text-xs text-muted-foreground">2-4s, 30-49%</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 p-2 rounded-md border border-border bg-background/50">
                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-400 to-blue-300 shadow-sm" />
                                    <div className="flex-1">
                                        <div className="text-sm font-medium">Very Low</div>
                                        <div className="text-xs text-muted-foreground">4s+, &lt;30%</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-2 p-3 rounded-md bg-muted/50 border border-border">
                                <div className="text-xs text-muted-foreground leading-relaxed">
                                    <strong className="text-foreground">Color Mapping:</strong> Red zones indicate immediate attention
                                    capture (fixation within first 0.5s). Orange represents strong secondary focus. Yellow shows moderate
                                    engagement areas. Green and blue indicate peripheral or delayed attention zones. Percentages reflect
                                    predicted viewer fixation probability.
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer Note */}
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-3">
                        <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Why this matters:</strong> Understanding which elements attract attention first helps
                            you optimize layout, hierarchy, and CTA visibility for faster comprehension and higher engagement.
                        </div>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}
