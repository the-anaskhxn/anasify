import Link from "next/link"
import { Bot, LineChart, Settings, CreditCard, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  return (
    <div className="flex h-full flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Bot className="h-6 w-6 text-primary" />
          <span>Anasify</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Bot className="h-4 w-4" />
            <span>My Chatbots</span>
          </Link>
          <Link
            href="/dashboard?tab=analytics"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <LineChart className="h-4 w-4" />
            <span>Analytics</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          <Link
            href="/dashboard/billing"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <CreditCard className="h-4 w-4" />
            <span>Billing</span>
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/logout">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Link>
        </Button>
      </div>
    </div>
  )
}

