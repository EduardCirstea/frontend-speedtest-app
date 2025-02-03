import React, { useState, useEffect } from "react";

import { Settings, Cpu, Wifi, Globe, Chrome } from "lucide-react";

const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  if (/Mobi|Android/i.test(userAgent)) {
    return "phone";
  } else if (/Tablet|iPad/i.test(userAgent)) {
    return "tablet";
  } else {
    return "desktop";
  }
};

const useSystemInfo = () => {
  const [systemInfo, setSystemInfo] = useState({
    os: "Unknown",
    browser: "Unknown",
    browserVersion: "Unknown",
  });

  useEffect(() => {
    const getOS = () => {
      const platform = navigator.platform.toLowerCase();
      const userAgent = navigator.userAgent.toLowerCase();

      if (platform.includes("win")) return "Windows";
      if (platform.includes("mac")) return "MacOS";
      if (platform.includes("linux")) return "Linux";
      if (/android/.test(userAgent)) return "Android";
      if (/iphone|ipad|ipod/.test(userAgent)) return "iOS";

      return "Unknown";
    };

    const getBrowserInfo = () => {
      const userAgent = navigator.userAgent;
      let browser = "Unknown";
      let version = "Unknown";

      if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
        browser = "Chrome";
        version = userAgent.match(/Chrome\/([\d.]+)/)?.[1] || "Unknown";
      } else if (userAgent.includes("Firefox")) {
        browser = "Firefox";
        version = userAgent.match(/Firefox\/([\d.]+)/)?.[1] || "Unknown";
      } else if (userAgent.includes("Edg")) {
        browser = "Edge";
        version = userAgent.match(/Edg\/([\d.]+)/)?.[1] || "Unknown";
      } else if (
        userAgent.includes("Safari") &&
        !userAgent.includes("Chrome")
      ) {
        browser = "Safari";
        version = userAgent.match(/Version\/([\d.]+)/)?.[1] || "Unknown";
      } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
        browser = "Internet Explorer";
        version = userAgent.match(/(?:MSIE |rv:)([\d.]+)/)?.[1] || "Unknown";
      }

      return { browser, version };
    };

    const os = getOS();
    const { browser, version } = getBrowserInfo();

    setSystemInfo({ os, browser, browserVersion: version });
  }, []);

  return systemInfo;
};
const SpeedTest = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState("default");
  interface Datad {
    ip: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
  }

  const [datad, setDatad] = useState<Datad | null>(null);
  const { os, browser, browserVersion } = useSystemInfo();

  useEffect(() => {
    fetch("https://ipinfo.io/json?token=cd7ea6da5b54f3")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDatad(data);
        console.log("IP Address:", data.ip);
        console.log("Location:", data.city, data.region, data.country);
        console.log("Coordinates:", data.loc); // Latitudine, longitudine
      });
  }, []);
  console.log(datad);

  const connection = (navigator as any).connection;

  // Assuming SpeedTest is a class from an external library or defined elsewhere
  // import SpeedTest from 'path-to-speedtest-library';

  // Dummy implementation for SpeedTest
  class SpeedTest {
    startTest() {
      console.log("Test started");
    }
    onupdate(data: {
      ping: string;
      jitter: string;
      dlStatus: string;
      ulStatus: string;
    }) {
      console.log("Update received", data);
    }
  }
  const deviceType = getDeviceType();

  const test = new SpeedTest();
  test.startTest();
  test.onupdate({
    ping: "28ms",
    jitter: "4ms",
    dlStatus: "125.5 Mbps",
    ulStatus: "45.2 Mbps",
  });
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "5rem",
          left: "23rem",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(4px)",
          padding: "1rem",
          borderRadius: "0.5rem",
          border: "1px solid rgba(0, 123, 255, 0.3)",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            color: "#00bcd4",
            fontFamily: "monospace",
            fontSize: "0.875rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Wifi style={{ width: "1rem", height: "1rem" }} />
            <span>Adresa IP: {datad?.ip}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg
              style={{
                width: "1rem",
                height: "1rem",
                transform: "rotate(180deg)",
              }}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 16l-4-4h8l-4 4zm0-8l4 4H8l4-4z"
              />
            </svg>
            <span>Sistem de operare: {navigator.platform}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg
              style={{
                width: "1rem",
                height: "1rem",
                transform: "rotate(180deg)",
              }}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 16l-4-4h8l-4 4zm0-8l4 4H8l4-4z"
              />
            </svg>
            <span>
              Locatie: {datad?.city} {datad?.region} {datad?.country}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg
              style={{
                width: "1rem",
                height: "1rem",
                transform: "rotate(180deg)",
              }}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 16l-4-4h8l-4 4zm0-8l4 4H8l4-4z"
              />
            </svg>
            <span>Dispozitiv: {deviceType}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg
              style={{
                width: "1rem",
                height: "1rem",
                transform: "rotate(180deg)",
              }}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 16l-4-4h8l-4 4zm0-8l4 4H8l4-4z"
              />
            </svg>
            <span>Viteza maxima estimata: {connection.downlink} Mbps</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg
              style={{
                width: "1rem",
                height: "1rem",
                transform: "rotate(180deg)",
              }}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 16l-4-4h8l-4 4zm0-8l4 4H8l4-4z"
              />
            </svg>
            <span>Tipul conexiunii: {connection?.effectiveType}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg
              style={{
                width: "1rem",
                height: "1rem",
                transform: "rotate(180deg)",
              }}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 16l-4-4h8l-4 4zm0-8l4 4H8l4-4z"
              />
            </svg>
            <span>Locatie: {datad?.loc}</span>
          </div>
        </div>
      </div>

      {/* System Info - Bottom Left */}
      <div
        style={{
          position: "absolute",
          bottom: "5rem",
          left: "23rem",
          backgroundColor: "#c2c2c2",
          backdropFilter: "blur(4px)",
          padding: "1rem",
          borderRadius: "0.5rem",
          border: "1px solid rgba(0, 123, 255, 0.3)",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            color: "#00bcd4",
            fontFamily: "monospace",
            fontSize: "0.875rem",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Settings style={{ width: "1rem", height: "1rem" }} />
              <span>{os}</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Chrome style={{ width: "1rem", height: "1rem" }} />
              <span>
                {browser} {browserVersion}
              </span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Chrome style={{ width: "1rem", height: "1rem" }} />
              <span>{datad?.org}</span>
            </div>
          </div>

          <select
            style={{
              width: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "1px solid rgba(0, 123, 255, 0.3)",
              borderRadius: "0.5rem",
              padding: "0.5rem",
              color: "#00bcd4",
            }}
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
    </>
  );
};

export default SpeedTest;
