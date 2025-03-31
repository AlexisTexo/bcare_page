import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Client {
  name: string;
  logo: string;
}

interface ClientsSectionProps {
  className?: string;
  showTitle?: boolean;
  variant?: "default" | "infinite";
  customClients?: Client[]; // Optional prop for custom clients
}

const defaultClients: Client[] = [
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
  {
    name: "Client 7",
    logo: "https://i.imgur.com/DQ0X7WY.png", // Logo 7
  },
];

const ClientsSection = ({
  className = "",
  showTitle = true,
  variant = "default",
  customClients,
}: ClientsSectionProps) => {
  const { t } = useLanguage();

  // Use custom clients if provided, otherwise use default clients
  const clients = customClients || defaultClients;

  // Duplicate clients for infinite scroll effect if needed
  const duplicatedClients =
    variant === "infinite" ? [...clients, ...clients] : clients;

  return (
    <section
      className={`py-10 bg-gradient-to-b from-white to-white overflow-hidden ${className}`}
    >
      <div className="section-container">
        {showTitle && (
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-wider text-purple font-semibold mb-2 opacity-0 translate-y-4 animate-on-scroll">
              {t("about.clients.title")}
            </p>
            <h2 className="section-title opacity-0 translate-y-4 animate-on-scroll">
              {t("about.clients.subtitle")}
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 opacity-0 translate-y-4 animate-on-scroll">
              {t("about.clients.description")}
            </p>
          </div>
        )}

        <div className="relative w-full overflow-hidden opacity-0 translate-y-4 animate-on-scroll">
          {/* Gradient overlays with increased width and opacity - only on desktop */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-white via-white to-transparent z-10"></div>
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-white via-white to-transparent z-10"></div>

          {/* Container with padding to prevent logos from touching edges */}
          <div className="px-12 lg:px-0">
            {/* Grid for mobile, infinite scroll for desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:hidden">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="glass-card p-6 flex items-center justify-center hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Infinite scroll only on desktop */}
            {variant === "infinite" && (
              <div className="hidden lg:flex space-x-8 animate-scroll">
                {duplicatedClients.map((client, index) => (
                  <div
                    key={index}
                    className="glass-card p-8 flex items-center justify-center flex-shrink-0 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 mb-4 mt-4"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-16 w-auto object-contain"
                    />
                  </div>
                ))}
                {/* Duplicate again for seamless loop */}
                {duplicatedClients.map((client, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="glass-card p-6 flex items-center justify-center flex-shrink-0 hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-16 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Default grid for desktop when not infinite */}
            {variant === "default" && (
              <div className="hidden lg:grid grid-cols-6 gap-6">
                {clients.map((client, index) => (
                  <div
                    key={index}
                    className="glass-card p-10 flex items-center justify-center hover:shadow-lg transition-all duration-500 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-60 w-auto"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
