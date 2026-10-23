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
} from '../types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user_admin',
    name: 'Anderson Vallejo',
    username: 'anderson_nebulon',
    email: 'andersonvallejo021@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: 'admin',
    bio: 'Fundador y arquitecto de software en NEBULØN. Especializado en sistemas web reactivos, arquitectura limpia y experiencias interactivas modernas.',
    experienceLevel: 'Lead / Arquitecto',
    favoriteTech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    joinedDate: 'Enero 2025',
  },
  {
    id: 'user_mod',
    name: 'Elena Rostova',
    username: 'elena_code',
    email: 'elena.rostova@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    role: 'moderator',
    bio: 'Ingeniera frontend senior y moderadora técnica. Apasionada por los estándares de accesibilidad WCAG y la arquitectura de componentes.',
    experienceLevel: 'Avanzado',
    favoriteTech: ['TypeScript', 'Next.js', 'Web Accessibility', 'GraphQL'],
    githubUrl: 'https://github.com',
    joinedDate: 'Marzo 2025',
  },
  {
    id: 'user_carlos',
    name: 'Carlos Méndez',
    username: 'cmendez_dev',
    email: 'cmendez@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    role: 'user',
    bio: 'Desarrollador backend en formación continua. Explorando Python, FastAPI y microservicios.',
    experienceLevel: 'Intermedio',
    favoriteTech: ['Python', 'FastAPI', 'PostgreSQL', 'Linux'],
    joinedDate: 'Junio 2025',
  },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-01',
    title: 'AuraCloud Engine — Consola de Datos en Tiempo Real',
    slug: 'auracloud-engine',
    tagline: 'Plataforma analítica empresarial para telemetría distribuida y visualización modular.',
    summary: 'Arquitectura SaaS integral para procesamiento de eventos en milisegundos con tablero interactivo, particionamiento de base de datos y auditoría de accesos.',
    category: 'Aplicaciones web',
    status: 'Publicado',
    imageUrl: '/src/assets/images/project_saas_platform_1792719210711.jpg',
    problemSolved: 'Las plataformas tradicionales saturaban el navegador al procesar más de 10,000 métricas concurrentes por minuto sin agregación previa.',
    architectureDecisions: 'Se implementó una capa intermedia con WebSockets y buffer de datos en memoria antes de la persistencia en PostgreSQL, renderizado virtualizado con React y Zustand para evitar re-renderizados innecesarios.',
    features: [
      'Ingesta de telemetría a través de API REST y WebSockets seguros',
      'Tableros personalizables con gráficos optimizados de alto rendimiento',
      'Control de acceso basado en roles (RBAC) con tokens seguros',
      'Exportación estructurada de reportes en CSV y JSON'
    ],
    techStack: ['TypeScript', 'React 19', 'Tailwind CSS', 'PostgreSQL', 'Node.js', 'Zustand'],
    challengesLearned: 'Manejo de sincronización de ventanas temporales en gráficos de alta frecuencia y optimización de memoria en Web Workers.',
    demoUrl: 'https://example.com/demo/auracloud',
    githubUrl: 'https://github.com/example/auracloud-engine',
    featured: true,
    year: '2026',
  },
  {
    id: 'proj-02',
    title: 'Polyhedra Space — Experiencia 3D y Topología Interactiva',
    slug: 'polyhedra-space',
    tagline: 'Visualizador web inmersivo de estructuras poliedrales y redes topológicas dinámicas.',
    summary: 'Exploración interactiva en el navegador que combina computación geométrica, shaders procedurales y respuesta háptica visual.',
    category: 'Experiencias 3D',
    status: 'Publicado',
    imageUrl: '/src/assets/images/project_interactive_3d_1792719225646.jpg',
    problemSolved: 'La renderización de grafos tridimensionales complejos solía congelar la interfaz de usuario en dispositivos móviles o equipos sin tarjeta gráfica dedicada.',
    architectureDecisions: 'Uso de Three.js con InstancedMesh y shaders GLSL personalizados para delegar el cálculo de transformaciones a la GPU, reduciendo los draw-calls a una sola pasada.',
    features: [
      'Navegación espacial con controles orbitales suaves e inercia',
      'Transformación de topologías geométricas en tiempo real con shaders GLSL',
      'Detección de colisiones visuales e inspección de nodos de información',
      'Soporte completo para dispositivos táctiles y pantallas retina'
    ],
    techStack: ['Three.js', 'WebGL', 'GLSL', 'TypeScript', 'Tailwind CSS'],
    challengesLearned: 'Balance de iluminación dinámica y texturas procedimentales sin exceder los 60 FPS estables.',
    demoUrl: 'https://example.com/demo/polyhedra',
    githubUrl: 'https://github.com/example/polyhedra-space',
    featured: true,
    year: '2026',
  },
  {
    id: 'proj-03',
    title: 'KronoBooking — Sistema de Reservas y Gestión de Citas',
    slug: 'kronobooking-suite',
    tagline: 'Solución modular para reservas automatizadas, recordatorios y sincronización de agendas.',
    summary: 'Sistema multi-inquilino para negocios de servicios profesionales con selector interactivo de disponibilidad, confirmación instantánea y panel de control administrativo.',
    category: 'Reservas y citas',
    status: 'Publicado',
    imageUrl: '/src/assets/images/hero_nebulon_brand_1792719198845.jpg',
    problemSolved: 'Pérdida de clientes y doble asignación de citas debido a procesos manuales por mensajería.',
    architectureDecisions: 'Mecanismo de reservas con transacciones atómicas y bloqueo pesimista en periodos de alta concurrencia para asegurar que una franja horaria nunca se duplique.',
    features: [
      'Calendario interactivo con cálculo automático de zonas horarias',
      'Gestión de servicios con duración, buffer de descanso y precios',
      'Notificaciones automáticas por correo y webhook para recordatorios',
      'Panel administrativo para gestión de horarios y bloqueo de días festivos'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    challengesLearned: 'Resolución de conflictos de zonas horarias en clientes internacionales y transiciones de estados de citas.',
    demoUrl: 'https://example.com/demo/kronobooking',
    githubUrl: 'https://github.com/example/kronobooking',
    featured: true,
    year: '2025',
  },
  {
    id: 'proj-04',
    title: 'NexusPortal — Landing Page de Alta Conversión para FinTech',
    slug: 'nexusportal-fintech',
    tagline: 'Página de lanzamiento con narrativa visual interactiva y optimización Core Web Vitals.',
    summary: 'Sitio de captación institucional desarrollado bajo principios de accesibilidad WCAG AA, tipografía editorial y tiempos de carga inferiores a 800ms.',
    category: 'Landing pages',
    status: 'Publicado',
    imageUrl: '/src/assets/images/project_saas_platform_1792719210711.jpg',
    problemSolved: 'Tasa de rebote superior al 45% por tiempos de carga lentos y diseño genérico sin confianza institucional.',
    architectureDecisions: 'Generación estática optimizada con hidratación selectiva, fuentes variables alojadas localmente y compresión WebP progresiva.',
    features: [
      'Simulador interactivo de proyecciones financieras en el cliente',
      'Formulario de calificación de prospectos con validación en dos pasos',
      'Puntuación de 100/100 en Google Lighthouse para rendimiento y accesibilidad',
      'Metadatos dinámicos OpenGraph y Schema.org para indexación'
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'TypeScript', 'Motion'],
    challengesLearned: 'Orquestación de micro-animaciones fluidas sin provocar saltos acumulados de diseño (CLS = 0).',
    demoUrl: 'https://example.com/demo/nexusportal',
    featured: false,
    year: '2025',
  },
  {
    id: 'proj-05',
    title: 'CodeMatrix — Visualizador de Algoritmos y Grafos',
    slug: 'codematrix-algorithms',
    tagline: 'Herramienta educativa experimental para análisis visual de complejidad computacional.',
    summary: 'Simulador interactivo que desglosa el paso a paso de algoritmos clásicos de ordenamiento, búsqueda y grafos con reproducción paso a paso.',
    category: 'Herramientas digitales',
    status: 'En desarrollo',
    imageUrl: '/src/assets/images/project_interactive_3d_1792719225646.jpg',
    problemSolved: 'La dificultad de estudiantes y desarrolladores júnior para comprender la recursión y el intercambio de memoria en algoritmos abstractos.',
    architectureDecisions: 'Generadores iteradores (function*) en TypeScript para pausar y reanudar la ejecución del algoritmo exactamente en cada punto de corte visual.',
    features: [
      'Controles de reproducción: iniciar, pausar, avanzar paso a paso y reiniciar',
      'Contador de comparaciones e intercambios en tiempo real',
      'Selector de tamaño de entrada y velocidad de simulación',
      'Explicación textual sincronizada con la línea de código ejecutada'
    ],
    techStack: ['TypeScript', 'Canvas API', 'Tailwind CSS', 'React'],
    challengesLearned: 'Gestión del bucle de animación para que los estados asíncronos no desincronicen el stack de ejecución.',
    featured: false,
    year: '2026',
  },
  {
    id: 'proj-06',
    title: 'VektorStore — Catálogo y Carrito Desacoplado',
    slug: 'vektorstore-headless',
    tagline: 'Arquitectura de comercio headless para marcas de diseño y productos físicos.',
    summary: 'Tienda digital de alto impacto estético con navegación instantánea entre colecciones, carrito persistente en el dispositivo y pasarela preparada para Stripe.',
    category: 'Páginas web',
    status: 'Prototipo',
    imageUrl: '/src/assets/images/hero_nebulon_brand_1792719198845.jpg',
    problemSolved: 'Las plataformas estándar de e-commerce suelen ofrecer plantillas rígidas con interfaces lentas y poca diferenciación de marca.',
    architectureDecisions: 'Frontend desacoplado consumiendo APIs REST con caché en memoria SWR para transiciones de producto sin recarga.',
    features: [
      'Galería de producto con zoom suave y selector de variantes',
      'Cálculo de impuestos y envíos dinámicos en tiempo real',
      'Carrito con persistencia local y sincronización con el servidor',
      'Diseño mobile-first optimizado para navegación con una mano'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    challengesLearned: 'Manejo de sincronización de inventario concurrente sin bloquear el flujo de pago del cliente.',
    featured: false,
    year: '2026',
  },
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'serv-web-apps',
    title: 'Desarrollo de Aplicaciones Web a Medida',
    slug: 'aplicaciones-web',
    summary: 'Construcción de plataformas interactivas, SaaS y sistemas de uso profesional con arquitectura escalable, TypeScript y bases de datos robustas.',
    benefits: [
      'Código fuente limpio, documentado y tipado de principio a fin',
      'Interfaces rápidas y reactivas sin recargas molestas de página',
      'Protección de datos y autenticación con roles de usuario',
      'Preparado para crecer sin necesidad de rehacer la plataforma'
    ],
    includedFeatures: [
      'Diseño de arquitectura frontend y backend modular',
      'Modelado de base de datos relacional y migraciones reproducibles',
      'Autenticación segura con sesiones y recuperación de contraseña',
      'Pruebas de verificación funcional y validación de formularios',
      'Despliegue guiado y manual de operación técnica'
    ],
    scope: 'Desarrollo completo desde la definición de requerimientos hasta el despliegue en entorno de producción.',
    exclusions: 'No incluye redacción de contenidos corporativos externos ni gestión de pagos a proveedores de infraestructura.',
    clientRequirements: 'Definición de las reglas de negocio, flujos esperados de usuario y disponibilidad para sesiones quincenales de validación.',
    pricingNote: 'Presupuesto personalizado según alcance funcional y arquitectura requerida.',
    estimatedTimeline: '4 a 10 semanas según complejidad',
    faq: [
      {
        question: '¿El código fuente me pertenecerá al finalizar?',
        answer: 'Sí. Todos los derechos de propiedad intelectual del software desarrollado para tu proyecto se transfieren en su totalidad al completar el encargo.'
      },
      {
        question: '¿Qué tecnologías se utilizan?',
        answer: 'Utilizamos primordialmente TypeScript, React, Node.js y PostgreSQL, garantizando estabilidad a largo plazo y facilidad para sumar desarrolladores.'
      }
    ]
  },
  {
    id: 'serv-landing-pages',
    title: 'Landing Pages de Alta Conversión',
    slug: 'landing-pages',
    summary: 'Páginas de aterrizaje diseñadas con rigor editorial, velocidad de carga instantánea y llamadas a la acción claras para captar prospectos calificados.',
    benefits: [
      'Carga ultrarrápida (menos de 1 segundo) para reducir la tasa de rebote',
      'Diseño adaptado fielmente a dispositivos móviles y escritorios',
      'Integración con formularios de contacto y correo directo',
      'Estructura optimizada para campañas publicitarias y SEO'
    ],
    includedFeatures: [
      'Dirección de arte tecnológica y copywriting persuasivo estructurado',
      'Formularios validados contra spam y envíos duplicados',
      'Optimización de imágenes en formatos modernos (WebP/AVIF)',
      'Configuración de metadatos para redes sociales (OpenGraph)'
    ],
    scope: 'Página única orientada a un objetivo comercial específico con secciones de propuesta de valor, beneficios, prueba social y contacto.',
    exclusions: 'No incluye el presupuesto publicitario de pauta en medios digitales.',
    clientRequirements: 'Objetivo de conversión claro, logotipo o identidad base y descripción de la propuesta de valor.',
    pricingNote: 'Presupuesto personalizado con opciones de entrega rápida.',
    estimatedTimeline: '1 a 2 semanas',
    faq: [
      {
        question: '¿Puedo integrar la página con mi herramienta de email marketing o CRM?',
        answer: 'Absolutamente. Los formularios pueden conectarse mediante webhooks o APIs seguras con cualquier servicio que utilices.'
      }
    ]
  },
  {
    id: 'serv-portfolios',
    title: 'Portafolios Profesionales y Marca Personal',
    slug: 'portafolios-profesionales',
    summary: 'Plataformas digitales diseñadas para desarrolladores, consultores y creadores que necesitan exhibir su trabajo con identidad propia y credibilidad.',
    benefits: [
      'Diseño distintivo alejado de plantillas prefabricadas comunes',
      'Fichas de proyectos con contexto técnico y aprendizajes reales',
      'Facilidad para agregar nuevos trabajos en el futuro',
      'Impacto visual inmediato ante potenciales clientes y reclutadores'
    ],
    includedFeatures: [
      'Catálogo filtrable por categorías y tecnologías',
      'Fichas individuales para cada proyecto con enlaces y capturas',
      'Sección sobre mi trayectoria, filosofía de trabajo y stack',
      'Formulario directo de propuestas y contacto'
    ],
    scope: 'Diseño integral de marca digital personal, estructura de casos de estudio y puesta en marcha.',
    exclusions: 'No incluye la creación de proyectos ficticios: trabajamos con tu experiencia real.',
    clientRequirements: 'Listado de proyectos a exhibir, enlaces a repositorios y descripción de objetivos profesionales.',
    pricingNote: 'Presupuesto accesible con paquetes estructurados.',
    estimatedTimeline: '2 a 3 semanas',
    faq: [
      {
        question: '¿Podré actualizar mis proyectos yo mismo?',
        answer: 'Sí. El sistema incluye un panel de gestión sencillo o almacenamiento estructurado para agregar nuevos trabajos sin tocar código.'
      }
    ]
  },
  {
    id: 'serv-reservas',
    title: 'Sistemas de Reservas y Gestión de Citas',
    slug: 'sistemas-reservas',
    summary: 'Soluciones automatizadas para agendar citas, sesiones de consultoría o servicios presenciales sin intermediarios manuales.',
    benefits: [
      'Disponibilidad horaria visible las 24 horas del día',
      'Cero solapamiento de horarios con bloqueo de concurrencia',
      'Reducción drástica del ausentismo mediante recordatorios',
      'Ahorro de horas semanales en coordinación por WhatsApp'
    ],
    includedFeatures: [
      'Selector interactivo de fecha y hora según disponibilidad',
      'Gestión de duración por tipo de servicio y tiempos de descanso',
      'Panel administrativo para bloquear fechas o modificar turnos',
      'Confirmación automática por correo electrónico al cliente'
    ],
    scope: 'Plataforma web de reservas con panel de gestión administrativa y notificaciones básicas.',
    exclusions: 'Costos de envío de SMS si el proveedor cobra por mensaje.',
    clientRequirements: 'Definición de horarios de atención, servicios ofrecidos y políticas de cancelación.',
    pricingNote: 'Presupuesto basado en el número de sedes y profesionales a agendar.',
    estimatedTimeline: '3 a 5 semanas',
    faq: [
      {
        question: '¿Permite definir diferentes profesionales con agendas independientes?',
        answer: 'Sí, la arquitectura permite configurar múltiples especialistas con sus propios horarios y servicios.'
      }
    ]
  },
  {
    id: 'serv-admin-panels',
    title: 'Paneles Administrativos y Herramientas Internas',
    slug: 'paneles-administrativos',
    summary: 'Dashboards eficientes para gestionar contenidos, consultar métricas clave de tu negocio y automatizar flujos operativos diarios.',
    benefits: [
      'Centralización de todas las operaciones en una única interfaz',
      'Permisos por roles para proteger información sensible',
      'Tablas de datos con búsqueda instantánea, filtros y ordenamiento',
      'Exportación segura de reportes operativos'
    ],
    includedFeatures: [
      'CRUD completo de entidades con confirmación en acciones destructivas',
      'Métricas reales calculadas directamente de la base de datos',
      'Registro de auditoría de cambios y notas privadas de seguimiento',
      'Diseño optimizado para trabajo intensivo con teclado y pantallas grandes'
    ],
    scope: 'Desarrollo del panel privado conectado a tu base de datos existente o nueva.',
    exclusions: 'No incluye soporte para navegadores obsoletos fuera de estándares modernos.',
    clientRequirements: 'Lista de entidades a administrar, roles del personal y accesos a la infraestructura.',
    pricingNote: 'Presupuesto personalizado acorde a la cantidad de módulos.',
    estimatedTimeline: '3 a 6 semanas',
    faq: [
      {
        question: '¿Es seguro el acceso a los datos de la empresa?',
        answer: 'Absolutamente. Todas las peticiones se validan en el servidor mediante tokens criptográficos y control de roles (RBAC).'
      }
    ]
  },
  {
    id: 'serv-automation',
    title: 'Automatización de Tareas Digitales y APIs',
    slug: 'automatizacion-digital',
    summary: 'Conexión entre tus herramientas digitales para eliminar tareas manuales repetitivas y sincronizar información de forma confiable.',
    benefits: [
      'Eliminación de errores humanos al transcribir información',
      'Respuestas automáticas e inmediatas a tus prospectos',
      'Integración fluida con bases de datos, correos y webhooks',
      'Ahorro comprobado de horas de trabajo cada semana'
    ],
    includedFeatures: [
      'Desarrollo de scripts y micro-servicios en Node.js o Python',
      'Manejo de reintentos ante caídas transitorias de servicios externos',
      'Registro de logs y alertas ante anomalías operativas',
      'Documentación técnica del flujo para tu equipo'
    ],
    scope: 'Implementación del pipeline de automatización entre los sistemas acordados.',
    exclusions: 'Costos de suscripción de plataformas de terceros.',
    clientRequirements: 'Accesos de desarrollador a las plataformas que se van a conectar.',
    pricingNote: 'Presupuesto por flujo implementado o paquete de integraciones.',
    estimatedTimeline: '1 a 3 semanas',
    faq: [
      {
        question: '¿Qué pasa si una de las APIs externas cambia?',
        answer: 'Diseñamos interfaces desacopladas para que los ajustes sean rápidos sin alterar el resto de tus sistemas.'
      }
    ]
  },
  {
    id: 'serv-ui-audit',
    title: 'Auditoría y Optimización de Interfaces (UI/UX)',
    slug: 'auditoria-optimizacion-ui',
    summary: 'Evaluación técnica y visual de tu sitio web o aplicación para corregir cuellos de botella, mejorar la accesibilidad y elevar la conversión.',
    benefits: [
      'Detección objetiva de puntos donde los usuarios abandonan tu sitio',
      'Cumplimiento de estándares de accesibilidad internacional WCAG AA',
      'Aumento comprobado de velocidad y fluidez en móviles',
      'Guía visual paso a paso con soluciones directas de código'
    ],
    includedFeatures: [
      'Auditoría heurística de usabilidad en flujos críticos',
      'Diagnóstico de rendimiento y métricas Core Web Vitals',
      'Revisión de contrastes, navegación por teclado y etiquetas accesibles',
      'Documento de entrega con recomendaciones priorizadas por impacto'
    ],
    scope: 'Revisión técnica de hasta 5 vistas principales con reporte ejecutable.',
    exclusions: 'No incluye el rediseño completo de la marca a nivel corporativo.',
    clientRequirements: 'URL del sitio en producción o acceso a entorno de pruebas.',
    pricingNote: 'Tarifa fija por auditoría completa con sesión de entrega.',
    estimatedTimeline: '5 a 8 días hábiles',
    faq: [
      {
        question: '¿Ustedes pueden aplicar las correcciones después de la auditoría?',
        answer: 'Sí, podemos cotizar la implementación directa de los cambios o capacitar a tu equipo para ejecutarlos.'
      }
    ]
  },
  {
    id: 'serv-maintenance',
    title: 'Mantenimiento Web y Soporte Preventivo',
    slug: 'mantenimiento-soporte',
    summary: 'Acompañamiento continuo para mantener tu plataforma actualizada, segura, con respaldos periódicos y protegida contra incidentes.',
    benefits: [
      'Tranquilidad de saber que tu sitio está supervisado',
      'Actualizaciones de seguridad de librerías y dependencias',
      'Copias de seguridad verificadas ante cualquier eventualidad',
      'Canal directo de soporte prioritario para incidencias'
    ],
    includedFeatures: [
      'Monitoreo de disponibilidad y resolución de fallos críticos',
      'Actualización periódica de paquetes y dependencias npm/node',
      'Auditorías de seguridad preventiva y revisión de certificados SSL',
      'Bolsa mensual de horas para mejoras menores o ajustes'
    ],
    scope: 'Servicio continuo mensual para plataformas web desplegadas.',
    exclusions: 'No cubre el desarrollo de funcionalidades completamente nuevas fuera de la bolsa de horas.',
    clientRequirements: 'Acceso a los servidores de despliegue y repositorios del proyecto.',
    pricingNote: 'Planes mensuales orientativos con cancelación flexible.',
    estimatedTimeline: 'Continuo / Mensual',
    faq: [
      {
        question: '¿Hay permanencia obligatoria?',
        answer: 'No. Nuestros acuerdos de mantenimiento son mensuales y se pueden pausar en cualquier momento con previo aviso.'
      }
    ]
  },
  {
    id: 'serv-interactive-3d',
    title: 'Experiencias Interactivas y 3D en la Web',
    slug: 'experiencias-3d-interactivas',
    summary: 'Desarrollo de visualizadores de productos en 3D, interfaces lúdicas y micro-animaciones inmersivas basadas en WebGL y Three.js.',
    benefits: [
      'Diferenciación radical frente a la competencia',
      'Mayor tiempo de permanencia e involucramiento del usuario',
      'Visualización de productos físicos desde cualquier ángulo en el navegador',
      'Rendimiento fluido sin necesidad de instalar plugins'
    ],
    includedFeatures: [
      'Optimización de modelos 3D (GLTF/GLB) para carga web rápida',
      'Configuración de iluminación, sombras y materiales PBR realistas',
      'Controles de interacción de usuario intuitivos para móvil y desktop',
      'Mecanismos de degradación elegante en navegadores de baja potencia'
    ],
    scope: 'Módulo 3D integrado dentro de tu sitio web o página promocional.',
    exclusions: 'Modelado 3D desde cero de objetos no proporcionados en formato compatible.',
    clientRequirements: 'Modelos 3D de los productos o referencias gráficas detalladas.',
    pricingNote: 'Presupuesto personalizado acorde a la complejidad del modelo y shaders.',
    estimatedTimeline: '3 a 6 semanas',
    faq: [
      {
        question: '¿Funcionará en teléfonos celulares?',
        answer: 'Sí. Diseñamos shaders y geometrías adaptativas que ajustan su nivel de detalle automáticamente según la potencia del dispositivo.'
      }
    ]
  },
  {
    id: 'serv-consulting',
    title: 'Consultoría Técnica y Arquitectura de Software',
    slug: 'consultoria-tecnica',
    summary: 'Sesiones estratégicas para fundadores y equipos técnicos que necesitan validar decisiones de arquitectura, stack tecnológico y viabilidad.',
    benefits: [
      'Prevención de decisiones tecnológicas costosas a largo plazo',
      'Validación de la pila de tecnologías adecuada para tu producto',
      'Claridad sobre costos reales de infraestructura y mantenimiento',
      'Roadmap técnico realista para tu MVP o relanzamiento'
    ],
    includedFeatures: [
      'Sesión individual de diagnóstico y análisis de requerimientos',
      'Diagrama de arquitectura propuesto con recomendaciones justificadas',
      'Matriz de riesgos técnicos y alternativas viables',
      'Resumen ejecutivo con próximos pasos accionables'
    ],
    scope: 'Acompañamiento consultivo con entregable técnico.',
    exclusions: 'No incluye la programación del software durante las sesiones de consultoría.',
    clientRequirements: 'Breve contexto del producto, modelo de negocio e inquietudes técnicas principales.',
    pricingNote: 'Tarifa por sesión o paquete de asesoría estratégica.',
    estimatedTimeline: 'Sesiones de 90 minutos con entrega de reporte en 48h',
    faq: [
      {
        question: '¿A quién va dirigido este servicio?',
        answer: 'A fundadores de startups, líderes de producto y empresas que están a punto de iniciar un desarrollo importante y buscan evitar errores técnicos costosos.'
      }
    ]
  }
];

