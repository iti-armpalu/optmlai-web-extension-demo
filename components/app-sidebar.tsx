"use client"

import * as React from "react"
import { useState } from "react"
import {
  LayoutDashboard,
  FileImage,
  Settings2,
  Sparkles,
  PanelLeftClose,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavReports } from "@/components/nav-reports"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

import { NewCaptureButton } from "./capture-tool/new-capture-button"
import { CompanyLogo } from "./company-logo"
import { Button } from "./ui/button"
import { ThemeToggle } from "./theme-toggle"
import { AuthProvider } from "@/contexts/auth-context"
import { RegisterDialog } from "./auth/register-dialog"

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
      title: "Ad Creatives",
      url: "#",
      icon: FileImage,
      items: [
        { title: "All Captures", url: "#" },
        { title: "Favorites", url: "#" },
      ],
    },
  ],
}

// ----------------------------
// COMPONENT
// ----------------------------
export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  // const { state, toggleSidebar } = useSidebar()
  // const isCollapsed = state === "collapsed"

  const [showAuthGateDialog, setShowAuthGateDialog] = useState(false)

  return (
    <AuthProvider onShowAuthGate={() => setShowAuthGateDialog(true)}>
      <Sidebar collapsible="icon" {...props}>
        {/* HEADER */}
        <SidebarHeader>
          {/* <div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg shadow-lg border bg-sidebar hover:bg-sidebar-accent"
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelLeftClose className="size-4" />
          </Button>
        </div> */}
          <CompanyLogo />
          <NewCaptureButton />
        </SidebarHeader>

        {/* CONTENT */}
        <SidebarContent>
          <NavReports />
          <NavMain items={data.navMain} />
        </SidebarContent>

        {/* FOOTER */}
        <SidebarFooter className="pb-14 gap-2">
          {/* <ThemeToggle /> */}
          <NavUser user={data.user} />
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>

      <RegisterDialog
        open={showAuthGateDialog}
        onOpenChange={setShowAuthGateDialog}
        onSuccess={() => setShowAuthGateDialog(false)}
      />

    </AuthProvider>
  )
}
