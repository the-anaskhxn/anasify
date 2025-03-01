"use client"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft, Code, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useChat } from "ai/react"

export default function PreviewChatbotPage() {
  const params = useParams()
  const router = useRouter()
  const botId = params.id as string

  // Use the AI SDK's useChat hook for the chatbot functionality
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hi there! I'm your AI assistant. How can I help you today?",
      },
    ],
  })

  return (
    <DashboardShell>
      <DashboardHeader heading="Preview Chatbot" text="Test your chatbot before embedding it on your website.">
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/chatbots/${botId}/train`}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Training
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/chatbots/${botId}/embed`}>
              <Code className="mr-2 h-4 w-4" /> Get Embed Code
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Test Your Chatbot</CardTitle>
            <CardDescription>Ask questions to see how your chatbot responds.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border rounded-md mx-6 mb-6">
              <div className="bg-muted p-3 border-b rounded-t-md flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="flex-1 text-center text-xs text-muted-foreground">Chatbot Preview</div>
              </div>

              <div className="h-[400px] flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                          <AvatarFallback>Bot</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg px-3 py-2 max-w-[80%] ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.role === "user" && (
                        <Avatar className="h-8 w-8 ml-2">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                          <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                        <AvatarFallback>Bot</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg px-3 py-2 max-w-[80%] bg-muted">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-75"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t flex">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="flex-1 mr-2"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Chatbot Performance</CardTitle>
            <CardDescription>Review how well your chatbot is answering questions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Training Status</h4>
              <div className="flex items-center">
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full w-[85%]"></div>
                </div>
                <span className="ml-2 text-sm font-medium">85%</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your chatbot has been trained with the data you provided. Continue testing to improve its responses.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Suggested Improvements</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Add more specific product information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span>Include pricing details for common questions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Good coverage of support-related questions</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Next Steps</h4>
              <p className="text-sm text-muted-foreground">
                Once you're satisfied with your chatbot's responses, get the embed code to add it to your website.
              </p>
              <Button asChild className="w-full mt-2">
                <Link href={`/dashboard/chatbots/${botId}/embed`}>
                  <Code className="mr-2 h-4 w-4" /> Get Embed Code
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

