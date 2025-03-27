import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
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

  const contactInfo = [
    {
      icon: <MapPin className="h-8 w-8 text-purple" />,
      title: t("contact.office"),
      details: [
        "Av. P.º de la Reforma 404",
        " Juárez, Cuauhtémoc, 06600",
        "Ciudad de México",
      ],
    },
    {
      icon: <Mail className="h-8 w-8 text-purple" />,
      title: t("contact.email"),
      details: ["alexis.tellez@bcareit.com"],
    },
    {
      icon: <Phone className="h-8 w-8 text-purple" />,
      title: t("contact.phone"),
      details: ["+52 55 1200 7050"],
    },
    {
      icon: <Clock className="h-8 w-8 text-purple" />,
      title: t("contact.workingHours"),
      details: [`${t("contact.monday")}: 9:00 AM - 6:00 PM`],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Use the new PageHero component */}
      <PageHero
        title={t("contact.reach")}
        gradientText={t("contact.title")}
        subtitle={t("contact.subtitle")}
      />

      {/* Contact Information */}
      <section className=" bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="glass-card p-8 text-center animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center bg-purple/10 p-4 rounded-full mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form - Moved here, directly after the contact information */}
      <ContactForm />

      {/* Map */}
      <section className="py-0 bg-gradient-to-b from-purple-50 to-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="section-title animate-on-scroll">
              {t("contact.findMap")}{" "}
              <span className="text-gradient">{t("contact.map")}</span>
            </h2>
          </div>

          <div className="glass-card overflow-hidden rounded-2xl h-[400px] animate-on-scroll">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d940.6762060521547!2d-99.17067039999999!3d19.4251556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff49786eed8b%3A0xd17dbd9f81a56827!2sEdificio%20Moncayo!5e0!3m2!1ses!2smx!4v1743022282916!5m2!1ses!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Business Ease Location"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
