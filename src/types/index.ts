export type UserRole = 'user' | 'moderator' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: UserRole;
  bio: string;
  experienceLevel: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Lead / Arquitecto';
  favoriteTech: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  joinedDate: string;
}

export type ProjectStatus = 'Concepto' | 'Prototipo' | 'En desarrollo' | 'Publicado' | 'Archivado';

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  summary: string;
  category: 'Páginas web' | 'Landing pages' | 'Aplicaciones web' | 'Sistemas de gestión' | 'Reservas y citas' | 'Herramientas digitales' | 'Experiencias 3D' | 'Experimentos tecnológicos';
  status: ProjectStatus;
  imageUrl: string;
  problemSolved: string;
  architectureDecisions: string;
  features: string[];
  techStack: string[];
  challengesLearned: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  benefits: string[];
  includedFeatures: string[];
  scope: string;
  exclusions: string;
  clientRequirements: string;
  pricingNote: string;
  estimatedTimeline: string;
  faq: { question: string; answer: string }[];
}

export type RequestStatus = 
  | 'Nueva' 
  | 'En revisión' 
  | 'Contactada' 
  | 'Propuesta enviada' 
  | 'Aceptada' 
  | 'En desarrollo' 
  | 'Finalizada' 
  | 'Descartada';

export interface ServiceRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  preferredContact: 'email' | 'whatsapp' | 'telegram';
  projectType: string;
  description: string;
  desiredFeatures: string;
  budgetRange?: string;
  timeline?: string;
  referenceLinks?: string;
  status: RequestStatus;
  privateNotes: string;
  createdAt: string;
}

export interface CommunityCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
}

export type PostType = 'question' | 'discussion' | 'showcase' | 'project_collab';

export interface CommunityComment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    role: UserRole;
  };
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  isAcceptedAnswer?: boolean;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  type: PostType;
  title: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    errorMessage?: string;
    expectedResult?: string;
  };
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    role: UserRole;
  };
  categoryId: string;
  tags: string[];
  reactions: {
    [key: string]: string[]; // reactionName -> array of userIds
  };
  savedBy: string[]; // array of userIds
  acceptedAnswerId?: string;
  isHidden?: boolean;
  isReported?: boolean;
  createdAt: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  objective: string;
  allowedLanguages: string[];
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  rules: string[];
  resources: string[];
  solutions: {
    id: string;
    authorName: string;
    language: string;
    explanation: string;
    code: string;
    submittedAt: string;
  }[];
  active: boolean;
}

export interface CollabProject {
  id: string;
  title: string;
  description: string;
  projectType: 'Educativo' | 'Experimental' | 'Comercial';
  status: 'Idea' | 'Buscando colaboradores' | 'En desarrollo' | 'Pausado' | 'Finalizado';
  requiredRoles: string[];
  techStack: string[];
  repoUrl?: string;
  contactInfo: string;
  creatorName: string;
  createdAt: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  summary: string;
  content: string[];
  codeBlock?: {
    language: string;
    code: string;
  };
  category: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  tags: string[];
  readTime: string;
  author: string;
  publishedAt: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  roleOrCompany: string;
  serviceTitle: string;
  rating: number;
  comment: string;
  status: 'Aprobada' | 'Pendiente';
  date: string;
}

export interface PlatformReport {
  id: string;
  type: 'bug' | 'suggestion' | 'private_claim' | 'content_flag';
  title: string;
  description: string;
  contactEmail?: string;
  targetId?: string;
  status: 'Abierto' | 'En investigación' | 'Resuelto';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  targetView?: string;
  targetId?: string;
  read: boolean;
  createdAt: string;
}
