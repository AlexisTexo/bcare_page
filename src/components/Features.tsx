import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Shield,
  Brain,
  Sparkles,
  HeartPulse,
  Users,
  Clock,
} from "lucide-react";
import { useAnimation } from "@/lib/animation";

// Individual Feature Card component
const FeatureCard = ({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) => {
  const cardRef = useAnimation<HTMLDivElement>({
    variant: "fadeIn",
    initialDelay: 100 + index * 150,
  });

  return (
    <div
      ref={cardRef}
      className="glass-card-hover p-6 flex flex-col items-center text-center group"
    >
      <div className="rounded-full bg-gradient-primary p-3 mb-4 w-16 h-16 flex items-center justify-center text-white shadow-colored group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const titleRef = useAnimation<HTMLHeadingElement>({ variant: "fadeIn" });
  const subtitleRef = useAnimation<HTMLParagraphElement>({
    variant: "fadeIn",
    initialDelay: 200,
  });

  // Ensure content is visible even if animations haven't triggered
  useEffect(() => {
    const ensureVisibility = () => {
      document.querySelectorAll(".features-section").forEach((el) => {
        el.classList.add("opacity-100");
      });
      document.querySelectorAll(".feature-content").forEach((el) => {
        el.classList.add("opacity-100");
      });
    };

    // Run immediately and set a backup timeout
    ensureVisibility();
    const timer = setTimeout(() => {
      ensureVisibility();
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Brain,
      title: t("features.expertise.title"),
      description: t("features.expertise.description"),
    },
    {
      icon: HeartPulse,
      title: t("features.care.title"),
      description: t("features.care.description"),
    },
    {
      icon: Shield,
      title: t("features.security.title"),
      description: t("features.security.description"),
    },
    {
      icon: Users,
      title: t("features.community.title"),
      description: t("features.community.description"),
    },
    {
      icon: Clock,
      title: t("features.time.title"),
      description: t("features.time.description"),
    },
    {
      icon: Sparkles,
      title: t("features.innovation.title"),
      description: t("features.innovation.description"),
    },
  ];

  return (
    <section
      id="features"
      className={`features-section bg-gray-50 py-20 ${
        isLoaded ? "features-loaded" : ""
      }`}
    >
      <div className="section-container feature-content">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="section-title">
            <span className="text-gradient">{t("features.title")}</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {t("features.subtitle")}
          </p>
        </div>

        {/* Background decorative element */}
        <div className="absolute right-0 top-1/3 w-64 h-64 bg-gradient-to-r from-purple/5 to-blue/5 rounded-full blur-3xl -z-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