export const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: 'req-001',
    clientName: 'Santiago Morales',
    clientEmail: 'santiago@innovahealth.com',
    preferredContact: 'email',
    projectType: 'Sistemas de reservas y citas',
    description: 'Necesitamos renovar el sistema de citas de nuestra red de consultorios para permitir selección de especialista y pago presencial o en línea.',
    desiredFeatures: 'Sincronización con Google Calendar, confirmaciones por WhatsApp y panel de administración para médicos.',
    budgetRange: '$2,500 - $4,000 USD',
    timeline: '6 semanas',
    referenceLinks: 'https://innovahealth.com',
    status: 'Propuesta enviada',
    privateNotes: 'Se presentó propuesta técnica el 18 de octubre. Cliente revisando con el director médico.',
    createdAt: '2026-10-15T14:30:00Z',
  },
  {
    id: 'req-002',
    clientName: 'Mariana Duarte',
    clientEmail: 'mariana.duarte@studiozen.co',
    preferredContact: 'whatsapp',
    projectType: 'Landing pages',
    description: 'Lanzamiento de una nueva línea de productos ergonómicos para programadores. Buscamos diseño oscuro, minimalista y ultra rápido.',
    desiredFeatures: 'Simulador de postura 3D ligero, formulario de lista de espera con contador regresivo.',
    budgetRange: '$1,200 - $2,000 USD',
    timeline: '3 semanas',
    referenceLinks: 'https://behance.net/sample-ergonomic',
    status: 'En revisión',
    privateNotes: 'Revisando requerimientos del simulador 3D para definir si se usa Three.js optimizado.',
    createdAt: '2026-10-20T09:15:00Z',
  },
];

