import { useEffect } from "react";

interface HelmetProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const Helmet = ({
  title,
  description,
  keywords,
  ogImage = "/img/og_image.jpg",
  canonicalUrl,
}: HelmetProps) => {
  useEffect(() => {
    // Guardar el título original
    const originalTitle = document.title;

    // Función para obtener el título formateado
    const getFormattedTitle = (title: string) => {
      switch (title) {
        case "blog.title":
          return "Blog | Business Care Consulting";
        case "contact.title":
          return "Contáctanos | Business Care Consulting";
        case "about.title":
          return "Nosotros | Business Care Consulting";
        case "landing.title":
          return "Landing | Business Care Consulting";
        default:
          return "Business Care Consulting - Optimización de Operaciones Empresariales";
      }
    };

    const formattedTitle = getFormattedTitle(title);

    // Update title
    document.title = formattedTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", formattedTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", description);
    }

    const ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) {
      ogImg.setAttribute("content", ogImage);
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector(
      'meta[property="twitter:title"]'
    );
    if (twitterTitle) {
      twitterTitle.setAttribute("content", formattedTitle);
    }

    const twitterDesc = document.querySelector(
      'meta[property="twitter:description"]'
    );
    if (twitterDesc) {
      twitterDesc.setAttribute("content", description);
    }

    const twitterImg = document.querySelector('meta[property="twitter:image"]');
    if (twitterImg) {
      twitterImg.setAttribute("content", ogImage);
    }

    // Update canonical URL if provided
    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
      }
      canonical.setAttribute("href", canonicalUrl);
    }

    // Cleanup function
    return () => {
      document.title = originalTitle;
    };
  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null;
};

export default Helmet;
