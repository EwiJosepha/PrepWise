import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse"; 
import mammoth from "mammoth"; 
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { extractText } from "@/utils/extract-text";

export async function POST(req: NextRequest) {
  console.log('clicked process');

  try {
    const { filePath, fileType } = await req.json();

    if (!filePath) {
      return NextResponse.json({ error: "No file path provided" }, { status: 400 });
    }   
    const absolutePath = path.join(process.cwd(), 'public', filePath.replace(/^public[/\\]/, ''));
      const fileBuffer = fs.readFileSync(absolutePath);

    console.log({fileBuffer});
    console.log({absolutePath});
    console.log({fileType});
    
    
    
    let extractedText = "";
    // try {
    //   extractedText = await extractText(absolutePath, fileType);
    // } catch (error: any) {
    //   return NextResponse.json({ error: error.message || "Failed to extract text" }, { status: 400 });
    // }

    if (!extractedText) {
      return NextResponse.json({ error: "Could not extract text from file" }, { status: 400 });
    }
    console.log({ extractedText });

    return NextResponse.json({ message: "Processed successfully", filePath });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
