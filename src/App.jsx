import NexusPlayer from './components/NexusPlayer';

function App() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans relative overflow-hidden isolate selection:bg-nexus-red selection:text-white">
      
      {/* 🚀 Background Ambient Glows (Animated) 🚀 */}
      <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-nexus-red rounded-full blur-[150px] opacity-10 pointer-events-none z-[-1] animate-pulse-slow" />
      <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-nexus-darkRed rounded-full blur-[150px] opacity-10 pointer-events-none z-[-1] animate-pulse-slow delay-1000" />

      {/* 🚀 Padding Kam Ki Hai 🚀 */}
      <div className="max-w-[1800px] mx-auto px-2 md:px-6 lg:px-10 pt-2 md:pt-3 pb-4 relative z-10">
        
        {/* 🚀 Header (Margin Kam Kiya) 🚀 */}
        <header className="flex justify-between items-center mb-0 md:mb-1 animate-fade-down px-2 md:px-4">
          <a href="#" className="flex items-center gap-2 md:gap-3 no-underline group">
            <span className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-nexus-red to-nexus-darkRed text-white text-lg md:text-xl font-black shadow-[0_0_25px_rgba(255,55,58,0.3)] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
              N
            </span>
            <div>
              <strong className="block text-base md:text-xl tracking-[2px] md:tracking-[3px] font-bold">
                NEXUS<span className="text-nexus-red">.</span>
              </strong>
              <small className="block text-[7px] md:text-[8px] tracking-[1px] md:tracking-[2px] text-gray-400 mt-0.5 font-semibold">
                PROOF PLAYER
              </small>
            </div>
          </a>

          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-nexus-red shadow-[0_0_12px_rgba(255,55,58,0.9)] animate-pulse" />
            <span className="text-[8px] md:text-[9px] tracking-[1px] text-gray-300 font-semibold">
              PLAYER ONLINE
            </span>
          </div>
        </header>

        {/* 🚀 Player (Neeche se Gap Hataya) 🚀 */}
        <div className="w-full flex justify-center animate-scale-in opacity-0 [animation-delay:200ms] -mt-2 md:-mt-4">
          <NexusPlayer />
        </div>

        {/* 🚀 Video Details (Tags Left & Right) 🚀 */}
        <div className="animate-fade-up opacity-0 [animation-delay:400ms] flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2 md:mt-4 border-t border-white/10 pt-4 relative px-2 md:px-4">
          
          {/* Red Glow Line */}
          <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-nexus-red to-transparent"></div>
          
          <div className="flex justify-between w-full items-center">
            {['VIDEOJS V10', 'MUX STREAMING'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 md:px-4 md:py-2 border border-nexus-red/30 rounded-full bg-nexus-red/5 text-nexus-lightRed text-[8px] md:text-[9px] font-bold tracking-wider hover:border-nexus-red hover:bg-nexus-red/20 transition-all duration-300 cursor-default">
                {tag}
              </span>
            ))}
          </div>

        </div>

        {/* 🚀 Hero Section 🚀 */}
        <section className="mt-8 md:mt-12 text-center flex flex-col items-center animate-fade-up opacity-0 [animation-delay:600ms] px-4">
          <span className="text-nexus-lightRed text-[8px] md:text-[10px] tracking-[3px] md:tracking-[5px] font-bold uppercase">
            YOUR WORK. YOUR STORY.
          </span>
          
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mt-3 mb-3 tracking-tight text-white whitespace-nowrap">
            Every frame tells <span className="bg-gradient-to-r from-nexus-red via-red-500 to-nexus-darkRed bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">a story.</span>
          </h1>
          
          <p className="text-gray-400 text-xs md:text-sm max-w-[600px] leading-relaxed mx-auto">
            A premium video experience for creative professionals. Built for cinematic storytelling.
          </p>
        </section>

        {/* 🚀 Features Grid 🚀 */}
        <div className="animate-fade-up opacity-0 [animation-delay:800ms] grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 px-2 md:px-4">
          {[
            { num: '01', title: 'Cinematic Experience', desc: 'A premium video interface designed for immersive storytelling and creative presentations.' },
            { num: '02', title: 'Smart Controls', desc: 'Custom playback controls, timeline navigation, chapters and playback speed settings.' },
            { num: '03', title: 'Built for Everyone', desc: 'Responsive design, keyboard navigation and accessible controls across devices.' }
          ].map((feat, i) => (
            <article key={i} className="group relative p-4 md:p-6 rounded-xl bg-gradient-to-br from-[#191919] to-[#0d0d0d] border border-white/5 hover:border-nexus-red/50 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-nexus-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-red to-red-400 text-2xl font-extrabold">{feat.num}</span>
                <h3 className="text-white text-sm md:text-base font-bold mt-3 mb-1.5 group-hover:text-nexus-lightRed transition-colors">{feat.title}</h3>
                <p className="text-gray-400 text-[10px] md:text-xs leading-relaxed">{feat.desc}</p>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* 🚀 Footer 🚀 */}
      <footer className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-10 mt-8 md:mt-12 py-4 md:py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left text-[8px] md:text-[9px] font-semibold tracking-[1px] md:tracking-[2px] text-gray-500 animate-fade-up opacity-0 [animation-delay:1000ms]">
        <span>© 2026 NEXUS PROOF PLAYER</span>
        <span>POWERED BY VIDEO.JS V10 + MUX</span>
        
        <span className="flex items-center gap-1.5 group cursor-default">
          DEVELOPED WITH <span className="text-nexus-red group-hover:scale-125 transition-transform duration-300">❤</span> BY 
          <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-red-800 bg-clip-text text-transparent font-bold tracking-wider transition-all duration-300 group-hover:from-yellow-400 group-hover:via-red-500 group-hover:to-red-900">
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