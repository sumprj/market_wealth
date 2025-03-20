"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/NavBar";

export default function ManagePrices() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleUpload = async () => {
    if (!file || !date) {
      setMessage("Please select a file and date.");
      return;
    }

    setLoading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("date", date);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/signin");
        return;
      }

      await axios.post("http://localhost:5000/instrument-prices/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("File uploaded successfully.");
    } catch (error) {
      setMessage("Failed to upload file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!date) {
      setMessage("Please select a date.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/signin");
        return;
      }

      await axios.delete("http://localhost:5000/instrument-prices/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { date },
      });
      setMessage("Prices deleted successfully.");
    } catch (error) {
      setMessage("Failed to delete prices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadDayPrice = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    setLoading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/signin");
        return;
      }

      await axios.post("http://localhost:5000/instrument-prices/upload-day-price", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Day Price file uploaded successfully.");
    } catch (error) {
      setMessage("Failed to upload Day Price file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white/30 backdrop-blur-lg p-6 mt-6 shadow-lg rounded-lg border border-white/40">
        <h1 className="text-2xl font-bold mb-4 text-center">Manage Prices</h1>
        <div className="flex flex-col space-y-4">
          <input type="file" onChange={handleFileChange} className="p-2 border rounded bg-white/20 backdrop-blur-sm" />
          <input type="date" value={date} onChange={handleDateChange} className="p-2 border rounded bg-white/20 backdrop-blur-sm" />
          <div className="flex space-x-4 justify-center">
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 backdrop-blur-md"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 backdrop-blur-md"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Prices"}
            </button>
          </div>
        </div>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
      <div className="max-w-2xl mx-auto bg-white/30 backdrop-blur-lg p-6 mt-6 shadow-lg rounded-lg border border-white/40">
        <h1 className="text-2xl font-bold mb-4 text-center">Upload Day Price</h1>
        <div className="flex flex-col space-y-4">
          <input type="file" onChange={handleFileChange} className="p-2 border rounded bg-white/20 backdrop-blur-sm" />
          <div className="flex justify-center">
            <button
              onClick={handleUploadDayPrice}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 backdrop-blur-md"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Day Price"}
            </button>
          </div>
        </div>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
}
