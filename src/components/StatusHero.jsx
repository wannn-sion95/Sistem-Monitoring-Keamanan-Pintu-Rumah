const StatusHero = ({ status }) => {
  const isDanger = status === "BAHAYA";
  const isWaiting = status === "MENUNGGU...";

  if (isWaiting) {
    return (
      <div className="glass-card status-hero" style={{ padding: "2rem" }}>
        <span className="card-label">System Status</span>
        <div className="status-title" style={{ color: "#a1a1aa" }}>
          Menunggu Data Sinyal...
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card status-hero ${isDanger ? "danger" : "safe"}`}>
      <div className="status-icon">{isDanger ? "🚨" : "🛡️"}</div>
      <h2 className="status-title">
        {isDanger ? "PERINGATAN TERDETEKSI" : "SISTEM AMAN"}
      </h2>
      <p className="status-desc">
        {isDanger
          ? "Pergerakan tertangkap oleh sensor inframerah dan objek tervalidasi berada di dalam zona (< 50cm) dari pintu rumah."
          : "Monitoring aktif. Tidak ada pergerakan mencurigakan maupun objek di area pantau sensor."}
      </p>
    </div>
  );
};
export default StatusHero;
