import { create } from "zustand"

/**
 * UI Store = single source of truth for:
 * - which drawer(s) are open (including the one special stacked case)
 * - sidebar open/close
 * - capture + processing + preview UI flags
 */
export type DrawerState =
  | { type: "none" }
  | { type: "captures" }
  | { type: "allReports" }
  | { type: "report"; reportId: string }
  | { type: "allReports+report"; reportId: string }

export type DrawerOpen =
  | { type: "captures" }
  | { type: "allReports" }
  | { type: "report"; reportId: string } // single report (e.g. from Recent)

interface UIState {
  // Drawers
  drawer: DrawerState
  closeDrawer: () => void
  openDrawer: (next: DrawerOpen) => void
  openReportFromAllReports: (reportId: string) => void
  closeTopReportRevealAllReports: () => void

  // Sidebar
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void

  // Capture flow
  isCapturing: boolean
  startCapture: () => void
  stopCapture: () => void

  // Processing flow
  isProcessing: boolean
  startProcessing: () => void
  stopProcessing: () => void
  finishProcessing: (reportId: string) => void

  // Capture preview popup (global)
  isCapturePreviewOpen: boolean
  openCapturePreview: () => void
  closeCapturePreview: () => void

  /**
   * Optional legacy “event flag”.
   * Prefer opening drawers directly instead of one-shot booleans.
   * Keep for now if something still listens to it.
   */
  shouldStartReport: boolean
  requestReport: () => void
  clearReportRequest: () => void
}

export const useUIStore = create<UIState>((set, get) => ({
  /* ------------------------------------ */
  /* DRAWERS                              */
  /* ------------------------------------ */
  drawer: { type: "none" },

  closeDrawer: () => set({ drawer: { type: "none" } }),

  // Default behavior: single sheet at a time
  openDrawer: (next) => {
    if (next.type === "captures") {
      set({ drawer: { type: "captures" } })
      return
    }

    if (next.type === "allReports") {
      set({ drawer: { type: "allReports" } })
      return
    }

    set({ drawer: { type: "report", reportId: next.reportId } })
  },

  // Special stacked case: only All Reports can stay under a Report
  openReportFromAllReports: (reportId) => {
    const current = get().drawer
    if (current.type === "allReports" || current.type === "allReports+report") {
      set({ drawer: { type: "allReports+report", reportId } })
      return
    }

    // Fallback: if All Reports isn't open, just open report in single mode
    set({ drawer: { type: "report", reportId } })
  },

  // Close only the top report when stacked; otherwise close all drawers
  closeTopReportRevealAllReports: () => {
    const current = get().drawer
    if (current.type === "allReports+report") {
      set({ drawer: { type: "allReports" } })
      return
    }
    set({ drawer: { type: "none" } })
  },

  /* ------------------------------------ */
  /* SIDEBAR                              */
  /* ------------------------------------ */
  sidebarOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  /* ------------------------------------ */
  /* CAPTURE FLOW                         */
  /* ------------------------------------ */
  isCapturing: false,
  startCapture: () => set({ isCapturing: true }),
  stopCapture: () => set({ isCapturing: false }),

  /* ------------------------------------ */
  /* PROCESSING FLOW                      */
  /* ------------------------------------ */
  isProcessing: false,
  startProcessing: () => set({ isProcessing: true }),
  stopProcessing: () => set({ isProcessing: false }),

  // When processing completes, open the single report drawer for that reportId
  finishProcessing: (reportId) =>
    set({
      isProcessing: false,
      drawer: { type: "report", reportId },
    }),

  /* ------------------------------------ */
  /* CAPTURE PREVIEW POPUP                */
  /* ------------------------------------ */
  isCapturePreviewOpen: false,
  openCapturePreview: () => set({ isCapturePreviewOpen: true }),
  closeCapturePreview: () => set({ isCapturePreviewOpen: false }),

  /* ------------------------------------ */
  /* LEGACY EVENT FLAG (optional)         */
  /* ------------------------------------ */
  shouldStartReport: false,
  requestReport: () => set({ shouldStartReport: true }),
  clearReportRequest: () => set({ shouldStartReport: false }),
}))
