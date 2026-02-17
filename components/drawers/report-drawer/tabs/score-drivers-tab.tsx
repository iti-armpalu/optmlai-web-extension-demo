import { cn } from "@/lib/utils"
import {
  Info,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { dummyScoreDriversTab, type SignalData } from "../_content/dummy-score-drivers"
import { DetectedPreview } from "../detected-preview"

const CREATIVE_IMAGE_URL =
  "https://images.squarespace-cdn.com/content/v1/5ef0ef1b02a1d05e6faff7ac/1593379290858-GI2TYZN1I701KK95J8W2/Ad_page_01.jpg"

function SignalCard({
  signal,
  isOpen,
  onToggle,
}: {
  signal: SignalData
  isOpen: boolean
  onToggle: () => void
}) {

  return (
    <Collapsible open={isOpen} onOpenChange={(open) => {
      onToggle()
    }}>
      <Card
        className={cn(
          "transition-all duration-200",
          isOpen
            ? "border-primary/40 shadow-sm"
            : "hover:border-primary/20 hover:bg-muted/30",
        )}
      >
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
          >
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">
                      {signal.title}
                    </h3>
                  </div>
                  {!isOpen && (
                    <p className="text-sm text-muted-foreground mt-1 truncate">
                      {signal.summary}
                    </p>
                  )}
                </div>
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
            <div className="space-y-8">

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                  Signal explanation
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {signal.description}
                </p>
              </div>

              <Separator className="bg-border/60" />

              <DetectedPreview
                imageUrl={CREATIVE_IMAGE_URL}
                items={signal.detected.map((d) => d.label)}
              />

            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

export function ScoreDriversTab() {
  const [openSignal, setOpenSignal] = useState<string | null>(null)

  const signals = dummyScoreDriversTab.signals

  return (
    <div className="space-y-8">

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted flex-shrink-0">
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
        <p>
          {dummyScoreDriversTab.intro}
        </p>
      </div>

      <Card className="bg-card/10 ">
        <CardHeader>
          <CardTitle className="text-xl">What Drove Your Scores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Signal cards with accordion behavior */}
          <div className="space-y-3">
            {/* Brief item 4: microcopy hint */}

            {signals.map((signal) => (
              <SignalCard
                key={signal.id}
                signal={signal}
                isOpen={openSignal === signal.id}
                onToggle={() =>
                  setOpenSignal((prev) =>
                    prev === signal.id ? null : signal.id,
                  )
                }
              />
            ))}
          </div>

        </CardContent>
      </Card>

      {/* Footer card */}
      <Card className="bg-card/10">
        <CardContent>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted flex-shrink-0">
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Why this matters</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                {dummyScoreDriversTab.footerNote}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
