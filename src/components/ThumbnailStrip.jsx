
const thumbnailTimes = [0, 15, 30, 45, 60, 75, 90];

function ThumbnailStrip({
  playbackId,
  duration = 93,
  currentTime = 0,
  onSelect,
}) {
  const times = thumbnailTimes.filter(
    (time) => time < duration
  );

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, '0')}:${String(
      remaining
    ).padStart(2, '0')}`;
  }

  if (!playbackId) return null;

  return (
    <section className="nexus-thumbnail-section">
      <div className="nexus-thumbnail-heading">
        <span>VIDEO SCENES</span>
        <span>{times.length} THUMBNAILS</span>
      </div>

      <div className="nexus-thumbnail-strip">
        {times.map((time) => (
          <button
            type="button"
            key={time}
            className={
              Math.abs(currentTime - time) < 15
                ? 'nexus-thumbnail active'
                : 'nexus-thumbnail'
            }
            onClick={() => onSelect?.(time)}
            aria-label={`Seek to ${formatTime(time)}`}
            aria-current={
              Math.abs(currentTime - time) < 15 ? 'true' : undefined
            }
          >
            <img
              src={`https://image.mux.com/${playbackId}/thumbnail.jpg?time=${time}&width=240&fit_mode=preserve`}
              alt={`Video scene at ${formatTime(time)}`}
              loading="lazy"
            />

            <span>{formatTime(time)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default ThumbnailStrip;
