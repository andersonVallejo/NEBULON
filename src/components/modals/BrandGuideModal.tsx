import React from 'react';
import { useApp } from '../../context/AppContext';
import { NebulonLogo } from '../brand/NebulonLogo';
import { X, Layers, Check, AlertTriangle, Palette, Type } from 'lucide-react';

export const BrandGuideModal: React.FC = () => {
  const { isBrandGuideModalOpen, setIsBrandGuideModalOpen } = useApp();

  if (!isBrandGuideModalOpen) return null;

  const colorTokens = [
    { name: 'Canvas Principal', hex: '#080C14', role: 'Fondo base de alta profundidad (60%)' },
    { name: 'Superficie Modular', hex: '#0F1626', role: 'Tarjetas y paneles con borde sutil (30%)' },
    { name: 'Acento Primario (Violeta)', hex: '#8B5CF6', role: 'Puntos focales y botones de conversión (10%)' },
    { name: 'Acento Secundario (Cian)', hex: '#38BDF8', role: 'Nodos orbitales y elementos técnicos' },
    { name: 'Texto Principal', hex: '#F8FAFC', role: 'Títulos y texto de alta legibilidad' },
    { name: 'Texto Muted', hex: '#94A3B8', role: 'Metadatos, timestamps y descripciones secundarias' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0b101e] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Manual de Identidad y Guía de Marca NEBULØN
            </h3>
          </div>
          <button
            onClick={() => setIsBrandGuideModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto text-xs text-slate-300">
          
          {/* Logo Variations */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold">
              01. Variantes Oficiales del Logotipo
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center gap-3">
                <NebulonLogo variant="full" size="md" />
                <span className="text-[11px] font-mono text-slate-400">Versión Horizontal Completa</span>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center gap-3">
                <NebulonLogo variant="icon" size="lg" />
                <span className="text-[11px] font-mono text-slate-400">Monograma de Icono (Ø)</span>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col items-center justify-center gap-3">
                <NebulonLogo variant="full" size="sm" />
                <span className="text-[11px] font-mono text-slate-400">Variante Compacta</span>
              </div>
            </div>
          </div>

          {/* Slogan */}
          <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-800/40 space-y-1">
            <span className="font-mono text-violet-300 font-semibold uppercase text-[11px]">
              Eslogan Oficial:
            </span>
            <div className="text-sm font-bold text-white italic">
              "Explora ideas. Construye posibilidades."
            </div>
          </div>

          {/* Color Palette Tokens */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span>02. Paleta Cromática y Tokens de Superficie (Regla 60-30-10)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {colorTokens.map((c) => (
                <div key={c.name} className="p-3.5 rounded-lg bg-slate-950/50 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      style={{ backgroundColor: c.hex }}
                      className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                    />
                    <span className="font-mono text-[11px] text-slate-200 font-bold">{c.hex}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200 text-xs">{c.name}</div>
                    <div className="text-[11px] text-slate-400">{c.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold flex items-center gap-2">
              <Type className="w-4 h-4" />
              <span>03. Tipografía Oficial</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-950/40 border border-slate-800 space-y-1.5">
                <span className="font-mono text-violet-300 font-semibold">Display & Titulares:</span>
                <div className="font-bold text-sm text-white">Plus Jakarta Sans</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Geometría contemporánea con excelente legibilidad en pantallas retina y tracking controlado.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-950/40 border border-slate-800 space-y-1.5">
                <span className="font-mono text-sky-300 font-semibold">Código y Cifras:</span>
                <div className="font-mono font-bold text-sm text-white">JetBrains Mono (tabular-nums)</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Tipografía monoespaciada para alineación vertical estricta en tablas de datos y sintaxis de programación.
                </p>
              </div>
            </div>
          </div>

          {/* Improper Uses */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>04. Usos Prohibidos</span>
            </h4>
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Nunca reemplazar el carácter <strong>Ø</strong> por <em>O</em>, <em>Ó</em> o el número <em>0</em> en el logotipo.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>Prohibido el uso de neones saturados tipo cyberpunk sin contraste o partículas caóticas que perjudiquen la accesibilidad.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span>No sustituir la marca con logotipos genéricos de galaxias prediseñadas.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
