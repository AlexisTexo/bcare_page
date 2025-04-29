import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type Language = "en" | "es";

type Translations = {
  [key: string]: {
    en: string;
    es: string;
  };
};

// Common translations
export const translations: Translations = {
  // Navbar
  "nav.home": { en: "Home", es: "Inicio" },
  "nav.about": { en: "About Us", es: "Nosotros" },
  "nav.blog": { en: "Blog", es: "Blog" },
  "nav.landing": { en: "Landing", es: "Landing" },
  "nav.contact": { en: "CONTACT US", es: "Contáctanos" },
  "nav.getStarted": { en: "Contact Us", es: "Contáctanos" },

  // Hero
  "hero.title1": { en: "Transform", es: "Transforma" },
  "hero.title2": { en: "your business", es: "tu negocio" },
  "hero.subtitle": {
    en: "Streamline operations and boost efficiency in just",
    es: "Optimiza operaciones y aumenta la eficiencia en solo",
  },
  "hero.months": { en: "6 months", es: "6 meses" },
  "hero.contact": { en: "Contact Us", es: "Contáctanos" },
  "hero.learnMore": { en: "Learn More", es: "Más información" },
  "hero.scrollDown": { en: "Scroll Down", es: "Desplázate" },
  "hero.scroll": { en: "Scroll", es: "Desplazar" },
  "hero.badge": {
    en: "Top Business Consulting",
    es: "Consultoría de Negocios Líder",
  },
  "hero.benefit1": { en: "Fast Implementation", es: "Implementación Rápida" },
  "hero.benefit2": { en: "Secure Solutions", es: "Soluciones Seguras" },
  "hero.benefit3": { en: "Proven Results", es: "Resultados Comprobados" },
  "hero.clients": { en: "Happy Clients", es: "Clientes Satisfechos" },
  "hero.satisfaction": { en: "Satisfaction Rate", es: "Tasa de Satisfacción" },
  "hero.support": { en: "Customer Support", es: "Soporte al Cliente" },

  // Features
  "features.title": { en: "Why Choose Us", es: "¿Por qué elegirnos?" },
  "features.experience": {
    en: "Experience & Expertise",
    es: "Experiencia & Especialización",
  },
  "features.years": { en: "Over 10 years", es: "Más de 10 años" },
  "features.supporting": {
    en: "supporting our clients' businesses",
    es: "apoyando a los negocios de nuestros clientes",
  },
  "features.challenges": {
    en: "We address common challenges that businesses face in today's competitive landscape with tailored solutions.",
    es: "Abordamos los desafíos comunes que enfrentan las empresas en el panorama competitivo actual con soluciones personalizadas.",
  },
  "features.operations": {
    en: "Operations Management",
    es: "Gestión de Operaciones",
  },
  "features.operations.desc": {
    en: "Streamline your day-to-day operations and increase overall efficiency.",
    es: "Optimice sus operaciones diarias y aumente la eficiencia general.",
  },
  "features.implementation": {
    en: "Guided Implementation",
    es: "Implementación Guiada",
  },
  "features.implementation.desc": {
    en: "Expert guidance throughout the implementation process of new systems.",
    es: "Orientación experta durante todo el proceso de implementación de nuevos sistemas.",
  },
  "features.records": { en: "Records Management", es: "Gestión de Registros" },
  "features.records.desc": {
    en: "Organize and protect your critical business information securely.",
    es: "Organice y proteja su información comercial crítica de forma segura.",
  },
  "features.asset": { en: "Asset Management", es: "Gestión de Activos" },
  "features.asset.desc": {
    en: "Track and optimize the use of all your business assets.",
    es: "Rastree y optimice el uso de todos sus activos comerciales.",
  },
  "features.process": {
    en: "Process Optimization",
    es: "Optimización de Procesos",
  },
  "features.process.desc": {
    en: "Analyze and improve processes to eliminate bottlenecks.",
    es: "Analice y mejore los procesos para eliminar cuellos de botella.",
  },
  "features.scalability": {
    en: "Business Scalability",
    es: "Escalabilidad Empresarial",
  },
  "features.scalability.desc": {
    en: "Prepare your business for growth with scalable solutions.",
    es: "Prepare su negocio para el crecimiento con soluciones escalables.",
  },
  "features.subtitle": {
    en: "We address common challenges that businesses face with our tailored solutions",
    es: "Abordamos los desafíos comunes que enfrentan las empresas con nuestras soluciones personalizadas",
  },

  "features.expertise.title": {
    en: "Expert Knowledge",
    es: "Conocimiento Experto",
  },
  "features.expertise.description": {
    en: "Deep industry expertise to guide your business transformation",
    es: "Amplia experiencia en la industria para guiar la transformación de su negocio",
  },

  "features.care.title": { en: "Dedicated Support", es: "Soporte Dedicado" },
  "features.care.description": {
    en: "Personalized attention and continuous support through your journey",
    es: "Atención personalizada y soporte continuo durante todo su proceso",
  },

  "features.security.title": {
    en: "Enhanced Security",
    es: "Seguridad Mejorada",
  },
  "features.security.description": {
    en: "Robust protection for your business data and operations",
    es: "Protección robusta para los datos y operaciones de su negocio",
  },

  "features.community.title": {
    en: "Community Focus",
    es: "Enfoque Comunitario",
  },
  "features.community.description": {
    en: "Building lasting partnerships with our clients and partners",
    es: "Construyendo asociaciones duraderas con nuestros clientes y socios",
  },

  "features.time.title": { en: "Time Efficiency", es: "Eficiencia de Tiempo" },
  "features.time.description": {
    en: "Streamlined processes that save valuable time for your business",
    es: "Procesos optimizados que ahorran tiempo valioso para su negocio",
  },

  "features.innovation.title": {
    en: "Innovative Approach",
    es: "Enfoque Innovador",
  },
  "features.innovation.description": {
    en: "Cutting-edge solutions that keep you ahead of the competition",
    es: "Soluciones de vanguardia que lo mantienen por delante de la competencia",
  },

  // Services
  "services.title": { en: "Our Services", es: "Nuestros Servicios" },
  "services.expertise": {
    en: "Areas of Expertise",
    es: "Áreas de Especialización",
  },
  "services.specialized": {
    en: "Our specialized services",
    es: "Nuestros servicios especializados",
  },
  "services.leveraging": {
    en: "Leveraging cutting-edge technology and industry expertise to deliver exceptional results.",
    es: "Aprovechando tecnología de vanguardia y experiencia en la industria para entregar resultados excepcionales.",
  },
  "services.strategic": {
    en: "Strategic Consulting",
    es: "Consultoría Estratégica",
  },
  "services.strategic.desc": {
    en: "Expert analysis and guidance to transform your business processes, optimize operations, and drive strategic growth.",
    es: "Análisis y orientación experta para transformar sus procesos comerciales, optimizar operaciones e impulsar el crecimiento estratégico.",
  },
  "services.software": {
    en: "Custom Software Development",
    es: "Desarrollo de Software Personalizado",
  },
  "services.software.desc": {
    en: "Tailor-made software solutions designed specifically for your unique business needs, challenges, and goals.",
    es: "Soluciones de software a medida diseñadas específicamente para las necesidades, desafíos y objetivos únicos de su negocio.",
  },
  "services.ai": { en: "AI Implementation", es: "Implementación de IA" },
  "services.ai.desc": {
    en: "Cutting-edge artificial intelligence solutions to automate processes, gain insights, and create competitive advantages.",
    es: "Soluciones de inteligencia artificial de vanguardia para automatizar procesos, obtener información y crear ventajas competitivas.",
  },
  "services.features": {
    en: "Key Features:",
    es: "Características Principales:",
  },
  "services.business": {
    en: "Business Process Analysis",
    es: "Análisis de Procesos de Negocio",
  },
  "services.planning": {
    en: "Strategic Planning",
    es: "Planificación Estratégica",
  },
  "services.growth": { en: "Growth Strategy", es: "Estrategia de Crecimiento" },
  "services.operational": {
    en: "Operational Excellence",
    es: "Excelencia Operativa",
  },
  "services.custom": {
    en: "Custom Applications",
    es: "Aplicaciones Personalizadas",
  },
  "services.enterprise": {
    en: "Enterprise Systems",
    es: "Sistemas Empresariales",
  },
  "services.legacy": {
    en: "Legacy Modernization",
    es: "Modernización de Sistemas Heredados",
  },
  "services.api": { en: "API Integration", es: "Integración de API" },
  "services.predictive": {
    en: "Predictive Analytics",
    es: "Análisis Predictivo",
  },
  "services.automation": {
    en: "Process Automation",
    es: "Automatización de Procesos",
  },
  "services.machine": {
    en: "Machine Learning Models",
    es: "Modelos de Aprendizaje Automático",
  },
  "services.ai.strategy": { en: "AI Strategy", es: "Estrategia de IA" },

  // Benefits
  "benefits.title": { en: "Benefits", es: "Beneficios" },
  "benefits.key": { en: "Key Benefits", es: "Beneficios Clave" },
  "benefits.discover": {
    en: "Discover the benefits for your business",
    es: "Descubra los beneficios para su negocio",
  },
  "benefits.solutions": {
    en: "Our solutions are designed to deliver tangible improvements to your business operations and bottom line.",
    es: "Nuestras soluciones están diseñadas para ofrecer mejoras tangibles en las operaciones de su negocio y en sus resultados.",
  },
  "benefits.tailored": { en: "Tailored Software", es: "Software a Medida" },
  "benefits.tailored.desc": {
    en: "Solutions precisely engineered to meet your specific business requirements.",
    es: "Soluciones diseñadas con precisión para satisfacer sus requisitos comerciales específicos.",
  },
  "benefits.efficiency": { en: "Increased Efficiency", es: "Mayor Eficiencia" },
  "benefits.efficiency.desc": {
    en: "Streamlined processes that reduce waste and maximize productivity.",
    es: "Procesos optimizados que reducen el desperdicio y maximizan la productividad.",
  },
  "benefits.performance": {
    en: "Maximum Performance",
    es: "Máximo Rendimiento",
  },
  "benefits.performance.desc": {
    en: "High-performing systems designed to handle your business demands.",
    es: "Sistemas de alto rendimiento diseñados para manejar las demandas de su negocio.",
  },
  "benefits.adaptability": {
    en: "Full Adaptability",
    es: "Adaptabilidad Total",
  },
  "benefits.adaptability.desc": {
    en: "Flexible solutions that evolve with your changing business needs.",
    es: "Soluciones flexibles que evolucionan con las necesidades cambiantes de su negocio.",
  },
  "benefits.optimization": {
    en: "Guaranteed Optimization",
    es: "Optimización Garantizada",
  },
  "benefits.optimization.desc": {
    en: "Proven methodologies that ensure optimal business outcomes.",
    es: "Metodologías probadas que aseguran resultados comerciales óptimos.",
  },
  "benefits.scalability": {
    en: "Flexible Scalability",
    es: "Escalabilidad Flexible",
  },
  "benefits.scalability.desc": {
    en: "Infrastructure that grows seamlessly with your business success.",
    es: "Infraestructura que crece sin problemas con el éxito de su negocio.",
  },

  // Contact
  "contact.title": { en: "Contact Us", es: "Contáctanos" },
  "contact.metaDescription": {
    en: "Get in touch with our team of experts to transform your business",
    es: "Contacta con nuestro equipo de expertos para transformar tu negocio",
  },
  "contact.metaKeywords": {
    en: "contact, business consulting, software development, digital transformation",
    es: "contacto, consultoría empresarial, desarrollo de software, transformación digital",
  },
  "contact.contactUs": { en: "Contact Us", es: "Contáctanos" },
  "contact.getInTouch": { en: "Get in Touch", es: "Ponte en Contacto" },
  "contact.email.title": { en: "Email", es: "Correo Electrónico" },
  "contact.email.value": {
    en: "alexis.tellez@bcareit.com",
    es: "alexis.tellez@bcareit.com",
  },
  "contact.phone.title": { en: "Phone", es: "Teléfono" },
  "contact.phone.value": { en: "+52 55 1200 7050", es: "+52 55 1200 7050" },
  "contact.address.title": { en: "Address", es: "Dirección" },
  "contact.address.value": {
    en: "Av. P.º de la Reforma 404, Juárez, Cuauhtémoc, 06600, Ciudad de México",
    es: "Av. P.º de la Reforma 404, Juárez, Cuauhtémoc, 06600, Ciudad de México",
  },
  "contact.form.title": { en: "Contact Form", es: "Formulario de Contacto" },
  "contact.form.subtitle": {
    en: "Send us a Message",
    es: "Envíanos un Mensaje",
  },
  "contact.form.description": {
    en: "Fill out the form below and we'll get back to you as soon as possible",
    es: "Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible",
  },
  "contact.simplify": { en: "Simplify your", es: "Simplifica tu" },
  "contact.business": { en: "business", es: "negocio" },
  "contact.and": { en: "and your life", es: "y tu vida" },
  "contact.help": {
    en: "Let us help optimize your business and reach your goals.",
    es: "Déjenos ayudarle a optimizar su negocio y lograr sus objetivos.",
  },
  "contact.message": { en: "Send us a message", es: "Envíanos un mensaje" },
  "contact.firstName": { en: "First Name", es: "Nombre" },
  "contact.lastName": { en: "Last Name", es: "Apellido" },
  "contact.email": { en: "Email Address", es: "Correo Electrónico" },
  "contact.phone": { en: "Phone Number", es: "Número de Teléfono" },
  "contact.howHelp": {
    en: "How can we help you?",
    es: "¿Cómo podemos ayudarte?",
  },
  "contact.hours": { en: "Contact Hours", es: "Horario de Contacto" },

  "contact.placeholder": {
    en: "Tell us about your business needs...",
    es: "Cuéntanos sobre las necesidades de tu negocio...",
  },
  "contact.submit": {
    en: "Message received! We'll get back to you soon.",
    es: "¡Mensaje recibido! Te contactaremos pronto.",
  },
  "contact.sending": { en: "Sending...", es: "Enviando..." },
  "contact.schedule": {
    en: "Schedule an appointment",
    es: "Programa una cita",
  },
  "contact.prefer": {
    en: "Prefer to talk directly? Schedule a consultation with our team to discuss your business needs in detail.",
    es: "¿Prefieres hablar directamente? Programa una consulta con nuestro equipo para discutir en detalle las necesidades de tu negocio.",
  },
  "contact.appointment": {
    en: "Schedule your appointment",
    es: "Programa tu cita",
  },
  "contact.information": {
    en: "Contact Information",
    es: "Información de Contacto",
  },
  "contact.office": { en: "Office", es: "Oficina" },
  "contact.loading": { en: "Loading...", es: "Cargando..." },
  "contact.reach": { en: "Reach Out", es: "Contáctanos" },
  "contact.subtitle": {
    en: "we're here to make your idea a reality",
    es: "estamos aquí para hacer realidad tu idea",
  },
  "contact.workingHours": { en: "Working Hours", es: "Horario de Trabajo" },
  "contact.monday": { en: "Monday - Friday", es: "Lunes - Viernes" },
  "contact.saturday": { en: "Saturday", es: "Sábado" },
  "contact.sunday": { en: "Sunday", es: "Domingo" },
  "contact.closed": { en: "Closed", es: "Cerrado" },
  "contact.findMap": { en: "Find us on the", es: "Encuéntranos en el" },
  "contact.map": { en: "map", es: "mapa" },

  // Footer
  "footer.rights": {
    en: "All rights reserved",
    es: "Todos los derechos reservados",
  },
  "footer.quickLinks": { en: "Quick Links", es: "Enlaces Rápidos" },
  "footer.privacy": { en: "Privacy Policy", es: "Política de Privacidad" },
  "footer.terms": { en: "Terms of Service", es: "Términos de Servicio" },
  "footer.cookie": { en: "Cookie Policy", es: "Política de Cookies" },

  // About page
  "about.aboutUs": { en: "About Us", es: "Conócenos" },
  "about.ourStory": { en: "Our Story", es: "Nuestra Historia" },
  "about.about": { en: "About", es: "Sobre" },
  "about.businessEase": {
    en: "Business Care Consulting",
    es: "Business Care Consulting",
  },
  "about.mission": {
    en: "We're on a mission to transform how businesses operate, making complex processes simple and efficient.",
    es: "Tenemos la misión de transformar la forma en que operan las empresas, haciendo que los procesos complejos sean simples y eficientes.",
  },
  "about.mission.title": { en: "Our Mission", es: "Nuestra Misión" },
  "about.mission.description": {
    en: "To empower businesses with tailored solutions that simplify operations, enhance efficiency, and drive sustainable growth.",
    es: "Capacitar a las empresas con soluciones personalizadas que simplifiquen las operaciones, mejoren la eficiencia e impulsen el crecimiento sostenible.",
  },
  "about.mission.description2": {
    en: "We believe that by streamlining complex processes and implementing innovative technologies, businesses of all sizes can achieve their full potential.",
    es: "Creemos que al simplificar procesos complejos e implementar tecnologías innovadoras, las empresas de todos los tamaños pueden alcanzar su máximo potencial.",
  },

  "about.vision.title": { en: "Our Vision", es: "Nuestra Visión" },
  "about.vision.description": {
    en: "To be the leading provider of business optimization solutions, recognized globally for our innovative approach and measurable impact.",
    es: "Ser el proveedor líder de soluciones de optimización empresarial, reconocido globalmente por nuestro enfoque innovador e impacto medible.",
  },
  "about.vision.description2": {
    en: "We envision a world where businesses can focus on their core competencies while technology handles the complexities of operations seamlessly.",
    es: "Visualizamos un mundo donde las empresas puedan centrarse en sus competencias principales mientras la tecnología gestiona la complejidad de las operaciones sin problemas.",
  },

  "about.values.title": { en: "Our Principles", es: "Nuestros Principios" },
  "about.values.subtitle": {
    en: "The values that drive us",
    es: "Los valores que nos impulsan",
  },
  "about.values.description": {
    en: "These core values guide everything we do, from how we work with clients to how we develop our solutions.",
    es: "Estos valores fundamentales guían todo lo que hacemos, desde cómo trabajamos con clientes hasta cómo desarrollamos nuestras soluciones.",
  },

  "about.values.excellence.title": { en: "Excellence", es: "Excelencia" },
  "about.values.excellence.description": {
    en: "We pursue excellence in every solution we provide, striving to exceed expectations.",
    es: "Buscamos la excelencia en cada solución que proporcionamos, esforzándonos por superar las expectativas.",
  },

  "about.values.innovation.title": { en: "Innovation", es: "Innovación" },
  "about.values.innovation.description": {
    en: "We embrace innovative thinking to solve complex problems with elegant solutions.",
    es: "Adoptamos el pensamiento innovador para resolver problemas complejos con soluciones elegantes.",
  },

  "about.values.collaboration.title": {
    en: "Collaboration",
    es: "Colaboración",
  },
  "about.values.collaboration.description": {
    en: "We believe in the power of collaboration to achieve remarkable results.",
    es: "Creemos en el poder de la colaboración para lograr resultados extraordinarios.",
  },

  "about.values.integrity.title": { en: "Integrity", es: "Integridad" },
  "about.values.integrity.description": {
    en: "We operate with the highest level of integrity and transparency in all our interactions.",
    es: "Operamos con el más alto nivel de integridad y transparencia en todas nuestras interacciones.",
  },

  "about.clients.title": { en: "Our Clients", es: "Nuestros Clientes" },
  "about.clients.subtitle": {
    en: "Trusted by industry leaders",
    es: "Confiado por líderes de la industria",
  },
  "about.clients.description": {
    en: "We've had the privilege of working with amazing companies across various industries.",
    es: "Hemos tenido el privilegio de trabajar con empresas increíbles en diversas industrias.",
  },

  "about.location.title": { en: "Visit Us", es: "Visítanos" },
  "about.location.subtitle": { en: "Our Location", es: "Nuestra Ubicación" },
  "about.location.description": {
    en: "We are conveniently located in the heart of San Francisco's business district.",
    es: "Estamos convenientemente ubicados en el corazón del distrito empresarial de San Francisco.",
  },
  "about.location.office": { en: "Our Office", es: "Nuestra Oficina" },
  "about.location.address": {
    en: "123 Business Ave, Suite 500, San Francisco, CA 94107",
    es: "123 Business Ave, Suite 500, San Francisco, CA 94107",
  },

  // Blog page
  "blog.insights": { en: "Insights", es: "Perspectivas" },
  "blog.blog": { en: "Blog", es: "Blog" },
  "blog.latest": { en: "Latest Articles", es: "Últimos Artículos" },
  "blog.discover": {
    en: "Discover our latest articles, tips and industry insights",
    es: "Descubre nuestros últimos artículos, consejos y perspectivas del sector",
  },
  "blog.featured": { en: "Featured Articles", es: "Artículos Destacados" },
  "blog.recent": { en: "Recent Posts", es: "Publicaciones Recientes" },
  "blog.readTime": { en: "min read", es: "min de lectura" },
  "blog.loadMore": { en: "Load More Articles", es: "Cargar Más Artículos" },
  "blog.categories": { en: "Categories", es: "Categorías" },
  "blog.search": { en: "Search Articles", es: "Buscar Artículos" },
  "blog.searchPlaceholder": {
    en: "Type to search...",
    es: "Escribe para buscar...",
  },
  "blog.backToBlog": { en: "Back to Blog", es: "Volver al Blog" },
  "blog.relatedPosts": { en: "Related Posts", es: "Artículos Relacionados" },
  "blog.postNotFound": {
    en: "The post you are looking for could not be found.",
    es: "El artículo que estás buscando no se pudo encontrar.",
  },
  "blog.readNext": { en: "Read Next", es: "Leer a continuación" },
  "blog.sharePost": { en: "Share this Post", es: "Compartir este artículo" },
  "blog.authorBy": { en: "By", es: "Por" },
  "blog.filterBy": { en: "Filter by", es: "Filtrar por" },
  "blog.allCategories": { en: "All Categories", es: "Todas las Categorías" },
  "blog.noResults": {
    en: "No results found",
    es: "No se encontraron resultados",
  },
  "blog.viewAllPosts": { en: "View All Posts", es: "Ver Todos los artículos" },

  // Contact page
  "blog.noFeaturedResults": {
    en: "No featured posts match your search",
    es: "No hay artículos destacados que coincidan con tu búsqueda",
  },
  "blog.noFeaturedPosts": {
    en: "No featured posts available",
    es: "No hay artículos destacados disponibles",
  },
  "blog.tryDifferentSearch": {
    en: "Try a different search term",
    es: "Intenta con un término de búsqueda diferente",
  },
  "blog.clearSearch": {
    en: "Clear search",
    es: "Borrar búsqueda",
  },
  "blog.foundResults": {
    en: 'Found {{count}} results for "{{query}}"',
    es: '{{count}} resultados para "{{query}}"',
  },
  "blog.noResultsFor": {
    en: 'No results found for "{{query}}"',
    es: 'No hay resultados para "{{query}}"',
  },

  // WhatsApp button
  "whatsapp.message": {
    en: "Hello, I would like to get more information about your services.",
    es: "Hola, me gustaría obtener más información sobre sus servicios.",
  },
  "whatsapp.contactUs": {
    en: "Contact us on WhatsApp",
    es: "Contáctanos por WhatsApp",
  },

  // Añadir nuevas traducciones para mensajes de error de Strapi
  "blog.connectionError": { en: "Connection Error", es: "Error de Conexión" },
  "blog.strapiNotRunning": {
    en: "The content server (Strapi) is not running or cannot be reached. Please try again later.",
    es: "El servidor de contenido (Strapi) no está funcionando o no se puede acceder a él. Por favor, inténtelo más tarde.",
  },
  "blog.tryAgain": { en: "Try Again", es: "Intentar de Nuevo" },
  "blog.noArticles": {
    en: "No Articles Available",
    es: "No Hay Artículos Disponibles",
  },
  "blog.checkLater": {
    en: "Please check back later for new content.",
    es: "Por favor, vuelva más tarde para ver nuevo contenido.",
  },
  "contact.error": {
    en: "There was an error sending your message. Please try again.",
    es: "Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.",
  },
  "contact.send": { en: "Submit", es: "Enviar" },
  "contact.thanks": { en: "Thank You!", es: "¡Gracias!" },
  "contact.submitted": {
    en: "Your message has been sent successfully. We'll get back to you soon.",
    es: "Tu mensaje ha sido enviado exitosamente. Te contactaremos pronto.",
  },

  // Política de privacidad
  "policy.title": { en: "Privacy Policy", es: "Política de Privacidad" },
  "policy.subtitle": {
    en: "Learn how we collect and use your personal information",
    es: "Conozca cómo recopilamos y utilizamos su información personal",
  },

  // Blog
  "blog.articles": { en: "all Articles", es: "todos los artículos" },

  // Landing page
  "landing.hero.title": {
    en: "We Develop The Platform Of Your Dreams",
    es: "Desarrollamos la plataforma de tus sueños",
  },
  "landing.hero.subtitle": {
    en: "Transform your vision into reality with our team of software development experts.",
    es: "Transforma tu visión en realidad con nuestro equipo de expertos en desarrollo de software.",
  },
  "landing.hero.cta": {
    en: "CONTACT US",
    es: "CONTÁCTANOS",
  },
  "landing.stats.experience": {
    en: "Years of Experience",
    es: "Años de Experiencia",
  },
  "landing.stats.clients": {
    en: "Happy Clients",
    es: "Clientes Satisfechos",
  },
  "landing.stats.projects": {
    en: "Projects Completed",
    es: "Proyectos Realizados",
  },
  "landing.development.title": {
    en: "Software Development Services",
    es: "Servicios de Desarrollo de Software",
  },
  "landing.development.subtitle": {
    en: "From concept to reality",
    es: "Del concepto a la realidad",
  },
  "landing.development.description": {
    en: "We create custom software solutions that solve complex business problems and drive growth.",
    es: "Creamos soluciones de software personalizadas que resuelven problemas empresariales complejos e impulsan el crecimiento.",
  },

  // Newsletter translations
  "blog.newsletter": { en: "Newsletter", es: "Boletín Informativo" },
  "blog.newsletterDescription": {
    en: "Subscribe to receive the latest news and articles in your inbox",
    es: "Suscríbete para recibir las últimas noticias y artículos en tu bandeja de entrada",
  },
  "blog.emailPlaceholder": {
    en: "Your email address",
    es: "Tu correo electrónico",
  },
  "blog.subscribe": { en: "Subscribe", es: "Suscribirse" },
  "blog.privacyNotice": {
    en: "We respect your privacy. You can unsubscribe at any time.",
    es: "Respetamos tu privacidad. Puedes darte de baja en cualquier momento.",
  },
  "blog.subscriptionConfirmation": {
    en: "You have successfully joined our subscriber list.",
    es: "Te has suscrito correctamente a nuestra lista.",
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Get stored language from localStorage, defaulting to 'es'
const getStoredLanguage = (): Language => {
  if (typeof window === "undefined") return "es";
  const storedLanguage = localStorage.getItem("preferredLanguage");
  return storedLanguage === "en" || storedLanguage === "es"
    ? storedLanguage
    : "es";
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(getStoredLanguage());

  // Store language in localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
