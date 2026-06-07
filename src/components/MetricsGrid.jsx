const MetricsGrid = ({ jarak, status }) => {
  // Menentukan teks PIR
  const isPirActive = status === "BAHAYA" || status === "WASPADA";

  // Menentukan warna PIR yang dinamis sesuai 3 level status
  let pirColor = "#10b981"; // Default: Hijau (Aman)
  if (status === "BAHAYA") {
    pirColor = "#ef4444"; // Merah (Bahaya)
  } else if (status === "WASPADA") {
    pirColor = "#f59e0b"; // Kuning (Waspada)
  }

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
        {/* Terapkan pirColor ke dalam styling */}
        <div
          className="metric-value"
          style={{ fontSize: "2.5rem", color: pirColor, marginTop: "10px" }}
        >
          {isPirActive ? "TERDETEKSI" : "STANDBY"}
        </div>
      </div>
    </div>
  );
};

export default MetricsGrid;
