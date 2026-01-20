import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Store, ShoppingBag, Smartphone, Info } from "lucide-react"
import { ContextCard } from "./context-card"
import { Accordion } from "@/components/ui/accordion"
import { dummyContextsTab } from "../_content/dummy-contexts"

export function ContextsTab() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Info className="h-4 w-4 shrink-0" />
                <p>
                    {dummyContextsTab.intro}
                </p>
            </div>

            <Card>
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
                                {dummyContextsTab.contextPerformanceData.retail.map((context, idx) => (
                                    <ContextCard
                                        key={idx}
                                        context={context}
                                        value={`retail-${context.name}`}
                                    />
                                ))}
                            </Accordion>
                        </TabsContent>

                        <TabsContent value="ecommerce" className="space-y-4 mt-6">
                            <Accordion type="multiple" className="space-y-4">
                                {dummyContextsTab.contextPerformanceData.ecommerce.map((context, idx) => (
                                    <ContextCard
                                        key={idx}
                                        context={context}
                                        value={`ecommerce-${context.name}`} />
                                ))}
                            </Accordion>
                        </TabsContent>

                        <TabsContent value="social" className="space-y-4 mt-6">
                            <Accordion type="multiple" className="space-y-4">
                                {dummyContextsTab.contextPerformanceData.social.map((context, idx) => (
                                    <ContextCard
                                        key={idx}
                                        context={context}
                                        value={`social-${context.name}`} />
                                ))}
                            </Accordion>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

              {/* Footer Note */}
              <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">Why this matters:{" "}</strong>{dummyContextsTab.footerNote}
                    </div>
                </div>
            </div>

        </div>
    )
}
