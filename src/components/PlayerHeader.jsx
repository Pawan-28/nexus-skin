function PlayerHeader({ 
  title = 'NEXUS PROOF PLAYER - Cinematic', 
  subtitle = 'A cinematic journey.', 
  quality = 'NEXUS EDITION', 
  status = 'NOW PLAYING' 
}) {
  return (
    <header className="w-full flex flex-col items-center justify-center pt-1 pb-2 sm:pt-2 sm:pb-3 bg-gradient-to-b from-black/90 via-black/40 to-transparent">
      
      {/* N Logo & Status */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-md sm:rounded-lg bg-nexus-red text-white font-extrabold text-xs sm:text-sm shadow-[0_0_15px_rgba(255,55,58,0.4)]">
          N
        </div>
        <div className="flex items-center gap-1.5 text-nexus-lightRed text-[8px] sm:text-[9px] font-extrabold tracking-[1px]">
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-nexus-red animate-pulse" />
          {status}
        </div>
      </div>

      {/* Centered Title */}
      <h3 className="text-white text-[11px] sm:text-base font-bold tracking-tight drop-shadow-md text-center px-4">
        {title}
      </h3>

      {/* Subtitle (Hidden on Mobile) */}
      <p className="text-gray-300 text-[9px] sm:text-xs hidden sm:block mt-0.5 drop-shadow-sm">
        {subtitle}
      </p>
      
    </header>
  );
}
export default PlayerHeader;