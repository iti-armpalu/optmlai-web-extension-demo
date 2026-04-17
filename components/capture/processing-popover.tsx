'use client'

import { Card } from '@/components/ui/card'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUIStore } from '@/store/ui-store'

interface ProcessingPopoverProps {
  isOpen: boolean
  message?: string
}

const GENERATION_STEPS = [
  { label: 'Uploading image', duration: 1500 },
  { label: 'Analyzing visual structure', duration: 1800 },
  { label: 'Identifying key elements', duration: 2000 },
]

export function ProcessingPopover({
  isOpen,
  message = 'Extracting visual data for analysis',
}: ProcessingPopoverProps) {

  const finishProcessing = useUIStore((s) => s.finishProcessing)

  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  // Reset internal state whenever popover opens
  useEffect(() => {
    if (!isOpen) return

    setCurrentStep(0)
    setCompletedSteps([])
  }, [isOpen])

  // Step progression logic
  useEffect(() => {
    if (!isOpen) return
    if (currentStep >= GENERATION_STEPS.length) return

    const timer = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, currentStep])
      setCurrentStep((prev) => prev + 1)
    }, GENERATION_STEPS[currentStep].duration)

    return () => clearTimeout(timer)
  }, [currentStep, isOpen])

  // When steps finish → close popover → open report drawer
  // useEffect(() => {
  //   if (!isOpen) return

  //   if (currentStep === GENERATION_STEPS.length) {
  //     const timer = setTimeout(() => {
  //       finishProcessing() 
  //     }, 300)

  //     return () => clearTimeout(timer)
  //   }
  // }, [currentStep, isOpen, finishProcessing])

  if (!isOpen) return null

  return (
    // <div className="fixed bottom-4 right-4 z-[300] animate-in slide-in-from-bottom-4">
      <Card className="p-4 shadow-lg border-2 w-80 bg-background">
        <div className="flex flex-col gap-3">

          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-primary flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Processing image…</span>
              <span className="text-xs text-muted-foreground">{message}</span>
            </div>
          </div>

          <div className="space-y-2 mt-2">
            {GENERATION_STEPS.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 text-xs transition-all duration-300 ${
                  index === currentStep
                    ? "text-foreground font-medium"
                    : index < currentStep
                    ? "text-muted-foreground"
                    : "text-muted-foreground/50"
                }`}
              >
                {completedSteps.includes(index) ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                ) : index === currentStep ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary flex-shrink-0" />
                ) : (
                  <div className="h-3.5 w-3.5 rounded-full border border-muted flex-shrink-0" />
                )}
                <span className="leading-tight">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    // </div>
  )
}
