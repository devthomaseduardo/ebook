import React, { useState, useEffect } from "react";
import { Shield, CreditCard, Lock, Gift, Clock, Check } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import PaymentOptions from "./PaymentOptions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  features: string[];
  recommended?: boolean;
}

interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  productImage?: string;
  securityFeatures?: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
  plans?: PricingPlan[];
  defaultPlan?: string;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  title = "Investimento único e acessível",
  subtitle = "Transforme sua carreira com um investimento mínimo que trará retornos exponenciais",
  ctaText = "Comprar agora",
  productImage = "/public/home-capa.png",
  securityFeatures = [
    { icon: <Shield className="h-5 w-5" />, text: "Pagamento 100% seguro" },
    { icon: <CreditCard className="h-5 w-5" />, text: "Aceitamos todos os cartões" },
    { icon: <Lock className="h-5 w-5" />, text: "Seus dados estão protegidos" },
    { icon: <Gift className="h-5 w-5" />, text: "Garantia de satisfação de 7 dias" },
  ],
  plans = [
    {
      id: "basic",
      name: "E-book Básico",
      price: "R$9,90",
      originalPrice: "R$49,90",
      discount: "80%",
      features: [
        "Acesso imediato ao conteúdo completo",
        "Atualizações gratuitas para sempre",
        "Suporte por email por 30 dias",
        "Guia de início rápido"
      ]
    },
    {
      id: "premium",
      name: "E-book + Bônus Exclusivos",
      price: "R$17,90",
      originalPrice: "R$89,90",
      discount: "80%",
      features: [
        "Acesso imediato ao conteúdo completo",
        "Atualizações gratuitas para sempre",
        "Suporte por email por 30 dias",
        "Todos os bônus exclusivos incluídos",
        "Acesso ao grupo de suporte no Telegram",
        "Templates exclusivos"
      ],
      recommended: true
    },
    {
      id: "vip",
      name: "E-book VIP",
      price: "R$27,90",
      originalPrice: "R$139,90",
      discount: "80%",
      features: [
        "Acesso imediato ao conteúdo completo",
        "Atualizações gratuitas para sempre",
        "Suporte por email por 90 dias",
        "Todos os bônus exclusivos incluídos",
        "Acesso ao grupo de suporte no Telegram",
        "Templates exclusivos",
        "Sessão de consultoria de 30 minutos",
        "Materiais adicionais avançados"
      ]
    }
  ],
  defaultPlan = "premium"
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>(defaultPlan);
  const [timeLeft, setTimeLeft] = useState<number>(3600);
  
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);
  
  const formatTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentPlan = plans.find(plan => plan.id === selectedPlan) || plans[0];
  
  return (
    <section className="w-full py-24 px-6 md:px-10 bg-black relative overflow-hidden"><div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[5%] w-[30rem] h-[30rem] rounded-full bg-blue-600/15 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[28rem] h-[28rem] rounded-full bg-indigo-600/15 blur-[120px] animate-pulse" style={{ animationDelay: "2.5s" }}></div>
        <div className="absolute top-[40%] right-[25%] w-[25rem] h-[25rem] rounded-full bg-purple-600/15 blur-[120px] animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge className="mb-5 bg-blue-600/20 text-blue-400 font-semibold px-5 py-1.5 text-sm border border-blue-500/20 rounded-full">
            <Clock className="mr-1.5 h-3.5 w-3.5" /> Oferta expira em: {formatTime()}
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-7 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="mt-16 mb-12">
          <Tabs defaultValue={defaultPlan} className="w-full max-w-4xl mx-auto" onValueChange={setSelectedPlan}>
          <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-20 bg-gray-900/50 border-gray-800/0  justify-center">
  {plans.map(plan => (
    <TabsTrigger
      key={plan.id}
      value={plan.id}
      className={`relative rounded-lg py-2 text-sm md:text-base font-medium transition-all transform hover:scale-105 duration-300 ease-in-out ${plan.recommended ? 'bg-gradient-to-br mt-4.5 from-blue-600 to-blue-700 text-white' : 'bg-gray-800 text-gray-300'} hover:bg-gray-700 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-600 data-[state=active]:to-blue-700`}
    >
      {plan.name}
      {plan.recommended && (
        <span className="absolute -top-4.5 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-xs text-white shadow-lg">
          ✓
        </span>
      )}
    </TabsTrigger>
  ))}
</TabsList>


            {plans.map(plan => (
              <TabsContent key={plan.id} value={plan.id} className="mt-0">
                <div className="relative">
                  <Card
                    className={`bg-gray-900/90 backdrop-blur-lg border-2 ${plan.recommended ? 'border-blue-600/70' : 'border-gray-800/70'} relative overflow-hidden mt-3  rounded-2xl transition-all duration-300 hover:shadow-xl`}
                    style={{
                      filter: plan.recommended ? "drop-shadow(0 20px 25px rgba(59, 130, 246, 0.2))" : "none",
                    }}
                  >
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500 opacity-10 rounded-full blur-3xl"></div>

                    <div className="flex flex-col lg:flex-row lg:items-center">
                      <div className="flex-1">
                        <CardHeader className="pb-3 pt-8">
                          {plan.recommended && (
                            <Badge className="mb-3 w-fit bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-4 py-1.5 text-sm border-0 shadow-lg rounded-full">
                              Mais Popular
                            </Badge>
                          )}
                          <CardTitle className="text-3xl font-extrabold text-white">{plan.name}</CardTitle>
                          <CardDescription className="text-gray-400 text-base mt-2">
                            Tudo que você precisa para iniciar sua jornada
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-5">
                          <div className="flex items-baseline gap-3 mb-10">
                            <span className="text-sm line-through text-gray-500 font-medium">
                              {plan.originalPrice}
                            </span>
                            <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                              {plan.price}
                            </span>
                            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 font-bold px-3.5 py-1.5 text-sm shadow-lg rounded-full">
                              {plan.discount} OFF
                            </Badge>
                          </div>

                          <div className="space-y-5 mb-10">
                            {plan.features.map((feature, index) => (
                              <div key={index} className="flex items-start gap-3.5">
                                <div className="mt-0.5 h-6 w-6 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 shadow-md flex-shrink-0">
                                  <Check className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-gray-300 font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </div>

                      <div className="lg:w-1/3 px-8 py-6 flex justify-center">
                        <div className="w-full max-w-[280px] h-auto relative">
                          <img
                            src={productImage}
                            alt="E-book"
                            className="w-full h-auto object-contain rounded-xl transition-all duration-700 hover:scale-105 shadow-2xl"
                            style={{
                              filter: "drop-shadow(0 25px 25px rgba(59, 130, 246, 0.3))",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <CardFooter className="flex-col gap-6 pb-10 pt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className={`w-full py-9 text-xl font-extrabold shadow-2xl rounded-xl transition-all duration-300 ${plan.recommended ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-blue-700/30 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'} transform hover:-translate-y-1`}
                            size="lg"
                          >
                            {ctaText}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="p-0 max-w-md border-0 overflow-hidden bg-gray-900 rounded-xl">
                          <PaymentOptions
                            plan={plan}
                            onPaymentComplete={() =>
                              alert("Pagamento processado com sucesso! Seu e-book será enviado para seu email.")
                            }
                          />
                        </DialogContent>
                      </Dialog>

                      <div className="flex flex-wrap justify-center gap-5 w-full mt-3">
                        {securityFeatures.map((feature, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300 transition-colors cursor-help">
                                  {feature.icon}
                                  <span>{feature.text}</span>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-800 border-gray-700">
                                <p>Sua compra é 100% segura e protegida</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div><div className="mt-16 text-center text-gray-400 text-sm">
          <p className="font-medium">Mais de 10.000 clientes satisfeitos • Avaliação média de 4.9/5</p>
        </div>
      </div><div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="max-w-md w-full py-5 text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-xl flex items-center justify-center gap-9  mx-auto">
              Comprar Agora - {currentPlan.price} <span className="ml-1">→</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="p-9 max-w-md border-0 overflow-hidden bg-gray-900 rounded-xl">
            <PaymentOptions
              plan={currentPlan}
              onPaymentComplete={() =>
                alert("Pagamento processado com sucesso! Seu e-book será enviado para seu email.")
              }
            />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PricingSection;
