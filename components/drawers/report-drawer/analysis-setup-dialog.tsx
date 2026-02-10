"use client"

import { useEffect, useMemo, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"

import { Lock, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { KeyElementsTab } from "./key-elements-tab"
import { ChannelPurposeTab } from "./channel-purpose-tab"


const steps = [
    {
        value: "key-elements",
        step: 1,
        label: "Confirm visual elements for analysis",
        description:
            "Review and confirm system detected key elements so analysis is tailored to context.",
        shortLabel: "Elements",
    },
    {
        value: "channel-purpose",
        step: 2,
        label: "Confirm channel & purpose for analysis",
        description:
            "Select where this creative will run and its objective so analysis is tailored to context.",
        shortLabel: "Purpose & Channel",
    },
] as const

interface AnalysisSetupDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    isLocked?: boolean
}

export function AnalysisSetupDialog({ open, onOpenChange, onConfirm, isLocked = false, }: AnalysisSetupDialogProps) {
    const [activeTab, setActiveTab] = useState("key-elements")
    const [justConfirmed, setJustConfirmed] = useState<null | "key-elements" | "channel-purpose">(null)


    // "soft" confirmations, only live while dialog is open
    const [elementsReady, setElementsReady] = useState(false)
    const [channelPurposeReady, setChannelPurposeReady] = useState(false)

    // reset per open session (optional but matches typical UX)
    useEffect(() => {
        if (!open) return
        setActiveTab("key-elements")
        setElementsReady(false)
        setChannelPurposeReady(false)
    }, [open])

    const currentStepIndex = steps.findIndex((s) => s.value === activeTab)
    const allReady = useMemo(() => elementsReady && channelPurposeReady, [elementsReady, channelPurposeReady])

    const confirmCurrentStep = () => {
        if (activeTab === "key-elements") {
            setElementsReady(true)
            setJustConfirmed("key-elements")
        }

        if (activeTab === "channel-purpose") {
            setChannelPurposeReady(true)
            setJustConfirmed("channel-purpose")
        }

        // Clear feedback after 1.2s
        setTimeout(() => {
            setJustConfirmed(null)
        }, 2000)
    }

    const isCurrentStepConfirmed =
        (activeTab === "key-elements" && elementsReady) ||
        (activeTab === "channel-purpose" && channelPurposeReady)



    const footerNote =
        activeTab === "key-elements"
            ? "Analysis is generated using confirmed key elements. You can still adjust them until you generate the full analysis."
            : "Analysis is generated using confirmed channel & purpose. You can still adjust them until you generate the full analysis."


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex h-[90vh] w-[95vw] max-w-[95vw] sm:max-w-[95vw] flex-col gap-0 overflow-hidden p-0">
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="flex h-full flex-col"
                >
                    {/* Step Progress Framing */}
                    <div className="shrink-0 border-b border-border bg-muted/40 px-8 py-4">
                        <div className="flex flex-col gap-0.5">
                            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                {`Step ${currentStepIndex + 1} of ${steps.length}`}
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-foreground">
                                    {steps[currentStepIndex].label}
                                </p>

                                {isCurrentStepConfirmed && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                                        <Check className="h-3 w-3" />
                                        Confirmed
                                    </span>
                                )}
                            </div>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                {steps[currentStepIndex].description}
                            </p>
                        </div>
                    </div>

                    <DialogHeader className="sr-only">
                        <DialogTitle>Campaign Builder</DialogTitle>
                    </DialogHeader>

                    <div className="shrink-0 w-full px-8 pb-0 pt-4">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger
                                value="key-elements"
                            >
                                Key Elements
                            </TabsTrigger>
                            <TabsTrigger
                                value="channel-purpose"
                            >
                                {"Channel & Purpose"}
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent
                        value="key-elements"
                        className="mt-0 flex-1 overflow-y-auto"
                    >
                        <div className="px-8 py-6">
                            <KeyElementsTab
                                onConfirm={() => onConfirm}
                                isLocked={isLocked}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent
                        value="channel-purpose"
                        className="mt-0 flex-1 overflow-y-auto"
                    >
                        <div className="px-8 py-6">
                            <ChannelPurposeTab
                                onConfirm={() => onConfirm}
                                isLocked={isLocked}
                            />
                        </div>
                    </TabsContent>

                    {/* Sticky bottom CTA */}
                    <div className="shrink-0 border-t border-border bg-muted/40 px-8 py-4">
                        <div className="flex items-center justify-between gap-4">

                            <div className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/30 px-4 py-3">
                                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                <p className="text-xs leading-relaxed text-muted-foreground">{footerNote}</p>
                            </div>


                            <div className="flex shrink-0 items-center gap-2">
                                <Button
                                    variant="outline"
                                    className="h-9 px-4 bg-transparent"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Cancel
                                </Button>

                                <div className="flex flex-col items-center">
                                    {/* Step confirm button (soft confirm) */}
                                    <Button
                                        variant="secondary"
                                        className="h-9 gap-2 px-5 transition-all duration-300 w-3xs"
                                        onClick={confirmCurrentStep}
                                        disabled={isLocked}
                                    >
                                        {justConfirmed === activeTab ? (
                                            <span className="flex items-center gap-2 animate-confirm-in">
                                                <Check className="h-4 w-4 text-emerald-600" />
                                                Confirmed
                                            </span>
                                        ) : activeTab === "key-elements" ? (
                                            "Confirm key elements"
                                        ) : (
                                            "Confirm channel & purpose"
                                        )}
                                    </Button>
                                </div>


                                {/* Final generate button (hard lock) */}
                                <Button
                                    className="h-9 gap-2 px-5 w-3xs"
                                    onClick={() => {
                                        // HARD lock happens in parent via onConfirm
                                        onConfirm()
                                        onOpenChange(false)
                                    }}
                                    disabled={!allReady || isLocked}
                                >
                                    Generate full analysis
                                    {allReady && !isLocked ? <ArrowRight className="h-3.5 w-3.5" /> : null}
                                </Button>
                            </div>





                        </div>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
