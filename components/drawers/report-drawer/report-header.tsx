"use client"

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Download, ExternalLink, Plus, Share2, X } from "lucide-react"

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
}: ReportHeaderProps) {
  return (
    <div className="border-b border-border p-8">
      <SheetHeader className="px-0 pt-0">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <SheetTitle className="text-balance">{title}</SheetTitle>

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

        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="gap-1.5 py-1 px-2.5 text-xs font-normal border-green-600/10 bg-green-50/50 text-green-600 dark:bg-green-950/30 dark:text-green-500"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Analysis complete
            </Badge>
          </div>

          <SheetDescription>
            Report generated: {reportDate} at {reportTime}
          </SheetDescription>
        </div>
      </SheetHeader>

      <div className="flex items-center gap-2 flex-wrap mt-6">
        <span className="text-sm font-medium text-muted-foreground">Report Tags:</span>

        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1 pr-1">
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
  )
}
