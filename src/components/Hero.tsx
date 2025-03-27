import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ArrowRight,
  CheckCircle,
  MousePointer,
  Shield,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAnimation } from "@/lib/animation";

const Hero = () => {
  const { t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  // Animation refs using our updated animation hook with proper types
  const headingRef = useAnimation<HTMLHeadingElement>({
    variant: "fadeIn",
    initialDelay: 100,
  });
  const subHeadingRef = useAnimation<HTMLParagraphElement>({
    variant: "fadeIn",
    initialDelay: 300,
  });
  const benefitsRef = useAnimation<HTMLDivElement>({
    variant: "fadeIn",
    initialDelay: 400,
  });
  const buttonsRef = useAnimation<HTMLDivElement>({
    variant: "slideUp",
    initialDelay: 500,
  });
  const decorationRef = useAnimation<HTMLDivElement>({
    variant: "fadeIn",
    initialDelay: 800,
  });
  const cardRef = useAnimation<HTMLDivElement>({
    variant: "fadeIn",
    initialDelay: 900,
  });

  // Make hero section always visible even before animations
  useEffect(() => {
    // Add a class to ensure the hero section is visible regardless of animations
    const ensureVisibility = () => {
      document.querySelectorAll(".hero-section").forEach((el) => {
        el.classList.add("opacity-100");
      });
    };

    // Run immediately and also set a backup timeout
    ensureVisibility();
    const timer = setTimeout(() => {
      ensureVisibility();
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Handle parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Calculate parallax values for elements
  const getParallaxStyle = (strength: number = 0.05) => {
    if (!heroRef.current) return {};

    const { width, height } = heroRef.current.getBoundingClientRect();
    const moveX = (mousePosition.x - width / 2) * strength;
    const moveY = (mousePosition.y - height / 2) * strength;

    return {
      transform: `translate(${moveX}px, ${moveY}px)`,
    };
  };

  // Lista de beneficios clave
  const benefits = [
    {
      icon: <Zap className="h-5 w-5" />,
      text: t("hero.benefit1"),
    },
    {
      icon: <Shield className="h-5 w-5" />,
      text: t("hero.benefit2"),
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      text: t("hero.benefit3"),
    },
  ];

  return (
    <section
      ref={heroRef}
      className={`hero-section relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-50 overflow-hidden ${
        isLoaded ? "hero-loaded" : ""
      }`}
    >
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue/5 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-purple/5 blur-3xl"></div>

        {/* Animated grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Floating decoration elements with parallax effect */}
        <div ref={decorationRef} className="absolute inset-0">
          <div
            className="absolute top-1/4 right-[15%] w-12 h-12 rounded-full bg-gradient-purple opacity-20 float-slow"
            style={getParallaxStyle(0.03)}
          ></div>
          <div
            className="absolute top-1/3 left-[10%] w-24 h-24 rounded-full bg-gradient-blue opacity-10 float-medium"
            style={getParallaxStyle(0.05)}
          ></div>
          <div
            className="absolute bottom-1/4 right-[20%] w-16 h-16 rounded-full bg-gradient-primary opacity-15 float-fast"
            style={getParallaxStyle(0.07)}
          ></div>
          <div
            className="absolute top-1/2 left-[20%] w-8 h-8 rounded-full bg-blue-light opacity-20 float-slow"
            style={getParallaxStyle(0.04)}
          ></div>
          <div
            className="absolute bottom-1/3 left-[30%] w-20 h-20 rounded-full bg-purple-light opacity-10 float-medium"
            style={getParallaxStyle(0.06)}
          ></div>
        </div>
      </div>

      <div className="section-container relative z-10 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center mt-20">
          {/* Badge superior */}

          <h1
            ref={headingRef}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight"
          >
            <span className="text-gradient bg-clip-text text-transparent animate-gradient">
              {t("hero.title1")}
            </span>{" "}
            <span className="relative inline-block text-gray-900">
              {t("hero.title2")}
              <span className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-primary rounded-full"></span>
            </span>
          </h1>

          <p
            ref={subHeadingRef}
            className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            {t("hero.subtitle")}{" "}
            <span className="font-semibold text-gradient bg-clip-text text-transparent">
              {t("hero.months")}
            </span>
          </p>

          {/* Beneficios clave */}
          <div
            ref={benefitsRef}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex items-center py-1.5 px-3 rounded-full transition-all duration-300 ${
                  hoveredBenefit === index
                    ? "bg-purple text-white scale-105"
                    : "bg-gray-100 text-gray-800"
                }`}
                onMouseEnter={() => setHoveredBenefit(index)}
                onMouseLeave={() => setHoveredBenefit(null)}
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="mr-1.5">{benefit.icon}</div>
                <span className="text-sm font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row justify-center gap-4 relative z-30 mb-12"
          >
            <Link
              to="/contact"
              className="group btn-primary text-base md:text-lg shadow-colored relative z-30 overflow-hidden transition-all duration-300 ease-out hover:pl-8 hover:pr-12"
            >
              <span className="relative z-10">{t("hero.contact")}</span>
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:right-6">
                <ArrowRight className="w-4 h-4" />
              </span>
              <span className="absolute bottom-0 left-0 w-full h-full bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Link>
          </div>

          {/* Contador de empresas o estadísticas */}
          <div className="flex flex-wrap justify-center gap-8 mt-4 mb-10">
            <div
              className="text-center animate-on-scroll"
              style={{ animationDelay: "700ms" }}
            >
              <div className="text-3xl font-bold text-purple mb-1">20+</div>
              <div className="text-sm text-gray-500">{t("hero.clients")}</div>
            </div>
            <div
              className="text-center animate-on-scroll"
              style={{ animationDelay: "800ms" }}
            >
              <div className="text-3xl font-bold text-purple mb-1">100%</div>
              <div className="text-sm text-gray-500">
                {t("hero.satisfaction")}
              </div>
            </div>
            <div
              className="text-center animate-on-scroll"
              style={{ animationDelay: "900ms" }}
            >
              <div className="text-3xl font-bold text-purple mb-1">24/7</div>
              <div className="text-sm text-gray-500">{t("hero.support")}</div>
            </div>
          </div>

          {/* Enhanced Floating Card Preview with 3D hover effect */}
          <div
            ref={cardRef}
            className="mt-2 relative max-w-sm mx-auto transform transition-all duration-500 hover:scale-105 perspective"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-light/20 to-blue-light/20 rounded-xl blur-xl transform -rotate-3 scale-105"></div>
            <div className="frost-panel p-6 shadow-medium transform rotate-3 float-slow card-3d-effect">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="h-2 w-16 bg-gray-200 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                <div className="h-3 w-5/6 bg-gray-200 rounded-full"></div>
                <div className="h-3 w-4/6 bg-gray-200 rounded-full"></div>
              </div>
              <div className="mt-3 flex justify-end">
                <div className="h-6 w-20 bg-gradient-primary rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10 animate-bounce">
          <button
            onClick={scrollToFeatures}
            className="flex flex-col items-center justify-center text-gray-400 hover:text-purple transition-colors duration-300 group"
          >
            <span className="text-sm mb-1">{t("hero.scrollDown")}</span>
            <span className="p-2 rounded-full bg-purple/10 group-hover:bg-purple/20 transition-all duration-300">
              <ChevronDown className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
