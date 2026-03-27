import React from "react";
import HeroSection from "./sales/HeroSection";
import PainPointsSection from "./sales/PainPointsSection";
import SolutionSection from "./sales/SolutionSection";
import BenefitsSection from "./sales/BenefitsSection";
import BonusesSection from "./sales/BonusesSection";
import PricingSection from "./sales/PricingSection";
import TestimonialsSection from "./sales/TestimonialsSection";
import DiscountBanner from "./sales/DiscountBanner";
import StickyBuyBar from "./sales/StickyBuyBar";
import ChatbotSupport from "./sales/ChatbotSupport";
import InlineCTA from "./sales/InlineCTA";
import PlatformLogos from "./sales/PlatformLogos";
import MobileTestimonials from "./sales/_MobileTestimonials";
import RecentPurchases from "./sales/RecentPurchases";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 rounded-full bg-blue-600/20 blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-[20%] right-[15%] w-80 h-80 rounded-full bg-indigo-600/20 blur-[100px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-[40%] right-[30%] w-64 h-64 rounded-full bg-purple-600/20 blur-[100px] animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>
      <DiscountBanner />
      <StickyBuyBar />
      <HeroSection />
      <PainPointsSection />
      <div className="container mx-auto px-4">
        <InlineCTA
          title="Pronto para superar esses desafios?"
          subtitle="Nosso e-book oferece soluções práticas para todos esses problemas comuns."
          ctaText="Ver a Solução"
          variant="accent"
          onClick={() => {
            const solutionSection = document.getElementById("solution");
            if (solutionSection) {
              solutionSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />
      </div>
      <div id="solution">
        <SolutionSection />
      </div>
      <BenefitsSection />
      <BonusesSection />
      <div className="container mx-auto px-4">
        <InlineCTA
          title="Gostou dos benefícios?"
          subtitle="Aproveite agora e garanta todos esses benefícios com 80% de desconto!"
          ctaText="Garantir Minha Cópia"
          variant="primary"
        />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <PlatformLogos />
      <TestimonialsSection />
      <MobileTestimonials />
      <footer className="bg-gray-900 text-gray-400 py-12 text-center text-sm border-t border-gray-800">
        <div className="container mx-auto px-4">
          <p className="mb-4">
            © {new Date().getFullYear()} Do Zero ao Primeiro Emprego em
            Programação. Todos os direitos reservados.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Termos de Serviço
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Fale Conosco
            </a>
          </div>
        </div>
      </footer>
      <ChatbotSupport />
      <RecentPurchases />
    </div>
  );
};

export default Home;
