"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

export interface Message {
  id: string
  role: "assistant" | "user"
  content: string
}

interface ChatMessagesProps {
  messages: Message[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const scrollParent = container.closest("[data-radix-scroll-area-viewport]")
    if (scrollParent) {
      requestAnimationFrame(() => {
        scrollParent.scrollTop = scrollParent.scrollHeight
      })
    }
  }, [messages])

  return (
    <div ref={containerRef} className="flex flex-col gap-4 px-5 py-3">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "text-[13px] leading-relaxed max-w-[85%]",
              message.role === "assistant"
                ? "text-foreground"
                : "text-foreground bg-muted rounded-2xl px-3.5 py-2.5"
            )}
          >
            {message.content.split("\n").map((line, i) => (
              <span key={i} className={cn("block mb-1.5 last:mb-0", !line && "h-2")}>
                {line}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
