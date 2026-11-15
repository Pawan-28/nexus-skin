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

const PLAYBACK_ID = 'YZJkPyAC01idtK5HuPp02sXMGWERdZ8q2Ii5ELXQMcQYA';

const { Player, usePlayer } = createPlayer({ features: videoFeatures });

function NexusSkin({ children, title }) {
  const store = usePlayer();
  const currentTime = usePlayer((s) => s.currentTime);
  const duration = usePlayer((s) => s.duration);
  
  const [chapters, setChapters] = useState([]);
  const progressBarRef = useRef(null);

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
  }, []);

  // Timeline click handler
  const handleSeek = (e) => {
    if (!progressBarRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const seekTime = Math.max(0, Math.min(1, pos)) * duration;
    store.seek(seekTime);
  };

  // Calculate percentage
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full max-w-[1150px] mx-auto group bg-black rounded-2xl overflow-hidden border border-nexus-red/50 shadow-2xl">
      
      <Container className="relative w-full aspect-video flex flex-col justify-end" aria-label={title}>
        
        <div className="absolute inset-0 w-full h-full z-0 bg-black">
          {children}
        </div>

        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
          <PlayerHeader title={title} />
        </div>

        <Controls.Root className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent pointer-events-none">
          <Controls.Content className="w-full px-4 pb-4 pt-32 flex flex-col gap-2 pointer-events-auto">
            
            {/* 🚨 PURE CUSTOM TIMELINE 🚨 */}
            <div 
              className="relative w-full py-2 cursor-pointer group/timeline z-40"
              onClick={handleSeek}
            >
              <div ref={progressBarRef} className="relative w-full h-1.5 group-hover/timeline:h-2 transition-all duration-200 bg-white/20 rounded-full">
                {/* Red Fill */}
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-nexus-darkRed via-nexus-red to-nexus-lightRed rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
                {/* Thumb Dot */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-nexus-red border-2 border-white rounded-full shadow-[0_0_10px_rgba(255,55,58,0.7)] transition-transform group-hover/timeline:scale-125 z-50"
                  style={{ left: `calc(${progressPercent}% - 7px)` }}
                />
              </div>
            </div>

            <PlayerControls usePlayer={usePlayer} />

            <ChapterPanel
              currentTime={currentTime}
              chapters={chapters}
              onSelect={(seconds) => store.seek(seconds)}
            />
          </Controls.Content>
        </Controls.Root>

        <Hotkey keys="Space" action="togglePaused" />
        <Hotkey keys="f" action="toggleFullscreen" />
        <StatusAnnouncer />
      </Container>
    </div>
  );
}

function NexusPlayer({ title = 'NEXUS PROOF PLAYER - Cinematic' }) {
  return (
    <div className="w-full flex justify-center py-8">
      <Player>
        <NexusSkin title={title}>
          <MuxVideo
            source={{
              playbackId: PLAYBACK_ID,
              poster: { time: 2, width: 1280 },
              storyboard: { format: 'webp' },
              playback: { maxResolution: '1080p' }, 
            }}
            playsInline
            crossOrigin="anonymous"
            preload="metadata"
            className="w-full h-full object-contain"
          >
            <track kind="chapters" src="/chapters.vtt" srcLang="en" label="Video Chapters" default />
          </MuxVideo>
        </NexusSkin>
      </Player>
    </div>
  );
}

export default NexusPlayer;