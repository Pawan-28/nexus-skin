import { useState, useEffect } from 'react';
import {
  createPlayer, Container, Controls, TimeSlider, Hotkey, 
  StatusAnnouncer, ErrorDialog
} from '@videojs/react';
import { videoFeatures } from '@videojs/react/video';
import { MuxVideo } from '@videojs/react/media/mux-video';

import PlayerControls from './PlayerControls';
import PlayerHeader from './PlayerHeader';
import ChapterPanel from './ChapterPanel';

import '../styles/player.css';
import '../styles/controls.css';
import '../styles/timeline.css';

const PLAYBACK_ID = 'YZJkPyAC01idtK5HuPp02sXMGWERdZ8q2Ii5ELXQMcQYA';

const { Player, usePlayer } = createPlayer({ features: videoFeatures });

function NexusSkin({ children, title }) {
  const store = usePlayer();
  const currentTime = usePlayer((s) => s.currentTime);
  const [chapters, setChapters] = useState([]);

  // VTT Track se Chapters extract karna
  useEffect(() => {
    // Jab video load ho jaye, toh TextTracks check karo
    const track = document.querySelector('track[kind="chapters"]');
    if (track && track.track) {
      const cues = Array.from(track.track.cues || []);
      const parsedChapters = cues.map((cue) => ({
        startTime: cue.startTime,
        endTime: cue.endTime,
        text: cue.text,
      }));
      setChapters(parsedChapters);
    }
  }, []);

  return (
    <Container className="nexus-player" aria-label={title}>
      {children}

      <PlayerHeader title={title} />

      <Controls.Root>
        <Controls.Content className="nexus-controls">
          
          {/* Video Timeline */}
          <TimeSlider.Root className="nexus-timeline" label="Seek through video">
            <TimeSlider.Chapters
              className="nexus-timeline-chapters"
              renderChapter={(props) => (
                <div {...props} className={`nexus-timeline-chapter ${props.className || ''}`}>
                  <TimeSlider.Track className="nexus-timeline-track">
                    <TimeSlider.Buffer className="nexus-timeline-buffer" />
                    <TimeSlider.Fill className="nexus-timeline-fill" />
                  </TimeSlider.Track>
                </div>
              )}
            />
            <TimeSlider.Thumb className="nexus-timeline-thumb" />
            <TimeSlider.Preview className="nexus-timeline-preview">
              <TimeSlider.ChapterTitle className="nexus-preview-title" />
              <TimeSlider.Value type="pointer" />
            </TimeSlider.Preview>
          </TimeSlider.Root>

          {/* Player Controls */}
          <PlayerControls usePlayer={usePlayer} />

          {/* Chapter Navigation (Dynamic) */}
          <ChapterPanel
            currentTime={currentTime}
            chapters={chapters}
            onSelect={(seconds) => store.seek(seconds)}
          />

        </Controls.Content>
      </Controls.Root>

      <Hotkey keys="Space" action="togglePaused" />
      <Hotkey keys="m" action="toggleMuted" />
      <Hotkey keys="f" action="toggleFullscreen" />
      <Hotkey keys="ArrowLeft" action="seekStep" value={-5} />
      <Hotkey keys="ArrowRight" action="seekStep" value={5} />

      <StatusAnnouncer />
      <ErrorDialog.Root>
        <ErrorDialog.Popup className="nexus-error">
          <ErrorDialog.Title />
          <ErrorDialog.Description />
          <ErrorDialog.Close />
        </ErrorDialog.Popup>
      </ErrorDialog.Root>
    </Container>
  );
}

function NexusPlayer({ title = 'NEXUS PROOF PLAYER - Cinematic' }) {
  return (
    <div className="nexus-player-wrapper">
      <Player>
        <NexusSkin title={title}>
          <MuxVideo
            source={{
              playbackId: PLAYBACK_ID,
              poster: { time: 2, width: 1280 },
              storyboard: { format: 'webp' },
            }}
            playsInline
            crossOrigin="anonymous"
            preload="metadata"
          >
            {/* YEH VTT FILE HONA ZAROORI HAI PUBLIC FOLDER MEIN */}
            <track kind="chapters" src="/chapters.vtt" srcLang="en" label="Video Chapters" default />
          </MuxVideo>
        </NexusSkin>
      </Player>
    </div>
  );
}

export default NexusPlayer;