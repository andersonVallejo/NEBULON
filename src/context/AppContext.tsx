import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProjectItem,
  ServiceItem,
  ServiceRequest,
  CommunityCategory,
  CommunityPost,
  CommunityComment,
  CodingChallenge,
  CollabProject,
  ArticleItem,
  ReviewItem,
  PlatformReport,
  UserProfile,
  NotificationItem,
  UserRole,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_REQUESTS,
  INITIAL_CATEGORIES,
  INITIAL_POSTS,
  INITIAL_COMMENTS,
  INITIAL_CHALLENGES,
  INITIAL_COLLAB_PROJECTS,
  INITIAL_ARTICLES,
  INITIAL_REVIEWS,
  INITIAL_REPORTS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

export type AppView = 
  | 'home' 
  | 'portfolio' 
  | 'services' 
  | 'community' 
  | 'lab' 
  | 'learn' 
  | 'about' 
  | 'contact' 
  | 'reviews' 
  | 'admin';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  users: UserProfile[];
  switchUserRole: (role: UserRole) => void;
  updateCurrentUserProfile: (updates: Partial<UserProfile>) => void;
  
  // Projects
  projects: ProjectItem[];
  selectedProject: ProjectItem | null;
  setSelectedProject: (project: ProjectItem | null) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  // Services & Requests
  services: ServiceItem[];
  selectedService: ServiceItem | null;
  setSelectedService: (service: ServiceItem | null) => void;
  serviceRequests: ServiceRequest[];
  submitServiceRequest: (request: Omit<ServiceRequest, 'id' | 'status' | 'privateNotes' | 'createdAt'>) => string;
  updateRequestStatus: (id: string, status: ServiceRequest['status']) => void;
  addRequestPrivateNote: (id: string, note: string) => void;

  // Community
  categories: CommunityCategory[];
  posts: CommunityPost[];
  comments: CommunityComment[];
  selectedPost: CommunityPost | null;
  setSelectedPost: (post: CommunityPost | null) => void;
  addPost: (post: Omit<CommunityPost, 'id' | 'author' | 'reactions' | 'savedBy' | 'createdAt'>) => void;
  deletePost: (id: string) => void;
  togglePostReaction: (postId: string, reactionKey: string) => void;
  toggleSavePost: (postId: string) => void;
  reportPost: (postId: string) => void;
  moderatePostHide: (postId: string, hide: boolean) => void;
  addComment: (postId: string, content: string, codeSnippet?: { language: string; code: string }) => void;
  setAcceptedAnswer: (postId: string, commentId: string) => void;

  // Challenges
  challenges: CodingChallenge[];
  submitChallengeSolution: (challengeId: string, solution: { language: string; explanation: string; code: string }) => void;

  // Collab
  collabProjects: CollabProject[];
  addCollabProject: (project: Omit<CollabProject, 'id' | 'creatorName' | 'createdAt'>) => void;

  // Learn
  articles: ArticleItem[];
  selectedArticle: ArticleItem | null;
  setSelectedArticle: (article: ArticleItem | null) => void;

  // Reviews & Reports
  reviews: ReviewItem[];
  addReview: (review: Omit<ReviewItem, 'id' | 'status' | 'date'>) => void;
  moderateReview: (id: string, status: 'Aprobada' | 'Pendiente') => void;
  reports: PlatformReport[];
  submitReport: (report: Omit<PlatformReport, 'id' | 'status' | 'createdAt'>) => void;
  updateReportStatus: (id: string, status: PlatformReport['status']) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isQuoteModalOpen: boolean;
  setIsQuoteModalOpen: (open: boolean) => void;
  policyModal: 'privacy' | 'terms' | 'rules' | 'cookies' | null;
  setPolicyModal: (policy: 'privacy' | 'terms' | 'rules' | 'cookies' | null) => void;
  isBrandGuideModalOpen: boolean;
  setIsBrandGuideModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`nebulon_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn(`Error reading from localStorage for ${key}`, e);
    return fallback;
  }
}

function saveStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`nebulon_${key}`, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error saving to localStorage for ${key}`, e);
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const loaded = loadStorage('users', INITIAL_USERS);
      if (Array.isArray(loaded) && loaded.length > 0) {
        return loaded.map((u) =>
          u && u.id === 'user_admin' ? { ...u, avatar: import.meta.env.BASE_URL + 'assets/aistudio/image_72f5fead.png' } : u
        );
      }
      return INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    return INITIAL_USERS[0];
  });

  // Projects: repair legacy image paths saved before assets were bundled by Vite.
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const storedProjects = loadStorage<ProjectItem[]>('projects', INITIAL_PROJECTS);
    if (!Array.isArray(storedProjects)) return INITIAL_PROJECTS;

    return storedProjects.map((project) => {
      const imagePath = typeof project?.imageUrl === 'string' ? project.imageUrl : '';
      const hasLegacyLocalPath =
        imagePath.startsWith('/src/assets/images/') ||
        imagePath.startsWith('/NEBULON/assets/images/') ||
        imagePath.startsWith('/assets/images/');

      if (!hasLegacyLocalPath) return project;

      const defaultProject = INITIAL_PROJECTS.find((item) => item.id === project.id);
      return defaultProject ? { ...project, imageUrl: defaultProject.imageUrl } : project;
    });
  });
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Services
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(() => loadStorage('requests', INITIAL_REQUESTS));

  // Community
  const [categories] = useState<CommunityCategory[]>(INITIAL_CATEGORIES);
  const [posts, setPosts] = useState<CommunityPost[]>(() => loadStorage('posts', INITIAL_POSTS));
  const [comments, setComments] = useState<CommunityComment[]>(() => loadStorage('comments', INITIAL_COMMENTS));
  const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null);

  // Challenges
  const [challenges, setChallenges] = useState<CodingChallenge[]>(() => loadStorage('challenges', INITIAL_CHALLENGES));

  // Collab
  const [collabProjects, setCollabProjects] = useState<CollabProject[]>(() => loadStorage('collab', INITIAL_COLLAB_PROJECTS));

  // Learn
  const [articles] = useState<ArticleItem[]>(INITIAL_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  // Reviews & Reports
  const [reviews, setReviews] = useState<ReviewItem[]>(() => loadStorage('reviews', INITIAL_REVIEWS));
  const [reports, setReports] = useState<PlatformReport[]>(() => loadStorage('reports', INITIAL_REPORTS));

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => loadStorage('notifications', INITIAL_NOTIFICATIONS));

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<'privacy' | 'terms' | 'rules' | 'cookies' | null>(null);
  const [isBrandGuideModalOpen, setIsBrandGuideModalOpen] = useState(false);

  // Save sync
  useEffect(() => { saveStorage('projects', projects); }, [projects]);
  useEffect(() => { saveStorage('requests', serviceRequests); }, [serviceRequests]);
  useEffect(() => { saveStorage('posts', posts); }, [posts]);
  useEffect(() => { saveStorage('comments', comments); }, [comments]);
  useEffect(() => { saveStorage('challenges', challenges); }, [challenges]);
  useEffect(() => { saveStorage('collab', collabProjects); }, [collabProjects]);
  useEffect(() => { saveStorage('reviews', reviews); }, [reviews]);
  useEffect(() => { saveStorage('reports', reports); }, [reports]);
  useEffect(() => { saveStorage('notifications', notifications); }, [notifications]);
  useEffect(() => { saveStorage('users', users); }, [users]);

  // Handle switching view safely
  const handleSetCurrentView = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchUserRole = (role: UserRole) => {
    const matchedUser = users.find(u => u.role === role);
    if (matchedUser) {
      setCurrentUser(matchedUser);
    } else {
      const updated = { ...currentUser, role };
      setCurrentUser(updated);
    }
  };

  const updateCurrentUserProfile = (updates: Partial<UserProfile>) => {
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  };

  // Projects CRUD
  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = {
      ...project,
      id: `proj-${Date.now()}`
    };
    setProjects(prev => [newProj, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    if (selectedProject?.id === id) {
      setSelectedProject(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (selectedProject?.id === id) {
      setSelectedProject(null);
    }
  };

  // Service Requests
  const submitServiceRequest = (request: Omit<ServiceRequest, 'id' | 'status' | 'privateNotes' | 'createdAt'>): string => {
    const newId = `req-${Date.now().toString().slice(-4)}`;
    const newReq: ServiceRequest = {
      ...request,
      id: newId,
      status: 'Nueva',
      privateNotes: '',
      createdAt: new Date().toISOString(),
    };
    setServiceRequests(prev => [newReq, ...prev]);

    // Send internal notification to admin
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: 'user_admin',
      title: 'Nueva solicitud de servicio',
      message: `${request.clientName} ha enviado una solicitud para "${request.projectType}".`,
      targetView: 'admin',
      targetId: newId,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newId;
  };

  const updateRequestStatus = (id: string, status: ServiceRequest['status']) => {
    setServiceRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const addRequestPrivateNote = (id: string, note: string) => {
    setServiceRequests(prev => prev.map(r => {
      if (r.id !== id) return r;
      const updatedNotes = r.privateNotes 
        ? `${r.privateNotes}\n[${new Date().toLocaleDateString()}] ${note}` 
        : `[${new Date().toLocaleDateString()}] ${note}`;
      return { ...r, privateNotes: updatedNotes };
    }));
  };

  // Community
  const addPost = (post: Omit<CommunityPost, 'id' | 'author' | 'reactions' | 'savedBy' | 'createdAt'>) => {
    const newPost: CommunityPost = {
      ...post,
      id: `post-${Date.now()}`,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        role: currentUser.role,
      },
      reactions: {},
      savedBy: [],
      createdAt: new Date().toISOString(),
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    setComments(prev => prev.filter(c => c.postId !== id));
    if (selectedPost?.id === id) {
      setSelectedPost(null);
    }
  };

  const togglePostReaction = (postId: string, reactionKey: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      const currentReactions = { ...post.reactions };
      const usersList = currentReactions[reactionKey] ? [...currentReactions[reactionKey]] : [];
      const hasReacted = usersList.includes(currentUser.id);

      if (hasReacted) {
        currentReactions[reactionKey] = usersList.filter(uid => uid !== currentUser.id);
      } else {
        currentReactions[reactionKey] = [...usersList, currentUser.id];
      }

      const updatedPost = { ...post, reactions: currentReactions };
      if (selectedPost?.id === postId) {
        setSelectedPost(updatedPost);
      }
      return updatedPost;
    }));
  };

  const toggleSavePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      const isSaved = post.savedBy.includes(currentUser.id);
      const updatedSavedBy = isSaved 
        ? post.savedBy.filter(uid => uid !== currentUser.id)
        : [...post.savedBy, currentUser.id];

      const updated = { ...post, savedBy: updatedSavedBy };
      if (selectedPost?.id === postId) {
        setSelectedPost(updated);
      }
      return updated;
    }));
  };

  const reportPost = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, isReported: true } : p));
    // Add report to platform reports queue
    const reportItem: PlatformReport = {
      id: `rep-${Date.now()}`,
      type: 'content_flag',
      title: `Denuncia sobre publicación ID ${postId}`,
      description: `Un miembro de la comunidad ha denunciado la publicación ${postId} para revisión de moderación.`,
      targetId: postId,
      status: 'Abierto',
      createdAt: new Date().toISOString(),
    };
    setReports(prev => [reportItem, ...prev]);

    // Notify moderators and admins
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      userId: 'user_mod',
      title: 'Publicación denunciada en la comunidad',
      message: `La publicación ${postId} requiere revisión en la cola de moderación.`,
      targetView: 'admin',
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const moderatePostHide = (postId: string, hide: boolean) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, isHidden: hide } : p));
    if (selectedPost?.id === postId) {
      setSelectedPost(prev => prev ? { ...prev, isHidden: hide } : null);
    }
  };

  const addComment = (postId: string, content: string, codeSnippet?: { language: string; code: string }) => {
    const newComment: CommunityComment = {
      id: `comment-${Date.now()}`,
      postId,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        role: currentUser.role,
      },
      content,
      codeSnippet,
      createdAt: new Date().toISOString(),
    };
    setComments(prev => [...prev, newComment]);

    // Send notification to post author if not self
    const post = posts.find(p => p.id === postId);
    if (post && post.author.id !== currentUser.id) {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: post.author.id,
        title: 'Nuevo comentario en tu publicación',
        message: `${currentUser.name} respondió a tu publicación "${post.title.slice(0, 45)}...".`,
        targetView: 'community',
        targetId: postId,
        read: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const setAcceptedAnswer = (postId: string, commentId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, acceptedAnswerId: commentId } : p));
    setComments(prev => prev.map(c => {
      if (c.postId !== postId) return c;
      return { ...c, isAcceptedAnswer: c.id === commentId };
    }));
    if (selectedPost?.id === postId) {
      setSelectedPost(prev => prev ? { ...prev, acceptedAnswerId: commentId } : null);
    }
  };

  // Coding challenges
  const submitChallengeSolution = (challengeId: string, solution: { language: string; explanation: string; code: string }) => {
    const newSolution = {
      id: `sol-${Date.now()}`,
      authorName: currentUser.name,
      ...solution,
      submittedAt: new Date().toISOString(),
    };
    setChallenges(prev => prev.map(ch => ch.id === challengeId ? { ...ch, solutions: [newSolution, ...ch.solutions] } : ch));
  };

  // Collab projects
  const addCollabProject = (project: Omit<CollabProject, 'id' | 'creatorName' | 'createdAt'>) => {
    const newCollab: CollabProject = {
      ...project,
      id: `collab-${Date.now()}`,
      creatorName: currentUser.name,
      createdAt: new Date().toISOString(),
    };
    setCollabProjects(prev => [newCollab, ...prev]);
  };

  // Reviews
  const addReview = (review: Omit<ReviewItem, 'id' | 'status' | 'date'>) => {
    const newRev: ReviewItem = {
      ...review,
      id: `rev-${Date.now()}`,
      status: 'Pendiente',
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const moderateReview = (id: string, status: 'Aprobada' | 'Pendiente') => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  // Platform reports
  const submitReport = (report: Omit<PlatformReport, 'id' | 'status' | 'createdAt'>) => {
    const newReport: PlatformReport = {
      ...report,
      id: `rep-${Date.now()}`,
      status: 'Abierto',
      createdAt: new Date().toISOString(),
    };
    setReports(prev => [newReport, ...prev]);
  };

  const updateReportStatus = (id: string, status: PlatformReport['status']) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView: handleSetCurrentView,
        currentUser,
        setCurrentUser,
        users,
        switchUserRole,
        updateCurrentUserProfile,

        projects,
        selectedProject,
        setSelectedProject,
        addProject,
        updateProject,
        deleteProject,

        services,
        selectedService,
        setSelectedService,
        serviceRequests,
        submitServiceRequest,
        updateRequestStatus,
        addRequestPrivateNote,

        categories,
        posts,
        comments,
        selectedPost,
        setSelectedPost,
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

        articles,
        selectedArticle,
        setSelectedArticle,

        reviews,
        addReview,
        moderateReview,
        reports,
        submitReport,
        updateReportStatus,

        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,

        isAuthModalOpen,
        setIsAuthModalOpen,
        isQuoteModalOpen,
        setIsQuoteModalOpen,
        policyModal,
        setPolicyModal,
        isBrandGuideModalOpen,
        setIsBrandGuideModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
