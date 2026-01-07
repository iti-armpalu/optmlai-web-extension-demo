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
import { ContextsTab } from "./contexts-tab"


const contextPerformanceData = {
    retail: [
        {
            name: "Proximity (Billboards / OOH)",
            environment: "Billboards, transit ads, outdoor signage",
            exposureTime: "1–2s exposure",
            behaviorTitle: "What people are doing in this moment",
            behaviorDescription:
                "People are passing by with limited attention and no purchase intent. Messages are processed quickly and remembered later, not acted on immediately.",
            performanceVerdict:
                "Strong visual impact makes this creative effective for quick-glance exposure, despite moderate message depth.",
            fitLevel: "Best fit" as const,
            designImplications: [
                "Headline and hero image capture attention immediately",
                "Product benefits require more time than available in pass-by scenarios",
                "CTA is rarely processed in quick-glance contexts",
            ],
            recommendation: "Best used for awareness and brand recall, not direct response.",
        },
        {
            name: "Transition (Entrance / Windows)",
            environment: "Store entrances, window displays, escalator ads",
            exposureTime: "2–4s exposure",
            behaviorTitle: "What people are doing in this moment",
            behaviorDescription:
                "People are in motion but mentally transitioning into shopping mode. They're open to new information but not yet evaluating deeply.",
            performanceVerdict:
                "Good attention retention and visual appeal work well for this moderately-paced viewing window.",
            fitLevel: "Good fit" as const,
            designImplications: [
                "Strong initial visual hook maintains interest during transition",
                "Message hierarchy supports quick scanning",
                "Clarity limitations become noticeable with extended viewing",
            ],
            recommendation: "Run as-is for building interest during the entry phase.",
        },
        {
            name: "Impulse (Checkout / Promo)",
            environment: "Checkout lanes, end caps, promotional displays",
            exposureTime: "3–5s exposure",
            behaviorTitle: "What people are doing in this moment",
            behaviorDescription:
                "People are in decision mode with wallet out. They're evaluating if something is worth adding to their cart right now.",
            performanceVerdict: "Attention is captured but message complexity slows down the impulse decision process.",
            fitLevel: "Conditional fit" as const,
            designImplications: [
                "Visual strength creates initial interest",
                "Dense copy slows comprehension at the critical decision moment",
                "Value proposition isn't instantly clear",
            ],
            recommendation: "Simplify for this context by reducing text and emphasizing one clear benefit.",
        },
        {
            name: "Destination (Shelf / Aisle)",
            environment: "Product shelves, in-aisle displays, comparison shopping",
            exposureTime: "5–15s exposure",
            behaviorTitle: "What people are doing in this moment",
            behaviorDescription:
                "People are actively comparing options with time to read details. They're looking for reasons to choose one product over another.",
            performanceVerdict:
                "Extended viewing time exposes clarity weaknesses that reduce effectiveness in detailed evaluation contexts.",
            fitLevel: "Weak fit" as const,
            designImplications: [
                "Visual design attracts initial attention successfully",
                "Text density and lack of hierarchy make information hard to absorb",
                "Missing clear differentiation points that help with comparison",
            ],
            recommendation:
                "Redesign with bullet points, clearer hierarchy, and prominent differentiators before using in evaluation contexts.",
        },
    ],
    ecommerce: [
        {
            name: "Discovery (Category Pages)",
            environment: "Product grid thumbnails, category browsing, search results",
            exposureTime: "0.5–3s exposure",
            behaviorTitle: "What people are doing in this moment",
            behaviorDescription:
                "People are rapidly scanning dozens of options looking for anything that stands out. They're not reading—they're filtering visually.",
            performanceVerdict:
                "Excellent thumbnail appeal and visual contrast make this creative highly effective for stopping the scroll.",
            fitLevel: "Best fit" as const,
            designImplications: [
                "Strong visual hierarchy works at small thumbnail sizes",
                "High contrast and bold elements capture attention in crowded grids",
                "Headline remains legible even when scaled down",
            ],
            recommendation: "Run as-is. This creative is optimized for discovery and click-through.",
        },
        {
            name: "Evaluation (PDP Features)",
            environment: "Product detail pages, feature comparisons, specification reading",
            exposureTime: "5–20s exposure",
            behaviorTitle: "What people are doing in this moment",
            behaviorDescription:
                "People are invested and reading carefully. They want to understand exactly what they're getting before committing to purchase.",
            performanceVerdict:
                "Extended viewing reveals significant clarity issues that undermine confidence during detailed evaluation.",
            fitLevel: "Weak fit" as const,
            designImplications: [
                "Dense paragraphs slow down information processing",
                "Lack of visual hierarchy makes scanning difficult",
                "Key differentiators and benefits aren't prominently called out",
            ],
            recommendation:
                "Restructure with clear sections, bullet points, and visual aids before using in evaluation contexts.",
        },
        {
            name: "Conversion (Cart / Checkout)",
            environment: "Shopping cart, checkout page, last-mile reassurance",
            exposureTime: "5–15s exposure",
            behaviorTitle: "What people are doing in this moment",
            behaviorDescription:
                "People are on the verge of purchasing but seeking final reassurance. Any confusion or uncertainty can cause cart abandonment.",
            performanceVerdict: "Moderate performance at critical conversion moment. Clarity gaps may introduce hesitation.",
            fitLevel: "Conditional fit" as const,
            designImplications: [
                "Visual appeal maintains interest",
                "Message complexity creates cognitive friction at decision point",
                "Missing clear trust signals and guarantees",
            ],
            recommendation: "Add prominent trust signals and simplify messaging to reduce conversion hesitation.",
        },
    ],
    social: [
        {
            name: "Awareness (Thumb-Stop)",
            environment: "Social media feeds, story placements, scroll-based content",
            exposureTime: "0.5–2s exposure",
            behaviorTitle: "What people are doing in this moment",
            behaviorDescription:
                "People are mindlessly scrolling through entertainment content. They're not looking for ads—you have to physically stop their thumb.",
            performanceVerdict:
                "Exceptional thumb-stopping power. Visual strength creates immediate scroll interruption and engagement.",
            fitLevel: "Best fit" as const,
            designImplications: [
                "High visual contrast breaks the scroll pattern instantly",
                "Headline front-loads the message in first few words",
                "Emotional appeal creates curiosity that delays the scroll",
            ],
            recommendation: "Run as-is. This creative is optimized for feed visibility and engagement.",
        },
        {
            name: "Consideration (Pause & Evaluate)",
            environment: "Paused feed viewing, saved posts, second looks",
            exposureTime: "3–8s exposure",
            behaviorTitle: "What people are doing in this moment",
            behaviorDescription:
                "People have stopped scrolling and are now considering if this is relevant to them. They're asking 'Is this for me? Why should I care?'",
            performanceVerdict:
                "Good initial hook maintains attention through consideration, but clarity could accelerate the decision.",
            fitLevel: "Good fit" as const,
            designImplications: [
                "Strong visual and emotional appeal sustains engagement",
                "Supporting copy provides enough context for consideration",
                "Could benefit from stronger proof points or urgency signals",
            ],
            recommendation: "Run as-is, or test adding social proof to strengthen conversion.",
        },
        {
            name: "Validation (Social Proof Check)",
            environment: "Profile visits, comment reading, credibility assessment",
            exposureTime: "5–15s exposure",
            behaviorTitle: "What people are doing in this moment",
            behaviorDescription:
                "People are interested but skeptical. They're checking comments, looking at the brand profile, and seeking validation before taking action.",
            performanceVerdict:
                "User seeking validation encounters message complexity as a barrier. Needs clearer credibility signals.",
            fitLevel: "Conditional fit" as const,
            designImplications: [
                "Visual appeal gets attention but lacks trust indicators",
                "Dense copy makes credibility assessment harder",
                "Missing obvious social proof or authority markers",
            ],
            recommendation: "Add visible reviews, testimonials, or credentials to support validation-seekers.",
        },
    ],
}

const allContexts = [
    ...contextPerformanceData.retail.map((c) => ({ ...c, category: "Retail" })),
    ...contextPerformanceData.ecommerce.map((c) => ({ ...c, category: "E-commerce" })),
    ...contextPerformanceData.social.map((c) => ({ ...c, category: "Social" })),
]

const bestContext = allContexts.reduce((best, current) => (current.fitLevel === "Best fit" ? current : best))




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
        }, 1000); // 3s fake generation

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
            {/* <div className="w-full max-w-5xl rounded-3xl backdrop-blur-2xl bg-white/20 shadow-2xl border border-white/30 p-12"> */}
                <SheetContent
                    side="right"
                    className="p-0 border-l overflow-hidden"
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
                                                            <TabsTrigger value="contexts">Contexts</TabsTrigger>
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
                                                        <TabsContent value="contexts" className="space-y-6">
                                                            <ContextsTab contextPerformanceData={contextPerformanceData} bestContextName={bestContext.name} />
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
            {/* </div> */}
        </Sheet>
    )
}
