import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  QrCode,
  CreditCardIcon,
  CheckCircle2,
  Lock,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Wallet,
  Gift,
  Star,
  Sparkles,
  Timer,
  Zap,
  Award,
  FileText,
  Download,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  TrendingUp,
  BadgeCheck,
  Calendar,
  Shield,
} from "lucide-react";

export interface CheckoutPlan {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  discount: string;
  features: string[];
  recommended?: boolean;
}

interface PaymentOptionsProps {
  onPaymentComplete?: () => void;
  plan?: CheckoutPlan;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  onPaymentComplete = () => console.log("Payment completed"),
  plan,
}) => {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [showCouponField, setShowCouponField] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [cardType, setCardType] = useState<string | null>(null);
  const [selectedInstallment, setSelectedInstallment] = useState("1");
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(29);
  const [hours, setHours] = useState(1);

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            clearInterval(timer);
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, minutes, hours]);

  const handlePayment = () => {
    setLoading(true);
    // Simulando uma chamada de API
    setTimeout(() => {
      setLoading(false);
      onPaymentComplete();
    }, 2000);
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "dev2024") {
      setCouponApplied(true);
    } else {
      alert("Cupom inválido");
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    // Detect card type based on first digits
    if (v.startsWith("4")) {
      setCardType("visa");
    } else if (/^5[1-5]/.test(v)) {
      setCardType("mastercard");
    } else if (/^3[47]/.test(v)) {
      setCardType("amex");
    } else if (/^6(?:011|5)/.test(v)) {
      setCardType("discover");
    } else {
      setCardType(null);
    }
    
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return value;
  };

  const benefits = [
    {
      icon: <FileText size={18} />,
      title: "E-book completo",
      description: "Acesso imediato ao material digital"
    },
    {
      icon: <Download size={18} />,
      title: "Download ilimitado",
      description: "Baixe em qualquer dispositivo"
    },
    {
      icon: <BadgeCheck size={18} />,
      title: "Certificado",
      description: "Receba certificado de conclusão"
    },
    {
      icon: <Calendar size={18} />,
      title: "Atualizações gratuitas",
      description: "Receba todas as futuras versões"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-gray-950 rounded-xl overflow-hidden relative shadow-[0_0_50px_rgba(29,78,216,0.15)]"
    >
      {/* Particle backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(29,78,216,0.15),transparent_70%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(29,78,216,0.15),transparent_70%)]"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-blue-600/10 blur-3xl"></div>
      </div>

      {/* Animated Ribbon */}
      <div className="absolute -top-1 -right-1 z-10 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-1 px-8 shadow-lg transform rotate-45 translate-x-[18px] translate-y-[12px] text-center text-xs">
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            80% OFF
          </motion.div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-900 to-black p-6 text-white relative overflow-hidden border-b border-gray-800">
        <div className="flex justify-between items-center relative z-10">
          <div>
            <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
              Checkout Premium
            </h2>
            <p className="text-sm text-blue-100/70">
              Complete seu pedido de forma segura
            </p>
          </div>
          <motion.div 
            className="bg-gray-800/50 p-2.5 rounded-full backdrop-blur-sm border border-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield className="h-5 w-5 text-blue-400" />
          </motion.div>
        </div>
      </div>

      {/* Timer countdown with animated pulse */}
      <motion.div 
        className="bg-gradient-to-r from-blue-900 to-indigo-900 p-3 border-b border-blue-800/50 flex items-center justify-center gap-2 text-white relative overflow-hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMCIgZD0iTTAgMGg2MHY2MEgweiIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjkgMGEyOSAyOSAwIDEgMCA1OCAwYTI5IDI5IDAgMSAwIC01OCAwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iLjUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Timer className="h-5 w-5 text-blue-300" />
        </motion.div>
        <p className="text-sm font-semibold text-blue-50 flex items-center">
          Oferta expira em: 
          <span className="ml-2 font-mono bg-blue-950/50 px-1.5 py-0.5 rounded text-blue-300 border border-blue-800/50">
            {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </span>
        </p>
      </motion.div>

      <Tabs defaultValue="credit" className="w-full">
        <TabsList className="grid grid-cols-3 w-full p-2 bg-gray-900/50 backdrop-blur-sm">
          <TabsTrigger
            value="credit"
            className="flex items-center gap-1.5 data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-300 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span>Cartão</span>
          </TabsTrigger>
          <TabsTrigger
            value="pix"
            className="flex items-center gap-1.5 data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-300 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
          >
            <QrCode className="h-3.5 w-3.5" />
            <span>PIX</span>
          </TabsTrigger>
          <TabsTrigger
            value="stripe"
            className="flex items-center gap-1.5 data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-300 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
          >
            <Wallet className="h-3.5 w-3.5" />
            <span>Stripe</span>
          </TabsTrigger>
        </TabsList>

        <div className="p-4 bg-gradient-to-b from-gray-950 to-black">
          {/* Order summary (collapsible) */}
          <div className="mb-4 border border-gray-800 rounded-lg overflow-hidden">
            <div 
              className="flex items-center justify-between bg-gray-900/50 p-3 cursor-pointer"
              onClick={() => setShowOrderSummary(!showOrderSummary)}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-medium text-white">Resumo do pedido</h3>
              </div>
              <div className="text-gray-400">
                {showOrderSummary ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            
            <AnimatePresence>
              {showOrderSummary && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-900/30 px-4 py-3 space-y-3"
                >
                  <div className="bg-blue-950/30 rounded-lg p-3 border border-blue-900/50">
                    <h4 className="text-sm font-semibold text-blue-300 mb-2 flex items-center gap-1.5">
                      <Star className="h-3.5 w-3.5" /> E-book: Dominando o React.js
                    </h4>
                    
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-2"
                    >
                      {benefits.map((benefit, index) => (
                        <motion.div 
                          key={index} 
                          variants={itemVariants}
                          className="flex items-start gap-2"
                        >
                          <div className="text-blue-400 mt-0.5">
                            {benefit.icon}
                          </div>
                          <div>
                            <p className="text-xs font-medium text-blue-50">{benefit.title}</p>
                            <p className="text-xs text-blue-200/70">{benefit.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Subtotal:</span>
                      <span className="text-xs font-medium text-gray-300">R$49,90</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Desconto (80%):</span>
                      <span className="text-xs font-medium text-green-400">-R$40,00</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Cupom (DEV2024):</span>
                        <span className="text-xs font-medium text-green-400">-R$2,00</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-800 mt-1">
                      <span className="text-sm font-medium text-white">Total:</span>
                      <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                        {couponApplied ? "R$7,90" : "R$9,90"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <TabsContent value="credit" className="mt-0 p-0">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="p-0 pb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/10 p-1 rounded">
                      <img
                        src="https://www.mercadopago.com/favicon.ico"
                        alt="Mercado Pago"
                        className="h-5 w-5"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-300">Pagamento Seguro</span>
                  </div>
                  <div className="flex gap-2">
                    <motion.img
                      whileHover={{ y: -2 }}
                      src="/public/cartoes/logos--visaelectron.svg"
                      alt="Visa"
                      className="h-6 brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                    />
                    <motion.img
                      whileHover={{ y: -2 }}
                      src="/public/cartoes/logos--mastercard.svg"
                      alt="Master"
                      className="h-6 brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                    />

<motion.img
                      whileHover={{ y: -2 }}
                      src="/public/cartoes/logos--elo.svg"
                      alt="Elo"
                      className="h-6 brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
                
                <motion.div 
                  className="bg-blue-950/20 p-3 rounded-lg mb-4 flex items-start gap-2 border border-blue-900/50 relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(29,78,216,0.15),transparent_70%)] opacity-40"></div>
                  <Gift className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5 relative z-10" />
                  <p className="text-sm text-blue-100 relative z-10">
                    <span className="font-medium">Oferta Especial! </span>
                    Compre agora e ganhe acesso a 3 bônus exclusivos no valor de R$150.
                  </p>
                </motion.div>
              </CardHeader>
              
              <CardContent className="p-0 space-y-5">
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                      <CreditCard className="h-3.5 w-3.5 text-blue-400" />
                      Número do Cartão
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="w-full p-3 border border-gray-800 rounded-md pl-10 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-gray-900/60 text-white"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        maxLength={19}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {cardType ? (
                          <div className="w-6 h-4 flex items-center justify-center">
                            {cardType === "visa" && (
                              <img
                                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
                                alt="Visa"
                                className="h-4"
                              />
                            )}
                            {cardType === "mastercard" && (
                              <img
                                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/mastercard.png"
                                alt="Mastercard"
                                className="h-4"
                              />
                            )}
                            {cardType === "amex" && (
                              <img
                                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/amex.png"
                                alt="Amex"
                                className="h-4"
                              />
                            )}
                            {cardType === "discover" && (
                              <img
                                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/discover.png"
                                alt="Discover"
                                className="h-4"
                              />
                            )}
                          </div>
                        ) : (
                          <CreditCardIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Nome no Cartão
                    </label>
                    <input
                      type="text"
                      placeholder="Nome completo"
                      className="w-full p-3 border border-gray-800 rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-gray-900/60 text-white"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Validade
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full p-3 border border-gray-800 rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-gray-900/60 text-white"
                        value={cardExpiry}
                        onChange={(e) =>
                          setCardExpiry(formatExpiry(e.target.value))
                        }
                        maxLength={5}
                      />
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                        <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 border border-gray-800 rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-gray-900/60 text-white"
                        value={cardCvv}
                        onChange={(e) =>
                          setCardCvv(
                            e.target.value.replace(/\D/g, "").slice(0, 4),
                          )
                        }
                        maxLength={4}
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                      <RefreshCw className="h-3.5 w-3.5 text-blue-400" />
                      Parcelamento
                    </label>
                    <select
                      className="w-full p-3 border border-gray-800 rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-gray-900/60 text-white appearance-none"
                      value={selectedInstallment}
                      onChange={(e) => setSelectedInstallment(e.target.value)}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.75rem center',
                        backgroundSize: '1rem'
                      }}
                    >
                      <option value="1">1x de R${couponApplied ? "7,90" : "9,90"} (sem juros)</option>
                      <option value="2">2x de R${couponApplied ? "3,95" : "4,95"} (sem juros)</option>
                      <option value="3">3x de R${couponApplied ? "2,63" : "3,30"} (sem juros)</option>
                    </select>
                  </motion.div>

                  {/* Coupon code section */}
                  <motion.div variants={itemVariants}>
                    {!showCouponField ? (
                      <button
                        onClick={() => setShowCouponField(true)}
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1.5 font-medium"
                      >
                        <Star className="h-3.5 w-3.5" /> Tem um cupom de desconto?
                      </button>
                    ) : couponApplied ? (
                      <div className="bg-green-900/20 p-2 rounded-md border border-green-900/50 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-green-300 font-medium">
                          Cupom DEV2024 aplicado com sucesso!
                        </span>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Código do cupom"
                          className="flex-1 p-2.5 text-sm border border-gray-800 rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none bg-gray-900/60 text-white"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button
                          onClick={applyCoupon}
                          variant="outline"
                          size="sm"
                          className="text-sm border-gray-800 bg-gray-900/60 text-blue-400 hover:text-white hover:bg-blue-900/50 hover:border-blue-900"
                        >
                          Aplicar
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl transition-all font-extrabold text-lg h-auto shadow-lg relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="absolute w-40 h-40 bg-white/10 rounded-full blur-xl"
                        animate={{ scale: [0.1, 1.5], opacity: [0, 0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </div>
                    
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
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
                        Processando...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 relative z-10">
                        <Zap className="h-5 w-5 mr-1 group-hover:animate-pulse" /> 
                        Pagar R${couponApplied ? "7,90" : "9,90"}{" "}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
              
              <CardFooter className="p-0 pt-4 flex-col items-start gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Lock className="h-4 w-4 text-green-400" />
                  <span>Pagamento 100% seguro e criptografado</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Garantia de 30 dias ou seu dinheiro de volta</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="pix" className="mt-0 p-0">
            <Card className="border-0 shadow-none bg-transparent">
              <CardContent className="p-0 space-y-4 flex flex-col items-center">
                <div className="text-center mb-2 w-full">
                  <h3 className="font-semibold text-lg text-white">
                    Pagamento via PIX
                  </h3>
                  <p className="text-sm text-gray-400">
                    Escaneie o código QR ou copie o código PIX para pagamento
                    instantâneo
                  </p>
                </div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-blue-950/20 p-5 rounded-lg border border-blue-900/50 w-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(29,78,216,0.15),transparent_70%)]"></div>
                  
                  <div className="relative flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white p-3 rounded-lg mx-auto w-48 h-48 flex items-center justify-center relative"
                      style={{
                        boxShadow: "0 0 20px rgba(30, 64, 175, 0.2)",
                      }}
                    >
                      <div className="absolute inset-0 rounded-lg bg-[radial-gradient(ellipse_at_center,_rgba(29,78,216,0.05),transparent_70%)]"></div>
                      <QrCode className="h-40 w-40 mx-auto text-gray-800 relative z-10" />
                      
                      {/* Scanning effect */}
                      <motion.div 
                        className="absolute left-0 w-full h-[2px] bg-blue-400 z-20"
                        animate={{ 
                          top: ["0%", "100%", "0%"],
                          opacity: [0.7, 0.8, 0.7]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                <div className="w-full">
                  <div className="flex items-center justify-between bg-gray-900/60 p-3 rounded-md border border-gray-800">
                    <span className="text-sm text-gray-300 truncate font-mono">
                      00020126580014br.gov.bcb.pix0136a629532e-7693-4846-b028
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          "00020126580014br.gov.bcb.pix0136a629532e-7693-4846-b028",
                        );
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="bg-gray-800 hover:bg-blue-900/50 border-gray-700 hover:border-blue-700 text-white hover:text-white"
                    >
                      {copied ? (
                        <motion.span 
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1"
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-400" />{" "}
                          Copiado
                        </motion.span>
                      ) : (
                        "Copiar"
                      )}
                    </Button>
                  </div>
                </div>

                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-blue-950/20 p-4 rounded-lg w-full border border-blue-900/50"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-100">
                      <p className="font-medium mb-1">Instruções:</p>
                      <ol className="list-decimal pl-5 space-y-1">
                        <li>Abra o app do seu banco</li>
                        <li>Escolha pagar via PIX com QR Code ou código</li>
                        <li>Escaneie ou cole o código acima</li>
                        <li>Confirme o valor de R${couponApplied ? "7,90" : "9,90"}</li>
                        <li>Pronto! Seu acesso será liberado automaticamente</li>
                      </ol>
                    </div>
                  </div>
                </motion.div>

                <div className="text-center text-sm w-full bg-gray-900/60 p-3 rounded-lg border border-gray-800">
                  <div className="flex justify-center items-center gap-2 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <p className="font-medium text-white">
                      O pagamento será confirmado automaticamente
                    </p>
                  </div>
                  <p className="text-gray-400">
                    Valor:{" "}
                    <span className="font-semibold text-blue-400">R${couponApplied ? "7,90" : "9,90"}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stripe" className="mt-0 p-0">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="p-0 pb-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/10 p-1 rounded">
                      <img
                        src="https://stripe.com/img/v3/home/social.png"
                        alt="Stripe"
                        className="h-5 w-5 rounded brightness-0 invert"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-300">
                      Stripe Checkout
                    </span>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-blue-950/20 p-3 rounded-lg mb-4 flex items-start gap-2 border border-blue-900/50"
                >
                  <ShieldCheck className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-100">
                    Stripe oferece uma das formas de pagamento mais seguras do
                    mundo, com proteção contra fraudes.
                  </p>
                </motion.div>
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full p-3 border border-gray-800 rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-gray-900/60 text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                      <CreditCard className="h-3.5 w-3.5 text-blue-400" />
                      Número do Cartão
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="w-full p-3 border border-gray-800 rounded-md pl-10 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-gray-900/60 text-white"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        maxLength={19}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {cardType ? (
                          <div className="w-6 h-4 flex items-center justify-center">
                            {cardType === "visa" && (
                              <img
                                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
                                alt="Visa"
                                className="h-4"
                              />
                            )}
                            {cardType === "mastercard" && (
                              <img
                                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/mastercard.png"
                                alt="Mastercard"
                                className="h-4"
                              />
                            )}
                            {cardType === "amex" && (
                              <img
                                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/amex.png"
                                alt="Amex"
                                className="h-4"
                              />
                            )}
                            {cardType === "discover" && (
                              <img
                                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/discover.png"
                                alt="Discover"
                                className="h-4"
                              />
                            )}
                          </div>
                        ) : (
                          <CreditCardIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Validade
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full p-3 border border-gray-800 rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-gray-900/60 text-white"
                        value={cardExpiry}
                        onChange={(e) =>
                          setCardExpiry(formatExpiry(e.target.value))
                        }
                        maxLength={5}
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label className="text-sm font-medium flex items-center gap-1.5 text-gray-300">
                        <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full p-3 border border-gray-800 rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all bg-gray-900/60 text-white"
                        value={cardCvv}
                        onChange={(e) =>
                          setCardCvv(
                            e.target.value.replace(/\D/g, "").slice(0, 4),
                          )
                        }
                        maxLength={4}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div 
                  className="pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl transition-all font-extrabold text-lg h-auto shadow-lg relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="absolute w-40 h-40 bg-white/10 rounded-full blur-xl"
                        animate={{ scale: [0.1, 1.5], opacity: [0, 0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </div>
                    
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
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
                        Processando...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 relative z-10">
                        <Sparkles className="h-5 w-5 mr-1 group-hover:animate-pulse" /> 
                        Pagar com Stripe{" "}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
              
              <CardFooter className="p-0 pt-4 flex-col items-start gap-2">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Lock className="h-4 w-4 text-green-400" />
                  <span>Pagamento 100% seguro e criptografado</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>Garantia de 30 dias ou seu dinheiro de volta</span>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {/* Trust badges */}
      <div className="px-4 py-3 bg-gray-900/50 border-t border-gray-800">
        <motion.div 
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-full">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs text-gray-300">Compra Segura</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-full">
            <Lock className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs text-gray-300">Dados Protegidos</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 rounded-full">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs text-gray-300">Garantia de 30 dias</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PaymentOptions;