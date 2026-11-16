
import { useMemo } from 'react';

export function usePlayerControls(usePlayer) {
  const store = usePlayer();

  const state = usePlayer((s) => ({
    paused: s.paused,
    muted: s.muted,
    volume: s.volume,
    currentTime: s.currentTime,
    duration: s.duration,
    isFullscreen: s.isFullscreen,
    playbackRate: s.playbackRate,
    playbackRateAvailability: s.playbackRateAvailability,
  }));

  const actions = useMemo(() => ({
    togglePlay() {
      return state.paused ? store.play() : store.pause();
    },

    toggleMute() {
      return store.setMuted(!state.muted);
    },

    setVolume(value) {
      const volume = Math.max(0, Math.min(1, Number(value)));
      store.setVolume(volume);
      if (volume > 0 && state.muted) {
        store.setMuted(false);
      }
    },

    seek(seconds) {
      return store.seek(seconds);
    },

    setSpeed(speed) {
      return store.setPlaybackRate(speed);
    },

    async toggleFullscreen() {
      if (state.isFullscreen) {
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
  }), [store, state]);

  return { store, state, actions };
}
