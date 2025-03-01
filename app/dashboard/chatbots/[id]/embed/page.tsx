"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft, Check, Copy, ExternalLink } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function EmbedChatbotPage() {
  const params = useParams()
  const botId = params.id as string

  const [copied, setCopied] = useState(false)
  const [position, setPosition] = useState("bottom-right")
  const [theme, setTheme] = useState("light")
  const [customBranding, setCustomBranding] = useState(false)

  const embedCode = `<script>
  window.anasify = {
    botId: "${botId}",
    theme: "${theme}",
    position: "${position}"${customBranding ? ",\n    hideBranding: true" : ""}
  }
</script>
<script src="https://anasify.com/embed.js" async></script>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Embed Your Chatbot" text="Get the code to add your chatbot to your website.">
        <Button variant="outline" asChild>
          <Link href={`/dashboard/chatbots/${botId}/preview`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Preview
          </Link>
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Embed Code</CardTitle>
            <CardDescription>
              Copy and paste this code into your website's HTML, just before the closing &lt;/body&gt; tag.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">{embedCode}</pre>
              <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy code</span>
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Need help? Check out our{" "}
              <Link href="#" className="text-primary underline">
                installation guide
              </Link>
              .
            </p>
          </CardFooter>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Customize Appearance</CardTitle>
            <CardDescription>Configure how your chatbot looks and behaves on your website.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Select value={position} onValueChange={setPosition}>
                <SelectTrigger id="position">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bottom-right">Bottom Right</SelectItem>
                  <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  <SelectItem value="top-right">Top Right</SelectItem>
                  <SelectItem value="top-left">Top Left</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System (Auto)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="custom-branding">Remove Anasify Branding</Label>
                <p className="text-sm text-muted-foreground">Available on Pro and Business plans</p>
              </div>
              <Switch id="custom-branding" checked={customBranding} onCheckedChange={setCustomBranding} />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`https://example.com?preview=${botId}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" /> Preview on Demo Site
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>What to do after embedding your chatbot</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-medium">1. Monitor Performance</h4>
              <p className="text-sm text-muted-foreground">
                Track user interactions and chatbot responses in the Analytics dashboard.
              </p>
              <Button variant="outline" asChild className="w-full mt-2">
                <Link href="/dashboard?tab=analytics">View Analytics</Link>
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">2. Improve Training</h4>
              <p className="text-sm text-muted-foreground">
                Add more training data based on common questions from your users.
              </p>
              <Button variant="outline" asChild className="w-full mt-2">
                <Link href={`/dashboard/chatbots/${botId}/train`}>Add More Training</Link>
              </Button>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">3. Upgrade Plan</h4>
              <p className="text-sm text-muted-foreground">
                Need more messages or features? Upgrade to a premium plan.
              </p>
              <Button variant="outline" asChild className="w-full mt-2">
                <Link href="/dashboard/billing">View Plans</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

