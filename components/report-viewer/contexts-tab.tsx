import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Store, ShoppingBag, Smartphone, Info } from "lucide-react"
import { ContextCard } from "./context-card"
import { Accordion } from "../ui/accordion"

interface ContextData {
    name: string
    environment: string
    exposureTime: string
    behaviorTitle: string
    behaviorDescription: string
    performanceVerdict: string
    fitLevel: "Best fit" | "Good fit" | "Conditional fit" | "Weak fit"
    designImplications: string[]
    recommendation?: string
}

interface ContextsTabProps {
    contextPerformanceData: {
        retail: ContextData[]
        ecommerce: ContextData[]
        social: ContextData[]
    }
    bestContextName: string
}

export function ContextsTab({ contextPerformanceData, bestContextName }: ContextsTabProps) {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Info className="h-4 w-4 shrink-0" />
                <p>
                    This section evaluates how well your creative performs across different real-world viewing contexts, based on attention, clarity, and decision timing.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        Multi-Context Performance Analysis
                    </CardTitle>
                    <CardDescription>
                        Your content tested across 10 different shopper, e-commerce, and social contexts with AI-predicted
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
                                {contextPerformanceData.retail.map((context, idx) => (
                                    <ContextCard key={idx} context={context} isBest={context.name === bestContextName} value={`retail-${idx}`} />
                                ))}
                            </Accordion>
                        </TabsContent>

                        <TabsContent value="ecommerce" className="space-y-4 mt-6">
                            <Accordion type="multiple" className="space-y-4">
                                {contextPerformanceData.ecommerce.map((context, idx) => (
                                    <ContextCard key={idx} context={context} isBest={context.name === bestContextName} value={`ecommerce-${idx}`} />
                                ))}
                            </Accordion>
                        </TabsContent>

                        <TabsContent value="social" className="space-y-4 mt-6">
                            <Accordion type="multiple" className="space-y-4">
                                {contextPerformanceData.social.map((context, idx) => (
                                    <ContextCard key={idx} context={context} isBest={context.name === bestContextName} value={`social-${idx}`} />
                                ))}
                            </Accordion>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
