import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Helmet from "@/components/SEO/Helmet";
import ClientsSection from "@/components/ClientsSection";
import { Users, Award, Target, Clock, Star, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        title="about.title"
        description={t("about.metaDescription")}
        keywords={t("about.metaKeywords")}
        canonicalUrl="https://bcareconsulting.com/about"
      />
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero mejorado con estilos más atractivos */}
        <div className="relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue/5 blur-3xl"></div>
            <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-purple/5 blur-3xl"></div>
            <div className="absolute top-1/4 right-[15%] w-12 h-12 rounded-full bg-gradient-purple opacity-20 float-slow"></div>
            <div className="absolute bottom-1/4 left-[20%] w-16 h-16 rounded-full bg-gradient-primary opacity-15 float-fast"></div>
          </div>

          <PageHero
            gradientText={t("about.aboutUs")}
            regularText=""
            subtitle=""
            className="text-center relative z-10 pt-24 pb-6"
          />
        </div>

        {/* Nuestra Misión y Visión con la imagen */}
        <section className="py-10 bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contenedor de la información a la izquierda (Misión y Visión) */}
              <div className="space-y-6">
                {/* Nuestra Misión */}
                <div
                  className="glass-card p-8 border-l-4 border-purple transition-all duration-500 hover:shadow-xl animate-on-scroll hover:-translate-y-1 mission-panel pulsing-border hover-lift"
                  style={{
                    boxShadow:
                      "0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.05)",
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-primary p-3 rounded-xl mr-4">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {t("about.mission.title")}
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {t("about.mission.description")}
                  </p>
                  <p className="text-gray-600">
                    {t("about.mission.description2")}
                  </p>
                </div>

                {/* Nuestra Visión */}
                <div
                  className="glass-card p-8 border-l-4 border-purple transition-all duration-500 hover:shadow-xl animate-on-scroll hover:-translate-y-1 vision-panel pulsing-border hover-lift"
                  style={{
                    animationDelay: "150ms",
                    boxShadow:
                      "0 10px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.05)",
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-primary p-3 rounded-xl mr-4">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {t("about.vision.title")}
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {t("about.vision.description")}
                  </p>
                  <p className="text-gray-600">
                    {t("about.vision.description2")}
                  </p>
                </div>
              </div>

              {/* Imagen a la derecha con efecto de animación */}
              <div
                className="relative h-full min-h-[400px] rounded-2xl overflow-hidden animate-on-scroll image-panel"
                style={{
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
                  animationDelay: "300ms",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Business Team Working"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 to-transparent flex items-center">
                  <div className="px-8 py-6 max-w-lg">
                    <h2
                      className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg animate-on-scroll"
                      style={{ animationDelay: "400ms" }}
                    >
                      {t("about.businessEase")}
                    </h2>
                    <p
                      className="text-white text-lg md:text-xl drop-shadow-md animate-on-scroll"
                      style={{ animationDelay: "500ms" }}
                    >
                      {t("about.mission")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <ClientsSection variant="infinite" />

        {/* Values */}
        <section className="py-0 bg-white">
          <div className="section-container">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-wider text-purple font-semibold mb-2 animate-on-scroll">
                {t("about.values.title")}
              </p>
              <h2 className="section-title animate-on-scroll">
                {t("about.values.subtitle")}
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600 animate-on-scroll">
                {t("about.values.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="glass-card p-6 text-center animate-on-scroll hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-primary mx-auto p-3 rounded-xl inline-block mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("about.values.excellence.title")}
                </h3>
                <p className="text-gray-600">
                  {t("about.values.excellence.description")}
                </p>
              </div>

              <div
                className="glass-card p-6 text-center animate-on-scroll hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: "100ms" }}
              >
                <div className="bg-gradient-primary mx-auto p-3 rounded-xl inline-block mb-4">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("about.values.innovation.title")}
                </h3>
                <p className="text-gray-600">
                  {t("about.values.innovation.description")}
                </p>
              </div>

              <div
                className="glass-card p-6 text-center animate-on-scroll hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: "200ms" }}
              >
                <div className="bg-gradient-primary mx-auto p-3 rounded-xl inline-block mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("about.values.collaboration.title")}
                </h3>
                <p className="text-gray-600">
                  {t("about.values.collaboration.description")}
                </p>
              </div>

              <div
                className="glass-card p-6 text-center animate-on-scroll hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: "300ms" }}
              >
                <div className="bg-gradient-primary mx-auto p-3 rounded-xl inline-block mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("about.values.integrity.title")}
                </h3>
                <p className="text-gray-600">
                  {t("about.values.integrity.description")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