export const INITIAL_CATEGORIES: CommunityCategory[] = [
  { id: 'cat-principiantes', name: 'Programación para principiantes', slug: 'principiantes', description: 'Primeros pasos, dudas conceptuales y orientación para comenzar en el desarrollo.', iconName: 'Compass' },
  { id: 'cat-frontend', name: 'Desarrollo Frontend', slug: 'frontend', description: 'HTML, CSS, React, Vue, accesibilidad y maquetación moderna.', iconName: 'Layout' },
  { id: 'cat-backend', name: 'Desarrollo Backend', slug: 'backend', description: 'Node.js, Express, Go, APIs REST, microservicios y arquitectura.', iconName: 'Server' },
  { id: 'cat-python', name: 'Python', slug: 'python', description: 'Scripts, automatización, análisis de datos, Django y FastAPI.', iconName: 'Code' },
  { id: 'cat-databases', name: 'Bases de Datos', slug: 'bases-de-datos', description: 'PostgreSQL, SQL, modelado de datos, optimización de consultas e índices.', iconName: 'Database' },
  { id: 'cat-ai', name: 'Inteligencia Artificial', slug: 'inteligencia-artificial', description: 'Integración de modelos LLM, prompts técnicos y aplicaciones con IA.', iconName: 'Cpu' },
  { id: 'cat-git', name: 'Git y GitHub', slug: 'git-github', description: 'Control de versiones, flujos de trabajo en equipo y ramas.', iconName: 'GitBranch' },
  { id: 'cat-collab', name: 'Búsqueda de colaboradores', slug: 'colaboradores', description: 'Conoce otros desarrolladores para crear proyectos conjuntos.', iconName: 'Users' },
  { id: 'cat-questions', name: 'Dudas técnicas y errores', slug: 'dudas-tecnicas', description: 'Publica tu error con fragmento de código para recibir ayuda de la comunidad.', iconName: 'HelpCircle' },
  { id: 'cat-challenges', name: 'Retos y desafíos', slug: 'retos', description: 'Problemas de lógica, algoritmos y ejercicios semanales de programación.', iconName: 'Award' },
];

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-101',
    type: 'question',
    title: '¿Cómo optimizar una consulta compleja con JOIN y agregaciones en PostgreSQL?',
    content: 'Hola comunidad. Tengo una tabla de órdenes y otra de ítems con más de 2 millones de registros. Cuando intento agrupar por usuario y calcular el total de compras del mes, la consulta toma más de 4 segundos.',
    codeSnippet: {
      language: 'sql',
      code: `EXPLAIN ANALYZE
SELECT u.id, u.name, SUM(oi.price * oi.quantity) as total_spent
FROM users u
JOIN orders o ON o.user_id = u.id
JOIN order_items oi ON oi.order_id = o.id
WHERE o.created_at >= '2026-09-01'
GROUP BY u.id, u.name
ORDER BY total_spent DESC
LIMIT 50;`,
      errorMessage: 'Execution Time: 4230.12 ms (Seq Scan on orders)',
      expectedResult: 'Tiempo de ejecución inferior a 150ms utilizando índices apropiados.'
    },
    author: {
      id: 'user_carlos',
      name: 'Carlos Méndez',
      username: 'cmendez_dev',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      role: 'user'
    },
    categoryId: 'cat-databases',
    tags: ['postgresql', 'sql', 'optimizacion', 'indices'],
    reactions: {
      like: ['user_admin', 'user_mod'],
      idea: ['user_admin'],
    },
    savedBy: ['user_admin'],
    acceptedAnswerId: 'comment-201',
    createdAt: '2026-10-18T11:20:00Z',
  },
  {
    id: 'post-102',
    type: 'discussion',
    title: 'Buenas prácticas para estructurar tipos en proyectos grandes de TypeScript',
    content: 'En equipos en crecimiento suele haber debates sobre si centralizar los tipos en una sola carpeta `types/` o mantenerlos cerca de cada componente o módulo de dominio. ¿Qué arquitectura les ha funcionado mejor para evitar dependencias circulares y facilitar el refactor?',
    author: {
      id: 'user_mod',
      name: 'Elena Rostova',
      username: 'elena_code',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      role: 'moderator'
    },
    categoryId: 'cat-frontend',
    tags: ['typescript', 'arquitectura', 'buenas-practicas'],
    reactions: {
      like: ['user_admin', 'user_carlos'],
      fire: ['user_admin'],
    },
    savedBy: ['user_carlos'],
    createdAt: '2026-10-19T16:45:00Z',
  },
  {
    id: 'post-103',
    type: 'showcase',
    title: 'Comparto mi implementación de un generador de paletas accesibles con Canvas',
    content: 'Quería compartir una pequeña herramienta que calcula automáticamente la relación de contraste WCAG 2.2 AA entre pares de colores en tiempo real sin dependencias externas.',
    codeSnippet: {
      language: 'typescript',
      code: `function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const lum1 = getLuminance(...rgb1);
  const lum2 = getLuminance(...rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}`
    },
    author: {
      id: 'user_admin',
      name: 'Anderson Vallejo',
      username: 'anderson_nebulon',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'admin'
    },
    categoryId: 'cat-frontend',
    tags: ['accessibility', 'wcag', 'typescript', 'canvas'],
    reactions: {
      like: ['user_carlos', 'user_mod'],
      fire: ['user_carlos', 'user_mod'],
    },
    savedBy: ['user_carlos', 'user_mod'],
    createdAt: '2026-10-21T10:10:00Z',
  }
];

