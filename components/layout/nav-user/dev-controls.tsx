"use client"

import type { SubscriptionTier } from "./credit-details"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useEffect } from "react"
import { getMaxCreditsForTier } from "@/lib/credit-utils"

interface DevControlsProps {
  tier: SubscriptionTier
  onTierChange: (tier: SubscriptionTier) => void

  credits: number // monthly credits remaining
  onCreditsChange: (credits: number) => void

  freeCredits: number // sign-up bonus remaining
  onFreeCreditsChange: (credits: number) => void

  topUpCredits: number // top-up credits remaining (deducted last)
  onTopUpCreditsChange: (credits: number) => void

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
  topUpCredits,
  onTopUpCreditsChange,
  daysUntilRenewal,
  onDaysUntilRenewalChange,
}: DevControlsProps) {
  const maxMonthlyCredits = getMaxCreditsForTier(tier)
  const hasFreeCredits = freeCredits > 0
  const isFreeTier = tier === "free"

  // When switching tier (non-free), default monthly credits to the tier max
  useEffect(() => {
    if (!isFreeTier && maxMonthlyCredits > 0) {
      onCreditsChange(maxMonthlyCredits)
    }
    if (isFreeTier) {
      onCreditsChange(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier, maxMonthlyCredits])

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
                <option value="free">Free</option>
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Monthly max: <span className="text-foreground">{maxMonthlyCredits}</span>
              </p>
            </div>

            {/* Sign-up Bonus Credits */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Sign-up bonus: <span className="text-foreground">{freeCredits}</span>
              </label>
              <input
                type="range"
                min="0"
                max="3"
                value={freeCredits}
                onChange={(e) => onFreeCreditsChange(Number(e.target.value))}
                className="w-full mt-1.5"
              />
              <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>0</span>
                <span>3</span>
              </div>
            </div>

            {/* Monthly Credits (disabled while free credits exist) */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Monthly credits: <span className="text-foreground">{credits}</span>
              </label>

              {!isFreeTier && hasFreeCredits && (
                <p className="text-xs text-amber-600 dark:text-amber-500 mt-1">
                  Monthly credits are locked while sign-up bonus credits remain.
                </p>
              )}

              <input
                type="range"
                min="0"
                max={maxMonthlyCredits}
                value={Math.min(credits, maxMonthlyCredits)}
                onChange={(e) => onCreditsChange(Number(e.target.value))}
                disabled={isFreeTier || hasFreeCredits}
                className="w-full mt-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>0</span>
                <span>{maxMonthlyCredits}</span>
              </div>
            </div>

            {/* Top-up Credits (deducted last) */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Top-up credits: <span className="text-foreground">{topUpCredits}</span>
              </label>
              <p className="text-[11px] text-muted-foreground mt-1">Deducted last (after bonus + monthly).</p>

              <input
                type="range"
                min="0"
                max="10"
                value={topUpCredits}
                onChange={(e) => onTopUpCreditsChange(Number(e.target.value))}
                disabled={isFreeTier}
                className="w-full mt-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>0</span>
                <span>10</span>
              </div>

              {isFreeTier && <p className="mt-1 text-[11px] text-muted-foreground">Top-ups are hidden on Free tier.</p>}
            </div>

            {/* Days Until Renewal */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Days until renewal: <span className="text-foreground">{daysUntilRenewal}</span>
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={daysUntilRenewal}
                onChange={(e) => onDaysUntilRenewalChange(Number(e.target.value))}
                className="w-full mt-1.5"
              />
              <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>1</span>
                <span>30</span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
