import { useState, useEffect } from 'react';
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

function NexusSkin({ children, title, onVideoChange, currentVideoIndex }) {
  const store = usePlayer();
  const currentTime = usePlayer((s) => s.currentTime);
  const isPaused = usePlayer((s) => s.paused);
  const [chapters, setChapters] = useState([]);
  
  // State to manage visibility of controls
  const [controlsVisible, setControlsVisible] = useState(true);

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

  // Auto-hide logic
  useEffect(() => {
    let timeoutId;

    const handleMouseMove = () => {
      setControlsVisible(true); // Show on move
      clearTimeout(timeoutId);

      // If video is playing, hide after 3 seconds of inactivity
      if (!isPaused) {
        timeoutId = setTimeout(() => {
          setControlsVisible(false);
        }, 3000);
      }
    };

    const handleMouseLeave = () => {
      if (!isPaused) setControlsVisible(false);
    };

    // Initial timer on load if playing
    if (!isPaused) {
        timeoutId = setTimeout(() => {
          setControlsVisible(false);
        }, 3000);
    } else {
        setControlsVisible(true); // Always show when paused
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timeoutId);
    };
  }, [isPaused]);

  return (
    <div 
      className="relative w-full max-w-[1150px] mx-auto group bg-black rounded-2xl overflow-hidden border border-nexus-red/30 shadow-2xl"
      onMouseMove={() => setControlsVisible(true)} // Show controls on hover
      onMouseLeave={() => !isPaused && setControlsVisible(false)} // Hide on leave if playing
    >
      
      <Container className="relative w-full aspect-video max-h-[650px] overflow-hidden" aria-label={title}>
        
        <div className="absolute inset-0 w-full h-full z-0 bg-black">
          {children}
        </div>

        {/* 🚀 TOP BAR 🚀 */}
        <div 
          className={`absolute top-0 left-0 right-0 z-30 p-2 sm:p-4 pointer-events-none flex justify-between items-start transition-opacity duration-300 ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          
          {/* Title (Center) */}
          <div className="w-full absolute top-0 left-0 flex justify-center pt-2 sm:pt-4 pointer-events-none">
             <PlayerHeader title={title} />
          </div>
          
          {/* Next Video Button */}
          <button 
            onClick={onVideoChange}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-nexus-red/20 border border-nexus-red/40 rounded-full text-white text-[9px] sm:text-[10px] font-bold backdrop-blur-md hover:bg-nexus-red/40 hover:border-nexus-red/60 transition-all shadow-md z-50"
          >
            <span>NEXT VIDEO</span>
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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

        <Hotkey keys="Space" action="togglePaused" />
        <Hotkey keys="f" action="toggleFullscreen" />
        <StatusAnnouncer />
      </Container>
    </div>
  );
}

function NexusPlayer() {
  const [videoIndex, setVideoIndex] = useState(0);
  const currentVideo = VIDEOS[videoIndex];

  const handleNextVideo = () => {
    setVideoIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  return (
    <div className="w-full flex justify-center py-6 sm:py-10 px-2 sm:px-0">
      <Player key={currentVideo.id}>
        <NexusSkin 
          title={currentVideo.title} 
          onVideoChange={handleNextVideo}
          currentVideoIndex={videoIndex}
        >
          <MuxVideo
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