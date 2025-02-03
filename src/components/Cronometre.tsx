import React, { useState, useEffect } from "react";
import ShowSpeed from "./ShowSpeed";

const Cronometre = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showLibraSpeed, setShowLibraSpeed] = useState(false); // Controlăm vizibilitatea componentei
  const [libraData, setLibraData] = useState(null); // Datele care vor fi trimise către LibraSpeed

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
            setLibraData(generateRandomData()); // Generăm datele random
            setShowLibraSpeed(true); // Facem componenta vizibilă
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

  const generateRandomData = () => {
    return {
      downloadSpeed: (Math.random() * 100).toFixed(2),
      uploadSpeed: (Math.random() * 50).toFixed(2),
      latency: (Math.random() * 10 + 10).toFixed(2),
      jitter: (Math.random() * 5).toFixed(2),
    };
  };

  const handleClick = () => {
    if (!isRunning) {
      setProgress(0);
      setIsRunning(true);
      setShowLibraSpeed(true); // Ascundem LibraSpeed când începe cronometrul
    }
  };

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="container">
      {/* Digital Grid Background */}
      <div className="digital-grid" />
      <div className="digital-lines" />

      {/* Main Button Container */}
      <div className="button-container">
        {/* Progress Ring SVG */}
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

        {/* Central Button */}
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

        {/* Corner Decorations */}
        {[
          { top: "-8px", left: "-8px" },
          { top: "-8px", right: "-8px" },
          { bottom: "-8px", left: "-8px" },
          { bottom: "-8px", right: "-8px" },
        ].map((style, index) => (
          <div key={index} className="corner-decoration" style={style} />
        ))}
      </div>

      {showLibraSpeed && <ShowSpeed speedData={libraData} />}
    </div>
  );
};

export default Cronometre;
