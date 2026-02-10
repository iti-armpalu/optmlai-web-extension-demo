"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

interface ChannelOption {
  id: string
  label: string
  description: string
}

interface PurposeOption {
  id: string
  label: string
  description: string
}

const channelOptions: ChannelOption[] = [
  { id: "social-media", label: "Social Media", description: "Facebook, Instagram, TikTok, LinkedIn" },
  { id: "display-ads", label: "Display Advertising", description: "Banner ads, programmatic display" },
  { id: "tv-video", label: "TV / Video", description: "CTV, OTT, YouTube, streaming" },
  { id: "retail-media", label: "Retail Media", description: "Amazon, Walmart, in-store displays" },
  { id: "email", label: "Email Marketing", description: "Newsletters, promotional emails" },
  { id: "ooh", label: "Out of Home", description: "Billboards, transit, DOOH" },
]

const purposeOptions: PurposeOption[] = [
  { id: "brand-awareness", label: "Brand Awareness", description: "Increase brand recognition and recall" },
  { id: "lead-generation", label: "Lead Generation", description: "Capture contact information and qualified leads" },
  { id: "direct-response", label: "Direct Response", description: "Drive immediate action or purchase" },
  { id: "consideration", label: "Consideration", description: "Move prospects further down the funnel" },
  { id: "retention", label: "Retention / Loyalty", description: "Engage existing customers" },
  { id: "product-launch", label: "Product Launch", description: "Introduce new product or service" },
]

interface ChannelPurposeTabProps {
  onConfirm: () => void
  isLocked?: boolean
}

export function ChannelPurposeTab({ onConfirm, isLocked = false }: ChannelPurposeTabProps) {
  // “System detected” defaults (could come from props later)
  const detectedChannel = "social-media"
  const detectedPurpose = "lead-generation"

  // User selections (always a valid option id)
  const [selectedChannel, setSelectedChannel] = useState<string>(detectedChannel)
  const [selectedPurpose, setSelectedPurpose] = useState<string>(detectedPurpose)


  return (
    <>
      <div className="flex flex-col gap-8">
        {/* Channel grid (show all + one selected) */}
        <div className="flex flex-col gap-3">
          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Channel</Label>
          <p className="text-xs text-muted-foreground">Select the primary channel where this creative will run.</p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {channelOptions.map((channel) => {
              const isSelected = selectedChannel === channel.id

              return (
                <button
                  key={channel.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedChannel(channel.id)}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-4 text-left transition-colors",
                    isSelected ? "border-foreground bg-accent" : "border-border bg-background hover:bg-accent/50"
                  )}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">{channel.label}</span>
                    <span className="text-xs text-muted-foreground">{channel.description}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <Separator />

        {/* Purpose Selection */}
        <div className="flex flex-col gap-3">
          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Purpose</Label>
          <p className="text-xs text-muted-foreground">Select the primary objective this creative is designed to achieve.</p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {purposeOptions.map((purpose) => {
              const isSelected = selectedPurpose === purpose.id

              return (
                <button
                  key={purpose.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedPurpose(purpose.id)}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-4 text-left transition-colors",
                    isSelected ? "border-foreground bg-accent" : "border-border bg-background hover:bg-accent/50"
                  )}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">{purpose.label}</span>
                    <span className="text-xs text-muted-foreground">{purpose.description}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
