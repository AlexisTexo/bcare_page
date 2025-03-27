import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Calendar,
  Clock,
  Search,
  ArrowRight,
  ArrowLeft,
  Ghost,
} from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { BlogPost, Category, getBlogPosts, getBlogCategories } from "@/lib/api";
import Skeleton from "@/components/Skeleton";

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

const BlogCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(inputValue, 500); // 500ms de retraso
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [postsPerPage] = useState(6);
  const [totalPosts, setTotalPosts] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, page]);

  // Modificar para usar el valor debounced
  useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  // Función para manejar el cambio en el campo de búsqueda (búsqueda instantánea)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // Resetear a la primera página al buscar
    if (page !== 1) setPage(1);
  };

  // Manejar la búsqueda cuando se envía el formulario
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Prevenir el envío del formulario
  };

  // Fetch blog posts based on the selected language, category, and search query
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all categories
        const categoriesData = await getBlogCategories(language);
        setCategories(categoriesData);

        const currentCat =
          categoriesData.find((cat) => cat.slug === slug) || null;
        setCurrentCategory(currentCat);

        // Fetch posts directly from API with all filters applied
        const response = await getBlogPosts(
          language,
          page,
          postsPerPage,
          undefined, // featured no importa en la vista de categoría
          currentCat ? currentCat.id : undefined,
          searchQuery // Pasar la búsqueda a la API
        );

        // Set posts and pagination data
        setPosts(response.posts);
        setTotalPages(Math.ceil(response.pagination.total / postsPerPage));
        setTotalPosts(response.pagination.total);

        console.log(
          `Found ${response.posts.length} posts for category "${
            currentCat?.name || "all"
          }" with search "${searchQuery || "none"}"`
        );
      } catch (error) {
        console.error("Error fetching category data:", error);
        setPosts([]);
        setTotalPages(1);
        setTotalPosts(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, language, page, searchQuery]);

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

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title={currentCategory?.name || t("blog.categories")}
        gradientText={t("blog.blog")}
        regularText={t("blog.categories")}
        subtitle={t("blog.discover")}
        reducedHeight={true}
      />

      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="section-container">
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center text-purple hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("blog.backToBlog")}
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-3/4">
              {currentCategory && (
                <h2 className="text-2xl font-semibold mb-6">
                  <span
                    className="inline-flex items-center py-1 px-3 rounded-full text-lg"
                    style={{
                      backgroundColor: `${
                        currentCategory.color || "#9333ea"
                      }15`,
                      color: currentCategory.color || "#9333ea",
                    }}
                  >
                    {currentCategory.name}
                  </span>{" "}
                  {t("blog.filterBy")}
                </h2>
              )}

              {/* Mostrar resultados de búsqueda */}
              {searchQuery && !loading && (
                <div className="mb-6 text-gray-600">
                  {totalPosts > 0 ? (
                    <p>
                      {t("blog.foundResults", {
                        count: totalPosts,
                        query: searchQuery,
                      })}
                    </p>
                  ) : (
                    <p>{t("blog.noResultsFor", { query: searchQuery })}</p>
                  )}
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <div
                      key={index}
                      className="glass-card overflow-hidden animate-pulse"
                    >
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
              ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {posts.map((post, index) => (
                    <Link
                      to={`/blog/${post.slug}`}
                      key={post.id}
                      className="glass-card overflow-hidden card-hover animate-on-scroll"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
                        <div className="flex items-center mb-3">
                          {post.category && (
                            <span
                              className="text-xs font-medium px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: `${
                                  post.category.color || "#9333ea"
                                }15`,
                                color: post.category.color || "#9333ea",
                              }}
                            >
                              {post.category.name}
                            </span>
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
              ) : (
                <div className="glass-card p-8 text-center">
                  <Ghost className="h-20 w-20 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg mb-2">{t("blog.noResults")}</p>
                  <p className="text-gray-500 mb-4">
                    {t("blog.tryDifferentSearch")}
                  </p>
                  <div className="flex justify-center space-x-4">
                    {searchQuery && (
                      <button
                        onClick={() => setInputValue("")}
                        className="btn-secondary"
                      >
                        {t("blog.clearSearch")}
                      </button>
                    )}
                    <Link to="/blog" className="btn-primary">
                      {t("blog.viewAllPosts")}
                    </Link>
                  </div>
                </div>
              )}

              {totalPages > 1 && posts.length > 0 && (
                <div className="mt-12 flex justify-center items-center space-x-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className={`p-2 rounded-full ${
                      page === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-purple hover:bg-purple/10"
                    }`}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>

                  <span className="text-gray-600">
                    {page} / {totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className={`p-2 rounded-full ${
                      page === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-purple hover:bg-purple/10"
                    }`}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="lg:w-1/4">
              <div className="glass-card p-6 mb-8 animate-on-scroll">
                <h3 className="text-xl font-semibold mb-4">
                  {t("blog.categories")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to="/blog"
                    className="category-badge"
                    style={{
                      backgroundColor: "#f3f4f6",
                      color: "#4b5563",
                      borderColor: "#e5e7eb",
                    }}
                  >
                    {t("blog.allCategories")}
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/blog/category/${category.slug}`}
                      className={`category-badge ${
                        category.slug === slug ? "active-category" : ""
                      }`}
                      style={{
                        backgroundColor:
                          category.slug === slug
                            ? `${category.color || "#9333ea"}25`
                            : `${category.color || "#9333ea"}10`,
                        color: category.color || "#9333ea",
                        borderColor: `${category.color || "#9333ea"}40`,
                        boxShadow:
                          category.slug === slug
                            ? `0 0 0 1px ${category.color || "#9333ea"}50`
                            : "none",
                      }}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

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
                    className="w-full bg-white/50 border border-purple/20 rounded-lg pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple/30"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  {inputValue && (
                    <button
                      type="button"
                      onClick={() => setInputValue("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <span className="sr-only">{t("blog.clearSearch")}</span>×
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogCategory;
