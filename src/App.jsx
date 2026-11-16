import NexusPlayer from './components/NexusPlayer';

function App() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans relative overflow-hidden isolate">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[100px] -left-[250px] w-[450px] h-[450px] bg-nexus-red rounded-full blur-[130px] opacity-10 pointer-events-none z-[-1]" />
      <div className="absolute top-[450px] -right-[250px] w-[450px] h-[450px] bg-nexus-darkRed rounded-full blur-[130px] opacity-10 pointer-events-none z-[-1]" />

      <div className="max-w-[1250px] mx-auto px-4 md:px-8 py-6 md:py-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8 md:mb-16">
          <a href="#" className="flex items-center gap-2 md:gap-3 no-underline group">
            <span className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-nexus-red to-nexus-darkRed text-white text-xl md:text-2xl font-black shadow-[0_0_25px_rgba(255,55,58,0.2)] group-hover:scale-105 transition-transform">
              N
            </span>
            <div>
              <strong className="block text-lg md:text-2xl tracking-[3px] md:tracking-[4px] font-bold">
                NEXUS<span className="text-nexus-red">.</span>
              </strong>
              <small className="block text-[8px] md:text-[9px] tracking-[2px] md:tracking-[3px] text-gray-400 mt-0.5 md:mt-1 font-semibold">
                PROOF PLAYER
              </small>
            </div>
          </a>

          <div className="text-[9px] md:text-[11px] tracking-[1px] md:tracking-[2px] text-gray-400 font-semibold flex items-center">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-nexus-red shadow-[0_0_12px_rgba(255,55,58,0.7)] mr-1.5 md:mr-2.5 animate-pulse" />
            PLAYER ONLINE
          </div>
        </header>

        {/* Hero Section */}
        <section className="mb-6 md:mb-10 text-center md:text-left">
          <span className="text-nexus-lightRed text-[8px] md:text-[10px] tracking-[3px] md:tracking-[4px] font-bold uppercase">
            YOUR WORK. YOUR STORY.
          </span>
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold mt-3 md:mt-4 mb-3 md:mb-4 tracking-[-1px] md:tracking-[-2px] leading-tight text-white">
            Every frame tells <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-red via-nexus-lightRed to-nexus-darkRed">a story.</span>
          </h1>
          <p className="text-gray-400 text-xs md:text-base max-w-[650px] leading-relaxed mx-auto md:mx-0">
            A premium video experience for creative professionals. Built for cinematic storytelling.
          </p>
        </section>

        {/* Player */}
        <div className="w-full flex justify-center">
          <NexusPlayer />
        </div>

        {/* Video Details */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mt-6 md:mt-12 border-t border-white/10 pt-6 md:pt-8">
          <div>
            <span className="text-nexus-lightRed text-[9px] md:text-[10px] tracking-[2px] md:tracking-[3px] font-bold uppercase block mb-1.5 md:mb-2">
              FEATURED PROJECT
            </span>
            <h2 className="text-xl md:text-2xl font-bold mb-1.5 md:mb-2">NEXUS PROOF PLAYER - Cinematic</h2>
            <p className="text-gray-400 text-xs md:text-sm max-w-lg">
              A cinematic journey through our world. Experience every frame in stunning quality.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['VIDEOJS V10', 'MUX STREAMING'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 border border-nexus-red/30 rounded-full bg-nexus-red/5 text-nexus-lightRed text-[8px] md:text-[9px] font-bold tracking-wider md:tracking-widest hover:border-nexus-red hover:bg-nexus-red/10 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 md:mt-24">
          {[
            { num: '01', title: 'Cinematic Experience', desc: 'A premium video interface designed for immersive storytelling and creative presentations.' },
            { num: '02', title: 'Smart Controls', desc: 'Custom playback controls, timeline navigation, chapters and playback speed settings.' },
            { num: '03', title: 'Built for Everyone', desc: 'Responsive design, keyboard navigation and accessible controls across devices.' }
          ].map((feat, i) => (
            <article key={i} className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#191919] to-[#0d0d0d] border border-white/5 hover:border-nexus-red/40 hover:-translate-y-1 transition-all duration-300">
              <span className="text-nexus-red text-3xl font-extrabold">{feat.num}</span>
              <h3 className="text-white text-base md:text-lg font-bold mt-5 mb-3 group-hover:text-nexus-lightRed transition-colors">{feat.title}</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{feat.desc}</p>
            </article>
          ))}
        </div>

      </div>

      {/* Footer */}
      <footer className="max-w-[1250px] mx-auto px-4 md:px-8 mt-12 md:mt-20 py-6 md:py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-center md:text-left text-[8px] md:text-[9px] font-semibold tracking-[1px] md:tracking-[2px] text-gray-500">
        <span>© 2026 NEXUS PROOF PLAYER</span>
        <span>POWERED BY VIDEO.JS V10 + MUX</span>
        <span>DESIGNED FOR THE WEB</span>
      </footer>
    </main>
  );
}

export default App;