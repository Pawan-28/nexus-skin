import { useState } from 'react';

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

function SettingsPanel({ 
  currentSpeed = 1, onSpeedChange, qualities = [], activeQuality, onQualityChange, onClose, disabled 
}) {
  const [activeTab, setActiveTab] = useState('speed');

  return (
    // Panel shifted right and bottom so it fits inside the mobile frame
    <div className="absolute right-0 bottom-[110%] z-50 w-[200px] sm:w-[260px] bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 border-b border-white/5">
        <h3 className="text-white font-semibold text-[10px] sm:text-xs tracking-wide">Settings</h3>
        <button onClick={onClose} className="p-1 rounded-md text-white/70 hover:bg-white/10 hover:text-white transition-colors">
          <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1L13 13M1 13L13 1"/></svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex p-1 mx-2 mt-2 sm:mx-3 sm:mt-3 bg-black/40 rounded-lg relative border border-white/5">
        <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-nexus-red/80 rounded-md shadow-sm transition-transform duration-300 ease-out ${activeTab === 'quality' ? 'translate-x-[100%]' : 'translate-x-0'}`} />
        <button onClick={() => setActiveTab('speed')} className={`flex-1 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-bold relative z-10 transition-colors ${activeTab === 'speed' ? 'text-white' : 'text-white/50'}`}>Speed</button>
        <button onClick={() => setActiveTab('quality')} className={`flex-1 py-1 sm:py-1.5 text-[9px] sm:text-[10px] font-bold relative z-10 transition-colors ${activeTab === 'quality' ? 'text-white' : 'text-white/50'}`}>Quality</button>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3">
        
        {/* Speed Tab */}
        {activeTab === 'speed' && (
          <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
            {playbackSpeeds.map((speed) => (
              <button
                key={speed}
                disabled={disabled}
                onClick={() => onSpeedChange(speed)}
                className={`py-1.5 rounded-md text-[9px] sm:text-[10px] font-semibold border transition-all duration-200 ${
                  currentSpeed === speed 
                  ? 'bg-nexus-red border-nexus-red text-white shadow-[0_0_10px_rgba(255,55,58,0.4)]' 
                  : 'bg-black/20 border-white/5 text-gray-400 hover:bg-nexus-red/20 hover:text-white'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {speed === 1 ? 'Normal' : `${speed}x`}
              </button>
            ))}
          </div>
        )}

        {/* Quality Tab */}
        {activeTab === 'quality' && (
          <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
            {qualities.length > 0 ? (
              qualities.map((q) => (
                <button
                  key={q.height}
                  onClick={() => onQualityChange(q.height)}
                  className={`py-1.5 rounded-md text-[9px] sm:text-[10px] font-semibold border transition-all duration-200 ${
                    activeQuality === q.height 
                    ? 'bg-nexus-red border-nexus-red text-white shadow-[0_0_10px_rgba(255,55,58,0.4)]' 
                    : 'bg-black/20 border-white/5 text-gray-400 hover:bg-nexus-red/20 hover:text-white'
                  }`}
                >
                  {q.height}p
                </button>
              ))
            ) : (
              <div className="col-span-2 text-center py-2">
                <p className="text-gray-300 text-[9px] font-medium">Auto Quality</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default SettingsPanel;