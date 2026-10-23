import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Star, 
  MessageSquare, 
  AlertTriangle, 
  Lightbulb, 
  Lock, 
  CheckCircle2, 
  Send,
  ShieldCheck
} from 'lucide-react';

export const ReviewsReportsView: React.FC = () => {
  const { reviews, addReview, reports, submitReport } = useApp();

  const [activeTab, setActiveTab] = useState<'reviews' | 'suggestion' | 'bug' | 'claim'>('reviews');

  // Review Form
  const [reviewForm, setReviewForm] = useState({
    authorName: '',
    roleOrCompany: '',
    serviceTitle: 'Desarrollo de Aplicaciones Web a Medida',
    rating: 5,
    comment: '',
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Report Form (Suggestion / Bug / Claim)
  const [reportForm, setReportForm] = useState({
    title: '',
    description: '',
    contactEmail: '',
  });
  const [reportSubmittedCode, setReportSubmittedCode] = useState<string | null>(null);

  const approvedReviews = reviews.filter((r) => r.status === 'Aprobada');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.authorName.trim() || !reviewForm.comment.trim()) return;

    addReview({
      authorName: reviewForm.authorName.trim(),
      roleOrCompany: reviewForm.roleOrCompany.trim() || 'Cliente verificado',
      serviceTitle: reviewForm.serviceTitle,
      rating: reviewForm.rating,
      comment: reviewForm.comment.trim(),
    });

    setReviewSubmitted(true);
    setReviewForm({
      authorName: '',
      roleOrCompany: '',
      serviceTitle: 'Desarrollo de Aplicaciones Web a Medida',
      rating: 5,
      comment: '',
    });
  };

  const handleReportSubmit = (e: React.FormEvent, type: 'bug' | 'suggestion' | 'private_claim') => {
    e.preventDefault();
    if (!reportForm.title.trim() || !reportForm.description.trim()) return;

    const reportCode = `REP-${Date.now().toString().slice(-4)}`;
    submitReport({
      type,
      title: reportForm.title.trim(),
      description: reportForm.description.trim(),
      contactEmail: reportForm.contactEmail.trim() || undefined,
    });

    setReportSubmittedCode(reportCode);
    setReportForm({ title: '', description: '', contactEmail: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
          Transparencia y Calidad
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Reseñas, sugerencias y reporte de incidencias técnicas.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          La calidad de NEBULØN se construye con retroalimentación verídica. Este centro permite conocer testimonios reales de clientes, proponer mejoras para la plataforma o reportar cualquier anomalía técnica con seguimiento garantizado.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800">
        {[
          { id: 'reviews', label: 'Reseñas de Servicios', icon: Star },
          { id: 'suggestion', label: 'Proponer una Sugerencia', icon: Lightbulb },
          { id: 'bug', label: 'Reportar Error Técnico', icon: AlertTriangle },
          { id: 'claim', label: 'Canal de Quejas Privadas', icon: Lock },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => {
              setActiveTab(id as any);
              setReviewSubmitted(false);
              setReportSubmittedCode(null);
            }}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === id
                ? 'border-violet-500 text-violet-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Reviews */}
      {activeTab === 'reviews' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Reviews List */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300">
              Opiniones Aprobadas ({approvedReviews.length})
            </h3>

            {approvedReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-xl bg-slate-900/30 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-violet-400">{rev.serviceTitle}</span>
                  <span className="text-slate-500">{rev.date}</span>
                </div>

                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "{rev.comment}"
                </p>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-slate-100">{rev.authorName}</div>
                    <div className="text-[11px] text-slate-400">{rev.roleOrCompany}</div>
                  </div>
                  <div className="text-amber-400 font-mono tracking-widest">
                    {'★'.repeat(rev.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit Review Box */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Dejar una Reseña de Servicio
              </h3>
              <p className="text-xs text-slate-400">
                Las opiniones pasan por un proceso de verificación editorial para asegurar autenticidad antes de su publicación.
              </p>

              {reviewSubmitted ? (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-center space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <div className="text-xs font-semibold text-emerald-300">
                    ¡Gracias por tu opinión!
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Tu reseña fue enviada a la cola de moderación y se publicará tras su comprobación.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-200">Tu Nombre o Alias</label>
                    <input
                      type="text"
                      required
                      value={reviewForm.authorName}
                      onChange={(e) => setReviewForm({ ...reviewForm, authorName: e.target.value })}
                      placeholder="Ej. Camila Villalobos"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-200">Cargo o Empresa</label>
                    <input
                      type="text"
                      value={reviewForm.roleOrCompany}
                      onChange={(e) => setReviewForm({ ...reviewForm, roleOrCompany: e.target.value })}
                      placeholder="Ej. Fundadora, TechStart"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-200">Servicio Recibido</label>
                    <select
                      value={reviewForm.serviceTitle}
                      onChange={(e) => setReviewForm({ ...reviewForm, serviceTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                    >
                      <option value="Desarrollo de Aplicaciones Web a Medida">Desarrollo de Aplicaciones Web a Medida</option>
                      <option value="Landing Pages de Alta Conversión">Landing Pages de Alta Conversión</option>
                      <option value="Portafolios Profesionales y Marca Personal">Portafolios Profesionales y Marca Personal</option>
                      <option value="Sistemas de Reservas y Gestión de Citas">Sistemas de Reservas y Gestión de Citas</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-200">Calificación (1 a 5 estrellas)</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className="text-lg transition-transform hover:scale-110"
                        >
                          <span className={star <= reviewForm.rating ? 'text-amber-400' : 'text-slate-600'}>
                            ★
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-200">Tu Comentario</label>
                    <textarea
                      rows={3}
                      required
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      placeholder="Comparte los resultados y tu experiencia trabajando con nosotros..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors"
                  >
                    Enviar Reseña para Moderación
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Suggestion */}
      {activeTab === 'suggestion' && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>Proponer una Mejora para NEBULØN</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ¿Hay alguna función que te gustaría ver en la comunidad, en el laboratorio o en el centro de aprendizaje? Comparte tu idea.
            </p>
          </div>

          {reportSubmittedCode ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-center space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="text-xs font-semibold text-emerald-300">
                ¡Sugerencia registrada con éxito!
              </div>
              <p className="text-[11px] text-slate-300">
                Código de seguimiento: <strong className="text-white font-mono">{reportSubmittedCode}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => handleReportSubmit(e, 'suggestion')} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Título de la Sugerencia</label>
                <input
                  type="text"
                  required
                  value={reportForm.title}
                  onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                  placeholder="Ej. Añadir visor de sintaxis para Rust en la comunidad"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Descripción y Justificación</label>
                <textarea
                  rows={4}
                  required
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  placeholder="Describe cómo mejoraría la experiencia de los usuarios..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Correo Electrónico (opcional para notificarte)</label>
                <input
                  type="email"
                  value={reportForm.contactEmail}
                  onChange={(e) => setReportForm({ ...reportForm, contactEmail: e.target.value })}
                  placeholder="tu@email.com"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg"
              >
                Enviar Sugerencia
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab 3: Bug Report */}
      {activeTab === 'bug' && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span>Reportar un Error Técnico o de Accesibilidad</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Si encontraste un enlace roto, un error visual en móviles, un problema con el teclado o un cálculo incorrecto, infórmanos para corregirlo de inmediato.
            </p>
          </div>

          {reportSubmittedCode ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-center space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="text-xs font-semibold text-emerald-300">
                ¡Reporte de bug registrado!
              </div>
              <p className="text-[11px] text-slate-300">
                Identificador del ticket: <strong className="text-white font-mono">{reportSubmittedCode}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => handleReportSubmit(e, 'bug')} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">¿Qué falló? (Título breve)</label>
                <input
                  type="text"
                  required
                  value={reportForm.title}
                  onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                  placeholder="Ej. El filtro por categorías no actualiza en Safari móvil"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Pasos para reproducir y navegador usado</label>
                <textarea
                  rows={4}
                  required
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  placeholder="Indica qué estabas haciendo cuando ocurrió el problema..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Tu Correo (para avisarte cuando se solucione)</label>
                <input
                  type="email"
                  value={reportForm.contactEmail}
                  onChange={(e) => setReportForm({ ...reportForm, contactEmail: e.target.value })}
                  placeholder="tu@email.com"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg"
              >
                Registrar Reporte de Error
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab 4: Private Claim */}
      {activeTab === 'claim' && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-violet-400" />
              <span>Canal Confidencial de Quejas y Mediación</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Un canal directo y privado con la administración para atender situaciones relacionadas con servicios en curso o conductas inapropiadas en la comunidad. Este contenido nunca se publica públicamente.
            </p>
          </div>

          {reportSubmittedCode ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-center space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
              <div className="text-xs font-semibold text-emerald-300">
                ¡Mensaje confidencial recibido!
              </div>
              <p className="text-[11px] text-slate-300">
                Código de gestión confidencial: <strong className="text-white font-mono">{reportSubmittedCode}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => handleReportSubmit(e, 'private_claim')} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Asunto</label>
                <input
                  type="text"
                  required
                  value={reportForm.title}
                  onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                  placeholder="Motivo de la reclamación o consulta privada"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Detalles de la Situación</label>
                <textarea
                  rows={4}
                  required
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  placeholder="Describe con precisión qué ocurrió, indicando fechas o partes involucradas..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Correo Electrónico de Contacto Directo</label>
                <input
                  type="email"
                  required
                  value={reportForm.contactEmail}
                  onChange={(e) => setReportForm({ ...reportForm, contactEmail: e.target.value })}
                  placeholder="tu@email.com"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg"
              >
                Enviar Comunicación Confidencial
              </button>
            </form>
          )}
        </div>
      )}

    </div>
  );
};
