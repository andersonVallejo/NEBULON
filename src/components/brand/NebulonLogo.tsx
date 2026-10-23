import React from 'react';

interface NebulonLogoProps {
  variant?: 'full' | 'compact' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const NebulonLogo: React.FC<NebulonLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  onClick,
}) => {
  // Dimensions
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 sm:w-9 sm:h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-sm tracking-[0.18em]',
    md: 'text-base tracking-[0.2em]',
    lg: 'text-xl tracking-[0.22em]',
    xl: 'text-2xl tracking-[0.25em]',
  };

  // User's custom brand emblem: glowing orbital mark
  const IconMark = (
    <div className={`relative flex items-center justify-center shrink-0 rounded-lg overflow-hidden bg-black/90 border border-violet-500/40 shadow-[0_0_12px_rgba(139,92,246,0.4)] ${iconSizes[size]}`}>
      <img
        src="/assets/aistudio/Captura_de_pantalla_2026-10-22_203812_f46af181.png"
        alt="NEBULØN Logo"
        className="w-full h-full object-cover scale-105"
        referrerPolicy="no-referrer"
      />
    </div>
  );

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center justify-center rounded-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${className}`}
        aria-label="NEBULØN Inicio"
      >
        {IconMark}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 text-left transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-md py-1 ${className}`}
      aria-label="NEBULØN Inicio"
    >
      {IconMark}
      
      <span className={`font-extrabold uppercase select-none text-white font-mono flex items-center ${textSizes[size]}`}>
        <span>NEBUL</span>
        {/* Highlighted authentic Ø glyph */}
        <span className="text-transparent bg-clip-text bg-gradient-to-tr from-violet-400 to-sky-300 font-bold mx-[0.5px]">
          Ø
        </span>
        <span>N</span>
      </span>
    </button>
  );
};
