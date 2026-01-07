"use client"

import { CaptureItem, useCaptureStore } from "@/store/capture-store"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Trash2, Upload } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useUIStore } from "@/store/ui-store"
import { CaptureCard } from "./capture-card"
import { groupCapturesByTime } from "./time-grouping"
import { EmptyState } from "./empty-state"
import { CapturePreviewDialog } from "./capture-preview-dialog"

interface CapturesDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CapturesDrawer({ open, onOpenChange }: CapturesDrawerProps) {
    const [selectedCapture, setSelectedCapture] = useState<CaptureItem | null>(null)
    const [previewOpen, setPreviewOpen] = useState(false)
    const captures = useCaptureStore((state) => state.captures)
    const removeCapture = useCaptureStore((state) => state.removeCapture)

    const mostRecentCapture = captures[0]
    const olderCaptures = captures.slice(1)
    const grouped = groupCapturesByTime(olderCaptures)

    const setActiveCapture = useCaptureStore((s) => s.setActiveCapture)
    const openCapturePreview = useUIStore((s) => s.openCapturePreview)
    const clearDraft = useCaptureStore((s) => s.clearDraftCapture)

    //
    // ----- RESIZABLE DRAWER LOGIC -----
    //
    const [drawerWidth, setDrawerWidth] = useState(1000)
    const resizing = useRef(false)

    const beginResize = (e: React.MouseEvent) => {
        e.preventDefault()
        resizing.current = true
    }

    const resize = (e: MouseEvent) => {
        if (!resizing.current) return
        const newWidth = window.innerWidth - e.clientX
        const clamped = Math.min(Math.max(newWidth, 600), 1500)
        setDrawerWidth(clamped)
    }

    const stopResize = () => (resizing.current = false)

    useEffect(() => {
        window.addEventListener("mousemove", resize)
        window.addEventListener("mouseup", stopResize)
        return () => {
            window.removeEventListener("mousemove", resize)
            window.removeEventListener("mouseup", stopResize)
        }
    }, [])

    const handlePreview = (capture: CaptureItem) => {
        setSelectedCapture(capture)
        setPreviewOpen(true)
      }

    return (
        <>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent
                    side="right"
                    className="w-[420px] sm:w-[500px] overflow-y-auto"
                    style={{ width: drawerWidth, maxWidth: "100vw" }}
                >
                    {/* Resize handle */}
                    <div
                        onMouseDown={beginResize}
                        className="absolute left-0 top-0 h-full w-[12px] flex items-center justify-center cursor-col-resize z-50 group"
                    >
                        <div className="h-14 w-[3px] rounded-full bg-muted-foreground/40 group-hover:bg-muted-foreground/70 transition" />
                    </div>
                    <div className="h-full overflow-y-auto">
                        <SheetHeader className="p-8 border-b border-border flex-shrink-0">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <SheetTitle className="text-2xl">Captures</SheetTitle>
                                    <SheetDescription className="text-base">Choose a saved image to preview or evaluate</SheetDescription>
                                </div>
                                {/* <Button onClick={handleUpload} variant="outline" size="sm" className="shrink-0 bg-transparent">
                                <Upload className="mr-2 h-4 w-4" />
                                Upload
                            </Button> */}
                            </div>
                        </SheetHeader>

                        <div className="flex-1 overflow-y-auto">
                            <div className="p-8 space-y-8">

                                {/* Most Recent Capture */}
                                {mostRecentCapture && (
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Most Recent</h3>
                                        <CaptureCard
                                            capture={mostRecentCapture}
                                            onPreview={handlePreview}
                                            // onEvaluate={handleEvaluate}
                                            onDelete={removeCapture}
                                            // onUpdateName={handleUpdateName}
                                            variant="large"
                                        />
                                    </div>
                                )}


                                {/* ---------- GROUPED RENDER ---------- */}
                                <div className="mt-6 space-y-10 pb-10">
                                    {Object.entries(grouped).map(([label, items]) => {
                                        // skip empty sections
                                        if (items.length === 0) return null

                                        return (
                                            <div key={label} className="space-y-3">
                                                {/* Section heading */}
                                                <h3 className="text-sm font-semibold text-muted-foreground px-1">
                                                    {label}
                                                </h3>

                                                {/* Grid */}
                                                <div className="grid grid-cols-2 gap-4">

                                                    {items.map((capture) => (
                                                        // <div
                                                        //     key={capture.id}
                                                        //     className="relative group rounded-md border overflow-hidden cursor-pointer hover:ring-2 hover:ring-purple-500/40"
                                                        //     onClick={() => {
                                                        //         clearDraft()                 // ensure we’re not previewing an old draft
                                                        //         setActiveCapture(capture.id) // choose saved capture
                                                        //         openCapturePreview()         // show the same popup
                                                        //         onOpenChange(false)          // optional: close the drawer
                                                        //     }}
                                                        // >
                                                        //     <div className="relative w-full h-full bg-muted">
                                                        //         <Image
                                                        //             src={capture.image}
                                                        //             alt={capture.name}
                                                        //             fill
                                                        //             sizes="160px"
                                                        //             className="object-cover"
                                                        //         />
                                                        //     </div>

                                                        //     <div className="p-2 text-xs font-medium truncate">
                                                        //         {capture.name}
                                                        //     </div>

                                                        //     <Button
                                                        //         size="icon"
                                                        //         variant="ghost"
                                                        //         className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition"
                                                        //         onClick={(e) => {
                                                        //             e.stopPropagation()
                                                        //             removeCapture(capture.id)
                                                        //         }}
                                                        //     >
                                                        //         <Trash2 className="h-4 w-4 text-destructive" />
                                                        //     </Button>
                                                        // </div>
                                                        <CaptureCard
                                                            key={capture.id}
                                                            capture={capture}
                                                            onPreview={handlePreview}
                                                            // onEvaluate={handleEvaluate}
                                                            onDelete={removeCapture}
                                                            // onUpdateName={handleUpdateName}
                                                            variant="small"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {/* Empty state (only shown if all groups empty) */}
                                    {captures.length === 0 && <EmptyState />}

                                </div>

                            </div>
                        </div>

                    </div>
                </SheetContent>
            </Sheet>

            {selectedCapture && (
                <CapturePreviewDialog
                    open={previewOpen}
                    onOpenChange={setPreviewOpen}
                    capture={selectedCapture}
                    // onGenerateReport={() => handleEvaluate(selectedCapture)}
                />
            )}
        </>
    )
}
