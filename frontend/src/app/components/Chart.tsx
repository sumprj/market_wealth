'use client'; // Add this at the top to indicate this component runs on the client side.

import { useEffect, useRef } from "react";
import { createChart, CandlestickData } from "lightweight-charts";

interface ChartProps {
  data: CandlestickData[];
  supportLevels: number[];
  resistanceLevels: number[];
}

const Chart: React.FC<ChartProps> = ({ data, supportLevels, resistanceLevels }) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: "#FEFEFE",
        textColor: "#000000",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
      crosshair: {
        vertLine: { color: "#000" },
        horzLine: { color: "#000" },
      },
      priceScale: {
        borderColor: "#ccc",
        autoScale: true,
        scaleMargins: { top: 0.2, bottom: 0.2 },
      },
      timeScale: { borderColor: "#ccc" },
    });
    
    chart.applyOptions({
      handleScale: {
        axisPressedMouseMove: true,
        pinch: true,
        mouseWheel: true,
      },
      handleScroll: {
        vertTouchDrag: true,
        mouseWheel: true,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#00BA7C", // green
      borderUpColor: "#00BA7C",
      wickUpColor: "#00BA7C",
      downColor: "#FF4861", // red
      borderDownColor: "#FF4861",
      wickDownColor: "#FF4861",
    });

    candlestickSeries.setData(data);

    // Add support and resistance levels as line series
    const supportSeries = chart.addLineSeries({
      color: "blue",
      lineWidth: 1,
      crosshairMarkerVisible: false,
    });

    const supportSeriesStrong = chart.addLineSeries({
      color: "blue",
      lineWidth: 2,
      crosshairMarkerVisible: false,
    });

    const supportSeriesStrongest = chart.addLineSeries({
      color: "blue",
      lineWidth: 3,
      crosshairMarkerVisible: false,
    });

    const resistanceSeries = chart.addLineSeries({
      color: "red",
      lineWidth: 1,
      crosshairMarkerVisible: false,
    });

    const resistanceSeriesStrong = chart.addLineSeries({
      color: "red",
      lineWidth: 2,
      crosshairMarkerVisible: false,
    });

    const resistanceSeriesStrongest = chart.addLineSeries({
      color: "red",
      lineWidth: 3,
      crosshairMarkerVisible: false,
    });

    // Map support and resistance levels to constant values across time
    let lineData;
    if (supportLevels && supportLevels.length) {
      lineData = data.map((datum) => ({
        time: datum.time,
        value: supportLevels[0],
      }));

      // Add 1 day
      lineData = lineData.map((datum) => ({
        ...datum,
        time: datum.time + 24 * 60 * 60, // assuming time is in seconds, add one day
      }));

      supportSeries.setData(lineData);
    }

    if (supportLevels && supportLevels.length > 1) {
      lineData = data.map((datum) => ({
        time: datum.time,
        value: supportLevels[1],
      }));

      lineData = lineData.map((datum) => ({
        ...datum,
        time: datum.time + 24 * 60 * 60, // assuming time is in seconds, add one day
      }));
      supportSeriesStrong.setData(lineData);
    }

    if (supportLevels && supportLevels.length > 2) {
      lineData = data.map((datum) => ({
        time: datum.time,
        value: supportLevels[2],
      }));

      lineData = lineData.map((datum) => ({
        ...datum,
        time: datum.time + 24 * 60 * 60, // assuming time is in seconds, add one day
      }));
      supportSeriesStrongest.setData(lineData);
    }

    if (resistanceLevels && resistanceLevels.length) {
      lineData = data.map((datum) => ({
        time: datum.time,
        value: resistanceLevels[0],
      }));

      lineData = lineData.map((datum) => ({
        ...datum,
        time: datum.time + 24 * 60 * 60, // assuming time is in seconds, add one day
      }));
      resistanceSeries.setData(lineData);
    }

    if (resistanceLevels && resistanceLevels.length > 1) {
      lineData = data.map((datum) => ({
        time: datum.time,
        value: resistanceLevels[1],
      }));

      lineData = lineData.map((datum) => ({
        ...datum,
        time: datum.time + 24 * 60 * 60, // assuming time is in seconds, add one day
      }));

      resistanceSeriesStrong.setData(lineData);
    }

    if (resistanceLevels && resistanceLevels.length > 2) {
      lineData = data.map((datum) => ({
        time: datum.time,
        value: resistanceLevels[2],
      }));


      lineData = lineData.map((datum) => ({
        ...datum,
        time: datum.time + 24 * 60 * 60, // assuming time is in seconds, add one day
      }));
      resistanceSeriesStrongest.setData(lineData);
    }

    return () => {
      chart.remove();
    };
  }, [data, supportLevels, resistanceLevels]);

  return <div ref={chartContainerRef} style={{ position: "relative", width: "100%", height: "500px" }} />;
};

export default Chart;
