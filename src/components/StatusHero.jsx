const StatusHero = ({ status }) => {
  const isDanger = status === "BAHAYA";
  const isWarning = status === "WASPADA";
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

  // Atur warna dan pesan berdasarkan 3 status
  let heroClass = "safe";
  let icon = "🛡️";
  let title = "SISTEM AMAN";
  let desc =
    "Monitoring aktif. Tidak ada anomali pergerakan di area pantau sensor.";

  if (isDanger) {
    heroClass = "danger";
    icon = "🚨";
    title = "INTRUSI TERDETEKSI";
    desc =
      "Pergerakan tertangkap dan objek berada di dalam zona kritis (< 50cm).";
  } else if (isWarning) {
    heroClass = "warning"; // Kita akan buat CSS nya di bawah
    icon = "⚠️";
    title = "STATUS WASPADA";
    desc =
      "Sensor PIR mendeteksi pergerakan, namun objek masih berada di luar zona aman (> 50cm).";
  }

  return (
    <div className={`glass-card status-hero ${heroClass}`}>
      <div className="status-icon">{icon}</div>
      <h2 className="status-title">{title}</h2>
      <p className="status-desc">{desc}</p>
    </div>
  );
};
export default StatusHero;
