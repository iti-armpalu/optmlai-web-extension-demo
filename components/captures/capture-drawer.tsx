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
import { Trash2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

//
// ----- GROUP CAPTURES BY DATE -----
//
function groupCapturesByDate(captures: CaptureItem[]) {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    const groups = {
        Today: [] as CaptureItem[],
        Yesterday: [] as CaptureItem[],
        "Last 7 Days": [] as CaptureItem[],
        "Last 30 Days": [] as CaptureItem[],
        Older: [] as CaptureItem[],
    }

    // push each capture to the correct category
    captures.forEach((cap) => {
        const created = new Date(cap.createdAt)

        if (created >= today) groups.Today.push(cap)
        else if (created >= yesterday) groups.Yesterday.push(cap)
        else if (created >= lastWeek) groups["Last 7 Days"].push(cap)
        else if (created >= lastMonth) groups["Last 30 Days"].push(cap)
        else groups.Older.push(cap)
    })

    return groups
}

interface CapturesDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CapturesDrawer({ open, onOpenChange }: CapturesDrawerProps) {
    const captures = useCaptureStore((state) => state.captures)
    const removeCapture = useCaptureStore((state) => state.removeCapture)

    const grouped = groupCapturesByDate(captures)

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

    return (
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
                <div className="h-full overflow-y-auto p-8">
                    <SheetHeader>
                        <SheetTitle>Captures</SheetTitle>
                        <SheetDescription>
                            Your saved screenshots, uploads, and full-page captures.
                        </SheetDescription>
                    </SheetHeader>

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
                                    <div className="grid gap-4 justify-center grid-cols-[repeat(auto-fill,160px)] auto-rows-[120px]">

                                        {items.map((capture) => (
                                            <div
                                                key={capture.id}
                                                className="relative group rounded-md border overflow-hidden"
                                            >
                                                <div className="relative w-full h-full bg-muted">
                                                    <Image
                                                        src={capture.image}
                                                        alt={capture.name}
                                                        fill
                                                        sizes="160px"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div className="p-2 text-xs font-medium truncate">
                                                    {capture.name}
                                                </div>

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition"
                                                    onClick={() => removeCapture(capture.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}

                        {/* Empty state (only shown if all groups empty) */}
                        {captures.length === 0 && (
                            <div className="text-sm text-muted-foreground text-center py-10">
                                No captures yet.
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
