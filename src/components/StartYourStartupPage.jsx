import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Lock,
  MessageCircle,
  Heart,
  Rocket,
  Building2,
  BookOpen,
  Mail,
} from "lucide-react";
import emailjs from "@emailjs/browser";

/* =========================================================
   PAGE ROOT
========================================================= */

const StartYourStartupPage = () => {
  return (
    <div
      id="contact"
      className="relative bg-gradient-to-b from-white via-slate-50/30 to-white min-h-screen overflow-hidden"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-yellow-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-slate-100/50 rounded-full blur-3xl" />
      </div>

      <PageIntroduction />
      <IntakeForm />
      <TrustIndicators />
    </div>
  );
};

/* =========================================================
   PAGE INTRODUCTION - Premium Hero
========================================================= */

const PageIntroduction = memo(() => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-14 px-4 relative z-10"
      aria-labelledby="contact-heading"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="max-w-3xl mx-auto text-center"
      >
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 sm:mb-6"
        >
          <span className="inline-flex items-center gap-2 py-2 px-4 sm:px-5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/60 shadow-lg text-xs sm:text-sm font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Ready to Build Something Great
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          id="contact-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-6"
        >
          Let's Build Your{" "}
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Startup
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed mb-3 sm:mb-4 max-w-2xl mx-auto px-2"
        >
          Whether you have an idea ready to launch or just want to explore
          possibilities, we're here to help turn your vision into reality.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm text-slate-500"
        >
          We personally review every message • Response within 24-48 hours
        </motion.p>
      </motion.div>
    </section>
  );
});

/* =========================================================
   INTAKE FORM - Interactive Multi-Step Experience
========================================================= */

const INTENT_OPTIONS = [
  {
    value: "startup",
    label: "I have a startup idea",
    icon: Rocket,
    desc: "Ready to build something new",
  },
  {
    value: "business",
    label: "I have an existing business",
    icon: Building2,
    desc: "Need professional execution",
  },
  {
    value: "understand",
    label: "I want to learn more",
    icon: BookOpen,
    desc: "Understand our process",
  },
  {
    value: "general",
    label: "General inquiry",
    icon: Mail,
    desc: "Just have a question",
  },
];

const SERVICE_OPTIONS = [
  {
    key: "branding",
    label: "Branding & Identity",
    desc: "Logo, colors, brand system",
  },
  {
    key: "website",
    label: "Website Development",
    desc: "Modern, responsive sites",
  },
  {
    key: "ecommerce",
    label: "E-commerce",
    desc: "Online store setup",
  },
  {
    key: "content",
    label: "Content & Social",
    desc: "Content strategy & management",
  },
  {
    key: "launch",
    label: "Launch Support",
    desc: "Go-to-market execution",
  },
];

// Dynamic questions based on intent
const getFollowUpQuestions = (intent) => {
  switch (intent) {
    case "startup":
      return {
        title: "Tell us about your startup idea",
        placeholder:
          "Describe your idea: What problem does it solve? Who is it for? What makes it unique?",
        followUp: "What stage is your startup at?",
        stages: [
          "Just an idea",
          "Have a prototype",
          "Early traction",
          "Ready to scale",
        ],
      };
    case "business":
      return {
        title: "Tell us about your business",
        placeholder:
          "What does your business do? What's working well, and what needs improvement?",
        followUp: "What's your primary goal?",
        stages: ["Rebrand", "New website", "More customers", "Go digital"],
      };
    case "understand":
      return {
        title: "What would you like to know?",
        placeholder:
          "Ask about our process, pricing, timelines, or anything else you're curious about.",
        followUp: null,
        stages: null,
      };
    case "general":
      return {
        title: "What's on your mind?",
        placeholder: "Share your thoughts, questions, or ideas with us.",
        followUp: null,
        stages: null,
      };
    default:
      return null;
  }
};

