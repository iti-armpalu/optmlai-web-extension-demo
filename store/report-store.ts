import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ReportItem {
  id: string
  title: string
  image: string
  createdAt: number
}

interface ReportStore {
  reports: ReportItem[]
  addReport: (report: ReportItem) => void
  removeReport: (id: string) => void
  getReportById: (id: string) => ReportItem | undefined
}

export const useReportStore = create<ReportStore>()(
  persist(
    (set, get) => ({
      reports: [],

      addReport: (report) =>
        set({
          reports: [report, ...get().reports.filter((r) => r.id !== report.id)],
        }),

      removeReport: (id) =>
        set({ reports: get().reports.filter((r) => r.id !== id) }),

      getReportById: (id) => get().reports.find((r) => r.id === id),
    }),
    { name: 'reports-store' }
  )
)