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
  const progressBarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSeek = (e) => {
    if (!progressBarRef.current || !state.duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const seekTime = Math.max(0, Math.min(1, pos)) * state.duration;
    actions.seek(seekTime);
  };

  const progressPercent = state.duration ? (state.currentTime / state.duration) * 100 : 0;

  return (
    <div ref={settingsRef} className="relative w-full flex flex-col gap-1.5 px-3 sm:px-5 py-2 pointer-events-auto min-h-[56px] justify-center">
      
      {/* Buttons Row */}
      <div className="w-full flex items-center justify-between z-50 h-8 sm:h-10">
        
        {/* Left Side */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 h-full">
          <button
            onClick={actions.togglePlay}
            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-nexus-red text-white hover:scale-105 transition-all shadow-md shrink-0 cursor-pointer z-50"
          >
            <div className="w-4 h-4 flex items-center justify-center">
              {state.paused ? (
                <svg className="w-3.5 h-3.5 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              ) : (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              )}
            </div>
          </button>

          <button onClick={() => actions.seek(Math.max(0, state.currentTime - 10))} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer shrink-0 z-50">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
              <text x="12" y="15" fontSize="8" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="bold">10</text>
            </svg>
          </button>

          <div className="text-[10px] sm:text-xs text-gray-300 font-mono font-medium shrink-0 z-50 flex items-center justify-center min-w-[70px] sm:min-w-[90px]">
            {formatTime(state.currentTime)} <span className="text-gray-500 mx-1">/</span> {formatTime(state.duration)}
          </div>

          <button onClick={() => actions.seek(Math.min(state.duration, state.currentTime + 10))} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer shrink-0 z-50">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" />
              <text x="12" y="15" fontSize="8" textAnchor="middle" fill="currentColor" stroke="none" fontWeight="bold">10</text>
            </svg>
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 z-50 pointer-events-auto h-full">
          <VolumeControl
            volume={state.volume}
            muted={state.muted}
            onVolumeChange={actions.setVolume}
            onToggleMute={actions.toggleMute}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSettingsOpen(!settingsOpen);
            }}
            className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full transition-all shrink-0 cursor-pointer z-50 ${
              settingsOpen ? 'text-nexus-red bg-white/10' : 'text-white/80 hover:text-white'
            }`}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>

          <button
            onClick={actions.toggleFullscreen}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-white/80 hover:text-white transition-colors shrink-0 cursor-pointer z-50"
          >
            {state.isFullscreen ? (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
            ) : (
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div 
        className="relative w-full h-2 flex items-center cursor-pointer group/timeline touch-none mt-1 z-50"
        onPointerDown={handleSeek}
        onPointerMove={(e) => { if (e.buttons === 1) handleSeek(e); }}
      >
        <div 
          ref={progressBarRef} 
          className="relative w-full h-[3px] bg-white/20 rounded-full overflow-hidden group-hover/timeline:h-1 transition-all duration-200"
        >
          <div 
            className="absolute top-0 left-0 h-full bg-nexus-red rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-sm transition-transform group-hover/timeline:scale-125 z-50 pointer-events-none"
          style={{ left: `calc(${progressPercent}% - 4px)` }}
        />
      </div>

      {settingsOpen && (
        <div className="absolute inset-0 top-0 left-0 w-full h-full pointer-events-none flex items-end justify-end pb-12 pr-2 z-50">
           <SettingsPanel
              currentSpeed={state.playbackRate}
              onSpeedChange={actions.setSpeed}
              qualities={state.qualities}
              activeQuality={state.activeQuality}
              onQualityChange={actions.setQuality}
              onClose={() => setSettingsOpen(false)}
              disabled={state.playbackRateAvailability !== 'available'}
            />
        </div>
      )}
    </div>
  );
}

export default PlayerControls;