"use client"

import { useEffect, useRef, useState } from "react"
import { CaptureItem, useCaptureStore } from "@/store/capture-store"
import { useUIStore } from "@/store/ui-store"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { CaptureCard } from "../../captures/capture-card/capture-card"
import { groupCapturesByTime } from "./time-grouping"
import { EmptyState } from "./empty-state"

interface CapturesDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Keeps the drawer width resizable without polluting the main component.
 */
function useResizableDrawerWidth({
  min = 600,
  max = 1500,
  initial = 600,
}: {
  min?: number
  max?: number
  initial?: number
}) {
  const [drawerWidth, setDrawerWidth] = useState(initial)
  const resizing = useRef(false)

  const beginResize = (e: React.MouseEvent) => {
    e.preventDefault()
    resizing.current = true
  }

  useEffect(() => {
    const resize = (e: MouseEvent) => {
      if (!resizing.current) return
      const newWidth = window.innerWidth - e.clientX
      const clamped = Math.min(Math.max(newWidth, min), max)
      setDrawerWidth(clamped)
    }

    const stopResize = () => {
      resizing.current = false
    }

    window.addEventListener("mousemove", resize)
    window.addEventListener("mouseup", stopResize)
    return () => {
      window.removeEventListener("mousemove", resize)
      window.removeEventListener("mouseup", stopResize)
    }
  }, [min, max])

  return { drawerWidth, beginResize }
}

export function CapturesDrawer({ open, onOpenChange }: CapturesDrawerProps) {
  // ----- STORE STATE / ACTIONS (single source of truth) -----
  const captures = useCaptureStore((s) => s.captures)
  const removeCapture = useCaptureStore((s) => s.removeCapture)
  const setActiveCapture = useCaptureStore((s) => s.setActiveCapture)
  const clearDraft = useCaptureStore((s) => s.clearDraftCapture)
  const setDraftCapture = useCaptureStore((s) => s.setDraftCapture)

  const openCapturePreview = useUIStore((s) => s.openCapturePreview)

  // ----- DERIVED DATA (presentation) -----
  const mostRecentCapture = captures[0]
  const grouped = groupCapturesByTime(captures.slice(1))

  // ----- UI BEHAVIOR -----
  const { drawerWidth, beginResize } = useResizableDrawerWidth({
    min: 600,
    max: 1500,
    initial: 600,
  })

  /**
   * "Pick" means: choose an existing saved capture as the draft,
   * then open the preview. Important: NO re-saving happens here.
   */
  const handlePick = (capture: CaptureItem) => {
    clearDraft()

    // Optional: track which saved item is currently active
    setActiveCapture(capture.id)

    // Draft is what the preview reads from
    setDraftCapture({
      image: capture.image,
      source: "capture",
      metadata: capture.metadata,
    })

    openCapturePreview()
    onOpenChange(false) // close drawer after selection
  }

  /**
   * Preview uses the same draft mechanism so the UX is consistent.
   * (No separate "local dialog" state.)
   */
  const handlePreview = (capture: CaptureItem) => {
    setDraftCapture({
      image: capture.image,
      source: "capture",
      metadata: capture.metadata,
    })
    openCapturePreview()
  }

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

        <div className="h-full overflow-y-auto">
          <SheetHeader className="p-8 border-b border-border flex-shrink-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <SheetTitle className="text-2xl">Captures</SheetTitle>
                <SheetDescription className="text-base">
                  Choose a saved image to preview or evaluate
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="p-8 space-y-8">
              {/* Most recent */}
              {mostRecentCapture && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Most Recent
                  </h3>
                  <CaptureCard
                    capture={mostRecentCapture}
                    onPreview={handlePreview}
                    onSelect={handlePick}
                    onDelete={removeCapture}
                    variant="large"
                  />
                </div>
              )}

              {/* Grouped */}
              <div className="mt-6 space-y-10 pb-10">
                {Object.entries(grouped).map(([label, items]) => {
                  if (items.length === 0) return null

                  return (
                    <div key={label} className="space-y-3">
                      <h3 className="text-sm font-semibold text-muted-foreground px-1">{label}</h3>

                      <div className="grid grid-cols-2 gap-4">
                        {items.map((capture) => (
                          <CaptureCard
                            key={capture.id}
                            capture={capture}
                            onPreview={handlePreview}
                            onSelect={handlePick}
                            onDelete={removeCapture}
                            variant="small"
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}

                {captures.length === 0 && <EmptyState />}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
