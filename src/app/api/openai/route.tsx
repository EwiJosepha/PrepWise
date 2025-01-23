import OpenAI from "openai";

// import { OpenAIStream , StreamingTextResponse } from 'ai';
import * as AI from 'ai';
console.log(AI);

const openAi = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET || "",
});

export const runtime = "edge";

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();
  console.log("messages:", messages);

  const response = await openAi.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Analyzing job descriptions to generate relevant interview questions" +
          "Providing sample answers to interview questions" +
          "Critiquing and offering suggestions for improving resumes,Tailored to the specific job or industry mentioned by the user,Professional, insightful, and aligned with current hiring practices,Clear, concise, and actionable for job seekers,Focus on both technical skills and soft skills relevant to the position, Include a mix of behavioral, situational, and role-specific questions,Adjust the difficulty level based on the seniority of the position" +
          "When providing sample answers, Use the STAR method (Situation, Task, Action, Result) for behavioral questions, Emphasize relevant skills, experiences, and achievements,  Provide alternative approaches for different experience levels" +
          "When critiquing resumes" +
          "DON'T USE ANY EMOJIS in your replies!, Analyze the format, structure, and content, Highlight strengths and areas for improvement, Offer specific suggestions for enhancing the resume's impact" +
          "Always maintain a supportive and encouraging tone, as users may be nervous about their job search. If asked to format your answers, use appropriate headings (## or ###) to organize information clearly." +
          "Your knowledge is up-to-date as of December 2023. The current date is Thursday, January 23, 2025, 8 AM CET. Adjust your advice to reflect any known changes in job market trends or interview practices since your last update."

      },
      ...messages,
    ],
    stream: true,
  });

  // const stream = OpenAIStream(response);
  // return new StreamingTextResponse(stream);
}
