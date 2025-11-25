"use client"

import { CirclePlus, FolderOpen, Monitor, ScanLine, Upload } from "lucide-react"
import { Button } from "../ui/button"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { useState } from "react"
import { useSidebarCollapsed } from "@/hooks/use-sidebar-collapsed"
import { useUIStore } from "@/store/ui-store"

export function NewCaptureButton() {
  const [isOpen, setIsOpen] = useState(false)
  const isCollapsed = useSidebarCollapsed()

  // Global UI actions
  const { startCapture, openDrawer } = useUIStore()

  const handleUpload = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const imageData = event.target?.result as string
          console.log("[v0] Image uploaded:", imageData)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleFromCaptures = () => {
    openDrawer("captures")
  }

  const handleFullPage = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("[v0] Capturing full page")
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="relative">
          {/* MAIN BUTTON */}
          <SidebarMenuButton
            onClick={startCapture}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground justify-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=offcanvas]:justify-center"
          >
            <CirclePlus className={`h-4 w-4 ${isOpen ? "rotate-45" : ""}`} />
            <span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">
              Start New Capture
            </span>
          </SidebarMenuButton>

          {/* EXPANDED MENU */}
          {!isCollapsed && (
            <div className="bg-popover text-popover-foreground rounded-lg border shadow-lg p-2 grid grid-cols-2 gap-2 animate-in fade-in-0 zoom-in-95">
              <Button
                variant="ghost"
                className="h-20 flex flex-col items-center justify-center gap-1.5 hover:bg-accent"
                onClick={startCapture}
              >
                <ScanLine className="h-5 w-5 text-primary" />
                <div className="text-center">
                  <div className="font-medium text-xs">Capture Area</div>
                  <div className="text-[10px] text-muted-foreground">Select region</div>
                </div>
              </Button>

              <Button
                variant="ghost"
                className="h-20 flex flex-col items-center justify-center gap-1.5 hover:bg-accent"
                onClick={handleUpload}
              >
                <Upload className="h-5 w-5 text-primary" />
                <div className="text-center">
                  <div className="font-medium text-xs">Upload Image</div>
                  <div className="text-[10px] text-muted-foreground">From computer</div>
                </div>
              </Button>

              <Button
                variant="ghost"
                className="h-20 flex flex-col items-center justify-center gap-1.5 hover:bg-accent"
                onClick={handleFromCaptures}
              >
                <FolderOpen className="h-5 w-5 text-primary" />
                <div className="text-center">
                  <div className="font-medium text-xs">From Captures</div>
                  <div className="text-[10px] text-muted-foreground">Use existing</div>
                </div>
              </Button>

              <Button
                variant="ghost"
                className="h-20 flex flex-col items-center justify-center gap-1.5 hover:bg-accent"
                onClick={handleFullPage}
              >
                <Monitor className="h-5 w-5 text-primary" />
                <div className="text-center">
                  <div className="font-medium text-xs">Full Page</div>
                  <div className="text-[10px] text-muted-foreground">Entire viewport</div>
                </div>
              </Button>
            </div>
          )}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
