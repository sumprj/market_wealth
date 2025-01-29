"use client";
import { useState } from "react";
import { createChart } from "lightweight-charts";
import Papa from "papaparse";

export default function CandlestickChart() {
    const [chartContainer, setChartContainer] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
                const parsedData = result.data.map(row => ({
                    time: row.date, // Ensure date format is YYYY-MM-DD
                    open: parseFloat(row.open),
                    high: parseFloat(row.high),
                    low: parseFloat(row.low),
                    close: parseFloat(row.close)
                }));

                renderChart(parsedData);
            }
        });
    };

    const renderChart = (ohlcData) => {
        if (chartContainer) {
            chartContainer.remove();
        }

        const chartDiv = document.getElementById("chart");
        const chart = createChart(chartDiv, { width: 700, height: 400 });

        const series = chart.addCandlestickSeries();
        series.setData(ohlcData);

        setChartContainer(chart);
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
            <div id="chart" style={{ width: "700px", height: "400px" }}></div>
        </div>
    );
}
