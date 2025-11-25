"use client"

import { Button } from "@/components/ui/button"
import { ImageUp, SquareDashedMousePointer, X, Maximize2, FolderOpen, Monitor } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { SidebarProvider } from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar"

import { useState } from "react"
import { useUIStore } from "@/store/ui-store"

import { AreaCaptureOverlay } from "./capture-tool/area-capture-overlay"
import { ProcessingPopover } from "./processing-popover"
import { processCapturedImage } from "@/lib/report-pipeline"

export function FloatingToggle() {
    const {
        sidebarOpen,
        toggleSidebar,
        isCapturing,
        startCapture,
        stopCapture,
        isProcessing,
        startProcessing,
        stopProcessing,
        openDrawer,
    } = useUIStore()

    const [isHovered, setIsHovered] = useState(false)
    const [buttonHovered, setButtonHovered] = useState(false)

    const quickActions = [
        { icon: SquareDashedMousePointer, label: "Capture Area", onClick: () => startCapture() },
        { icon: ImageUp, label: "Upload Image", onClick: () => console.log("Upload image clicked") },
        { icon: FolderOpen, label: "From Captures", onClick: () => console.log("Use existing") },
        { icon: Monitor, label: "Full Page", onClick: () => console.log("Entire viewport") },
    ]
    const handleCapture = async (imageData: string) => {
        startProcessing() // show spinner

        try {
            // Simulate delay / backend latency
            await new Promise((r) => setTimeout(r, 8000))

            // Generate & save report
            await processCapturedImage(imageData)

            // Open the report drawer
            openDrawer("report")
        } finally {
            stopProcessing()
        }
    }

    return (
        <TooltipProvider>
            {/* PROCESSING */}
            {isProcessing && (
                <ProcessingPopover isOpen={isProcessing} />
            )}

            {/* AREA CAPTURE OVERLAY */}
            {isCapturing && (
                <AreaCaptureOverlay
                    onCapture={async (img) => {
                        await handleCapture(img)
                    }}
                    onCancel={stopCapture}
                />
            )}

            {/* FLOATING BUTTONS */}
            <div
                className="fixed top-0 right-0 flex flex-row items-center gap-3 z-50"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* SIDEBAR */}
                <div
                    className={`transition-all duration-300 ${sidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[400px] pointer-events-none"}`}
                >
                    <div className="fixed top-0">
                        <SidebarProvider defaultOpen={false}>
                            <AppSidebar
                                side="right"
                                variant="floating"
                            />
                        </SidebarProvider>
                    </div>
                </div>

                {/* FLOATING TOGGLE BUTTON + QUICK ACTIONS */}
                <div className="fixed bottom-6 right-3 flex flex-col items-center gap-3">
                    <div
                        className={`flex flex-col gap-2 transition-all duration-300 ${isHovered && !sidebarOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4 pointer-events-none"
                            }`}
                    >
                        {quickActions.map((action, index) => (
                            <Tooltip key={index} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        onClick={action.onClick}
                                        className="h-10 w-10 rounded-full shadow-md transition-transform hover:scale-110"
                                        style={{ transitionDelay: `${index * 50}ms` }}
                                    >
                                        <action.icon className="h-4 w-4" />
                                        <span className="sr-only">{action.label}</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="left">
                                    <p>{action.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </div>

                    <Tooltip delayDuration={0}>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                onClick={toggleSidebar}
                                onMouseEnter={() => setButtonHovered(true)}
                                onMouseLeave={() => setButtonHovered(false)}
                                className="h-8 w-8 rounded-lg shadow-lg transition-transform hover:scale-110 bg-purple-500 hover:bg-purple-600"
                            >
                                {sidebarOpen ? (
                                    <X className="h-5 w-5" />
                                ) : buttonHovered ? (
                                    <Maximize2 className="h-5 w-5" />
                                ) : (
                                    <span className="text-lg">S</span>
                                )}
                                <span className="sr-only">Toolbar</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>{sidebarOpen ? "Close toolbar" : "Open toolbar"}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    )
}