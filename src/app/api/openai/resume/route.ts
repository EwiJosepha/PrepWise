import { streamText } from "ai";
import { openai } from '@ai-sdk/openai';

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { extractedText } = await req.json();

    if (!extractedText) {
      return new Response(JSON.stringify({ error: "No extracted text provided" }), { status: 400 });
    }

    const response = streamText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: "system",
          content: `Analyze the resume text and provide a professional summary. Limit to 800 characters.`,
        },
        { role: "user", content: extractedText },
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
