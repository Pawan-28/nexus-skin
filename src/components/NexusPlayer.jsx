import { useState, useEffect, useRef } from 'react';
import {
  createPlayer, Container, Controls, Hotkey, 
  StatusAnnouncer
} from '@videojs/react';
import { videoFeatures } from '@videojs/react/video';
import { MuxVideo } from '@videojs/react/media/mux-video';

import PlayerControls from './PlayerControls';
import PlayerHeader from './PlayerHeader';
import ChapterPanel from './ChapterPanel';

const VIDEOS = [
  { id: 'YZJkPyAC01idtK5HuPp02sXMGWERdZ8q2Ii5ELXQMcQYA', title: 'NEXUS PROOF PLAYER - Cinematic' },
  { id: 'UhHqlIT8pmJD6RTrES3VzzcVTuPJmoj02WuiN4cjSHm8', title: 'NEXUS PROOF PLAYER - Abstract' },
  { id: 'MK3ZtvMhy3R3xSG15BbK4W01BfzRjD01f01kAdnpQv4jIk', title: 'NEXUS PROOF PLAYER - Nature' }
];

const { Player, usePlayer } = createPlayer({ features: videoFeatures });

function NexusSkin({ children, title, onVideoChange, onPreviousVideo, currentVideoIndex, autoPlay }) {
  const store = usePlayer();
  const currentTime = usePlayer((s) => s.currentTime);
  const isPaused = usePlayer((s) => s.paused);
  const isMuted = usePlayer((s) => s.muted);
  const isFullscreen = usePlayer((s) => s.isFullscreen);
  const volume = usePlayer((s) => s.volume);
  
  const [chapters, setChapters] = useState([]);
  const [controlsVisible, setControlsVisible] = useState(true);
  const timeoutRef = useRef(null);

  // Chapters Load
  useEffect(() => {
    const track = document.querySelector('track[kind="chapters"]');
    if (track && track.track) {
      const cues = Array.from(track.track.cues || []);
      setChapters(cues.map((cue) => ({
        startTime: cue.startTime,
        endTime: cue.endTime,
        text: cue.text,
      })));
    }
  }, [currentVideoIndex]);

  // 🚀 Auto-Play Logic 🚀
  useEffect(() => {
    if (autoPlay) {
      setTimeout(() => {
        store.play().catch(() => {
          console.log("Autoplay blocked by browser.");
        });
      }, 100);
    }
  }, [autoPlay, store]);

  // 🚀 Auto-Hide Logic 🚀
  const resetTimeout = () => {
    setControlsVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (isPaused) return;
    timeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    resetTimeout();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPaused]);

  const handleInteraction = () => {
    resetTimeout();
  };

  // 🚀 FULL KEYBOARD SHORTCUTS (Fullscreen + Normal) 🚀
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input or textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();

      switch (key) {
        case ' ':
        case 'k':
          e.preventDefault();
          isPaused ? store.play() : store.pause();
          break;
        case 'm':
          e.preventDefault();
          store.setMuted(!isMuted);
          break;
        case 'arrowup':
          e.preventDefault();
          store.setVolume(Math.min(1, volume + 0.1));
          break;
        case 'arrowdown':
          e.preventDefault();
          store.setVolume(Math.max(0, volume - 0.1));
          break;
        case 'arrowright':
        case 'l':
          e.preventDefault();
          // Guidelines: ArrowRight = 5s, L = 10s
          const forwardTime = key === 'l' ? 10 : 5;
          store.seek(Math.min(store.duration, currentTime + forwardTime));
          break;
        case 'arrowleft':
        case 'j':
          e.preventDefault();
          // Guidelines: ArrowLeft = 5s, J = 10s
          const backwardTime = key === 'j' ? 10 : 5;
          store.seek(Math.max(0, currentTime - backwardTime));
          break;
        case 'f':
          e.preventDefault();
          if (isFullscreen) {
            store.exitFullscreen();
          } else {
            store.requestFullscreen();
          }
          break;
        case 'escape':
          // Browser handles Esc for fullscreen automatically
          break;
        case '0':
          e.preventDefault();
          store.seek(0);
          break;
        case 'p':
          e.preventDefault();
          const videoElement = document.querySelector('video');
          if (videoElement) {
            if (document.pictureInPictureElement) {
              document.exitPictureInPicture();
            } else {
              videoElement.requestPictureInPicture();
            }
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused, isMuted, volume, currentTime, store, isFullscreen]);

  return (
    <div 
      className="relative w-full max-w-[1150px] mx-auto group bg-black rounded-2xl overflow-hidden border border-nexus-red/30 shadow-2xl"
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
      onClick={handleInteraction}
    >
      
      <Container className="relative w-full h-[240px] sm:h-auto sm:aspect-video sm:max-h-[650px] overflow-hidden" aria-label={title}>
        
        <div className="absolute inset-0 w-full h-full z-0 bg-black">
          {children}
        </div>

        {/* 🚀 TOP BAR 🚀 */}
        <div 
          className={`absolute top-0 left-0 right-0 z-30 p-2 sm:p-4 pointer-events-none flex justify-between items-start transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          
          {/* Previous Button (Top Left) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onPreviousVideo(); }}
            className="pointer-events-auto flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-black/40 sm:bg-nexus-red/20 border border-white/10 sm:border-nexus-red/40 rounded-full text-white/90 sm:text-white text-[9px] sm:text-[11px] font-bold backdrop-blur-md hover:bg-nexus-red/40 hover:border-nexus-red/60 transition-all shadow-md z-50 mt-1 sm:mt-0"
            aria-label="Previous Video"
          >
            <span>PREVIOUS</span>
          </button>

          {/* Title (Center) */}
          <div className="w-full absolute top-0 left-0 flex justify-center p-0 m-0 sm:pt-0 pointer-events-none">
             <PlayerHeader title={title} />
          </div>
          
          {/* Next Button (Top Right) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onVideoChange(); }}
            className="pointer-events-auto flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-black/40 sm:bg-nexus-red/20 border border-white/10 sm:border-nexus-red/40 rounded-full text-white/90 sm:text-white text-[9px] sm:text-[11px] font-bold backdrop-blur-md hover:bg-nexus-red/40 hover:border-nexus-red/60 transition-all shadow-md z-50 mt-1 sm:mt-0"
            aria-label="Next Video"
          >
            <span>NEXT VIDEO</span>
          </button>
        </div>

        {/* 🚀 BOTTOM CONTROLS 🚀 */}
        <Controls.Root className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none">
          
          <Controls.Content 
            className={`absolute bottom-0 left-0 right-0 w-full px-2 sm:px-6 pb-2 sm:pb-4 flex flex-col pointer-events-auto transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="hidden sm:block absolute bottom-[80px] left-0 w-full px-3 sm:px-6">
              <ChapterPanel
                currentTime={currentTime}
                chapters={chapters}
                onSelect={(seconds) => store.seek(seconds)}
              />
            </div>

            <div className="w-full bg-nexus-red/10 backdrop-blur-2xl border border-nexus-red/20 rounded-full shadow-[0_8px_32px_rgba(255,55,58,0.15)] flex flex-col">
              <PlayerControls usePlayer={usePlayer} />
            </div>
          </Controls.Content>
        </Controls.Root>

        {/* 🚀 Video.js Hotkeys (Backup) 🚀 */}
        <Hotkey keys="Space" action="togglePaused" />
        <Hotkey keys="f" action="toggleFullscreen" />
        <Hotkey keys="m" action="toggleMuted" />
        <Hotkey keys="ArrowLeft" action="seekStep" value={-5} />
        <Hotkey keys="ArrowRight" action="seekStep" value={5} />
        <StatusAnnouncer />
      </Container>
    </div>
  );
}

