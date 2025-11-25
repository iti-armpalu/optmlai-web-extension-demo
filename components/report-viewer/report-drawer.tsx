"use client"

import { useEffect, useRef, useState } from "react"
import { useReportStore } from "@/store/report-store"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"

import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from "@/components/ui/resizable"

import { ReportChat } from "./report-chat"
// import Image from "next/image"
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import { FullPageButton } from "./full-page-button"
import HeatmapSlider from "./heatmap-slider"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { Info } from "lucide-react"
import { Skeleton } from "../ui/skeleton"


export function ReportDrawer() {
    const { activeReportId, setActiveReport, reports } = useReportStore()
    const report = reports.find((r) => r.id === activeReportId)

    const [isGenerating, setIsGenerating] = useState(true);

    useEffect(() => {
        if (!report) return;

        setIsGenerating(true);

        const t = setTimeout(() => {
            setIsGenerating(false);
        }, 8000); // 3s fake generation

        return () => clearTimeout(t);
    }, [report?.id]);


    // OUTER DRAWER WIDTH
    const [drawerWidth, setDrawerWidth] = useState(1000)
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



    return (
        <Sheet open={!!activeReportId} onOpenChange={() => setActiveReport(null)}>
            <SheetContent
                side="right"
                className="p-0 bg-background border-l overflow-hidden"
                style={{
                    width: drawerWidth,
                    maxWidth: "100vw",
                }}
            >


                {/* LEFT EDGE DRAG HANDLE (VISIBLE) */}
                <div
                    onMouseDown={beginResize}
                    className="absolute left-0 top-0 h-full w-[12px] flex items-center justify-center cursor-col-resize z-50 group">
                    <div
                        className="h-14 w-[3px] rounded-full bg-muted-foreground/40 group-hover:bg-muted-foreground/70 transition" />
                </div>

                <FullPageButton />

                {/* MAIN AREA — MUST FILL HEIGHT */}
                <div className="h-full flex w-full">
                    {/* INTERNAL RESIZE AREA */}
                    {report && (
                        <ResizablePanelGroup
                            direction="horizontal"
                            className="h-full w-full"
                        >
                            {/* REPORT PANEL */}
                            <ResizablePanel defaultSize={70} minSize={40} className="min-w-0">
                                <div className="h-full overflow-y-auto p-8">
                                    {isGenerating ? (
                                        <div className="space-y-10">

                                            {/* -------------------------------- */}
                                            {/* TOP MESSAGE ABOVE SKELETON      */}
                                            {/* -------------------------------- */}
                                            <div className="rounded-md border bg-muted/40 p-4 text-sm">
                                                <p className="font-medium">Generating full report…</p>
                                                <p className="text-muted-foreground text-xs mt-1">
                                                    You can start chatting while the analysis loads.
                                                </p>
                                            </div>
                                            {/* -------------------------------- */}
                                            {/* ANIMATED SKELETON LOADER         */}
                                            {/* -------------------------------- */}
                                            <div className="space-y-10 animate-pulse">

                                                {/* Title */}
                                                <Skeleton className="h-7 w-64 skeleton-shimmer" />
                                                <Skeleton className="h-4 w-40 skeleton-shimmer" />

                                                {/* Heatmap Section */}
                                                <div className="space-y-4">
                                                    <Skeleton className="h-5 w-24 skeleton-shimmer" />
                                                    <Skeleton className="h-[300px] w-full rounded-lg skeleton-shimmer" />
                                                </div>

                                                {/* Tabs header */}
                                                <Skeleton className="h-10 w-full rounded-md skeleton-shimmer" />

                                                {/* Content blocks */}
                                                <div className="space-y-8">
                                                    <div className="space-y-2">
                                                        <Skeleton className="h-5 w-40 skeleton-shimmer" />
                                                        <Skeleton className="h-4 w-full skeleton-shimmer" />
                                                        <Skeleton className="h-4 w-[85%] skeleton-shimmer" />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Skeleton className="h-5 w-36 skeleton-shimmer" />
                                                        <Skeleton className="h-4 w-full skeleton-shimmer" />
                                                        <Skeleton className="h-4 w-[75%] skeleton-shimmer" />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Skeleton className="h-5 w-48 skeleton-shimmer" />
                                                        <Skeleton className="h-4 w-full skeleton-shimmer" />
                                                        <Skeleton className="h-4 w-[65%] skeleton-shimmer" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ) : (
                                        // -----------------------------------------------
                                        // ACTUAL REPORT CONTENT (your original code)
                                        // -----------------------------------------------
                                        <>
                                            <SheetHeader>
                                                <SheetTitle>{report.title}</SheetTitle>
                                            </SheetHeader>

                                        </>)}
                                    <p className="text-sm text-muted-foreground mt-1 mb-6">
                                        {new Date(report.createdAt).toLocaleString()} ·{" "}
                                    </p>

                                    <div>
                                        <div className="flex justify-between items-center mb-2 px-1">

                                            {/* Original label */}
                                            <div className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                                <span>Original</span>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="h-3 w-3 opacity-60" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>This is the captured screenshot before analysis. Compare the original screenshot with its attention heatmap.</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>

                                            {/* Heatmap label */}
                                            <div className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                                <span>Attention heatmap overlay</span>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="h-3 w-3 opacity-60" />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Drag the slider to reveal where users are most visually focused.</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>

                                        </div>

                                        <HeatmapSlider
                                            beforeSrc={report.image}
                                            afterSrc={report.report.heatmap.image}
                                        />
                                    </div>



                                    <Tabs defaultValue="overview" className="w-full">
                                        <TabsList className="mb-4">
                                            <TabsTrigger value="overview">Overview</TabsTrigger>
                                            <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                                            <TabsTrigger value="design">Design Rules</TabsTrigger>
                                            <TabsTrigger value="readability">Readability</TabsTrigger>
                                            <TabsTrigger value="insights">Insights</TabsTrigger>
                                        </TabsList>

                                        {/* ------------------------------------ */}
                                        {/* OVERVIEW TAB */}
                                        {/* ------------------------------------ */}
                                        <TabsContent value="overview" className="space-y-6">
                                            <section>
                                                <h2 className="text-lg font-semibold mb-2">Summary</h2>
                                                <p className="text-sm text-muted-foreground whitespace-pre-line">
                                                    {report.report.summary}
                                                </p>
                                            </section>

                                            <section>
                                                <h3 className="text-sm font-semibold mb-2">Strengths</h3>
                                                <ul className="list-disc pl-4 space-y-1 text-sm">
                                                    {report.report.strengths.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </section>

                                            <section>
                                                <h3 className="text-sm font-semibold mb-2">Issues</h3>
                                                <ul className="list-disc pl-4 space-y-1 text-sm">
                                                    {report.report.issues.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </section>

                                            <section>
                                                <h3 className="text-sm font-semibold mb-2">Recommendations</h3>
                                                <ul className="list-disc pl-4 space-y-1 text-sm">
                                                    {report.report.recommendations.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </section>
                                        </TabsContent>

                                        {/* ------------------------------------ */}
                                        {/* HEATMAP TAB */}
                                        {/* ------------------------------------ */}
                                        <TabsContent value="heatmap" className="space-y-6">
                                            <section>
                                                <h2 className="text-lg font-semibold mb-2">Heatmap Analysis</h2>
                                                <p className="text-sm text-muted-foreground">
                                                    {report.report.heatmap.description}
                                                </p>
                                            </section>

                                            {/* Placeholder heatmap box */}
                                            <div className="border rounded-lg p-10 bg-muted text-center text-sm text-muted-foreground">
                                                Heatmap visualization coming soon
                                            </div>

                                            {/* Hotspots list */}
                                            <section>
                                                <h3 className="text-sm font-semibold mb-2">Attention Hotspots</h3>
                                                <ul className="space-y-2 text-sm">
                                                    {report.report.heatmap.hotspots.map((spot, i) => (
                                                        <li key={i} className="border p-3 rounded-md">
                                                            <div className="font-medium">{spot.area}</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                Intensity: {(spot.intensity * 100).toFixed(0)}%
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </section>
                                        </TabsContent>

                                        {/* ------------------------------------ */}
                                        {/* DESIGN RULES TAB */}
                                        {/* ------------------------------------ */}
                                        <TabsContent value="design" className="space-y-6">
                                            <h2 className="text-lg font-semibold mb-4">Design Rule Evaluation</h2>

                                            <section>
                                                <h3 className="font-medium">Contrast</h3>
                                                <p className="text-sm text-muted-foreground mb-4">{report.report.designRules.contrast}</p>

                                                <h3 className="font-medium">Spacing</h3>
                                                <p className="text-sm text-muted-foreground mb-4">{report.report.designRules.spacing}</p>

                                                <h3 className="font-medium">Hierarchy</h3>
                                                <p className="text-sm text-muted-foreground mb-4">{report.report.designRules.hierarchy}</p>

                                                <h3 className="font-medium">Alignment</h3>
                                                <p className="text-sm text-muted-foreground">{report.report.designRules.alignment}</p>
                                            </section>
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

                                        {/* ------------------------------------ */}
                                        {/* INSIGHTS TAB */}
                                        {/* ------------------------------------ */}
                                        <TabsContent value="insights" className="space-y-6">
                                            <h2 className="text-lg font-semibold mb-4">AI Insights</h2>

                                            <ul className="space-y-3 text-sm">
                                                {report.report.insights.map((insight, i) => (
                                                    <li key={i} className="border p-3 rounded-md bg-muted">
                                                        {insight}
                                                    </li>
                                                ))}
                                            </ul>
                                        </TabsContent>
                                    </Tabs>

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
            </SheetContent>
        </Sheet>
    )
}
