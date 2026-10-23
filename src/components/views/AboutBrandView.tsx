import React from 'react';
import { useApp } from '../../context/AppContext';
import { NebulonLogo } from '../brand/NebulonLogo';
import { 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Mail, 
  Github, 
  Linkedin,
  FileCheck
} from 'lucide-react';

export const AboutBrandView: React.FC = () => {
  const { setIsQuoteModalOpen, setIsBrandGuideModalOpen, setCurrentView } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-24">
      
      {/* Header & Brand Identity Statement */}
      <div className="space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono rounded bg-violet-950/60 border border-violet-800/40 text-violet-300">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Identidad de Marca & Manifiesto</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          La convergencia entre ingeniería de software rigurosa y comunidad tecnológica abierta.
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
          <strong className="text-white font-mono">NEBULØN</strong> nace como una marca tecnológica personal y un espacio vivo para el desarrollo de soluciones digitales, la exploración de nuevas arquitecturas y el encuentro de programadores con pasión por el código bien hecho.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={() => setIsBrandGuideModalOpen(true)}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center gap-2 transition-colors"
          >
            <Layers className="w-4 h-4 text-sky-400" />
            <span>Consultar Guía de Marca & Uso del Carácter Ø</span>
          </button>

          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors"
          >
            Iniciar una Conversación
          </button>
        </div>
      </div>

      {/* Strategic Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-violet-950/70 border border-violet-800/40 flex items-center justify-center text-violet-400">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100">Precisión e Ingeniería</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Priorizamos la robustez del código, la accesibilidad (WCAG AA) y la eficiencia de ejecución por encima de modas pasajeras o librerías innecesarias.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-sky-950/70 border border-sky-800/40 flex items-center justify-center text-sky-400">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100">Exploración Abierta</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Un laboratorio donde prototipamos experiencias interactivas, shaders 3D y algoritmos visuales para descubrir nuevas posibilidades en la web.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-950/70 border border-indigo-800/40 flex items-center justify-center text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100">Comunidad y Honestidad</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Compartimos conocimientos sin secretismos. En NEBULØN no se inventan métricas ni se venden prototipos como productos de producción terminados.
          </p>
        </div>
      </div>

      {/* Creator Profile Section */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-4 flex flex-col items-center md:items-start space-y-4">
            <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-violet-500/50 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Anderson Vallejo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-extrabold text-white">Anderson Vallejo</h3>
              <div className="text-xs font-mono text-violet-400">Arquitecto de Software & Creador</div>
            </div>
          </div>

          <div className="md:col-span-8 space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              Cuento con amplia experiencia en la conceptualización, desarrollo y despliegue de soluciones digitales completas: desde aplicaciones web reactivas con TypeScript y React, hasta motores de persistencia y bases de datos relacionales en PostgreSQL.
            </p>
            <p>
              Concibo el desarrollo de software no solo como una disciplina técnica, sino como un medio para resolver problemas humanos reales con elegancia estética y fiabilidad matemática.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <a
                href="mailto:andersonvallejo021@gmail.com"
                className="flex items-center gap-1.5 text-violet-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>andersonvallejo021@gmail.com</span>
              </a>
              <span>·</span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <span>·</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Brand Identity Specs Preview */}
      <div className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">
              Sistema Visual: El Carácter Ø
            </h3>
            <p className="text-xs text-slate-400">
              Directrices obligatorias de aplicación para mantener la integridad de la marca.
            </p>
          </div>

          <div className="shrink-0">
            <NebulonLogo size="lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-2">
            <span className="font-semibold text-emerald-400 font-mono block">✓ Reglas de Escritura Aprobadas</span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-400">
              <li>El nombre oficial es siempre <strong className="text-white font-mono">NEBULØN</strong> (con Ø mayúscula).</li>
              <li>Representa una O atravesada por una línea diagonal precisa.</li>
              <li>Tipografía con personalidad tecnológica y proporciones equilibradas.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-semibold text-red-400 font-mono block">✕ Usos Incorrectos Prohibidos</span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-400">
              <li>Nunca sustituir por "NEBULON", "NEBULÓN" ni "NEBUL0N".</li>
              <li>No alterar la inclinación ni el grosor de la incisión diagonal.</li>
              <li>No agregar efectos de neón excesivos ni degradados arcoíris.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
