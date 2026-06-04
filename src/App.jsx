import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import StatusHero from "./components/StatusHero";
import MetricsGrid from "./components/MetricsGrid";
import ActivityLog from "./components/ActivityLog";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [sensorData, setSensorData] = useState({
    status: "MENUNGGU...",
    jarak: "0",
  });
  const [logs, setLogs] = useState([]);
  const prevStatus = useRef("MENUNGGU...");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws");

    ws.onopen = () => console.log("WebSocket Terhubung!");

    ws.onmessage = (event) => {
      const incomingData = JSON.parse(event.data);
      setSensorData(incomingData);

      if (
        incomingData.status !== prevStatus.current &&
        incomingData.status !== "MENUNGGU..."
      ) {
        const timeNow = new Date().toLocaleTimeString("id-ID", {
          hour12: false,
        });
        setLogs((prevLogs) => {
          const newLog = {
            time: timeNow,
            status: incomingData.status,
            jarak: incomingData.jarak,
          };
          return [newLog, ...prevLogs].slice(0, 5);
        });
        prevStatus.current = incomingData.status;
      }
    };

    ws.onclose = () => console.log("WebSocket Terputus.");
    return () => ws.close();
  }, []);

  const isWaiting = sensorData.status === "MENUNGGU...";

  return (
    <div className="app-wrapper">
      <Navbar isWaiting={isWaiting} />

      <main className="main-grid">
        <StatusHero status={sensorData.status} />

        {!isWaiting && (
          <>
            <MetricsGrid jarak={sensorData.jarak} status={sensorData.status} />
            <ActivityLog logs={logs} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
