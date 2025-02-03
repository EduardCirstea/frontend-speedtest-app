import React from "react";

interface Props {
  speedData: {
    downloadSpeed: string;

    uploadSpeed: string;

    latency: string;

    jitter: string;
  } | null;
}

const ShowSpeed: React.FC<Props> = ({ speedData }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "5rem",
        right: "23rem",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(4px)",
        padding: "1rem",
        borderRadius: "0.5rem",
        border: "1px solid rgba(0, 123, 255, 0.3)",
        zIndex: 1000,
        textAlign: "center",
        color: "#00ffcc",
        fontSize: "1.5rem",
        fontWeight: "bold",
      }}
    >
      {speedData ? (
        <>
          <p>Viteza Download: {speedData.downloadSpeed} Mbps</p>
          <p>Viteza Upload: {speedData.uploadSpeed} Mbps</p>
          <p>Latenta: {speedData.latency} ms</p>
          <p>Jitter: {speedData.jitter} ms</p>
        </>
      ) : (
        <>
          <p>Viteza Download:</p>
          <p>Viteza Upload:</p>
          <p>Latenta:</p>
          <p>Jitter:</p>
        </>
      )}
    </div>
  );
};

export default ShowSpeed;
