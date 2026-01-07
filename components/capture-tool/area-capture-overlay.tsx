"use client"

import { useEffect, useRef, useState } from "react"
import * as htmlToImage from "html-to-image"

import { SelectionBox } from "./selection-box"
import { CaptureToolbar } from "./capture-toolbar"
import { CaptureInstructionBox } from "./capture-instruction-box"

import { useCaptureStore } from "@/store/capture-store"
import { useUIStore } from "@/store/ui-store"

interface AreaCaptureOverlayProps {
  onCapture: (img: string) => void // (can be removed later if unused)
  onCancel: () => void
}

export function AreaCaptureOverlay({ onCancel }: AreaCaptureOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Freeze scroll during overlay
  useEffect(() => {
    const original = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = original
    }
  }, [])

  // Selection state
  const [dragging, setDragging] = useState(false)
  const [selection, setSelection] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  const start = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== overlayRef.current) return
    start.current = { x: e.clientX, y: e.clientY }
    setSelection(null)
    setDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return
    const x1 = start.current.x
    const y1 = start.current.y
    const x2 = e.clientX
    const y2 = e.clientY

    setSelection({
      x: Math.min(x1, x2),
      y: Math.min(y1, y2),
      w: Math.abs(x2 - x1),
      h: Math.abs(y2 - y1),
    })
  }

  const handleMouseUp = () => setDragging(false)

  const handleResize = (box: { x: number; y: number; w: number; h: number }) => {
    setSelection(box)
  }

  // Capture -> store as DRAFT -> open global preview popup -> close overlay
  const captureNow = async () => {
    if (!selection) return

    const { x, y, w, h } = selection
    const overlay = overlayRef.current
    if (!overlay) return

    try {
      // Hide overlay while rendering the page to an image
      overlay.style.display = "none"

      const dpr = window.devicePixelRatio || 1

      // 1) Render full page to PNG (filter out capture UI)
      const fullImage = await htmlToImage.toPng(document.body, {
        quality: 1,
        pixelRatio: dpr,
        cacheBust: true,
        filter: (node) => {
          if (!(node instanceof HTMLElement)) return true
          const id = node.id
          if (id === "capture-overlay" || id === "capture-toolbar" || id === "capture-selection") return false
          if (node.classList.contains("capture-ui")) return false
          return true
        },
      })

      // 2) Crop the rendered image to the selection
      const img = new Image()
      img.src = fullImage
      await img.decode()

      const correctedX = (x + window.scrollX) * dpr
      const correctedY = (y + window.scrollY) * dpr
      const correctedW = w * dpr
      const correctedH = h * dpr

      const canvas = document.createElement("canvas")
      canvas.width = correctedW
      canvas.height = correctedH
      const ctx = canvas.getContext("2d")!

      ctx.drawImage(
        img,
        correctedX,
        correctedY,
        correctedW,
        correctedH,
        0,
        0,
        correctedW,
        correctedH
      )

      const dataUrl = canvas.toDataURL("image/png")

      // 3) Put into DRAFT (NOT saved history yet)
      useCaptureStore.getState().setDraftCapture({
        image: dataUrl,
        source: "area",
        metadata: {
          x,
          y,
          width: w,
          height: h,
        },
      })

      // 4) Show the global preview popup (user can cancel or generate)
      useUIStore.getState().openCapturePreview()

      // 5) Close the overlay
      onCancel()
    } catch (err) {
      console.error("Capture failed:", err)
    } finally {
      overlay.style.display = ""
    }
  }

  // ESC closes overlay
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel()
    }
    window.addEventListener("keydown", esc)
    return () => window.removeEventListener("keydown", esc)
  }, [onCancel])

  return (
    <div
      className="fixed inset-0 z-[999999] cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Dark backdrop with “hole” for selection */}
      <div
        ref={overlayRef}
        id="capture-overlay"
        className="absolute inset-0 bg-black/30"
        style={{
          ...(selection
            ? {
                clipPath: `polygon(
                  0% 0%,
                  0% 100%,
                  ${selection.x}px 100%,
                  ${selection.x}px ${selection.y}px,
                  ${selection.x + selection.w}px ${selection.y}px,
                  ${selection.x + selection.w}px ${selection.y + selection.h}px,
                  ${selection.x}px ${selection.y + selection.h}px,
                  ${selection.x}px 100%,
                  100% 100%,
                  100% 0%
                )`,
              }
            : {}),
        }}
      />

      {!selection && (
        <CaptureInstructionBox>
          <p className="text-sm text-muted-foreground max-w-md">
            Click and drag to select the area of the screen you want to capture. You can resize the selection using the
            corner handles.
          </p>
        </CaptureInstructionBox>
      )}

      {selection && !dragging && (
        <CaptureInstructionBox>
          <p className="text-sm text-muted-foreground max-w-md">
            Drag the corner handles to resize your selection. Click <strong>Capture</strong> when ready, or{" "}
            <strong>Reset</strong> to start over.
          </p>
        </CaptureInstructionBox>
      )}

      {selection && (
        <SelectionBox
          x={selection.x}
          y={selection.y}
          w={selection.w}
          h={selection.h}
          onResize={handleResize}
        />
      )}

      <CaptureToolbar
        hasSelection={!!selection}
        onReset={() => setSelection(null)}
        onCancel={onCancel}
        onConfirm={captureNow}
      />
    </div>
  )
}
