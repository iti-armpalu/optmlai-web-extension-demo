import type { SubscriptionTier } from "@/components/nav-user/credit-details"

export const TIER_CREDITS: Record<SubscriptionTier, number> = {
  free: 0,
  starter: 10,
  pro: 20,
  enterprise: 30,
}

/**
 * Calculate total available credits (free credits + subscription credits)
 */
export function getTotalCredits(credits: number, freeCredits: number): number {
  return credits + freeCredits
}

/**
 * Check if user has low credits (under 3 total)
 */
export function isLowCredits(credits: number, freeCredits: number): boolean {
  return getTotalCredits(credits, freeCredits) < 3
}

/**
 * Get max credits for a given tier
 */
export function getMaxCreditsForTier(tier: SubscriptionTier): number {
  return TIER_CREDITS[tier]
}

/**
 * Determine if user is a free tier user
 */
export function isFreeUser(tier: SubscriptionTier): boolean {
  return tier === "free"
}

/**
 * Determine if user is subscribed to a paid tier
 */
export function isSubscribedUser(tier: SubscriptionTier): boolean {
  return tier !== "free"
}
