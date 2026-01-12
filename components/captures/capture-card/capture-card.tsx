"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CaptureItem } from "@/store/capture-store"

import { EditableTitle } from "./editable-title"
import { CaptureTimestamp } from "./capture-timestamp"
import { CaptureActions } from "./capture-actions"
import { CaptureThumbnail } from "./capture-thumbnail"
import { SelectAction } from "./select-action"

interface CaptureCardProps {
  capture: CaptureItem

  /** Preview flow: parent decides what preview means (draft+dialog, etc.) */
  onPreview: (capture: CaptureItem) => void

  /** Select flow: parent decides what select means (draft+evaluate/preview, etc.) */
  onSelect: (capture: CaptureItem) => void

  /** Delete from saved captures */
  onDelete: (id: string) => void

  variant?: "large" | "small"
}

export function CaptureCard({
  capture,
  onPreview,
  onSelect,
  onDelete,
  variant = "small",
}: CaptureCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isLarge = variant === "large"

  // Card click = preview (single, consistent primary action)
  const handleCardClick = () => onPreview(capture)

  // Explicit actions (secondary)
  const handleSelect = () => onSelect(capture)
  const handleDelete = () => onDelete(capture.id)

  return (
    <div
      className={cn(
        "group relative rounded-lg border border-border overflow-hidden bg-card transition-all",
        "hover:border-primary/50",
        isLarge ? "hover:shadow-md" : "hover:shadow-lg cursor-pointer",
      )}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        // Keyboard support: Enter/Space triggers preview
        if (e.key === "Enter" || e.key === " ") handleCardClick()
      }}
    >
      <CaptureThumbnail imageUrl={capture.image} alt={capture.name}>
        {/* Select is an explicit action; it should never trigger preview */}
        <SelectAction isVisible={isHovered} onSelect={handleSelect} />
      </CaptureThumbnail>

      <div className={isLarge ? "p-4" : "p-3"}>
        {/* Title editing should not trigger preview */}
        <div className="mb-1">
          <EditableTitle
            captureId={capture.id}
            value={capture.name}
            size={isLarge ? "md" : "sm"}
            className={isLarge ? "font-semibold" : ""}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <CaptureTimestamp createdAt={capture.createdAt} />

          {/* Action buttons should not trigger preview */}
          <div onClick={(e) => e.stopPropagation()}>
            <CaptureActions
              onPreview={() => onPreview(capture)}
              onDelete={handleDelete}
              size={isLarge ? "md" : "sm"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
