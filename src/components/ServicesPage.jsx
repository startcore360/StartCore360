import React, { useEffect, useRef, useState } from "react";

const ServicesPage = () => {
  return (
    <div className="bg-white">
      <PageHero />
      <HowToReadSection />

      <ServiceGroup
        title="Branding & Identity"
        description="Your brand is the foundation of everything. Before any website or content exists, we establish a strong, consistent visual identity that builds trust and sets the tone for your entire startup."
        outcomes={[
          "Logo design",
          "Complete brand kit (colors, typography, visual system)",
          "Brand usage guidelines",
          "Offline assets (visiting cards, catalogs)",
          "Digital brand assets",
        ]}
        isReverse={false}
      />

      <ServiceGroup
        title="Website & Ecommerce"
        description="Your website is the core of your digital presence. We design and build modern, high-performance websites that align with your business goals, work flawlessly across devices, and support your growth."
        outcomes={[
          "Business websites",
          "Startup landing pages",
          "Ecommerce stores",
          "Portfolio websites",
          "Custom web experiences",
        ]}
        isReverse={true}
      />

      <ServiceGroup
        title="Content & Social Media"
        description="After launch, your startup needs consistent visibility and credibility. We create content and manage social media to support your growth—not chase vanity metrics, but build real trust and engagement."
        outcomes={[
          "Content creation",
          "Social media management",
          "Visual post design",
          "Brand-consistent messaging",
          "Platform setup and optimization",
        ]}
        isReverse={false}
      />

      <ServiceGroup
        title="Startup Launch & Growth"
        description="We don't disappear after delivery. We support your launch, stay with you as you grow, and act as a long-term execution partner. Updates, improvements, and strategic guidance are part of how we work."
        outcomes={[
          "Complete launch coordination",
          "Ongoing website updates",
          "Design and development support",
          "Growth-focused improvements",
          "Long-term partnership",
        ]}
        isReverse={true}
      />

      <HowServicesWorkTogether />
      <EndCTA />
    </div>
  );
};

/* ================================
   PAGE HERO
================================ */

const PageHero = () => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasAnimated(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="pt-32 sm:pt-40 pb-20 px-4">
      <div
        className={`
          max-w-4xl mx-auto text-center
          transition-all duration-700 ease-out
          ${
            hasAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }
        `}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6">
          Services Designed to Build and Launch Startups Properly
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-4">
          These services are not sold individually — they are combined based on
          your stage and needs.
        </p>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
          This ensures your startup looks professional and trustworthy from day
          one.
        </p>
      </div>
    </section>
  );
};

/* ================================
   HOW TO READ
================================ */

const HowToReadSection = () => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasAnimated(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-12 sm:py-16 px-4 bg-slate-50">
      <div
        className={`
          max-w-3xl mx-auto text-center
          transition-all duration-700 ease-out
          ${
            hasAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }
        `}
      >
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          Our services are designed to work together. Depending on your stage,
          we combine them to build, launch, and support your startup properly.
        </p>
      </div>
    </section>
  );
};

/* ================================
   SERVICE GROUP
================================ */

const ServiceGroup = ({ title, description, outcomes, isReverse }) => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasAnimated(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 px-4">
      <div
        className={`
          max-w-6xl mx-auto
          transition-all duration-700 ease-out
          ${
            hasAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }
        `}
      >
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {!isReverse && (
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">
                {title}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mb-8">
                {description}
              </p>
              <div className="space-y-3">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2" />
                    <p className="text-slate-700">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-center">
            <div className="w-full h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200" />
          </div>

          {isReverse && (
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">
                {title}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mb-8">
                {description}
              </p>
              <div className="space-y-3">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2" />
                    <p className="text-slate-700">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ================================
   HOW SERVICES ARE COMBINED
================================ */

const HowServicesWorkTogether = () => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasAnimated(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scenarios = [
    {
      title: "Idea-Stage Startup",
      flow:
        "Situation: You have an idea but nothing built\n" +
        "Combined services: Branding → Website → Content → Launch\n" +
        "Outcome: A complete, ready-to-launch startup",
    },
    {
      title: "Offline Business Going Online",
      flow:
        "Situation: Offline or informal presence\n" +
        "Combined services: Brand refresh → Website → Online setup\n" +
        "Outcome: A credible digital foundation",
    },
    {
      title: "Early-Stage Startup",
      flow:
        "Situation: Something exists but lacks polish\n" +
        "Combined services: UI/UX → Website improvements → Content alignment\n" +
        "Outcome: A startup ready for growth",
    },
  ];

  return (
    <section
      ref={ref}
      id="services"
      className="py-20 sm:py-24 md:py-28 px-4 bg-slate-50"
    >
      <div
        className={`
          max-w-5xl mx-auto
          transition-all duration-700 ease-out
          ${
            hasAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }
        `}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-6 text-center">
          How These Services Are Combined
        </h2>

        <p className="text-base sm:text-lg text-slate-600 mb-12 text-center max-w-3xl mx-auto">
          Based on where you are, we combine services into a clear execution
          path — not disconnected tasks.
        </p>

        <div className="space-y-8">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
                {scenario.title}
              </h3>
              <p className="text-slate-600 whitespace-pre-line">
                {scenario.flow}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ================================
   END CTA
================================ */

const EndCTA = () => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHasAnimated(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 sm:py-24 md:py-28 px-4">
      <div
        className={`
          max-w-4xl mx-auto text-center
          transition-all duration-700 ease-out
          ${
            hasAnimated
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }
        `}
      >
        <div className="bg-slate-900 rounded-3xl px-8 py-12 sm:py-16">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-8">
            If you're unsure what you need, we'll help you figure it out.
          </p>
          <button className="group relative overflow-hidden rounded-full bg-yellow-400 px-8 py-4 text-lg font-semibold text-slate-900 shadow-xl transition-all hover:shadow-2xl hover:scale-105 active:scale-100">
            <span className="relative z-10">Start Your Startup</span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
