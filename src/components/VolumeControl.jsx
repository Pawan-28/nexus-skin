
function VolumeControl({
  volume = 1,
  muted = false,
  onVolumeChange,
  onToggleMute,
}) {
  const currentVolume = muted ? 0 : volume;

  return (
    <div className="nexus-volume-control">
      <button
        type="button"
        className="nexus-button nexus-volume-button"
        onClick={onToggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        {currentVolume === 0 ? '🔇' : currentVolume < 0.5 ? '🔉' : '🔊'}
      </button>

      <input
        className="nexus-volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={currentVolume}
        onChange={(event) => onVolumeChange?.(event.target.value)}
        aria-label="Volume"
        style={{
          '--volume-level': `${currentVolume * 100}%`,
        }}
      />
    </div>
  );
}

export default VolumeControl;
