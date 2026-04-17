'use client'

import { useMemo, useState } from 'react'
import { useReportStore } from '@/store/report-store'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ResizableSheet } from '../resizable-sheet'
import { ReportHeader } from './report-header'
import { AnalysisSetupDialog } from './analysis-setup-dialog'
import { ChatPanel } from './chat/chat-panel'
import { OverviewTab } from './tabs/overview-tab'
import { HeatmapTab } from './tabs/heatmap-tab'
import { ContextsTab } from './tabs/contexts-tab'

interface ReportDrawerProps {
    open: boolean
    reportId: string | null
    onOpenChange: (open: boolean) => void
    zIndex?: number
}

export function ReportDrawer({
    open,
    reportId,
    onOpenChange,
    zIndex = 60,
}: ReportDrawerProps) {
    const report = useReportStore((s) =>
        reportId ? s.reports.find((r) => r.id === reportId) ?? null : null
    )

    const [activeTab, setActiveTab] = useState<'overview' | 'heatmap' | 'contexts'>('overview')
    const [tags, setTags] = useState<string[]>([
        "Insurance", "Children's Coverage", "Life Insurance", "Q1 2025",
    ])
    const [newTag, setNewTag] = useState('')
    const [isAddingTag, setIsAddingTag] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [analysisSetupConfirmed, setAnalysisSetupConfirmed] = useState(false)

    if (!report) return null

    const reportDate = new Date(report.createdAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
    })
    const reportTime = new Date(report.createdAt).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    })

    const handleAddTag = () => {
        const trimmed = newTag.trim()
        if (trimmed && !tags.includes(trimmed)) {
            setTags([...tags, trimmed])
            setNewTag('')
            setIsAddingTag(false)
        }
    }

    const handleRemoveTag = (tag: string) => setTags(tags.filter((t) => t !== tag))

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleAddTag()
        else if (e.key === 'Escape') { setIsAddingTag(false); setNewTag('') }
    }

    return (
        <ResizableSheet
            open={open}
            onOpenChange={onOpenChange}
            initialWidth={1600}
            minWidth={1000}
            maxWidth="min(calc(100vw - 10px), 1600px)"
            className="p-0"
            zIndex={zIndex}
        >
            <div className="h-full flex w-full">
                <ResizablePanelGroup direction="horizontal" className="h-full w-full">

                    <ResizablePanel defaultSize={70} minSize={40} className="min-w-0">
                        <div className="h-full overflow-y-auto">
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
                                onAddTagCancel={() => { setIsAddingTag(false); setNewTag('') }}
                                onRemoveTag={handleRemoveTag}
                                onNewTagKeyDown={handleTagKeyDown}
                                analysisSetupConfirmed={analysisSetupConfirmed}
                                onOpenDialog={() => setDialogOpen(true)}
                            />

                            <div className="container mx-auto p-8">
                                <Tabs
                                    value={activeTab}
                                    onValueChange={(v) => setActiveTab(v as typeof activeTab)}
                                    className="w-full"
                                >
                                    <TabsList className="grid w-full grid-cols-3 mb-8">
                                        <TabsTrigger value="overview">Overview</TabsTrigger>
                                        <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                                        <TabsTrigger value="contexts">Contexts</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="overview">
                                        <OverviewTab
                                            analysisSetupConfirmed={analysisSetupConfirmed}
                                            onOpenDialog={() => setDialogOpen(true)}
                                            onNavigateToContexts={() => setActiveTab('contexts')}
                                        />
                                    </TabsContent>

                                    <TabsContent value="heatmap">
                                        <HeatmapTab />
                                    </TabsContent>

                                    <TabsContent value="contexts">
                                        <ContextsTab onNavigateToOverview={() => setActiveTab('overview')} />
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    <ResizablePanel defaultSize={30} minSize={25} className="min-w-0">
                        <ChatPanel analysisSetupConfirmed={analysisSetupConfirmed} />
                    </ResizablePanel>

                </ResizablePanelGroup>
            </div>

            <AnalysisSetupDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onConfirm={() => setAnalysisSetupConfirmed(true)}
                isLocked={analysisSetupConfirmed}
            />
        </ResizableSheet>
    )
}