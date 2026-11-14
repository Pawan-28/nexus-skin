
import '../styles/chapter.css';

const chapters = [
  { id: 1, title: 'Introduction', time: '00:00', seconds: 0 },
  { id: 2, title: 'City Lights', time: '00:25', seconds: 25 },
  { id: 3, title: 'The Red Bridge', time: '00:50', seconds: 50 },
  { id: 4, title: 'Final Moments', time: '01:15', seconds: 75 },
];

function ChapterPanel({ onSelect, currentTime = 0 }) {
  const activeChapter = chapters.reduce((active, chapter) => {
    return currentTime >= chapter.seconds ? chapter.id : active;
  }, chapters[0].id);

  return (
    <section className="nexus-chapter-panel">
      <div className="nexus-chapter-heading">
        <span>CHAPTERS</span>
        <span>{chapters.length} SCENES</span>
      </div>

      <div className="nexus-chapter-list">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            type="button"
            className={
              activeChapter === chapter.id
                ? 'nexus-chapter active'
                : 'nexus-chapter'
            }
            onClick={() => onSelect?.(chapter.seconds)}
            aria-current={
              activeChapter === chapter.id ? 'true' : undefined
            }
          >
            <span className="nexus-chapter-number">
              {String(chapter.id).padStart(2, '0')}
            </span>

            <span className="nexus-chapter-title">
              {chapter.title}
            </span>

            <span className="nexus-chapter-time">
              {chapter.time}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ChapterPanel;
