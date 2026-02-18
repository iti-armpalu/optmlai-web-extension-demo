"use client"

import * as React from "react"
import { AlertCircle, CheckCircle2, Loader2, Lock, ShieldCheck, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { AnimatePresence, motion } from "motion/react"


type LockedReportOverlayProps = {
    onOpenDialog: () => void;
}

export function LockedReportOverlay({
    onOpenDialog,
}: LockedReportOverlayProps) {

    return (
        // <div
        //     className={cn(
        //         "absolute inset-0 z-10 flex items-center justify-center",
        //     )}
        // >
        //     <div className="absolute inset-0 backdrop-blur-md bg-background/60 rounded-lg" />
        //     <div className="relative z-20 flex flex-col items-center gap-4 p-6 text-center max-w-sm">
        //         <Badge
        //             variant="outline"
        //             className="gap-1 border-none px-3 py-1 text-amber-600 bg-amber-500/10">

        //             <AlertCircle className="h-3 w-3" />

        //             Analysis Pending
        //         </Badge>
        //         <p className="text-xs text-muted-foreground">
        //             To complete analysis: confirm key elements and channel
        //         </p>
        //         <Button
        //             variant="outline"
        //             size="sm"
        //             onClick={onAction}
        //             className="gap-2 transition-colors text-xs bg-transparent text-muted-forground"
        //         >
        //             <AlertCircle className="h-4 w-4 text-amber-600" />
        //             Unlock analysis
        //         </Button>
        //     </div>
        // </div>

        <div

            className="absolute inset-0 z-20 flex items-center justify-center"
        >
            {/* Glass overlay */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" />

            {/* Content */}
            <div
                className="relative z-10 flex flex-col items-center text-center max-w-md px-8"
            >
                {/* <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-5">
                    <Lock className="w-6 h-6 text-amber-600" />
                </div> */}
                <Badge
                    variant="outline"
                    className={cn(
                        "gap-1 border-none px-3 py-1 mb-5",
                        "text-amber-600 bg-amber-500/10"
                    )}
                >
                    <AlertCircle className="h-3 w-3" />
                    Analysis Pending
                </Badge>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                    Confirm creative details to unlock full analysis
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Verify detected elements and configure your analysis context to generate a complete optimization report.
                </p>
                <Button
                    onClick={onOpenDialog}
                    className="bg-primary text-primary-foreground font-semibold py-3 px-8 text-sm hover:bg-primary/90 transition-all glow-primary flex items-center gap-2"
                >
                    Confirm details & generate full report
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
}: LockedSectionProps) {
    return (
        <div className={cn("relative rounded-lg", className)}>
            <div className={cn(locked && "pointer-events-none select-none")}>
                {children}
            </div>

            {locked ? (
                <LockedReportOverlay

                    onOpenDialog={onUnlock}
                />
            ) : null}
        </div>
    )
}
