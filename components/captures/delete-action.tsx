"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Trash2 } from "lucide-react"

interface DeleteActionProps {
  onDelete: () => void
  isVisible: boolean
}

export function DeleteAction({ onDelete, isVisible }: DeleteActionProps) {
  if (!isVisible) return null

  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center animate-in fade-in duration-200">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant="destructive"
              className="shadow-lg"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
