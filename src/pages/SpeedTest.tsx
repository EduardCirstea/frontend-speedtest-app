import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Settings, Cpu, Wifi, Globe, Chrome } from "lucide-react";

const SpeedTest = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState("default");

  // Dummy data for the stats
  const [stats, setStats] = useState({
    ping: "28ms",
    download: "125.5 Mbps",
    upload: "45.2 Mbps",
    jitter: "4ms",
    latency: "32ms",
  });

  // System info
  const systemInfo = {
    os: "Windows 11 Pro 64-bit",
    browser: "Chrome 121.0.6167.85",
    cpu: "AMD Ryzen 9 5950X",
    memory: "32GB DDR4",
  };

  // Dummy data for the chart
  const chartData = [
    { time: "0s", downloadSpeed: 0, uploadSpeed: 0 },
    { time: "1s", downloadSpeed: 50, uploadSpeed: 20 },
    { time: "2s", downloadSpeed: 120, uploadSpeed: 40 },
    { time: "3s", downloadSpeed: 90, uploadSpeed: 35 },
    { time: "4s", downloadSpeed: 150, uploadSpeed: 45 },
    { time: "5s", downloadSpeed: 130, uploadSpeed: 42 },
  ];

  // Constants for the progress ring
  const TOTAL_TIME = 3000;
  const UPDATE_INTERVAL = 10;
  const size = 200;
  const strokeWidth = 4;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (UPDATE_INTERVAL / TOTAL_TIME) * 100;
          if (newProgress >= 100) {
            setIsRunning(false);
            return 100;
          }
          return newProgress;
        });
      }, UPDATE_INTERVAL);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleClick = () => {
    if (!isRunning) {
      setProgress(0);
      setIsRunning(true);
    }
  };

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="container">
      <div className="digital-grid" />
      <div className="digital-lines" />

      {/* Stats Panel - Top Left */}
      <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-blue-500/30">
        <div className="space-y-2 text-cyan-400 font-mono text-sm">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            <span>Ping: {stats.ping}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 16l-4-4h8l-4 4zm0-8l4 4H8l4-4z"
              />
            </svg>
            <span>Download: {stats.download}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 16l-4-4h8l-4 4zm0-8l4 4H8l4-4z"
              />
            </svg>
            <span>Upload: {stats.upload}</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            <span>Jitter: {stats.jitter}</span>
          </div>
        </div>
      </div>

      {/* System Info - Bottom Left */}
      <div className="absolute bottom-4 left-4 bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-blue-500/30">
        <div className="space-y-4 text-cyan-400 font-mono text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span>{systemInfo.os}</span>
            </div>
            <div className="flex items-center gap-2">
              <Chrome className="w-4 h-4" />
              <span>{systemInfo.browser}</span>
            </div>
          </div>

          <select
            className="w-full bg-black/30 border border-blue-500/30 rounded p-2 text-cyan-400"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option value="default">Select Provider</option>
            <option value="provider1">Starlink</option>
            <option value="provider2">Comcast</option>
            <option value="provider3">AT&T Fiber</option>
            <option value="provider4">Verizon Fios</option>
          </select>
        </div>
      </div>

      {/* Main Speed Test Button */}
      <div className="button-container">
        <svg width={size} height={size} className="progress-ring">
          <circle
            cx={center}
            cy={center}
            r={radius}
            className="progress-track"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            className="progress-indicator"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
          <circle
            cx={center}
            cy={center}
            r={radius - 10}
            className="decorative-ring"
            style={{
              transform: `rotate(${progress * 3.6}deg)`,
              transformOrigin: "center",
            }}
          />
        </svg>

        <button
          onClick={handleClick}
          disabled={isRunning}
          className={`progress-button ${isRunning ? "loading" : ""}`}
          style={{
            background: isRunning
              ? "rgba(0,149,255,0.1)"
              : "rgba(0,149,255,0.05)",
          }}
        >
          <div className="button-content">
            <span className="button-text">
              {isRunning ? "LOADING..." : "START"}
            </span>
          </div>
        </button>

        {[
          { top: "-8px", left: "-8px" },
          { top: "-8px", right: "-8px" },
          { bottom: "-8px", left: "-8px" },
          { bottom: "-8px", right: "-8px" },
        ].map((style, index) => (
          <div key={index} className="corner-decoration" style={style} />
        ))}
      </div>

      {/* Connection Chart - Right Side */}
      <div
        className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-blue-500/30"
        style={{ width: "400px" }}
      >
        <div className="h-64">
          <LineChart
            width={360}
            height={250}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0, 149, 255, 0.1)"
            />
            <XAxis dataKey="time" stroke="#00ddff" tick={{ fill: "#00ddff" }} />
            <YAxis stroke="#00ddff" tick={{ fill: "#00ddff" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 21, 64, 0.9)",
                border: "1px solid rgba(0, 149, 255, 0.3)",
                borderRadius: "4px",
                color: "#00ddff",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="downloadSpeed"
              stroke="#00ddff"
              strokeWidth={2}
              dot={{ fill: "#00ddff" }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="uploadSpeed"
              stroke="#00ffaa"
              strokeWidth={2}
              dot={{ fill: "#00ffaa" }}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default SpeedTest;
