"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Pencil, X } from "lucide-react"
import { useCaptureStore } from "@/store/capture-store"

interface EditableTitleProps {
  captureId: string
  value: string
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: { input: "h-7 text-sm", iconBtn: "h-7 w-7", icon: "h-3.5 w-3.5", text: "text-sm" },
  md: { input: "h-8 text-sm", iconBtn: "h-8 w-8", icon: "h-4 w-4", text: "text-sm" },
  lg: { input: "h-9 text-base", iconBtn: "h-9 w-9", icon: "h-4 w-4", text: "text-base" },
} as const

export function EditableTitle({ captureId, value, className = "", size = "md" }: EditableTitleProps) {
  const updateCaptureName = useCaptureStore((s) => s.updateCaptureName)

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  const styles = sizeClasses[size]

  // Keep local draft in sync if the stored value changes
  useEffect(() => {
    if (!editing) setDraft(value)
  }, [value, editing])

  // Auto-focus when entering edit mode
  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const cancel = () => {
    setDraft(value)
    setEditing(false)
  }

  const save = () => {
    const next = draft.trim()

    // Empty title => revert
    if (!next) return cancel()

    // No change => just close
    if (next === value) {
      setEditing(false)
      return
    }

    updateCaptureName(captureId, next)
    setEditing(false)
  }

  if (!editing) {
    return (
      <div className={className} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 min-w-0">
          <h3 className={`font-semibold truncate ${styles.text}`}>{value}</h3>

          {/* Edit should not trigger card preview */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`${styles.iconBtn} text-muted-foreground hover:text-foreground`}
            onClick={() => setEditing(true)}
            aria-label="Edit capture title"
          >
            <Pencil className={styles.icon} />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center gap-2">
        <Input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className={styles.input}
          aria-label="Capture title"
          // Enter/Escape for speed
          onKeyDown={(e) => {
            if (e.key === "Enter") save()
            if (e.key === "Escape") cancel()
          }}
          // Optional: blur cancels (or call save if you prefer)
          onBlur={cancel}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`${styles.iconBtn} text-emerald-600 hover:text-emerald-700`}
          onClick={save}
          aria-label="Save title"
        >
          <Check className={styles.icon} />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`${styles.iconBtn} text-muted-foreground hover:text-foreground`}
          onClick={cancel}
          aria-label="Cancel edit"
        >
          <X className={styles.icon} />
        </Button>
      </div>
    </div>
  )
}
