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

// Format response data to match our interface
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

  // Imprimir todas las propiedades del post para depuración
  console.log("Post object keys:", Object.keys(post));

  // Buscar exhaustivamente todos los posibles campos de imagen
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

  console.log("Checking for image fields in post object:");
  for (const field of possibleImageFields) {
    if (post[field]) {
      console.log(`- Found '${field}': ${post[field]}`);
    }
  }

  // También buscar en la respuesta completa
  console.log("Looking for any image-like property in object:");
  const foundProps = [];
  for (const key of Object.keys(post)) {
    if (
      key.toLowerCase().includes("image") ||
      key.toLowerCase().includes("img") ||
      key.toLowerCase().includes("photo") ||
      key.toLowerCase().includes("media") ||
      key.toLowerCase().includes("cover")
    ) {
      console.log(
        `- Found potentially relevant property: ${key} = ${post[key]}`
      );
      foundProps.push({ key, value: post[key] });
    }
  }

  // Imágenes aleatorias para los posts
  const randomImages = [
    "https://plus.unsplash.com/premium_photo-1679082307685-15e002fd917a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1661956602944-249bcd04b63f",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  ];

  // Función para buscar campos de imagen recursivamente
  const findImageField = (obj: any): string | null => {
    // Si no es un objeto, no seguir buscando
    if (!obj || typeof obj !== "object") return null;

    // Revisar campos directos primero
    for (const key of Object.keys(obj)) {
      // Buscar campos que probablemente contengan URLs de imágenes
      if (
        (key.toLowerCase().includes("image") ||
          key.toLowerCase().includes("cover") ||
          key.toLowerCase() === "img" ||
          key.toLowerCase() === "photo") &&
        typeof obj[key] === "string" &&
        obj[key].length > 0
      ) {
        console.log(`Found image in field '${key}':`, obj[key]);
        return obj[key];
      }
    }

    // Si no se encontró ningún campo directo, buscar en subobjetos
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        const nestedResult = findImageField(obj[key]);
        if (nestedResult) return nestedResult;
      }
    }

    return null;
  };

  // Buscar cualquier campo que pueda contener una imagen
  let imageUrl = findImageField(post);
  let coverImageUrl;

  if (imageUrl) {
    coverImageUrl = handleImageUrl(imageUrl);
    console.log("Found and processed image URL:", coverImageUrl);
  } else {
    // Si no hay imagen, usar una aleatoria
    const imageIndex = post.id % randomImages.length;
    coverImageUrl = randomImages[imageIndex];
    console.log("Using random image:", coverImageUrl);
  }

  // En lugar de asignar autores aleatoriamente, buscar y asignar el autor correcto
  const authors = await fetchAuthors();
  let postAuthor = undefined;

  // Si el post tiene un ID de autor o relación con autor, usarlo
  if (post.author) {
    const authorId =
      typeof post.author === "object" ? post.author.id : post.author;
    postAuthor = authors.find((a) => a.id === authorId);
    console.log(`Author found for post ${post.id}:`, postAuthor);
  }

  // Si no se encontró autor, usar el primero disponible (para desarrollo)
  if (!postAuthor && authors.length > 0) {
    postAuthor = authors[0];
    console.log(`Using default author for post ${post.id}:`, postAuthor);
  }

  // Buscar una categoría aleatoria para este post (por ahora)
  const categories = await fetchCategories();
  let randomCategory = undefined;
  if (categories.length > 0) {
    const categoryIndex = post.id % categories.length;
    randomCategory = categories[categoryIndex];
  }

  // Determinar el locale: primero intentar con post.locale, luego con post.localee,
  // y si ambos fallan, usar "en" como valor predeterminado
  const postLocale = post.locale || post.localee || "en";

  // Determinar featured: si es null, asumimos false
  // Si es un string "true"/"false", convertirlo a boolean
  let isFeatured = false;
  if (post.featured === true || post.featured === "true") {
    isFeatured = true;
  }

  // En la función formatBlogPost
  console.log("Looking for 'Logo_d5cc426ec7.png' in any property:");
  const findValueInObject = (obj: any, targetValue: string): boolean => {
    if (!obj || typeof obj !== "object") return false;

    for (const key of Object.keys(obj)) {
      const value = obj[key];

      // Verificar si el valor actual coincide
      if (typeof value === "string" && value.includes(targetValue)) {
        console.log(`Found '${targetValue}' in property '${key}': ${value}`);
        return true;
      }

      // Búsqueda recursiva en subobjetos
      if (typeof value === "object" && value !== null) {
        if (findValueInObject(value, targetValue)) {
          return true;
        }
      }
    }

    return false;
  };

  // Buscar específicamente Logo_d5cc426ec7.png
  findValueInObject(post, "Logo_d5cc426ec7.png");

  return {
    id: post.id,
    title: post.title || "",
    slug: post.slug || "",
    excerpt: post.excerpt || "",
    content: post.content || "",
    publishedAt: post.publishedAt || post.dateAt || new Date().toISOString(),
    featured: isFeatured,
    readTime: post.readTime || 5,
    coverImage: coverImageUrl,
    locale: postLocale,
    author: postAuthor,
    category: randomCategory,
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
 * Fetch blog posts with pagination and optional filtering
 * @param locale Language code (en or es)
 * @param page Page number
 * @param limit Number of posts per page
 * @param featured Whether to fetch featured posts only
 * @param categoryId Optional category ID to filter posts by
 * @param searchQuery Optional search query to filter posts by title, excerpt, or content
 * @returns Object containing posts array and pagination data
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
    console.log(
      `Fetching posts with: locale=${locale}, page=${page}, limit=${limit}, featured=${featured}, categoryId=${categoryId}, search=${searchQuery}`
    );

    // Obtener todos los posts sin filtros y luego filtrar en el lado del cliente
    const response = await api.get<StrapiResponse>("/api/blog-posts");
    console.log(
      "API response received with data count:",
      response.data.data.length
    );

    // Transformar primero todos los posts
    let allPosts = await Promise.all(response.data.data.map(formatBlogPost));
    console.log("Posts transformed:", allPosts.length);

    // Filtrar por featured de manera más flexible
    if (featured !== undefined) {
      if (featured) {
        allPosts = allPosts.filter((post) => post.featured === true);
      } else {
        allPosts = allPosts.filter((post) => post.featured !== true);
      }
      console.log(`After featured filter (${featured}):`, allPosts.length);
    }

    // Filtrar por categoría si es necesario
    if (categoryId) {
      console.log(`Filtering by category ID: ${categoryId}`);

      // Log all posts and their category IDs for debugging
      allPosts.forEach((post) => {
        console.log(
          `Post ${post.id} - "${post.title}" has category:`,
          post.category
            ? `ID: ${post.category.id}, Name: ${post.category.name}`
            : "No category"
        );
      });

      allPosts = allPosts.filter((post) => {
        if (!post.category) return false;

        // Corregir la comparación para asegurar que sea numérica
        const postCategoryId = post.category.id;
        const matches = postCategoryId === categoryId;

        console.log(
          `Post ${post.id} category ${postCategoryId} matches ${categoryId}? ${matches}`
        );
        return matches;
      });

      console.log(`After category filter (${categoryId}):`, allPosts.length);
    }

    // Filtrar por búsqueda si se proporciona
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      console.log(`Filtering by search query: "${query}"`);
      allPosts = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
      );
      console.log(`After search filter:`, allPosts.length);
    }

    // Considerar tanto locale como localee y ser flexible
    const postsWithRightLocale = allPosts.filter(
      (post) => post.locale === locale || post.locale.startsWith(locale)
    );

    if (postsWithRightLocale.length > 0) {
      allPosts = postsWithRightLocale;
    } else {
      console.log(`No posts found with locale=${locale}, showing all posts`);
    }
    console.log(`After locale filter (${locale}):`, allPosts.length);

    // Implementar paginación manual
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = allPosts.slice(startIndex, endIndex);
    console.log(
      `Pagination: page ${page}, limit ${limit}, showing ${paginatedPosts.length} posts`
    );

    return {
      posts: paginatedPosts,
      pagination: {
        page,
        pageSize: limit,
        pageCount: Math.ceil(allPosts.length / limit),
        total: allPosts.length,
      },
    };
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    if (error instanceof AxiosError) {
      console.error("Request URL:", error.config?.url);
      console.error("Request params:", error.config?.params);
      console.error("Response data:", error.response?.data);
    }

    // En lugar de generar datos de respaldo, devolver un objeto con error
    return {
      posts: [],
      pagination: {
        page,
        pageSize: limit,
        pageCount: 0,
        total: 0,
      },
      error: {
        message:
          "No se pudieron cargar los artículos. Strapi podría no estar funcionando.",
        type: "CONNECTION_ERROR",
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
