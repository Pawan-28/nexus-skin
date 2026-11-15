import { useState } from 'react';

function VolumeControl({ volume = 1, muted = false, onVolumeChange, onToggleMute }) {
  const currentVolume = muted ? 0 : volume;
  const [isHovered, setIsHovered] = useState(false);

  // Toggle slider on tap/click
  const handleToggleSlider = (e) => {
    e.stopPropagation();
    setIsHovered(!isHovered);
  };

  return (
    <div 
      className="relative flex items-center justify-center py-2 z-50 pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Vertical Slider Popup */}
      <div 
        className={`absolute bottom-full mb-2 flex flex-col items-center justify-center bg-[#1A1A1A]/90 backdrop-blur-xl border border-white/10 rounded-full py-3 px-1.5 transition-all duration-300 origin-bottom ${
          isHovered ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
        style={{ height: '110px' }}
      >
        <input
          type="range"
          min="0" max="1" step="0.01"
          value={currentVolume}
          onChange={(e) => onVolumeChange?.(e.target.value)}
          className="accent-nexus-red cursor-pointer"
          style={{
            writingMode: 'vertical-lr',
            direction: 'rtl',
            width: '4px',
            height: '80px'
          }}
        />
      </div>

      <button 
        onClick={handleToggleSlider}
        className="text-white/80 hover:text-nexus-red transition-colors p-1 cursor-pointer z-50"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {currentVolume === 0 ? (
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
        ) : currentVolume < 0.5 ? (
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        ) : (
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
        )}
      </button>
    </div>
  );
}

export default VolumeControl;