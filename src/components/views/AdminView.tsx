import React, { useState } from 'react';
import projectSaasImage from '../../assets/images/project_saas_platform_1792719210711.jpg';
import { useApp } from '../../context/AppContext';
import { RequestStatus, ProjectStatus, ProjectItem } from '../../types';
import { 
  ShieldCheck, 
  BarChart3, 
  Inbox, 
  Layers, 
  MessageSquare, 
  Star, 
  Download, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  AlertTriangle, 
  Lock,
  Eye,
  EyeOff,
  UserCheck
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    currentUser,
    switchUserRole,
    projects,
    addProject,
    updateProject,
    deleteProject,
    serviceRequests,
    updateRequestStatus,
    addRequestPrivateNote,
    posts,
    deletePost,
    moderatePostHide,
    reports,
    updateReportStatus,
    reviews,
    moderateReview,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'metrics' | 'requests' | 'projects' | 'moderation' | 'reviews' | 'backup'>('metrics');
  
  // Commercial note input
  const [selectedRequestForNote, setSelectedRequestForNote] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // New Project Form Modal
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjData, setNewProjData] = useState({
    title: '',
    slug: '',
    tagline: '',
    summary: '',
    category: 'Aplicaciones web' as any,
    status: 'Publicado' as ProjectStatus,
    imageUrl: projectSaasImage,
    problemSolved: '',
    architectureDecisions: '',
    features: '',
    techStack: '',
    challengesLearned: '',
    year: '2026',
    featured: false,
  });

  // Verify authorization
  const isAuthorized = currentUser?.role === 'admin' || currentUser?.role === 'moderator';

  if (!isAuthorized) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-800/60 text-red-400 mx-auto flex items-center justify-center">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Acceso Restringido al Panel Administrativo</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Tu cuenta actual está asignada al rol <strong className="text-violet-400 capitalize">{currentUser?.role || 'user'}</strong>. Las operaciones de gestión comercial, modificación de proyectos y cola de moderación requieren privilegios de Administrador o Moderador.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <span className="text-xs font-mono text-slate-400 block">
            Simulador de Control de Acceso (RBAC):
          </span>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => switchUserRole('admin')}
              className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg"
            >
              Cambiar a Rol Administrador
            </button>
            <button
              onClick={() => switchUserRole('moderator')}
              className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg"
            >
              Cambiar a Rol Moderador
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle new note submit
  const handleAddNote = (id: string) => {
    if (!newNoteText.trim()) return;
    addRequestPrivateNote(id, newNoteText.trim());
    setNewNoteText('');
    setSelectedRequestForNote(null);
  };

  // Handle new project submit
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjData.title.trim() || !newProjData.summary.trim()) return;

    addProject({
      title: newProjData.title.trim(),
      slug: newProjData.slug.trim() || newProjData.title.toLowerCase().replace(/\s+/g, '-'),
      tagline: newProjData.tagline.trim() || newProjData.title,
      summary: newProjData.summary.trim(),
      category: newProjData.category,
      status: newProjData.status,
      imageUrl: newProjData.imageUrl,
      problemSolved: newProjData.problemSolved.trim(),
      architectureDecisions: newProjData.architectureDecisions.trim(),
      features: newProjData.features.split('\n').map((f) => f.trim()).filter(Boolean),
      techStack: newProjData.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      challengesLearned: newProjData.challengesLearned.trim(),
      year: newProjData.year,
      featured: newProjData.featured,
    });

    setIsNewProjectModalOpen(false);
  };

  // Export full backup
  const handleExportBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      platform: 'NEBULØN OS',
      currentUser: currentUser.username,
      projects,
      serviceRequests,
      posts,
      reports,
      reviews,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nebulon-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Metrics
  const totalProjects = projects.length;
  const newRequests = serviceRequests.filter((r) => r.status === 'Nueva').length;
  const reportedPosts = posts.filter((p) => p.isReported || p.isHidden);
  const pendingReviews = reviews.filter((r) => r.status === 'Pendiente').length;

  const requestStatuses: RequestStatus[] = [
    'Nueva',
    'En revisión',
    'Contactada',
    'Propuesta enviada',
    'Aceptada',
    'En desarrollo',
    'Finalizada',
    'Descartada',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-mono rounded bg-violet-950/70 text-violet-300 border border-violet-800/40 uppercase tracking-wider">
              Consola Administrativa
            </span>
            <span className="text-xs font-mono text-slate-400">
              Sesión activa: <strong className="text-white">{currentUser?.name || 'Anderson Vallejo'}</strong> ({currentUser?.role || 'admin'})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Gestión de Operaciones, Contenido y Moderación
          </h1>
        </div>

        <button
          onClick={handleExportBackup}
          className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 flex items-center gap-2 transition-colors self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-sky-400" />
          <span>Exportar Respaldo JSON</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto scrollbar-none">
        {[
          { id: 'metrics', label: 'Resumen & Métricas', icon: BarChart3 },
          { id: 'requests', label: `Solicitudes de Clientes (${serviceRequests.length})`, icon: Inbox },
          { id: 'projects', label: `Proyectos (${totalProjects})`, icon: Layers },
          { id: 'moderation', label: `Moderación (${reportedPosts.length})`, icon: AlertTriangle },
          { id: 'reviews', label: `Reseñas (${pendingReviews} pend.)`, icon: Star },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
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

      {/* Tab 1: Metrics Overview */}
      {activeTab === 'metrics' && (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-slate-400">Proyectos Registrados</span>
              <div className="text-3xl font-extrabold text-white font-mono">{totalProjects}</div>
              <div className="text-[11px] text-slate-500">
                {projects.filter((p) => p.status === 'Publicado').length} en producción
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-slate-400">Solicitudes Comerciales</span>
              <div className="text-3xl font-extrabold text-violet-400 font-mono">
                {serviceRequests.length}
              </div>
              <div className="text-[11px] text-emerald-400 font-mono">
                {newRequests} pendientes de respuesta
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-slate-400">Publicaciones en Comunidad</span>
              <div className="text-3xl font-extrabold text-sky-400 font-mono">{posts.length}</div>
              <div className="text-[11px] text-slate-500">
                {reportedPosts.length} requieren atención
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-slate-400">Tickets de Incidencias</span>
              <div className="text-3xl font-extrabold text-amber-400 font-mono">{reports.length}</div>
              <div className="text-[11px] text-slate-500">
                {reports.filter((r) => r.status === 'Abierto').length} abiertos
              </div>
            </div>
          </div>

          {/* Recent commercial requests preview */}
          <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Solicitudes Comerciales Recientes
              </h3>
              <button
                onClick={() => setActiveTab('requests')}
                className="text-xs text-violet-400 hover:underline"
              >
                Ver todas &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {serviceRequests.slice(0, 3).map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-lg bg-slate-950/40 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-semibold text-slate-100">{req.clientName} ({req.clientEmail})</div>
                    <div className="text-slate-400 mt-0.5">{req.projectType} · {req.budgetRange || 'Sin presupuesto especificado'}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 font-mono text-[11px] rounded bg-violet-950/60 text-violet-300 border border-violet-800/40">
                      {req.status}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Commercial Requests Management */}
      {activeTab === 'requests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Listado de Solicitudes de Clientes ({serviceRequests.length})
            </h3>
          </div>

          <div className="space-y-4">
            {serviceRequests.map((req) => (
              <div
                key={req.id}
                className="p-6 rounded-xl bg-slate-900/30 border border-slate-800 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-white">{req.clientName}</span>
                      <span className="text-xs font-mono text-slate-400">({req.clientEmail})</span>
                      <span className="text-[10px] font-mono text-sky-400 bg-sky-950/50 px-1.5 py-0.5 rounded border border-sky-800/30 uppercase">
                        {req.preferredContact}
                      </span>
                    </div>
                    <div className="text-xs text-violet-400 font-semibold mt-1">
                      {req.projectType}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono">Estado:</span>
                    <select
                      value={req.status}
                      onChange={(e) => updateRequestStatus(req.id, e.target.value as RequestStatus)}
                      className="bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 px-3 py-1.5 focus:outline-none focus:border-violet-500"
                    >
                      {requestStatuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description & details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="font-semibold text-slate-300 font-mono">Descripción del cliente:</span>
                    <p className="text-slate-400 leading-relaxed bg-slate-950/40 p-3 rounded border border-slate-800/60">
                      {req.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-slate-300">
                    {req.desiredFeatures && (
                      <div>
                        <span className="font-mono text-slate-400 font-semibold">Funciones deseadas: </span>
                        <span>{req.desiredFeatures}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-mono text-slate-400 font-semibold">Presupuesto orientativo: </span>
                      <span className="text-violet-300">{req.budgetRange || 'No especificado'}</span>
                    </div>
                    <div>
                      <span className="font-mono text-slate-400 font-semibold">Plazo deseado: </span>
                      <span>{req.timeline || 'Flexible'}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono pt-1">
                      Recibido: {new Date(req.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Private notes */}
                <div className="pt-2 border-t border-slate-800/60 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400 font-semibold">Notas Privadas de Seguimiento:</span>
                    <button
                      onClick={() => setSelectedRequestForNote(selectedRequestForNote === req.id ? null : req.id)}
                      className="text-violet-400 hover:text-violet-300 text-[11px]"
                    >
                      {selectedRequestForNote === req.id ? 'Cancelar' : '+ Agregar nota interna'}
                    </button>
                  </div>

                  {req.privateNotes ? (
                    <div className="p-3 rounded bg-slate-950/60 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-line">
                      {req.privateNotes}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500 italic">No hay notas registradas todavía.</p>
                  )}

                  {selectedRequestForNote === req.id && (
                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        placeholder="Escribe una nota interna para registrar avances o llamadas..."
                        className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200"
                      />
                      <button
                        onClick={() => handleAddNote(req.id)}
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-violet-600 rounded"
                      >
                        Guardar
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Projects Management */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Administración del Portafolio
            </h3>
            <button
              onClick={() => setIsNewProjectModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Proyecto</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-xl bg-slate-900/30 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-violet-400">{proj.category}</span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {proj.status}
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-100 text-sm">{proj.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{proj.summary}</p>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <div className="text-[11px] font-mono text-slate-500">
                    Año: {proj.year} · {proj.featured ? 'Destacado' : 'Estándar'}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newStatus: ProjectStatus =
                          proj.status === 'Publicado' ? 'Archivado' : 'Publicado';
                        updateProject(proj.id, { status: newStatus });
                      }}
                      className="text-xs font-mono text-slate-400 hover:text-white"
                      title="Cambiar estado"
                    >
                      {proj.status === 'Publicado' ? 'Archivar' : 'Publicar'}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar el proyecto "${proj.title}"? Esta acción no se puede deshacer.`)) {
                          deleteProject(proj.id);
                        }
                      }}
                      className="p-1.5 text-red-400 hover:text-red-300"
                      title="Eliminar proyecto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Moderation Queue */}
      {activeTab === 'moderation' && (
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            Cola de Moderación de la Comunidad
          </h3>

          <div className="space-y-4">
            {reportedPosts.length === 0 ? (
              <p className="p-8 text-center text-xs text-slate-500 bg-slate-900/20 border border-slate-800 rounded-xl">
                No hay publicaciones denunciadas ni pendientes de revisión. La comunidad se mantiene limpia.
              </p>
            ) : (
              reportedPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-5 rounded-xl bg-slate-900/40 border border-amber-900/40 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-400">Denuncia de contenido</span>
                    <span className="text-slate-500 font-mono">Autor: {post.author.name}</span>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-100">{post.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{post.content}</p>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">
                      Estado: {post.isHidden ? 'Actualmente Oculto' : 'Visible'}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => moderatePostHide(post.id, !post.isHidden)}
                        className="px-3 py-1.5 rounded bg-slate-800 text-xs font-mono text-slate-200 hover:text-white"
                      >
                        {post.isHidden ? 'Restaurar y Publicar' : 'Ocultar Publicación'}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('¿Eliminar definitivamente esta publicación?')) {
                            deletePost(post.id);
                          }
                        }}
                        className="px-3 py-1.5 rounded bg-red-950 text-xs font-mono text-red-300 hover:bg-red-900"
                      >
                        Eliminar Contenido
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Reviews Moderation */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            Moderación de Reseñas de Clientes
          </h3>

          <div className="space-y-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-xl bg-slate-900/30 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{rev.authorName} ({rev.roleOrCompany})</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${rev.status === 'Aprobada' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}>
                    {rev.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">{rev.serviceTitle} · {'★'.repeat(rev.rating)}</span>

                  <div className="flex items-center gap-2">
                    {rev.status === 'Pendiente' ? (
                      <button
                        onClick={() => moderateReview(rev.id, 'Aprobada')}
                        className="px-3 py-1 text-xs font-semibold text-emerald-300 bg-emerald-950 rounded hover:bg-emerald-900"
                      >
                        Aprobar y Publicar
                      </button>
                    ) : (
                      <button
                        onClick={() => moderateReview(rev.id, 'Pendiente')}
                        className="px-3 py-1 text-xs font-mono text-slate-400 bg-slate-800 rounded hover:text-white"
                      >
                        Pausar Aprobación
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: New Project */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0b101e] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/40">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Nuevo Proyecto para el Portafolio
              </h3>
              <button onClick={() => setIsNewProjectModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-6 space-y-4 overflow-y-auto">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Título del Proyecto</label>
                <input
                  type="text"
                  required
                  value={newProjData.title}
                  onChange={(e) => setNewProjData({ ...newProjData, title: e.target.value })}
                  placeholder="Ej. SpectraAnalytics — Motor de Telemetría"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">Categoría</label>
                  <select
                    value={newProjData.category}
                    onChange={(e) => setNewProjData({ ...newProjData, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                  >
                    <option value="Aplicaciones web">Aplicaciones web</option>
                    <option value="Landing pages">Landing pages</option>
                    <option value="Reservas y citas">Reservas y citas</option>
                    <option value="Experiencias 3D">Experiencias 3D</option>
                    <option value="Herramientas digitales">Herramientas digitales</option>
                    <option value="Páginas web">Páginas web</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">Estado Real</label>
                  <select
                    value={newProjData.status}
                    onChange={(e) => setNewProjData({ ...newProjData, status: e.target.value as ProjectStatus })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                  >
                    <option value="Publicado">Publicado</option>
                    <option value="En desarrollo">En desarrollo</option>
                    <option value="Prototipo">Prototipo</option>
                    <option value="Concepto">Concepto</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Resumen Breve</label>
                <textarea
                  rows={2}
                  required
                  value={newProjData.summary}
                  onChange={(e) => setNewProjData({ ...newProjData, summary: e.target.value })}
                  placeholder="Qué hace el proyecto y para quién..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Problema que Resuelve</label>
                <textarea
                  rows={2}
                  value={newProjData.problemSolved}
                  onChange={(e) => setNewProjData({ ...newProjData, problemSolved: e.target.value })}
                  placeholder="El dolor o ineficiencia previa..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Decisiones Técnicas de Arquitectura</label>
                <textarea
                  rows={2}
                  value={newProjData.architectureDecisions}
                  onChange={(e) => setNewProjData({ ...newProjData, architectureDecisions: e.target.value })}
                  placeholder="Por qué se eligió el stack y qué patrones se emplearon..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Stack Tecnológico (separado por coma)</label>
                <input
                  type="text"
                  value={newProjData.techStack}
                  onChange={(e) => setNewProjData({ ...newProjData, techStack: e.target.value })}
                  placeholder="TypeScript, React, PostgreSQL, Tailwind CSS"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg"
                >
                  Crear y Guardar Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
