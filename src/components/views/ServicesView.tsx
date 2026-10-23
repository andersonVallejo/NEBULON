import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceItem } from '../../types';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  HelpCircle, 
  Clock, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { services, setIsQuoteModalOpen } = useApp();
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(services[0]?.id || null);
  const [openFaqIndex, setOpenFaqIndex] = useState<{ [serviceId: string]: number | null }>({});

  const toggleExpand = (id: string) => {
    setExpandedServiceId(prev => prev === id ? null : id);
  };

  const toggleFaq = (serviceId: string, index: number) => {
    setOpenFaqIndex(prev => ({
      ...prev,
      [serviceId]: prev[serviceId] === index ? null : index
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
          Servicios y Soluciones
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ingeniería de software y desarrollo web para proyectos ambiciosos.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Trabajamos con transparencia absoluta: cada servicio cuenta con alcance delimitado, exclusiones explícitas, requisitos técnicos y plazos estimados. Sin presupuestos opacos ni falsas promesas.
        </p>
      </div>

      {/* Services List / Accordions */}
      <div className="space-y-6">
        {services.map((service, index) => {
          const isExpanded = expandedServiceId === service.id;

          return (
            <div
              key={service.id}
              className={`rounded-2xl border transition-all ${
                isExpanded 
                  ? 'bg-slate-900/50 border-violet-700/50 shadow-xl' 
                  : 'bg-slate-900/25 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Service Card Top Banner */}
              <div
                onClick={() => toggleExpand(service.id)}
                className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-violet-400 font-semibold">
                      0{index + 1}.
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                    {service.summary}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden md:flex flex-col text-right font-mono text-[11px] text-slate-400">
                    <span className="text-slate-200">{service.pricingNote}</span>
                    <span className="text-violet-400">{service.estimatedTimeline}</span>
                  </div>

                  <button
                    type="button"
                    className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white"
                    aria-label={isExpanded ? 'Contraer detalles' : 'Expandir detalles'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-6 pb-8 pt-2 border-t border-slate-800/70 space-y-8">
                  
                  {/* Benefits & Included Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-violet-400 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Beneficios para tu Negocio</span>
                      </h4>
                      <ul className="space-y-2">
                        {service.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-950/40 border border-slate-800/60 space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5" />
                        <span>Entregables y Funcionalidades Incluidas</span>
                      </h4>
                      <ul className="space-y-2">
                        {service.includedFeatures.map((f, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                            <span className="text-sky-400 font-mono text-xs">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Scope & Exclusions & Client requirements */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                    <div className="p-4 rounded-lg bg-slate-950/30 border border-slate-800/60 space-y-1.5">
                      <span className="font-semibold text-slate-200 font-mono">Alcance de Trabajo:</span>
                      <p className="text-slate-400 leading-relaxed">{service.scope}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-950/30 border border-slate-800/60 space-y-1.5">
                      <span className="font-semibold text-slate-200 font-mono">Exclusiones Explícitas:</span>
                      <p className="text-slate-400 leading-relaxed">{service.exclusions}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-950/30 border border-slate-800/60 space-y-1.5">
                      <span className="font-semibold text-slate-200 font-mono">Requisitos del Cliente:</span>
                      <p className="text-slate-400 leading-relaxed">{service.clientRequirements}</p>
                    </div>
                  </div>

                  {/* FAQ */}
                  {service.faq && service.faq.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Preguntas Frecuentes sobre este Servicio</span>
                      </h4>
                      <div className="space-y-2">
                        {service.faq.map((item, idx) => {
                          const isOpen = openFaqIndex[service.id] === idx;
                          return (
                            <div
                              key={idx}
                              className="rounded-lg bg-slate-950/40 border border-slate-800/60 overflow-hidden"
                            >
                              <button
                                type="button"
                                onClick={() => toggleFaq(service.id, idx)}
                                className="w-full px-4 py-3 text-left text-xs font-semibold text-slate-200 flex items-center justify-between gap-4"
                              >
                                <span>{item.question}</span>
                                <span className="text-slate-500 font-mono">{isOpen ? '−' : '+'}</span>
                              </button>
                              {isOpen && (
                                <div className="px-4 pb-3 text-xs text-slate-400 leading-relaxed border-t border-slate-800/40 pt-2">
                                  {item.answer}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Bottom Action */}
                  <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
                      <Clock className="w-4 h-4 text-violet-400" />
                      <span>Plazo orientativo: {service.estimatedTimeline}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors flex items-center gap-2 self-start sm:self-auto"
                    >
                      <span>Solicitar Propuesta para "{service.title}"</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
