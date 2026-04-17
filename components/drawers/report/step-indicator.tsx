"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  isComplete: boolean
  onStepClick?: (step: number) => void
}

const STEP_LABELS: Record<number, string> = {
  1: "Verify key elements",
  2: "Verify channel and purpose",
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  isComplete,
  onStepClick,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-3 mx-4">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep && !isComplete
        const isDone = stepNum < currentStep || isComplete

        const canClick = Boolean(onStepClick) && !isComplete && stepNum !== currentStep

        return (
          <div key={stepNum} className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onStepClick?.(stepNum)}
              className={cn(
                "h-auto px-0 py-0 hover:bg-transparent"
              )}
            >
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300",
                    isDone
                      ? "bg-emerald-600 text-primary-foreground"
                      : isActive
                        ? "border border-emerald-600/50 bg-emerald-100/50 text-emerald-600"
                        : "bg-secondary text-muted-foreground"
                  )}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : stepNum}
                </span>

                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isDone || isActive ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {STEP_LABELS[stepNum] ?? `Step ${stepNum}`}
                </span>
              </span>
            </Button>

            {i < totalSteps - 1 && (
              <div
                className={cn(
                  "h-px w-8 transition-colors",
                  isDone ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
