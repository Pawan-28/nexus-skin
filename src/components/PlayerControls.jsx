import { useState, useEffect, useRef } from 'react';
import SettingsPanel from './SettingsPanel';
import VolumeControl from './VolumeControl';
import { usePlayerControls } from '../hooks/usePlayerControls';

function formatTime(seconds = 0) {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function PlayerControls({ usePlayer }) {
  const { state, actions } = usePlayerControls(usePlayer);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

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
    <div ref={settingsRef} className="relative w-full flex items-center justify-between gap-2 md:gap-4 mt-2">
      
      {/* Left Side: Play, Skip, Time */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
        <button
          onClick={actions.togglePlay}
          className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-gradient-to-br from-nexus-red to-nexus-darkRed text-white shadow-[0_4px_15px_rgba(255,55,58,0.4)] hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-nexus-lightRed"
          aria-label={state.paused ? 'Play' : 'Pause'}
        >
          {state.paused ? (
            <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          )}
        </button>

        <button 
          onClick={() => actions.seek(Math.max(0, state.currentTime - 10))}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-gray-300 hover:text-white hover:scale-110 transition-all focus:outline-none rounded-full"
          aria-label="Rewind 10 seconds"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
            <text x="12" y="16.5" fontSize="7.5" textAnchor="middle" fill="#FF373A" fontWeight="bold">10</text>
          </svg>
        </button>

        <div className="text-[10px] md:text-xs text-gray-300 font-medium font-mono whitespace-nowrap mx-1 md:mx-2">
          <span className="text-white">{formatTime(state.currentTime)}</span>
          <span className="mx-1 text-gray-600">/</span>
          <span className="hidden sm:inline">{formatTime(state.duration)}</span>
        </div>

        <button 
          onClick={() => actions.seek(Math.min(state.duration, state.currentTime + 10))}
          className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-gray-300 hover:text-white hover:scale-110 transition-all focus:outline-none rounded-full"
          aria-label="Forward 10 seconds"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.01 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/>
            <text x="12" y="16.5" fontSize="7.5" textAnchor="middle" fill="#FF373A" fontWeight="bold">10</text>
          </svg>
        </button>
      </div>

      {/* Right Side: Volume, Settings, Fullscreen */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
        <div className="hidden sm:block">
          <VolumeControl
            volume={state.volume}
            muted={state.muted}
            onVolumeChange={actions.setVolume}
            onToggleMute={actions.toggleMute}
          />
        </div>

        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-nexus-red ${
            settingsOpen ? 'bg-nexus-red/20 text-nexus-lightRed' : 'text-gray-300 hover:text-white'
          }`}
          aria-label="Settings"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>
        </button>

        <button
          onClick={actions.toggleFullscreen}
          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-gray-300 hover:text-white transition-all focus:outline-none rounded-lg"
          aria-label={state.isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        >
          {state.isFullscreen ? (
            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>
          ) : (
            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
          )}
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