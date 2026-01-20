"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"

type Px = number
type CssSize = string // e.g. "calc(100vw - 10px)", "min(1200px, 100vw)", "100vw"

type ResizableSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode

  /**
   * Initial width in px when the sheet mounts (or when you choose to reset it).
   */
  initialWidth?: Px

  /**
   * Min/Max width used for clamping during resize.
   * maxWidth can be a number (px) OR a CSS size string (e.g. "calc(100vw - 10px)").
   */
  minWidth?: Px
  maxWidth?: Px | CssSize

  /**
   * Extra classes for SheetContent.
   */
  className?: string

  /**
   * Optional z-index for stacked drawers.
   */
  zIndex?: number

  /**
   * Optional style override (merged into SheetContent style).
   */
  style?: React.CSSProperties

  /**
   * If true, disables resizing (keeps fixed width = initialWidth).
   */
  resizable?: boolean
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

/**
 * Parses a CSS maxWidth string into a usable pixel value for clamping.
 * Supports:
 * - "calc(100vw - 10px)"
 * - "100vw"
 * - "1234px"
 * - "min(...)" / "max(...)" etc -> falls back to viewport width (safe)
 *
 * If parsing fails, returns window.innerWidth (safe fallback).
 */
function resolveMaxWidthPx(maxWidth: Px | CssSize | undefined): number {
  if (typeof window === "undefined") return 99999
  if (maxWidth == null) return window.innerWidth

  if (typeof maxWidth === "number") return maxWidth

  const v = maxWidth.trim()

  // "1234px"
  const pxMatch = v.match(/^(\d+(?:\.\d+)?)px$/i)
  if (pxMatch) return Number(pxMatch[1])

  // "100vw"
  const vwMatch = v.match(/^(\d+(?:\.\d+)?)vw$/i)
  if (vwMatch) return (window.innerWidth * Number(vwMatch[1])) / 100

  // "calc(100vw - 10px)" (simple/common case)
  const calcMatch = v
    .replace(/\s+/g, "")
    .match(/^calc\((\d+(?:\.\d+)?)vw-([0-9]+(?:\.[0-9]+)?)px\)$/i)
  if (calcMatch) {
    const vw = Number(calcMatch[1])
    const px = Number(calcMatch[2])
    return (window.innerWidth * vw) / 100 - px
  }

  // Fallback for complex CSS like min()/max()/clamp()
  return window.innerWidth
}

/**
 * Shared resizable right-side Sheet wrapper.
 * - Adds a drag handle on the left edge.
 * - Clamps width between minWidth and maxWidth (supports CSS maxWidth strings).
 * - Can be stacked via zIndex.
 */
export function ResizableSheet({
  open,
  onOpenChange,
  children,
  initialWidth = 600,
  minWidth = 420,
  maxWidth = 1500,
  className,
  zIndex,
  style,
  resizable = true,
}: ResizableSheetProps) {
  const [drawerWidth, setDrawerWidth] = useState<number>(initialWidth)
  const resizing = useRef(false)

  // Optional: reset width to initialWidth when opened (comment out if you prefer "remember last drag width")
  // useEffect(() => {
  //   if (open) setDrawerWidth(initialWidth)
  // }, [open, initialWidth])

  const beginResize = (e: React.MouseEvent) => {
    if (!resizable) return
    e.preventDefault()
    resizing.current = true
  }

  useEffect(() => {
    if (!resizable) return

    const onMove = (e: MouseEvent) => {
      if (!resizing.current) return

      const maxPx = resolveMaxWidthPx(maxWidth)
      const nextWidth = window.innerWidth - e.clientX
      setDrawerWidth(clamp(nextWidth, minWidth, maxPx))
    }

    const onUp = () => {
      resizing.current = false
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
    }
  }, [minWidth, maxWidth, resizable])

  // Keep width clamped if viewport changes (especially important for "calc(100vw - 10px)")
  useEffect(() => {
    if (typeof window === "undefined") return

    const onResize = () => {
      const maxPx = resolveMaxWidthPx(maxWidth)
      setDrawerWidth((w) => clamp(w, minWidth, maxPx))
    }

    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [minWidth, maxWidth])

  const maxWidthStyle: React.CSSProperties["maxWidth"] =
    typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={["overflow-y-auto", className].filter(Boolean).join(" ")}
        style={{
          width: drawerWidth,
          maxWidth: maxWidthStyle ?? "100vw",
          zIndex,
          ...style,
        }}
      >
        {/* Shared resize handle */}
        <div
          onMouseDown={beginResize}
          className={[
            "absolute left-0 top-0 z-50 flex h-full w-[12px] items-center justify-center group",
            resizable ? "cursor-col-resize" : "cursor-default",
          ].join(" ")}
          aria-hidden="true"
        >
          <div className="h-14 w-[3px] rounded-full bg-muted-foreground/40 transition group-hover:bg-muted-foreground/70" />
        </div>

        {children}
      </SheetContent>
    </Sheet>
  )
}
