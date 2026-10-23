import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { CommunityPost, PostType, CodingChallenge, CollabProject } from '../../types';
import { 
  MessageSquare, 
  HelpCircle, 
  Award, 
  Users, 
  Search, 
  Plus, 
  Check, 
  Heart, 
  Flame, 
  Lightbulb, 
  Code, 
  Bookmark, 
  BookmarkCheck, 
  Flag, 
  Share2, 
  X, 
  CheckCircle2, 
  Send, 
  Terminal, 
  ArrowLeft,
  Trash2,
  EyeOff
} from 'lucide-react';

export const CommunityView: React.FC = () => {
  const {
    posts,
    comments,
    categories,
    selectedPost,
    setSelectedPost,
    currentUser,
    addPost,
    deletePost,
    togglePostReaction,
    toggleSavePost,
    reportPost,
    moderatePostHide,
    addComment,
    setAcceptedAnswer,
    challenges,
    submitChallengeSolution,
    collabProjects,
    addCollabProject,
  } = useApp();

  // Tab navigation inside community
  const [activeTab, setActiveTab] = useState<'posts' | 'challenges' | 'collab' | 'categories'>('posts');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlySaved, setOnlySaved] = useState<boolean>(false);

  // New Post Modal
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [newPostData, setNewPostData] = useState({
    title: '',
    type: 'question' as PostType,
    categoryId: categories[0]?.id || 'cat-frontend',
    content: '',
    tags: '',
    hasCode: false,
    codeLang: 'typescript',
    codeText: '',
    errorMessage: '',
    expectedResult: '',
  });

  // New Collab Modal
  const [isNewCollabModalOpen, setIsNewCollabModalOpen] = useState(false);
  const [newCollabData, setNewCollabData] = useState({
    title: '',
    description: '',
    projectType: 'Educativo' as 'Educativo' | 'Experimental' | 'Comercial',
    requiredRoles: '',
    techStack: '',
    repoUrl: '',
    contactInfo: '',
  });

  // Challenge Solution Modal
  const [selectedChallengeForSolution, setSelectedChallengeForSolution] = useState<CodingChallenge | null>(null);
  const [solutionData, setSolutionData] = useState({
    language: 'TypeScript',
    explanation: '',
    code: '',
  });

  // Detail view comment box
  const [newCommentContent, setNewCommentContent] = useState('');
  const [newCommentCode, setNewCommentCode] = useState('');
  const [showCodeInputInComment, setShowCodeInputInComment] = useState(false);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Hide post if moderated unless admin/moderator
      if (post.isHidden && currentUser?.role === 'user') return false;

      const matchCat = selectedCategory === 'all' || post.categoryId === selectedCategory;
      const matchType = selectedType === 'all' || post.type === selectedType;
      const matchSaved = !onlySaved || (currentUser?.id ? post.savedBy.includes(currentUser.id) : false);
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));

      return matchCat && matchType && matchSaved && matchSearch;
    });
  }, [posts, selectedCategory, selectedType, onlySaved, searchQuery, currentUser]);

  // Handle post creation
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostData.title.trim() || !newPostData.content.trim()) return;

    addPost({
      title: newPostData.title.trim(),
      type: newPostData.type,
      categoryId: newPostData.categoryId,
      content: newPostData.content.trim(),
      tags: newPostData.tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean),
      codeSnippet: newPostData.hasCode
        ? {
            language: newPostData.codeLang,
            code: newPostData.codeText.trim(),
            errorMessage: newPostData.errorMessage.trim() || undefined,
            expectedResult: newPostData.expectedResult.trim() || undefined,
          }
        : undefined,
    });

    setIsNewPostModalOpen(false);
    setNewPostData({
      title: '',
      type: 'question',
      categoryId: categories[0]?.id || 'cat-frontend',
      content: '',
      tags: '',
      hasCode: false,
      codeLang: 'typescript',
      codeText: '',
      errorMessage: '',
      expectedResult: '',
    });
  };

  // Handle collab creation
  const handleCreateCollab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollabData.title.trim() || !newCollabData.description.trim()) return;

    addCollabProject({
      title: newCollabData.title.trim(),
      description: newCollabData.description.trim(),
      projectType: newCollabData.projectType,
      status: 'Buscando colaboradores',
      requiredRoles: newCollabData.requiredRoles.split(',').map((r) => r.trim()).filter(Boolean),
      techStack: newCollabData.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      repoUrl: newCollabData.repoUrl.trim() || undefined,
      contactInfo: newCollabData.contactInfo.trim(),
    });

    setIsNewCollabModalOpen(false);
    setNewCollabData({
      title: '',
      description: '',
      projectType: 'Educativo',
      requiredRoles: '',
      techStack: '',
      repoUrl: '',
      contactInfo: '',
    });
  };

  // Handle comment submit
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !newCommentContent.trim()) return;

    addComment(
      selectedPost.id,
      newCommentContent.trim(),
      newCommentCode.trim() ? { language: 'typescript', code: newCommentCode.trim() } : undefined
    );

    setNewCommentContent('');
    setNewCommentCode('');
    setShowCodeInputInComment(false);
  };

  // Handle solution submit
  const handleChallengeSolutionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallengeForSolution || !solutionData.code.trim()) return;

    submitChallengeSolution(selectedChallengeForSolution.id, {
      language: solutionData.language,
      explanation: solutionData.explanation.trim(),
      code: solutionData.code.trim(),
    });

    setSelectedChallengeForSolution(null);
    setSolutionData({ language: 'TypeScript', explanation: '', code: '' });
  };

  // Post detail comments
  const postComments = useMemo(() => {
    if (!selectedPost) return [];
    return comments.filter((c) => c.postId === selectedPost.id);
  }, [comments, selectedPost]);

  // If a post is selected, render the dedicated Post Detail View
  if (selectedPost) {
    const isAuthor = selectedPost.author.id === currentUser?.id;
    const canModerate = currentUser?.role === 'admin' || currentUser?.role === 'moderator';
    const isSaved = currentUser?.id ? selectedPost.savedBy.includes(currentUser.id) : false;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 pb-24">
        
        {/* Back navigation */}
        <button
          onClick={() => setSelectedPost(null)}
          className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Comunidad</span>
        </button>

        {/* Post Card */}
        <article className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
          
          {/* Post Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
            <div className="flex items-center gap-3">
              <img
                src={selectedPost.author.avatar}
                alt={selectedPost.author.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-100">{selectedPost.author.name}</span>
                  <span className="text-xs font-mono text-slate-500">@{selectedPost.author.username}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-950/60 text-violet-300 border border-violet-800/40 capitalize">
                    {selectedPost.author.role}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Publicado el {new Date(selectedPost.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-slate-800/80 text-violet-300 border border-slate-700 capitalize">
                {selectedPost.type}
              </span>
              {selectedPost.isHidden && (
                <span className="px-2 py-0.5 text-xs font-mono rounded bg-red-950 text-red-300 border border-red-800">
                  Oculto
                </span>
              )}
            </div>
          </div>

          {/* Title & Prose */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {selectedPost.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
              {selectedPost.content}
            </p>
          </div>

          {/* Code Snippet if present */}
          {selectedPost.codeSnippet && (
            <div className="space-y-3 pt-2">
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#060911]">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-2 text-violet-300">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>{selectedPost.codeSnippet.language}</span>
                  </span>
                  <span className="text-[11px] text-slate-500">Solo lectura</span>
                </div>
                <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                  <code>{selectedPost.codeSnippet.code}</code>
                </pre>
              </div>

              {selectedPost.codeSnippet.errorMessage && (
                <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-xs font-mono text-red-300 space-y-1">
                  <span className="font-semibold text-red-200">Mensaje de Error en Consola:</span>
                  <div className="text-[11px] text-red-300">{selectedPost.codeSnippet.errorMessage}</div>
                </div>
              )}

              {selectedPost.codeSnippet.expectedResult && (
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs font-mono text-emerald-300 space-y-1">
                  <span className="font-semibold text-emerald-200">Resultado Esperado:</span>
                  <div className="text-[11px] text-emerald-300">{selectedPost.codeSnippet.expectedResult}</div>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {selectedPost.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono text-slate-400 bg-slate-800/50 px-2.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>

          {/* Reactions and Controls */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* Reactions bar */}
            <div className="flex items-center gap-2">
              {[
                { key: 'like', icon: Heart, label: 'Me gusta' },
                { key: 'fire', icon: Flame, label: 'Fuego' },
                { key: 'idea', icon: Lightbulb, label: 'Idea' },
                { key: 'code', icon: Code, label: 'Código' },
              ].map(({ key, icon: Icon, label }) => {
                const count = selectedPost.reactions[key]?.length || 0;
                const hasReacted = selectedPost.reactions[key]?.includes(currentUser.id);

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => togglePostReaction(selectedPost.id, key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      hasReacted
                        ? 'bg-violet-900/60 text-violet-200 border border-violet-700/60'
                        : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                    }`}
                    title={label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Save, Report & Moderation */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleSavePost(selectedPost.id)}
                className={`p-2 rounded-lg text-xs transition-colors flex items-center gap-1.5 ${
                  isSaved
                    ? 'bg-sky-950/60 text-sky-300 border border-sky-800/60'
                    : 'text-slate-400 hover:text-white bg-slate-800/50 border border-slate-700/60'
                }`}
                title={isSaved ? 'Guardado en favoritos' : 'Guardar publicación'}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4 text-sky-400" /> : <Bookmark className="w-4 h-4" />}
                <span className="text-[11px] font-mono">{isSaved ? 'Guardado' : 'Guardar'}</span>
              </button>

              <button
                type="button"
                onClick={() => reportPost(selectedPost.id)}
                className="p-2 rounded-lg text-xs text-slate-400 hover:text-red-300 bg-slate-800/50 border border-slate-700/60 transition-colors"
                title="Denunciar publicación"
              >
                <Flag className="w-4 h-4" />
              </button>

              {canModerate && (
                <button
                  type="button"
                  onClick={() => moderatePostHide(selectedPost.id, !selectedPost.isHidden)}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-amber-300 bg-amber-950/50 border border-amber-800/60 hover:bg-amber-900/50"
                  title="Ocultar de la comunidad"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                </button>
              )}

              {(isAuthor || canModerate) && (
                <button
                  type="button"
                  onClick={() => deletePost(selectedPost.id)}
                  className="p-2 rounded-lg text-xs text-red-400 hover:text-red-200 bg-red-950/40 border border-red-800/40 transition-colors"
                  title="Eliminar publicación"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </article>

        {/* Comments & Answers Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-violet-400" />
              <span>Respuestas y Comentarios ({postComments.length})</span>
            </h3>
            {selectedPost.acceptedAnswerId && (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Solución Verificada</span>
              </span>
            )}
          </div>

          {/* List of comments */}
          <div className="space-y-4">
            {postComments.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">
                Aún no hay respuestas a esta publicación. Sé el primero en compartir tu experiencia técnica.
              </p>
            ) : (
              postComments.map((comment) => {
                const isAccepted = comment.isAcceptedAnswer || selectedPost.acceptedAnswerId === comment.id;

                return (
                  <div
                    key={comment.id}
                    className={`p-5 rounded-xl border transition-all space-y-4 ${
                      isAccepted
                        ? 'bg-emerald-950/20 border-emerald-800/60 shadow-lg shadow-emerald-950/20'
                        : 'bg-slate-900/30 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-100">{comment.author.name}</span>
                            <span className="text-[11px] font-mono text-slate-400">@{comment.author.username}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Accepted Answer Badge or Action for Author */}
                      {isAccepted ? (
                        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Respuesta Aceptada</span>
                        </div>
                      ) : (
                        isAuthor && (
                          <button
                            type="button"
                            onClick={() => setAcceptedAnswer(selectedPost.id, comment.id)}
                            className="text-xs font-mono text-slate-400 hover:text-emerald-400 border border-slate-700 hover:border-emerald-600 px-2 py-1 rounded transition-colors"
                          >
                            Marcar como solución
                          </button>
                        )
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                      {comment.content}
                    </p>

                    {comment.codeSnippet && (
                      <div className="rounded-lg overflow-hidden border border-slate-800 bg-[#060911]">
                        <pre className="p-3 text-xs font-mono text-slate-200 overflow-x-auto">
                          <code>{comment.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Add comment box */}
          <form onSubmit={handleAddComment} className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Añadir una respuesta técnica
            </h4>

            <textarea
              rows={3}
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              placeholder="Escribe tu respuesta con explicaciones claras..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500 resize-none"
            />

            {showCodeInputInComment ? (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Fragmento de código:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCodeInputInComment(false);
                      setNewCommentCode('');
                    }}
                    className="text-slate-500 hover:text-slate-300"
                  >
                    Quitar código
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={newCommentCode}
                  onChange={(e) => setNewCommentCode(e.target.value)}
                  placeholder="// Escribe aquí el fragmento de código relevante..."
                  className="w-full px-3 py-2 bg-[#060911] border border-slate-800 rounded-lg text-xs font-mono text-slate-200 focus:outline-none focus:border-violet-500 resize-none"
                />
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowCodeInputInComment(true)}
                className="text-xs font-mono text-violet-400 hover:text-violet-300 flex items-center gap-1.5"
              >
                <Code className="w-3.5 h-3.5" />
                <span>+ Adjuntar bloque de código</span>
              </button>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={!newCommentContent.trim()}
                className="px-5 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publicar Respuesta</span>
              </button>
            </div>
          </form>

        </section>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 pb-24">
      
      {/* Community Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-violet-400">
            Comunidad NEBULØN
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Programación, debates técnicos y colaboración abierta.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Un espacio donde programadores principiantes, ingenieros experimentados y entusiastas de la tecnología comparten soluciones, resuelven errores y colaboran en proyectos sin filtros vacíos.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsNewPostModalOpen(true)}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-violet-900/30 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Publicación</span>
          </button>

          <button
            type="button"
            onClick={() => setIsNewCollabModalOpen(true)}
            className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>Buscar Colaboradores</span>
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800">
        {[
          { id: 'posts', label: 'Publicaciones y Preguntas', icon: MessageSquare },
          { id: 'challenges', label: 'Retos Semanales', icon: Award },
          { id: 'collab', label: 'Búsqueda de Colaboradores', icon: Users },
          { id: 'categories', label: 'Categorías Temáticas', icon: Terminal },
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

      {/* Tab 1: Posts & Q&A */}
      {activeTab === 'posts' && (
        <div className="space-y-6">
          
          {/* Controls: search, category, type filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por título, contenido o etiqueta (#sql, #typescript)..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 px-3 py-2 focus:outline-none focus:border-violet-500"
              >
                <option value="all">Todas las categorías</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 px-3 py-2 focus:outline-none focus:border-violet-500"
              >
                <option value="all">Todos los formatos</option>
                <option value="question">Preguntas Técnicas</option>
                <option value="discussion">Debates y Discusiones</option>
                <option value="showcase">Proyectos Compartidos</option>
              </select>

              <button
                type="button"
                onClick={() => setOnlySaved(!onlySaved)}
                className={`px-3 py-2 text-xs font-mono rounded-lg border transition-colors flex items-center gap-1.5 ${
                  onlySaved
                    ? 'bg-sky-950/60 text-sky-300 border-sky-800/60'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Mis Guardados</span>
              </button>
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center rounded-xl bg-slate-900/20 border border-slate-800 space-y-3">
              <p className="text-sm text-slate-400">
                No hay publicaciones que coincidan con los filtros seleccionados.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedType('all');
                  setSearchQuery('');
                  setOnlySaved(false);
                }}
                className="text-xs text-violet-400 hover:underline"
              >
                Restablecer filtros de búsqueda
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post) => {
                const isAccepted = Boolean(post.acceptedAnswerId);
                const isSaved = post.savedBy.includes(currentUser.id);
                const reactionsCount = Object.values(post.reactions).reduce(
                  (acc, uids) => acc + uids.length,
                  0
                );
                const commentCount = comments.filter((c) => c.postId === post.id).length;

                return (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="p-5 rounded-xl bg-slate-900/30 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-medium text-slate-200">{post.author.name}</span>
                        <span className="text-slate-500 font-mono">@{post.author.username}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-slate-500 font-mono">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isAccepted && (
                          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>Solución</span>
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-violet-400 bg-violet-950/60 px-2 py-0.5 rounded border border-violet-800/40 capitalize">
                          {post.type}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-semibold text-slate-100 hover:text-violet-300 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                        {post.tags.map((t) => (
                          <span key={t} className="text-slate-400">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 font-mono text-[11px]">
                        <span className="flex items-center gap-1 text-slate-400">
                          <Heart className="w-3.5 h-3.5" />
                          <span>{reactionsCount}</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{commentCount}</span>
                        </span>
                        {isSaved && <BookmarkCheck className="w-3.5 h-3.5 text-sky-400" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* Tab 2: Coding Challenges */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-900/30 text-xs text-slate-300 leading-relaxed">
            <strong className="text-violet-300">Retos semanales:</strong> Ejercicios de algoritmos y estructuras de datos para ejercitar la lógica de programación. No ejecutamos código arbitrario en el servidor; cada participante publica su solución estructurada con análisis de complejidad y explicación.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="p-6 rounded-xl bg-slate-900/30 border border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-violet-400 font-semibold">{challenge.difficulty}</span>
                    <span className="text-slate-500 font-mono">{challenge.solutions.length} soluciones</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{challenge.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{challenge.description}</p>
                  
                  <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60 text-xs text-slate-300 space-y-1">
                    <span className="font-semibold text-slate-200 font-mono">Objetivo: </span>
                    <span>{challenge.objective}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-400">
                    Lenguajes: {challenge.allowedLanguages.join(', ')}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedChallengeForSolution(challenge)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors"
                  >
                    Enviar Solución
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Collab Projects */}
      {activeTab === 'collab' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-900/30 text-xs text-slate-300 leading-relaxed">
            <strong className="text-sky-300">Tablón de Colaboración:</strong> Conoce compañeros para construir proyectos conjuntos (open-source, educativos o de práctica). Recuerda siempre definir licencias, responsabilidades y alcance antes de iniciar.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collabProjects.map((collab) => (
              <div
                key={collab.id}
                className="p-6 rounded-xl bg-slate-900/30 border border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-sky-400 font-semibold">{collab.status}</span>
                    <span className="text-slate-500 font-mono">{collab.projectType}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{collab.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{collab.description}</p>

                  <div className="space-y-2 pt-1 text-xs">
                    <div>
                      <span className="font-mono text-slate-400 font-semibold">Roles Requeridos: </span>
                      <span className="text-slate-200">{collab.requiredRoles.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-mono text-slate-400 font-semibold">Tecnologías: </span>
                      <span className="text-violet-300">{collab.techStack.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Por {collab.creatorName}</span>
                  <div className="text-slate-300 font-mono text-[11px] bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    {collab.contactInfo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Categories Catalog */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const count = posts.filter((p) => p.categoryId === cat.id).length;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveTab('posts');
                }}
                className="p-5 rounded-xl bg-slate-900/30 border border-slate-800 hover:border-violet-500/50 cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-slate-100">{cat.name}</h4>
                  <span className="text-[11px] font-mono text-violet-400 bg-violet-950/60 px-2 py-0.5 rounded border border-violet-800/40">
                    {count} temas
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: New Post / Question */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0b101e] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/40">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Nueva Publicación en la Comunidad
              </h3>
              <button
                onClick={() => setIsNewPostModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 sm:p-8 space-y-5 overflow-y-auto">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">Tipo de Contenido</label>
                  <select
                    value={newPostData.type}
                    onChange={(e) => setNewPostData({ ...newPostData, type: e.target.value as PostType })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  >
                    <option value="question">Pregunta Técnica</option>
                    <option value="discussion">Debate / Discusión</option>
                    <option value="showcase">Compartir Proyecto</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-200">Categoría</label>
                  <select
                    value={newPostData.categoryId}
                    onChange={(e) => setNewPostData({ ...newPostData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Título de la Publicación <span className="text-violet-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newPostData.title}
                  onChange={(e) => setNewPostData({ ...newPostData, title: e.target.value })}
                  placeholder="Ej. ¿Cómo estructurar índices compuestos en PostgreSQL para búsquedas de rango?"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Descripción Detallada <span className="text-violet-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={newPostData.content}
                  onChange={(e) => setNewPostData({ ...newPostData, content: e.target.value })}
                  placeholder="Explica el contexto del problema, qué has intentado y qué dudas tienes..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500 resize-none"
                />
              </div>

              {/* Toggle Code Snippet */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={newPostData.hasCode}
                    onChange={(e) => setNewPostData({ ...newPostData, hasCode: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-900 text-violet-600 focus:ring-violet-500"
                  />
                  <span>Incluir fragmento de código estructurado</span>
                </label>
              </div>

              {newPostData.hasCode && (
                <div className="space-y-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">Lenguaje del código</label>
                    <input
                      type="text"
                      value={newPostData.codeLang}
                      onChange={(e) => setNewPostData({ ...newPostData, codeLang: e.target.value })}
                      placeholder="typescript, python, sql..."
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-slate-200 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">Código fuente</label>
                    <textarea
                      rows={4}
                      value={newPostData.codeText}
                      onChange={(e) => setNewPostData({ ...newPostData, codeText: e.target.value })}
                      placeholder="// Pega tu código aquí..."
                      className="w-full px-2.5 py-1.5 bg-[#060911] border border-slate-800 rounded text-xs font-mono text-slate-200 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">Mensaje de error (opcional)</label>
                    <input
                      type="text"
                      value={newPostData.errorMessage}
                      onChange={(e) => setNewPostData({ ...newPostData, errorMessage: e.target.value })}
                      placeholder="Ej. TypeError: Cannot read property 'map' of undefined"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs font-mono text-red-300 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Etiquetas (separadas por coma)
                </label>
                <input
                  type="text"
                  value={newPostData.tags}
                  onChange={(e) => setNewPostData({ ...newPostData, tags: e.target.value })}
                  placeholder="react, typescript, performance"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors"
                >
                  Publicar en la Comunidad
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Modal: New Collab Project */}
      {isNewCollabModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#0b101e] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/40">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Publicar Proyecto en Colaboración
              </h3>
              <button onClick={() => setIsNewCollabModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCollab} className="p-6 space-y-4 overflow-y-auto">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Título del Proyecto</label>
                <input
                  type="text"
                  required
                  value={newCollabData.title}
                  onChange={(e) => setNewCollabData({ ...newCollabData, title: e.target.value })}
                  placeholder="Ej. Visualizador de Estructuras de Datos en Canvas"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Tipo de Proyecto</label>
                <select
                  value={newCollabData.projectType}
                  onChange={(e) => setNewCollabData({ ...newCollabData, projectType: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                >
                  <option value="Educativo">Educativo</option>
                  <option value="Experimental">Experimental</option>
                  <option value="Comercial">Comercial</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Descripción y Objetivos</label>
                <textarea
                  rows={3}
                  required
                  value={newCollabData.description}
                  onChange={(e) => setNewCollabData({ ...newCollabData, description: e.target.value })}
                  placeholder="Explica qué quieres construir y en qué fase se encuentra..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Roles Buscados (separados por coma)</label>
                <input
                  type="text"
                  required
                  value={newCollabData.requiredRoles}
                  onChange={(e) => setNewCollabData({ ...newCollabData, requiredRoles: e.target.value })}
                  placeholder="Frontend Developer, Diseñador UI/UX"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Tecnologías Principales</label>
                <input
                  type="text"
                  required
                  value={newCollabData.techStack}
                  onChange={(e) => setNewCollabData({ ...newCollabData, techStack: e.target.value })}
                  placeholder="TypeScript, React, Tailwind CSS"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Información de Contacto</label>
                <input
                  type="text"
                  required
                  value={newCollabData.contactInfo}
                  onChange={(e) => setNewCollabData({ ...newCollabData, contactInfo: e.target.value })}
                  placeholder="Discord @miusuario o correo electronico"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewCollabModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg"
                >
                  Publicar Convocatoria
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Modal: Submit Challenge Solution */}
      {selectedChallengeForSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#0b101e] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/40">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Enviar Solución al Reto
              </h3>
              <button onClick={() => setSelectedChallengeForSolution(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChallengeSolutionSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div className="text-xs text-slate-300 font-semibold">
                {selectedChallengeForSolution.title}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Lenguaje Utilizado</label>
                <input
                  type="text"
                  required
                  value={solutionData.language}
                  onChange={(e) => setSolutionData({ ...solutionData, language: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Explicación del Enfoque y Complejidad</label>
                <textarea
                  rows={3}
                  required
                  value={solutionData.explanation}
                  onChange={(e) => setSolutionData({ ...solutionData, explanation: e.target.value })}
                  placeholder="Explica qué estructura de datos utilizaste y cuál es la complejidad temporal O(n)..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">Código de la Solución</label>
                <textarea
                  rows={6}
                  required
                  value={solutionData.code}
                  onChange={(e) => setSolutionData({ ...solutionData, code: e.target.value })}
                  placeholder="// Escribe aquí tu función implementada..."
                  className="w-full px-3 py-2 bg-[#060911] border border-slate-800 rounded-lg text-xs font-mono text-slate-200 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedChallengeForSolution(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg"
                >
                  Registrar Solución
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
