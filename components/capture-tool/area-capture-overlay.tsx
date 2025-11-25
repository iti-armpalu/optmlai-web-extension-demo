"use client"

import { useEffect, useRef, useState } from "react"
import * as htmlToImage from "html-to-image"

import { SelectionBox } from "./selection-box"
import { CaptureToolbar } from "./capture-toolbar"
import { CapturePreview } from "./capture-preview"

import { useCaptureStore } from "@/store/capture-store"

interface AreaCaptureOverlayProps {
  onCapture: (img: string) => void
  onCancel: () => void
}

export function AreaCaptureOverlay({ onCapture, onCancel }: AreaCaptureOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Freeze scroll during overlay
  useEffect(() => {
    const original = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = original
    }
  }, [])

  // -------------------------
  // SELECTION STATE
  // -------------------------
  const [dragging, setDragging] = useState(false)
  const [selection, setSelection] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  const start = useRef({ x: 0, y: 0 })

  const [previewImg, setPreviewImg] = useState<string | null>(null)

  // -------------------------
  // START DRAG
  // -------------------------
  const handleMouseDown = (e: React.MouseEvent) => {
    if (previewImg) return
    if (e.target !== overlayRef.current) return

    start.current = { x: e.clientX, y: e.clientY }
    setSelection(null)
    setDragging(true)
  }

  // -------------------------
  // DRAGGING
  // -------------------------
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

  // -------------------------
  // END DRAG
  // -------------------------
  const handleMouseUp = () => setDragging(false)

  // -------------------------
  // RESIZING
  // -------------------------
  const handleResize = (box: { x: number; y: number; w: number; h: number }) => {
    setSelection(box)
  }

  // -------------------------
  // CAPTURE SCREENSHOT
  // -------------------------
  // const captureNow = async () => {

  //    NEED TO CAPTURE THE IMAGE HERE


  //     setPreviewImg("THE CAPTURED IMAGE")
  //   } catch (err) {
  //     console.error("Capture failed:", err)
  //   } finally {
  //     overlay.style.display = ""
  //   }
  // }

  const captureNow = async () => {
    if (!selection) return;

    const { x, y, w, h } = selection;
    const overlay = overlayRef.current;
    if (!overlay) return;

    try {
      // Hide overlay DOM (but html-to-image may still SEE IT without filter)
      overlay.style.display = "none";

      const dpr = window.devicePixelRatio || 1;

      // STEP 1 — Capture full page but exclude UI overlays/toolbars
      const fullImage = await htmlToImage.toPng(document.body, {
        quality: 1,
        pixelRatio: dpr,
        cacheBust: true,

        // Exclude capture UI
        filter: (node) => {
          // Ignore non-elements (text nodes, comments, etc.)
          if (!(node instanceof HTMLElement)) return true;
        
          const id = node.id;
        
          // Exclude specific UI elements by id
          if (id === "capture-overlay" || id === "capture-toolbar" || id === "capture-selection") {
            return false;
          }
        
          // Or exclude anything marked as capture UI
          if (node.classList.contains("capture-ui")) {
            return false;
          }
        
          return true;
        },
      });

      // STEP 2 — create image object
      const img = new Image();
      img.src = fullImage;
      await new Promise((res) => (img.onload = res));

      // STEP 3 — DPI + scroll correction
      const correctedX = (x + window.scrollX) * dpr;
      const correctedY = (y + window.scrollY) * dpr;
      const correctedW = w * dpr;
      const correctedH = h * dpr;

      // STEP 4 — crop via canvas
      const canvas = document.createElement("canvas");
      canvas.width = correctedW;
      canvas.height = correctedH;
      const ctx = canvas.getContext("2d")!;

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
      );

      setPreviewImg(canvas.toDataURL("image/png"));
    } catch (err) {
      console.error("Capture failed:", err);
    } finally {
      overlay.style.display = "";
    }
  };





  // -------------------------
  // FINALIZE (save + pass back)
  // -------------------------
  const finalize = () => {
    if (!previewImg || !selection) return

    // Save to capture-store
    useCaptureStore.getState().addCapture({
      image: previewImg,
      source: "area",
      metadata: {
        x: selection.x,
        y: selection.y,
        width: selection.w,
        height: selection.h,
      },
    })

    // Continue to report generation
    onCapture(previewImg)

    // Close overlay
    onCancel()
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
      {/* DARK BACKDROP */}
      <div
        ref={overlayRef}
        id="capture-overlay"
        className="absolute inset-0 bg-black/30"
        style={{
          ...(selection && !previewImg
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

      {/* SELECTION BOX */}
      {selection && !previewImg && (
        <SelectionBox
          x={selection.x}
          y={selection.y}
          w={selection.w}
          h={selection.h}
          onResize={handleResize}
        />
      )}

      {/* TOOLBAR */}
      {!previewImg && (
        <CaptureToolbar
          hasSelection={!!selection}
          onReset={() => setSelection(null)}
          onCancel={onCancel}
          onConfirm={captureNow}
        />
      )}

      {/* PREVIEW */}
      {previewImg && (
        <div className="absolute bottom-8 right-8 z-[999999]">
          <CapturePreview
            imageData={previewImg}
            onGenerateReport={finalize}
            onClose={onCancel}
          />
        </div>
      )}
    </div>
  )
}
