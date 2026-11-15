import { useState } from 'react';

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

function SettingsPanel({
  currentSpeed = 1,
  onSpeedChange,
  qualities = [],
  activeQuality,
  onQualityChange,
  onClose,
  disabled
}) {
  const [activeMenu, setActiveMenu] = useState('main');

  // 🚀 Professional iOS Style Icons 🚀
  const QualityIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h4" />
      <path d="M16 12h2" />
    </svg>
  );

  const SpeedIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );

  const BackIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );

  const CheckIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );

  return (
    <div
      className="
        absolute right-0
        bottom-full mb-2
        w-[200px] sm:w-[240px]
        
        /* 🚀 Solid Glass Background 🚀 */
        bg-[#1A1A1A]/95
        backdrop-blur-2xl
        border border-white/10
        rounded-xl
        shadow-[0_10px_40px_rgba(0,0,0,0.8)]
        
        overflow-hidden
        pointer-events-auto
        z-[100]
        flex flex-col
      "
    >
      {/* MAIN MENU */}
      {activeMenu === 'main' && (
        <div className="flex flex-col py-1">
          <button
            onClick={() => setActiveMenu('quality')}
            className="group flex items-center justify-between px-4 py-3.5 text-white hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-white/70 group-hover:text-white transition-colors"><QualityIcon /></span>
              <span className="text-sm font-medium">Quality</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/40">
              <span className="text-[11px] font-medium">{activeQuality ? `${activeQuality}p` : 'Auto'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </div>
          </button>

          <div className="h-px bg-white/5 mx-3" />

          <button
            onClick={() => setActiveMenu('speed')}
            className="group flex items-center justify-between px-4 py-3.5 text-white hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span className="text-white/70 group-hover:text-white transition-colors"><SpeedIcon /></span>
              <span className="text-sm font-medium">Speed</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/40">
              <span className="text-[11px] font-medium">{currentSpeed === 1 ? 'Normal' : `${currentSpeed}x`}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </div>
          </button>
        </div>
      )}

      {/* SPEED SUBMENU */}
      {activeMenu === 'speed' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 px-2 py-2.5 border-b border-white/10">
            <button onClick={() => setActiveMenu('main')} className="p-1.5 rounded-md text-white/70 hover:bg-white/10 hover:text-white transition-colors">
              <BackIcon />
            </button>
            <span className="text-white text-xs font-semibold">Playback Speed</span>
          </div>
          {/* 🚀 Scrollable List with 2 items visible 🚀 */}
          <div className="flex flex-col py-1 max-h-[70px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {playbackSpeeds.map((speed) => (
              <button
                key={speed}
                disabled={disabled}
                onClick={() => { onSpeedChange(speed); setActiveMenu('main'); }}
                className={`flex items-center justify-between px-4 py-2 transition-all duration-200 hover:bg-white/10 ${currentSpeed === speed ? 'bg-white/10' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span className={`text-xs ${currentSpeed === speed ? 'text-nexus-red font-bold' : 'text-white'}`}>
                  {speed === 1 ? 'Normal' : `${speed}x`}
                </span>
                {currentSpeed === speed && <span className="text-nexus-red"><CheckIcon /></span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUALITY SUBMENU */}
      {activeMenu === 'quality' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2 px-2 py-2.5 border-b border-white/10">
            <button onClick={() => setActiveMenu('main')} className="p-1.5 rounded-md text-white/70 hover:bg-white/10 hover:text-white transition-colors">
              <BackIcon />
            </button>
            <span className="text-white text-xs font-semibold">Video Quality</span>
          </div>
          {/* 🚀 Scrollable List with 2 items visible 🚀 */}
          <div className="flex flex-col py-1 max-h-[70px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {qualities.length > 0 ? (
              qualities.map((q) => (
                <button
                  key={q.height}
                  onClick={() => { onQualityChange(q.height); setActiveMenu('main'); }}
                  className={`flex items-center justify-between px-4 py-2 transition-all duration-200 hover:bg-white/10 ${activeQuality === q.height ? 'bg-white/10' : ''}`}
                >
                  <span className={`text-xs ${activeQuality === q.height ? 'text-nexus-red font-bold' : 'text-white'}`}>
                    {q.height}p
                  </span>
                  {activeQuality === q.height && <span className="text-nexus-red"><CheckIcon /></span>}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-xs text-white/80">Auto Quality</div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default SettingsPanel;