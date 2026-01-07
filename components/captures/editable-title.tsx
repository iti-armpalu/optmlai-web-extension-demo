"use client"

import type React from "react"

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

export function EditableTitle({ captureId, value, className = "", size = "md" }: EditableTitleProps) {
  const updateCaptureName = useCaptureStore((s) => s.updateCaptureName)

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  // keep local draft in sync if value changes externally
  useEffect(() => {
    if (!editing) setDraft(value)
  }, [value, editing])

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const save = () => {
    const next = draft.trim()
    if (!next) {
      setDraft(value) // revert
      setEditing(false)
      return
    }
    updateCaptureName(captureId, next)
    setEditing(false)
  }

  const cancel = () => {
    setDraft(value)
    setEditing(false)
  }

  const sizeClasses = {
    sm: { input: "h-7 text-sm", button: "h-5 w-5", icon: "h-3 w-3", text: "text-sm" },
    md: { input: "h-8", button: "h-6 w-6", icon: "h-3.5 w-3.5", text: "text-base" },
    lg: { input: "h-9", button: "h-7 w-7", icon: "h-4 w-4", text: "text-lg" },
  }

  const styles = sizeClasses[size]

  if (!editing) {
    return (
      <div className={className}>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold truncate">{value}</h3>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => setEditing(true)}
            aria-label="Edit title"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") save()
          if (e.key === "Escape") cancel()
        }}
        className="h-8 w-full rounded-md border bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-purple-500"
        aria-label="Capture title"
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-emerald-600 hover:text-emerald-700"
        onClick={save}
        aria-label="Save title"
      >
        <Check className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
        onClick={cancel}
        aria-label="Cancel edit"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  </div>
  )
}
