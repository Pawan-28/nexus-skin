import { useState } from 'react';

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

function SettingsPanel({ 
  currentSpeed = 1, onSpeedChange, qualities = [], activeQuality, onQualityChange, onClose, disabled 
}) {
  const [activeTab, setActiveTab] = useState('speed');

  return (
    <div className="absolute right-0 bottom-14 z-50 w-[260px] bg-[#0a0a0a]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <h3 className="text-white font-semibold text-xs tracking-wide">Playback Settings</h3>
        <button onClick={onClose} className="p-1 rounded-md text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1L13 13M1 13L13 1"/></svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex p-1 mx-3 mt-3 bg-black/60 rounded-lg relative">
        <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#2A2A2A] rounded-md shadow-sm transition-transform duration-300 ease-out ${activeTab === 'quality' ? 'translate-x-[100%]' : 'translate-x-0'}`} />
        <button onClick={() => setActiveTab('speed')} className={`flex-1 py-1.5 text-[11px] font-semibold relative z-10 transition-colors ${activeTab === 'speed' ? 'text-white' : 'text-gray-500'}`}>Speed</button>
        <button onClick={() => setActiveTab('quality')} className={`flex-1 py-1.5 text-[11px] font-semibold relative z-10 transition-colors ${activeTab === 'quality' ? 'text-white' : 'text-gray-500'}`}>Quality</button>
      </div>

      {/* Content */}
      <div className="p-3">
        {activeTab === 'speed' && (
          <div className="grid grid-cols-3 gap-1.5">
            {playbackSpeeds.map((speed) => (
              <button
                key={speed}
                disabled={disabled}
                onClick={() => onSpeedChange(speed)}
                className={`py-1.5 rounded-md text-[10px] font-medium border transition-all duration-200 ${
                  currentSpeed === speed 
                  ? 'bg-nexus-red border-nexus-red text-white shadow-[0_2px_10px_rgba(255,55,58,0.3)]' 
                  : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-white'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {speed === 1 ? 'Normal' : `${speed}x`}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="grid grid-cols-3 gap-1.5">
            {qualities.length > 0 ? (
              qualities.map((q) => (
                <button
                  key={q.height}
                  onClick={() => onQualityChange(q.height)}
                  className={`py-1.5 rounded-md text-[10px] font-medium border transition-all duration-200 ${
                    activeQuality === q.height 
                    ? 'bg-nexus-red border-nexus-red text-white shadow-[0_2px_10px_rgba(255,55,58,0.3)]' 
                    : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {q.height}p
                </button>
              ))
            ) : (
              <div className="col-span-3 text-center py-3">
                <p className="text-gray-300 text-[10px] font-medium">Auto (Mux Stream)</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPanel;