"use client"
import Link from "next/link"
import { Circle, Layers } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function CompanyLogo() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 group-data-[collapsible=icon]:justify-center",
        "transition-all duration-200",
      )}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Circle className="size-4 shrink-0" />
      </div>

      {/* Logo Text - Hidden when collapsed */}
      {!isCollapsed && (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-sidebar-foreground">Optml</span>
          <span className="text-xs text-sidebar-foreground/60">Multi-Context Performance Analysis & Optimization</span>
        </div>
      )}
    </Link>
  )
}
