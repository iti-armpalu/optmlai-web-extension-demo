"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useReportStore } from "@/store/report-store"
import { useUIStore } from "@/store/ui-store"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ChevronRight, FileText } from "lucide-react"
import { useMemo } from "react"

const data = {
  navMain: [
    {
      title: "Reports",
      url: "#",
      icon: FileText,
      isActive: true,
    },
  ],
}

export function NavReports() {
  const reportsRaw = useReportStore((s) => s.reports)
  const setActiveReport = useReportStore((s) => s.setActiveReport)

  const { openDrawer } = useUIStore()

  const reports = useMemo(() => {
    return [...reportsRaw].sort((a, b) => b.createdAt - a.createdAt)
  }, [reportsRaw])

  const handleOpenReport = (id: string) => {
    setActiveReport(id)
    openDrawer("report")
  }

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub className="mt-2 space-y-2">
                  {reports.map((report) => (
                    <SidebarMenuSubItem key={report.id}>
                      <SidebarMenuSubButton onClick={() => handleOpenReport(report.id)}>
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs font-medium">{report.title}</span>
                          </div>
                        </div>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