const IntakeForm = memo(() => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    intent: "",
    stage: "",
    name: "",
    email: "",
    company: "",
    message: "",
    services: {},
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const update = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateService = useCallback((key) => {
    setForm((prev) => ({
      ...prev,
      services: { ...prev.services, [key]: !prev.services[key] },
    }));
  }, []);

  const intentConfig = useMemo(
    () => getFollowUpQuestions(form.intent),
    [form.intent],
  );

  const progressPercentage = useMemo(() => {
    let progress = 0;
    if (form.intent) progress += 25;
    if (form.name && form.email) progress += 25;
    if (form.message) progress += 30;
    if (form.stage || !intentConfig?.stages) progress += 20;
    return Math.min(progress, 100);
  }, [form, intentConfig]);

  const isValidEmail = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  }, [form.email]);

  const isRequiredValid = useMemo(() => {
    return Boolean(form.intent && form.name && isValidEmail);
  }, [form.intent, form.name, isValidEmail]);

  const handleSubmit = useCallback(async () => {
    if (!isRequiredValid || isSubmitting) return;

    setIsSubmitting(true);

    const selectedServices = Object.keys(form.services)
      .filter((k) => form.services[k])
      .join(", ");

    const templateParams = {
      name: form.name,
      email: form.email,
      company: form.company || "N/A",
      intent: form.intent,
      stage: form.stage || "N/A",
      message: form.message,
      services: selectedServices || "None selected",

      company_row: form.company ? "" : "display:none;",
      intent_row: form.intent ? "" : "display:none;",
      stage_row: form.stage ? "" : "display:none;",
      services_row: selectedServices ? "" : "display:none;",
      message_row: form.message ? "" : "display:none;",
    };

    try {
      await emailjs.send(
        "service_5lvd6tk",
        "template_58k01r5",
        templateParams,
        "0Gpn20Rm8Mm52aeoF",
      );

      setSubmitted(true);
    } catch (error) {
      console.error("Email send error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isRequiredValid, isSubmitting]);

  return (
    <section ref={ref} className="py-6 sm:py-10 px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        {!submitted ? (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-5 sm:p-8 lg:p-10">
            {/* Progress Bar */}
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-between items-center mb-2 sm:mb-3">
                <span className="text-xs sm:text-sm font-medium text-slate-600">
                  Your progress
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-900">
                  {progressPercentage}%
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-slate-800 to-slate-900 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Step 1: Intent Selection */}
              <FormSection visible={visible}>
                <FormLabel required>What brings you here today?</FormLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
                  {INTENT_OPTIONS.map((option) => (
                    <IntentButton
                      key={option.value}
                      option={option}
                      selected={form.intent === option.value}
                      onClick={() => update("intent", option.value)}
                    />
                  ))}
                </div>
              </FormSection>

              {/* Step 2: Stage Selection (conditional) */}
              <AnimatePresence mode="wait">
                {intentConfig?.stages && form.intent && (
                  <FormSection visible key="stage">
                    <FormLabel>{intentConfig.followUp}</FormLabel>
                    <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                      {intentConfig.stages.map((stage) => (
                        <motion.button
                          key={stage}
                          type="button"
                          onClick={() => update("stage", stage)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                            ${
                              form.stage === stage
                                ? "bg-slate-900 text-white shadow-md"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }
                          `}
                        >
                          {stage}
                        </motion.button>
                      ))}
                    </div>
                  </FormSection>
                )}
              </AnimatePresence>

              {/* Step 3: Personal Details */}
              <AnimatePresence mode="wait">
                {form.intent && (
                  <FormSection visible key="details">
                    <FormLabel required>Tell us about yourself</FormLabel>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none transition-all text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="john@example.com"
                          className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm sm:text-base ${
                            form.email && !isValidEmail
                              ? "border-red-400 focus:ring-red-100"
                              : "border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                          }`}
                        />
                        {form.email && !isValidEmail && (
                          <p className="text-xs text-red-500 mt-1">
                            Enter a valid email address
                          </p>
                        )}
                      </div>
                    </div>

                    {(form.intent === "business" ||
                      form.intent === "startup") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 sm:mt-4"
                      >
                        <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                          Company / Startup Name{" "}
                          <span className="text-slate-400">(optional)</span>
                        </label>
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => update("company", e.target.value)}
                          placeholder="Your Company Name"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none transition-all text-sm sm:text-base"
                        />
                      </motion.div>
                    )}
                  </FormSection>
                )}
              </AnimatePresence>

              {/* Step 4: Message */}
              <AnimatePresence mode="wait">
                {intentConfig && form.name && form.email && (
                  <FormSection visible key="message">
                    <FormLabel>{intentConfig.title}</FormLabel>

                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder={intentConfig.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 outline-none transition-all resize-none mt-3 sm:mt-4 text-sm sm:text-base"
                    />

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-slate-400">
                        Be as detailed as you'd like
                      </span>
                      <span
                        className={`text-xs ${
                          form.message.length > 500
                            ? "text-slate-600"
                            : "text-slate-400"
                        }`}
                      >
                        {form.message.length} characters
                      </span>
                    </div>
                  </FormSection>
                )}
              </AnimatePresence>

              {/* Step 5: Services Selection */}
              <AnimatePresence mode="wait">
                {(form.intent === "startup" || form.intent === "business") && (
                  <FormSection visible key="services">
                    <FormLabel>What services interest you?</FormLabel>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-3 sm:mb-4">
                      Select all that apply
                    </p>

                    <div className="grid grid-cols-1 gap-2 sm:gap-3">
                      {SERVICE_OPTIONS.map((service) => (
                        <ServiceCheckbox
                          key={service.key}
                          service={service}
                          checked={form.services[service.key]}
                          onChange={() => updateService(service.key)}
                        />
                      ))}
                    </div>
                  </FormSection>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <FormSection visible>
                <motion.button
                  disabled={!isRequiredValid || isSubmitting}
                  onClick={handleSubmit}
                  whileHover={
                    isRequiredValid && !isSubmitting
                      ? { scale: 1.02, y: -2 }
                      : {}
                  }
                  whileTap={
                    isRequiredValid && !isSubmitting ? { scale: 0.98 } : {}
                  }
                  className={`
    w-full rounded-2xl px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg font-semibold 
    transition-all duration-300 
    flex items-center justify-center gap-3
    ${
      !isRequiredValid || isSubmitting
        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
        : "bg-slate-900 text-white shadow-xl hover:shadow-2xl"
    }
  `}
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>

                  {!isSubmitting && isRequiredValid && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  )}
                </motion.button>

                <p className="text-center text-xs sm:text-sm text-slate-500 mt-3 sm:mt-4">
                  By submitting, you agree to our{" "}
                  <a
                    href="/privacy"
                    className="text-slate-700 font-medium hover:text-slate-900 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </p>
              </FormSection>
            </div>
          </div>
        ) : (
          <SuccessState />
        )}
      </motion.div>
    </section>
  );
});

/* =========================================================
   INTENT BUTTON COMPONENT
========================================================= */

const IntentButton = memo(({ option, selected, onClick }) => {
  const IconComponent = option.icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative p-3 sm:p-4 rounded-xl text-left transition-all duration-300
        ${
          selected
            ? "bg-slate-900 border-2 border-slate-900 shadow-lg text-white"
            : "bg-slate-50 border-2 border-transparent hover:border-slate-200 hover:bg-white"
        }
      `}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <IconComponent
          className={`w-5 h-5 sm:w-6 sm:h-6 ${
            selected ? "text-white" : "text-slate-700"
          }`}
        />
        <div>
          <p
            className={`font-semibold text-sm sm:text-base ${
              selected ? "text-white" : "text-slate-900"
            }`}
          >
            {option.label}
          </p>
          <p
            className={`text-xs sm:text-sm ${
              selected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {option.desc}
          </p>
        </div>
      </div>
      {selected && (
        <motion.div
          layoutId="intentCheck"
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 text-slate-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
});

/* =========================================================
   SERVICE CHECKBOX COMPONENT
========================================================= */

const ServiceCheckbox = memo(({ service, checked, onChange }) => (
  <motion.label
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    onClick={onChange}
    className={`
      flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300
      ${
        checked
          ? "bg-slate-900 border-2 border-slate-900 text-white"
          : "bg-slate-50 border-2 border-transparent hover:border-slate-200"
      }
    `}
  >
    <input
      type="checkbox"
      checked={!!checked}
      onChange={onChange}
      className="hidden"
    />

    <div
      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
        checked ? "bg-white border-white" : "border-slate-300 bg-white"
      }`}
    >
      {checked && (
        <svg
          className="w-3 h-3 text-slate-900"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>

    <div className="flex-1">
      <p
        className={`font-semibold text-sm sm:text-base ${
          checked ? "text-white" : "text-slate-900"
        }`}
      >
        {service.label}
      </p>
      <p
        className={`text-xs sm:text-sm ${
          checked ? "text-slate-300" : "text-slate-500"
        }`}
      >
        {service.desc}
      </p>
    </div>
  </motion.label>
));

/* =========================================================
   SUCCESS STATE
========================================================= */

const SuccessState = memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-10 lg:p-12 text-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"
    >
      <svg
        className="w-8 h-8 sm:w-10 sm:h-10 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </motion.div>

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 sm:mb-4"
    >
      Message Sent Successfully!
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-base sm:text-lg text-slate-600 mb-2"
    >
      Thank you for reaching out. We've received your message and will respond
      within 24-48 hours.
    </motion.p>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-sm sm:text-base text-slate-500"
    >
      Keep an eye on your inbox — great things are coming!
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-6 sm:mt-8"
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all text-sm sm:text-base"
      >
        Back to Top
      </button>
    </motion.div>
  </motion.div>
));

/* =========================================================
   TRUST INDICATORS
========================================================= */

const TrustIndicators = memo(() => {
  const indicators = [
    { icon: Zap, label: "Quick Response", desc: "24-48 hour reply" },
    { icon: Lock, label: "Privacy First", desc: "Your data is secure" },
    { icon: MessageCircle, label: "No Obligation", desc: "Free consultation" },
    { icon: Heart, label: "Personal Touch", desc: "We read every message" },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {indicators.map((item, i) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-3 sm:p-4"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 mb-2 sm:mb-3">
                  <IconComponent
                    className="w-6 h-6 sm:w-7 sm:h-7 text-slate-900"
                    strokeWidth={2}
                  />
                </div>
                <p className="font-semibold text-slate-900 text-sm sm:text-base">
                  {item.label}
                </p>
                <p className="text-xs sm:text-sm text-slate-500">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

/* =========================================================
   UI COMPONENTS
========================================================= */

const FormSection = memo(({ visible, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
  >
    {children}
  </motion.div>
));

const FormLabel = memo(({ children, required }) => (
  <div className="flex items-center gap-2">
    <label className="text-base sm:text-lg font-semibold text-slate-900">
      {children}
      {required && <span className="text-slate-900 ml-1">*</span>}
    </label>
  </div>
));

/* =========================================================
   EXPORT
========================================================= */

export default StartYourStartupPage;
