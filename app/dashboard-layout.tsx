import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">{children}</div>
      </SidebarInset>
    </div>
  )
}
