import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  Terminal, 
  Code2, 
  Cpu, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  ArrowUpRight,
  Shield,
  Layers
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { 
    projects, 
    setSelectedProject, 
    setCurrentView, 
    setIsQuoteModalOpen,
    services,
    posts,
    setSelectedPost,
    reviews
  } = useApp();

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const recentPosts = posts.filter(p => !p.isHidden).slice(0, 3);
  const approvedReviews = reviews.filter(r => r.status === 'Aprobada').slice(0, 2);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative pt-12 md:pt-16 pb-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono rounded-full bg-violet-950/50 border border-violet-800/40 text-violet-300">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>Desarrollo Web & Comunidad Dev</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                Creamos sitios web de alto impacto y la comunidad para impulsarlos.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Soy Anderson Vallejo. A través de <strong className="text-white font-mono">NEBULØN</strong>, transformo ideas en páginas web modernas y escalables, mientras construyo una comunidad donde creadores y programadores colaboran y crecen juntos.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentView('portfolio')}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-violet-900/30 whitespace-nowrap shrink-0"
                >
                  <span>Explorar Proyectos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentView('community')}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 hover:text-white rounded-lg border border-slate-700/70 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <Users className="w-4 h-4 text-sky-400" />
                  <span>Entrar a la Comunidad</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-violet-300 transition-colors whitespace-nowrap shrink-0"
                >
                  Cotizar servicio &rarr;
                </button>
              </div>

              {/* Quiet quantitative proofs */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
                <div>
                  <span className="text-white font-semibold text-sm">100%</span> Código tipado y modular
                </div>
                <span aria-hidden="true">·</span>
                <div>
                  <span className="text-white font-semibold text-sm">WCAG AA</span> Accesibilidad verificada
                </div>
                <span aria-hidden="true">·</span>
                <div>
                  <span className="text-white font-semibold text-sm">0</span> Dependencias innecesarias
                </div>
              </div>
            </div>

            {/* Right Media Focal Anchor */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/40 aspect-[16/10] group">
                <img
                  src="/src/assets/images/hero_nebulon_brand_1792719198845.jpg"
                  alt="NEBULØN Workstation & Architecture"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10">
                  <div className="flex items-center gap-2 font-mono">
                    <Terminal className="w-3.5 h-3.5 text-sky-400" />
                    <span>Estudio de Desarrollo & Lab</span>
                  </div>
                  <span className="text-[11px] text-violet-400 font-medium">NEBULØN OS</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Brand Presentation & 5 Strategic Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
            01. Visión y Fundamentos
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Un ecosistema digital donde la ingeniería se encuentra con el aprendizaje abierto.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            NEBULØN no es simplemente un portafolio estático ni un blog aislado. Fue concebido como una marca tecnológica integral con cinco áreas estratégicas que se retroalimentan:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-violet-950/60 border border-violet-800/40 flex items-center justify-center text-violet-400">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-100">Portafolio & Servicios</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Desarrollo de aplicaciones web a medida, landing pages de alta conversión y soluciones con base de datos robusta para clientes y empresas.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-sky-950/60 border border-sky-800/40 flex items-center justify-center text-sky-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-100">Comunidad de Programación</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Espacio para debatir código real, resolver preguntas técnicas con soluciones verificadas, participar en retos semanales y encontrar colaboradores.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-100">Laboratorio & Centro de Aprendizaje</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Experimentos interactivos en el navegador (simuladores de algoritmos, visualizaciones 3D) y tutoriales técnicos estructurados para todos los niveles.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Featured Projects Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
              02. Proyectos Destacados
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ingeniería aplicada a problemas reales.
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('portfolio')}
            className="text-xs font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Ver todos los {projects.length} proyectos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-xl bg-slate-900/40 border border-slate-800/80 overflow-hidden hover:border-violet-500/50 transition-all flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-slate-200 border border-white/10">
                  {project.category}
                </div>
                <div className="absolute top-3 right-3 bg-violet-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-violet-300 border border-violet-800/40">
                  {project.status}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-100 group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                    {project.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-violet-400 font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Ficha &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Services Preview Bento */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
              03. Servicios Profesionales
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Soluciones diseñadas para generar resultados de negocio.
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('services')}
            className="text-xs font-medium text-violet-400 hover:text-violet-300 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Consultar catálogo completo y cotizador</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.slice(0, 4).map((serv) => (
            <div
              key={serv.id}
              className="p-5 rounded-xl bg-slate-900/30 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-100">{serv.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {serv.summary}
                </p>
                <div className="space-y-1.5 pt-2">
                  {serv.benefits.slice(0, 2).map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-mono">{serv.estimatedTimeline}</span>
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="text-violet-400 hover:text-violet-300 font-medium"
                >
                  Solicitar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Community Live Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="rounded-2xl bg-gradient-to-br from-violet-950/40 via-slate-900/60 to-[#080d1a] border border-violet-900/30 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono rounded bg-sky-950/60 border border-sky-800/40 text-sky-300">
                <Users className="w-3.5 h-3.5" />
                <span>Espacio Comunitario Activo</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                No aprendas a programar en solitario. Comparte, debate y construye en equipo.
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Una comunidad técnica estructurada donde las preguntas tienen formato claro con bloques de código, las soluciones se verifican y los proyectos buscan colaboradores reales sin falsas promesas.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentView('community')}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>Explorar Discusiones y Preguntas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentView('lab')}
                  className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Probar el Laboratorio Interactivo &rarr;
                </button>
              </div>
            </div>

            {/* Live post cards preview */}
            <div className="lg:col-span-6 space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Debates y Preguntas Técnicas Recientes
              </div>

              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    setSelectedPost(post);
                    setCurrentView('community');
                  }}
                  className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono text-violet-400 capitalize">{post.type}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-100 hover:text-violet-300 transition-colors line-clamp-1">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>Por {post.author.name}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.tags.slice(0, 2).join(', ')}</span>
                    {post.acceptedAnswerId && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-400 font-medium">Solución aceptada</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 6. Authentic Social Proof (Real client reviews) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
            04. Prueba Social Auténtica
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Opiniones verificadas de clientes y colaboradores.
          </h2>
          <p className="text-xs text-slate-400">
            En NEBULØN no inventamos testimonios ni métricas ficticias. Estas son opiniones aprobadas de personas reales que han trabajado con nosotros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 space-y-4"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-violet-400 font-mono">{rev.serviceTitle}</span>
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
                <div className="text-amber-400 font-mono tracking-widest text-sm">
                  {'★'.repeat(rev.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-violet-900/30 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
            ¿Tienes un proyecto en mente o buscas unirte a la conversación?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Hablemos de tus requerimientos técnicos, explora nuestro código fuente o sumérgete en los debates y retos de la comunidad.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-6 py-3 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-lg shadow-violet-900/40 transition-colors whitespace-nowrap shrink-0"
            >
              Iniciar Solicitud de Proyecto
            </button>
            <button
              type="button"
              onClick={() => setCurrentView('community')}
              className="px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors whitespace-nowrap shrink-0"
            >
              Participar en la Comunidad
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
