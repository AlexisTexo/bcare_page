import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Helmet from "@/components/SEO/Helmet";
import ClientsSection from "@/components/ClientsSection";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
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
        title="contact.title"
        description={t("contact.metaDescription")}
        keywords={t("contact.metaKeywords")}
        canonicalUrl="https://bcareconsulting.com/contact"
      />
      <div className="min-h-screen bg-white">
        <Navbar />

        {/* Hero Section */}
        <PageHero
          gradientText={t("contact.contactUs")}
          regularText={t("contact.subtitle")}
          subtitle=""
          reducedHeight={true}
          className="pt-24 pb-6 relative z-10"
        />

        {/* Contact Information Cards */}
        <section className=" bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-primary mx-auto p-3 rounded-xl inline-block mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("contact.email.title")}
                </h3>
                <p className="text-gray-600">{t("contact.email.value")}</p>
              </div>

              <div className="glass-card p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-primary mx-auto p-3 rounded-xl inline-block mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("contact.phone.title")}
                </h3>
                <p className="text-gray-600">{t("contact.phone.value")}</p>
              </div>

              <div className="glass-card p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-primary mx-auto p-3 rounded-xl inline-block mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t("contact.address.title")}
                </h3>
                <p className="text-gray-600">{t("contact.address.value")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <ClientsSection variant="infinite" />

        {/* Contact Form Section */}
        <ContactForm />
      </div>
    </>
  );
};

export default Contact;
