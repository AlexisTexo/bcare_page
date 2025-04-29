import React, { useEffect } from "react";
import { useAnimation } from "@/lib/animation";
import { useLanguage } from "@/contexts/LanguageContext";

export interface PageHeroProps {
  subtitle: string;
  gradientText?: string;
  regularText?: string;
  className?: string;
  reducedHeight?: boolean;
}

const PageHero: React.FC<PageHeroProps> = ({
  subtitle,
  gradientText,
  regularText,
  className = "",
  reducedHeight = false,
}) => {
  const { t } = useLanguage();
  const titleRef = useAnimation<HTMLHeadingElement>({ variant: "fadeIn" });
  const subtitleRef = useAnimation<HTMLParagraphElement>({
    variant: "fadeIn",
    initialDelay: 200,
  });

  // Ensure the hero is always visible even if animations haven't triggered
  useEffect(() => {
    const ensureVisibility = () => {
      document.querySelectorAll(".page-hero").forEach((el) => {
        el.classList.add("opacity-100");
      });
    };

    // Run immediately and set a backup timeout
    ensureVisibility();
    const timer = setTimeout(ensureVisibility, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`page-hero pt-32 pb-10 bg-gradient-to-br from-white to-purple-50 ${className} ${
        reducedHeight ? "py-6" : "py-20"
      }`}
    >
      <div className="section-container">
        <div className="text-center mb-6">
          <h1
            ref={titleRef}
            className={`font-heading ${
              gradientText
                ? "text-2xl md:text-6xl font-bold tracking-tight"
                : reducedHeight
                ? "text-5xl"
                : "text-1xl md:text-5xl"
            } font-bold mb-4`}
          >
            {gradientText && (
              <span className="text-gradient bg-clip-text text-transparent animate-gradient">
                {gradientText}
              </span>
            )}
            {regularText && <> {regularText}</>}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
