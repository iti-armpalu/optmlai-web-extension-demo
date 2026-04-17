'use client'

import { Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { dummyHeatmapData } from '@/data/dummy-heatmap'
import HeatmapSlider from '../heatmap/heatmap-slider'


export function HeatmapTab() {
    const { keyInsight, imageSrc, heatmapSrc, intensityScale } = dummyHeatmapData

    return (
        <div className="space-y-6">

            <Card className="border-green-600/10 bg-green-50/50 dark:bg-green-950/30">
                <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-semibold text-green-600 dark:text-green-500 mb-1">
                                Key Insight
                            </h3>
                            <p className="text-sm text-foreground leading-relaxed">{keyInsight}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-4">
                    <h3 className="text-sm font-semibold mb-1">Visual Attention Map</h3>
                    <p className="text-[13px] text-muted-foreground mb-4">
                        Drag the slider to reveal where users are most visually focused.
                    </p>
                    <HeatmapSlider
                        beforeSrc={imageSrc}
                        afterSrc={heatmapSrc}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                            Attention Intensity Scale
                        </h3>
                        <span className="text-[11px] text-muted-foreground/50">
                            Based on predicted likelihood of fixation
                        </span>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                        {intensityScale.map((level) => {
                            const colors: Record<string, string> = {
                                immediate: 'bg-red-500',
                                early: 'bg-orange-400',
                                mid: 'bg-yellow-400',
                                late: 'bg-green-400',
                                veryLate: 'bg-blue-300',
                            }
                            return (
                                <div
                                    key={level.key}
                                    className="flex items-start gap-3 rounded-lg border border-border p-3"
                                >
                                    <span
                                        className={`w-8 h-8 rounded-md flex-shrink-0 mt-0.5 ${colors[level.key]}`}
                                    />
                                    <div>
                                        <p className="text-[13px] font-medium text-foreground leading-tight">
                                            {level.label.split(' (')[0]}
                                        </p>
                                        <p className="text-[11px] text-muted-foreground mt-0.5">
                                            {level.detail}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}