"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Lock } from "lucide-react"

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
  onOpenChange: (open: boolean) => void
  onConfirm: () => void;
  onBack: () => void;
  readOnly?: boolean
}

function OptionCardButton(props: {
  selected: boolean
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  const { selected, disabled, onClick, children } = props

  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "h-auto w-full justify-start rounded-lg p-4 text-left transition-colors",
        "hover:bg-emerald-50/50",
        selected && "border-emerald-600 bg-emerald-50",
        !selected && "border-border",
        disabled && "disabled:opacity-75"
      )}
    >
      {children}
    </Button>
  )
}

export function ChannelPurposeTab({ onOpenChange, onConfirm, onBack, readOnly = false }: ChannelPurposeTabProps) {


  // User selections (always a valid option id)
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null)

  const canRun = selectedChannel && selectedPurpose;

  return (
    <>
      <div className="flex flex-col gap-8 p-6 flex-1 overflow-hidden">
        {/* Channel grid (show all + one selected) */}
        <div className="flex flex-col gap-3">
          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Channel</Label>
          <p className="text-xs text-muted-foreground">Select the primary channel where this creative will run.</p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {channelOptions.map((channel) => {
              const isSelected = selectedChannel === channel.id

              return (
                <OptionCardButton
                  key={channel.id}
                  selected={isSelected}
                  disabled={readOnly}
                  onClick={() => setSelectedChannel(channel.id)}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">{channel.label}</span>
                    <span className="text-xs text-muted-foreground">{channel.description}</span>
                  </div>
                </OptionCardButton>
              )
            })}
          </div>
        </div>

        {/* Purpose Selection */}
        <div className="flex flex-col gap-3">
          <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Purpose</Label>
          <p className="text-xs text-muted-foreground">Select the primary objective this creative is designed to achieve.</p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {purposeOptions.map((purpose) => {
              const isSelected = selectedPurpose === purpose.id

              return (
                <OptionCardButton
                  key={purpose.id}
                  selected={isSelected}
                  disabled={readOnly}
                  onClick={() => setSelectedPurpose(purpose.id)}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">{purpose.label}</span>
                    <span className="text-xs text-muted-foreground">{purpose.description}</span>
                  </div>
                </OptionCardButton>
              )
            })}
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="shrink-0 border-t border-border bg-muted/40 p-6">
        {readOnly ? (
          <div className="flex items-center justify-start">
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="h-9 gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              View confirmed elements
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="button" variant="secondary" onClick={onBack} className="h-9 gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Button>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/30 px-4 py-2">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Analysis is generated using confirmed key elements and confirmed channel and purpose. You can still adjust
                  them until you generate the full analysis.
                </p>
              </div>

              <Button
                type="button"
                className="h-9 gap-2 px-5"
                onClick={() => {
                  onConfirm()
                  // onOpenChange(false)
                }}
                disabled={!canRun}
              >
                Run full analysis
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

    </>
  )
}
