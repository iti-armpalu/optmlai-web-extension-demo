'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { SidebarProvider } from '@/components/ui/sidebar'
import { FloatingToggle } from '@/components/layout/floating-toggle'
import { DrawerHost } from '@/components/drawers/drawer-host'


export function RootContent({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={true}>
        {children}
        <FloatingToggle />
        <DrawerHost />
      </SidebarProvider>
    </TooltipProvider>
  )
}