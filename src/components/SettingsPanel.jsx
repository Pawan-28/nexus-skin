import { useState } from 'react';
import '../styles/settings.css';

const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

function SettingsPanel({ 
  currentSpeed = 1, 
  onSpeedChange, 
  qualities = [], 
  activeQuality, 
  onQualityChange, 
  onClose, 
  disabled = false 
}) {
  const [activeTab, setActiveTab] = useState('speed');

  return (
    <div className="nexus-settings">
      {/* Header */}
      <div className="nexus-settings-header">
        <h3>Settings</h3>
        <button type="button" className="nexus-close-btn" onClick={onClose} aria-label="Close settings">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="nexus-tabs-container">
        <div className={`nexus-tab-slider ${activeTab === 'quality' ? 'right' : ''}`} />
        <button 
          type="button" 
          className={`nexus-tab ${activeTab === 'speed' ? 'active' : ''}`} 
          onClick={() => setActiveTab('speed')}
        >
          Speed
        </button>
        <button 
          type="button" 
          className={`nexus-tab ${activeTab === 'quality' ? 'active' : ''}`} 
          onClick={() => setActiveTab('quality')}
        >
          Quality
        </button>
      </div>

      {/* Content */}
      <div className="nexus-settings-content">
        {activeTab === 'speed' && (
          <div className="nexus-tab-pane">
            <h4>Playback Speed</h4>
            <div className="nexus-speed-options">
              {playbackSpeeds.map((speed) => (
                <button
                  type="button"
                  key={speed}
                  disabled={disabled}
                  className={currentSpeed === speed ? 'selected' : ''}
                  onClick={() => onSpeedChange?.(speed)}
                >
                  {speed === 1 ? 'Normal' : `${speed}x`}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quality' && (
          <div className="nexus-tab-pane">
            <h4>Video Resolution</h4>
            {qualities.length > 0 ? (
              <div className="nexus-quality-options">
                {qualities.map((q) => (
                  <button
                    type="button"
                    key={q.height}
                    className={activeQuality === q.height ? 'selected' : ''}
                    onClick={() => onQualityChange?.(q.height)}
                  >
                    {q.height}p
                  </button>
                ))}
              </div>
            ) : (
              <p className="nexus-no-data">Auto Quality (Mux Stream)</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPanel;