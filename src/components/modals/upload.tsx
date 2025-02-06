
'use client'

import { useState } from 'react';

function  CVUploader () {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/uploads', { method: 'POST', body: formData });
    const data = await res.json();
    console.log({data});
    

    if (data.filePath) {
      console.log('clicked');
      
      const processRes = await fetch('/api/processed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: data.filePath, fileType: file.type }),
      });

      const processData = await processRes.json();
      setSummary(processData.summary);
    }

    console.log({summary});
    
  };

  return (
    <div className="p-6 border rounded-md w-96 bg-white shadow-md">
      <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Upload & Process
      </button>
      {summary && <p className="mt-4 p-2 border rounded">{summary}</p>}
    </div>
  );
};

export default CVUploader;
