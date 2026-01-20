"use client"

import { motion } from "framer-motion"
import { Sparkles, Zap, Crown, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getTotalCredits,
  isLowCredits as checkIsLowCredits,
  isFreeUser as checkIsFreeUser,
  isSubscribedUser,
} from "@/lib/credit-utils"

export type SubscriptionTier = "free" | "starter" | "pro" | "enterprise"

interface TierInfo {
  name: string
  maxCredits: number
  color: string
}

export const TIERS: Record<SubscriptionTier, TierInfo> = {
  free: { name: "Free", maxCredits: 0, color: "text-muted-foreground" },
  starter: { name: "Starter", maxCredits: 10, color: "text-blue-500" },
  pro: { name: "Pro", maxCredits: 20, color: "text-amber-500" },
  enterprise: { name: "Enterprise", maxCredits: 30, color: "text-emerald-500" },
}

interface CreditDetailsProps {
  credits: number
  freeCredits: number
  tier: SubscriptionTier
  daysUntilRenewal: number
}

const MAX_FREE_CREDITS = 3

const CreditIndicator = ({ credits, maxCredits = MAX_FREE_CREDITS }: { credits: number; maxCredits?: number }) => {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: maxCredits }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 500 }}
          className={`h-2 w-2 rounded-full ${i < credits ? "bg-primary" : "bg-muted"}`}
        />
      ))}
    </div>
  )
}

