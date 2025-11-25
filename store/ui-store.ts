import { create } from "zustand"

export type DrawerType =
  | "report"
  | "captures"
  | "favorites"
  | "archived"
  | "settings"
  | null

interface UIState {
  // Drawers
  activeDrawer: DrawerType
  openDrawer: (drawer: DrawerType) => void

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
  finishProcessing: () => void // <--- NEW
}

export const useUIStore = create<UIState>((set, get) => ({
  // ------------------------------------
  // DRAWERS
  // ------------------------------------
  activeDrawer: null,
  openDrawer: (drawer) => set({ activeDrawer: drawer }),

  // ------------------------------------
  // SIDEBAR
  // ------------------------------------
  sidebarOpen: false,
  toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  // ------------------------------------
  // CAPTURE FLOW
  // ------------------------------------
  isCapturing: false,
  startCapture: () => set({ isCapturing: true }),
  stopCapture: () => set({ isCapturing: false }),

  // ------------------------------------
  // PROCESSING FLOW
  // ------------------------------------
  isProcessing: false,
  startProcessing: () => set({ isProcessing: true }),

  stopProcessing: () => set({
    isProcessing: false
  }),

  finishProcessing: () => set({
    isProcessing: false,
    activeDrawer: "report",  // ✔ open only after full animation
  }),
}))
