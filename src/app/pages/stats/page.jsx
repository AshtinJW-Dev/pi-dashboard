"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Helper function to format storage values
const formatStorageValue = (kb) => {
  if (kb > 1024 * 1024) return (kb / (1024 * 1024)).toFixed(2) + " GB";
  if (kb > 1024) return (kb / 1024).toFixed(2) + " MB";
  return kb + " KB";
};

const SystemInfoItem = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">{label}:</span>
    <span className="text-foreground font-medium">{value}</span>
  </div>
);

export default function Stats() {
  const [systemInfo, setSystemInfo] = useState(null);
  const [cpuTempHistory, setCpuTempHistory] = useState([]);
  const [cpuUsageHistory, setCpuUsageHistory] = useState([[], [], [], []]); // Separate arrays for each core
  const [memoryUsageHistory, setMemoryUsageHistory] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    async function fetchSystemInfo() {
      const response = await fetch("/api/systemDetails");
      const data = await response.json();
      setSystemInfo(data);

      // Add data to history
      setCpuTempHistory((prev) => [...prev.slice(-10), data.cpuTemp]);
      setMemoryUsageHistory((prev) => [
        ...prev.slice(-10),
        (data.memoryUsage.used / data.memoryUsage.total) * 100,
      ]);
      setTimestamps((prev) => [...prev.slice(-10), new Date().toLocaleTimeString()]);

      // Update CPU usage for each core
      setCpuUsageHistory((prev) =>
        prev.map((history, i) => [...history.slice(-10), data.cpuUsage[i]])
      );
    }

    fetchSystemInfo();
    const interval = setInterval(fetchSystemInfo, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, []);

  if (!systemInfo) return <p>Loading...</p>;

  const { os, memoryUsage, storage } = systemInfo;

  // Line chart data for CPU temperature
  const tempData = {
    labels: timestamps,
    datasets: [
      {
        label: "CPU Temperature (°C)",
        data: cpuTempHistory,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  // Line chart data for Memory usage over time
  const memoryData = {
    labels: timestamps,
    datasets: [
      {
        label: "Memory Usage (%)",
        data: memoryUsageHistory,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  // Line chart data for CPU usage over time for each core
  const cpuUsageData = {
    labels: timestamps,
    datasets: cpuUsageHistory.map((coreHistory, index) => ({
      label: `Core ${index + 1} Usage (%)`,
      data: coreHistory,
      borderColor: `rgba(${index * 50}, ${100 + index * 40}, ${150 + index * 30}, 1)`,
      backgroundColor: `rgba(${index * 50}, ${100 + index * 40}, ${150 + index * 30}, 0.2)`,
      fill: true,
    })),
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Raspberry Pi</h1>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {[["Hostname", os.hostname], ["Platform", os.platform], ["Architecture", os.arch]].map(([label, value]) => (
              <SystemInfoItem key={label} label={label} value={value} />
            ))}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Storage Usage</h3>
            {storage.map((disk, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{disk.name}</span>
                  <span>{formatStorageValue(disk.used)} / {formatStorageValue(disk.total)}</span>
                </div>
                <Progress
                  value={(disk.used / disk.total) * 100}
                  className="h-2"
                  aria-valuenow={(disk.used / disk.total) * 100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${disk.name} Usage`}
                />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              CPU Temperature Over Time (Current: {cpuTempHistory[cpuTempHistory.length - 1]}°C)
            </h3>
            <Line data={tempData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Memory Usage Over Time (Current: {formatStorageValue(memoryUsage.used)} / {formatStorageValue(memoryUsage.total)})
            </h3>
            <Line data={memoryData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">CPU Usage Over Time (per Core)</h3>
            <Line data={cpuUsageData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </div>

          
        </CardContent>
      </Card>
    </main>
  );
}

