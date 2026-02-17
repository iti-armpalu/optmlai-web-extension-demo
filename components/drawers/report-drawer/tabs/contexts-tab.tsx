import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, ShoppingBag, Smartphone, Info, Sparkle } from "lucide-react"
import { ContextCard } from "./context-card"
import { Accordion } from "@/components/ui/accordion"
import { dummyContextsTab } from "../_content/dummy-contexts"
import { useState } from "react"

export function ContextsTab() {
    const [openContext, setOpenContext] = useState<string | null>(null)

    return (
        <div className="space-y-8">

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                    <Info className="w-4 h-4 text-muted-foreground" />
                </div>
                <p>
                    {dummyContextsTab.intro}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="lg:col-span-3 border-green-600/10 bg-green-50/50 text-green-600 dark:bg-green-950/30 dark:text-green-500">
                    <CardContent>
                        <div className="flex items-start gap-3">
                            <Sparkle className="w-5 h-5" />
                            <div className="flex-1 space-y-1">
                                <h3 className="text-sm font-semibold">Key Insight</h3>
                                <p className="text-sm text-foreground leading-relaxed">
                                    {dummyContextsTab.keyInsight.body}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-card/10 ">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        Multi-Context Performance Analysis
                    </CardTitle>
                    <CardDescription>
                        Your content tested across 10 different retail, e-commerce, and social contexts with AI-predicted
                        performance metrics to show where it fits best and where it may struggle.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <Tabs defaultValue="retail" className="w-full">
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

                        <TabsContent value="retail" className="space-y-4 mt-6">
                            <Accordion type="multiple" className="space-y-4">
                                {dummyContextsTab.contextPerformanceData.retail.map((context) => (
                                    <ContextCard
                                        key={context.id}
                                        context={context}
                                        value={`retail-${context.name}`}
                                        isOpen={openContext === context.id}
                                        onToggle={() =>
                                            setOpenContext((prev) =>
                                                prev === context.id ? null : context.id,
                                            )
                                        }
                                    />
                                ))}
                            </Accordion>
                        </TabsContent>

                        <TabsContent value="ecommerce" className="space-y-4 mt-6">
                            <Accordion type="multiple" className="space-y-4">
                                {dummyContextsTab.contextPerformanceData.ecommerce.map((context) => (
                                    <ContextCard
                                        key={context.id}
                                        context={context}
                                        value={`ecommerce-${context.name}`}
                                        isOpen={openContext === context.id}
                                        onToggle={() =>
                                            setOpenContext((prev) =>
                                                prev === context.id ? null : context.id,
                                            )
                                        }
                                    />
                                ))}
                            </Accordion>
                        </TabsContent>

                        <TabsContent value="social" className="space-y-4 mt-6">
                            <Accordion type="multiple" className="space-y-4">
                                {dummyContextsTab.contextPerformanceData.social.map((context) => (
                                    <ContextCard
                                        key={context.id}
                                        context={context}
                                        value={`social-${context.name}`}
                                        isOpen={openContext === context.id}
                                        onToggle={() =>
                                            setOpenContext((prev) =>
                                                prev === context.id ? null : context.id,
                                            )
                                        }
                                    />
                                ))}
                            </Accordion>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Footer card */}
            <Card className="bg-card/10">
                <CardContent>
                    <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                            <Info className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">Why this matters</p>
                            <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                                {dummyContextsTab.footerNote}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}
