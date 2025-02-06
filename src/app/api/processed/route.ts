import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("API Route Hit");  // Debugging log
  try {
    const { filePath, fileType } = await req.json();
    console.log("Received filePath:", filePath); // Debugging log

    if (!filePath) {
      return NextResponse.json({ error: "No file path provided" }, { status: 400 });
    }

    return NextResponse.json({ message: "Processed successfully", filePath });
  } catch (error: any) {
    console.error("Error in API:", error); // Debugging log
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
