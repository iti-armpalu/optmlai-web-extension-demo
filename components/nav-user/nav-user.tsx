"use client"
import { LogOut, Settings, CreditCard, User } from "lucide-react"
import { useState } from "react"

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
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { LoginDialog } from "@/components/auth/login-dialog"

import CreditDetails, { type SubscriptionTier } from "./credit-details"
import { DevControls } from "./dev-controls"
import { RegisterDialog } from "../auth/register-dialog"

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

  const { isLoggedIn, logout, login } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showSignUpDialog, setShowSignUpDialog] = useState(false)

  const [tier, setTier] = useState<SubscriptionTier>("free")
  const [credits, setCredits] = useState(0)
  const [freeCredits, setFreeCredits] = useState(3)
  const [daysUntilRenewal, setDaysUntilRenewal] = useState(12)

  const handleSignOut = () => {
    logout()
  }

  if (!isLoggedIn) {
    return (
      <>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col gap-2">
              <Button onClick={() => setShowLoginDialog(true)} variant="outline" className="w-full">
                Login
              </Button>
              <div className="space-y-1">
                <Button onClick={() => setShowSignUpDialog(true)} className="w-full">
                  Sign Up
                </Button>
                <p className="text-xs text-center text-muted-foreground px-1">Get 3 free credits on signup</p>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>

        <LoginDialog
          open={showLoginDialog}
          onOpenChange={setShowLoginDialog}
          onSuccess={() => {
            login()
            setShowLoginDialog(false)
          }}
          onSwitchToRegister={() => {
            setShowLoginDialog(false)
            setShowSignUpDialog(true)
          }}
        />

        <RegisterDialog
          open={showSignUpDialog}
          onOpenChange={setShowSignUpDialog}
          onSuccess={() => {
            login()
            setShowSignUpDialog(false)
          }}
          onSwitchToLogin={() => {
            setShowSignUpDialog(false)
            setShowLoginDialog(true)
          }}
        />
      </>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-0.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-r-none flex-1"
              >
                <Avatar className="size-8 rounded-lg shrink-0">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
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
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-[280px] rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 px-2 py-3">
                  <Avatar className="size-10 rounded-lg">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-semibold text-sm">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <div className="p-3">
                <CreditDetails
                  credits={credits}
                  freeCredits={freeCredits}
                  tier={tier}
                  daysUntilRenewal={daysUntilRenewal}
                />
              </div>

              <DropdownMenuSeparator />

              <div className="px-2 pb-2">
                <DevControls
                  tier={tier}
                  onTierChange={setTier}
                  credits={credits}
                  onCreditsChange={setCredits}
                  freeCredits={freeCredits}
                  onFreeCreditsChange={setFreeCredits}
                  daysUntilRenewal={daysUntilRenewal}
                  onDaysUntilRenewalChange={setDaysUntilRenewal}
                />
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuGroup className="px-1">
                <DropdownMenuItem asChild className="cursor-pointer rounded-md">
                  <a href="https://optml.ai/account" target="_blank" rel="noopener noreferrer">
                    <Settings className="mr-2 size-4" />
                    <span className="text-sm">Account Settings</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-md">
                  <a href="https://optml.ai/profile" target="_blank" rel="noopener noreferrer">
                    <User className="mr-2 size-4" />
                    <span className="text-sm">Profile Settings</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-md">
                  <a href="https://optml.ai/billing" target="_blank" rel="noopener noreferrer">
                    <CreditCard className="mr-2 size-4" />
                    <span className="text-sm">Billing & Usage</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <div className="px-1 pb-1">
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-destructive focus:text-destructive rounded-md"
                >
                  <LogOut className="mr-2 size-4" />
                  <span className="text-sm">Sign Out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

   
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="size-10 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-l-none border-l border-sidebar-border"
              aria-label="Sign out"
            >
              <LogOut className="size-4 text-muted-foreground" />
            </Button>

        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
