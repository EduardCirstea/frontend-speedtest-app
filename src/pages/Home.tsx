import { useSelector, UseSelector } from "react-redux";
import { useAppSelector } from "../utilities/hooks";
import { RootState } from "../app/store.js";
import ConnectionParams from "../components/ConnectionParams.js";
import LibraSpeed from "../components/LibrasSpeed";
import { useEffect, useState } from "react";
import Cronometre from "../components/Cronometre.js";
import SpeedTest from "./SpeedTest.js";

export default function Home() {
  const { status, user } = useAppSelector((state: RootState) => state.user);
  const [data, setData] = useState();
  const [results, setResults] = useState(null);
  const testDownloadSpeed = async () => {
    const startTime = Date.now();
    try {
      const response = await fetch(
        "https://speed.cloudflare.com/__down?bytes=10000000"
      ); // 10MB
      const endTime = Date.now();

      const duration = (endTime - startTime) / 1000; // secunde
      const fileSizeMB = 10; // MB
      const downloadSpeed = (fileSizeMB / duration) * 8; // Mbps

      return downloadSpeed.toFixed(2);
    } catch (error) {
      console.error("Eroare la testul de download", error);
      return "Eroare";
    }
  };

  const testUploadSpeed = async () => {
    const data = new Uint8Array(2 * 1024 * 1024); // 2MB de date fictive
    const startTime = Date.now();
    try {
      await fetch("https://speed.cloudflare.com/__up", {
        method: "POST",
        body: data,
      });
      const endTime = Date.now();

      const duration = (endTime - startTime) / 1000; // secunde
      const fileSizeMB = 2; // MB
      const uploadSpeed = (fileSizeMB / duration) * 8; // Mbps

      return uploadSpeed.toFixed(2);
    } catch (error) {
      console.error("Eroare la testul de upload", error);
      return "Eroare";
    }
  };

  const testLatencyAndJitter = async () => {
    const latencies = [];
    for (let i = 0; i < 5; i++) {
      const startTime = Date.now();
      await fetch("https://www.google.com", { mode: "no-cors" }); // Folosește un request rapid
      const endTime = Date.now();
      latencies.push(endTime - startTime);
    }

    const latency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
    const jitter =
      latencies.map((x) => Math.abs(x - latency)).reduce((a, b) => a + b, 0) /
      latencies.length;

    return {
      latency: latency.toFixed(2),
      jitter: jitter.toFixed(2),
    };
  };

  const runSpeedTest = async () => {
    const download = await testDownloadSpeed();
    const upload = await testUploadSpeed();
    const { latency, jitter } = await testLatencyAndJitter();

    const finalResults = { download, upload, latency, jitter };
    console.log(finalResults);
    setResults(finalResults);
  };

  const profileImageUrl = `http://localhost:3123${user.picture}`;
  return (
    <div className="container">
      <LibraSpeed />
      <Cronometre />
      <button onClick={runSpeedTest}>Start Speed Test</button>
      {results && (
        <p>
          <strong>Viteza Download:</strong> {results.download} Mbps <br />
          <strong>Viteza Upload:</strong> {results.upload} Mbps <br />
          <strong>Latenta:</strong> {results.latency} ms <br />
          <strong>Jitter:</strong> {results.jitter} ms
        </p>
      )}{" "}
    </div>
  );
}
{
  /* <h4>{data} +"dsad"</h4> */
}
{
  /* <ConnectionParams /> */
}
{
  /* <img
        src={profileImageUrl}
        alt=""
        style={{ width: "200px", borderRadius: "20px" }}
        /> */
}
