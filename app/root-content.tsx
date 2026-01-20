"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider } from "@/components/ui/sidebar"
import { FloatingToggle } from "@/components/floating-toggle"
import { DrawerHost } from "@/components/drawers/drawer-host"
import { DebugSubscriptions } from "@/components/debug-subscriptions"
import { processCapturedImage } from "@/lib/report-pipeline"
import { useReportStore } from "@/store/report-store"
import { useUIStore } from "@/store/ui-store"
import { CapturePreviewPopupHost } from "@/components/capture-tool/capture-preview-popup-host"

export function RootContent({ children }: { children: React.ReactNode }) {
  const { startProcessing, stopProcessing, finishProcessing } = useUIStore()
  const addReport = useReportStore((s) => s.addReport)

  const handleGenerate = async (imageData: string) => {
    startProcessing()
    try {
      const report = await processCapturedImage(imageData) // returns ReportItem
      addReport(report)
      finishProcessing(report.id) // opens report drawer via UI store
    } finally {
      stopProcessing()
    }
  }


  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={true}>
        {children}

        <DebugSubscriptions />

        <FloatingToggle />

        <DrawerHost />

       {/* ✅ Global capture preview (not tied to sidebar visibility) */}
      {/* <CapturePreviewPopupHost onGenerate={handleGenerate} /> */}



      </SidebarProvider>
    </TooltipProvider>
  )
}
