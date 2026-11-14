
import NexusPlayer from './components/NexusPlayer';
import './App.css';
import './styles/responsive.css';

function App() {
  return (
    <main className="nexus-page">
      {/* Ambient Background */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* Header */}
      <header className="nexus-header">
        <a href="#" className="brand">
          <span className="brand-icon">N</span>

          <div>
            <strong>
              NEXUS<span>.</span>
            </strong>
            <small>PROOF PLAYER</small>
          </div>
        </a>

        <div className="online-status">
          <span className="status-dot" />
          PLAYER ONLINE
        </div>
      </header>

      {/* Main Content */}
      <section className="nexus-content">

        {/* Hero */}
        <div className="hero-heading">
          <span className="eyebrow">
            YOUR WORK. YOUR STORY.
          </span>

          <h1>
            Every frame tells <span>a story.</span>
          </h1>

          <p>
            A premium video experience for creative professionals.
            Built for cinematic storytelling.
          </p>
        </div>

        {/* Video Player */}
        <NexusPlayer />

        {/* Video Details */}
        <div className="video-details">
          <div>
            <span className="details-label">
              FEATURED PROJECT
            </span>

            <h2>NEXUS PROOF PLAYER - Cinematic</h2>

            <p>
              A cinematic journey through our world.
              Experience every frame in stunning quality.
            </p>
          </div>

          <div className="video-tags">
            <span>VIDEOJS V10</span>
            <span>MUX STREAMING</span>
            <span>4K READY</span>
          </div>
        </div>

        {/* Features */}
        <div className="feature-grid">
          <article className="feature-card">
            <span>01</span>
            <h3>Cinematic Experience</h3>
            <p>
              A premium video interface designed for immersive
              storytelling and creative presentations.
            </p>
          </article>

          <article className="feature-card">
            <span>02</span>
            <h3>Smart Controls</h3>
            <p>
              Custom playback controls, timeline navigation,
              chapters and playback speed settings.
            </p>
          </article>

          <article className="feature-card">
            <span>03</span>
            <h3>Built for Everyone</h3>
            <p>
              Responsive design, keyboard navigation and
              accessible controls across devices.
            </p>
          </article>
        </div>

      </section>

      {/* Footer */}
      <footer className="nexus-footer">
        <span>© 2026 NEXUS PROOF PLAYER</span>
        <span>POWERED BY VIDEO.JS V10 + MUX</span>
        <span>DESIGNED FOR THE WEB</span>
      </footer>
    </main>
  );
}

export default App;
