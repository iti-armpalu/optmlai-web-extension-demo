"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileCheck, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CaptureItem } from "@/store/capture-store"

interface CapturePreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  capture: CaptureItem
//   onGenerateReport: () => void
}

export function CapturePreviewDialog({ open, onOpenChange, capture }: CapturePreviewDialogProps) {
//   const handleGenerateReport = () => {
//     onGenerateReport()
//     onOpenChange(false)
//   }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b border-border">
          <DialogTitle className="text-xl">{capture.name}</DialogTitle>
          <DialogDescription>
            {/* Captured {formatFullTimestamp(capture.createdAt)} • {capture.type} */}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="rounded-lg border border-border overflow-hidden bg-muted">
            <img src={capture.image || "/placeholder.svg"} alt={capture.name} className="w-full h-auto" />
          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t border-border flex-row justify-between gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
          {/* <Button onClick={handleGenerateReport}>
            <FileCheck className="mr-2 h-4 w-4" />
            Generate Report
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function formatFullTimestamp(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}
