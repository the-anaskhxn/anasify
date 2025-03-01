"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Plus, Settings, LineChart, MessageSquare, Code, Trash2 } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

// Mock data for chatbots
const mockChatbots = [
  {
    id: "bot-1",
    name: "Support Bot",
    description: "Customer support chatbot for main website",
    messages: 1245,
    lastUpdated: "2 days ago",
  },
  {
    id: "bot-2",
    name: "Sales Assistant",
    description: "Product recommendations and sales inquiries",
    messages: 867,
    lastUpdated: "5 hours ago",
  },
  {
    id: "bot-3",
    name: "FAQ Bot",
    description: "Answers to frequently asked questions",
    messages: 432,
    lastUpdated: "1 week ago",
  },
]

export default function DashboardPage() {
  const [chatbots, setChatbots] = useState(mockChatbots)

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Manage your AI chatbots and view performance metrics.">
        <Button asChild>
          <Link href="/dashboard/chatbots/new">
            <Plus className="mr-2 h-4 w-4" /> New Chatbot
          </Link>
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="chatbots" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chatbots" className="flex items-center">
            <Bot className="mr-2 h-4 w-4" />
            My Chatbots
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <LineChart className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chatbots" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {chatbots.map((bot) => (
              <Card key={bot.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle>{bot.name}</CardTitle>
                    <CardDescription>{bot.description}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/chatbots/${bot.id}/settings`}>
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">Settings</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-100">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Messages</span>
                      <span className="text-2xl font-bold">{bot.messages}</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
                      <span className="text-sm">{bot.lastUpdated}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/chatbots/${bot.id}/train`}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Train
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/dashboard/chatbots/${bot.id}/embed`}>
                      <Code className="mr-2 h-4 w-4" />
                      Get Code
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {/* Create New Chatbot Card */}
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-full py-12">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Create New Chatbot</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Build a custom AI chatbot for your website
                </p>
                <Button asChild>
                  <Link href="/dashboard/chatbots/new">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>View performance metrics across all your chatbots</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Track user interactions, popular questions, and chatbot performance metrics.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

