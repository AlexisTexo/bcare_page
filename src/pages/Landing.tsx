import React, { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Benefits from "@/components/Benefits";
import ContactForm from "@/components/ContactForm";
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

  // Clients from About.tsx
  const clients = [
    {
      name: "Client 1",
      logo: "https://i.imgur.com/kyGlgPI.png", // Logo 1
    },
    {
      name: "Client 2",
      logo: "https://i.imgur.com/PidbXY5.png", // Logo 2
    },
    {
      name: "Client 3",
      logo: "https://i.imgur.com/N8fGp0j.png", // Logo 3
    },
    {
      name: "Client 4",
      logo: "https://i.imgur.com/LbYv1He.png", // Logo 4
    },
    {
      name: "Client 5",
      logo: "https://i.imgur.com/PaaUTc9.png", // Logo 5
    },
    {
      name: "Client 6",
      logo: "https://i.imgur.com/T5cE1zp.png", // Logo 6
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero inspirado en la imagen */}
      <section className="bg-purple relative overflow-hidden min-h-[55vh] flex items-center pt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0zaDF2NGgtMXYtNHptLTUgM2g0djFoLTR2LTF6bTAgMGgxdjRoLTF2LTR6TTMwIDI0aDR2MWgtNHYtMXptMC0zaDF2NGgtMXYtNHptLTUgM2g0djFoLTR2LTF6bTAgMGgxdjRoLTF2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

        <div className="section-container relative z-10 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-on-scroll">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t("landing.hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
                {t("landing.hero.subtitle")}
              </p>
              <button
                onClick={() => {
                  document
                    .getElementById("contact-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-purple px-8 py-4 rounded-full font-semibold inline-flex items-center hover:bg-purple-50 transition-all shadow-lg cursor-pointer"
              >
                <span>{t("landing.hero.cta")}</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-on-scroll">
                <img
                  src="https://images.pexels.com/photos/925786/pexels-photo-925786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Equipo de desarrollo"
                  className="w-full h-auto object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Panel de clientes igual al de about */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-wider text-purple font-semibold mb-2 animate-on-scroll">
              {t("about.clients.title")}
            </p>
            <h2 className="section-title animate-on-scroll">
              {t("about.clients.subtitle")}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 animate-on-scroll">
              {t("about.clients.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {clients.map((client, index) => (
              <div
                key={index}
                className="glass-card p-4 flex items-center justify-center animate-on-scroll hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-20 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits component */}
      <Benefits />

      {/* Contact Form component */}
      <div id="contact-form">
        <ContactForm />
      </div>

      <Footer />
    </div>
  );
};

export default Landing;
