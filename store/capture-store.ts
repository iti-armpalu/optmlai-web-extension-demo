import { create } from "zustand"
import { persist } from "zustand/middleware"

// TYPES
export interface CaptureMetadata {
    width: number
    height: number
    x?: number
    y?: number
}

export interface CaptureItem {
    id: string
    name: string           // ISO timestamp name
    image: string          // data URL
    createdAt: number
    source: "area" | "upload" | "capture"
    metadata?: CaptureMetadata
}

type NewCaptureData = Omit<CaptureItem, "id" | "name" | "createdAt">

interface CaptureStore {
    // confirmed/saved captures only
    captures: CaptureItem[]
    activeCaptureId: string | null

    // draft (ephemeral) capture for preview
    draftCapture: CaptureItem | null

    addCapture: (capture: NewCaptureData) => string
    removeCapture: (id: string) => void
    clearCaptures: () => void
    setActiveCapture: (id: string | null) => void

    updateCaptureName: (id: string, name: string) => void

    // draft methods
    setDraftCapture: (capture: NewCaptureData) => void
    clearDraftCapture: () => void
    commitDraftCapture: () => string | null
}

// HELPERS
const formatIsoName = () => {
    // from 2025-03-06T14:32:19.123Z
    // to   2025-03-06–14:32
    return new Date()
        .toISOString()
        .replace("T", "–")
        .slice(0, 16)
}

const makeCapture = (captureData: NewCaptureData): CaptureItem => ({
    id: crypto.randomUUID(),
    name: formatIsoName(),
    createdAt: Date.now(),
    ...captureData,
})

export const useCaptureStore = create<CaptureStore>()(
    persist(
        (set, get) => ({
            captures: [],
            activeCaptureId: null,

            draftCapture: null,

            addCapture: (captureData) => {
                const newCapture = makeCapture(captureData)
                set({
                    captures: [newCapture, ...get().captures],
                    activeCaptureId: newCapture.id,
                })
                return newCapture.id
            },

            removeCapture: (id) => {
                set({
                    captures: get().captures.filter((c) => c.id !== id),
                })
            },

            clearCaptures: () => set({ captures: [] }),

            setActiveCapture: (id) => set({ activeCaptureId: id }),

            updateCaptureName: (id, name) => {
                const trimmed = name.trim()
                if (!trimmed) return

                set((state) => {
                    const current = state.captures.find((c) => c.id === id)
                    if (!current || current.name === trimmed) return state

                    return {
                        captures: state.captures.map((c) =>
                            c.id === id ? { ...c, name: trimmed } : c
                        ),
                    }
                })
            },


            // ---- Draft flow ----
            setDraftCapture: (captureData) => {
                const draft = makeCapture(captureData)
                set({ draftCapture: draft })
            },

            clearDraftCapture: () => set({ draftCapture: null }),

            commitDraftCapture: () => {
                const draft = get().draftCapture
                if (!draft) return null

                set({
                    captures: [draft, ...get().captures],
                    activeCaptureId: draft.id,
                    draftCapture: null,
                })

                return draft.id
            },
        }),

        {
            name: "captures-store", // localStorage key
            // only persist confirmed captures + active id (draft should NOT persist)
            partialize: (state) => ({
                captures: state.captures,
                activeCaptureId: state.activeCaptureId,
            }),
        }
    )
)
