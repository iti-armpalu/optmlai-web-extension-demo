"use client"

import { useUIStore } from "@/store/ui-store"
import { CapturesDrawer } from "@/components/drawers/capture-drawer/capture-drawer"
import { AllReportsDrawer } from "@/components/drawers/all-reports-drawer/all-reports-drawer"
import { ReportDrawer } from "@/components/drawers/report-drawer/report-drawer"

export function DrawerHost() {
  const { drawer, closeDrawer, closeTopReportRevealAllReports } = useUIStore()

  const showAllReports = drawer.type === "allReports" || drawer.type === "allReports+report"
  const showReport = drawer.type === "report" || drawer.type === "allReports+report"
  const reportId =
    drawer.type === "report"
      ? drawer.reportId
      : drawer.type === "allReports+report"
        ? drawer.reportId
        : null

  return (
    <>
      <CapturesDrawer
        open={drawer.type === "captures"}
        onOpenChange={(open) => {
          if (!open) closeDrawer()
        }}
      />

      <AllReportsDrawer
        open={showAllReports}
        dimmed={drawer.type === "allReports+report"}
        onOpenChange={(open) => {
          if (!open) {
            if (drawer.type === "allReports+report") return // underlay shouldn't close stack
            closeDrawer()
          }
        }}
      />

      <ReportDrawer
        open={showReport}
        reportId={reportId}
        zIndex={drawer.type === "allReports+report" ? 60 : 50}
        onOpenChange={(open) => {
          if (!open) {
            if (drawer.type === "allReports+report") closeTopReportRevealAllReports()
            else closeDrawer()
          }
        }}
      />
    </>
  )
}
