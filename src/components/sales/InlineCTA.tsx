import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface InlineCTAProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent";
}

const InlineCTA: React.FC<InlineCTAProps> = ({
  title = "Não perca esta oportunidade!",
  subtitle = "Transforme sua carreira em programação com este guia completo.",
  ctaText = "Comprar Agora",
  onClick = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  },
  variant = "primary",
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-900 border-2 border-blue-800 shadow-lg";
      case "accent":
        return "bg-gray-900 border-2 border-blue-800 shadow-lg";
      case "primary":
      default:
        return "bg-gray-900 border-2 border-blue-800 shadow-lg";
    }
  };

  const getButtonStyles = () => {
    switch (variant) {
      case "secondary":
        return "bg-blue-600 hover:bg-blue-700 border border-blue-500";
      case "accent":
        return "bg-blue-600 hover:bg-blue-700 text-white border border-blue-500";
      case "primary":
      default:
        return "bg-blue-600 hover:bg-blue-700 border border-blue-500";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-lg p-6 my-8 ${getVariantStyles()} relative overflow-hidden`}
    ><div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[50%] left-[20%] w-40 h-40 rounded-full bg-blue-600/20 blur-[50px] animate-pulse"></div>
        <div
          className="absolute top-[30%] right-[20%] w-40 h-40 rounded-full bg-indigo-600/20 blur-[50px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg md:text-xl font-extrabold mb-2 text-white">
            {title}
          </h3>
          <p className="text-sm md:text-base text-gray-400">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center text-sm text-gray-400">
            <Clock className="h-4 w-4 mr-1 text-red-500" />
            <span>Oferta por tempo limitado</span>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onClick}
              className={`${getButtonStyles()} text-white font-medium py-2 px-4 rounded-lg transition-all duration-300`}
            >
              {ctaText} <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default InlineCTA;
