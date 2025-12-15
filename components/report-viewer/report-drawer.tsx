"use client"

import { useEffect, useRef, useState } from "react"
import { useReportStore } from "@/store/report-store"
import {
    Sheet,
    SheetContent,
    SheetDescription,
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
import { CheckCircle2, Download, ExternalLink, Flame, Info, Share2 } from "lucide-react"
import { Skeleton } from "../ui/skeleton"
import { ContentInterpretationTab } from "./content-interpretation"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { HeatmapTab } from "./heatmap-tab"
import { OverviewTab } from "./overview-tab"


const contextPerformanceData = {
    retail: [
        {
            name: "Proximity (Billboards/OOH)",
            attentionTime: "1-2s",
            attentionScore: 92,
            clarityScore: 78,
            conversionPotential: 85,
            recommendedUse: "High",
            insights:
                "Strong visual impact makes this ideal for quick-glance scenarios. High attention grab compensates for medium clarity.",
            recommendations: [
                "Maintain bold visuals and high contrast",
                "Keep headline under 6 words for instant comprehension",
                "CTA should be visible but not text-heavy",
            ],
            metrics: {
                cognitiveLoad: "Low",
                processingTime: "1.8s",
                recallRate: "68%",
                engagementLikelihood: "82%",
            },
        },
        {
            name: "Transition (Entrance/Windows)",
            attentionTime: "2-4s",
            attentionScore: 88,
            clarityScore: 72,
            conversionPotential: 79,
            recommendedUse: "Medium-High",
            insights: "Good attention retention but clarity could be improved for the slightly longer viewing window.",
            recommendations: [
                "Add a secondary message for those who linger",
                "Improve headline hierarchy",
                "Consider motion or animation to maintain interest",
            ],
            metrics: {
                cognitiveLoad: "Medium-Low",
                processingTime: "2.6s",
                recallRate: "74%",
                engagementLikelihood: "76%",
            },
        },
        {
            name: "Impulse (Checkout/Promo)",
            attentionTime: "3-5s",
            attentionScore: 81,
            clarityScore: 65,
            conversionPotential: 71,
            recommendedUse: "Medium",
            insights: "Attention is good but message complexity reduces clarity in impulse decision contexts.",
            recommendations: [
                "Simplify the value proposition to one clear benefit",
                "Add urgency indicators (limited time, exclusive)",
                "Increase CTA prominence by 40%",
            ],
            metrics: {
                cognitiveLoad: "Medium",
                processingTime: "3.4s",
                recallRate: "61%",
                engagementLikelihood: "68%",
            },
        },
        {
            name: "Destination (Shelf/Aisle)",
            attentionTime: "5-15s",
            attentionScore: 74,
            clarityScore: 58,
            conversionPotential: 64,
            recommendedUse: "Low-Medium",
            insights: "Longer viewing time exposes clarity issues. Body text density reduces message absorption.",
            recommendations: [
                "Break body text into bullet points",
                "Add visual hierarchy with size and weight variations",
                "Include social proof or trust indicators",
            ],
            metrics: {
                cognitiveLoad: "High",
                processingTime: "8.2s",
                recallRate: "55%",
                engagementLikelihood: "59%",
            },
        },
    ],
    ecommerce: [
        {
            name: "Discovery (Category Pages)",
            attentionTime: "0.5-3s",
            attentionScore: 90,
            clarityScore: 70,
            conversionPotential: 82,
            recommendedUse: "High",
            insights: "Strong thumbnail appeal and attention grab. Clarity sufficient for discovery phase browsing.",
            recommendations: [
                "Optimize for thumbnail visibility",
                "Ensure headline is legible at small sizes",
                "Use eye-catching color contrast for category grids",
            ],
            metrics: {
                cognitiveLoad: "Low",
                processingTime: "2.1s",
                recallRate: "72%",
                engagementLikelihood: "85%",
            },
        },
        {
            name: "Evaluation (PDP Features)",
            attentionTime: "5-20s",
            attentionScore: 69,
            clarityScore: 52,
            conversionPotential: 58,
            recommendedUse: "Low",
            insights:
                "Extended viewing reveals clarity weaknesses. Detailed evaluation requires clearer information architecture.",
            recommendations: [
                "Restructure content with clear sections and headers",
                "Use progressive disclosure for complex information",
                "Add visual aids (icons, diagrams) to support text",
                "Reduce paragraph density by 40%",
            ],
            metrics: {
                cognitiveLoad: "High",
                processingTime: "12.5s",
                recallRate: "48%",
                engagementLikelihood: "53%",
            },
        },
        {
            name: "Conversion (Cart/Checkout)",
            attentionTime: "5-15s",
            attentionScore: 76,
            clarityScore: 61,
            conversionPotential: 67,
            recommendedUse: "Medium",
            insights: "Moderate performance at critical conversion point. Clarity issues may cause hesitation.",
            recommendations: [
                "Highlight key value proposition prominently",
                "Add trust signals (guarantees, returns, security)",
                "Simplify decision-making with clear benefits list",
                "Remove any ambiguous language",
            ],
            metrics: {
                cognitiveLoad: "Medium",
                processingTime: "7.8s",
                recallRate: "59%",
                engagementLikelihood: "64%",
            },
        },
    ],
    social: [
        {
            name: "Awareness",
            attentionTime: "0.5-2s",
            attentionScore: 94,
            clarityScore: 75,
            conversionPotential: 88,
            recommendedUse: "High",
            insights: "Excellent thumb-stopping power. Visual strength creates immediate scroll interruption.",
            recommendations: [
                "Maintain high visual contrast for feed visibility",
                "Front-load message in first 3 words",
                "Test with motion/video for enhanced stopping power",
            ],
            metrics: {
                cognitiveLoad: "Very Low",
                processingTime: "1.5s",
                recallRate: "71%",
                engagementLikelihood: "89%",
            },
        },
        {
            name: "Consideration (Pause & Evaluate)",
            attentionTime: "3-8s",
            attentionScore: 80,
            clarityScore: 64,
            conversionPotential: 73,
            recommendedUse: "Medium-High",
            insights:
                "Good initial attention maintained through consideration phase, but clarity could seal the deal faster.",
            recommendations: [
                "Add micro-copy that answers 'why now?'",
                "Include visual proof points (stats, testimonials)",
                "Strengthen benefit statements",
            ],
            metrics: {
                cognitiveLoad: "Medium",
                processingTime: "4.9s",
                recallRate: "66%",
                engagementLikelihood: "71%",
            },
        },
        {
            name: "Validation (Social Proof Check)",
            attentionTime: "5-15s",
            attentionScore: 72,
            clarityScore: 57,
            conversionPotential: 62,
            recommendedUse: "Medium",
            insights: "User seeking validation finds message complexity a barrier. Needs clearer credibility signals.",
            recommendations: [
                "Add visible social proof elements",
                "Include user-generated content or reviews",
                "Clarify brand authority or credentials",
                "Simplify technical or feature-heavy language",
            ],
            metrics: {
                cognitiveLoad: "Medium-High",
                processingTime: "9.1s",
                recallRate: "54%",
                engagementLikelihood: "60%",
            },
        },
    ],
}

const allContexts = [
    ...contextPerformanceData.retail.map((c) => ({ ...c, category: "Retail" })),
    ...contextPerformanceData.ecommerce.map((c) => ({ ...c, category: "E-commerce" })),
    ...contextPerformanceData.social.map((c) => ({ ...c, category: "Social" })),
]
const bestContext = allContexts.reduce((best, current) =>
    current.conversionPotential > best.conversionPotential ? current : best,
)


export function ReportDrawer() {
    const { activeReportId, setActiveReport, reports } = useReportStore()
    const report = reports.find((r) => r.id === activeReportId)

    const [isGenerating, setIsGenerating] = useState(true);

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
        }, 8000); // 3s fake generation

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

                {/* <FullPageButton /> */}

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
                                <div className="h-full overflow-y-auto">
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
                                            <div className="border-b border-border p-8">


                                                <SheetHeader className="px-0 pt-0">
                                                    <SheetTitle className="text-balance">Report Title</SheetTitle>
                                                    <SheetDescription>
                                                        Report generated: {reportDate} at {reportTime}
                                                    </SheetDescription>
                                                </SheetHeader>

                                                <div className="space-y-6">
                                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex items-center gap-2">
                                                                <Badge
                                                                    variant="outline"
                                                                    className="gap-1.5 py-1 px-2.5 text-xs font-normal border-green-600/10 bg-green-50/50 text-green-600 dark:bg-green-950/30 dark:text-green-500"
                                                                >
                                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                                    Analysis complete
                                                                </Badge>
                                                            </div>
                                                            <div className="flex flex-wrap items-center gap-1.5">
                                                                <Badge variant="secondary" className="text-xs font-normal py-0.5 px-2">
                                                                    Heatmap
                                                                </Badge>
                                                                <span className="text-muted-foreground">•</span>
                                                                <Badge variant="secondary" className="text-xs font-normal py-0.5 px-2">
                                                                    Cognitive analysis
                                                                </Badge>
                                                                <span className="text-muted-foreground">•</span>
                                                                <Badge variant="secondary" className="text-xs font-normal py-0.5 px-2">
                                                                    Multi-context predictions
                                                                </Badge>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2 flex-wrap lg:flex-shrink-0">
                                                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                                                                <ExternalLink className="h-4 w-4" />
                                                                {/* <span className="hidden sm:inline">Open Full-View Report</span> */}
                                                                {/* <span className="sm:hidden">Open Full</span> */}
                                                            </Button>
                                                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                                                                <Share2 className="h-4 w-4" />
                                                                {/* <span className="hidden sm:inline">Share</span> */}
                                                            </Button>
                                                            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                                                                <Download className="h-4 w-4" />
                                                            </Button>
                                                            {/* <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="outline" size="sm">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem className="gap-2">
                                                                    <Download className="h-4 w-4" />
                                                                    Download PDF
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="gap-2">
                                                                    <Download className="h-4 w-4" />
                                                                    Export CSV
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="gap-2">
                                                                    <Share2 className="h-4 w-4" />
                                                                    Copy Link
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu> */}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>





                                            <div className="container mx-auto p-8">

                                                <Tabs defaultValue="overview" className="w-full">
                                                    <TabsList className="grid w-full grid-cols-4 mb-8">
                                                        <TabsTrigger value="overview">Overview</TabsTrigger>
                                                        <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                                                        <TabsTrigger value="design">Context</TabsTrigger>
                                                        {/* <TabsTrigger value="readability">Readability</TabsTrigger> */}
                                                        <TabsTrigger value="content-interpretation">Content Interpretation</TabsTrigger>
                                                    </TabsList>

                                                    {/* ------------------------------------ */}
                                                    {/* OVERVIEW TAB */}
                                                    {/* ------------------------------------ */}
                                                    <TabsContent value="overview" className="space-y-6">
                                                        <OverviewTab bestContext={bestContext} />
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
                                                    {/* <TabsContent value="insights" className="space-y-6">
                                            <h2 className="text-lg font-semibold mb-4">AI Insights</h2>

                                            <ul className="space-y-3 text-sm">
                                                {report.report.insights.map((insight, i) => (
                                                    <li key={i} className="border p-3 rounded-md bg-muted">
                                                        {insight}
                                                    </li>
                                                ))}
                                            </ul>
                                        </TabsContent> */}


                                                    <TabsContent value="content-interpretation">
                                                        <ContentInterpretationTab />
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
            </SheetContent>
        </Sheet>
    )
}
