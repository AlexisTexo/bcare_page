import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Benefits from "@/components/BenefitsLanding";
import ContactForm from "@/components/ContactFormLanding";
import Helmet from "@/components/SEO/Helmet";
import ClientsSection from "@/components/ClientsSectionLanding";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Landing = () => {
  const { t } = useLanguage();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animate on scroll functionality
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

  return (
    <>
      <Helmet
        title="landing.title"
        description={t("landing.metaDescription")}
        keywords={t("landing.metaKeywords")}
        canonicalUrl="https://bcareconsulting.com/landing"
      />
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero inspirado en la imagen */}
        <section className="relative overflow-hidden min-h-[80vh] flex items-center">
          {/* Background Image with Gradient */}
          <div className="absolute inset-0">
            <img
              src="/img/landing_img.webp"
              alt="Equipo de desarrollo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#BF3131]/90 via-[#7D0A0A]/50 to-transparent"></div>
          </div>

          {/* Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0zaDF2NGgtMXYtNHptLTUgM2g0djFoLTR2LTF6bTAgMGgxdjRoLTF2LTR6TTMwIDI0aDR2MWgtNHYtMXptMC0zaDF2NGgtMXYtNHptLTUgM2g0djFoLTR2LTF6bTAgMGgxdjRoLTF2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

          <div className="section-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white animate-on-scroll pt-40">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {t("landing.hero.title")}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                  {t("landing.hero.subtitle")}
                </p>
                <button
                  onClick={() => {
                    document
                      .getElementById("contact-form")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-white text-black px-8 py-4 rounded-full font-semibold inline-flex items-center hover:bg-[#BF3131] hover:text-white transition-all shadow-lg cursor-pointer"
                >
                  <span>{t("landing.hero.cta")}</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>

              {/* Stats Panels */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 pt-20 lg:pt-40 lg:space-y-6">
                <div className="col-span-1">
                  {/* Experiencia Panel */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-3xl"></div>
                    <div className="absolute -inset-4 bg-red-500/10 rounded-3xl blur-3xl"></div>
                    <div
                      className="relative glass-card p-8 backdrop-blur-sm bg-white/10 border border-white/20 
                      transition-all duration-300 hover:bg-[#BF3131]/20 hover:scale-105 hover:shadow-lg cursor-pointer"
                    >
                      <div className="text-white text-center">
                        <h3 className="text-5xl font-bold mb-2">10+</h3>
                        <p className="text-white/80">
                          {t("landing.stats.experience")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  {/* Clientes Panel */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-3xl"></div>
                    <div className="absolute -inset-4 bg-red-500/10 rounded-3xl blur-3xl"></div>
                    <div
                      className="relative glass-card p-8 backdrop-blur-sm bg-white/10 border border-white/20
                      transition-all duration-300 hover:bg-[#BF3131]/20 hover:scale-105 hover:shadow-lg cursor-pointer"
                    >
                      <div className="text-white text-center">
                        <h3 className="text-5xl font-bold mb-2">20+</h3>
                        <p className="text-white/80">
                          {t("landing.stats.clients")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 lg:col-span-1">
                  {/* Proyectos Panel */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-white/10 rounded-3xl blur-3xl"></div>
                    <div className="absolute -inset-4 bg-red-500/10 rounded-3xl blur-3xl"></div>
                    <div
                      className="relative glass-card p-8 backdrop-blur-sm bg-white/10 border border-white/20
                      transition-all duration-300 hover:bg-[#BF3131]/20 hover:scale-105 hover:shadow-lg cursor-pointer"
                    >
                      <div className="text-white text-center">
                        <h3 className="text-5xl font-bold mb-2">20+</h3>
                        <p className="text-white/80">
                          {t("landing.stats.projects")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <ClientsSection variant="infinite" scrollSpeed="medium" />

        {/* Benefits component */}
        <Benefits />

        {/* Contact Form component */}
        <div id="contact-form">
          <ContactForm />
        </div>
      </div>
    </>
  );
};

export default Landing;
