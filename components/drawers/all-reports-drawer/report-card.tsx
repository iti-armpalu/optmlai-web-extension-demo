import { format, formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Sparkles } from "lucide-react";
import { ReportItem } from "@/store/report-store";

interface ReportCardProps {
    report: ReportItem
    onClick?: () => void;
    variant?: "compact" | "full";
}

export function ReportCard({ report, onClick, variant = "full" }: ReportCardProps) {
    if (variant === "compact") {
        return (
            <button
                onClick={onClick}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-left group"
            >
                <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                    <img
                        src={report.image}
                        alt={report.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-sidebar-foreground group-hover:text-sidebar-accent-foreground">
                        {report.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(report.createdAt, { addSuffix: true })}
                    </p>
                </div>
                <Sparkles className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
        );
    }

    return (
        <Card
            onClick={onClick} 
            className="cursor-pointer group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-sidebar-border"
        >
            <div className="aspect-video overflow-hidden bg-muted">
                <img
                    src={report.image}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {report.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{format(report.createdAt, "MMM d, yyyy 'at' h:mm a")}</span>
                </div>
            </CardContent>
        </Card>
    );
}
