import { useCallback } from 'react';

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
  
  // NAYA: Quality state
  const qualities = usePlayer((s) => s.qualities || []);
  const activeQuality = usePlayer((s) => s.activeQuality);

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

  const seek = useCallback((seconds) => {
    store.seek(seconds);
  }, [store]);

  const setSpeed = useCallback((speed) => {
    store.setPlaybackRate(speed);
  }, [store]);

  // NAYA: Quality change function
  const setQuality = useCallback((height) => {
    if (store.setQuality) {
      store.setQuality(height);
    }
  }, [store]);

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
      qualities, activeQuality // Pass quality state
    },
    actions: { 
      togglePlay, toggleMute, setVolume, seek, setSpeed, 
      toggleFullscreen, setQuality // Pass action
    }
  };
}