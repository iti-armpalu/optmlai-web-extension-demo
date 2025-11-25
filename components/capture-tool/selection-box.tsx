"use client"

interface SelectionBoxProps {
  x: number
  y: number
  w: number
  h: number
  onResize: (next: { x: number; y: number; w: number; h: number }) => void
}

export function SelectionBox({ x, y, w, h, onResize }: SelectionBoxProps) {
  const handleMouseDown = (
    e: React.MouseEvent,
    corner:
      | "nw"
      | "ne"
      | "sw"
      | "se"
      | "n"
      | "s"
      | "e"
      | "w"
  ) => {
    e.stopPropagation()
    e.preventDefault()

    const startX = e.clientX
    const startY = e.clientY

    const orig = { x, y, w, h }

    const move = (ev: MouseEvent) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY

      let next = { ...orig }

      // Corner-based geometric resizing
      switch (corner) {
        case "nw":
          next.x = orig.x + dx
          next.y = orig.y + dy
          next.w = orig.w - dx
          next.h = orig.h - dy
          break
        case "ne":
          next.y = orig.y + dy
          next.w = orig.w + dx
          next.h = orig.h - dy
          break
        case "sw":
          next.x = orig.x + dx
          next.w = orig.w - dx
          next.h = orig.h + dy
          break
        case "se":
          next.w = orig.w + dx
          next.h = orig.h + dy
          break
        case "n":
          next.y = orig.y + dy
          next.h = orig.h - dy
          break
        case "s":
          next.h = orig.h + dy
          break
        case "w":
          next.x = orig.x + dx
          next.w = orig.w - dx
          break
        case "e":
          next.w = orig.w + dx
          break
      }

      // Clamp to minimum size
      if (next.w < 20) next.w = 20
      if (next.h < 20) next.h = 20

      onResize(next)
    }

    const up = () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseup", up)
    }

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseup", up)
  }

  // Reusable handle component
  const Handle = ({
    side,
    cursor,
    style,
  }: {
    side:
    | "nw"
    | "ne"
    | "sw"
    | "se"
    | "n"
    | "s"
    | "e"
    | "w"
    cursor: string
    style: React.CSSProperties
  }) => (
    <div
      onMouseDown={(e) => handleMouseDown(e, side)}
      className="absolute bg-white border border-purple-600 shadow-sm rounded-full"
      style={{
        width: 10,
        height: 10,
        cursor,
        ...style,
      }}
    />
  )

  return (
    <div
      id="capture-selection"
      className="absolute border-2 border-purple-500 z-[999999]"
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 3,
      }}
    >
      {/* Corners */}
      <Handle side="nw" cursor="nwse-resize" style={{ top: -5, left: -5 }} />
      <Handle side="ne" cursor="nesw-resize" style={{ top: -5, right: -5 }} />
      <Handle side="sw" cursor="nesw-resize" style={{ bottom: -5, left: -5 }} />
      <Handle side="se" cursor="nwse-resize" style={{ bottom: -5, right: -5 }} />

      {/* Edges */}
      <Handle side="n" cursor="ns-resize" style={{ top: -5, left: "50%", transform: "translateX(-50%)" }} />
      <Handle side="s" cursor="ns-resize" style={{ bottom: -5, left: "50%", transform: "translateX(-50%)" }} />
      <Handle side="w" cursor="ew-resize" style={{ left: -5, top: "50%", transform: "translateY(-50%)" }} />
      <Handle side="e" cursor="ew-resize" style={{ right: -5, top: "50%", transform: "translateY(-50%)" }} />
    </div>
  )
}
