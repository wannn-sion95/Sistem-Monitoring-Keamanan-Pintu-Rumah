const MetricsGrid = ({ jarak, status }) => {
  const isDanger = status === "BAHAYA";

  return (
    <div className="metrics-container">
      <div className="glass-card">
        <span className="card-label">Jarak Objek (Ultrasonic)</span>
        <div className="metric-value">
          {jarak}
          <span className="metric-unit">cm</span>
        </div>
      </div>

      <div className="glass-card">
        <span className="card-label">Sensor Gerak (PIR)</span>
        <div
          className="metric-value"
          style={{
            fontSize: "2.5rem",
            color: isDanger ? "#ef4444" : "#10b981",
            marginTop: "10px",
          }}
        >
          {isDanger ? "AKTIF" : "STANDBY"}
        </div>
      </div>
    </div>
  );
};
export default MetricsGrid;
