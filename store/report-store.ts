import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { DummyReport } from "@/lib/generate-dummy-report"


// TYPE
export interface ReportItem {
  id: string
  title: string
  image: string
  createdAt: number
  report: DummyReport
}

interface ReportStore {
  reports: ReportItem[]
  activeReportId: string | null

  addReport: (report: ReportItem) => void
  setActiveReport: (id: string | null) => void
}

export const useReportStore = create<ReportStore>()(
  persist(
    (set, get) => ({
      reports: [],
      activeReportId: null,

      addReport: (report) =>
        set({
          reports: [report, ...get().reports],
          activeReportId: report.id,
        }),

      setActiveReport: (id) => set({ activeReportId: id }),
    }),

    {
      name: "reports-store", // localStorage key
    }
  )
)
