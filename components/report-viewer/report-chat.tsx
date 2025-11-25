"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ReportChatProps {
  report: any // you can type later
}

export function ReportChat({ report }: ReportChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi! I’ve analyzed this report. Ask me anything about the content, design issues, insights, or recommendations.`,
    },
  ])

  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const streamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    streamRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const send = () => {
    if (!input.trim() || isStreaming) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    }

    setMessages((m) => [...m, userMessage])
    setInput("")
    mockStreamResponse(input.trim())
  }

  // --------------------------------------------------
  // ⭐ MOCK STREAMING RESPONSE (no backend)
  // --------------------------------------------------
  const mockStreamResponse = (prompt: string) => {
    setIsStreaming(true)

    // Simulate a smart AI answer based on report data
    const reply = generateMockAIResponse(prompt, report)

    const id = crypto.randomUUID()
    let current = ""

    // Add empty assistant message first
    setMessages((prev) => [...prev, { id, role: "assistant", content: "" }])

    let i = 0
    const interval = setInterval(() => {
      current += reply[i]
      i++

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, content: current } : msg
        )
      )

      if (i >= reply.length) {
        clearInterval(interval)
        setIsStreaming(false)
      }
    }, 20) // typing speed
  }

  return (
    <div className="flex flex-col h-full w-full bg-background">
        {/* Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold">Chat about your report</h2>
        <p className="text-xs text-muted-foreground">
          Screenshot analysis
        </p>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "w-fit max-w-[80%] rounded-lg px-3 py-2 text-sm",
              msg.role === "assistant"
                ? "bg-muted"
                : "bg-primary text-primary-foreground ml-auto"
            )}
          >
            {msg.content}
          </div>
        ))}

        <div ref={streamRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
        className="p-3 border-t flex gap-2"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the report…"
          className="flex-1"
        />
        <Button type="submit" disabled={!input || isStreaming}>
          Send
        </Button>
      </form>
    </div>
  )
}

// --------------------------------------------------
// ⭐ Mock “AI-like” response generator
// --------------------------------------------------
function generateMockAIResponse(prompt: string, report: any) {
  // You can improve this later!
  if (prompt.toLowerCase().includes("improve")) {
    return `Based on your report’s recommendations, I suggest increasing whitespace, strengthening contrast around the CTA, and simplifying secondary content. These changes align with best practices for ${report.purpose} content.`
  }

  if (prompt.toLowerCase().includes("why")) {
    return `Because the heatmap shows strong focus on the top-left, the design should push the CTA closer to the primary attention hotspot.`
  }

  return `Good question! According to the analysis, here are key insights: ${report.report.insights[0]}. Let me know if you want a deeper breakdown.`
}
