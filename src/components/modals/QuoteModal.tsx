import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, Send, ShieldAlert, Sparkles, FileText } from 'lucide-react';

interface QuoteModalProps {
  initialService?: string;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ initialService, onClose }) => {
  const { submitServiceRequest, setPolicyModal } = useApp();

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    preferredContact: 'email' as 'email' | 'whatsapp' | 'telegram',
    projectType: initialService || 'Desarrollo de Aplicaciones Web a Medida',
    description: '',
    desiredFeatures: '',
    budgetRange: '',
    timeline: '',
    referenceLinks: '',
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    'Desarrollo de Aplicaciones Web a Medida',
    'Landing Pages de Alta Conversión',
    'Portafolios Profesionales y Marca Personal',
    'Sistemas de Reservas y Gestión de Citas',
    'Paneles Administrativos y Herramientas Internas',
    'Automatización de Tareas Digitales y APIs',
    'Auditoría y Optimización de Interfaces (UI/UX)',
    'Mantenimiento Web y Soporte Preventivo',
    'Experiencias Interactivas y 3D en la Web',
    'Consultoría Técnica y Arquitectura de Software',
    'Otro tipo de desarrollo',
  ];

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!formData.clientName.trim()) {
      errs.clientName = 'Por favor ingresa tu nombre completo.';
    }
    if (!formData.clientEmail.trim()) {
      errs.clientEmail = 'El correo electrónico es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.clientEmail)) {
      errs.clientEmail = 'Ingresa un formato de correo electrónico válido.';
    }
    if (!formData.description.trim() || formData.description.trim().length < 20) {
      errs.description = 'Describe tu necesidad con al menos 20 caracteres para poder evaluarla adecuadamente.';
    }
    if (!formData.privacyAccepted) {
      errs.privacyAccepted = 'Debes aceptar la política de privacidad para enviar la solicitud.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const newId = submitServiceRequest({
        clientName: formData.clientName.trim(),
        clientEmail: formData.clientEmail.trim(),
        preferredContact: formData.preferredContact,
        projectType: formData.projectType,
        description: formData.description.trim(),
        desiredFeatures: formData.desiredFeatures.trim(),
        budgetRange: formData.budgetRange.trim() || undefined,
        timeline: formData.timeline.trim() || undefined,
        referenceLinks: formData.referenceLinks.trim() || undefined,
      });

      setSubmittedId(newId);
    } catch (err) {
      console.error(err);
      setErrors({ form: 'Ocurrió un error al registrar la solicitud. Por favor intenta de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0b101d] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
              Solicitud de Proyecto o Presupuesto
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {submittedId ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white">
                  ¡Solicitud recibida con éxito!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Hemos registrado tus requerimientos en nuestro sistema de gestión. Revisaremos la viabilidad técnica y te contactaremos en un plazo máximo de 24 a 48 horas hábiles.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 inline-block font-mono text-xs text-slate-300">
                Código de seguimiento: <span className="text-violet-400 font-bold">{submittedId}</span>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors"
                >
                  Entendido y cerrar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-xs text-slate-400 leading-relaxed">
                Completa los datos del proyecto. Te responderemos con un análisis de viabilidad técnica y una propuesta orientativa sin compromiso.
              </p>

              {errors.form && (
                <div className="p-3 rounded bg-red-950/50 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Nombre o Empresa <span className="text-violet-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Ej. Santiago Morales"
                    className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                  {errors.clientName && (
                    <span className="text-[11px] text-red-400">{errors.clientName}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Correo Electrónico <span className="text-violet-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    placeholder="santiago@ejemplo.com"
                    className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                  {errors.clientEmail && (
                    <span className="text-[11px] text-red-400">{errors.clientEmail}</span>
                  )}
                </div>
              </div>

              {/* Service Type & Preferred Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Tipo de Proyecto
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Medio de Contacto Preferido
                  </label>
                  <select
                    value={formData.preferredContact}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  >
                    <option value="email">Correo Electrónico</option>
                    <option value="whatsapp">WhatsApp / Mensajería</option>
                    <option value="telegram">Telegram</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Descripción del Proyecto o Necesidad <span className="text-violet-400">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Explica qué problema necesitas resolver, el contexto de tu negocio o producto..."
                  className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500 resize-none"
                />
                {errors.description && (
                  <span className="text-[11px] text-red-400">{errors.description}</span>
                )}
              </div>

              {/* Desired features & references */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Presupuesto Orientativo (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    placeholder="Ej. $1,500 - $3,000 USD"
                    className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">
                    Plazo Deseado (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    placeholder="Ej. 4 semanas"
                    className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              {/* Privacy agreement */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={formData.privacyAccepted}
                    onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                    className="mt-0.5 rounded border-slate-700 bg-slate-900 text-violet-600 focus:ring-violet-500"
                  />
                  <span>
                    He leído y acepto la{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPolicyModal('privacy');
                      }}
                      className="text-violet-400 underline hover:text-violet-300"
                    >
                      Política de Privacidad
                    </button>{' '}
                    y autorizo el tratamiento de mis datos con fines de contacto profesional.
                  </span>
                </label>
                {errors.privacyAccepted && (
                  <div className="text-[11px] text-red-400 mt-1">{errors.privacyAccepted}</div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
