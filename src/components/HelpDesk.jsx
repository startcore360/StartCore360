import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Rocket,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// Enhanced knowledge base
const knowledge = [
  {
    q: ["first meeting", "first call", "initial discussion"],
    a: "In the first discussion, we understand your idea, business goals, and expectations. Based on that, we guide you with the right execution plan.",
    category: "Process",
  },
  {
    q: ["who decides", "your suggestion", "guidance model"],
    a: "We guide clients with clear recommendations, but final decisions are always made together with transparency.",
    category: "Process",
  },
  {
    q: ["what is success", "successful startup"],
    a: "For us, success means a startup that is professional, functional, trustworthy, and ready to grow in the real market.",
    category: "Philosophy",
  },

  {
    q: ["what do you do", "who are you", "about", "start core 360", "company"],
    a: "Start Core 360 is a full-service startup build and launch studio. We help individuals and early-stage businesses turn ideas into real, working startups — and support their growth after launch.",
    category: "About",
  },
  {
    q: ["problem", "challenge", "issue", "solve"],
    a: "We solve the problem of founders who have ideas but don't know how to execute them. Instead of managing multiple vendors, we become your one reliable partner for branding, website, content, and social media.",
    category: "Problem Solving",
  },
  {
    q: ["process", "work", "how", "method", "steps"],
    a: "Our 8-step process: 1) Understand your business → 2) Build brand foundation → 3) Design & develop website → 4) Create materials → 5) Setup online presence → 6) Content & social → 7) Launch → 8) Ongoing support.",
    category: "Process",
  },
  {
    q: ["branding", "logo", "identity", "visual", "design"],
    a: "We create complete brand identities: logos, colors, typography, guidelines, visiting cards, catalogs. Everything maintains professional consistency across platforms.",
    category: "Services",
  },
  {
    q: ["website", "web", "development", "site", "platform", "landing"],
    a: "We build business websites, landing pages, portfolio sites, ecommerce stores. We handle UI/UX design, development, mobile responsiveness, and performance optimization.",
    category: "Services",
  },
  {
    q: ["ecommerce", "store", "shop", "online store", "products"],
    a: "Yes, we build complete ecommerce solutions with product management, payment integration, modern UI/UX, and performance optimization for your online store.",
    category: "Services",
  },
  {
    q: ["content", "social media", "social", "instagram", "facebook", "posts"],
    a: "We handle content creation, social media management, visual posts, caption writing, and brand-consistent posting to build your online presence.",
    category: "Services",
  },
  {
    q: ["launch", "go live", "release", "startup launch", "live"],
    a: "We coordinate complete launches: website live, social media active, branding implemented. We ensure your startup is public-ready from day one.",
    category: "Process",
  },
  {
    q: ["support", "ongoing", "growth", "after launch", "maintenance"],
    a: "We're long-term partners. After launch, we continue with updates, new features, design needs, and growth support to help your startup scale.",
    category: "Support",
  },
  {
    q: ["price", "cost", "pricing", "how much", "investment", "budget"],
    a: "Pricing depends on your startup stage and specific needs. We offer customized packages. Share your details for accurate pricing.",
    category: "Pricing",
  },
  {
    q: ["contact", "email", "reach", "get in touch", "talk", "call"],
    a: "Share your details and our team contacts you within 24–48 hours. We personally review every message and provide free consultations.",
    category: "Contact",
  },
  {
    q: ["client", "who work with", "founder", "business type", "customer"],
    a: "We work with first-time founders, small businesses going online, early-stage startups, and individuals with ideas.",
    category: "Clients",
  },
  {
    q: ["time", "duration", "how long", "timeline", "schedule"],
    a: "Simple branding: 1-2 weeks. Complete startup builds: 4-8 weeks. We provide detailed timelines after understanding your needs.",
    category: "Process",
  },
  {
    q: ["portfolio", "work", "examples", "projects", "case studies"],
    a: "We've helped multiple startups launch successfully. Share your contact for relevant case studies based on your industry.",
    category: "Work",
  },
  {
    q: ["hello", "hi", "hey", "good morning", "good afternoon", "greetings"],
    a: "Hello! 👋 I'm the Start Core 360 Assistant. How can I help you build or grow your startup today?",
    category: "Greeting",
  },
  {
    q: ["thanks", "thank you", "appreciate", "grateful"],
    a: "You're welcome! Is there anything else about startup building I can help with?",
    category: "Response",
  },
  {
    q: ["are you an agency", "design agency", "marketing agency"],
    a: "No. We are not a traditional agency. Start Core 360 is a startup execution studio. We focus on building and launching startups as complete systems, not just delivering isolated services.",
    category: "Identity",
  },
  {
    q: ["do you work step by step", "your workflow", "how you start"],
    a: "Yes. We always start by understanding the business and goals first. We do not jump into design or development without clarity.",
    category: "Process",
  },
  {
    q: ["can you handle everything", "all in one", "full handling"],
    a: "Yes. We handle branding, website, content, social media, launch, and post-launch support as one connected system.",
    category: "Model",
  },
  {
    q: ["after launch", "post launch", "later support"],
    a: "After launch, we continue as a long-term partner with updates, improvements, design needs, and growth support.",
    category: "Support",
  },
  {
    q: ["do i need multiple vendors", "other agencies"],
    a: "No. With Start Core 360, you work with one single partner instead of managing multiple vendors.",
    category: "Value",
  },
  {
    q: ["if i only have idea", "no business yet"],
    a: "That is completely fine. Many of our clients come with only an idea. We help convert it into a real startup step by step.",
    category: "Clients",
  },
  {
    q: ["small business offline"],
    a: "We help offline businesses go online professionally with proper branding, websites, and online presence.",
    category: "Clients",
  },
  {
    q: ["half built startup", "already started"],
    a: "We also work with partially built startups and help restructure, improve, and complete them properly.",
    category: "Clients",
  },
  {
    q: ["why are you different", "difference", "unique"],
    a: "We focus on startup execution as a complete journey, not as disconnected services. Our responsibility is the startup outcome, not just deliverables.",
    category: "Positioning",
  },
  {
    q: ["do you push technology", "tech heavy"],
    a: "No. We use only what is necessary for the business. We do not push unnecessary technology or complexity.",
    category: "Approach",
  },
  {
    q: ["can you guide me", "confused founder"],
    a: "Yes. We guide founders clearly through every step so they never feel lost or confused during the startup journey.",
    category: "Guidance",
  },
  {
    q: ["long term partner", "relationship"],
    a: "We work as long-term partners, not as one-time service providers.",
    category: "Relationship",
  },
  {
    q: ["what exactly you build"],
    a: "We build the complete digital foundation of a startup — brand, website, online presence, content, and launch readiness.",
    category: "Scope",
  },
  {
    q: ["who manages everything"],
    a: "Start Core 360 manages the entire execution so founders can focus on their business vision.",
    category: "Responsibility",
  },
  {
    q: ["can i trust you", "reliable"],
    a: "We work with transparency, structure, and long-term intent. Our goal is to build startups properly, not just finish tasks.",
    category: "Trust",
  },
  {
    q: ["what is your goal"],
    a: "Our goal is to convert ideas into real startups and support their growth in a clear and professional way.",
    category: "Mission",
  },
];