export const INITIAL_COMMENTS: CommunityComment[] = [
  {
    id: 'comment-201',
    postId: 'post-101',
    author: {
      id: 'user_admin',
      name: 'Anderson Vallejo',
      username: 'anderson_nebulon',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'admin'
    },
    content: 'El problema principal es el Sequential Scan en la tabla orders. Necesitas un índice compuesto que cubra el campo del filtro y la clave foránea del usuario.',
    codeSnippet: {
      language: 'sql',
      code: `-- 1. Índice compuesto para orders
CREATE INDEX CONCURRENTLY idx_orders_user_created 
ON orders (created_at DESC, user_id);

-- 2. Asegúrate de tener índice en order_items
CREATE INDEX CONCURRENTLY idx_order_items_order_id 
ON order_items (order_id) INCLUDE (price, quantity);`
    },
    isAcceptedAnswer: true,
    createdAt: '2026-10-18T13:05:00Z'
  },
  {
    id: 'comment-202',
    postId: 'post-102',
    author: {
      id: 'user_admin',
      name: 'Anderson Vallejo',
      username: 'anderson_nebulon',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      role: 'admin'
    },
    content: 'Recomiendo un enfoque híbrido: contratos de dominio compartidos (entidades principales de la base de datos o DTOs del backend) en una carpeta raíz como `src/types/domain/`, y tipos específicos de props de componentes junto al propio archivo `.tsx`. Esto evita tener que abrir tres carpetas para entender un solo componente.',
    createdAt: '2026-10-19T18:15:00Z'
  }
];

