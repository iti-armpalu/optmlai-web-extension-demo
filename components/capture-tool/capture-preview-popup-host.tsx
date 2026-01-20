// components/capture-tool/capture-preview-popup-host.tsx
"use client"

import { CapturePreview } from "@/components/captures/capture-preview/capture-preview"
import { useCaptureStore } from "@/store/capture-store"
import { useUIStore } from "@/store/ui-store"

type Props = {
  onGenerate: (imageData: string) => void | Promise<void>
}

export function CapturePreviewPopupHost({ onGenerate }: Props) {
  const isOpen = useUIStore((s) => s.isCapturePreviewOpen)
  const close = useUIStore((s) => s.closeCapturePreview)

  const draft = useCaptureStore((s) => s.draftCapture)
  const clearDraft = useCaptureStore((s) => s.clearDraftCapture)
  const commitDraft = useCaptureStore((s) => s.commitDraftCapture)

  const activeCaptureId = useCaptureStore((s) => s.activeCaptureId)
  const activeCapture = useCaptureStore((s) =>
    s.captures.find((c) => c.id === activeCaptureId) ?? null
  )

  // Prefer draft if it exists; otherwise fall back to active saved capture
  const capture = draft ?? activeCapture

  // 🔎 Debug
  console.log("[CapturePreviewHost render]", {
    isOpen,
    hasDraft: !!draft,
    activeCaptureId,
    hasActive: !!activeCapture,
    willRender: !!(isOpen && capture),
  })


  if (!isOpen || !capture) return null

  console.log("[CapturePreviewHost] RENDERING PREVIEW")


  return (

      <CapturePreview
        imageData={capture.image}
        onClose={() => {
          // If we were previewing a draft, cancel should discard it
          if (draft) clearDraft()
          close()
        }}
        onGenerateReport={() => {
          close()

          // If draft exists, user confirmed it: save it now
          if (draft) commitDraft()

          // Run report generation on whatever is being previewed
          onGenerate(capture.image)
        }}
      />
  )
}
