"use client"

import { Button } from "@/components/ui/button"
import { ImageUp, SquareDashedMousePointer, X, Maximize2, FolderOpen, MousePointerClick } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { AppSidebar } from "./app-sidebar"

import { useCallback, useMemo, useState } from "react"
import { useUIStore } from "@/store/ui-store"

import { AreaCaptureOverlay } from "./capture-tool/area-capture-overlay"
import { ProcessingPopover } from "./processing-popover"
import { processCapturedImage } from "@/lib/report-pipeline"
import { CapturePreviewPopupHost } from "./capture-tool/capture-preview-popup-host"

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

/**
 * Definition of a quick action button shown above the floating toggle.
 */
type QuickAction = {
    icon: React.ComponentType<{ className?: string }>
    label: string
    onClick: () => void
}

/* -------------------------------------------------------------------------- */
/*                               Floating Toggle                              */
/* -------------------------------------------------------------------------- */

/**
 * Root entry point for the tool UI.
 *
 * Responsibilities:
 * - Controls sidebar open/close
 * - Exposes quick capture actions
 * - Hosts capture flow (overlay → preview → processing)
 * - Acts as the single UI anchor for the tool
 */
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
        finishProcessing,
        openDrawer,
    } = useUIStore()

    // Hover states for micro-interactions (expand/collapse animations)
    const [isHovered, setIsHovered] = useState(false)
    const [buttonHovered, setButtonHovered] = useState(false)

    /* ------------------------------------------------------------------------ */
    /*                             Capture Flow Logic                            */
    /* ------------------------------------------------------------------------ */

    /**
     * Handles the full capture lifecycle:
     * preview → processing → report creation → open report drawer
     */
    const handleCapture = useCallback(
        async (imageData: string) => {
            if (isProcessing) return
            startProcessing()

            try {
                await new Promise((r) => setTimeout(r, 8000))

                const report = await processCapturedImage(imageData) // ReportItem
                finishProcessing(report.id) // ✅ string

                // optional (only if processCapturedImage does NOT already do this):
                // useReportStore.getState().addReport(report)
            } catch (err) {
                console.error(err)
                stopProcessing()
            }
        },
        [isProcessing, startProcessing, stopProcessing, finishProcessing]
    )


    /* ------------------------------------------------------------------------ */
    /*                             Quick Action Setup                            */
    /* ------------------------------------------------------------------------ */

    /**
     * Floating quick actions revealed on hover.
     * These are entry points into different capture flows.
     */
    const quickActions: QuickAction[] = useMemo(
        () => [
            { icon: SquareDashedMousePointer, label: "Capture Area", onClick: startCapture },
            { icon: ImageUp, label: "Upload Image", onClick: () => console.log("Upload image clicked") },
            { icon: MousePointerClick, label: "Select", onClick: () => console.log("Select") },
            { icon: FolderOpen, label: "From Captures", onClick: () => console.log("Use existing") },
        ],
        [startCapture]
    )


    /* ------------------------------------------------------------------------ */
    /*                                  Render                                  */
    /* ------------------------------------------------------------------------ */

    return (
        <>
            {/* Fullscreen overlay for area capture */}
            {
                isCapturing && (
                    <CaptureOverlay onCapture={handleCapture} onCancel={stopCapture} />
                )
            }



            {/* Fixed UI anchor for sidebar + floating controls */}
            <div
                className="fixed top-0 right-0 z-50 flex flex-row items-center gap-3"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Right-side floating sidebar + contextual popups */}
                <SidebarRegion
                    sidebarOpen={sidebarOpen}
                    isProcessing={isProcessing}
                    onGenerate={handleCapture}
                />

                {/* Floating toggle button and quick actions */}
                <FloatingControls
                    sidebarOpen={sidebarOpen}
                    isHovered={isHovered}
                    buttonHovered={buttonHovered}
                    onButtonHoverChange={setButtonHovered}
                    onToggleSidebar={toggleSidebar}
                    quickActions={quickActions}
                />
            </div>
        </>
    )
}


/* -------------------------------------------------------------------------- */
/*                            Capture Overlay Wrapper                          */
/* -------------------------------------------------------------------------- */

/**
 * Thin wrapper around the area capture overlay.
 * Keeps capture-specific UI separate from tool shell logic.
 */
function CaptureOverlay(props: {
    onCapture: (img: string) => void
    onCancel: () => void
}) {
    return (
        <AreaCaptureOverlay
            onCapture={async (img) => {
                await props.onCapture(img)
            }}
            onCancel={props.onCancel}
        />
    )
}

