import { useReportStore } from '@/store/report-store'
import type { ReportItem } from '@/store/report-store'

export async function processCapturedImage(imageData: string): Promise<ReportItem> {
  const id = crypto.randomUUID()
  const createdAt = Date.now()

  const report: ReportItem = {
    id,
    title: `Report – ${new Date(createdAt).toISOString().slice(0, 10)}`,
    image: imageData,
    createdAt,
  }

  useReportStore.getState().addReport(report)
  return report
}