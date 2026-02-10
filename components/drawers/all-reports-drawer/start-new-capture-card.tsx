
import { Upload, FolderOpen, MousePointerClick, SquareDashedMousePointer, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


export function StartNewCaptureCard() {

    const actions = [
        {
            icon: SquareDashedMousePointer,
            title: "Capture Area",
            description: "Select region",
        },
        {
            icon: Upload,
            title: "Upload Image",
            description: "From computer",
        },
        {
            icon: MousePointerClick,
            title: "Select",
            description: "Choose element",
        },
        {
            icon: FolderOpen,
            title: "From Captures",
            description: "Use existing",
        },
    ];


    return (
        <Card
            className="cursor-pointer group relative min-h-[200px] sm:h-auto overflow-hidden py-0 gap-0 border-1 border-dashed border-sidebar-border border-purple-200 bg-gradient-to-br from-purple-50 via-purple-50/50 to-background transition-all duration-500 hover:border-purple-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-200/10"
        >
            {/* Header */}
            <div className="flex items-center justify-center gap-1.5 py-3 border-b border-purple-100">
                <p className="text-sm font-medium text-muted-foreground">
                    Start New Capture
                </p>
            </div>

            <div className="grid h-full w-full grid-cols-4 gap-2 p-3 sm:grid-cols-2">
                {actions.map((action, index) => (
                    <Button
                        key={action.title}
                        variant="ghost"
                        className="group/btn relative h-full flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-transparent bg-gradient-to-br from-purple-50/80 to-purple-100/30 transition-all duration-200 hover:border-purple-200 hover:from-purple-100 hover:to-purple-50 hover:shadow-lg hover:shadow-purple-200/50"
                        style={{
                            animationDelay: `${index * 50}ms`,
                        }}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-purple-200/80 transition-all duration-200 group-hover/btn:from-purple-500 group-hover/btn:to-purple-600 group-hover/btn:shadow-lg group-hover/btn:shadow-purple-500/30">
                            <action.icon className="h-5 w-5 text-purple-600 transition-colors duration-200 group-hover/btn:text-white" />
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-medium text-foreground">
                                {action.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {action.description}
                            </div>
                        </div>
                    </Button>
                ))}
            </div>
            {/* </div> */}
        </Card>
    );
}

