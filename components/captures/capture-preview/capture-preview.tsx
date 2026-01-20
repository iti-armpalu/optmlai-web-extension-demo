"use client"

import Image from "next/image"
import { Button } from "../../ui/button"
import { Coins, ImageIcon, Sparkles, X } from "lucide-react"
import { useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface CapturePreviewProps {
  imageData: string
  onGenerateReport: () => void
  onClose: () => void
}

export function CapturePreview({
  imageData,
  onGenerateReport,
  onClose,
}: CapturePreviewProps) {

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    // <div className="relative w-80 bg-background border rounded-lg shadow-xl p-4">

    //   <button
    //     onClick={onClose}
    //     className="
    //       absolute top-2 right-2 
    //       p-1.5
    //       transition
    //     "
    //     aria-label="Close preview"
    //   >
    //     <X className="h-4 w-4 text-gray-600" />
    //   </button>

    //   <h3 className="text-sm font-semibold mb-3 pr-6">
    //     Image Preview /
    //     Ad Creative Preview
    //   </h3>


    //   <div className="relative w-full aspect-video  overflow-hidden border mb-4">
    //     <Image
    //       src={imageData}
    //       alt="Captured screenshot"
    //       fill
    //       className="object-contain"
    //     />
    //   </div>


    //   <Button
    //     className="
    //       w-full 
    //       bg-purple-600 
    //       hover:bg-purple-700 
    //       text-white
    //     "
    //     onClick={onGenerateReport}
    //   >
    //     Generate Report
    //   </Button>
    // </div>

    <Card className="relative w-80 gap-0 overflow-hidden animate-fade-in">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-purple-100">
            <ImageIcon className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-tight">
              Ad Creative Preview
            </h3>
            <p className="text-xs text-muted-foreground">
              Ready for optimization
            </p>
          </div>
        </div>
        <Button
          variant='ghost'
          size='icon'
          onClick={onClose}
          className='absolute top-2 right-2 rounded-full'
          aria-label="Close preview"
        >
          <X />
          <span className='sr-only'>Close</span>
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <Image
          src={imageData}
          alt="Captured ad creative"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </CardContent>

      <CardFooter className="flex-col gap-3 pt-4">
        <Button
          variant="default"
          size="lg"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          onClick={onGenerateReport}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Generate Test
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Coins className="h-3.5 w-3.5" />
          <span>1 test = 1 credit</span>
        </div>
      </CardFooter>
    </Card>
  )
}
