"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Eye, FileCheck } from "lucide-react"

interface CaptureActionsProps {
  onPreview: () => void
//   onEvaluate: () => void
  size?: "sm" | "md"
}

export function CaptureActions({ onPreview, size = "md" }: CaptureActionsProps) {
  const sizeClasses = size === "sm" ? "h-6 w-6 p-0" : "h-7 w-7 p-0"
  const iconClasses = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"

  return (
    <TooltipProvider>
      <div className="flex items-center gap-0.5 shrink-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className={sizeClasses}
              onClick={(e) => {
                e.stopPropagation()
                onPreview()
              }}
            >
              <Eye className={iconClasses} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Preview</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className={sizeClasses}
              onClick={(e) => {
                e.stopPropagation()
                // onEvaluate()
              }}
            >
              <FileCheck className={iconClasses} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Evaluate</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
