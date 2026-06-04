const Footer = () => {
  return (
    <footer className="footer">
      <div>Kelompok 18 • Sistem Monitoring Pintu</div>
      <div style={{ display: "flex", gap: "15px" }}>
        <span>Hardware: ESP32</span>
        <span>Network: MQTT</span>
      </div>
    </footer>
  );
};
export default Footer;
