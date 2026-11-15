const thumbnailTimes = [0, 15, 30, 45, 60, 75, 90];

function ThumbnailStrip({ playbackId, duration = 93, currentTime = 0, onSelect }) {
  const times = thumbnailTimes.filter((time) => time < duration);

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  if (!playbackId) return null;

  return (
    <div className="w-full mt-3">
      <div className="flex justify-between text-nexus-red text-[10px] font-bold tracking-[1.5px] mb-2 px-1">
        <span>VIDEO SCENES</span>
        <span className="text-gray-500">{times.length} THUMBNAILS</span>
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
        {times.map((time) => {
          const isActive = Math.abs(currentTime - time) < 15;
          return (
            <button
              key={time}
              onClick={() => onSelect?.(time)}
              className={`relative flex-shrink-0 overflow-hidden rounded-md transition-all duration-200 ${
                isActive 
                  ? 'border-2 border-nexus-red shadow-[0_0_10px_rgba(255,55,58,0.3)]' 
                  : 'border border-white/10 hover:border-nexus-red/50 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={`https://image.mux.com/${playbackId}/thumbnail.jpg?time=${time}&width=240&fit_mode=preserve`}
                alt={`Scene at ${formatTime(time)}`}
                className="w-[100px] md:w-[120px] aspect-video object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/80 px-1.5 py-0.5 text-left">
                <span className="text-white text-[9px] font-mono">{formatTime(time)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ThumbnailStrip;