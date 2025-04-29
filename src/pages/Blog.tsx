import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Helmet from "@/components/SEO/Helmet";
import Newsletter from "@/components/Newsletter";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  Ghost,
  Sparkles,
  User,
  Tag,
  Mail,
  CheckCircle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BlogPost,
  getBlogPosts,
  getCategoryColor,
  subscribeToNewsletter,
} from "@/lib/api";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";

// Función de debounce para retrasar la búsqueda
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Blog = () => {
  const { t, language } = useLanguage();
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [postsPerPage] = useState(6);
  const [totalRecentPosts, setTotalRecentPosts] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [strapiError, setStrapiError] = useState<boolean>(false); // Estado para errores de Strapi
  const debouncedSearchQuery = useDebounce(inputValue, 500); // 500ms de retraso

  // Subir al inicio de la página al montar el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Modificar para usar el valor debounced
  useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Agregar una función de búsqueda cuando se envía el formulario
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Prevenir envío del formulario
  };

  // Extraer la lógica de carga de datos en una función que podamos llamar después de cambiar la búsqueda
  const fetchBlogData = useCallback(
    async (page = 1, isLoadMore = false) => {
      if (!isLoadMore) {
        setLoading(true);
        setStrapiError(false); // Resetear el estado de error
      }

      try {
        // Fetch recent posts
        const recentResponse = await getBlogPosts(
          language,
          page,
          postsPerPage,
          false,
          undefined,
          searchQuery
        );

        // Verificar si hay un error devuelto por la API
        if (recentResponse.error) {
          console.error("Error de Strapi:", recentResponse.error.message);
          setStrapiError(true);
          setRecentPosts([]);
          setHasMore(false);
          return;
        }

        if (isLoadMore) {
          // Agregar más posts a los existentes
          setRecentPosts((prev) => [...prev, ...recentResponse.posts]);
        } else {
          setRecentPosts(recentResponse.posts);
          setTotalRecentPosts(recentResponse.pagination.total);
        }

        // Verificar si hay más posts para cargar
        setHasMore(
          recentResponse.pagination.page < recentResponse.pagination.pageCount
        );
      } catch (error) {
        console.error("Error al cargar datos del blog:", error);
        setStrapiError(true);
        setRecentPosts([]);
        setHasMore(false);
      } finally {
        if (!isLoadMore) setLoading(false);
      }
    },
    [language, searchQuery, postsPerPage]
  );

  // Cargar más posts
  const loadMorePosts = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchBlogData(nextPage, true);
  };

  // Efecto para recargar datos cuando cambia el idioma o la búsqueda
  useEffect(() => {
    setCurrentPage(1);
    fetchBlogData(1);
  }, [fetchBlogData, language, searchQuery]);

  // Añadir animación al hacer scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll");

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;

      // When element is in viewport
      if (elementTop < window.innerHeight * 0.8 && elementBottom > 0) {
        element.classList.add("animate");
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", animateOnScroll);
    // Trigger once on load
    setTimeout(animateOnScroll, 100);

    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  // Format date based on the current language
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMM d, yyyy", {
        locale: language === "es" ? es : enUS,
      });
    } catch (error) {
      return dateString;
    }
  };

  // Indicador para no hay resultados
  const showNoResults =
    !loading && recentPosts.length === 0 && searchQuery && !strapiError;

  // Indicador para error de Strapi
  const showStrapiError = !loading && strapiError;

  return (
    <>
      <Helmet
        title={t("blog.title")}
        description={t("blog.metaDescription")}
        keywords={t("blog.metaKeywords")}
        canonicalUrl={`https://bcareconsulting.com/blog`}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <PageHero
          subtitle={t("blog.description")}
          gradientText={t("blog.latest")}
          regularText={t("blog.articles")}
          reducedHeight={true}
          className="pt-24 pb-6 relative z-10"
        />

        {/* Blog Posts Section - Ahora con toda la página dedicada a posts recientes */}
        <section className="pt-4 pb-10 bg-white">
          {" "}
          {/* Reduced top padding */}
          <div className="section-container">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-3/4">
                <h2 className="text-2xl font-semibold mb-10">
                  {t("blog.recent")}
                </h2>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2, 3, 4].map((index) => (
                      <div key={index} className="glass-card overflow-hidden">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6">
                          <div className="w-24 h-5 bg-gray-200 rounded-full mb-3"></div>
                          <div className="w-full h-6 bg-gray-200 rounded-lg mb-2"></div>
                          <div className="w-full h-4 bg-gray-200 rounded mb-4"></div>
                          <div className="flex">
                            <div className="w-20 h-3 bg-gray-200 rounded mr-3"></div>
                            <div className="w-16 h-3 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {recentPosts.map((post, index) => (
                      <Link
                        to={`/blog/${post.slug}`}
                        key={post.id}
                        className="glass-card overflow-hidden card-hover"
                      >
                        <div className="h-48 overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.error(
                                `Error loading image for post ${post.id} - ${post.title}:`,
                                post.coverImage
                              );
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1560732488-7b5e485f6504";
                            }}
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            {post.category && (
                              <span
                                className="text-xs font-medium px-2 py-1 rounded-full"
                                style={{
                                  backgroundColor: `${getCategoryColor(
                                    post.category.name
                                  )}15`,
                                  color: getCategoryColor(post.category.name),
                                }}
                              >
                                {post.category.name}
                              </span>
                            )}
                            {post.author && (
                              <div className="flex items-center text-gray-600 text-xs">
                                <User className="h-3 w-3 mr-1" />
                                <span>{post.author.name}</span>
                              </div>
                            )}
                          </div>
                          <h3 className="text-xl font-semibold mb-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span className="mr-3">
                              {formatDate(post.publishedAt)}
                            </span>
                            <Clock className="h-3 w-3 mr-1" />
                            <span>
                              {post.readTime} {t("blog.readTime")}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : showStrapiError ? (
                  <div className="glass-card p-8 text-center">
                    <Ghost className="h-20 w-20 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg mb-2">{t("blog.connectionError")}</p>
                    <p className="text-gray-500 mb-4">
                      {t("blog.strapiNotRunning")}
                    </p>
                    <button
                      onClick={() => fetchBlogData(1)}
                      className="btn-secondary"
                    >
                      {t("blog.tryAgain")}
                    </button>
                  </div>
                ) : showNoResults ? (
                  <div className="glass-card p-8 text-center">
                    <Ghost className="h-20 w-20 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg mb-2">{t("blog.noResults")}</p>
                    <p className="text-gray-500 mb-4">
                      {t("blog.tryDifferentSearch")}
                    </p>
                    {searchQuery && (
                      <button
                        onClick={() => setInputValue("")}
                        className="btn-secondary"
                      >
                        {t("blog.clearSearch")}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="glass-card p-8 text-center">
                    <Ghost className="h-20 w-20 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg mb-2">{t("blog.noArticles")}</p>
                    <p className="text-gray-500 mb-4">{t("blog.checkLater")}</p>
                  </div>
                )}

                {hasMore && recentPosts.length > 0 && (
                  <div className="mt-12 flex justify-center">
                    <button onClick={loadMorePosts} className="btn-primary">
                      {t("blog.loadMore")}
                    </button>
                  </div>
                )}
              </div>

              <div className="lg:w-1/4">
                <div className="glass-card p-6 animate-on-scroll">
                  <h3 className="text-xl font-semibold mb-4">
                    {t("blog.search")}
                  </h3>
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      placeholder={t("blog.searchPlaceholder")}
                      value={inputValue}
                      onChange={handleSearchChange}
                      className="w-full bg-white/50 border border-purple/20 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple/30"
                    />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <Search className="h-4 w-4 text-purple" />
                    </button>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </form>
                </div>

                {/* Reemplazar el panel de newsletter con el componente - pasamos la clase para animar y una función para manejar la suscripción */}
                <Newsletter
                  className="mt-6 animate-fade-in-up shadow-md"
                  onSubmit={async (email) => {
                    try {
                      const success = await subscribeToNewsletter(
                        email,
                        "brevo"
                      );
                      return success;
                    } catch (error) {
                      console.error("Error al suscribirse:", error);
                      return false;
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
