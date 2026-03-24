"use client"

import { cn } from "@/lib/utils"

interface ChatHeaderProps {
  analysisSetupConfirmed: boolean
}

export function ChatHeader({ analysisSetupConfirmed }: ChatHeaderProps) {
  return (
    <div className="flex flex-col gap-2 px-5 pt-5 pb-4">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            AI-powered
          </span>
          <h2 className="text-sm font-semibold text-foreground leading-tight">
            Creative Assistant
          </h2>
        </div>
      </div>
      <div
        className={cn(
          "inline-flex items-center gap-1.5 text-[10px] font-medium tracking-wide transition-colors duration-300",
          analysisSetupConfirmed
            ? "text-emerald-600"
            : "text-muted-foreground"
        )}
      >
        <span
          className={cn(
            "size-1.5 rounded-full",
            analysisSetupConfirmed ? "bg-emerald-600 animate-pulse" : "bg-muted-foreground/50"
          )}
        />
        {analysisSetupConfirmed ? "Full analysis mode" : "Limited mode"}
      </div>
    </div>
  )
}
