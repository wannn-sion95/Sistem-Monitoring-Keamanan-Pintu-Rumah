const Navbar = ({ isWaiting }) => {
  return (
    <nav className="navbar">
      <div className="nav-brand">Sistem Monitoring Keamanan Pintu Rumah</div>
      <div className="nav-status">
        <div className={`dot ${isWaiting ? "wait" : "live"}`}></div>
        {isWaiting ? "Connecting to MQTT..." : "Sistem Aktif"}
      </div>
    </nav>
  );
};
export default Navbar;
