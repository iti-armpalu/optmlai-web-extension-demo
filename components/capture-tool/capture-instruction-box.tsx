import type React from "react"

interface CaptureInstructionBoxProps {
  children: React.ReactNode
}

export function CaptureInstructionBox({ children }: CaptureInstructionBoxProps) {
  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[999999] pointer-events-none">
      <div className="bg-background border border-border rounded-lg px-6 py-4 shadow-xl">
        <div className="flex flex-col items-center gap-2 text-center">
          {children}
        </div>
      </div>
    </div>
  )
}