import React, { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import ConnectionChart from "./ConnectionChart";
interface ConnectionParamsType {
  downloadSpeed: number;
  uploadSpeed: number;
  packetLoss: number;
  latency: number;
  jitter: number;
}

interface ChartData {
  time: string;
  downloadSpeed: number;
  uploadSpeed: number;
}
const mapContainerStyle = {
  width: "100%",
  height: "500px",
};
const center = { lat: 45.9432, lng: 24.9668 }; // Centrul României

const ConnectionParams: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [params, setParams] = useState<ConnectionParamsType | null>(null);
  const [history, setHistory] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [networkData, setNetworkData] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      //   setError(null);
    });
    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err);
      setError("Failed to connect to server");
      setLoading(false);
    });
    newSocket.on("networkParams", (data: ConnectionParamsType) => {
      setParams(data);
      console.log(data);
      setHistory((prevHistory) => [
        ...prevHistory.slice(-19),
        {
          time: new Date().toLocaleTimeString(),
          downloadSpeed: data.downloadSpeed,
          uploadSpeed: data.uploadSpeed,
        },
      ]);
      setLoading(false);
    });
    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
      setError("Disconnected from server");
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Network Connection Parameters</h2>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <ul className="space-y-2">
            <li>Download Speed: {params?.downloadSpeed.toFixed(1)} Mbps</li>
            <li>Upload Speed: {params?.uploadSpeed.toFixed(1)} Mbps</li>
            <li>Packet Loss: {params?.packetLoss.toFixed(2)}%</li>
            <li>Latency: {params?.latency.toFixed(1)} ms</li>
            <li>Jitter: {params?.jitter.toFixed(1)} ms</li>
          </ul>
          {history.length > 0 && <ConnectionChart data={history} />}
        </>
      )}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div>
        <LoadScript googleMapsApiKey="AIzaSyBzKPfTdUGy04Ve8JxOfHTBi--U29UGk84">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={6}
          >
            {/* {networkData.map((data, index) => (
              <Marker
                key={index}
                position={data.location}
                title={`Download: ${data.downloadSpeed} Mbps, Upload: ${data.uploadSpeed} Mbps`}
              />
            ))} */}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};
export default ConnectionParams;
