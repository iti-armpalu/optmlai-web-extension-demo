"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ]

  const currentThemeOption = themeOptions.find((option) => option.value === theme) || themeOptions[0]
  const CurrentIcon = currentThemeOption.icon

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <CurrentIcon className="size-4" />
              {!isCollapsed && <span>Theme: {currentThemeOption.label}</span>}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right" sideOffset={4}>
            {themeOptions.map((option) => {
              const Icon = option.icon
              return (
                <DropdownMenuItem key={option.value} onClick={() => setTheme(option.value)} className="cursor-pointer">
                  <Icon className="mr-2 size-4" />
                  <span>{option.label}</span>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
