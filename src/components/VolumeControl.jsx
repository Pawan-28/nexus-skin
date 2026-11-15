function VolumeControl({ volume = 1, muted = false, onVolumeChange, onToggleMute }) {
  const currentVolume = muted ? 0 : volume;

  return (
    <div className="flex items-center gap-2 group/volume">
      <button onClick={onToggleMute} className="text-white hover:text-nexus-red transition-colors">
        {currentVolume === 0 ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
        ) : currentVolume < 0.5 ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        )}
      </button>
      
      {/* Thicker Volume Slider */}
      <input
        type="range"
        min="0" max="1" step="0.01"
        value={currentVolume}
        onChange={(e) => onVolumeChange?.(e.target.value)}
        className="w-16 md:w-24 h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer accent-nexus-red hover:bg-white/40 transition-colors"
      />
    </div>
  );
}

export default VolumeControl;