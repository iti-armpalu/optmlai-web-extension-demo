"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { EditableTitle } from "./editable-title"
import { CaptureTimestamp } from "./capture-timestamp"
import { CaptureActions } from "./capture-actions"
import { DeleteAction } from "./delete-action"
import { CaptureThumbnail } from "./capture-thumbnail"
import { CaptureItem } from "@/store/capture-store"

interface CaptureCardProps {
    capture: CaptureItem
    onPreview: (capture: CaptureItem) => void
    onDelete: (id: string) => void
    variant?: "large" | "small"
}

export function CaptureCard({
    capture,
    onPreview,
    onDelete,
    variant = "small",
}: CaptureCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    const isLarge = variant === "large"

    return (
        <div
            className={cn(
                "group relative rounded-lg border border-border overflow-hidden bg-card transition-all",
                "hover:border-primary/50",
                isLarge && "hover:shadow-md",
                !isLarge && "hover:shadow-lg cursor-pointer",
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CaptureThumbnail imageUrl={capture.image} alt={capture.name}>
                <DeleteAction isVisible={isHovered} onDelete={() => onDelete(capture.id)} />
            </CaptureThumbnail>

            <div className={isLarge ? "p-4" : "p-3"}>
                <div className="flex items-center gap-1 mb-1">
                    <EditableTitle
                        captureId={capture.id}
                        value={capture.name}
                        size={isLarge ? "md" : "sm"}
                        className={isLarge ? "font-semibold" : ""}
                    />
                </div>

                <div className="flex items-center justify-between gap-2">
                    <CaptureTimestamp
                        createdAt={capture.createdAt}
                    // evaluated={capture.evaluated}
                    // evaluatedAt={capture.evaluatedAt}
                    />
                    <CaptureActions
                        onPreview={() => onPreview(capture)}
                        // onEvaluate={() => onEvaluate(capture)}
                        size={isLarge ? "md" : "sm"}
                    />
                </div>
            </div>
        </div>
    )
}
