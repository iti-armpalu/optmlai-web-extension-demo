'use client'

import { useState } from 'react'
import { Store, ShoppingBag, Smartphone, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { dummyContextData, getContextsByChannel, keyInsight } from '@/data/dummy-contexts'
import type { ContextCardData } from '@/types/context-card'
import { ContextCard } from '@/components/report/context/context-card'
import { ContextSummaryTable } from '@/components/report/context/context-summary-table'

interface ContextsTabProps {
    onNavigateToOverview?: () => void
}

export function ContextsTab({ onNavigateToOverview }: ContextsTabProps) {
    const [openId, setOpenId] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<'retail' | 'ecommerce' | 'social'>('retail')

    const tabChannelMap = {
        retail: 'Retail',
        ecommerce: 'E-commerce',
        social: 'Social',
    } as const

    const handleToggle = (id: string) =>
        setOpenId((prev) => (prev === id ? null : id))

    const handleRowClick = (id: string) => {
        const context = dummyContextData.find((c) => c.id === id)
        if (context) {
            const tab = (Object.entries(tabChannelMap).find(
                ([, channel]) => channel === context.channel
            )?.[0]) as typeof activeTab | undefined
            if (tab) setActiveTab(tab)
        }
        setOpenId(id)
        setTimeout(() => {
            document.getElementById(`context-card-${id}`)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }, 100)
    }

    const renderCards = (channel: ContextCardData['channel']) =>
        getContextsByChannel(channel).map((context) => (
            <div key={context.id} id={`context-card-${context.id}`}>
                <ContextCard
                    data={context}
                    isOpen={openId === context.id}
                    onToggle={() => handleToggle(context.id)}
                    anotherOpen={openId !== null && openId !== context.id}
                />
            </div>
        ))

    return (
        <div className="space-y-6">

            {/* Key insight */}
            <Card className="border-green-600/10 bg-green-50/50 dark:bg-green-950/30">
                <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-semibold text-green-600 dark:text-green-500 mb-1">
                                Key Insight
                            </h3>
                            <p className="text-sm text-foreground leading-relaxed">{keyInsight}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Summary table */}
            <ContextSummaryTable data={dummyContextData} onRowClick={handleRowClick} />

            {/* Context cards by channel */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Multi-Context Performance Analysis</CardTitle>
                    <CardDescription>
                        Tested across 10 different retail, e-commerce, and social contexts with
                        AI-predicted performance metrics to show where it fits best and where it may struggle.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs
                        value={activeTab}
                        onValueChange={(v) => setActiveTab(v as typeof activeTab)}
                        className="w-full"
                    >
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="retail" className="flex items-center gap-2">
                                <Store className="h-4 w-4" />
                                <span className="hidden sm:inline">Retail</span>
                            </TabsTrigger>
                            <TabsTrigger value="ecommerce" className="flex items-center gap-2">
                                <ShoppingBag className="h-4 w-4" />
                                <span className="hidden sm:inline">E-commerce</span>
                            </TabsTrigger>
                            <TabsTrigger value="social" className="flex items-center gap-2">
                                <Smartphone className="h-4 w-4" />
                                <span className="hidden sm:inline">Social</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="retail" className="space-y-3 mt-6">
                            {renderCards('Retail')}
                        </TabsContent>
                        <TabsContent value="ecommerce" className="space-y-3 mt-6">
                            {renderCards('E-commerce')}
                        </TabsContent>
                        <TabsContent value="social" className="space-y-3 mt-6">
                            {renderCards('Social')}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

        </div>
    )
}