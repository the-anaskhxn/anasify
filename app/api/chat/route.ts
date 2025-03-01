import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // In a real app, we would fetch the chatbot's training data here
  // and use it to provide context to the AI model

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system:
      "You are a helpful customer support chatbot. Answer questions based on the provided context. If you don't know the answer, politely say so and offer to connect the user with a human agent.",
  })

  return result.toDataStreamResponse()
}

