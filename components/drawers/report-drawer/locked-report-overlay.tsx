"use client"

import * as React from "react"
import { AlertCircle, ShieldCheck, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

type LockedReportOverlayProps = {
    title?: string
    description?: string
    actionLabel?: string
    onAction: () => void
    className?: string
    cardClassName?: string
}

export function LockedReportOverlay({
    title = "Confirmation Required",
    description = "Confirm detected elements to view this insight.",
    actionLabel = "Confirm Elements",
    onAction,
    className,
    cardClassName,
}: LockedReportOverlayProps) {
    return (
        // <div
        //     className={cn(
        //         "absolute inset-0 z-10 flex items-center justify-center",
        //         className
        //     )}
        // >
        //     <div className="absolute inset-0 backdrop-blur-md bg-background/60 rounded-lg" />
        //     <div className="relative z-20 flex flex-col items-center gap-4 p-6 text-center max-w-sm">
        //         <div className="h-14 w-14 rounded-full bg-amber-500/10 flex items-center justify-center">
        //             <AlertCircle className="h-7 w-7 text-amber-500" />
        //         </div>

        //         <span className="text-xs font-medium">Complete setup to unlock</span>

        //         <Button size="sm" onClick={onAction} className="gap-1.5">
        //             <Unlock className="h-4 w-4" />
        //             {actionLabel}
        //         </Button>
        //     </div>
        // </div>
        <div
            className={cn(
                "absolute inset-0 z-10 flex items-center justify-center",
                className
            )}
        >
            <div className="absolute inset-0 backdrop-blur-md bg-background/60 rounded-lg" />
            <div className="relative z-20 flex flex-col items-center gap-4 p-6 text-center max-w-sm">
                <Badge
                    variant="outline"
                    className="gap-1 border-none px-3 py-1 text-amber-600 bg-amber-500/10">

                    <AlertCircle className="h-3 w-3" />

                    Analysis Pending
                </Badge>
                <p className="text-xs text-muted-foreground">
                    To complete analysis: confirm key elements and channel
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onAction}
                    className="gap-2 transition-colors text-xs bg-transparent text-muted-forground"
                >
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    Unlock analysis
                </Button>
            </div>
        </div>
    )
}

type LockedSectionProps = {
    locked: boolean
    onUnlock: () => void
    children: React.ReactNode
    className?: string
    overlayTitle?: string
    overlayDescription?: string
    overlayActionLabel?: string
    overlayClassName?: string
    overlayCardClassName?: string
}

/**
 * Wrap any section that should be hidden/blocked until the user confirms something.
 * Ensures proper positioning and prevents interactions beneath the overlay.
 */
export function LockedSection({
    locked,
    onUnlock,
    children,
    className,
    overlayTitle,
    overlayDescription,
    overlayActionLabel,
    overlayClassName,
    overlayCardClassName,
}: LockedSectionProps) {
    return (
        <div className={cn("relative rounded-lg", className)}>
            <div className={cn(locked && "pointer-events-none select-none")}>
                {children}
            </div>

            {locked ? (
                <LockedReportOverlay
                    title={overlayTitle}
                    description={overlayDescription}
                    actionLabel={overlayActionLabel}
                    onAction={onUnlock}
                    className={overlayClassName}
                    cardClassName={overlayCardClassName}
                />
            ) : null}
        </div>
    )
}
