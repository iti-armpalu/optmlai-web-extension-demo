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
  credits: number // monthly remaining
  freeCredits: number // sign-up bonus remaining
  topUpCredits: number // top-up remaining (deducted last)
  tier: SubscriptionTier
  daysUntilRenewal: number
}

const MAX_FREE_CREDITS = 3

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

/**
 * Combined bar (3 buckets):
 * Deduction order (first -> last): Sign-up bonus -> Monthly -> Top-up
 * Visual order (left -> right):   Top-up | Monthly | Sign-up bonus
 * So everything appears to deduct right -> left.
 */
const CombinedCreditBar = ({
  monthlyCredits,
  signupBonusCredits,
  topUpCredits,
  maxMonthlyCredits,
  maxSignupBonusCredits = MAX_FREE_CREDITS,
  label = "Credits remaining",
}: {
  monthlyCredits: number
  signupBonusCredits: number
  topUpCredits: number
  maxMonthlyCredits: number
  maxSignupBonusCredits?: number
  label?: string
}) => {
  const monthly = clamp(monthlyCredits, 0, maxMonthlyCredits)
  const signup = clamp(signupBonusCredits, 0, maxSignupBonusCredits)

  // Top-up has ONLY one value. For bar proportions we treat its "max" as the current remaining amount
  // (so it shows color and shrinks as it’s used).
  const topUpMax = Math.max(0, topUpCredits)
  const topUp = clamp(topUpCredits, 0, topUpMax)

  const totalMaxRaw = maxMonthlyCredits + maxSignupBonusCredits + topUpMax
  const totalMax = Math.max(1, totalMaxRaw)

  const totalRemaining = monthly + signup + topUp
  const percentageTotal = (totalRemaining / totalMax) * 100

  const isEmpty = totalRemaining === 0
  const isLow = percentageTotal <= 20 && !isEmpty

  // Which bucket is actively being deducted (first -> last): signup -> monthly -> topup
  const activeBucket: "signup" | "monthly" | "topup" | "none" =
    totalRemaining === 0
      ? "none"
      : signup > 0
        ? "signup"
        : monthly > 0
          ? "monthly"
          : topUp > 0
            ? "topup"
            : "none"

  const activeText =
    activeBucket === "signup"
      ? "Using sign-up bonus credits"
      : activeBucket === "monthly"
        ? "Using monthly credits"
        : activeBucket === "topup"
          ? "Using top-up credits"
          : ""

  // Fixed zones (stable layout): left -> right: top-up | monthly | signup
  // NOTE: topUpMax equals topUpCredits, so the top-up zone exists only when user has top-ups.
  const topUpZonePct = topUpMax > 0 ? (topUpMax / totalMax) * 100 : 0
  const monthlyZonePct = maxMonthlyCredits > 0 ? (maxMonthlyCredits / totalMax) * 100 : 0
  const signupZonePct = maxSignupBonusCredits > 0 ? (maxSignupBonusCredits / totalMax) * 100 : 0

  // Fill within each zone (0..100). LEFT-anchored so it shrinks from RIGHT -> LEFT.
  const topUpFillPct = topUpMax === 0 ? 0 : (topUp / topUpMax) * 100
  const monthlyFillPct = maxMonthlyCredits === 0 ? 0 : (monthly / maxMonthlyCredits) * 100
  const signupFillPct = maxSignupBonusCredits === 0 ? 0 : (signup / maxSignupBonusCredits) * 100

  // Colors
  const monthlyColor = isEmpty ? "bg-muted" : isLow ? "bg-amber-500" : "bg-primary"
  const signupColor = isEmpty ? "bg-muted" : "bg-emerald-500"
  const topUpColor = isEmpty ? "bg-muted" : "bg-violet-500"

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className={`font-medium ${isEmpty ? "text-destructive" : isLow ? "text-amber-500" : "text-foreground"}`}>
          {totalRemaining} / {totalMax}
        </span>
      </div>

      <div
        className="relative h-2 w-full overflow-hidden rounded-full bg-muted"
        role="img"
        aria-label={`Credits remaining: ${totalRemaining} of ${totalMax}. Sign-up bonus ${signup}/${maxSignupBonusCredits}. Monthly ${monthly}/${maxMonthlyCredits}. Top-up ${topUp}/${topUpMax}.`}
      >
        {/* TOP-UP ZONE (left) */}
        {topUpZonePct > 0 && (
          <div className="absolute left-0 top-0 h-full" style={{ width: `${topUpZonePct}%` }}>
            <div
              className={`h-full ${topUpColor}`}
            />
          </div>
        )}

        {/* MONTHLY ZONE (middle) */}
        {monthlyZonePct > 0 && (
          <div className="absolute top-0 h-full" style={{ left: `${topUpZonePct}%`, width: `${monthlyZonePct}%` }}>
            <div
              className={`h-full ${monthlyColor}`}
            />
          </div>
        )}

        {/* SIGN-UP BONUS ZONE (right) */}
        {signupZonePct > 0 && (
          <div className="absolute right-0 top-0 h-full" style={{ width: `${signupZonePct}%` }}>
            <div
              className={`h-full ${signupColor}`}
            />
          </div>
        )}

        {/* Optional dividers */}
        {topUpZonePct > 0 && monthlyZonePct > 0 && (
          <div className="absolute top-0 h-full w-px bg-background/60" style={{ left: `${topUpZonePct}%` }} aria-hidden="true" />
        )}
        {(topUpZonePct > 0 || monthlyZonePct > 0) && signupZonePct > 0 && (
          <div
            className="absolute top-0 h-full w-px bg-background/60"
            style={{ left: `${topUpZonePct + monthlyZonePct}%` }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Active usage line: green bullet always; hidden when none (you have a separate empty-state box) */}
      {activeBucket !== "none" && (
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span>{activeText}</span>
        </div>
      )}
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

const CreditDetails = ({ credits, freeCredits, topUpCredits, tier, daysUntilRenewal }: CreditDetailsProps) => {
  const tierInfo = TIERS[tier]
  const isFreeUser = checkIsFreeUser(tier)
  const isSubscribed = isSubscribedUser(tier)

  const maxMonthly = isFreeUser ? 0 : tierInfo.maxCredits

  const totalAvailableCredits = getTotalCredits(isFreeUser ? 0 : credits, freeCredits) + (isFreeUser ? 0 : topUpCredits)
  const isLowCredits = checkIsLowCredits(isFreeUser ? 0 : credits, freeCredits) && topUpCredits === 0

  const hasFreeCredits = freeCredits > 0
  const isCreditsExhausted = totalAvailableCredits === 0

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isFreeUser ? (
            <Sparkles className={`h-4 w-4 ${hasFreeCredits ? "text-primary" : "text-muted-foreground"}`} />
          ) : (
            <Crown className={`h-4 w-4 ${tierInfo.color}`} />
          )}
          <span className="text-sm font-medium">{isFreeUser ? "Free Plan" : tierInfo.name}</span>
        </div>
      </div>

      {/* Combined bar */}
      <CombinedCreditBar
        monthlyCredits={isFreeUser ? 0 : credits}
        signupBonusCredits={freeCredits}
        topUpCredits={isFreeUser ? 0 : topUpCredits}
        maxMonthlyCredits={maxMonthly}
        maxSignupBonusCredits={MAX_FREE_CREDITS}
        label={isFreeUser ? "Free credits" : "Credits remaining"}
      />

      {/* Out of credits (paid users, no signup bonus, no top-up, monthly=0) */}
      {isSubscribed && !hasFreeCredits && credits === 0 && topUpCredits === 0 && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3">
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

      {/* Low credits warning (only meaningful when top-up is 0; otherwise user has fallback) */}
      {isSubscribed && isLowCredits && totalAvailableCredits > 0 && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3">
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

      {/* No credits warning (free users exhausted) */}
      {isFreeUser && isCreditsExhausted && (
        <div className="rounded-lg bg-destructive/10 p-3">
          <p className="text-xs font-medium text-destructive">You've used all your free credits</p>
          <p className="mt-1 text-xs text-muted-foreground">Upgrade to continue using premium features</p>
        </div>
      )}

      {/* Actions */}
      {isFreeUser && isCreditsExhausted && <UpgradeButton variant="urgent" />}
      {isFreeUser && !isCreditsExhausted && <UpgradeButton variant="ghost" />}

      {isSubscribed && isCreditsExhausted && (
        <>
          <Button
            asChild
            className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] hover:opacity-90 hover:shadow-xl hover:shadow-primary/30"
          >
            <a href="https://optml.ai/pricing" target="_blank" rel="noopener noreferrer">
              <Plus className="h-4 w-4" />
              Add More Credits
            </a>
          </Button>

          {tier !== "enterprise" && (
            <Button asChild variant="ghost" className="w-full gap-2 text-xs text-muted-foreground hover:text-foreground">
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
