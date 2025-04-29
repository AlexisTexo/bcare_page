import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Tag, Ghost, User } from "lucide-react";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import ReactMarkdown from "react-markdown";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { BlogPost, getBlogPostBySlug, getCategoryColor } from "@/lib/api";

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [strapiError, setStrapiError] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setStrapiError(false);

      if (!slug) {
        navigate("/blog");
        return;
      }

      try {
        const postData = await getBlogPostBySlug(slug, language);

        if (postData) {
          setPost(postData);

          const relatedResponse = await Promise.all(
            [
              getBlogPostBySlug("post-related-1", language),
              getBlogPostBySlug("post-related-2", language),
            ].filter(Boolean)
          );

          setRelatedPosts(relatedResponse.filter(Boolean) as BlogPost[]);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setStrapiError(true);
        setPost(null);
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, language, navigate]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "MMMM d, yyyy", {
        locale: language === "es" ? es : enUS,
      });
    } catch (error) {
      return dateString;
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setStrapiError(false);

    setTimeout(() => {
      const fetchPost = async () => {
        try {
          if (!slug) return;

          const postData = await getBlogPostBySlug(slug, language);

          if (postData) {
            setPost(postData);
            setRelatedPosts([]);
          } else {
            setPost(null);
          }
        } catch (error) {
          console.error("Error en reintento:", error);
          setStrapiError(true);
          setPost(null);
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="py-32 bg-gradient-to-br from-white to-purple-50">
        <div className="section-container">
          {loading ? (
            <div className="max-w-4xl mx-auto">
              <div className="w-24 h-6 bg-gray-200 rounded-full mb-4"></div>
              <div className="w-full h-12 bg-gray-200 rounded-lg mb-6"></div>
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-32 h-5 bg-gray-200 rounded"></div>
                <div className="w-24 h-5 bg-gray-200 rounded"></div>
              </div>
              <div className="aspect-video w-full bg-gray-200 rounded-xl mb-10"></div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="w-full h-6 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ) : strapiError ? (
            <div className="max-w-4xl mx-auto text-center">
              <Ghost className="h-20 w-20 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-semibold mb-2">
                {t("blog.connectionError")}
              </h2>
              <p className="text-gray-600 mb-6">{t("blog.strapiNotRunning")}</p>
              <div className="flex justify-center gap-4">
                <button onClick={handleRetry} className="btn-primary">
                  {t("blog.tryAgain")}
                </button>
                <Link to="/blog" className="btn-secondary">
                  {t("blog.backToBlog")}
                </Link>
              </div>
            </div>
          ) : post ? (
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <Link
                  to="/blog"
                  className="inline-flex items-center text-purple hover:text-purple-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t("blog.backToBlog")}
                </Link>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-purple" />
                  <span>
                    {post.readTime} {t("blog.readTime")}
                  </span>
                </div>

                {post.category && (
                  <div className="flex items-center">
                    <Tag
                      className="h-5 w-5 mr-2"
                      style={{ color: getCategoryColor(post.category.name) }}
                    />
                    <Link
                      to={`/blog/category/${post.category.slug}`}
                      className="hover:underline transition-colors px-2 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: `${getCategoryColor(
                          post.category.name
                        )}15`,
                        color: getCategoryColor(post.category.name),
                      }}
                    >
                      {post.category.name}
                    </Link>
                  </div>
                )}
              </div>

              <div className="mb-10 rounded-xl overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full aspect-video object-cover"
                  onError={(e) => {
                    console.error(
                      `Error loading cover image:`,
                      post.coverImage
                    );
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1560732488-7b5e485f6504";
                  }}
                />
              </div>

              {post.author && (
                <div className="flex items-center p-5 bg-gray-50 rounded-xl mb-8 hover:shadow-md transition-all">
                  <div className="mr-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full object-cover border-2"
                      style={{
                        borderColor: post.category
                          ? getCategoryColor(post.category.name)
                          : "#9333ea",
                      }}
                      loading="eager"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://ui-avatars.com/api/?name=" +
                          encodeURIComponent(post.author.name);
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <User
                        className="h-4 w-4 mr-2"
                        style={{
                          color: post.category
                            ? getCategoryColor(post.category.name)
                            : "#9333ea",
                        }}
                      />
                      <h3 className="font-semibold text-lg">
                        {post.author.name}
                      </h3>
                    </div>
                    {post.author.bio && (
                      <p className="text-gray-600 text-sm">{post.author.bio}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-3xl font-bold my-4" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-2xl font-bold my-4" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-xl font-bold my-3" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a className="text-blue-600 hover:underline" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-6 my-4" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-6 my-4" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="border-l-4 border-gray-300 pl-4 italic my-4"
                        {...props}
                      />
                    ),
                    code: ({ node, ...props }) => (
                      <code
                        className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm"
                        {...props}
                      />
                    ),
                    pre: ({ node, ...props }) => (
                      <pre
                        className="bg-gray-100 rounded p-4 overflow-x-auto my-4 font-mono text-sm"
                        {...props}
                      />
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Ghost className="h-20 w-20 mx-auto mb-4 text-gray-400" />
              <p className="text-xl mb-4">{t("blog.postNotFound")}</p>
              <Link
                to="/blog"
                className="text-purple hover:underline inline-block btn-secondary"
              >
                {t("blog.backToBlog")}
              </Link>
            </div>
          )}
        </div>
      </div>

      {!loading && !strapiError && post && relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="section-container">
            <h2 className="text-2xl font-semibold mb-10">
              {t("blog.relatedPosts")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="glass-card overflow-hidden card-hover"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={relatedPost.coverImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      {relatedPost.category && (
                        <span
                          className="text-xs font-medium px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: `${getCategoryColor(
                              relatedPost.category.name
                            )}15`,
                            color: getCategoryColor(relatedPost.category.name),
                          }}
                        >
                          {relatedPost.category.name}
                        </span>
                      )}
                      {relatedPost.author && (
                        <div className="flex items-center text-gray-600 text-xs">
                          <User className="h-3 w-3 mr-1" />
                          <span>{relatedPost.author.name}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="mr-3">
                        {formatDate(relatedPost.publishedAt)}
                      </span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {relatedPost.readTime} {t("blog.readTime")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetail;
