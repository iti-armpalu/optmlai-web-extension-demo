"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

type AOIRegion = { x: number; y: number; width: number; height: number }
type AOIRegions = Record<string, AOIRegion>

const DEFAULT_AOI_REGIONS: AOIRegions = {
    headline: { x: 30, y: 10, width: 40, height: 10 },
    hero: { x: 15, y: 40, width: 70, height: 35 },
    benefits: { x: 10, y: 60, width: 80, height: 25 },
    cta: { x: 35, y: 85, width: 30, height: 10 },
}

const DEFAULT_AOI_KEYS = Object.keys(DEFAULT_AOI_REGIONS) as Array<keyof typeof DEFAULT_AOI_REGIONS>

interface DetectedPreviewProps {
    imageUrl: string
    items: readonly string[]

    /** Optional override if you ever want different regions later */
    aoiRegions?: AOIRegions

    /** Optional: if true, clicking active item toggles off */
    allowToggleOff?: boolean
}

export function DetectedPreview({
    imageUrl,
    items,
    aoiRegions = DEFAULT_AOI_REGIONS,
    allowToggleOff = true,
}: DetectedPreviewProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const aoiKeys = useMemo(() => Object.keys(aoiRegions), [aoiRegions])
    const hasAOI = aoiKeys.length > 0

    const activeAOIKey = useMemo(() => {
        if (activeIndex === null) return null
        if (!hasAOI) return null
        return aoiKeys[activeIndex % aoiKeys.length] ?? null
    }, [activeIndex, aoiKeys, hasAOI])

    const handleClick = (index: number) => {
        if (!hasAOI) return
        setActiveIndex((prev) => {
            if (!allowToggleOff) return index
            return prev === index ? null : index
        })
    }

    return (
        <div className="grid grid-cols-2 gap-4 items-start">
            {/* List */}
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2.5">
                    Detected in creative
                </p>
                <p className="text-[11px] text-muted-foreground/50 mb-2">
                    Click to highlight in preview
                </p>

                <ul className="space-y-1.5">
                    {items.map((text, index) => {
                        const isActive = activeIndex === index

                        return (
                            <li key={`${index}-${text}`}>
                                <button
                                    type="button"
                                    onClick={() => handleClick(index)}
                                    disabled={!hasAOI}
                                    className={cn(
                                        "group w-full text-left text-xs flex items-center gap-3 pl-3 pr-3 py-2.5 rounded-lg transition-all duration-150 border",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                        isActive
                                            ? "bg-emerald-500/10 text-emerald-700 border-emerald-300 shadow-sm"
                                            : "text-muted-foreground border-border/60 hover:border-emerald-200 hover:bg-emerald-500/5 hover:text-foreground",
                                        !hasAOI && "opacity-60 cursor-not-allowed",
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-[10px] font-semibold transition-colors duration-150",
                                            isActive
                                                ? "bg-emerald-500 text-white"
                                                : "bg-muted text-muted-foreground group-hover:bg-emerald-100 group-hover:text-emerald-600",
                                        )}
                                    >
                                        {index + 1}
                                    </span>
                                    <span className="flex-1 leading-snug">{text}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* Preview */}
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2.5">
                    Preview
                </p>

                <div className="relative overflow-hidden border border-border/50 bg-muted/20">
                    <img src={imageUrl} alt="Creative being analyzed" className="w-full h-auto block" />

                    {Object.entries(aoiRegions).map(([key, region]) => {
                        const isHighlighted = activeAOIKey === key

                        return (
                            <div
                                key={key}
                                className={cn(
                                    "absolute border-2 rounded transition-all duration-300 pointer-events-none",
                                    isHighlighted
                                        ? "border-emerald-500 bg-emerald-500/20 opacity-100"
                                        : "border-transparent opacity-0",
                                )}
                                style={{
                                    left: `${region.x}%`,
                                    top: `${region.y}%`,
                                    width: `${region.width}%`,
                                    height: `${region.height}%`,
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
