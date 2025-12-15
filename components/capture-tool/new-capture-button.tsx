"use client"

import { CirclePlus, FolderOpen, Monitor, MousePointerClick, Plus, ScanLine, SquareDashedMousePointer, Upload } from "lucide-react"
import { Button } from "../ui/button"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { useState } from "react"
import { useSidebarCollapsed } from "@/hooks/use-sidebar-collapsed"
import { useUIStore } from "@/store/ui-store"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

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
          {/* <button
          onClick={startCapture}
          className="group flex flex-col items-center justify-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 p-3 transition-all hover:border-primary hover:bg-primary/10 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex size-7 items-center justify-center rounded-md bg-primary/15 text-primary transition-colors group-hover:bg-primary/25">
            <ScanLine className="size-4" />
          </div>
          <span className="text-xs font-medium leading-none">Capture Area</span>
        </button> */}

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



          {/* <button
          onClick={handleUpload}
          className="group flex flex-col items-center justify-center gap-1.5 rounded-md border bg-background p-3 transition-all hover:border-primary/40 hover:bg-accent hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
            <Upload className="size-4" />
          </div>
          <span className="text-xs font-medium leading-none">Upload Image</span>
        </button> */}

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

          {/* <button
          onClick={handleSelect}
          className="group flex flex-col items-center justify-center gap-1.5 rounded-md border bg-background p-3 transition-all hover:border-primary/40 hover:bg-accent hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
            <MousePointerClick className="size-4" />
          </div>
          <span className="text-xs font-medium leading-none">Select</span>
        </button> */}

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

          {/* <button
          onClick={handleFromCaptures}
          className="group flex flex-col items-center justify-center gap-1.5 rounded-md border bg-background p-3 transition-all hover:border-primary/40 hover:bg-accent hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
            <FolderOpen className="size-4" />
          </div>
          <span className="text-xs font-medium leading-none">From Captures</span>
        </button> */}


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
    // <SidebarMenu>
    //   <SidebarMenuItem>
    //     <div className="relative">
    //       {/* MAIN BUTTON */}
    //       <SidebarMenuButton
    //         onClick={startCapture}
    //         onMouseEnter={() => setIsOpen(true)}
    //         onMouseLeave={() => setIsOpen(false)}
    //         className="bg-primary hover:bg-primary/90 text-primary-foreground justify-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=offcanvas]:justify-center"
    //       >
    //         <CirclePlus className={`h-4 w-4 ${isOpen ? "rotate-45" : ""}`} />
    //         <span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">
    //           Start New Capture
    //         </span>
    //       </SidebarMenuButton>

    //       {/* EXPANDED MENU */}
    //       {!isCollapsed && (
    //         <div className="bg-popover text-popover-foreground rounded-lg border shadow-lg p-2 grid grid-cols-2 gap-2 animate-in fade-in-0 zoom-in-95">
    //           <Button
    //             variant="ghost"
    //             className="h-20 flex flex-col items-center justify-center gap-1.5 hover:bg-accent"
    //             onClick={startCapture}
    //           >
    //             <ScanLine className="h-5 w-5 text-primary" />
    //             <div className="text-center">
    //               <div className="font-medium text-xs">Capture Area</div>
    //               <div className="text-[10px] text-muted-foreground">Select region</div>
    //             </div>
    //           </Button>

    //           <Button
    //             variant="ghost"
    //             className="h-20 flex flex-col items-center justify-center gap-1.5 hover:bg-accent"
    //             onClick={handleUpload}
    //           >
    //             <Upload className="h-5 w-5 text-primary" />
    //             <div className="text-center">
    //               <div className="font-medium text-xs">Upload Image</div>
    //               <div className="text-[10px] text-muted-foreground">From computer</div>
    //             </div>
    //           </Button>

    //           <Button
    //             variant="ghost"
    //             className="h-20 flex flex-col items-center justify-center gap-1.5 hover:bg-accent"
    //             onClick={handleFromCaptures}
    //           >
    //             <FolderOpen className="h-5 w-5 text-primary" />
    //             <div className="text-center">
    //               <div className="font-medium text-xs">From Captures</div>
    //               <div className="text-[10px] text-muted-foreground">Use existing</div>
    //             </div>
    //           </Button>

    //           <Button
    //             variant="ghost"
    //             className="h-20 flex flex-col items-center justify-center gap-1.5 hover:bg-accent"
    //             onClick={handleFullPage}
    //           >
    //             <Monitor className="h-5 w-5 text-primary" />
    //             <div className="text-center">
    //               <div className="font-medium text-xs">Full Page</div>
    //               <div className="text-[10px] text-muted-foreground">Entire viewport</div>
    //             </div>
    //           </Button>

    //         </div>
    //       )}
    //     </div>
    //   </SidebarMenuItem>
    // </SidebarMenu>
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
