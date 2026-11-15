import '../styles/chapter.css';

// Helper function seconds ko "MM:SS" mein badalne ke liye
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function ChapterPanel({ onSelect, currentTime = 0, chapters = [] }) {
  // Agar VTT load nahi hui toh fallback
  if (!chapters || chapters.length === 0) return null;

  const activeChapter = chapters.reduce((active, chapter) => {
    return currentTime >= chapter.startTime ? chapter : active;
  }, chapters[0]);

  return (
    <section className="nexus-chapter-panel">
      <div className="nexus-chapter-heading">
        <span>CHAPTERS</span>
        <span>{chapters.length} SCENES</span>
      </div>

      <div className="nexus-chapter-list">
        {chapters.map((chapter, index) => {
          const isActive = activeChapter?.startTime === chapter.startTime;
          
          return (
            <button
              key={index}
              type="button"
              className={`nexus-chapter ${isActive ? 'active' : ''}`}
              onClick={() => onSelect?.(chapter.startTime)}
              aria-current={isActive ? 'true' : undefined}
            >
              <span className="nexus-chapter-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="nexus-chapter-title">
                {chapter.text || `Chapter ${index + 1}`}
              </span>
              <span className="nexus-chapter-time">
                {formatTime(chapter.startTime)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default ChapterPanel;