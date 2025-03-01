"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft, Check } from "lucide-react"

export default function NewChatbotPage() {
  const router = useRouter()
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    welcomeMessage: "Hi there! How can I help you today?",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would save the chatbot to the database here
    console.log("Creating new chatbot:", formState)

    // Redirect to the training page for the new chatbot
    // In a real app, we would use the actual ID returned from the API
    router.push("/dashboard/chatbots/bot-new/train")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Create New Chatbot" text="Set up your chatbot's basic information.">
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Chatbot Details</CardTitle>
              <CardDescription>Provide basic information about your chatbot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Chatbot Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Support Assistant"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="What is this chatbot for?"
                  value={formState.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea
                  id="welcomeMessage"
                  name="welcomeMessage"
                  placeholder="The first message users will see"
                  value={formState.welcomeMessage}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/dashboard">Cancel</Link>
              </Button>
              <Button type="submit">
                <Check className="mr-2 h-4 w-4" /> Create Chatbot
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips</CardTitle>
            <CardDescription>Best practices for setting up your chatbot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Choose a Clear Name</h4>
              <p className="text-sm text-muted-foreground">
                Pick a name that reflects the chatbot's purpose and is easy to remember.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Write a Friendly Welcome</h4>
              <p className="text-sm text-muted-foreground">
                Start with a warm greeting that sets expectations for what your chatbot can help with.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Detailed Description</h4>
              <p className="text-sm text-muted-foreground">
                A good description helps you remember the chatbot's purpose and scope when managing multiple bots.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

