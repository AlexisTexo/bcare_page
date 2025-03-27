import React, { useEffect } from "react";
import { Lightbulb, Code, BrainCircuit } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: <Lightbulb className="h-12 w-12 text-purple" />,
      title: t("services.strategic"),
      description: t("services.strategic.desc"),
      features: [
        t("services.business"),
        t("services.planning"),
        t("services.growth"),
        t("services.operational"),
      ],
      image:
        "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Equipo de consultores estratégicos en reunión",
    },
    {
      icon: <Code className="h-12 w-12 text-purple" />,
      title: t("services.software"),
      description: t("services.software.desc"),
      features: [
        t("services.custom"),
        t("services.enterprise"),
        t("services.legacy"),
        t("services.api"),
      ],
      image:
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Desarrolladores de software trabajando en código",
    },
    {
      icon: <BrainCircuit className="h-12 w-12 text-purple" />,
      title: t("services.ai"),
      description: t("services.ai.desc"),
      features: [
        t("services.predictive"),
        t("services.automation"),
        t("services.machine"),
        t("services.ai.strategy"),
      ],
      image:
        "https://images.pexels.com/photos/270366/pexels-photo-270366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Especialistas en inteligencia artificial analizando datos",
    },
  ];

  useEffect(() => {
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

    window.addEventListener("scroll", animateOnScroll);
    // Trigger once on load
    animateOnScroll();

    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  return (
    <section
      id="services"
      className="py-0 bg-gradient-to-b from-purple-50 to-white"
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-purple font-semibold mb-2 animate-on-scroll">
            {t("services.expertise")}
          </p>
          <h2 className="section-title animate-on-scroll">
            {t("services.specialized")}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 animate-on-scroll">
            {t("services.leveraging")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-card overflow-hidden flex flex-col h-full card-hover animate-on-scroll shadow-lg rounded-xl"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 p-2 bg-white/90 rounded-full shadow-md">
                  {service.icon}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div className="mt-auto">
                  <p className="font-medium mb-3 text-gray-800">
                    {t("services.features")}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple mr-2"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
