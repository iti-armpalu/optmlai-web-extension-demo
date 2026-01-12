import type React from "react"
import { cn } from "@/lib/utils"

interface CaptureThumbnailProps {
  imageUrl: string
  alt: string
  className?: string
  children?: React.ReactNode
}

export function CaptureThumbnail({ imageUrl, alt, className, children }: CaptureThumbnailProps) {
  return (
    <div className={cn("aspect-video relative overflow-hidden bg-muted", className)}>
      <img src={imageUrl || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />
      {children}
    </div>
  )
}
