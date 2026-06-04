
const Header = ({ isWaiting }) => {
  return (
    <div className="neo-box header-container">
      <div className="header-title">
        <h1>Sistem Monitoring <br /> Keamanan Pintu Rumah</h1>
        <p>Kelompok 18 </p>
      </div>

      <div className="connection-badge">
        <div className={`dot ${isWaiting ? "waiting" : "live"}`}></div>
        <span>{isWaiting ? "MENUNGGU DATA" : "SISTEM ONLINE"}</span>
      </div>
    </div>
  );
};

export default Header;
