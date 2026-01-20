"use client"

import * as React from "react"
import { useState } from "react"
import {
  FileImage,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavReports } from "@/components/nav-reports"
import { NavUser } from "@/components/nav-user/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { NewCaptureButton } from "./capture-tool/new-capture-button"
import { CompanyLogo } from "./company-logo"
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

  const [showAuthGateDialog, setShowAuthGateDialog] = useState(false)

  return (
    <AuthProvider onShowAuthGate={() => setShowAuthGateDialog(true)}>
      <Sidebar {...props}>
        {/* HEADER */}
        <SidebarHeader>
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

        {/* Removed because don't want the collapsed=icon mode */}
        {/* <SidebarRail /> */}
      </Sidebar>

      <RegisterDialog
        open={showAuthGateDialog}
        onOpenChange={setShowAuthGateDialog}
        onSuccess={() => setShowAuthGateDialog(false)}
      />

    </AuthProvider>
  )
}
