"use client"
import { LogOut, Settings, CreditCard, User, Crown, Gift, Sparkles } from "lucide-react"
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
import { RegisterDialog } from "./auth/register-dialog"


type SubscriptionState = "no-plan" | "free-only" | "plan-with-free" | "plan-no-free"

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
  const { isLoggedIn, logout, login } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showSignUpDialog, setShowSignUpDialog] = useState(false)

  const [demoState, setDemoState] = useState<SubscriptionState>("plan-with-free")

  const getSubscriptionData = () => {
    switch (demoState) {
      case "no-plan":
        return {
          plan: null,
          freeCreditsUsed: 1,
          freeCreditsTotal: 3,
          paidCreditsUsed: 0,
          paidCreditsTotal: 0,
        }
      case "free-only":
        return {
          plan: null,
          freeCreditsUsed: 0,
          freeCreditsTotal: 3,
          paidCreditsUsed: 0,
          paidCreditsTotal: 0,
        }
      case "plan-with-free":
        return {
          plan: "Pro",
          freeCreditsUsed: 1,
          freeCreditsTotal: 3,
          paidCreditsUsed: 24,
          paidCreditsTotal: 100,
        }
      case "plan-no-free":
        return {
          plan: "Pro",
          freeCreditsUsed: 3,
          freeCreditsTotal: 3,
          paidCreditsUsed: 47,
          paidCreditsTotal: 100,
        }
    }
  }

  const subscriptionData = getSubscriptionData()

  const cycleState = () => {
    const states: SubscriptionState[] = ["no-plan", "free-only", "plan-with-free", "plan-no-free"]
    const currentIndex = states.indexOf(demoState)
    const nextIndex = (currentIndex + 1) % states.length
    setDemoState(states[nextIndex])
  }

  const handleSignOut = () => {
    console.log("Signing out...")
    logout()
  }

  if (!isLoggedIn) {
    return (
      <>
        <SidebarMenu>
          <SidebarMenuItem>
            {isCollapsed ? (
              <SidebarMenuButton size="lg" onClick={() => setShowLoginDialog(true)} className="justify-center">
                <User className="size-5" />
              </SidebarMenuButton>
            ) : (
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
            )}
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
                {!isCollapsed && (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                  </div>
                )}
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

              <div className="mx-2 mb-2 space-y-2">
                {subscriptionData.freeCreditsTotal > 0 && (
                  <div className="rounded-lg border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Gift className="size-4 text-emerald-600" />
                        <span className="font-semibold text-sm">Free Credits</span>
                      </div>
                      <span className="text-xs font-medium text-emerald-700">
                        {subscriptionData.freeCreditsTotal - subscriptionData.freeCreditsUsed} left
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Sign-up bonus</span>
                        <span className="font-medium">
                          {subscriptionData.freeCreditsUsed} / {subscriptionData.freeCreditsTotal} used
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-background overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 transition-all"
                          style={{
                            width: `${(subscriptionData.freeCreditsUsed / subscriptionData.freeCreditsTotal) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {subscriptionData.plan ? (
                  <div className="rounded-lg border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Crown className="size-4 text-primary" />
                        <span className="font-semibold text-sm">{subscriptionData.plan} Plan</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" asChild>
                        <a href="https://optml.ai/billing" target="_blank" rel="noopener noreferrer">
                          Manage
                        </a>
                      </Button>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Monthly Credits</span>
                        <span className="font-medium">
                          {subscriptionData.paidCreditsUsed} / {subscriptionData.paidCreditsTotal}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-background overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{
                            width: `${(subscriptionData.paidCreditsUsed / subscriptionData.paidCreditsTotal) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="size-4 text-amber-600" />
                        <span className="font-semibold text-sm">Free Tier</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Upgrade to unlock more credits and premium features
                    </p>
                    <Button variant="default" size="sm" className="w-full h-7 text-xs" asChild>
                      <a href="https://optml.ai/pricing" target="_blank" rel="noopener noreferrer">
                        View Plans
                      </a>
                    </Button>
                  </div>
                )}
              </div>

              <div className="mx-2 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={cycleState}
                  className="w-full h-7 text-xs font-mono bg-transparent"
                >
                  Toggle State: {demoState}
                </Button>
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

          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSignOut}
              className="size-10 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-l-none border-l border-sidebar-border"
              aria-label="Sign out"
            >
              <LogOut className="size-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