function NexusPlayer() {
  const [videoIndex, setVideoIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const currentVideo = VIDEOS[videoIndex];

  const handleNextVideo = () => {
    setVideoIndex((prev) => (prev + 1) % VIDEOS.length);
    setAutoPlay(true);
  };

  const handlePreviousVideo = () => {
    setVideoIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
    setAutoPlay(true);
  };

  return (
    <div className="w-full flex justify-center py-6 sm:py-10 px-2 sm:px-0">
      <Player>
        <NexusSkin 
          title={currentVideo.title} 
          onVideoChange={handleNextVideo}
          onPreviousVideo={handlePreviousVideo}
          currentVideoIndex={videoIndex}
          autoPlay={autoPlay}
        >
          <MuxVideo
            key={currentVideo.id}
            source={{
              playbackId: currentVideo.id,
              poster: { time: 2, width: 1280 },
              storyboard: { format: 'webp' },
              playback: { maxResolution: '1080p' }, 
            }}
            playsInline
            crossOrigin="anonymous"
            preload="metadata"
            className="w-full h-full object-cover"
          >
            <track kind="chapters" src="/chapters.vtt" srcLang="en" label="Video Chapters" default />
          </MuxVideo>
        </NexusSkin>
      </Player>
    </div>
  );
}

export default NexusPlayer;