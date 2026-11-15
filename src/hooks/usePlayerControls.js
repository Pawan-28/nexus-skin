import { useCallback, useMemo, useState, useEffect } from 'react';

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
  
  // Video.js v10 Mux Renditions
  const videoRenditionList = usePlayer((s) => s.videoRenditionList || []);
  const activeVideoRendition = usePlayer((s) => s.activeVideoRendition);
  const selectVideoRendition = usePlayer((s) => s.selectVideoRendition);

  // Local state for instant UI feedback
  const [localQuality, setLocalQuality] = useState(null);

  // Sync local state with actual player state when it catches up
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

  // Instant UI highlight
  const setQuality = useCallback((height) => {
    setLocalQuality(height); // Update UI immediately
    const rendition = videoRenditionList.find((r) => r.height === height);
    if (rendition && selectVideoRendition) {
      selectVideoRendition(rendition.id); // Tell player to load
    }
  }, [videoRenditionList, selectVideoRendition]);

  const togglePlay = useCallback(() => {
    paused ? store.play() : store.pause();
  }, [paused, store]);

  const toggleMute = useCallback(() => {
    store.setMuted(!muted);
  }, [muted, store]);

  const setVolume = useCallback((val) => {
    const vol = Math.max(0, Math.min(1, Number(val)));
    store.setVolume(vol);
    if (vol > 0 && muted) store.setMuted(false);
  }, [store, muted]);

  const seek = useCallback((seconds) => store.seek(seconds), [store]);
  const setSpeed = useCallback((speed) => store.setPlaybackRate(speed), [store]);

  const toggleFullscreen = useCallback(async () => {
    if (isFullscreen) {
      await store.exitFullscreen();
      window.screen?.orientation?.unlock?.();
    } else {
      await store.requestFullscreen();
      if (window.matchMedia('(max-width: 900px)').matches) {
        try { await window.screen?.orientation?.lock?.('landscape'); } catch {}
      }
    }
  }, [isFullscreen, store]);

  return {
    store,
    state: { 
      paused, muted, volume, currentTime, duration, 
      isFullscreen, playbackRate, playbackRateAvailability, 
      qualities, 
      activeQuality: localQuality // Use local state for UI
    },
    actions: { togglePlay, toggleMute, setVolume, seek, setSpeed, toggleFullscreen, setQuality }
  };
}