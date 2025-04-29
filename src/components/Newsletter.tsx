import React, { useEffect, useState, useId } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Extender la interfaz Window para incluir las propiedades de Brevo
declare global {
  interface Window {
    REQUIRED_CODE_ERROR_MESSAGE?: string;
    LOCALE?: string;
    EMAIL_INVALID_MESSAGE?: string;
    SMS_INVALID_MESSAGE?: string;
    REQUIRED_ERROR_MESSAGE?: string;
    GENERIC_INVALID_MESSAGE?: string;
    translation?: {
      common: {
        selectedList: string;
        selectedLists: string;
        selectedOption: string;
        selectedOptions: string;
      };
    };
    AUTOHIDE?: boolean;
  }
}

interface NewsletterProps {
  className?: string;
  showTitle?: boolean;
  compact?: boolean;
  onSubmit?: (email: string) => Promise<boolean>;
  darkMode?: boolean;
}

// Añadir traducciones personalizadas para el boletín
const newsletterTitles = {
  es: "Boletín Informativo",
  en: "Newsletter",
};

const newsletterDescriptions = {
  es: "Suscríbete para recibir las últimas noticias y artículos en tu bandeja de entrada",
  en: "Subscribe to receive the latest news and articles in your inbox",
};

const Newsletter: React.FC<NewsletterProps> = ({
  className = "",
  showTitle = true,
  compact = false,
  onSubmit,
  darkMode = false,
}) => {
  const { t } = useLanguage();
  // Obtener el locale actual de otra manera
  const currentLocale = document.documentElement.lang || "es";

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const uniqueId = useId().replace(/:/g, "");

  // Generar IDs únicos para cada instancia del formulario
  const formId = `sib-form-${uniqueId}`;
  const containerId = `sib-container-${uniqueId}`;
  const errorMessageId = `error-message-${uniqueId}`;
  const successMessageId = `success-message-${uniqueId}`;

  useEffect(() => {
    // Para evitar que el script se cargue varias veces
    if (
      document.querySelector(
        'script[src="https://sibforms.com/forms/end-form/build/main.js"]'
      )
    ) {
      return;
    }

    // Cargar los scripts de Brevo
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://sibforms.com/forms/end-form/build/main.js";
    document.body.appendChild(script);

    // Configuración necesaria para Brevo
    window.REQUIRED_CODE_ERROR_MESSAGE = "Elija un código de país";
    window.LOCALE = "es";
    window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
      "La información que ha proporcionado no es válida. Compruebe el formato del campo e inténtelo de nuevo.";
    window.REQUIRED_ERROR_MESSAGE = "Este campo no puede quedarse vacío. ";
    window.GENERIC_INVALID_MESSAGE =
      "La información que ha proporcionado no es válida. Compruebe el formato del campo e inténtelo de nuevo.";
    window.translation = {
      common: {
        selectedList: "{quantity} lista seleccionada",
        selectedLists: "{quantity} listas seleccionadas",
        selectedOption: "{quantity} seleccionado",
        selectedOptions: "{quantity} seleccionados",
      },
    };
    window.AUTOHIDE = Boolean(0);

    return () => {
      // No eliminamos el script para evitar problemas con múltiples instancias
    };
  }, []);

  // URL del formulario de Brevo
  const brevoFormAction =
    "https://sibforms.com/serve/MUIFAG5NnAkOAeE7hFNmf48QgrmymHnrtvSXP5VfamgJqfjOqgcCiSu8HclhfV7ZkfAPNb6FpBQsDcXIB_d6PFQgF6h906KuOjqUVj-xdYCirsGozgpbiWRQdehqpoMfbeSYdVnbeyRwKqwz_sbQm_jljHBl_0fJhYaxJErnHi85UOt-H384WsDn-iX1zyJEg0JCoeBavJ1-zFYG";

  const handleSubmit = async (e: React.FormEvent) => {
    if (!onSubmit) return; // Si no hay onSubmit, dejamos que el formulario siga el flujo normal de Brevo

    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const success = await onSubmit(email);
      setIsSuccess(success);
    } catch (err) {
      setError("Hay un error. Por favor, inténtelo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Estilos personalizados para el formulario
  const containerBackground = darkMode ? "rgba(55, 65, 81, 1)" : "#ffffff";
  const textColor = darkMode ? "#ffffff" : "#000000";
  const inputBackground = darkMode
    ? "rgba(75, 85, 99, 1)"
    : "rgba(255, 255, 255, 1)";
  const inputBorder = darkMode ? "rgba(75, 85, 99, 1)" : "#C0CCD9";
  const buttonBackground = darkMode ? "#9333ea" : "#3E4857";

  // Si se está usando onSubmit personalizado, usar un formulario personalizado
  if (onSubmit) {
    return (
      <div className={`${className}`}>
        {isSuccess ? (
          <div className="text-center py-4 text-black bg-green-50 dark:bg-green-900 rounded-lg">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-200">
              {t("contact.thanks")}
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              {t("blog.subscriptionConfirmation")}
            </p>
          </div>
        ) : (
          <div
            style={{
              textAlign: "left",
              backgroundColor: containerBackground,
              width: "100%",
              maxWidth: compact ? "100%" : "540px",
              borderRadius: "8px",
              borderWidth: "0",
              direction: "ltr",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
              padding: "1.5rem",
            }}
            className="p-4"
          >
            {/* Título y descripción */}
            <div className="mb-5">
              <h3
                className="text-xl font-semibold flex items-center"
                style={{ color: textColor }}
              >
                <Mail className="h-5 w-5 mr-2 text-purple" />
                {newsletterTitles[
                  currentLocale as keyof typeof newsletterTitles
                ] || t("blog.newsletter")}
              </h3>
              <p
                className={
                  darkMode
                    ? "text-white mt-1 text-sm"
                    : "text-black mt-1 text-sm"
                }
              >
                {newsletterDescriptions[
                  currentLocale as keyof typeof newsletterDescriptions
                ] || t("blog.newsletterDescription")}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Campo de email */}
              <div className="mb-5">
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: textColor }}
                  htmlFor={`email-${uniqueId}`}
                >
                  Tu correo electrónico
                </label>
                <input
                  id={`email-${uniqueId}`}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  required
                  className="w-full"
                  style={{
                    backgroundColor: darkMode
                      ? "rgba(75, 85, 99, 0.8)"
                      : "#FFFFFF",
                    color: textColor,
                    border: "0",
                    borderRadius: "6px",
                    padding: "0.75rem 1rem",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  }}
                />
                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
              </div>

              {/* Botón de suscripción */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full hover:bg-opacity-90 transition-all duration-200"
                style={{
                  fontSize: "16px",
                  textAlign: "center",
                  fontWeight: "600",
                  color: "#FFFFFF",
                  backgroundColor: "#9333ea",
                  borderRadius: "6px",
                  borderWidth: "0px",
                  padding: "0.75rem 1rem",
                  cursor: isSubmitting ? "default" : "pointer",
                  marginTop: "1rem",
                }}
              >
                {isSubmitting ? (
                  <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : null}
                Suscribirse
              </button>

              <div
                className="text-xs text-center mt-4"
                style={{ color: darkMode ? "#ffffff" : "#6B7280" }}
              >
                Respetamos tu privacidad. Puedes darte de baja en cualquier
                momento.
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // Formulario original de Brevo (solo para instancias sin onSubmit personalizado)
  return (
    <div className={`${className}`}>
      {/* Si hay título externo y no estamos en modo compacto */}
      {showTitle && !compact && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            <Mail className="h-5 w-5 mr-2 text-purple" />
            {newsletterTitles[currentLocale as keyof typeof newsletterTitles] ||
              t("blog.newsletter")}
          </h3>
          <p className="text-whtie text-sm dark:text-gray-300">
            {newsletterDescriptions[
              currentLocale as keyof typeof newsletterDescriptions
            ] || t("blog.newsletterDescription")}
          </p>
        </div>
      )}

      <div className={`sib-form`}>
        <div id="sib-form-container" className="sib-form-container">
          {/* Mensajes de error y éxito */}
          <div
            id={errorMessageId}
            className="sib-form-message-panel hidden"
            style={{
              fontSize: "16px",
              textAlign: "left",
              color: "#661d1d",
              backgroundColor: "#ffeded",
              borderRadius: "3px",
              borderColor: "#ff4949",
              maxWidth: compact ? "100%" : "540px",
            }}
          >
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <svg
                viewBox="0 0 512 512"
                className="sib-icon sib-notification__icon"
              >
                <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
              </svg>
              <span className="sib-form-message-panel__inner-text">
                Hay un error. Por favor, inténtelo más tarde.
              </span>
            </div>
          </div>

          <div
            id={successMessageId}
            className="sib-form-message-panel hidden"
            style={{
              fontSize: "16px",
              textAlign: "left",
              color: "#085229",
              backgroundColor: "#e7faf0",
              borderRadius: "3px",
              borderColor: "#13ce66",
              maxWidth: compact ? "100%" : "540px",
            }}
          >
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <svg
                viewBox="0 0 512 512"
                className="sib-icon sib-notification__icon"
              >
                <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248C504 119.083 392.957 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
              </svg>
              <span className="sib-form-message-panel__inner-text">
                ¡Bienvenido a nuestro Newsletter!
              </span>
            </div>
          </div>

          <div
            id={containerId}
            className="sib-container--large sib-container--vertical"
            style={{
              textAlign: "center",
              backgroundColor: containerBackground,
              width: "100%",
              maxWidth: compact ? "100%" : "540px",
              borderRadius: "8px",
              borderWidth: "1px",
              borderColor: inputBorder,
              borderStyle: "solid",
              direction: "ltr",
              boxShadow: darkMode ? "0 4px 6px rgba(0, 0, 0, 0.2)" : "none",
            }}
          >
            <form
              id={formId}
              method="POST"
              action={brevoFormAction}
              data-type="subscription"
            >
              {/* Título y descripción */}
              {showTitle && compact && (
                <>
                  <div style={{ padding: "8px 0" }}>
                    <div
                      className="sib-form-block"
                      style={{
                        fontSize: "24px",
                        textAlign: "left",
                        fontWeight: "700",
                        color: textColor,
                        backgroundColor: "transparent",
                      }}
                    >
                      <p>
                        {newsletterTitles[
                          currentLocale as keyof typeof newsletterTitles
                        ] || t("blog.newsletter")}
                      </p>
                    </div>
                  </div>
                  <div style={{ padding: "8px 0" }}>
                    <div
                      className="sib-form-block"
                      style={{
                        fontSize: "14px",
                        textAlign: "left",
                        color: darkMode ? "#cbd5e1" : "#3C4858",
                        backgroundColor: "transparent",
                      }}
                    >
                      <div className="sib-text-form-block">
                        <p>
                          {newsletterDescriptions[
                            currentLocale as keyof typeof newsletterDescriptions
                          ] || t("blog.newsletterDescription")}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Campo de email */}
              <div style={{ padding: "8px 0" }}>
                <div className="sib-input sib-form-block">
                  <div className="form__entry entry_block">
                    <div className="form__label-row">
                      <label
                        className="entry__label"
                        style={{
                          fontWeight: "700",
                          textAlign: "left",
                          fontSize: "14px",
                          color: textColor,
                        }}
                        htmlFor={`EMAIL-${uniqueId}`}
                        data-required="*"
                      >
                        {t("blog.emailPlaceholder")}
                      </label>

                      <div className="entry__field">
                        <input
                          className="input w-full"
                          type="text"
                          id={`EMAIL-${uniqueId}`}
                          name="EMAIL"
                          autoComplete="off"
                          placeholder={t("blog.emailPlaceholder")}
                          data-required="true"
                          required
                          style={{
                            backgroundColor: inputBackground,
                            color: textColor,
                            border: `1px solid ${inputBorder}`,
                            borderRadius: "6px",
                            padding: "10px",
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de suscripción */}
              <div style={{ padding: "8px 0" }}>
                <div className="sib-form-block" style={{ textAlign: "left" }}>
                  <button
                    className="sib-form-block__button sib-form-block__button-with-loader hover:bg-opacity-90"
                    style={{
                      fontSize: "16px",
                      textAlign: "center",
                      fontWeight: "700",
                      color: "#FFFFFF",
                      backgroundColor: buttonBackground,
                      borderRadius: "6px",
                      borderWidth: "0px",
                      padding: "10px 16px",
                      width: "100%",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    form={formId}
                    type="submit"
                  >
                    {t("blog.subscribe")}
                  </button>
                </div>
              </div>

              {!compact && (
                <div
                  className="text-xs text-left px-2 pb-4"
                  style={{ color: darkMode ? "#cbd5e1" : "#8390A4" }}
                >
                  {t("blog.privacyNotice")}
                </div>
              )}

              {/* Campos ocultos necesarios para Brevo */}
              <input
                type="text"
                name="email_address_check"
                value=""
                className="input--hidden"
              />
              <input type="hidden" name="locale" value="es" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
