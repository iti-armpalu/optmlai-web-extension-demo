"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

import { ResizableSheet } from "../resizable-sheet"
import { StartNewCaptureCard } from "./start-new-capture-card"
import { ReportCard } from "./report-card"

import { useReportStore } from "@/store/report-store"
import { useUIStore } from "@/store/ui-store"

interface AllReportsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dimmed?: boolean
}

export function AllReportsDrawer({
  open,
  onOpenChange,
  dimmed = false,
}: AllReportsDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const reportsRaw = useReportStore((s) => s.reports)
  const openReportFromAllReports = useUIStore((s) => s.openReportFromAllReports)

  const filteredReports = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()

    const list = q
      ? reportsRaw.filter((r) => r.title.toLowerCase().includes(q))
      : reportsRaw.slice() // clone so sort doesn't mutate store data

    list.sort((a, b) => b.createdAt - a.createdAt) // newest first
    return list
  }, [reportsRaw, searchQuery])

  const handleOpenReport = (id: string) => {
    // Stacked behavior: keep All Reports open underneath, open Report on top
    openReportFromAllReports(id)
  }

  return (
    <ResizableSheet
      open={open}
      onOpenChange={onOpenChange}
      initialWidth={1000}
      minWidth={480}
      maxWidth="min(calc(100vw - 10px), 1600px)"
      className={dimmed ? "pointer-events-none" : "p-0"}
      zIndex={50}
    >
      <div className="h-full overflow-y-auto">
        {/* Header */}
        <SheetHeader className="border-b border-border p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <SheetTitle className="text-2xl">All Reports</SheetTitle>
              <SheetDescription className="text-base">
                Browse all generated reports
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        {/* Body */}
        <div className="p-8">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Grid */}
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
              <StartNewCaptureCard />

              {filteredReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onClick={() => handleOpenReport(report.id)}
                />
              ))}
            </div>

          {/* Optional empty state */}
          {filteredReports.length === 0 && (
            <div className="mt-8 text-sm text-muted-foreground">
              No reports found.
            </div>
          )}
        </div>
      </div>
    </ResizableSheet>
  )
}
