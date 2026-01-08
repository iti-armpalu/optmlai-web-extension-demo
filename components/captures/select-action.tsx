"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"

interface SelectActionProps {
  onSelect: () => void
  isVisible: boolean
}

export function SelectAction({ onSelect, isVisible }: SelectActionProps) {
  if (!isVisible) return null

  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center animate-in fade-in duration-200">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="default"
              className="shadow-lg"
              onClick={(e) => {
                e.stopPropagation()
                onSelect()
              }}
            >
              Select
            </Button>
          </TooltipTrigger>
          <TooltipContent>Select</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
