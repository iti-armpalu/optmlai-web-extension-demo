"use client"

import { Button } from "@/components/ui/button"
import { X, Check, RotateCcw } from "lucide-react"

interface CaptureToolbarProps {
  hasSelection: boolean
  onReset: () => void
  onCancel: () => void
  onConfirm: () => void
}

export function CaptureToolbar({
  hasSelection,
  onReset,
  onCancel,
  onConfirm,
}: CaptureToolbarProps) {
  return (
    <div
      id="capture-toolbar"
      className="
        absolute bottom-8 left-1/2 -translate-x-1/2 
        bg-background border rounded-lg shadow-xl 
        p-2 flex items-center gap-2
        z-[999999]
      "
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Reset */}
      <Button
        size="sm"
        variant="ghost"
        onClick={onReset}
        disabled={!hasSelection}
        className="h-8 gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </Button>

      {/* Cancel */}
      <Button
        size="sm"
        variant="ghost"
        className="h-8 gap-2 text-destructive hover:text-destructive"
        onClick={onCancel}
      >
        <X className="w-4 h-4" />
        Cancel
      </Button>

      {/* Confirm */}
      <Button
        size="sm"
        disabled={!hasSelection}
        onClick={onConfirm}
        className="h-8 gap-2 bg-purple-600 hover:bg-purple-700 text-white"
      >
        <Check className="w-4 h-4" />
        Capture
      </Button>
    </div>
  )
}
