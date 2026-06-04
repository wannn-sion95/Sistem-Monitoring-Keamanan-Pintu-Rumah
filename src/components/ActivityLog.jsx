const ActivityLog = ({ logs }) => {
  return (
    <div className="glass-card">
      <span className="card-label">Riwayat Aktivitas Terbaru</span>

      <div className="log-table-wrapper">
        <table className="log-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Telemetri Jarak</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "center",
                    color: "#a1a1aa",
                    padding: "2rem",
                  }}
                >
                  Belum ada log aktivitas yang tercatat.
                </td>
              </tr>
            ) : (
              logs.map((log, index) => (
                <tr key={index}>
                  <td className="log-time">{log.time}</td>
                  <td>
                    <span
                      className={`badge ${log.status === "BAHAYA" ? "bahaya" : "aman"}`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="log-time">{log.jarak} cm</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ActivityLog;
