import React, { useEffect, useMemo, useRef, useState } from "react";

/* =========================================================
   PAGE ROOT
========================================================= */

const StartYourStartupPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <PageIntroduction />
      <IntakeForm />
    </div>
  );
};

/* =========================================================
   PAGE INTRODUCTION
========================================================= */

const PageIntroduction = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-4">
      <div
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6">
          Get in Touch with Start Core 360
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-4">
          Whether you’re ready to build a startup or simply want to understand
          how we work, this is the right place to reach us.
        </p>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          We review every message personally and respond when it makes sense to
          continue the conversation.
        </p>
      </div>
    </section>
  );
};

/* =========================================================
   INTAKE FORM
========================================================= */

const IntakeForm = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    intent: "",
    name: "",
    email: "",
    company: "",
    message: "",
    services: {
      branding: false,
      website: false,
      ecommerce: false,
      content: false,
      launch: false,
    },
  });

  /* ---------------- animation ---------------- */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  /* ---------------- helpers ---------------- */

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const updateService = (key) =>
    setForm((prev) => ({
      ...prev,
      services: { ...prev.services, [key]: !prev.services[key] },
    }));

  const isRequiredValid = useMemo(() => {
    return Boolean(form.intent && form.name && form.email);
  }, [form.intent, form.name, form.email]);

  const intentConfig = useMemo(() => {
    switch (form.intent) {
      case "startup":
        return {
          title: "Your startup idea",
          help: "Describe what you’re thinking of building and why.",
          askServices: true,
        };
      case "business":
        return {
          title: "Your business",
          help: "Tell us what your business does and what’s missing today.",
          askServices: true,
        };
      case "understand":
        return {
          title: "What would you like to understand?",
          help: "Process, pricing, timelines, or how we usually work.",
          askServices: false,
        };
      case "general":
        return {
          title: "Your question",
          help: "Ask us anything you’d like.",
          askServices: false,
        };
      case "else":
        return {
          title: "Your message",
          help: "Share what’s on your mind.",
          askServices: false,
        };
      default:
        return null;
    }
  }, [form.intent]);

  /* ---------------- submit ---------------- */

  const handleSubmit = () => {
    if (!isRequiredValid) return;
    setSubmitted(true);
  };

  /* ========================================================= */

  return (
    <section id="contact" ref={ref} className="py-12 sm:py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {!submitted ? (
          <div className="space-y-10">
            {/* Intent */}
            <AnimatedBlock show={visible}>
              <Label required>What are you reaching out about?</Label>
              <Select
                value={form.intent}
                onChange={(e) => update("intent", e.target.value)}
                options={[
                  ["", "Select an option"],
                  ["startup", "I have a startup idea and want to build it"],
                  [
                    "business",
                    "I have a business and need professional execution",
                  ],
                  [
                    "understand",
                    "I want to understand your process and services",
                  ],
                  ["general", "I have a general question"],
                  ["else", "Something else"],
                ]}
              />
            </AnimatedBlock>

            {/* Name */}
            {form.intent && (
              <AnimatedBlock show>
                <Label required>Full Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </AnimatedBlock>
            )}

            {/* Email */}
            {form.name && (
              <AnimatedBlock show>
                <Label required>Email Address</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </AnimatedBlock>
            )}

            {/* Company (optional, contextual) */}
            {(form.intent === "business" || form.intent === "startup") &&
              form.email && (
                <AnimatedBlock show>
                  <Label>Company / Startup Name (optional)</Label>
                  <Input
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                  />
                </AnimatedBlock>
              )}

            {/* Message */}
            {intentConfig && form.email && (
              <AnimatedBlock show>
                <Label>{intentConfig.title}</Label>
                <HelperText>{intentConfig.help}</HelperText>
                <Textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                />
              </AnimatedBlock>
            )}

            {/* Services */}
            {intentConfig?.askServices && form.message && (
              <AnimatedBlock show>
                <Label>What are you thinking about right now? (optional)</Label>
                <HelperText>Select anything that feels relevant.</HelperText>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Checkbox
                    label="Branding & identity"
                    checked={form.services.branding}
                    onChange={() => updateService("branding")}
                  />
                  <Checkbox
                    label="Website design & development"
                    checked={form.services.website}
                    onChange={() => updateService("website")}
                  />
                  <Checkbox
                    label="Ecommerce"
                    checked={form.services.ecommerce}
                    onChange={() => updateService("ecommerce")}
                  />
                  <Checkbox
                    label="Content & social media"
                    checked={form.services.content}
                    onChange={() => updateService("content")}
                  />
                  <Checkbox
                    label="Launch & ongoing support"
                    checked={form.services.launch}
                    onChange={() => updateService("launch")}
                  />
                </div>
              </AnimatedBlock>
            )}

            {/* Submit */}
            <AnimatedBlock show>
              <button
                disabled={!isRequiredValid}
                onClick={handleSubmit}
                className={`w-full rounded-full px-8 py-4 text-lg font-semibold transition-all ${
                  isRequiredValid
                    ? "bg-slate-900 text-white"
                    : "bg-slate-300 text-slate-500 cursor-not-allowed"
                }`}
              >
                Send Message
              </button>
            </AnimatedBlock>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-semibold text-slate-900 mb-4">
              Thanks for reaching out.
            </p>
            <p className="text-slate-600">
              We’ve received your message and will respond if it makes sense to
              continue the conversation.
            </p>
            <p className="text-slate-500 mt-2">
              We usually reply within 2–3 business days.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

/* =========================================================
   UI PRIMITIVES (kept simple but explicit)
========================================================= */

const AnimatedBlock = ({ show, children }) => (
  <div
    className={`transition-all duration-500 ${
      show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`}
  >
    {children}
  </div>
);

const Label = ({ children, required }) => (
  <label className="block text-lg font-semibold text-slate-900 mb-2">
    {children}
    {required && <span className="text-yellow-500 ml-1">*</span>}
  </label>
);

const HelperText = ({ children }) => (
  <p className="text-sm text-slate-500 mb-3">{children}</p>
);

const Input = ({ type = "text", ...props }) => (
  <input
    type={type}
    {...props}
    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-yellow-400 focus:outline-none"
  />
);

const Textarea = (props) => (
  <textarea
    {...props}
    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl resize-none focus:border-yellow-400 focus:outline-none"
  />
);

const Select = ({ options, ...props }) => (
  <select
    {...props}
    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-white"
  >
    {options.map(([value, label]) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);

const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 accent-yellow-400"
    />
    <span className="text-slate-700">{label}</span>
  </label>
);

export default StartYourStartupPage;
