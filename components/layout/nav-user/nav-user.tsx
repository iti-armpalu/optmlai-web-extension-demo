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

import { SettingsModal } from "./settings-modal"
import { RegisterDialog } from "@/components/auth/register-dialog"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  const [settingsOpen, setSettingsOpen] = useState(false)

  const { isLoggedIn, logout, login } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showSignUpDialog, setShowSignUpDialog] = useState(false)

  // Dev state (replace with real backend values later)
  const [tier, setTier] = useState<SubscriptionTier>("free")
  const [credits, setCredits] = useState(0) // monthly remaining
  const [freeCredits, setFreeCredits] = useState(3) // sign-up bonus remaining
  const [topUpCredits, setTopUpCredits] = useState(0) // top-up remaining (deducted last)
  const [daysUntilRenewal, setDaysUntilRenewal] = useState(12)

  const handleSignOut = () => logout()

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
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <div className="flex items-center gap-0.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="flex-1 rounded-r-none data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Avatar className="size-8 shrink-0 rounded-lg">
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
                sideOffset={12}
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
                      <span className="truncate text-sm font-semibold">{user.name}</span>
                      <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <div className="p-3">
                  <CreditDetails
                    credits={credits}
                    freeCredits={freeCredits}
                    topUpCredits={topUpCredits}
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
                    topUpCredits={topUpCredits}
                    onTopUpCreditsChange={setTopUpCredits}
                    daysUntilRenewal={daysUntilRenewal}
                    onDaysUntilRenewalChange={setDaysUntilRenewal}
                  />
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuGroup className="px-1">
                  <DropdownMenuItem asChild className="cursor-pointer rounded-md">
                    <button
                      onClick={() => setSettingsOpen(true)}
                    >
                      <Settings className="mr-2 size-4" />
                      <span className="text-sm">Settings</span>
                    </button>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild className="cursor-pointer rounded-md">
                    <button>
                      <User className="mr-2 size-4" />
                      <span className="text-sm">Billing & Usage</span>
                    </button>
                  </DropdownMenuItem>

                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <div className="px-1 pb-1">
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer rounded-md text-destructive focus:text-destructive"
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
              className="size-10 rounded-l-none border-l border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              aria-label="Sign out"
            >
              <LogOut className="size-4 text-muted-foreground" />
            </Button>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>

      <SettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        user={user}
      />
    </>
  )
}
