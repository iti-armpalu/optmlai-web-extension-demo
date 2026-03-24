"use client"

import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, type FormEvent, type KeyboardEvent } from "react"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder: string
  disabled?: boolean
  messagesRemaining: number
  messageLimit: number
  limitReached: boolean
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  disabled,
  messagesRemaining,
  messageLimit,
  limitReached,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Refocus textarea when it becomes enabled again (after assistant responds)
  useEffect(() => {
    if (!disabled && !limitReached) {
      textareaRef.current?.focus()
    }
  }, [disabled, limitReached])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim() || disabled) return
    onSubmit()
    // Refocus immediately after sending
    requestAnimationFrame(() => textareaRef.current?.focus())
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!value.trim() || disabled) return
      onSubmit()
    }
  }

  const handleInput = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }
  }

  const usageText = limitReached
    ? null
    : messagesRemaining <= 5
      ? `You're nearing the message limit for this report`
      : `${messageLimit} AI messages included with this report`

  if (limitReached) {
    return (
      <div className="px-4 pb-4 pt-2">
        <div className="rounded-xl border border-border bg-muted/50 px-4 py-3.5 text-center">
          <p className="text-[13px] text-muted-foreground">
            {"You've reached the AI message limit for this report."}
          </p>
          <p className="mt-1 text-[12px] text-muted-foreground/70">
            Create a new analysis to continue.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 pb-4 pt-2">
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex items-end gap-2 rounded-xl border border-border bg-card p-2",
          "transition-colors duration-150",
          "focus-within:border-foreground/20"
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            handleInput()
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className={cn(
            "flex-1 resize-none bg-transparent px-2 py-1.5",
            "text-[13px] text-foreground placeholder:text-muted-foreground/60",
            "outline-none",
            "disabled:opacity-50"
          )}
        />
        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-lg",
            "bg-primary text-primary-foreground",
            "transition-all duration-150",
            "hover:bg-primary/90",
            "disabled:opacity-30 disabled:cursor-not-allowed",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label="Send message"
        >
          <ArrowUp className="size-3.5" />
        </button>
      </form>
      {usageText && (
        <p className="mt-2 text-center text-[10px] text-muted-foreground/50">
          {usageText}
        </p>
      )}
    </div>
  )
}
