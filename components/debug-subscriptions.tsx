// RootContent.tsx (or any always-mounted client component)
"use client"

import { useEffect } from "react"
import { useUIStore } from "@/store/ui-store"
import { useCaptureStore } from "@/store/capture-store"

export function DebugSubscriptions() {
    useEffect(() => {
        const unsubUI = useUIStore.subscribe((state, prevState) => {
            console.log("[UIStore]", {
                prev: {
                    isCapturePreviewOpen: prevState.isCapturePreviewOpen,
                    drawer: prevState.drawer,
                },
                next: {
                    isCapturePreviewOpen: state.isCapturePreviewOpen,
                    drawer: state.drawer,
                },
            })
        })

        return unsubUI
    }, [])


    useEffect(() => {
        const unsubCapture = useCaptureStore.subscribe((state, prev) => {
            console.log("[CaptureStore]", {
                prevDraft: !!prev.draftCapture,
                nextDraft: !!state.draftCapture,
                activeCaptureId: state.activeCaptureId,
                capturesLen: state.captures.length,
            })
        })

        return unsubCapture
    }, [])




    return null
}
