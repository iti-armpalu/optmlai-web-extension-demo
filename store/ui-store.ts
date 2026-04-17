import { create } from 'zustand'

export type DrawerState =
  | { type: 'none' }
  | { type: 'allReports' }
  | { type: 'report'; reportId: string }
  | { type: 'allReports+report'; reportId: string }

type DrawerOpen =
  | { type: 'allReports' }
  | { type: 'report'; reportId: string }

interface UIState {
  drawer: DrawerState
  openDrawer: (next: DrawerOpen) => void
  closeDrawer: () => void
  openReportFromAllReports: (reportId: string) => void
  closeTopReportRevealAllReports: () => void

  isCapturing: boolean
  startCapture: () => void
  stopCapture: () => void

  isProcessing: boolean
  startProcessing: () => void
  stopProcessing: () => void
  finishProcessing: (reportId: string) => void

  isCapturePreviewOpen: boolean
  openCapturePreview: () => void
  closeCapturePreview: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  drawer: { type: 'none' },

  openDrawer: (next) => {
    if (next.type === 'allReports') {
      set({ drawer: { type: 'allReports' } })
      return
    }
    set({ drawer: { type: 'report', reportId: next.reportId } })
  },

  closeDrawer: () => set({ drawer: { type: 'none' } }),

  openReportFromAllReports: (reportId) => {
    const current = get().drawer
    if (current.type === 'allReports' || current.type === 'allReports+report') {
      set({ drawer: { type: 'allReports+report', reportId } })
      return
    }
    set({ drawer: { type: 'report', reportId } })
  },

  closeTopReportRevealAllReports: () => {
    const current = get().drawer
    if (current.type === 'allReports+report') {
      set({ drawer: { type: 'allReports' } })
      return
    }
    set({ drawer: { type: 'none' } })
  },

  isCapturing: false,
  startCapture: () => set({ isCapturing: true }),
  stopCapture: () => set({ isCapturing: false }),

  isProcessing: false,
  startProcessing: () => set({ isProcessing: true }),
  stopProcessing: () => set({ isProcessing: false }),
  finishProcessing: (reportId) =>
    set({ isProcessing: false, drawer: { type: 'report', reportId } }),

  isCapturePreviewOpen: false,
  openCapturePreview: () => set({ isCapturePreviewOpen: true }),
  closeCapturePreview: () => set({ isCapturePreviewOpen: false }),
}))