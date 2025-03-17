"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "../../components/NavBar";
import router from "next/router";

export default function TechnicalDetails() {
  const [message, setMessage] = useState("");
  const [stocks, setStocks] = useState([]);
  const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/signin");
      return;
    }
  const handleCalculateEMA = async () => {
    
    try {
      await axios.get("http://localhost:5000/technical-details/calculate5EMA?timeframe=D", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("5 EMA Calculation triggered successfully.");
    } catch (error) {
      setMessage("Failed to calculate 5 EMA. Please try again.");
    }
  };

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/technical-details/listOfStocksWithInsideCandles?timeframe=D", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStocks(response.data.data);
      } catch (error) {
        console.error("Failed to fetch stock data", error);
      }
    };
    fetchStocks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-xl mx-auto bg-white/30 backdrop-blur-lg p-6 mt-6 shadow-lg rounded-lg border border-white/40">
        <h1 className="text-2xl font-bold mb-4 text-center">Technical Details</h1>
        <div className="flex justify-center">
          <button
            onClick={handleCalculateEMA}
            className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 backdrop-blur-md"
          >
            Calculate 5 EMA on Day Time Frame
          </button>
        </div>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
      <div className="max-w-xl mx-auto bg-white/30 backdrop-blur-lg p-6 mt-6 shadow-lg rounded-lg border border-white/40">
        <h2 className="text-xl font-bold mb-4 text-center">Stocks with Inside Candles</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Serial No.</th>
              <th className="border border-gray-300 px-4 py-2">Stock Name</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length > 0 ? (
              stocks.map((stock, index) => (
                <tr key={index} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{stock.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-center" colSpan="2">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
