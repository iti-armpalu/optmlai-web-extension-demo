"use client"

import * as React from "react"
import {
  LayoutDashboard,
  FileImage,
  Settings2,
  Sparkles,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavReports } from "@/components/nav-reports"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { NewCaptureButton } from "./capture-tool/new-capture-button"

// ----------------------------
// SAMPLE NAV DATA
// ----------------------------
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "Acme Inc", logo: LayoutDashboard, plan: "Enterprise" },
    { name: "Acme Corp.", logo: FileImage, plan: "Startup" },
    { name: "Evil Corp.", logo: Sparkles, plan: "Free" },
  ],
  navMain: [
    {
      title: "Captures",
      url: "#",
      icon: FileImage,
      items: [
        { title: "All Captures", url: "#" },
        { title: "Favorites", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "General", url: "#" },
        { title: "Team", url: "#" },
        { title: "Integrations", url: "#" },
      ],
    },
  ],
}

// ----------------------------
// COMPONENT
// ----------------------------
export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* HEADER */}
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />

        <NewCaptureButton />
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <NavReports />
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