export const INITIAL_CHALLENGES: CodingChallenge[] = [
  {
    id: 'chal-01',
    title: 'Reto #12: Parser de Notación RPN (Reverse Polish Notation)',
    description: 'Escribe una función que evalúe una expresión matemática en notación polaca inversa (postfija). Por ejemplo: ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) = 9.',
    objective: 'Implementar una pila (stack) eficiente con manejo estricto de operadores (+, -, *, /) y división entera truncada hacia cero.',
    allowedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust'],
    difficulty: 'Intermedio',
    rules: [
      'No utilizar la función eval() ni intérpretes dinámicos de código',
      'Manejar divisiones por cero devolviendo un error controlado',
      'Complejidad temporal máxima O(n) y espacial O(n)'
    ],
    resources: [
      'Concepto de Notación Polaca Inversa (Wikipedia)',
      'Estructuras de datos básicas: Pilas (LIFO)'
    ],
    solutions: [
      {
        id: 'sol-01',
        authorName: 'Elena Rostova',
        language: 'TypeScript',
        explanation: 'Utilizamos un array como pila. Cada vez que encontramos un operando lo apilamos; al hallar un operador desapilamos los dos últimos y aplicamos la operación.',
        code: `export function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  const ops: Record<string, (a: number, b: number) => number> = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b),
  };

  for (const token of tokens) {
    if (token in ops) {
      const b = stack.pop()!;
      const a = stack.pop()!;
      stack.push(ops[token](a, b));
    } else {
      stack.push(Number(token));
    }
  }

  return stack[0] ?? 0;
}`,
        submittedAt: '2026-10-20T12:00:00Z'
      }
    ],
    active: true,
  },
  {
    id: 'chal-02',
    title: 'Reto #13: Detector de Paréntesis y Llaves Balanceadas',
    description: 'Dada una cadena que contiene exclusivamente caracteres ()[]{}, determina si la secuencia es sintácticamente válida y está bien anidada.',
    objective: 'Fortalecer el uso de pilas y comprobación de correspondencia de caracteres delimitadores.',
    allowedLanguages: ['Cualquier lenguaje'],
    difficulty: 'Principiante',
    rules: [
      'Cada delimitador de apertura debe cerrarse con el correspondiente',
      'El orden de cierre debe coincidir con el orden inverso de apertura'
    ],
    resources: ['Algoritmos de parsing léxico básico'],
    solutions: [],
    active: true,
  }
];

