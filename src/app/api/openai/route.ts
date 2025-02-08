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
          content: `Analyze the provided job description and resume to generate relevant interview questions and offer personalized resume optimization tips. Based on the job description, create a list of possible interview questions, and for each question, suggest ways the user can improve their resume to better align with the job role. Ensure the response stays under 800 characters. When the user clicks on a question, provide an answer that incorporates key insights from the job description. Additionally, highlight areas in the resume where the user can enhance their qualifications, skills, or experience to match the job requirements more closely.`,
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