const findAnswer = (text) => {
  const t = text.toLowerCase().trim();

  // Check for exact matches
  for (let k of knowledge) {
    if (k.q.some((w) => t === w || t.includes(w))) {
      return k;
    }
  }

  // Check partial matches
  const words = t.split(" ");
  for (let k of knowledge) {
    for (let word of words) {
      if (word.length > 3 && k.q.some((q) => q.includes(word))) {
        return k;
      }
    }
  }

  return null;
};

const HelpDesk = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello! 👋 I'm the Start Core 360 Assistant. I'm here to help you understand how we can turn your idea into a successful startup. What would you like to know about?",
      timestamp: new Date(),
      id: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [leadMode, setLeadMode] = useState(false);
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef();

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isTyping, leadMode]);

  // Quick questions
  const quickQuestions = [
    "What services do you offer?",
    "How does your process work?",
    "What's your pricing?",
    "Can you help with branding?",
  ];

  const sendMessage = () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const userMessage = {
      from: "user",
      text: userText,
      timestamp: new Date(),
      id: Date.now(),
    };

    setMessages((m) => [...m, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const answer = findAnswer(userText);
      const lower = userText.toLowerCase();

      const wantsContact =
        lower.includes("contact") ||
        lower.includes("call") ||
        lower.includes("talk") ||
        lower.includes("connect") ||
        lower.includes("reach") ||
        lower.includes("email") ||
        lower.includes("consult");

      const isVeryLong = userText.length > 80;

      if (answer) {
        const botMessage = {
          from: "bot",
          text: answer.a,
          category: answer.category,
          timestamp: new Date(),
          id: Date.now() + 1,
        };

        setMessages((m) => [...m, botMessage]);

        const isPricing = answer.category === "Pricing";

        if ((wantsContact || isPricing || isVeryLong) && !leadMode) {
          setTimeout(() => {
            setMessages((m) => [
              ...m,
              {
                from: "bot",
                text: "This looks like something our team should personally assist you with. Would you like to share your details so we can contact you?",
                timestamp: new Date(),
                id: Date.now() + 2,
              },
            ]);
            setLeadMode(true);
          }, 3000);
        }
      } else {
        setMessages((m) => [
          ...m,
          {
            from: "bot",
            text: "That’s a specific question. Our team can guide you better on this. Would you like to share your details so we can connect with you?",
            timestamp: new Date(),
            id: Date.now() + 3,
          },
        ]);

        if (!leadMode) setLeadMode(true);
      }

      setIsTyping(false);
    }, 1500);
  };

  const handleLeadSubmit = async () => {
    if (!lead.name || !lead.email) {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "Please provide at least your name and email so we can reach out to you.",
          timestamp: new Date(),
          id: Date.now(),
        },
      ]);
      return;
    }

    setSending(true);

    // Create a formatted conversation history
    const conversationHistory = messages
      .map((m) => `${m.from === "user" ? "User" : "Assistant"}: ${m.text}`)
      .join("\n\n");

    const templateParams = {
      name: lead.name,
      email: lead.email,

      company: "N/A",
      intent: "Chatbot Lead",
      stage: "Chatbot Conversation",
      services: "Via Chatbot",

      message: `
CHATBOT LEAD

Phone:
${lead.phone || "Not provided"}

User Note:
${lead.message || "Not provided"}

------------------------
CONVERSATION HISTORY
------------------------

${conversationHistory}
  `,

      company_row: "display:none;",
      intent_row: "",
      stage_row: "",
      services_row: "",
      message_row: "",
    };

    try {
      await emailjs.send(
        "service_5lvd6tk", // Your EmailJS service ID
        "template_58k01r5", // Your EmailJS template ID
        templateParams,
        "0Gpn20Rm8Mm52aeoF" // Your EmailJS public key
      );

      // Success message
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: `Perfect ${lead.name}! 🎉 Our team has received your details and will contact you at ${lead.email} within 24-48 hours. We're excited to help bring your startup vision to life!`,
          timestamp: new Date(),
          id: Date.now(),
        },
      ]);

      // Reset form
      setLead({ name: "", email: "", phone: "", message: "" });
      setLeadMode(false);
      setSending(false);
    } catch (error) {
      console.error("Email error:", error);
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "I couldn't send your details right now. Please try again or email us directly at hello@startcore360.com",
          timestamp: new Date(),
          id: Date.now(),
        },
      ]);
      setSending(false);
    }
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  return (
    <>
      {/* Floating Button - Responsive */}
      <motion.button
        onClick={() => setOpen((o) => !o)} // toggle open/close
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 160 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-400/70 blur-xl rounded-full" />
          <div className="relative bg-yellow-400/60 hover:bg-white/80 ext-black backdrop-blur-xl p-3 sm:p-4 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.12)]  hover:border-yellow-400 transition-all duration-300">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            />

            {/* Chat Container - Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              className="
  fixed bottom-20 right-4 left-4 
  sm:left-auto sm:right-6 sm:w-[440px]   // 👈 WIDTH CONTROL HERE (change to 460 / 480 if needed)
  md:w-[350px]
  max-h-[72vh]
  bg-white/90 backdrop-blur-xl rounded-3xl
  shadow-[0_20px_60px_rgba(0,0,0,0.18)]
  overflow-hidden z-50
  flex flex-col
  border border-white/60
"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 shrink-0 border-b border-white/10">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-1.5 sm:p-2 rounded-lg">
                      <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold tracking-wide text-sm sm:text-lg">
                        Start Core 360
                      </h3>
                      <p className="text-xs text-slate-300 tracking-wide">
                        Startup Assistant
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpen(false)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 bg-gradient-to-b from-slate-50/50 to-white">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-2 sm:gap-3 mb-3 ${
                      m.from === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
                        m.from === "bot"
                          ? "bg-gradient-to-br from-yellow-400 to-yellow-500"
                          : "bg-gradient-to-br from-slate-700 to-slate-900"
                      }`}
                    >
                      {m.from === "bot" ? (
                        <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      ) : (
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[75%] sm:max-w-[80%] ${
                        m.from === "bot" ? "" : "text-right"
                      }`}
                    >
                      <div
                        className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl text-sm sm:text-base ${
                          m.from === "bot"
                            ? "bg-white border border-slate-200 shadow-sm"
                            : "bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md"
                        }`}
                      >
                        {m.text}
                      </div>
                      {m.category && (
                        <span className="text-xs text-slate-500 mt-1 block">
                          {m.category}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2 sm:gap-3 mb-3"
                  >
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-500">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Quick Questions */}
                {!leadMode && messages.length <= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 sm:mt-4"
                  >
                    <p className="text-xs text-slate-500 mb-2">
                      Quick questions:
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {quickQuestions.map((q, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleQuickQuestion(q)}
                          className="px-2.5 py-1.5 text-xs bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 rounded-full hover:border-yellow-400 transition-colors"
                        >
                          {q}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input or Lead Form */}
              <div className="border-t border-slate-100 bg-white shrink-0">
                {!leadMode ? (
                  <div className="p-2 sm:p-3 flex gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1 border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400 transition-all"
                      placeholder="Ask about startup building, branding, websites..."
                      disabled={isTyping}
                    />
                    <motion.button
                      onClick={sendMessage}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!input.trim() || isTyping}
                      className={`p-2 sm:p-3 rounded-xl transition-all ${
                        !input.trim() || isTyping
                          ? "bg-slate-100 text-slate-400"
                          : "bg-gradient-to-r from-slate-900 to-slate-800 text-white"
                      }`}
                    >
                      {isTyping ? (
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </motion.button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 sm:p-4 space-y-3"
                  >
                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                      Let's connect you with our team
                    </h4>

                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={lead.name}
                        onChange={(e) =>
                          setLead({ ...lead, name: e.target.value })
                        }
                        className="w-full border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400 transition-all"
                      />

                      <input
                        type="email"
                        placeholder="Email Address *"
                        value={lead.email}
                        onChange={(e) =>
                          setLead({ ...lead, email: e.target.value })
                        }
                        className="w-full border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400 transition-all"
                      />

                      <input
                        type="tel"
                        placeholder="Phone Number (optional)"
                        value={lead.phone}
                        onChange={(e) =>
                          setLead({ ...lead, phone: e.target.value })
                        }
                        className="w-full border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400 transition-all"
                      />

                      <textarea
                        placeholder="Tell us about your startup idea or specific needs..."
                        value={lead.message}
                        onChange={(e) =>
                          setLead({ ...lead, message: e.target.value })
                        }
                        rows={2}
                        className="w-full border border-slate-200 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400 transition-all resize-none"
                      />
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => setLeadMode(false)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-2.5 sm:py-3 rounded-xl font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 transition-all"
                      >
                        Back to Chat
                      </motion.button>

                      <motion.button
                        onClick={handleLeadSubmit}
                        disabled={sending || !lead.name || !lead.email}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 py-2.5 sm:py-3 rounded-xl font-medium transition-all ${
                          sending || !lead.name || !lead.email
                            ? "bg-slate-100 text-slate-400"
                            : "bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md hover:shadow-lg"
                        }`}
                      >
                        {sending ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          "Submit Details"
                        )}
                      </motion.button>
                    </div>

                    <p className="text-xs text-slate-500 text-center">
                      We'll contact you within 24-48 hours. No spam, ever.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default HelpDesk;
