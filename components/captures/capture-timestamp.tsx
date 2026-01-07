import { CaptureItem } from "@/store/capture-store"
import { CheckCircle2 } from "lucide-react"

interface CaptureTimestampProps {
  createdAt: number
  // evaluated?: boolean
  // evaluatedAt?: Date
}

export function CaptureTimestamp({ createdAt }: CaptureTimestampProps) {
  const date = new Date(createdAt)


  return (
    <p className="text-xs text-muted-foreground/70 flex items-center gap-1.5">
      {/* {evaluated && evaluatedAt ? ( */}
        <>
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
          {/* <span>Evaluated {formatTimestamp(evaluatedAt)}</span> */}
        </>
      {/* ) : ( */}
        <span>Captured {formatTimestamp(date)}</span>
      {/* )} */}
    </p>
  )
}

function formatTimestamp(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  })
}
