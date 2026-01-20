"use client"

import {
  FolderOpen,
  MousePointerClick,
  SquareDashedMousePointer,
  Upload,
} from "lucide-react"
import { Button } from "../ui/button"
import { useUIStore } from "@/store/ui-store"
import { useCaptureStore } from "@/store/capture-store"
import { useAuth } from "@/contexts/auth-context"
import { Card } from "../ui/card"

export function NewCaptureButton() {

  const actions = [
    {
        icon: SquareDashedMousePointer,
        title: "Capture Area",
        description: "Select region",
    },
    {
        icon: Upload,
        title: "Upload Image",
        description: "From computer",
    },
    {
        icon: MousePointerClick,
        title: "Select",
        description: "Choose element",
    },
    {
        icon: FolderOpen,
        title: "From Captures",
        description: "Use existing",
    },
];



  const { requireAuth } = useAuth()

  // Global UI actions
  const { startCapture, openDrawer } = useUIStore()

  const handleUpload = () => {
    console.log("[Upload] clicked")
  
    if (!requireAuth()) {
      console.log("[Upload] blocked by requireAuth")
      return
    }
  
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
  
    input.onchange = async (e) => {
      console.log("[Upload] onchange fired")
  
      const file = (e.target as HTMLInputElement).files?.[0]
      console.log("[Upload] file", file)
      if (!file) return
  
      const imageData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
      })
  
      console.log("[Upload] imageData length", imageData.length)
  
      const { width, height } = await new Promise<{ width: number; height: number }>((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
        img.onerror = () => reject(new Error("Failed to load uploaded image"))
        img.src = imageData
      })
  
      console.log("[Upload] dimensions", { width, height })
  
      useCaptureStore.getState().setDraftCapture({
        image: imageData,
        source: "upload",
        metadata: { width, height },
      })
  
      console.log("[Upload] draft set", useCaptureStore.getState().draftCapture)
  
      useUIStore.getState().openCapturePreview()
  
      console.log("[Upload] openCapturePreview called", useUIStore.getState().isCapturePreviewOpen)
    }
  
    input.click()
  }
  

  const handleSelect = () => {
    if (!requireAuth()) return // ✅ gate
    console.log("Opening select")
  }

  const handleFromCaptures = () => {
    if (!requireAuth()) return // ✅ gate
    // openDrawer("captures")
  }

  const handleStartCapture = () => {
    if (!requireAuth()) return // ✅ gate
    startCapture()
  }


  return (
    <div className="py-1.5">
      <div className="mb-2 px-2 text-xs font-medium text-sidebar-foreground/70">
        Start New Capture
      </div>

      <Card
        className="cursor-pointer group relative min-h-[200px] sm:h-auto overflow-hidden py-0 border-1 border-dashed border-sidebar-border border-purple-200 bg-gradient-to-br from-purple-50 via-purple-50/50 to-background"

      >
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-50 via-purple-50/95 to-purple-100/90 backdrop-blur-sm transition-all duration-300 }`}
        >
          <div className="grid h-full w-full grid-cols-4 gap-2 p-3 sm:grid-cols-2">
              <Button
                variant="ghost"
                className="group/btn relative h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-transparent bg-gradient-to-br from-purple-50/80 to-purple-100/30 transition-all duration-200 hover:border-purple-200 hover:from-purple-100 hover:to-purple-50 hover:shadow-lg hover:shadow-purple-200/50"
                onClick={handleStartCapture}
              >
                <SquareDashedMousePointer className="h-5 w-5 text-purple-600" />
                <div className="text-center">
                  <div className="font-medium text-xs">Capture Area</div>
                  <div className="text-[10px] text-muted-foreground">Select region</div>
                </div>
              </Button>

            <Button
              variant="ghost"
              className="group/btn relative h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-transparent bg-gradient-to-br from-purple-50/80 to-purple-100/30 transition-all duration-200 hover:border-purple-200 hover:from-purple-100 hover:to-purple-50 hover:shadow-lg hover:shadow-purple-200/50"
              onClick={handleUpload}
            >

              <Upload className="h-5 w-5 text-purple-600" />
              <div className="text-center">
                <div className="font-medium text-xs">Upload Image</div>
                <div className="text-[10px] text-muted-foreground">From computer</div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="group/btn relative h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-transparent bg-gradient-to-br from-purple-50/80 to-purple-100/30 transition-all duration-200 hover:border-purple-200 hover:from-purple-100 hover:to-purple-50 hover:shadow-lg hover:shadow-purple-200/50"
              onClick={handleSelect}
            >
              <MousePointerClick className="h-5 w-5 text-purple-600" />
              <div className="text-center">
                <div className="font-medium text-xs">Select</div>
                <div className="text-[10px] text-muted-foreground">Choose element</div>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="group/btn relative h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-transparent bg-gradient-to-br from-purple-50/80 to-purple-100/30 transition-all duration-200 hover:border-purple-200 hover:from-purple-100 hover:to-purple-50 hover:shadow-lg hover:shadow-purple-200/50"
              onClick={handleFromCaptures}
            >
              <FolderOpen className="h-5 w-5 text-purple-600" />
              <div className="text-center">
                <div className="font-medium text-xs">From Captures</div>
                <div className="text-[10px] text-muted-foreground">Use existing</div>
              </div>
            </Button>
          </div>
        </div>
      </Card >
    </div >
  )
}
