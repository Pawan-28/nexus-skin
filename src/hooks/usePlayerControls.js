import { useMemo, useState, useEffect } from 'react';

export function usePlayerControls(usePlayer) {
  const store = usePlayer();

  const paused = usePlayer((s) => s.paused);
  const muted = usePlayer((s) => s.muted);
  const volume = usePlayer((s) => s.volume);
  const currentTime = usePlayer((s) => s.currentTime);
  const duration = usePlayer((s) => s.duration);
  const isFullscreen = usePlayer((s) => s.isFullscreen);
  const playbackRate = usePlayer((s) => s.playbackRate);
  const playbackRateAvailability = usePlayer((s) => s.playbackRateAvailability);

  // 🚀 Video.js v10 Rendition List (Quality Fix)
  const videoRenditionList = usePlayer((s) => s.videoRenditionList || []);
  const activeVideoRendition = usePlayer((s) => s.activeVideoRendition);
  const selectVideoRendition = usePlayer((s) => s.selectVideoRendition);

  const [localQuality, setLocalQuality] = useState(null);

  useEffect(() => {
    if (activeVideoRendition?.height) {
      setLocalQuality(activeVideoRendition.height);
    }
  }, [activeVideoRendition]);

  const qualities = useMemo(() => {
    return videoRenditionList
      .filter((r) => r.height)
      .map((r) => ({ height: r.height, id: r.id }))
      .sort((a, b) => b.height - a.height);
  }, [videoRenditionList]);

  const setQuality = (height) => {
    setLocalQuality(height);
    const rendition = videoRenditionList.find((r) => r.height === height);
    if (rendition && selectVideoRendition) {
      selectVideoRendition(rendition.id);
    }
  };

  const actions = useMemo(() => ({
    togglePlay() {
      return paused ? store.play() : store.pause();
    },

    toggleMute() {
      return store.setMuted(!muted);
    },

    setVolume(value) {
      const vol = Math.max(0, Math.min(1, Number(value)));
      store.setVolume(vol);
      if (vol > 0 && muted) {
        store.setMuted(false);
      }
    },

    seek(seconds) {
      return store.seek(seconds);
    },

    setSpeed(speed) {
      return store.setPlaybackRate(speed);
    },

    setQuality(height) {
      setQuality(height);
    },

    async toggleFullscreen() {
      if (isFullscreen) {
        await store.exitFullscreen();
        window.screen?.orientation?.unlock?.();
        return;
      }

      await store.requestFullscreen();

      if (window.matchMedia('(max-width: 900px)').matches) {
        try {
          await window.screen?.orientation?.lock?.('landscape');
        } catch {
          // Orientation locking is unavailable or denied on some browsers.
        }
      }
    },
  }), [store, paused, muted, isFullscreen, videoRenditionList, selectVideoRendition]);

  return {
    store,
    state: {
      paused, muted, volume, currentTime, duration,
      isFullscreen, playbackRate, playbackRateAvailability,
      qualities, // 🚀 Ye pass karna zaroori tha
      activeQuality: localQuality // 🚀 Ye bhi
    },
    actions,
  };
}