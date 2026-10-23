import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { NebulonLogo } from '../brand/NebulonLogo';
import { Shield, Sparkles, BookOpen, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setPolicyModal, setIsBrandGuideModalOpen } = useApp();

  const handleNav = (view: AppView) => {
    setCurrentView(view);
  };

  return (
    <footer className="w-full bg-[#060911] border-t border-slate-900 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <NebulonLogo size="md" onClick={() => handleNav('home')} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Plataforma digital de marca personal, ingeniería de software, servicios de desarrollo y comunidad colaborativa de programación.
            </p>
            <div className="text-[11px] font-mono text-violet-400 flex items-center gap-1.5 pt-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Explora ideas. Construye posibilidades.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase font-mono">
              Plataforma
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('portfolio')} className="hover:text-slate-200 transition-colors">
                  Portafolio de Proyectos
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-slate-200 transition-colors">
                  Servicios y Cotizaciones
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('community')} className="hover:text-slate-200 transition-colors">
                  Comunidad de Programación
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('lab')} className="hover:text-slate-200 transition-colors">
                  Laboratorio Experimental
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('learn')} className="hover:text-slate-200 transition-colors">
                  Centro de Aprendizaje
                </button>
              </li>
            </ul>
          </div>

          {/* Professional & Brand */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase font-mono">
              Ecosistema
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-slate-200 transition-colors">
                  Sobre NEBULØN y el Autor
                </button>
              </li>
              <li>
                <button onClick={() => setIsBrandGuideModalOpen(true)} className="hover:text-slate-200 transition-colors flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  Guía de Marca & Identidad (Ø)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('reviews')} className="hover:text-slate-200 transition-colors">
                  Opiniones, Sugerencias y Reportes
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="hover:text-slate-200 transition-colors flex items-center gap-1.5 text-violet-400 font-medium">
                  <Shield className="w-3.5 h-3.5" />
                  Panel de Administración
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Transparency */}
          <div className="space-y-3">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase font-mono">
              Contacto Directo
            </h4>
            <p className="text-slate-400 text-xs">
              Para oportunidades profesionales, desarrollo a medida o colaboraciones tecnológicas:
            </p>
            <div className="font-mono text-slate-300 text-xs break-all bg-slate-900/60 p-2.5 rounded border border-slate-800">
              andersonvallejo021@gmail.com
            </div>
            <div className="flex items-center gap-3 pt-1 text-slate-400 text-xs">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                GitHub
              </a>
              <span>·</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <span>·</span>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                X / Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar with legal policies */}
        <div className="mt-12 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} NEBULØN. Todos los derechos reservados. Desarrollado con precisión técnica.
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => setPolicyModal('privacy')} className="hover:text-slate-300 transition-colors">
              Política de Privacidad
            </button>
            <span>·</span>
            <button onClick={() => setPolicyModal('terms')} className="hover:text-slate-300 transition-colors">
              Términos de Servicio
            </button>
            <span>·</span>
            <button onClick={() => setPolicyModal('rules')} className="hover:text-slate-300 transition-colors">
              Normas de Convivencia
            </button>
            <span>·</span>
            <button onClick={() => setPolicyModal('cookies')} className="hover:text-slate-300 transition-colors">
              Política de Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
