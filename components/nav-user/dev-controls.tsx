"use client"
import type { SubscriptionTier } from "./credit-details"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useEffect } from "react"
import { getMaxCreditsForTier } from "@/lib/credit-utils"

interface DevControlsProps {
  tier: SubscriptionTier
  onTierChange: (tier: SubscriptionTier) => void
  credits: number
  onCreditsChange: (credits: number) => void
  freeCredits: number
  onFreeCreditsChange: (credits: number) => void
  daysUntilRenewal: number
  onDaysUntilRenewalChange: (days: number) => void
}

export function DevControls({
  tier,
  onTierChange,
  credits,
  onCreditsChange,
  freeCredits,
  onFreeCreditsChange,
  daysUntilRenewal,
  onDaysUntilRenewalChange,
}: DevControlsProps) {
  const maxCredits = getMaxCreditsForTier(tier)
  const hasFreeCreditAvailable = freeCredits > 0

  useEffect(() => {
    if (tier !== "free" && maxCredits > 0) {
      onCreditsChange(maxCredits)
    }
  }, [tier, maxCredits, onCreditsChange])

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="controls">
        <AccordionTrigger className="text-sm font-medium">Controls (For dev use only)</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pt-2">
            {/* Tier Selection */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Tier</label>
              <select
                value={tier}
                onChange={(e) => onTierChange(e.target.value as SubscriptionTier)}
                className="w-full mt-1.5 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="free">Free (0 credits)</option>
                <option value="starter">Starter (10 credits)</option>
                <option value="pro">Pro (20 credits)</option>
                <option value="enterprise">Enterprise (30 credits)</option>
              </select>
            </div>

            {/* Credits Slider */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Credits: <span className="text-foreground">{credits}</span>
              </label>
              {hasFreeCreditAvailable && (
                <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
                  Monthly credits cannot be used while free credits are available
                </p>
              )}
              <input
                type="range"
                min="0"
                max={maxCredits}
                value={Math.min(credits, maxCredits)}
                onChange={(e) => onCreditsChange(Number(e.target.value))}
                disabled={hasFreeCreditAvailable}
                className="w-full mt-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Free Credits Slider */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Free Credits: <span className="text-foreground">{freeCredits}</span>
              </label>
              <input
                type="range"
                min="0"
                max="3"
                value={freeCredits}
                onChange={(e) => onFreeCreditsChange(Number(e.target.value))}
                className="w-full mt-1.5"
              />
            </div>

            {/* Days Until Renewal Slider */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Days Until Renewal: <span className="text-foreground">{daysUntilRenewal}</span>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={daysUntilRenewal}
                onChange={(e) => onDaysUntilRenewalChange(Number(e.target.value))}
                className="w-full mt-1.5"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
