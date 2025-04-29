import React from "react";
import {
  Layers,
  BarChart,
  Activity,
  RefreshCw,
  CheckCircle,
  Expand,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Benefits = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: <Layers className="h-8 w-8 text-white" />,
      title: t("benefits.tailored"),
      description: t("benefits.tailored.desc"),
    },
    {
      icon: <BarChart className="h-8 w-8 text-white" />,
      title: t("benefits.efficiency"),
      description: t("benefits.efficiency.desc"),
    },
    {
      icon: <Activity className="h-8 w-8 text-white" />,
      title: t("benefits.performance"),
      description: t("benefits.performance.desc"),
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-white" />,
      title: t("benefits.adaptability"),
      description: t("benefits.adaptability.desc"),
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-white" />,
      title: t("benefits.optimization"),
      description: t("benefits.optimization.desc"),
    },
    {
      icon: <Expand className="h-8 w-8 text-white" />,
      title: t("benefits.scalability"),
      description: t("benefits.scalability.desc"),
    },
  ];

  return (
    <section
      id="benefits"
      className="py-0 bg-gradient-to-br from-[#BF3131] to-[#E83F25] relative"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0zaDF2NGgtMXYtNHptLTUgM2g0djFoLTR2LTF6bTAgMGgxdjRoLTF2LTR6TTMwIDI0aDR2MWgtNHYtMXptMC0zaDF2NGgtMXYtNHptLTUgM2g0djFoLTR2LTF6bTAgMGgxdjRoLTF2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-white font-semibold mb-2 animate-on-scroll">
            {t("benefits.key")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white animate-on-scroll">
            {t("benefits.discover")}
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white/80 animate-on-scroll">
            {t("benefits.solutions")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300 
              hover:bg-white/20 hover:-translate-y-1 animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-br from-[#000000] to-[#000000] p-3 rounded-xl inline-block mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {benefit.title}
              </h3>
              <p className="text-white/80">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
