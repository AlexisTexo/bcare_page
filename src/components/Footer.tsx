import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Newsletter from "./Newsletter";
import { subscribeToNewsletter } from "@/lib/api";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img
                src="/img/logo.webp"
                alt="Business Care Consulting"
                className="h-10 p-1"
              />
              <span className="font-heading font-bold text-xl text-white">
                Business Care Consulting
              </span>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/businesscareit"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={30} />
              </a>
              <a
                href="https://www.instagram.com/businesscare_mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={30} />
              </a>
              <a
                href="https://www.linkedin.com/company/business-care-it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Linkedin size={30} />
              </a>
              <a
                href="https://www.youtube.com/@bcareconsulting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Youtube size={30} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link
                  to="/policy-and-privacy"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ArrowRight size={14} className="mr-2" />
                  {t("footer.privacy")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t("contact.title")}</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin size={20} className="mr-3 text-purple" />
                <span className="text-gray-400">
                  Av. P.º de la Reforma 404
                  <br />
                  Juárez, Cuauhtémoc, 06600
                  <br />
                  Ciudad de México
                </span>
              </li>
              <li className="flex">
                <Phone size={20} className="mr-3 text-purple" />
                <a
                  href="tel:+15551234567"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +52 55 1200 7050
                </a>
              </li>
              <li className="flex">
                <Mail size={20} className="mr-3 text-purple" />
                <a
                  href="mailto:info@bcareit.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@bcareit.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <Newsletter
              showTitle={true}
              compact={true}
              darkMode={true}
              className="rounded-lg"
              onSubmit={async (email) => {
                try {
                  const success = await subscribeToNewsletter(email, "brevo");
                  return success;
                } catch (error) {
                  console.error("Error al suscribirse:", error);
                  return false;
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Business Care Consulting.{" "}
              {t("footer.rights")}.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/policy-and-privacy"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {t("footer.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
