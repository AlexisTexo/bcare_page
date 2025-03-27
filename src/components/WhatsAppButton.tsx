import React from "react";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhatsAppButton: React.FC = () => {
  const { t } = useLanguage();
  const phoneNumber = "5215512007050"; // Formato internacional para México: 521 + número sin el primer 0
  const message = encodeURIComponent(t("whatsapp.message")); // Usar mensaje traducido

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center relative whatsapp-button group"
        aria-label={t("whatsapp.contactUs")}
      >
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-white text-gray-900 px-3 py-1 rounded-lg shadow-lg text-sm">
          {t("whatsapp.contactUs")}
          <div className="absolute -bottom-1 right-5 w-2 h-2 bg-white transform rotate-45"></div>
        </div>

        {/* Ondas de pulso */}
        <div className="absolute inset-0 bg-green-500 rounded-full pulse-ring"></div>
        <div className="absolute inset-0 bg-green-500 rounded-full pulse-ring delay-1"></div>
        <div className="absolute inset-0 bg-green-500 rounded-full pulse-ring delay-2"></div>

        {/* Botón principal */}
        <div className="bg-green-500 text-white p-4 rounded-full shadow-lg relative z-10 hover:bg-green-600 transition-all">
          <MessageCircle size={24} />
        </div>
      </a>
    </div>
  );
};

export default WhatsAppButton;
