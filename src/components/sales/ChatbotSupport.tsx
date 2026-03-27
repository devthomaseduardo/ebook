import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Send, X, MessageSquare, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotSupportProps {
  initialMessage?: string;
  botName?: string;
}

const ChatbotSupport: React.FC<ChatbotSupportProps> = ({
  initialMessage = "Olá! Estou aqui para responder suas dúvidas sobre o e-book 'From Zero to First Programming Job'. Como posso ajudar?",
  botName = "Assistente Virtual",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqResponses: Record<string, string> = {
    pagamento:
      "Aceitamos pagamentos via cartão de crédito, PIX e Stripe. Todos os métodos são 100% seguros e o acesso ao e-book é liberado imediatamente após a confirmação do pagamento.",
    garantia:
      "Oferecemos garantia de 30 dias. Se você não ficar satisfeito com o conteúdo, devolvemos 100% do seu dinheiro sem questionamentos.",
    conteúdo:
      "O e-book contém um roadmap completo para aprender programação do zero e conseguir seu primeiro emprego, incluindo: linguagens recomendadas, projetos práticos, dicas de entrevistas e estratégias de busca de emprego.",
    tempo:
      "O tempo para conseguir um emprego varia de pessoa para pessoa, mas nosso método foi projetado para preparar você em aproximadamente 1 ano, estudando consistentemente.",
    formato:
      "O e-book está disponível em formato PDF e EPUB, podendo ser lido em qualquer dispositivo como computador, tablet ou smartphone.",
    atualizações:
      "Sim! Todas as atualizações futuras do e-book são gratuitas para quem já comprou.",
    bônus:
      "Ao comprar o e-book, você recebe 4 bônus exclusivos: Biblioteca de Exemplos de Código, Tutoriais em Vídeo, Acesso à Comunidade por 1 mês e Guia de Preparação para Entrevistas.",
    requisitos:
      "Não é necessário nenhum conhecimento prévio! O e-book foi criado para iniciantes absolutos e te guia passo a passo.",
    suporte:
      "Oferecemos suporte por email por 30 dias após a compra para esclarecer dúvidas sobre o conteúdo.",
    preço:
      "O e-book está com um preço promocional de R$9,90 (80% de desconto do valor original de R$49,90). Esta oferta é por tempo limitado.",
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          text: initialMessage,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, initialMessage, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();

    for (const [keyword, response] of Object.entries(faqResponses)) {
      if (lowercaseQuery.includes(keyword)) {
        return response;
      }
    }

    if (
      lowercaseQuery.includes("olá") ||
      lowercaseQuery.includes("oi") ||
      lowercaseQuery.includes("hey")
    ) {
      return "Olá! Como posso ajudar com informações sobre o e-book 'From Zero to First Programming Job'?";
    }

    if (
      lowercaseQuery.includes("obrigado") ||
      lowercaseQuery.includes("valeu")
    ) {
      return "De nada! Estou aqui para ajudar. Tem mais alguma dúvida sobre o e-book?";
    }

    if (
      lowercaseQuery.includes("comprar") ||
      lowercaseQuery.includes("adquirir")
    ) {
      return "Para comprar o e-book, basta clicar no botão 'Comprar agora' em qualquer seção da página. O pagamento é seguro e você terá acesso imediato após a confirmação.";
    }

    return "Não tenho certeza se entendi sua pergunta. Você pode perguntar sobre pagamento, garantia, conteúdo do e-book, tempo para conseguir emprego, formato, atualizações, bônus inclusos, requisitos, suporte ou preço.";
  };

  return (
    <><motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </motion.div><AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-20 right-4 w-80 sm:w-96 bg-black rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden border border-blue-800"
            style={{ maxHeight: "calc(100vh - 120px)" }}
          ><div className="bg-blue-900 text-white p-3 flex justify-between items-center border-b border-blue-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-medium">{botName}</h3>
                  <p className="text-xs text-blue-100">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-blue-200 focus:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div><div
              className="flex-1 p-3 overflow-y-auto bg-gray-900"
              style={{ maxHeight: "300px" }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-white border border-blue-700"}`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-3">
                  <div className="bg-gray-800 text-white rounded-lg p-3 border border-blue-700">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div><div className="p-2 border-t border-gray-700 bg-gray-900">
              <p className="text-xs text-gray-400 mb-2">
                Perguntas frequentes:
              </p>
              <div className="flex flex-wrap gap-1">
                {["Garantia?", "Preço?", "Conteúdo?", "Bônus?"].map(
                  (question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputValue(question);
                        setTimeout(() => handleSendMessage(), 100);
                      }}
                      className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-2 py-1 rounded-full transition-colors"
                    >
                      {question}
                    </button>
                  ),
                )}
              </div>
            </div><div className="p-3 border-t border-gray-700 bg-gray-900">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 border border-blue-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-gray-800 text-white"
                />
                <Button
                  onClick={handleSendMessage}
                  className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotSupport;
