"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function ReportSkeleton() {
  return (
    <div className="space-y-10">
      {/* Top message */}
      <div className="border bg-muted/40 p-4 text-sm">
        <p className="font-medium">Generating full report…</p>
        <p className="text-muted-foreground text-xs mt-1">
          You can start chatting while the analysis loads.
        </p>
      </div>

      {/* Animated skeleton loader */}
      <div className="space-y-10 animate-pulse">
        {/* Title */}
        <Skeleton className="h-7 w-64 skeleton-shimmer" />
        <Skeleton className="h-4 w-40 skeleton-shimmer" />

        {/* Heatmap section */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-24 skeleton-shimmer" />
          <Skeleton className="h-[300px] w-full rounded-lg skeleton-shimmer" />
        </div>

        {/* Tabs header */}
        <Skeleton className="h-10 w-full rounded-md skeleton-shimmer" />

        {/* Content blocks */}
        <div className="space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40 skeleton-shimmer" />
            <Skeleton className="h-4 w-full skeleton-shimmer" />
            <Skeleton className="h-4 w-[85%] skeleton-shimmer" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-36 skeleton-shimmer" />
            <Skeleton className="h-4 w-full skeleton-shimmer" />
            <Skeleton className="h-4 w-[75%] skeleton-shimmer" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-5 w-48 skeleton-shimmer" />
            <Skeleton className="h-4 w-full skeleton-shimmer" />
            <Skeleton className="h-4 w-[65%] skeleton-shimmer" />
          </div>
        </div>
      </div>
    </div>
  )
}
