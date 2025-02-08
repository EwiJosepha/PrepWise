import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  console.log("Processing file...");

  try {
    const { filePath } = await req.json();

    if (!filePath) {
      return NextResponse.json({ error: "No file path provided" }, { status: 400 });
    }

    const absolutePath = path.join(process.cwd(), "public", filePath.replace(/^public[/\\]/, ""));

    if (!fs.existsSync(absolutePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    console.log("Uploading file to OpenAI...");
    const fileResponse = await openai.files.create({
      file: fs.createReadStream(absolutePath),
      purpose: "assistants",
    });

    const fileId = fileResponse.id;
    const assistant = await openai.beta.assistants.create({
      name: "Resume Extractor",
      instructions: "Extract key details (name, experience, skills, education) from resumes.",
      model: "gpt-4-turbo",
      tools: [{ type: "code_interpreter" }],
    });

    const thread = await openai.beta.threads.create();

    const message = await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `Extract the key details (name, experience, skills, education) from the uploaded resume file.`,
      attachments: [{ file_id: fileId, tools: [{ type: "code_interpreter" }] }],
    });

    console.log({message});
    

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });

    console.log({run: run.assistant_id});
    

    const res = {
      message: "File processing started. Check status later.",
      threadId: thread.id,
    };

    console.log({res});
    

    if (!res.threadId) {
      return NextResponse.json({ error: "Missing threadId" }, { status: 400 });
    }

    let runStatus;
do {
  await new Promise(res => setTimeout(res, 2000));
  runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
} while (runStatus.status !== "completed");

const messages = await openai.beta.threads.messages.list(thread.id);

const latestMessage = messages.data[1]

// if (latestMessage && latestMessage.content) {
//   const extractedText = latestMessage.content.map((item: any) => {
//     return item.text?.value || "";
//   }).join("\n");

//   console.log("Extracted Text:", extractedText);
// }
    console.log({message});
    

    return NextResponse.json({ messages });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}