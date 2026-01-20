"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useReportStore } from "@/store/report-store"
import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from "@/components/ui/resizable"
import { ReportChat } from "./report-chat"
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import { OverviewTab } from "./tabs/overview-tab"
import { HeatmapTab } from "./tabs/heatmap-tab"
import { ContextsTab } from "./tabs/contexts-tab"
import { ScoreDriversTab } from "./tabs/score-drivers-tab"
import { ResizableSheet } from "../resizable-sheet"
import { ReportSkeleton } from "./report-skeleton"
import { ReportHeader } from "./report-header"


type ReportDrawerProps = {
    open: boolean
    reportId: string | null
    onOpenChange: (open: boolean) => void

    /**
     * Optional: when opened on top of All Reports, set a higher z-index.
     */
    zIndex?: number
}


export function ReportDrawer({
    open,
    reportId,
    onOpenChange,
    zIndex = 60,
}: ReportDrawerProps) {
    const reports = useReportStore((s) => s.reports)

    const report = useMemo(() => {
        if (!reportId) return null
        return reports.find((r) => r.id === reportId) ?? null
    }, [reports, reportId])

    const [isGenerating, setIsGenerating] = useState(true);

    const [tags, setTags] = useState<string[]>(["Insurance", "Children's Coverage", "Life Insurance", "Q1 2025"])
    const [newTag, setNewTag] = useState("")
    const [isAddingTag, setIsAddingTag] = useState(false)

    const reportDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    const reportTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })

    useEffect(() => {
        if (!report) return;

        setIsGenerating(true);

        const t = setTimeout(() => {
            setIsGenerating(false);
        }, 8000); // 8s fake generation

        return () => clearTimeout(t);
    }, [report?.id]);


    // OUTER DRAWER WIDTH
    const [drawerWidth, setDrawerWidth] = useState(1200)
    const resizing = useRef(false)

    const beginResize = (e: React.MouseEvent) => {
        e.preventDefault()
        resizing.current = true
    }

    const resize = (e: MouseEvent) => {
        if (!resizing.current) return
        const newWidth = window.innerWidth - e.clientX
        const clamped = Math.min(Math.max(newWidth, 600), 1500)
        setDrawerWidth(clamped)
    }

    const stopResize = () => (resizing.current = false)

    useEffect(() => {
        window.addEventListener("mousemove", resize)
        window.addEventListener("mouseup", stopResize)
        return () => {
            window.removeEventListener("mousemove", resize)
            window.removeEventListener("mouseup", stopResize)
        }
    }, [])

    // ⛑ Prevent crash on first render
    if (!report || !report.report) {
        return null
    }

    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()])
            setNewTag("")
            setIsAddingTag(false)
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAddTag()
        } else if (e.key === "Escape") {
            setIsAddingTag(false)
            setNewTag("")
        }
    }

    return (
        <ResizableSheet
            open={open}
            onOpenChange={onOpenChange}
            initialWidth={1000}
            minWidth={700}
           maxWidth="min(calc(100vw - 10px), 1600px)"
            className="p-0"
            zIndex={zIndex}
        >

            <div className="h-full flex w-full">
     
                {report && (
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="h-full w-full"
                    >
                        {/* REPORT PANEL */}
                        <ResizablePanel defaultSize={70} minSize={40} className="min-w-0">
                            <div className="h-full overflow-y-auto">
                                {isGenerating ? (
                                    <ReportSkeleton />
                                ) : (
                                    // -----------------------------------------------
                                    // ACTUAL REPORT CONTENT (your original code)
                                    // -----------------------------------------------
                                    <>
                                        <ReportHeader
                                            title={report.title}
                                            reportDate={reportDate}
                                            reportTime={reportTime}
                                            tags={tags}
                                            newTag={newTag}
                                            isAddingTag={isAddingTag}
                                            onNewTagChange={setNewTag}
                                            onAddTagStart={() => setIsAddingTag(true)}
                                            onAddTagConfirm={handleAddTag}
                                            onAddTagCancel={() => {
                                                setIsAddingTag(false)
                                                setNewTag("")
                                            }}
                                            onRemoveTag={handleRemoveTag}
                                            onNewTagKeyDown={handleKeyPress}
                                        />

                                        <div className="container mx-auto p-8">

                                            <Tabs defaultValue="overview" className="w-full">
                                                <TabsList className="grid w-full grid-cols-4 mb-8">
                                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                                    <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                                                    <TabsTrigger value="contexts">Contexts</TabsTrigger>
                                                    <TabsTrigger value="score-drivers">Score Drivers</TabsTrigger>
                                                </TabsList>

                                                {/* ------------------------------------ */}
                                                {/* OVERVIEW TAB */}
                                                {/* ------------------------------------ */}
                                                <TabsContent value="overview" className="space-y-6">
                                                    <OverviewTab />
                                                </TabsContent>

                                                {/* ------------------------------------ */}
                                                {/* HEATMAP TAB */}
                                                {/* ------------------------------------ */}
                                                <TabsContent value="heatmap" className="space-y-6">
                                                    <HeatmapTab report={report} />
                                                </TabsContent>

                                                {/* ------------------------------------ */}
                                                {/* DESIGN RULES TAB */}
                                                {/* ------------------------------------ */}
                                                <TabsContent value="contexts" className="space-y-6">
                                                    <ContextsTab />
                                                </TabsContent>

                                                {/* ------------------------------------ */}
                                                {/* READABILITY TAB */}
                                                {/* ------------------------------------ */}
                                                <TabsContent value="readability" className="space-y-6">
                                                    <h2 className="text-lg font-semibold mb-4">Readability Analysis</h2>

                                                    <div className="space-y-3">
                                                        <p className="text-sm">
                                                            <span className="font-semibold">Estimated Grade Level: </span>
                                                            {report.report.readability.estimatedGrade}
                                                        </p>

                                                        <p className="text-sm">
                                                            <span className="font-semibold">Density Score: </span>
                                                            {(report.report.readability.densityScore * 100).toFixed(0)}%
                                                        </p>
                                                    </div>

                                                    <section>
                                                        <h3 className="text-sm font-semibold mb-2">Clarity Notes</h3>
                                                        <ul className="list-disc pl-4 space-y-1 text-sm">
                                                            {report.report.readability.clarityNotes.map((note, i) => (
                                                                <li key={i}>{note}</li>
                                                            ))}
                                                        </ul>
                                                    </section>
                                                </TabsContent>


                                                <TabsContent value="score-drivers">
                                                    <ScoreDriversTab />
                                                </TabsContent>
                                            </Tabs>
                                        </div>
                                    </>)}

                            </div>
                        </ResizablePanel>

                        <ResizableHandle withHandle />

                        {/* CHAT PANEL */}
                        <ResizablePanel defaultSize={30} minSize={25} className="min-w-0">
                            <ReportChat report={report} />
                        </ResizablePanel>
                    </ResizablePanelGroup>
                )}
            </div>
        </ResizableSheet>
    )
}
