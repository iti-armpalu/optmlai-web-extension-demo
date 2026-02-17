"use client"

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle2, Download, ExternalLink, Plus, Share2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

type ReportHeaderProps = {
  title: string
  reportDate: string
  reportTime: string

  tags: string[]
  newTag: string
  isAddingTag: boolean

  onNewTagChange: (value: string) => void
  onAddTagStart: () => void
  onAddTagConfirm: () => void
  onAddTagCancel: () => void
  onRemoveTag: (tag: string) => void
  onNewTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void

  analysisSetupConfirmed: boolean
  // channelPurposeConfirmed: boolean
  // onOpenElementsDialog: () => void
  // onOpenChannelPurposeDialog: () => void

  onOpenDialog: () => void
}

export function ReportHeader({
  title,
  reportDate,
  reportTime,
  tags,
  newTag,
  isAddingTag,
  onNewTagChange,
  onAddTagStart,
  onAddTagConfirm,
  onAddTagCancel,
  onRemoveTag,
  onNewTagKeyDown,
  analysisSetupConfirmed,
  onOpenDialog
}: ReportHeaderProps) {
  return (
    <div className="border-b border-border p-8">
      <SheetHeader className="p-0 space-y-2">

        {/* Row 1 — Title + actions cluster */}
        <div className="flex items-start justify-between gap-4">
          {/* LEFT — Identity */}
          <div className="min-w-0 flex-1 space-y-1.5">
            <SheetTitle className="text-balance">{title}</SheetTitle>
            <p className="text-sm text-muted-foreground">
              Analysis generated: {reportDate} at {reportTime}
            </p>
            {/* Tags inline under timestamp */}
            <div className="pt-1">

              <div className="flex items-start gap-2">
                <span className="text-sm text-muted-foreground">Tags:</span>

                <div className="flex items-center gap-1 flex-wrap">


                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="gap-1 pr-1">
                      {tag}
                      <button
                        onClick={() => onRemoveTag(tag)}
                        className="ml-1 hover:bg-muted rounded-full p-0.5 transition-colors"
                        aria-label={`Remove ${tag} tag`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}

                  {isAddingTag ? (
                    <div className="flex items-center gap-1">
                      <Input
                        type="text"
                        value={newTag}
                        onChange={(e) => onNewTagChange(e.target.value)}
                        onKeyDown={onNewTagKeyDown}
                        onBlur={() => {
                          if (!newTag.trim()) onAddTagCancel()
                        }}
                        placeholder="Enter tag name"
                        className="h-7 w-32 text-sm"
                        autoFocus
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={onAddTagConfirm}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-xs bg-transparent"
                      onClick={onAddTagStart}
                    >
                      <Plus className="h-3 w-3" />
                      Add Tag
                    </Button>
                  )}

                </div>
              </div>

            </div>
          </div>

          {/* RIGHT — Actions cluster */}
          <div className="flex items-center gap-2 flex-wrap lg:flex-shrink-0">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
            </Button>
          </div>

        </div>
        <Separator />

        {/* Row 2 — Setup / Status row */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
          <div className="flex items-center gap-3">

            <Badge
              variant="outline"
              className={cn(
                "gap-1 border-none px-3 py-1",
                analysisSetupConfirmed
                  ? "text-green-600 bg-green/500/10"
                  : "text-amber-600 bg-amber-500/10"
              )}
            >
              {analysisSetupConfirmed ? (
                <CheckCircle2 className="h-3 w-3 text-green-600" />
              ) : (
                <AlertCircle className="h-3 w-3" />
              )}
              {analysisSetupConfirmed ? "Analysis Complete" : "Analysis Pending"}
            </Badge>


            {!analysisSetupConfirmed && (
              <p className="text-xs text-muted-foreground">
                Verify detected elements and configure your analysis context to generate a complete optimization report.
              </p>
            )}
          </div>

          <div className="ml-auto">
            {analysisSetupConfirmed ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenDialog}
                className="text-muted-foreground"
              >
                View setup
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={onOpenDialog}
                className={cn(
                  "gap-2 transition-colors text-xs bg-transparent text-muted-forground")}
              >
                <AlertCircle className="h-4 w-4 text-amber-600" />
                Unlock analysis
              </Button>
            )}
          </div>
        </div>
      </SheetHeader>



    </div>
  )
}