const CreditBar = ({ credits, maxCredits, label }: { credits: number; maxCredits: number; label?: string }) => {
  const percentage = (credits / maxCredits) * 100
  const isLow = percentage <= 20
  const isEmpty = credits === 0

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label || "Credits remaining"}</span>
        <span className={`font-medium ${isEmpty ? "text-destructive" : isLow ? "text-amber-500" : "text-foreground"}`}>
          {credits} / {maxCredits}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full rounded-full ${isEmpty ? "bg-muted" : isLow ? "bg-amber-500" : "bg-primary"}`}
        />
      </div>
    </div>
  )
}

const UpgradeButton = ({ variant = "default" }: { variant?: "default" | "urgent" | "ghost" }) => {
  if (variant === "ghost") {
    return (
      <Button asChild variant="ghost" className="w-full gap-2 text-xs text-muted-foreground hover:text-foreground">
        <a href="https://optml.ai/pricing" target="_blank" rel="noopener noreferrer">
          <Sparkles className="h-3 w-3" />
          Upgrade to Premium
        </a>
      </Button>
    )
  }

  return (
    <Button
      asChild
      className={`w-full gap-2 font-medium transition-all duration-300 ${
        variant === "urgent"
          ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 shadow-lg shadow-primary/25"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-[1.01]"
      }`}
    >
      <a href="https://optml.ai/pricing" target="_blank" rel="noopener noreferrer">
        {variant === "urgent" ? (
          <>
            <Zap className="h-4 w-4" />
            Upgrade Now
          </>
        ) : (
          <>Upgrade Plan</>
        )}
      </a>
    </Button>
  )
}

const CreditDetails = ({ credits, freeCredits, tier, daysUntilRenewal }: CreditDetailsProps) => {
  const tierInfo = TIERS[tier]
  const totalAvailableCredits = getTotalCredits(credits, freeCredits)
  const isLowCredits = checkIsLowCredits(credits, freeCredits)
  const isFreeUser = checkIsFreeUser(tier)
  const isSubscribed = isSubscribedUser(tier)
  const hasCredits = credits > 0
  const hasFreeCredits = freeCredits > 0
  const isCreditsExhausted = totalAvailableCredits === 0

  return (
    <div className="space-y-3">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isFreeUser ? (
            <Sparkles className={`h-4 w-4 ${hasFreeCredits ? "text-primary" : "text-muted-foreground"}`} />
          ) : (
            <Crown className={`h-4 w-4 ${tierInfo.color}`} />
          )}
          <span className="text-sm font-medium">{isFreeUser ? "Free Credits" : tierInfo.name}</span>
        </div>

        {isFreeUser ? (
          <CreditIndicator credits={freeCredits} maxCredits={MAX_FREE_CREDITS} />
        ) : (
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Active
          </span>
        )}
      </div>

      {/* Credits Display */}
      {isFreeUser ? (
        <p className="text-xs text-muted-foreground">
          {freeCredits} of {MAX_FREE_CREDITS} free credits remaining
        </p>
      ) : (
        <>
          <CreditBar credits={credits} maxCredits={tierInfo.maxCredits} label="Monthly credits" />

          {/* Bonus Free Credits */}
          {hasFreeCredits && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between rounded-lg pt-0"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium">Free Credits (Use first)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CreditIndicator credits={freeCredits} maxCredits={MAX_FREE_CREDITS} />
              </div>
            </motion.div>
          )}

          {/* Total Credits Summary */}
          {hasFreeCredits && (
            <p className="text-xs text-muted-foreground text-center">
              Total available: {totalAvailableCredits} credits
            </p>
          )}
        </>
      )}

      {/* Out of Credits - paid users with 0 credits */}
      {isSubscribed && !hasFreeCredits && credits === 0 && (
        <div className="rounded-lg bg-destructive/10 p-3 border border-destructive/20">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-destructive" />
            <div>
              <p className="text-xs font-medium text-destructive">Out of credits</p>
              <p className="text-xs text-muted-foreground">
                Credits renew in {daysUntilRenewal} {daysUntilRenewal === 1 ? "day" : "days"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Low Credits Warning - paid users with 1-2 credits left */}
      {isSubscribed && isLowCredits && credits > 0 && (
        <div className="rounded-lg bg-amber-500/10 p-3 border border-amber-500/20">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-600 dark:text-amber-500" />
            <div>
              <p className="text-xs font-medium text-amber-900 dark:text-amber-400">Your credits are running low</p>
              <p className="text-xs text-amber-700 dark:text-amber-500">
                Credits renew in {daysUntilRenewal} {daysUntilRenewal === 1 ? "day" : "days"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No Credits Warning - free users who exhausted credits */}
      {isFreeUser && isCreditsExhausted && (
        <div className="rounded-lg bg-destructive/10 p-3">
          <p className="text-xs font-medium text-destructive">You've used all your free credits</p>
          <p className="mt-1 text-xs text-muted-foreground">Upgrade to continue using premium features</p>
        </div>
      )}

      {/* Action Buttons */}
      {isFreeUser && isCreditsExhausted && <UpgradeButton variant="urgent" />}

      {isFreeUser && !isCreditsExhausted && <UpgradeButton variant="ghost" />}

      {isSubscribed && isCreditsExhausted && (
        <>
          <Button
            asChild
            className="w-full gap-2 font-medium bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 shadow-lg shadow-primary/25 transition-all duration-300"
          >
            <a href="https://optml.ai/pricing" target="_blank" rel="noopener noreferrer">
              <Plus className="h-4 w-4" />
              Add More Credits
            </a>
          </Button>
          {tier !== "enterprise" && (
            <Button
              asChild
              variant="ghost"
              className="w-full gap-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <a href="https://optml.ai/pricing" target="_blank" rel="noopener noreferrer">
                <Zap className="h-3 w-3" />
                Upgrade for higher limits
              </a>
            </Button>
          )}
        </>
      )}

      {isSubscribed && !isCreditsExhausted && tier !== "enterprise" && (
        <Button asChild variant="ghost" className="w-full gap-2 text-xs text-muted-foreground hover:text-foreground">
          <a href="https://optml.ai/pricing" target="_blank" rel="noopener noreferrer">
            <Zap className="h-3 w-3" />
            Upgrade for more credits
          </a>
        </Button>
      )}
    </div>
  )
}

export default CreditDetails
