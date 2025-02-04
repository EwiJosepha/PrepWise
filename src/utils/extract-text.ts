import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';

export async function extractText(filePath: string, fileType: string): Promise<string> {
  const fileBuffer = fs.readFileSync(filePath);

  if (fileType === 'application/pdf') {
    const data = await pdfParse(fileBuffer);
    
    if (data.text.trim().length > 0) {
      return data.text;
    } else {
      console.log('No selectable text found. Using OCR...');
      return await Tesseract.recognize(filePath, 'eng').then(({ data }) => data.text);
    }
  } 
  else if (fileType.includes('word')) {
    const data = await mammoth.extractRawText({ buffer: fileBuffer });
    return data.value;
  } 
  else if (fileType.startsWith('image/')) {
    return await Tesseract.recognize(filePath, 'eng').then(({ data }) => data.text);
  } 
  else {
    throw new Error('Unsupported file format');
  }
}
