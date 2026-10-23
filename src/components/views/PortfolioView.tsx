import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectItem, ProjectStatus } from '../../types';
import { 
  Search, 
  ExternalLink, 
  Github, 
  ArrowLeft, 
  X, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const { projects, selectedProject, setSelectedProject, setIsQuoteModalOpen } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recent' | 'title'>('recent');

  const categories = [
    'Todas',
    'Aplicaciones web',
    'Landing pages',
    'Reservas y citas',
    'Experiencias 3D',
    'Herramientas digitales',
    'Páginas web',
  ];

  const statuses: ('Todos' | ProjectStatus)[] = [
    'Todos',
    'Publicado',
    'En desarrollo',
    'Prototipo',
    'Concepto',
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedCategory === 'Todas' || p.category === selectedCategory;
      const matchStatus = selectedStatus === 'Todos' || p.status === selectedStatus;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.techStack.some((t) => t.toLowerCase().includes(query));

      return matchCat && matchStatus && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return b.year.localeCompare(a.year);
    });
  }, [projects, selectedCategory, selectedStatus, searchQuery, sortBy]);

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'Publicado':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40';
      case 'En desarrollo':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/40';
      case 'Prototipo':
        return 'bg-sky-950/60 text-sky-300 border-sky-800/40';
      case 'Concepto':
        return 'bg-violet-950/60 text-violet-300 border-violet-800/40';
      case 'Archivado':
        return 'bg-slate-900 text-slate-400 border-slate-800';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
          Portafolio de Ingeniería
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Proyectos, arquitecturas y productos construidos.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Cada caso de estudio documenta el problema resuelto, las decisiones técnicas adoptadas, la tecnología empleada y los retos superados. Distinguimos honestamente entre proyectos en producción, prototipos y conceptos experimentales.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, tecnología (TypeScript, Three.js, React)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort & Status Selectors */}
          <div className="flex items-center gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 px-3 py-2 focus:outline-none focus:border-violet-500"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  Estado: {s}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'title')}
              className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 px-3 py-2 focus:outline-none focus:border-violet-500"
            >
              <option value="recent">Más recientes</option>
              <option value="title">Título (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills (Functional filter buttons per Constitution 1.A) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-violet-600 text-white font-semibold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-slate-900/20 border border-slate-800 space-y-3">
          <p className="text-sm text-slate-400">
            No se encontraron proyectos para los filtros seleccionados.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Todas');
              setSelectedStatus('Todos');
              setSearchQuery('');
            }}
            className="text-xs text-violet-400 hover:underline"
          >
            Restablecer todos los filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-xl bg-slate-900/30 border border-slate-800/80 overflow-hidden hover:border-violet-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded text-[11px] font-mono text-slate-200 border border-white/10">
                    {project.category}
                  </div>
                  <div className={`absolute top-3 right-3 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono border ${getStatusBadge(project.status)}`}>
                    {project.status}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-semibold text-slate-100 group-hover:text-violet-300 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                    {project.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-violet-400 font-medium group-hover:translate-x-0.5 transition-transform">
                    Ver ficha &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#0b101c] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/40">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 text-xs font-mono rounded border ${getStatusBadge(selectedProject.status)}`}>
                  {selectedProject.status}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {selectedProject.category} · {selectedProject.year}
                </span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
              
              {/* Hero Image & Title */}
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {selectedProject.title}
                </h2>
                <p className="text-sm sm:text-base text-violet-300 font-medium">
                  {selectedProject.tagline}
                </p>
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Technical Decisions & Problem Solved */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-violet-400 uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" />
                    <span>Problema que Resuelve</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedProject.problemSolved}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider">
                    <Layers className="w-4 h-4" />
                    <span>Decisiones Técnicas de Arquitectura</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedProject.architectureDecisions}
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Funcionalidades Clave Implementadas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/30 border border-slate-800/60 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack & Challenges */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Pila Tecnológica
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900 border border-slate-700/80 text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/40 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="font-semibold text-slate-200 font-mono">Retos y Aprendizajes: </span>
                  <span>{selectedProject.challengesLearned}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <span>Ver Demostración</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repositorio</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    setIsQuoteModalOpen(true);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-violet-300 hover:text-white transition-colors"
                >
                  Solicitar un proyecto similar &rarr;
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
