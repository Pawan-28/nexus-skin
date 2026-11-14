
import '../styles/controls.css';

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

function SettingsPanel({
  currentSpeed = 1,
  onSpeedChange,
  onClose,
  disabled = false,
}) {
  return (
    <div className="nexus-settings">
      <div className="nexus-settings-header">
        <h3>Playback Settings</h3>
        <button type="button" onClick={onClose} aria-label="Close settings">
          ×
        </button>
      </div>

      <div className="nexus-settings-content">
        <h4>Playback Speed</h4>

        <div className="nexus-speed-options">
          {playbackSpeeds.map((speed) => (
            <button
              type="button"
              key={speed}
              disabled={disabled}
              className={currentSpeed === speed ? 'selected' : ''}
              onClick={() => onSpeedChange?.(speed)}
              aria-pressed={currentSpeed === speed}
            >
              {speed === 1 ? 'Normal' : `${speed}x`}
            </button>
          ))}
        </div>

        {disabled && (
          <p>Playback speed is not supported by this video.</p>
        )}
      </div>
    </div>
  );
}

export default SettingsPanel;
