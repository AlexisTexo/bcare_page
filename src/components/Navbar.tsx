import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.blog"), path: "/blog" },
    { name: t("nav.landing"), path: "/landing" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out isSc ${
        isScrolled
          ? "bg-white/100 backdrop-blur-md shadow-soft py-3"
          : "bg-white/100 backdrop-blur-sm py-5"
      }`}
    >
      <div className="section-container py-0">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/img/logo_navbar.webp"
              alt="Business Care Consulting"
              className="h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 hover:text-gradient ${
                  isActive(link.path) ? "text-gradient" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary">
              {t("nav.contact")}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
              className="text-foreground focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-white md:hidden transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "60px", backgroundColor: "white" }}
      >
        <div className="flex flex-col space-y-6 p-6 pt-10 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg font-medium transition-colors duration-200 hover:text-gradient ${
                isActive(link.path) ? "text-gradient" : "text-foreground"
              }`}
              onClick={closeMobileMenu}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn-primary text-center mt-6"
            onClick={closeMobileMenu}
          >
            {t("nav.contact")}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
