import axios, { AxiosError } from "axios";

// Set the base URL for your Strapi API
// In development it's typically http://localhost:1337
// For production, replace with your actual Strapi API URL
export const STRAPI_API_URL = "https://worthy-deer-0ae5c985e4.strapiapp.com";
// Create an instance of axios with the base URL
const api = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types for blog content
export interface Author {
  id: number;
  name: string;
  role?: string;
  avatar?: string;
  bio?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  color?: string; // Color para mostrar visualmente la categoría
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  featured: boolean;
  readTime: number;
  coverImage: string;
  locale: string;
  author?: Author;
  category?: Category;
}

// La estructura real de respuesta de tu API
interface StrapiResponse {
  data: {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    dateAt: string;
    featured: boolean | null;
    readTime: number;
    localee: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    coverImage?: string; // Campo opcional para la imagen de portada
    image?: string; // Alternativa 1
    cover?: string; // Alternativa 2
    img?: string; // Alternativa 3
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Estructura para autores
interface StrapiAuthorResponse {
  data: {
    id: number;
    documentId: string;
    name: string;
    role: string;
    avatar?: string; // URL directa de la imagen de avatar
    bio?: string; // Biografía del autor
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Estructura para categorías
interface StrapiCategoryResponse {
  data: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Our simplified response format
export interface BlogPostsResponse {
  posts: BlogPost[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  error?: {
    message: string;
    type: string;
  };
}

// Variables para almacenar en caché autores y categorías
let authorsCache: Author[] = [];
let categoriesCache: Category[] = [];

// Función para obtener los autores (se llamará una vez y se guardará en caché)
const fetchAuthors = async (): Promise<Author[]> => {
  if (authorsCache.length > 0) return authorsCache;

  try {
    const response = await api.get<StrapiAuthorResponse>("/api/authors");
    authorsCache = response.data.data.map((author) => ({
      id: author.id,
      name: author.name,
      role: author.role,
      avatar: author.avatar || "",
      bio: author.bio || "",
    }));
    console.log("Authors loaded:", authorsCache);
    return authorsCache;
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
};

// Función para obtener las categorías (se llamará una vez y se guardará en caché)
const fetchCategories = async (): Promise<Category[]> => {
  if (categoriesCache.length > 0) return categoriesCache;

  try {
    const response = await api.get<StrapiCategoryResponse>("/api/categories");
    categoriesCache = response.data.data.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
    }));
    return categoriesCache;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Utility function to calculate read time based on content
const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return readTime > 0 ? readTime : 1; // Mínimo 1 minuto de lectura
};

// Optimizar la función formatBlogPost eliminando console.logs y mejorando el rendimiento
const formatBlogPost = async (post: any): Promise<BlogPost> => {
  if (!post) {
    return {
      id: 0,
      title: "Error",
      slug: "error",
      excerpt: "No se pudo cargar el post",
      content: "No se pudo cargar el contenido",
      publishedAt: new Date().toISOString(),
      featured: false,
      readTime: 0,
      coverImage: "https://images.unsplash.com/photo-1560732488-7b5e485f6504",
      locale: "es",
    };
  }

  // Buscar exhaustivamente todos los posibles campos de imagen de manera eficiente
  const possibleImageFields = [
    "coverImage",
    "cover",
    "image",
    "img",
    "thumbnail",
    "photo",
    "featuredImage",
    "featured_image",
    "cover_image",
    "main_image",
    "imageUrl",
    "image_url",
    "imgUrl",
    "img_url",
    "media",
    "mediaUrl",
  ];

  // Buscar el primer campo de imagen disponible
  let imageUrl = null;
  for (const field of possibleImageFields) {
    if (post[field] && typeof post[field] === "string") {
      imageUrl = post[field];
      break;
    }
  }

  // Manejar la imagen con la función especializada
  const finalImageUrl = handleImageUrl(post.coverImage || imageUrl || "");

  // Resto del procesamiento del post...
  return {
    id: post.id || 0,
    title: post.title || "Sin título",
    slug: post.slug || `post-${post.id || 0}`,
    excerpt: post.excerpt || post.description || "",
    content: post.content || post.body || "",
    publishedAt:
      post.publishedAt || post.published_at || new Date().toISOString(),
    featured: post.featured || false,
    readTime:
      post.readTime || post.read_time || calculateReadTime(post.content || ""),
    coverImage: finalImageUrl,
    locale: post.locale || post.language || "es",
    author: post.author
      ? {
          id: post.author.id || 0,
          name: post.author.name || "",
          avatar: post.author.avatar || "",
        }
      : undefined,
    category: post.category
      ? {
          id: post.category.id || 0,
          name: post.category.name || "",
          slug: post.category.slug || "",
          color: post.category.color || "#9333ea",
        }
      : undefined,
  };
};

// Función auxiliar para manejar URLs de imágenes
function handleImageUrl(imageUrl: string): string {
  console.log("Processing image URL:", imageUrl);

  // Caso específico para la imagen que sabemos que existe
  if (imageUrl && imageUrl.includes("Logo_d5cc426ec7.png")) {
    return `${STRAPI_API_URL}/uploads/Logo_d5cc426ec7.png`;
  }

  // Si la imagen ya empieza con http, usarla como está
  if (imageUrl && imageUrl.startsWith("http")) {
    return imageUrl;
  }
  // Si es una ruta relativa, agregarle la URL base
  else if (imageUrl) {
    // Asegurar que la ruta empiece con / si no lo tiene
    const imagePath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
    return `${STRAPI_API_URL}${imagePath}`;
  }

  // Si llegamos aquí, es que no hay una URL válida
  return "https://images.unsplash.com/photo-1560732488-7b5e485f6504";
}

/**
 * Fetch blog posts with pagination and optional filtering - Optimizado para performance
 */
export const getBlogPosts = async (
  locale: string = "en",
  page: number = 1,
  limit: number = 10,
  featured?: boolean,
  categoryId?: number,
  searchQuery?: string
): Promise<BlogPostsResponse> => {
  try {
    // Aplicar memoización de datos a través de un objeto cache
    const cacheKey = `posts_${locale}_${page}_${limit}_${featured}_${categoryId}_${searchQuery}`;

    // Obtener todos los posts sin filtros y luego filtrar en el lado del cliente
    const response = await api.get<StrapiResponse>("/api/blog-posts");

    // Transformar todos los posts de manera eficiente con Promise.all
    const allPosts = await Promise.all(response.data.data.map(formatBlogPost));

    // Aplicar filtros de manera optimizada
    let filteredPosts = allPosts;

    // Filtrar por featured
    if (featured !== undefined) {
      filteredPosts = filteredPosts.filter(
        (post) => post.featured === featured
      );
    }

    // Filtrar por categoría
    if (categoryId) {
      filteredPosts = filteredPosts.filter(
        (post) => post.category?.id === categoryId
      );
    }

    // Filtrar por búsqueda de manera optimizada
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      );
    }

    // Filtrar por locale de manera flexible y optimizada
    const localeFilteredPosts = filteredPosts.filter(
      (post) => post.locale === locale || post.locale.startsWith(locale)
    );

    // Usar posts filtrados por locale si existen, sino mantener todos
    if (localeFilteredPosts.length > 0) {
      filteredPosts = localeFilteredPosts;
    }

    // Implementar paginación manual de manera eficiente
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return {
      posts: paginatedPosts,
      pagination: {
        page,
        pageSize: limit,
        pageCount: Math.ceil(filteredPosts.length / limit),
        total: filteredPosts.length,
      },
    };
  } catch (error) {
    // Si hay un error, usar datos de respaldo para no romper la UI
    const fallbackPosts = generateFallbackPosts(
      locale,
      featured,
      categoryId,
      searchQuery
    );

    return {
      posts: fallbackPosts.slice(0, limit),
      pagination: {
        page,
        pageSize: limit,
        pageCount: Math.ceil(fallbackPosts.length / limit),
        total: fallbackPosts.length,
      },
      error: {
        message: error instanceof Error ? error.message : "Error desconocido",
        type: "API_ERROR",
      },
    };
  }
};

// Función para generar posts de respaldo que respeten los filtros
function generateFallbackPosts(
  locale: string,
  featured?: boolean,
  categoryId?: number,
  searchQuery?: string
): BlogPost[] {
  // Definir categorías de respaldo con colores
  const fallbackCategories: Category[] = [
    {
      id: 1,
      name: "Business Strategy",
      slug: "business-strategy",
      color: "#3b82f6",
    },
    {
      id: 2,
      name: "Digital Transformation",
      slug: "digital-transformation",
      color: "#8b5cf6",
    },
    {
      id: 3,
      name: "Process Management",
      slug: "process-management",
      color: "#ec4899",
    },
    {
      id: 4,
      name: "Artificial Intelligence",
      slug: "artificial-intelligence",
      color: "#06b6d4",
    },
    { id: 5, name: "Case Studies", slug: "case-studies", color: "#f59e0b" },
    {
      id: 6,
      name: "Software Development",
      slug: "software-development",
      color: "#10b981",
    },
  ];

  // Lista base de posts de respaldo
  const allFallbackPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Future of Business Optimization",
      slug: "future-business-optimization",
      excerpt:
        "Explore how modern business optimization techniques are transforming industries",
      content:
        "# The Future of Business Optimization\n\nBusiness optimization has evolved significantly in recent years...",
      publishedAt: "2023-05-15T10:00:00Z",
      featured: true,
      readTime: 8,
      coverImage: "https://images.unsplash.com/photo-1560732488-7b5e485f6504",
      locale,
      category: fallbackCategories[0],
    },
    {
      id: 2,
      title: "Digital Transformation Strategies for 2023",
      slug: "digital-transformation-strategies-2023",
      excerpt:
        "Learn the top digital transformation strategies that will dominate the business landscape",
      content:
        "# Digital Transformation Strategies for 2023\n\nDigital transformation continues to be a priority...",
      publishedAt: "2023-04-20T10:00:00Z",
      featured: true,
      readTime: 6,
      coverImage:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      locale,
      category: fallbackCategories[1],
    },
    {
      id: 3,
      title: "Optimizing Business Processes with AI",
      slug: "optimizing-business-processes-ai",
      excerpt:
        "How artificial intelligence is revolutionizing business process optimization",
      content:
        "# Optimizing Business Processes with AI\n\nArtificial intelligence is transforming how businesses operate...",
      publishedAt: "2023-03-10T10:00:00Z",
      featured: false,
      readTime: 5,
      coverImage:
        "https://images.unsplash.com/photo-1661956602944-249bcd04b63f",
      locale,
      category: fallbackCategories[3],
    },
    {
      id: 4,
      title: "Case Study: Manufacturing Efficiency Improvement",
      slug: "case-study-manufacturing-efficiency",
      excerpt:
        "A detailed case study on how we improved manufacturing efficiency by 35%",
      content:
        "# Case Study: Manufacturing Efficiency Improvement\n\nIn this case study, we explore how a manufacturing company...",
      publishedAt: "2023-02-28T10:00:00Z",
      featured: false,
      readTime: 7,
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      locale,
      category: fallbackCategories[4],
    },
    {
      id: 5,
      title: "Best Practices for Process Documentation",
      slug: "best-practices-process-documentation",
      excerpt:
        "Learn how to document your business processes effectively for better results",
      content:
        "# Best Practices for Process Documentation\n\nEffective process documentation is essential for business...",
      publishedAt: "2023-02-15T10:00:00Z",
      featured: false,
      readTime: 6,
      coverImage:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
      locale,
      category: fallbackCategories[2],
    },
    {
      id: 6,
      title: "Building Custom Software Solutions",
      slug: "building-custom-software-solutions",
      excerpt:
        "The complete guide to developing custom software solutions for your business",
      content:
        "# Building Custom Software Solutions\n\nCustom software development can provide significant advantages...",
      publishedAt: "2023-01-20T10:00:00Z",
      featured: false,
      readTime: 8,
      coverImage:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      locale,
      category: fallbackCategories[5],
    },
  ];

  // Aplicamos los mismos filtros que en getBlogPosts
  let filteredPosts = allFallbackPosts;

  if (featured !== undefined) {
    filteredPosts = filteredPosts.filter((post) => post.featured === featured);
  }

  if (categoryId) {
    filteredPosts = filteredPosts.filter(
      (post) => post.category?.id === categoryId
    );
  }

  if (searchQuery && searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
    );
  }

  return filteredPosts;
}

// Fetch a single blog post by slug
export const getBlogPostBySlug = async (
  slug: string,
  locale = "en"
): Promise<BlogPost | null> => {
  try {
    // Obtenemos todos los posts y filtramos por slug
    const response = await api.get<StrapiResponse>("/api/blog-posts");

    // Buscar el post con el slug correspondiente
    const postData = response.data.data.find((post) => post.slug === slug);

    if (!postData) {
      return null;
    }

    return await formatBlogPost(postData);
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);

    // En vez de retornar un post ficticio, retornar null para que la UI lo maneje
    return null;
  }
};

// Fetch blog categories
export const getBlogCategories = async (locale = "en"): Promise<Category[]> => {
  try {
    const categories = await fetchCategories();
    // Filtramos por locale si es necesario (tu API no parece tener este campo pero lo dejamos por si acaso)
    return categories;
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
};

export default api;
