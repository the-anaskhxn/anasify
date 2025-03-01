import type { ReactNode } from "react"
import { DashboardNav } from "@/components/dashboard-nav"

interface DashboardShellProps {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="fixed top-0 z-30 hidden h-screen w-full shrink-0 border-r md:sticky md:block">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-col overflow-hidden p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

