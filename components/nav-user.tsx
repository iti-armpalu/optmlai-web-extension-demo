"use client"
import { LogOut, Settings, CreditCard, User, Check, Plus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { useState } from "react"

const accounts = [
  {
    id: "1",
    name: "John Doe",
    email: "john@optml.ai",
    avatar: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@company.com",
    avatar: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@startup.io",
    avatar: "/placeholder.svg",
  },
]

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile, state } = useSidebar()
  const isCollapsed = state === "collapsed"
  const [activeAccount, setActiveAccount] = useState(user)

  // Optional: Usage data
  const usageData = {
    used: 3,
    total: 10,
    type: "reports",
  }

  const handleSignOut = () => {
    // Implement sign out logic
    console.log("Signing out...")
  }

  const handleSwitchAccount = (account: typeof user) => {
    setActiveAccount(account)
    console.log("Switching to account:", account.email)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* User Identity Block */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            {/* Optional: Usage Mini-Preview */}
            <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground">
              {usageData.used} of {usageData.total} {usageData.type} used
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-xs text-muted-foreground">Accounts</DropdownMenuLabel>
            {accounts.map((account) => {
              const isActive = activeAccount.email === account.email
              return (
                <DropdownMenuItem
                  key={account.id}
                  onClick={() => handleSwitchAccount(account)}
                  className={`cursor-pointer ${isActive ? "bg-primary/5 border border-primary/20 hover:bg-primary/10" : ""
                    }`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <Avatar className={`size-6 rounded-lg ${isActive ? "ring-2 ring-primary ring-offset-1" : ""}`}>
                      <AvatarImage src={account.avatar || "/placeholder.svg"} alt={account.name} />
                      <AvatarFallback
                        className={`rounded-lg text-xs ${isActive ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                          }`}
                      >
                        {account.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className={`truncate ${isActive ? "font-semibold" : "font-medium"}`}>{account.name}</span>
                      <span className="truncate text-xs text-muted-foreground">{account.email}</span>
                    </div>
                    {isActive && <Check className="size-4 text-primary" />}
                  </div>
                </DropdownMenuItem>
              )
            })}
            <DropdownMenuItem className="cursor-pointer">
              <Plus className="mr-2 size-4" />
              Add Account
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Quick Links Group */}
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <a href="https://optml.ai/account" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                  <Settings className="mr-2 size-4" />
                  Account Settings
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="https://optml.ai/profile" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                  <User className="mr-2 size-4" />
                  Profile Settings
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="https://optml.ai/billing" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                  <CreditCard className="mr-2 size-4" />
                  Billing & Usage
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Sign Out */}
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 size-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
