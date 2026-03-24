"use client"

import { cn } from "@/lib/utils"

interface PromptChipsProps {
  suggestions: string[]
  onSelect: (prompt: string) => void
  visible: boolean
}

export function PromptChips({ suggestions, onSelect, visible }: PromptChipsProps) {
  if (!visible) return null

  return (
    <div className="flex flex-wrap gap-1.5 px-5 pb-3">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          onClick={() => onSelect(suggestion)}
          className={cn(
            "rounded-full border border-border bg-card px-3 py-1.5",
            "text-xs font-medium text-muted-foreground",
            "transition-all duration-150",
            "hover:bg-accent hover:border-foreground/15",
            "active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          {suggestion}
        </button>
      ))}
    </div>
  )
}
