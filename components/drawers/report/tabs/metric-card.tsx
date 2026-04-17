import { Card, CardContent} from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { HelpCircle } from "lucide-react"

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
    const isNumeric = /^\d+$/.test(value)
    return (
        <Card className="transition-all duration-200 hover:border-primary/20 hover:shadow-sm py-0">
            <CardContent className="pt-5 pb-4">
                {/* Title row */}
                <div className="flex items-center gap-1.5 mb-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
                    <TooltipProvider delayDuration={200}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="cursor-help focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full">
                                    <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors" />
                                    <span className="sr-only">More info about {title}</span>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-60 text-xs leading-relaxed">
                                {tooltipContent}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                {/* Value */}
                <p className={cn(
                    "font-bold leading-tight",
                    valueColor,
                    isNumeric ? "text-3xl tabular-nums" : "text-lg",
                )}>
                    {value}
                </p>

                {/* Description */}
                <p className="text-xs text-muted-foreground mt-1">{description}</p>

                {/* Explanation */}
                <div className="mt-3 pt-3 border-t border-border/50">
                    <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
                        {ratingExplanation}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
