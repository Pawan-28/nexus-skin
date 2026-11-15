function ChapterPanel({ onSelect, currentTime = 0, chapters = [] }) {
  if (!chapters || chapters.length === 0) return null;

  const activeChapter = chapters.reduce((active, chapter) => {
    return currentTime >= chapter.startTime ? chapter : active;
  }, chapters[0]);

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between text-nexus-red text-[10px] font-bold tracking-[1.5px] mb-2 px-1">
        <span>CHAPTERS</span>
        <span>{chapters.length} SCENES</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {chapters.map((chapter, i) => {
          const isActive = activeChapter?.startTime === chapter.startTime;
          return (
            <button
              key={i}
              onClick={() => onSelect?.(chapter.startTime)}
              className={`flex flex-col items-start p-2.5 rounded-lg border text-left transition-all duration-200 ${
                isActive 
                  ? 'bg-nexus-red/10 border-nexus-red/80 shadow-[inset_3px_0_0_#FF373A]' 
                  : 'bg-[#191919]/80 backdrop-blur-sm border-white/10 hover:border-nexus-red/50 hover:bg-nexus-red/5'
              }`}
            >
              <span className="text-nexus-lightRed text-[9px] font-extrabold">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-white text-[11px] font-semibold truncate w-full">{chapter.text}</span>
              <span className="text-gray-400 text-[9px] font-mono mt-0.5">
                {Math.floor(chapter.startTime / 60).toString().padStart(2, '0')}:{Math.floor(chapter.startTime % 60).toString().padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default ChapterPanel;