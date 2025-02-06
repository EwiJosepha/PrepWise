import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';

export async function extractText(filePath: string, fileType: string): Promise<string> {
  console.log("extractText called with", { filePath, fileType }); // **Add this line**

  const fileBuffer = fs.readFileSync(filePath); // This line is synchronous
  console.log("fileBuffer read"); // **Add this line**
  try {
    if (fileType === 'application/pdf') {
      console.log("Processing as PDF"); // **Add this line**

      const data = await pdfParse(fileBuffer);
      console.log("pdfParse completed"); // **Add this line**

      if (data.text.trim().length > 0) {
        console.log("Selectable text found"); // **Add this line**
        return data.text;
      } else {
        console.log('No selectable text found. Using OCR...');
        return await Tesseract.recognize(filePath, 'eng').then(({ data }) => data.text);
      }
    } else if (fileType.includes('word')) {
      console.log("Processing as DOCX"); // **Add this line**

      const data = await mammoth.extractRawText({ buffer: fileBuffer });
      return data.value;
    } else if (fileType.startsWith('image/')) {
      console.log("Processing as Image"); // **Add this line**

      return await Tesseract.recognize(filePath, 'eng').then(({ data }) => data.text);
    } else {
      throw new Error('Unsupported file format');
    }
  } catch (error) {
    console.error("Error in extractText", error); // **Log the error**
    throw error; // Re-throw to be caught in the main function
  }
}

