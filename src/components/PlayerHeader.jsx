function PlayerHeader({ 
  title = 'NEXUS PROOF PLAYER - Cinematic', 
  subtitle = 'A cinematic journey.', 
  quality = 'NEXUS EDITION', 
  status = 'NOW PLAYING' 
}) {
  return (
    <header className="w-full flex items-start justify-between p-4 md:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent">
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-nexus-red to-nexus-darkRed text-white font-extrabold text-lg shadow-[0_0_15px_rgba(255,55,58,0.4)]">
          N
        </div>
        <div>
          <div className="flex items-center gap-2 text-nexus-lightRed text-[9px] font-extrabold tracking-[1.5px] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-nexus-red shadow-[0_0_8px_rgba(255,55,58,0.8)] animate-pulse" />
            {status}
          </div>
          <h3 className="text-white text-sm md:text-lg font-bold mt-0.5 tracking-tight drop-shadow-md">
            {title}
          </h3>
          <p className="text-gray-300 text-[10px] md:text-xs hidden sm:block drop-shadow-sm mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="px-3 py-1.5 bg-black/60 border border-nexus-red/50 rounded-md text-nexus-lightRed text-[10px] font-extrabold tracking-wide backdrop-blur-md shadow-lg">
        {quality}
      </div>

    </header>
  );
}

export default PlayerHeader;