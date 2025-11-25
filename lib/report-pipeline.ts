import { useReportStore } from "@/store/report-store"
import { generateDummyReport } from "@/lib/generate-dummy-report"
import type { ReportItem } from "@/store/report-store"

/**
 * Core pipeline that turns a captured screenshot into a full report.
 * In the real extension, this file will call:
 *  - heatmap API
 *  - design rules API
 *  - readability API
 *  - backend storage
 */
export async function processCapturedImage(imageData: string): Promise<ReportItem> {
  const createdAt = Date.now()
  const id = crypto.randomUUID()

  // TODO: Replace with actual AI analysis 
  const analysis = generateDummyReport()

  const report: ReportItem = {
    id,
    title: `Report – ${new Date(createdAt).toISOString().slice(0, 10)}`,
    image: imageData,
    createdAt,
    report: analysis,
  }

  // Write into Zustand store and auto-activate
  useReportStore.getState().addReport(report)

  return report
}
