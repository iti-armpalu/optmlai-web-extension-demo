"use client"

import { useState, useCallback } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ChatHeader } from "./chat-header"
import { ChatMessages, type Message } from "./chat-messages"
import { PromptChips } from "./prompt-chips"
import { ChatInput } from "./chat-input"

const PRE_ANALYSIS_SUGGESTIONS = [
  "Review this creative",
  "Potential improvements",
  "First impressions",
]

const POST_ANALYSIS_SUGGESTIONS = [
  "Improve this creative",
  "Explain the scores",
  "What should I change first?",
  "Where will this perform best?",
]

const PRE_ANALYSIS_INTRO: Message = {
  id: "intro",
  role: "assistant",
  content:
    "I can already review your creative and answer general questions.\nConfirm details to unlock full performance analysis.",
}

const POST_ANALYSIS_INTRO: Message = {
  id: "intro",
  role: "assistant",
  content:
    "Your full analysis is ready.\nAsk about performance insights, weak points, or how to improve this creative.",
}

// Simulated assistant responses based on state
function getAssistantResponse(
  userMessage: string,
  analysisSetupConfirmed: boolean
): string {
  const lower = userMessage.toLowerCase()

  if (!analysisSetupConfirmed) {
    if (lower.includes("review") || lower.includes("creative")) {
      return "Looking at your creative, the composition has strong visual hierarchy. The primary subject is well-positioned and the color palette creates good contrast.\n\nFor deeper performance predictions and channel-specific insights, confirm your analysis details."
    }
    if (lower.includes("improvement") || lower.includes("improve")) {
      return "A few initial observations:\n\n- The text-to-image ratio could be more balanced\n- Consider increasing whitespace around the CTA\n- The headline font weight may need adjustment for mobile\n\nFull optimization insights unlock after analysis setup."
    }
    if (lower.includes("impression") || lower.includes("first")) {
      return "First impression: clean and professional. The visual weight draws attention to the right areas. The creative feels on-brand but could benefit from stronger contrast on the call-to-action.\n\nConfirm your details for complete analysis."
    }
    return "I can help with general creative review at this stage. Once you confirm your key elements, channel, and purpose, I'll have full performance analysis to work with."
  }

  if (lower.includes("score") || lower.includes("explain")) {
    return "Here's a breakdown of your scores:\n\n- Visual Impact: 78/100 — Strong composition but the contrast ratio could improve\n- Message Clarity: 85/100 — Clear headline hierarchy, good supporting copy\n- Brand Consistency: 91/100 — Color palette and typography align with guidelines\n- CTA Effectiveness: 62/100 — Needs more visual prominence and urgency"
  }
  if (lower.includes("change first") || lower.includes("priority")) {
    return "Priority changes based on your analysis:\n\n1. Strengthen the CTA — it's scoring lowest at 62. Increase button size by 15-20% and add contrasting color\n2. Improve visual contrast ratio from 3.2:1 to at least 4.5:1\n3. Reduce headline character count by ~20% for mobile readability"
  }
  if (lower.includes("perform best") || lower.includes("channel")) {
    return "Based on your creative analysis, this will likely perform best on:\n\n- Instagram Feed — composition aligns with high-performing feed formats\n- Facebook — message clarity score supports in-feed scanning behavior\n\nConsider adjustments for Stories format — the current aspect ratio and text placement would need rework."
  }
  if (lower.includes("improve") || lower.includes("better")) {
    return "Key improvements to boost overall performance:\n\n- Increase CTA button prominence — use a contrasting accent color and add micro-animation on hover\n- Tighten headline copy — aim for 6 words or fewer\n- Add social proof element near the CTA area\n- Test a darker background variant for higher contrast"
  }
  return "I can help you explore performance insights, identify weak points, suggest improvements, or analyze channel fit. What aspect would you like to dig into?"
}

interface ChatPanelProps {
  analysisSetupConfirmed: boolean
}

export function ChatPanel({ analysisSetupConfirmed }: ChatPanelProps) {
  const introMessage = analysisSetupConfirmed ? POST_ANALYSIS_INTRO : PRE_ANALYSIS_INTRO
  const suggestions = analysisSetupConfirmed
    ? POST_ANALYSIS_SUGGESTIONS
    : PRE_ANALYSIS_SUGGESTIONS
  const placeholder = analysisSetupConfirmed
    ? "Ask about performance, improvements, or strategy..."
    : "Ask about this creative..."

  const MESSAGE_LIMIT = 20

  const [messages, setMessages] = useState<Message[]>([introMessage])
  const [inputValue, setInputValue] = useState("")
  const [showChips, setShowChips] = useState(true)
  const [isTyping, setIsTyping] = useState(false)

  const userMessageCount = messages.filter((m) => m.role === "user").length
  const messagesRemaining = MESSAGE_LIMIT - userMessageCount
  const limitReached = messagesRemaining <= 0

  // Reset messages when analysis state changes
  const [prevanalysisSetupConfirmed, setPrevanalysisSetupConfirmed] = useState(analysisSetupConfirmed)
  if (prevanalysisSetupConfirmed !== analysisSetupConfirmed) {
    setPrevanalysisSetupConfirmed(analysisSetupConfirmed)
    setMessages([analysisSetupConfirmed ? POST_ANALYSIS_INTRO : PRE_ANALYSIS_INTRO])
    setShowChips(true)
    setInputValue("")
  }

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: text.trim(),
      }

      setMessages((prev) => [...prev, userMessage])
      setInputValue("")
      setShowChips(false)
      setIsTyping(true)

      // Simulate assistant thinking
      setTimeout(() => {
        const response = getAssistantResponse(text, analysisSetupConfirmed)
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response,
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      }, 800 + Math.random() * 600)
    },
    [analysisSetupConfirmed]
  )

  const handleChipSelect = useCallback(
    (prompt: string) => {
      sendMessage(prompt)
    },
    [sendMessage]
  )

  return (
    <aside
      className="flex h-full w-full flex-col border-l border-border bg-background"
      aria-label="Creative Assistant chat panel"
    >
      <ChatHeader analysisSetupConfirmed={analysisSetupConfirmed} />
      <Separator />

      <ScrollArea className="flex-1 overflow-hidden">
        <div>
          <ChatMessages messages={messages} />

          {isTyping && (
            <div className="flex items-center gap-1 px-5 pb-3">
              <span className="sr-only">Assistant is typing</span>
              <span className="size-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
              <span className="size-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
              <span className="size-1.5 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
            </div>
          )}

          <PromptChips
            suggestions={suggestions}
            onSelect={handleChipSelect}
            visible={showChips && messages.length <= 1}
          />
        </div>
      </ScrollArea>

      <Separator />
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={() => sendMessage(inputValue)}
        placeholder={placeholder}
        disabled={isTyping || limitReached}
        messagesRemaining={messagesRemaining}
        messageLimit={MESSAGE_LIMIT}
        limitReached={limitReached}
      />
    </aside>
  )
}
