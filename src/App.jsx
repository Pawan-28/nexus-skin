import NexusPlayer from './components/NexusPlayer';

function App() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans relative overflow-hidden isolate selection:bg-nexus-red selection:text-white">
      
      {/* 🚀 Background Ambient Glows (Animated) 🚀 */}
      <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-nexus-red rounded-full blur-[150px] opacity-10 pointer-events-none z-[-1] animate-pulse-slow" />
      <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-nexus-darkRed rounded-full blur-[150px] opacity-10 pointer-events-none z-[-1] animate-pulse-slow delay-1000" />

      <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-16 py-6 md:py-8 relative z-10">
        
        {/* 🚀 Header (Fade Down) 🚀 */}
        <header className="flex justify-between items-center mb-10 md:mb-16 animate-fade-down">
          <a href="#" className="flex items-center gap-3 no-underline group">
            <span className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-nexus-red to-nexus-darkRed text-white text-xl md:text-2xl font-black shadow-[0_0_25px_rgba(255,55,58,0.3)] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
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

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-nexus-red shadow-[0_0_12px_rgba(255,55,58,0.9)] animate-pulse" />
            <span className="text-[9px] md:text-[10px] tracking-[1px] md:tracking-[2px] text-gray-300 font-semibold">
              PLAYER ONLINE
            </span>
          </div>
        </header>

        {/* 🚀 Hero Section 🚀 */}
        <section className="mb-10 md:mb-14 text-center flex flex-col items-center">
          <span className="animate-fade-up opacity-0 [animation-delay:200ms] text-nexus-lightRed text-[9px] md:text-[11px] tracking-[4px] md:tracking-[6px] font-bold uppercase">
            YOUR WORK. YOUR STORY.
          </span>
          
          <h1 className="animate-fade-up opacity-0 [animation-delay:400ms] text-xl sm:text-3xl md:text-5xl lg:text-[64px] font-extrabold mt-4 mb-4 tracking-tight text-white whitespace-nowrap">
            Every frame tells <span className="bg-gradient-to-r from-nexus-red via-red-500 to-nexus-darkRed bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">a story.</span>
          </h1>
          
          <p className="animate-fade-up opacity-0 [animation-delay:600ms] text-gray-400 text-xs md:text-base lg:text-lg max-w-[650px] leading-relaxed mx-auto">
            A premium video experience for creative professionals. Built for cinematic storytelling.
          </p>
        </section>

        {/* 🚀 Player 🚀 */}
        <div className="w-full flex justify-center animate-scale-in opacity-0 [animation-delay:800ms]">
          <NexusPlayer />
        </div>

        {/* 🚀 Video Details 🚀 */}
        <div className="animate-fade-up opacity-0 [animation-delay:1000ms] flex flex-col md:flex-row md:items-center justify-between gap-6 mt-10 md:mt-12 border-t border-white/10 pt-6 relative text-center md:text-left">
          <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-nexus-red to-transparent"></div>
          
          <div className="flex flex-col items-center md:items-start w-full md:w-auto">
            <span className="text-nexus-lightRed text-[9px] md:text-[10px] tracking-[2px] md:tracking-[3px] font-bold uppercase block mb-1 md:mb-2">
              FEATURED PROJECT
            </span>
            <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">NEXUS PROOF PLAYER - Cinematic</h2>
            <p className="text-gray-400 text-xs md:text-sm max-w-lg">
              A cinematic journey through our world. Experience every frame in stunning quality.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-2 w-full md:w-auto">
            {['VIDEOJS V10', 'MUX STREAMING'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 border border-nexus-red/30 rounded-full bg-nexus-red/5 text-nexus-lightRed text-[8px] md:text-[9px] font-bold tracking-wider md:tracking-widest hover:border-nexus-red hover:bg-nexus-red/20 transition-all duration-300 cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 🚀 Features Grid 🚀 */}
        <div className="animate-fade-up opacity-0 [animation-delay:1200ms] grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-12 md:mt-20">
          {[
            { num: '01', title: 'Cinematic Experience', desc: 'A premium video interface designed for immersive storytelling and creative presentations.' },
            { num: '02', title: 'Smart Controls', desc: 'Custom playback controls, timeline navigation, chapters and playback speed settings.' },
            { num: '03', title: 'Built for Everyone', desc: 'Responsive design, keyboard navigation and accessible controls across devices.' }
          ].map((feat, i) => (
            <article key={i} className="group relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#191919] to-[#0d0d0d] border border-white/5 hover:border-nexus-red/50 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-nexus-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-red to-red-400 text-3xl font-extrabold">{feat.num}</span>
                <h3 className="text-white text-base md:text-lg font-bold mt-4 mb-2 group-hover:text-nexus-lightRed transition-colors">{feat.title}</h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* 🚀 Footer (Developed by Pawan) 🚀 */}
      <footer className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-16 mt-12 md:mt-20 py-6 md:py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left text-[8px] md:text-[9px] font-semibold tracking-[1px] md:tracking-[2px] text-gray-500 animate-fade-up opacity-0 [animation-delay:1400ms]">
        <span>© 2026 NEXUS PROOF PLAYER</span>
        <span>POWERED BY VIDEO.JS V10 + MUX</span>
        
        {/* 🚀 Yahan Name Add Kiya Hai 🚀 */}
        <span className="flex items-center gap-1.5 group cursor-default">
          DEVELOPED WITH <span className="text-nexus-red group-hover:scale-125 transition-transform duration-300">❤</span> BY 
         

<span className="bg-gradient-to-r from-red-500 via-yellow-400 to-orange-500 bg-clip-text text-transparent font-extrabold tracking-wider transition-all duration-300 group-hover:from-yellow-400 group-hover:via-pink-500 group-hover:to-red-500">
  PAWAN
</span>


</span>

        
      </footer>

      {/* 🚀 Custom CSS for Animations 🚀 */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes gradientX {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.05); }
        }
        
        .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-down { animation: fadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scaleIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-gradient-x { animation: gradientX 4s ease infinite; }
        .animate-pulse-slow { animation: pulseSlow 8s ease-in-out infinite; }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #C72930; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #FF373A; }
      `}} />

    </main>
  );
}

export default App;