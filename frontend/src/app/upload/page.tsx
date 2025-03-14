'use client';

import { useState } from 'react';
import axios from 'axios';

export default function CsvUploadPage() {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleUpload = async () => {
    if (!file || !date) {
      setMessage('Please select a file and date.');
      return;
    }
    console.log('handle upload called');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('date', date);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setMessage('Please log in to upload files.');
        return;
      }

      const response = await axios.post('http://localhost:5000/instrument-prices/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      console.log(response.data);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to upload file. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl mb-4">Upload Instrument Prices CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" />
      <input type="date" value={date} onChange={handleDateChange} className="mb-4 p-2 border rounded" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

// Let me know if you want to add more fields or refine anything else! 🚀
