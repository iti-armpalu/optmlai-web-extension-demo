// single responsibility: data

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { DummyReport } from "@/lib/dummy-report-data"

export interface ReportItem {
  id: string
  title: string
  image: string
  createdAt: number
  report: DummyReport
}

interface ReportStore {
  reports: ReportItem[]
  addReport: (report: ReportItem) => void
  removeReport: (id: string) => void
  updateReport: (report: ReportItem) => void
  getReportById: (id: string) => ReportItem | undefined
}

export const useReportStore = create<ReportStore>()(
  persist(
    (set, get) => ({
      reports: [],

      addReport: (report) =>
        set({
          // de-dupe by id and keep newest first
          reports: [report, ...get().reports.filter((r) => r.id !== report.id)],
        }),

      removeReport: (id) =>
        set({
          reports: get().reports.filter((r) => r.id !== id),
        }),

      updateReport: (report) =>
        set({
          reports: get().reports.map((r) => (r.id === report.id ? report : r)),
        }),

      getReportById: (id) => get().reports.find((r) => r.id === id),
    }),
    { name: "reports-store" }
  )
)
