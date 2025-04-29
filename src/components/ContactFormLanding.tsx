import React from "react";
import { Calendar, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { useForm, ValidationError } from "@formspree/react";

const ContactForm = () => {
  const { t } = useLanguage();
  const [state, handleSubmit] = useForm("xldjlqgv");

  // Comprobar si el formulario se ha enviado correctamente
  React.useEffect(() => {
    if (state.succeeded) {
      toast.success(t("contact.submit"));
    }
  }, [state.succeeded, t]);

  const openCalendar = () => {
    // In a real implementation, this would open a calendar booking system
    window.open("https://calendar.app.google/nCwJzEzn3RfuXEABA", "_blank");
    toast.info(t("contact.appointment"));
  };

  return (
    <section id="contact" className=" bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-[#BF3131] font-semibold mb-2 animate-on-scroll">
            {t("contact.getInTouch")}
          </p>
          <h2 className="section-title animate-on-scroll">
            {t("contact.simplify")}{" "}
            <span className="text-black">{t("contact.business")}</span>{" "}
            {t("contact.and")}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 animate-on-scroll">
            {t("contact.help")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="glass-card p-8 animate-on-scroll">
            <h3 className="text-2xl font-semibold mb-6">
              {t("contact.message")}
            </h3>

            {state.succeeded ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center">
                <h4 className="text-xl font-semibold mb-2">
                  {t("contact.thanks")}
                </h4>
                <p className="text-green-600">{t("contact.submitted")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("contact.firstName")}</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Juan"
                      required
                      className="w-full p-3 rounded-lg border border-gray-200 focus:border-[#7D0A0A] focus:ring focus:ring-[#7D0A0A]/20 transition-all"
                    />
                    <ValidationError
                      prefix="First Name"
                      field="firstName"
                      errors={state.errors}
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("contact.lastName")}</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Perez"
                      required
                      className="w-full p-3 rounded-lg border border-gray-200 focus:border-[#7D0A0A] focus:ring focus:ring-[#7D0A0A]/20 transition-all"
                    />
                    <ValidationError
                      prefix="Last Name"
                      field="lastName"
                      errors={state.errors}
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("contact.email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juan.perez@example.com"
                    required
                    className="w-full p-3 rounded-lg border border-gray-200 focus:border-[#7D0A0A] focus:ring focus:ring-[#7D0A0A]/20 transition-all"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{t("contact.phone")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(55) 123-4567"
                    className="w-full p-3 rounded-lg border border-gray-200 focus:border-[#7D0A0A] focus:ring focus:ring-[#7D0A0A]/20 transition-all"
                  />
                  <ValidationError
                    prefix="Phone"
                    field="phone"
                    errors={state.errors}
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">{t("contact.howHelp")}</Label>
                  <Textarea
                    id="requirements"
                    name="requirements"
                    placeholder={t("contact.placeholder")}
                    required
                    className="w-full p-3 rounded-lg min-h-[120px] border border-gray-200 focus:border-[#7D0A0A] focus:ring focus:ring-[#7D0A0A]/20 transition-all"
                  />
                  <ValidationError
                    prefix="Requirements"
                    field="requirements"
                    errors={state.errors}
                    className="text-sm text-red-500"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-gradient-to-br from-[#BE3144] to-[#BF3131] text-white font-medium px-6 py-6 rounded-lg shadow-sm 
                  hover:shadow-md transition-all duration-300 ease-in-out flex items-center justify-center"
                >
                  {state.submitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("contact.sending")}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      {t("contact.send")}
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div className="glass-card p-8 animate-on-scroll">
              <h3 className="text-2xl font-semibold mb-6">
                {t("contact.schedule")}
              </h3>
              <p className="text-gray-600 mb-6">{t("contact.prefer")}</p>
              <Button
                type="button"
                onClick={openCalendar}
                className="w-full bg-[#BF3131] hover:bg-[#7D0A0A] text-white hover:text-white font-medium px-6 py-6 rounded-lg shadow-sm 
                hover:shadow-md transition-all duration-300 ease-in-out flex items-center justify-center"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {t("contact.appointment")}
              </Button>
            </div>

            <div className="glass-card p-8 animate-on-scroll">
              <h3 className="text-2xl font-semibold mb-6">
                {t("contact.information")}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-800">
                    {t("contact.email")}
                  </p>
                  <a
                    href="mailto:contact@businessease.com"
                    className="text-[#7D0A0A] hover:underline"
                  >
                    alexis.tellez@bcareit.com
                  </a>
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {t("contact.phone")}
                  </p>
                  <a
                    href="tel:+15551234567"
                    className="text-[#7D0A0A] hover:underline"
                  >
                    +52 55 1200 7050
                  </a>
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {t("contact.office")}
                  </p>
                  <address className="not-italic text-gray-600">
                    Av. P.º de la Reforma 404
                    <br />
                    Juárez, Cuauhtémoc, 06600
                    <br />
                    Ciudad de México
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
