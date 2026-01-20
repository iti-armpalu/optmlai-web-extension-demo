"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { useReportStore } from "@/store/report-store"
import { useUIStore } from "@/store/ui-store"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ChevronRight, Clock, FolderOpen, Sparkles } from "lucide-react"
import { useMemo } from "react"
import { formatDistanceToNow } from "date-fns"


export function NavReports() {
  const reportsRaw = useReportStore((s) => s.reports)
  const openDrawer = useUIStore((s) => s.openDrawer)

  const reports = useMemo(() => {
    return [...reportsRaw].sort((a, b) => b.createdAt - a.createdAt)
  }, [reportsRaw])

  const recentReports = useMemo(
    () => reports.slice(0, 5),
    [reports]
  )

  const handleOpenRecentReport = (id: string) => {
    openDrawer({ type: "report", reportId: id })
  }

  const handleOpenAllReports = () => {
    openDrawer({ type: "allReports" })
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Reports</SidebarGroupLabel>
      <SidebarMenu>
        <Collapsible
          asChild
          defaultOpen
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton>
                <Clock className="h-4 w-4" />
                <span>Recent</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="mt-2 space-y-1">
                {recentReports.map((report) => (
                  <button
                    key={report.id}
                    onClick={() => handleOpenRecentReport(report.id)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors text-left group"
                  >
                    <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                      <img
                        src={report.image || "/placeholder.svg"}
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
                  </button>
                ))}
              </div>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* All Reports */}
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => handleOpenAllReports()}
          >
            <FolderOpen className="h-4 w-4" />
            <span>All Reports</span>
            <ChevronRight className="ml-auto h-4 w-4" />
          </SidebarMenuButton>
        </SidebarMenuItem>


      </SidebarMenu>
    </SidebarGroup>
  )
}
