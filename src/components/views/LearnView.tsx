import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ArticleItem } from '../../types';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Terminal, 
  Copy, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';

export const LearnView: React.FC = () => {
  const { articles, selectedArticle, setSelectedArticle } = useApp();

  const [selectedLevel, setSelectedLevel] = useState<string>('Todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState(false);

  const levels = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];
  const categories = ['Todas', 'Arquitectura Backend', 'Desarrollo Frontend', 'Primeros Pasos'];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchLevel = selectedLevel === 'Todos' || art.level === selectedLevel;
      const matchCat = selectedCategory === 'Todas' || art.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        art.title.toLowerCase().includes(query) ||
        art.summary.toLowerCase().includes(query) ||
        art.tags.some((t) => t.toLowerCase().includes(query));

      return matchLevel && matchCat && matchSearch;
    });
  }, [articles, selectedLevel, selectedCategory, searchQuery]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // If viewing an article detail
  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 pb-24">
        
        <button
          onClick={() => setSelectedArticle(null)}
          className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Centro de Aprendizaje</span>
        </button>

        <article className="p-6 sm:p-10 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-8">
          
          <div className="space-y-4 border-b border-slate-800 pb-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-0.5 rounded bg-violet-950/60 text-violet-300 border border-violet-800/40">
                {selectedArticle.category}
              </span>
              <span className="text-slate-400">{selectedArticle.level}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedArticle.readTime}</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">{selectedArticle.publishedAt}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {selectedArticle.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed border-l-2 border-violet-500 pl-4">
              {selectedArticle.summary}
            </p>
          </div>

          {/* Article Prose Content */}
          <div className="space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed">
            {selectedArticle.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Code Snippet */}
          {selectedArticle.codeBlock && (
            <div className="space-y-2 pt-2">
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#060911]">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-2 text-violet-300">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>{selectedArticle.codeBlock.language}</span>
                  </span>
                  <button
                    onClick={() => handleCopyCode(selectedArticle.codeBlock!.code)}
                    className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar código</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  <code>{selectedArticle.codeBlock.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tags & Author footer */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex flex-wrap gap-2 font-mono">
              {selectedArticle.tags.map((t) => (
                <span key={t} className="bg-slate-800/60 px-2 py-0.5 rounded text-slate-300">
                  #{t}
                </span>
              ))}
            </div>

            <div>
              Autor: <strong className="text-slate-200">{selectedArticle.author}</strong>
            </div>
          </div>

        </article>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
          Centro de Aprendizaje
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Artículos técnicos, guías y buenas prácticas de ingeniería.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Conocimiento directo basado en experiencias de proyectos reales. Sin contenido redundante ni artículos teóricos vacíos: tutoriales con código comprobado, diseño de APIs y consejos de depuración.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, temática (#typescript, #rest)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 px-3 py-2 focus:outline-none focus:border-violet-500"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  Nivel: {lvl}
                </option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 px-3 py-2 focus:outline-none focus:border-violet-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  Categoría: {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="p-6 rounded-xl bg-slate-900/30 border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-violet-400">{article.category}</span>
                <span className="text-slate-500">{article.readTime}</span>
              </div>

              <h3 className="text-base font-bold text-slate-100 group-hover:text-violet-300 transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {article.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="text-[11px] text-slate-500">{article.level}</span>
              <span className="text-violet-400 group-hover:translate-x-0.5 transition-transform">
                Leer artículo &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
