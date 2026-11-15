import { useState, useEffect, useRef } from 'react';
import SettingsPanel from './SettingsPanel';
import VolumeControl from './VolumeControl';
import { usePlayerControls } from '../hooks/usePlayerControls';

function formatTime(seconds = 0) {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function PlayerControls({ usePlayer }) {
  const { state, actions } = usePlayerControls(usePlayer);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  // Close settings when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={settingsRef}>
      <div className="nexus-control-group">
        <button
          type="button"
          className="nexus-button nexus-play-button"
          onClick={actions.togglePlay}
          aria-label={state.paused ? 'Play video' : 'Pause video'}
        >
          {state.paused ? '▶' : 'Ⅱ'}
        </button>

        <div className="nexus-time-display">
          <span>{formatTime(state.currentTime)}</span>
          <span className="nexus-time-separator">/</span>
          <span>{formatTime(state.duration)}</span>
        </div>

        <VolumeControl
          volume={state.volume}
          muted={state.muted}
          onVolumeChange={actions.setVolume}
          onToggleMute={actions.toggleMute}
        />

        <button
          type="button"
          className="nexus-button"
          onClick={actions.toggleFullscreen}
          aria-label={state.isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {state.isFullscreen ? '↙' : '⛶'}
        </button>

        <button
          type="button"
          className={`nexus-button nexus-settings-button ${settingsOpen ? 'active' : ''}`}
          onClick={() => setSettingsOpen((open) => !open)}
          aria-label="Playback settings"
          aria-expanded={settingsOpen}
        >
          ⚙
        </button>
      </div>

      {settingsOpen && (
        <SettingsPanel
          currentSpeed={state.playbackRate}
          onSpeedChange={actions.setSpeed}
          qualities={state.qualities}
          activeQuality={state.activeQuality}
          onQualityChange={actions.setQuality}
          onClose={() => setSettingsOpen(false)}
          disabled={state.playbackRateAvailability !== 'available'}
        />
      )}
    </div>
  );
}

export default PlayerControls;