/* -------------------------------------------------------------------------- */
/*                               Sidebar Region                               */
/* -------------------------------------------------------------------------- */

/**
 * Hosts the floating sidebar and any UI anchored to it
 * (capture preview, processing indicator, etc).
 */
function SidebarRegion(props: {
    sidebarOpen: boolean
    isProcessing: boolean
    onGenerate: (img: string) => void
}) {
    return (
        <div
            className={`transition-all duration-300 ${props.sidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[400px] pointer-events-none"}`}
        >
            <div className="fixed top-0 right-0">
                <div className="relative h-dvh">
                    <AppSidebar side="right" variant="floating" collapsible="icon" />

                    {/* Bottom-aligned, sits to the left of the sidebar */}
                    <div className="absolute bottom-2 right-full mr-2 z-60 slide-in-from-bottom-4">
                        <CapturePreviewPopupHost onGenerate={props.onGenerate} />
                        {props.isProcessing && <ProcessingPopover isOpen />}
                    </div>
                </div>
            </div>
        </div>
    )
}


/* -------------------------------------------------------------------------- */
/*                           Floating Control Cluster                          */
/* -------------------------------------------------------------------------- */

/**
 * Bottom-right floating controls:
 * - Quick action buttons
 * - Primary toggle button
 */
function FloatingControls(props: {
    sidebarOpen: boolean
    isHovered: boolean
    buttonHovered: boolean
    onButtonHoverChange: (v: boolean) => void
    onToggleSidebar: () => void
    quickActions: QuickAction[]
}) {
    return (
        <div className="fixed bottom-6 right-3 flex flex-col items-center gap-3 transition-all duration-300">
            <QuickActions
                visible={props.isHovered && !props.sidebarOpen}
                actions={props.quickActions}
            />

            <ToggleButton
                sidebarOpen={props.sidebarOpen}
                buttonHovered={props.buttonHovered}
                onHoverChange={props.onButtonHoverChange}
                onToggle={props.onToggleSidebar}
            />
        </div>
    )
}


/* -------------------------------------------------------------------------- */
/*                              Quick Action Stack                             */
/* -------------------------------------------------------------------------- */

/**
 * Vertical stack of quick action buttons revealed on hover.
 */
