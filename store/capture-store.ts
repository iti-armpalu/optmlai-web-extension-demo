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
    source: "area" | "upload" | "fullpage"
    metadata?: CaptureMetadata
}

interface CaptureStore {
    captures: CaptureItem[]
    activeCaptureId: string | null

    addCapture: (capture: Omit<CaptureItem, "id" | "name" | "createdAt">) => void
    removeCapture: (id: string) => void
    clearCaptures: () => void
    setActiveCapture: (id: string | null) => void
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

export const useCaptureStore = create<CaptureStore>()(
    persist(
        (set, get) => ({
            captures: [],
            activeCaptureId: null,

            addCapture: (captureData) => {
                const newCapture: CaptureItem = {
                    id: crypto.randomUUID(),
                    name: formatIsoName(),
                    createdAt: Date.now(),
                    ...captureData,
                }

                set({
                    captures: [...get().captures, newCapture],
                    activeCaptureId: newCapture.id,
                })
            },

            removeCapture: (id) => {
                set({
                    captures: get().captures.filter((c) => c.id !== id),
                })
            },

            clearCaptures: () => set({ captures: [] }),

            setActiveCapture: (id) => set({ activeCaptureId: id }),
        }),

        {
            name: "captures-store", // localStorage key
        }
    )
)
