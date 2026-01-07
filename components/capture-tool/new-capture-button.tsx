"use client"

import { CirclePlus, FolderOpen, Monitor, MousePointerClick, Plus, ScanLine, SquareDashedMousePointer, Upload } from "lucide-react"
import { Button } from "../ui/button"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { useState } from "react"
import { useSidebarCollapsed } from "@/hooks/use-sidebar-collapsed"
import { useUIStore } from "@/store/ui-store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useCaptureStore } from "@/store/capture-store"

export function NewCaptureButton() {
  const [isOpen, setIsOpen] = useState(false)
  const isCollapsed = useSidebarCollapsed()

  // Global UI actions
  const { startCapture, openDrawer } = useUIStore()

  const handleUpload = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      const imageData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
      })

      const { width, height } = await new Promise<{ width: number; height: number }>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
        img.onerror = () => reject(new Error("Failed to load uploaded image"))
        img.src = imageData
      })

      // ✅ DRAFT (not saved yet)
      useCaptureStore.getState().setDraftCapture({
        image: imageData,
        source: "upload",
        metadata: { width, height },
      })

      // ✅ show preview popup
      useUIStore.getState().openCapturePreview()
    }

    input.click()
  }



  const handleSelect = () => {
    console.log("Opening select")
  }

  const handleFromCaptures = () => {
    openDrawer("captures")
  }

  if (!isCollapsed) {
    return (

      <div className="py-1.5">
        <div className="mb-2 px-2 text-xs font-medium text-sidebar-foreground/70">Start New Capture</div>
        <div className="bg-popover text-popover-foreground rounded-lg border shadow-lg p-2 grid grid-cols-2 gap-2 animate-in fade-in-0 zoom-in-95">

          <Button
            variant="ghost"
            className="h-20 flex flex-col items-center justify-center gap-1.5 hover:bg-accent"
            onClick={startCapture}
          >
            <SquareDashedMousePointer className="h-5 w-5 text-primary" />
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
            onClick={handleSelect}
          >
            <MousePointerClick className="h-5 w-5 text-primary" />
            <div className="text-center">
              <div className="font-medium text-xs">Select</div>
              <div className="text-[10px] text-muted-foreground">Choose element</div>
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



        </div>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full justify-center px-2" size="icon">
          <Plus className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48 rounded-lg" side="left" align="start" sideOffset={4}>
        <DropdownMenuItem onClick={startCapture} className="cursor-pointer py-2.5">
          <ScanLine className="mr-2 size-4" />
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-sm">Capture Area</span>
            <span className="text-xs text-muted-foreground">Select region</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleUpload} className="cursor-pointer py-2.5">
          <Upload className="mr-2 size-4" />
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-sm">Upload Image</span>
            <span className="text-xs text-muted-foreground">From computer</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleSelect} className="cursor-pointer py-2.5">
          <MousePointerClick className="mr-2 size-4" />
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-sm">Select</span>
            <span className="text-xs text-muted-foreground">Choose element</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleFromCaptures} className="cursor-pointer py-2.5">
          <FolderOpen className="mr-2 size-4" />
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-sm">From Captures</span>
            <span className="text-xs text-muted-foreground">Use existing</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
