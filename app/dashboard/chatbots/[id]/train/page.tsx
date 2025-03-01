"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft, Globe, MessageSquare, Upload, Plus, Trash2, Save } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function TrainChatbotPage() {
  const params = useParams()
  const router = useRouter()
  const botId = params.id as string

  const [websiteUrl, setWebsiteUrl] = useState("")
  const [qaPairs, setQaPairs] = useState([
    { id: 1, question: "", answer: "" },
    { id: 2, question: "", answer: "" },
  ])
  const [csvFile, setCsvFile] = useState<File | null>(null)

  const handleAddQAPair = () => {
    const newId = qaPairs.length > 0 ? Math.max(...qaPairs.map((pair) => pair.id)) + 1 : 1
    setQaPairs([...qaPairs, { id: newId, question: "", answer: "" }])
  }

  const handleRemoveQAPair = (id: number) => {
    setQaPairs(qaPairs.filter((pair) => pair.id !== id))
  }

  const handleQAPairChange = (id: number, field: "question" | "answer", value: string) => {
    setQaPairs(qaPairs.map((pair) => (pair.id === id ? { ...pair, [field]: value } : pair)))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0])
    }
  }

  const handleSaveTraining = () => {
    // In a real app, we would save the training data to the database here
    console.log("Saving training data:", {
      websiteUrl,
      qaPairs,
      csvFile,
    })

    // Redirect to the preview page
    router.push(`/dashboard/chatbots/${botId}/preview`)
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Train Your Chatbot"
        text="Provide data to help your chatbot answer questions accurately."
      >
        <Button variant="outline" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="website" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="website" className="flex items-center">
            <Globe className="mr-2 h-4 w-4" />
            Website
          </TabsTrigger>
          <TabsTrigger value="qa" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            Q&A Pairs
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="website" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Train from Website</CardTitle>
              <CardDescription>
                Enter your website URL and we'll automatically scrape content to train your chatbot.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website-url">Website URL</Label>
                <Input
                  id="website-url"
                  placeholder="https://example.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  We'll crawl your website and extract relevant information to train your chatbot.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveTraining} disabled={!websiteUrl}>
                <Save className="mr-2 h-4 w-4" /> Save & Continue
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="qa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Question & Answer Pairs</CardTitle>
              <CardDescription>Add common questions and their answers to train your chatbot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {qaPairs.map((pair) => (
                <div key={pair.id} className="space-y-4 pb-4 border-b">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Q&A Pair #{pair.id}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveQAPair(pair.id)}
                      disabled={qaPairs.length <= 1}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`question-${pair.id}`}>Question</Label>
                    <Input
                      id={`question-${pair.id}`}
                      placeholder="e.g., What are your business hours?"
                      value={pair.question}
                      onChange={(e) => handleQAPairChange(pair.id, "question", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`answer-${pair.id}`}>Answer</Label>
                    <Textarea
                      id={`answer-${pair.id}`}
                      placeholder="e.g., Our business hours are Monday to Friday, 9am to 5pm."
                      value={pair.answer}
                      onChange={(e) => handleQAPairChange(pair.id, "answer", e.target.value)}
                    />
                  </div>
                </div>
              ))}

              <Button variant="outline" onClick={handleAddQAPair} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Another Q&A Pair
              </Button>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveTraining} disabled={qaPairs.some((pair) => !pair.question || !pair.answer)}>
                <Save className="mr-2 h-4 w-4" /> Save & Continue
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Training Data</CardTitle>
              <CardDescription>Upload a CSV file with question and answer pairs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="csv-file">CSV File</Label>
                <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
                <p className="text-sm text-muted-foreground">
                  The CSV should have two columns: "question" and "answer".
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">CSV Format Example</h4>
                <div className="bg-muted p-4 rounded-md">
                  <pre className="text-sm">
                    question,answer
                    <br />
                    "What are your business hours?","We are open Monday to Friday, 9am to 5pm."
                    <br />
                    "Do you offer refunds?","Yes, we offer refunds within 30 days of purchase."
                  </pre>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveTraining} disabled={!csvFile}>
                <Save className="mr-2 h-4 w-4" /> Save & Continue
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