export const INITIAL_COLLAB_PROJECTS: CollabProject[] = [
  {
    id: 'collab-01',
    title: 'DevTracker Open Source — Monitor de Prácticas de Código',
    description: 'Buscamos desarrolladores para crear una CLI en TypeScript y una interfaz web que ayude a programadores principiantes a registrar sus sesiones de estudio y progreso.',
    projectType: 'Educativo',
    status: 'Buscando colaboradores',
    requiredRoles: ['Desarrollador Frontend (React)', 'Diseñador UI/UX', 'Desarrollador CLI'],
    techStack: ['TypeScript', 'Node.js', 'React', 'Tailwind CSS'],
    repoUrl: 'https://github.com/example/devtracker-cli',
    contactInfo: 'Contacto mediante mensaje en la comunidad o discord @devtracker',
    creatorName: 'Carlos Méndez',
    createdAt: '2026-10-19T10:00:00Z'
  },
  {
    id: 'collab-02',
    title: 'Simulador de Redes Neuronales en Canvas 2D',
    description: 'Proyecto experimental para visualizar capas densas y propagación hacia adelante (forward pass) paso a paso en el navegador con fines didácticos.',
    projectType: 'Experimental',
    status: 'En desarrollo',
    requiredRoles: ['Programador Matemático / IA', 'Maquetador Web'],
    techStack: ['HTML5 Canvas', 'TypeScript', 'Math.js'],
    contactInfo: 'Escribir directamente en el hilo de la comunidad',
    creatorName: 'Anderson Vallejo',
    createdAt: '2026-10-12T15:30:00Z'
  }
];

