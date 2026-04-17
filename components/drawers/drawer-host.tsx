'use client'

import { useUIStore } from '@/store/ui-store'
import { AllReportsDrawer } from './all-reports/all-reports-drawer'
import { ReportDrawer } from './report/report-drawer'


export function DrawerHost() {
  const { drawer, closeDrawer, closeTopReportRevealAllReports } = useUIStore()

  const showAllReports =
    drawer.type === 'allReports' || drawer.type === 'allReports+report'
  const showReport =
    drawer.type === 'report' || drawer.type === 'allReports+report'
  const reportId =
    drawer.type === 'report'
      ? drawer.reportId
      : drawer.type === 'allReports+report'
        ? drawer.reportId
        : null

  return (
    <>
      <AllReportsDrawer
        open={showAllReports}
        dimmed={drawer.type === 'allReports+report'}
        onOpenChange={(open) => {
          if (!open && drawer.type !== 'allReports+report') closeDrawer()
        }}
      />
      <ReportDrawer
        open={showReport}
        reportId={reportId}
        zIndex={drawer.type === 'allReports+report' ? 60 : 50}
        onOpenChange={(open) => {
          if (!open) {
            if (drawer.type === 'allReports+report') closeTopReportRevealAllReports()
            else closeDrawer()
          }
        }}
      />
    </>
  )
}