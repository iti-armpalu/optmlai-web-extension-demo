"use client"

import { FloatingToggle } from "@/components/floating-toggle"
import { ReportDrawer } from "@/components/report-viewer/report-drawer"
import { CapturesDrawer } from "@/components/captures/capture-drawer"
import { useUIStore } from "@/store/ui-store"

export function RootContent({ children }: { children: React.ReactNode }) {
  const { activeDrawer, openDrawer } = useUIStore()

  return (
    <>
      {children}

      {/* Global floating UI */}
      <FloatingToggle />

      {/* Global drawers */}
      <ReportDrawer />

      <CapturesDrawer
        open={activeDrawer === "captures"}
        onOpenChange={() => openDrawer(null)}
      />

      {/* Add future drawers here */}
    </>
  )
}