function QuickActions(props: {
    visible: boolean
    actions: QuickAction[]
}) {
    return (
        <div
            className={[
                "flex flex-col gap-2 transition-all duration-300",
                props.visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none",
            ].join(" ")}
        >
            {props.actions.map((action, index) => (
                <Tooltip key={action.label} delayDuration={0}>
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
    )
}

/* -------------------------------------------------------------------------- */
/*                             Sidebar Toggle Button                           */
/* -------------------------------------------------------------------------- */

/**
 * Primary floating button that opens/closes the sidebar.
 */
function ToggleButton(props: {
    sidebarOpen: boolean
    buttonHovered: boolean
    onHoverChange: (v: boolean) => void
    onToggle: () => void
}) {
    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Button
                    size="icon"
                    onClick={props.onToggle}
                    onMouseEnter={() => props.onHoverChange(true)}
                    onMouseLeave={() => props.onHoverChange(false)}
                    className="h-8 w-8 rounded-lg bg-purple-500 shadow-lg transition-transform hover:scale-110 hover:bg-purple-600"
                >
                    {props.sidebarOpen ? (
                        <X className="h-5 w-5" />
                    ) : props.buttonHovered ? (
                        <Maximize2 className="h-5 w-5" />
                    ) : (
                        <span className="text-lg">O</span>
                    )}
                    <span className="sr-only">Toolbar</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
                <p>{props.sidebarOpen ? "Close toolbar" : "Open toolbar"}</p>
            </TooltipContent>
        </Tooltip>
    )
}



















// export function FloatingToggle() {
//     const {
//         sidebarOpen,
//         toggleSidebar,
//         isCapturing,
//         startCapture,
//         stopCapture,
//         isProcessing,
//         startProcessing,
//         stopProcessing,
//         openDrawer,
//     } = useUIStore()

//     const [isHovered, setIsHovered] = useState(false)
//     const [buttonHovered, setButtonHovered] = useState(false)

//     const quickActions = [
//         { icon: SquareDashedMousePointer, label: "Capture Area", onClick: () => startCapture() },
//         { icon: ImageUp, label: "Upload Image", onClick: () => console.log("Upload image clicked") },
//         { icon: MousePointerClick, label: "Select", onClick: () => console.log("Select") },
//         { icon: FolderOpen, label: "From Captures", onClick: () => console.log("Use existing") },

//     ]
//     const handleCapture = async (imageData: string) => {
//         startProcessing() // show spinner

//         try {
//             // Simulate delay / backend latency
//             await new Promise((r) => setTimeout(r, 8000))

//             // Generate & save report
//             await processCapturedImage(imageData)

//             // Open the report drawer
//             openDrawer("report")
//         } finally {
//             stopProcessing()
//         }
//     }

//     return (
//         <TooltipProvider>

//             {/* AREA CAPTURE OVERLAY */}
//             {isCapturing && (
//                 <AreaCaptureOverlay
//                     onCapture={async (img) => {
//                         await handleCapture(img)
//                     }}
//                     onCancel={stopCapture}
//                 />
//             )}

//             {/* FLOATING BUTTONS */}
//             <div
//                 className="fixed top-0 right-0 flex flex-row items-center gap-3 z-50"
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//             >
//                 {/* SIDEBAR */}
//                 <div
//                     className={`transition-all duration-300 ${sidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[400px] pointer-events-none"}`}
//                 >
//                     <div className="fixed top-0 right-0">
//                         <div className="relative">
//                             <SidebarProvider defaultOpen={true}>
//                                 <AppSidebar
//                                     side="right"
//                                     variant="floating"
//                                 />
//                             </SidebarProvider>

//                             {/* Popup anchored to sidebar */}
//                             <div className="absolute bottom-2 -left-80 z-[999999] animate-in slide-in-from-bottom-4">
//                                 <CapturePreviewPopupHost onGenerate={handleCapture} />

//                                 {/* PROCESSING */}
//                                 {isProcessing && (
//                                     <ProcessingPopover isOpen={isProcessing} />
//                                 )}

//                             </div>


//                         </div>
//                     </div>
//                 </div>

//                 {/* FLOATING TOGGLE BUTTON + QUICK ACTIONS */}
//                 <div className={`fixed bottom-6 right-3 flex flex-col items-center gap-3 transition-all duration-300`}>
//                     <div
//                         className={`flex flex-col gap-2 transition-all duration-300 ${isHovered && !sidebarOpen
//                             ? "opacity-100 translate-y-0"
//                             : "opacity-0 translate-y-4 pointer-events-none"
//                             }`}
//                     >
//                         {quickActions.map((action, index) => (
//                             <Tooltip key={index} delayDuration={0}>
//                                 <TooltipTrigger asChild>
//                                     <Button
//                                         size="icon"
//                                         variant="secondary"
//                                         onClick={action.onClick}
//                                         className="h-10 w-10 rounded-full shadow-md transition-transform hover:scale-110"
//                                         style={{ transitionDelay: `${index * 50}ms` }}
//                                     >
//                                         <action.icon className="h-4 w-4" />
//                                         <span className="sr-only">{action.label}</span>
//                                     </Button>
//                                 </TooltipTrigger>
//                                 <TooltipContent side="left">
//                                     <p>{action.label}</p>
//                                 </TooltipContent>
//                             </Tooltip>
//                         ))}
//                     </div>

//                     <Tooltip delayDuration={0}>
//                         <TooltipTrigger asChild>
//                             <Button
//                                 size="icon"
//                                 onClick={toggleSidebar}
//                                 onMouseEnter={() => setButtonHovered(true)}
//                                 onMouseLeave={() => setButtonHovered(false)}
//                                 className="h-8 w-8 rounded-lg shadow-lg transition-transform hover:scale-110 bg-purple-500 hover:bg-purple-600"
//                             >
//                                 {sidebarOpen

//                                     ? (
//                                         <X className="h-5 w-5" />
//                                     )

//                                     : buttonHovered ? (
//                                         <Maximize2 className="h-5 w-5" />
//                                     )

//                                         : (
//                                             <span className="text-lg">O</span>
//                                         )}
//                                 <span className="sr-only">Toolbar</span>
//                             </Button>
//                         </TooltipTrigger>
//                         <TooltipContent side="left">
//                             <p>{sidebarOpen ? "Close toolbar" : "Open toolbar"}</p>
//                         </TooltipContent>
//                     </Tooltip>
//                 </div>
//             </div>
//         </TooltipProvider>
//     )
// }