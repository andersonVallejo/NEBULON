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
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-sm tracking-[0.18em]',
    md: 'text-base tracking-[0.2em]',
    lg: 'text-xl tracking-[0.22em]',
    xl: 'text-2xl tracking-[0.25em]',
  };

  // SVG Icon Mark: Precision geometric Ø with an angled incision that forms part of the orbital signature
  const IconSvg = (
    <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(139,92,246,0.35)]"
      >
        <defs>
          <linearGradient id="nebulonGrad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A855F7" />
            <stop offset="0.5" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>
          <linearGradient id="slashGrad" x1="6" y1="34" x2="34" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#C084FC" />
          </linearGradient>
        </defs>
        
        {/* Outer orbital ring with refined thickness */}
        <circle
          cx="20"
          cy="20"
          r="14"
          stroke="url(#nebulonGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* The signature diagonal slash defining the authentic Ø */}
        <line
          x1="10"
          y1="30"
          x2="30"
          y2="10"
          stroke="url(#slashGrad)"
          strokeWidth="3.4"
          strokeLinecap="round"
        />

        {/* Subtle core precision node */}
        <circle cx="20" cy="20" r="1.5" fill="#38BDF8" />
      </svg>
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
        {IconSvg}
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
      {IconSvg}
      
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
