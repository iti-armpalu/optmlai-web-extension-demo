import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { Clock, CheckCircle2, Info, AlertCircle, ChevronRight } from "lucide-react"
import { DetectedPreview } from "../detected-preview"

const CREATIVE_IMAGE_URL =
  "https://images.squarespace-cdn.com/content/v1/5ef0ef1b02a1d05e6faff7ac/1593379290858-GI2TYZN1I701KK95J8W2/Ad_page_01.jpg"

interface ContextCardProps {
  context: {
    id: string
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
  isOpen: boolean
  onToggle: () => void
}

export function ContextCard({ context, value, isOpen, onToggle }: ContextCardProps) {

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
    <Collapsible
      open={isOpen}
      onOpenChange={() => {
        onToggle()
      }}
    >
      <Card
        className={cn(
          "transition-all duration-200",
          isOpen ? "border-primary/40 shadow-sm" : "hover:border-primary/20 hover:bg-muted/30",
        )}
      >
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
          >
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 flex-wrap">
                    <h3 className="font-semibold text-foreground">{context.name}</h3>
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

                  {!isOpen && <p className="text-sm text-muted-foreground mt-1 truncate">{context.environment}</p>}
                </div>

                <Badge variant="outline" className="text-xs font-medium">
                  <Clock className="h-3 w-3 mr-1.5" />
                  {context.exposureTime}
                </Badge>

                <ChevronRight
                  className={cn(
                    "w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                    isOpen && "rotate-90",
                  )}
                />
              </div>
            </CardContent>
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-6 pb-6">
            <div className="space-y-4">

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                  Context environment
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{context.environment}</p>
              </div>

              <Separator className="bg-border/60" />

              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                  {context.behaviorTitle}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{context.behaviorDescription}</p>
              </div>

              <Separator className="bg-border/60" />

              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                  How the creative behaves in this context
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{context.performanceVerdict}</p>
              </div>

              <Separator className="bg-border/60" />

              <DetectedPreview
                imageUrl={CREATIVE_IMAGE_URL}
                items={context.designImplications}
              />

              <Separator className="bg-border/60" />

              {context.recommendation && (
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                    How to use this context effectively
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{context.recommendation}</p>
                </div>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
