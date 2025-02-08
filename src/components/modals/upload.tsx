'use client'
import { useState } from 'react';
import Button from '../button';
interface CVUploaderProps {
  closeModal: () => void;
  setInput: (input: string) => void;
}

const CVUploader = ({ closeModal, setInput }: CVUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/uploads', { method: 'POST', body: formData });
    const data = await res.json();

    if (data.filePath) {
      const processRes = await fetch('/api/processed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: data.filePath, fileType: file.type }),
      });

      const processData = await processRes.json();
      const extracted = processData.extractedText;
      setInput(extracted);
      setSummary(extracted);
    }

    setIsLoading(false);
    closeModal();
  };

  return (
    <div className="p-6 border rounded-md w-96 bg-white shadow-md">
      <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <Button
        onClick={handleUpload}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        disabled={isLoading}
        isLoading={isLoading}
      
      >
       Upload & Process
      </Button>
    </div>
  );
};

export default CVUploader;