export const INITIAL_ARTICLES: ArticleItem[] = [
  {
    id: 'art-01',
    title: 'Diseño de APIs REST Limpias: De la Definición de Recursos al Manejo de Errores',
    summary: 'Guía práctica para estructurar endpoints consistentes, códigos de estado HTTP correctos y formatos de error comprensibles para el cliente.',
    content: [
      'El diseño de una API suele ser la interfaz más duradera de un sistema de software. Cuando un contrato de API está mal diseñado, corregirlo en el futuro requiere costosos procesos de deprecación y soporte a clientes antiguos.',
      'Un principio fundamental es basar los endpoints en sustantivos que representen recursos (por ejemplo /api/v1/projects) y nunca en verbos (/api/v1/getProjects). Las acciones se comunican mediante los métodos HTTP estándar: GET para consulta, POST para creación, PUT o PATCH para actualización y DELETE para eliminación.',
      'Siempre devuelve respuestas de error estructuradas con un formato uniforme: código interno, mensaje legible para humanos y detalles específicos de validación por campo cuando corresponda.'
    ],
    codeBlock: {
      language: 'json',
      code: `// Formato consistente de error
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Los datos enviados no superaron las reglas de validación.",
    "details": [
      {
        "field": "email",
        "issue": "Formato de correo electrónico inválido"
      }
    ]
  }
}`
    },
    category: 'Arquitectura Backend',
    level: 'Intermedio',
    tags: ['api', 'rest', 'backend', 'buenas-practicas'],
    readTime: '6 min',
    author: 'Anderson Vallejo',
    publishedAt: '15 de Octubre, 2026'
  },
  {
    id: 'art-02',
    title: 'TypeScript Avanzado: Inferencia de Tipos con Genéricos y Mapeo',
    summary: 'Cómo aprovechar el sistema de tipos estático para evitar duplicación y garantizar que los cambios en modelos se reflejen en toda la aplicación.',
    content: [
      'Muchos desarrolladores utilizan TypeScript únicamente como anotador de variables básicas. Sin embargo, su verdadero poder reside en la capacidad de derivar tipos complejos a partir de funciones y estructuras existentes.',
      'Mediante herramientas como keyof, typeof, ReturnType y Utility Types (Pick, Omit, Partial, Record), podemos garantizar una única fuente de verdad para los modelos de nuestra aplicación.',
      'Evita el uso de "any" recurriendo a tipos genéricos con restricciones ("T extends object"). Esto permite que tu editor ofrezca autocompletado exacto y detecte errores durante la compilación en lugar de en producción.'
    ],
    codeBlock: {
      language: 'typescript',
      code: `// Derivar un tipo inmutable de evento
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export interface UserEvent {
  action: string;
  metadata: {
    ip: string;
    timestamp: number;
  };
}

export type SafeAuditLog = DeepReadonly<UserEvent>;`
    },
    category: 'Desarrollo Frontend',
    level: 'Avanzado',
    tags: ['typescript', 'genericos', 'tipado-estricto'],
    readTime: '8 min',
    author: 'Elena Rostova',
    publishedAt: '08 de Octubre, 2026'
  },
  {
    id: 'art-03',
    title: 'Guía para Principiantes: Cómo Leer y Depurar un Mensaje de Error en la Consola',
    summary: 'Aprende a interpretar el Stack Trace, identificar la línea exacta del fallo y formular preguntas efectivas en comunidades de programación.',
    content: [
      'El primer obstáculo de todo programador novato es el temor a los mensajes de error en rojo. Sin embargo, el error no es un castigo: es la mejor pista que te da la computadora sobre qué salió mal.',
      'Un mensaje de error moderno se compone de tres partes: el tipo de error (ReferenceError, TypeError, SyntaxError), la descripción específica y el Stack Trace (el historial de llamadas que condujo al fallo).',
      'Antes de pedir ayuda en un foro, aísla el fragmento mínimo de código que reproduce el error. Comparte qué esperabas que ocurriera, qué ocurrió en realidad y el texto exacto del mensaje.'
    ],
    codeBlock: {
      language: 'javascript',
      code: `// Ejemplo clásico de TypeError
const user = null;

// Error: Cannot read properties of null (reading 'profile')
console.log(user.profile.name);

// Solución moderna con Optional Chaining:
console.log(user?.profile?.name ?? 'Invitado');`
    },
    category: 'Primeros Pasos',
    level: 'Principiante',
    tags: ['depuracion', 'javascript', 'stack-trace', 'aprendizaje'],
    readTime: '5 min',
    author: 'Anderson Vallejo',
    publishedAt: '01 de Octubre, 2026'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-01',
    authorName: 'Camila Villalobos',
    roleOrCompany: 'Directora de Tecnología, MedTech Solutions',
    serviceTitle: 'Desarrollo de Aplicaciones Web a Medida',
    rating: 5,
    comment: 'Trabajar con NEBULØN fue un punto de inflexión para nuestro equipo. La arquitectura entregada no solo cumplió los plazos acordados, sino que la claridad del código facilitó enormemente la integración con nuestros sistemas existentes.',
    status: 'Aprobada',
    date: '12 de Septiembre, 2026'
  },
  {
    id: 'rev-02',
    authorName: 'Javier Restrepo',
    roleOrCompany: 'Fundador, FinFlow Analytics',
    serviceTitle: 'Landing Pages de Alta Conversión',
    rating: 5,
    comment: 'La velocidad de carga y la atención al detalle en tipografía y animaciones superaron nuestras expectativas. Nuestra tasa de conversión en la campaña de lanzamiento aumentó un 32% respecto al sitio anterior.',
    status: 'Aprobada',
    date: '28 de Agosto, 2026'
  }
];

export const INITIAL_REPORTS: PlatformReport[] = [
  {
    id: 'rep-01',
    type: 'suggestion',
    title: 'Sugerencia: Filtro por etiqueta en el Centro de Aprendizaje',
    description: 'Sería muy útil poder seleccionar múltiples etiquetas simultáneas (ej. TypeScript + React) al buscar artículos técnicos.',
    contactEmail: 'cmendez@example.com',
    status: 'En investigación',
    createdAt: '2026-10-21T15:00:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    userId: 'user_admin',
    title: 'Nueva solicitud de servicio',
    message: 'Santiago Morales ha solicitado cotización para "Sistemas de reservas y citas".',
    targetView: 'admin',
    read: false,
    createdAt: '2026-10-20T10:00:00Z'
  },
  {
    id: 'notif-02',
    userId: 'user_admin',
    title: 'Respuesta aceptada en la comunidad',
    message: 'Tu solución técnica en el post de PostgreSQL fue marcada como aceptada por Carlos Méndez.',
    targetView: 'community',
    read: false,
    createdAt: '2026-10-18T14:10:00Z'
  }
];
