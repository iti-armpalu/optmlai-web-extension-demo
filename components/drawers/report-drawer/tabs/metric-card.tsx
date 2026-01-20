import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface MetricCardProps {
    title: string
    value: string
    description: string
    valueColor?: string
    tooltipContent?: string
    ratingExplanation?: string // Added optional rating explanation prop
    badge?: string // Added badge prop for context labels
}

export function MetricCard({
    title,
    value,
    description,
    valueColor,
    tooltipContent,
    ratingExplanation, // Added to destructured props
    badge, // Added badge to destructured props
}: MetricCardProps) {
    return (
        <Card className="border-purple-600/10 bg-purple-50/50 h-full flex flex-col gap-4">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    {title}
                    {tooltipContent && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="h-3.5 w-3.5 text-muted-foreground/60 hover:text-muted-foreground cursor-help transition-colors" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs">
                                    <p className="text-xs leading-relaxed">{tooltipContent}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
                {badge && (
                    <div className="self-start inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-1">
                        <span className="text-[8px] font-semibold text-purple-600 uppercase tracking-wide">{badge}</span>
                    </div>
                )}
                <div className={`text-2xl font-bold text-success ${valueColor || "text-foreground"}`}>{value}</div>
                <p className="text-xs text-muted-foreground mt-1 mb-2">{description}</p>
                {/* {ratingExplanation && ( */}
                <div className="mt-auto pt-3 border-t border-border/50">
                    <p className="text-xs font-medium text-foreground/80 flex items-center gap-1.5">
                        {/* <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" /> */}
                        {ratingExplanation}
                    </p>
                </div>
                {/* )} */}
            </CardContent>
        </Card>
    )
}
