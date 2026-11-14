
function PlayerHeader({
  title = 'The Beauty of Nature',
  subtitle = 'A cinematic journey through our world.',
  quality = 'NEXUS EDITION',
  status = 'NOW PLAYING',
}) {
  return (
    <header className="nexus-player-header">

      <div className="nexus-header-left">
        <div className="nexus-header-icon">
          N
        </div>

        <div className="nexus-header-info">
          <span className="nexus-header-status">
            <span className="nexus-status-dot" />
            {status}
          </span>

          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="nexus-header-right">
        <span className="nexus-quality-badge">
          {quality}
        </span>
      </div>

    </header>
  );
}

export default PlayerHeader;
