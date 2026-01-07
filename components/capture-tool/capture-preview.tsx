"use client"

import Image from "next/image"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { useEffect } from "react"

interface CapturePreviewProps {
  imageData: string
  onGenerateReport: () => void
  onClose: () => void
}

export function CapturePreview({
  imageData,
  onGenerateReport,
  onClose,
}: CapturePreviewProps) {

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <div className="relative w-80 bg-background border rounded-lg shadow-xl p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="
          absolute top-2 right-2 
          p-1.5
          transition
        "
        aria-label="Close preview"
      >
        <X className="h-4 w-4 text-gray-600" />
      </button>

      <h3 className="text-sm font-semibold mb-3 pr-6">
        Image Preview /
        Ad Creative Preview
      </h3>

      {/* Image preview */}
      <div className="relative w-full aspect-video  overflow-hidden border mb-4">
        <Image
          src={imageData}
          alt="Captured screenshot"
          fill
          className="object-contain"
        />
      </div>

      {/* Generate report */}
      <Button
        className="
          w-full 
          bg-purple-600 
          hover:bg-purple-700 
          text-white
        "
        onClick={onGenerateReport}
      >
        Generate Report
      </Button>
    </div>
  )
}
