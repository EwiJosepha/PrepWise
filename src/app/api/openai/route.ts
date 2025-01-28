import { streamText } from "ai";
import { openai } from '@ai-sdk/openai';
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = streamText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: "system",
          content: `Analyzing job descriptions to generate relevant interview questions...
          ...Your response should be under 800 characters.`,
        },
        ...messages,
      ],
    });

    return response.toDataStreamResponse();
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}
