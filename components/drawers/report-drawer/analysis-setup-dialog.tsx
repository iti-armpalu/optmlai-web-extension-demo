"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"

import { Lock, ArrowRight, Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { KeyElementsTab } from "./key-elements-tab"
import { ChannelPurposeTab } from "./channel-purpose-tab"
import StepIndicator from "./step-indicator"


interface AnalysisSetupDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    isLocked?: boolean
}


export function AnalysisSetupDialog({ open, onOpenChange, onConfirm, isLocked = false, }: AnalysisSetupDialogProps) {
    const [step, setStep] = useState(1);


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex h-[90vh] w-[95vw] max-w-[95vw] sm:max-w-[95vw] flex-col gap-0 overflow-hidden p-0">
                <DialogHeader>
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <DialogTitle>
                            {isLocked ? "Analysis configured" : "Refine your analysis"}
                        </DialogTitle>
                        <div className="flex items-center gap-3">
                            <StepIndicator currentStep={step} totalSteps={2} isComplete={isLocked} onStepClick={setStep} />
                        </div>
                    </div>
                </DialogHeader>

                {/* Locked banner */}
                {isLocked && (
                    <div className="px-6 py-2.5 bg-emerald-50 border-b border-emerald-600/10 flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-xs font-medium text-emerald-600">
                            Inputs confirmed and locked
                        </span>
                    </div>
                )}

                <div className="min-h-[380px] flex flex-col">
                    {step === 1 ? (
                        <KeyElementsTab
                            onConfirm={() => setStep(2)}
                            readOnly={isLocked}
                            onNext={() => setStep(2)}
                        />
                    ) : (
                        <ChannelPurposeTab
                            onOpenChange={onOpenChange}
                            onConfirm={onConfirm}
                            onBack={() => setStep(1)}
                            readOnly={isLocked}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
