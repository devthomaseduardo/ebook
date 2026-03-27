import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X, MessageSquare } from "lucide-react";

interface Purchase {
  name: string;
  location: string;
  time: string;
  avatar: string;
}

interface RecentPurchasesProps {
  purchases?: Purchase[];
  interval?: number;
  showDuration?: number;
}

const RecentPurchases: React.FC<RecentPurchasesProps> = ({
  purchases = [
    {
      name: "João Silva",
      location: "São Paulo, SP",
      time: "agora mesmo",
      avatar: "/clientes/men(2).jpg",
    },
    {
      name: "Maria Oliveira",
      location: "Rio de Janeiro, RJ",
      time: "2 minutos atrás",
      avatar: "/clientes/female(2).jpg",
    },
    {
      name: "Pedro Santos",
      location: "Belo Horizonte, MG",
      time: "5 minutos atrás",
      avatar: "/clientes/men(4).jpg",
    },
    {
      name: "Ana Costa",
      location: "Curitiba, PR",
      time: "7 minutos atrás",
      avatar: "/clientes/female(1).jpg",
    },
    {
      name: "Lucas Ferreira",
      location: "Salvador, BA",
      time: "12 minutos atrás",
      avatar: "/clientes/men(5).jpg",
    },
    {
      name: "Juliana Almeida",
      location: "Brasília, DF",
      time: "15 minutos atrás",
      avatar: "/clientes/female(4).jpg",
    },
  ],
  interval = 20000,
  showDuration = 3000, 
}) => {
  const [currentPurchase, setCurrentPurchase] = useState<Purchase | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const initialTimeout = setTimeout(() => {
      showNextPurchase();
    }, 5000);

    const intervalId = setInterval(() => {
      showNextPurchase();
    }, interval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [currentIndex, isDismissed]);

  const showNextPurchase = () => {
    if (isDismissed) return;

    setCurrentPurchase(purchases[currentIndex]);
    setIsVisible(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % purchases.length);

    setTimeout(() => {
      setIsVisible(false);
    }, showDuration);
  };

  return (
    <AnimatePresence>
      {isVisible && currentPurchase && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 10, x: -20 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-20 left-4 z-40 max-w-xs"
        >
          <div className="bg-black rounded-lg shadow-xl border border-black overflow-hidden">
            <div className="flex items-start p-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img
                    src={currentPurchase.avatar}
                    alt={currentPurchase.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm text-white">
                      {currentPurchase.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {currentPurchase.location}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsDismissed(true)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-1 text-xs text-white">
                  <span className="text-green-400 font-medium">Comprou</span> o
                  e-book{" "}
                  <span className="font-medium text-blue-400">
                    From Zero to First Programming Job
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  {currentPurchase.time}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RecentPurchases;
