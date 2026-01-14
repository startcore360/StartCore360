import React, { useEffect, useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Store, Rocket } from "lucide-react";

// import CursorGlow from "../design-system/CursorGlow";
const CursorGlow = React.lazy(() => import("../design-system/CursorGlow"));
/* =========================================
   MAIN PAGE COMPONENT
   ========================================= */
const ServicesPage = () => {
  return (
    <div
      id="services"
      className="bg-gradient-to-b from-white via-slate-50/30 to-white min-h-screen font-sans selection:bg-yellow-200"
    >
      <PageHero />
      <Suspense fallback={null}>
        <CursorGlow />
      </Suspense>

      {/* 1. Branding - Floating 3D Cards */}
      <ServiceGroup
        title="Branding & Identity"
        description="Your brand is the foundation of everything. Before any website or content exists, we establish a strong, consistent visual identity that builds trust and sets the tone for your entire startup."
        outcomes={[
          "Logo design",
          "Complete brand kit (colors, typography)",
          "Brand usage guidelines",
          "Offline assets (visiting cards, catalogs)",
          "Digital brand assets",
        ]}
        isReverse={false}
        VisualComponent={IsometricBranding}
      />

      {/* 2. Website - Floating Browser */}
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
        VisualComponent={IsometricWebsite}
      />

      {/* 3. Content - Floating Social Layers */}
      <ServiceGroup
        title="Content & Social Media"
        description="After launch, your startup needs consistent visibility. We create content and manage social media to support your growth—not chase vanity metrics, but build real trust and engagement."
        outcomes={[
          "Content creation",
          "Social media management",
          "Visual post design",
          "Brand-consistent messaging",
          "Platform setup and optimization",
        ]}
        isReverse={false}
        VisualComponent={IsometricContent}
      />

      {/* 4. Launch & Growth - Floating 3D Bars */}
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
        VisualComponent={IsometricGrowth}
      />

      <CombinedServicesSummary />
    </div>
  );
};

/* =========================================
   HERO SECTION
   ========================================= */
const PageHero = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      ref={ref}
      className="pt-48 pb-10 px-6 sm:px-8 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-1/4 w-64 h-64 bg-yellow-100/40 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="
            inline-block py-1.5 px-4 rounded-full 
            bg-slate-100/80 backdrop-blur-sm
            text-slate-600 text-sm font-semibold tracking-wide mb-6
            border border-slate-200/50
          "
        >
          END-TO-END EXECUTION
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight heading-display"
        >
          Services Designed to <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600">
            Build and Launch Properly
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-4 leading-relaxed text-body"
        >
          We don't sell disconnected tasks. We combine these services based on
          your stage to ensure your startup looks professional and trustworthy
          from day one.
        </motion.p>
      </motion.div>
    </section>
  );
};

/* =========================================
   SERVICE GROUP ROW
   ========================================= */
const ServiceGroup = ({
  title,
  description,
  outcomes,
  isReverse,
  VisualComponent,
}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Text Side */}
          <div className={`${isReverse ? "md:order-2" : "md:order-1"}`}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-12 h-1.5 bg-gradient-to-r from-yellow-400 to-yellow-500 mb-6 rounded-full origin-left"
            />
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 heading-section">
              {title}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed text-body">
              {description}
            </p>

            <ul className="space-y-4">
              {outcomes.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div
                    className="
                    mt-1.5 w-5 h-5 rounded-full 
                    bg-gradient-to-br from-yellow-100 to-yellow-50
                    flex items-center justify-center shrink-0
                    shadow-sm
                    group-hover:shadow-md group-hover:scale-110
                    transition-all duration-300
                  "
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500" />
                  </div>
                  <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`
              ${isReverse ? "md:order-1" : "md:order-2"}
              relative flex justify-center items-center
            `}
          >
            <div className="perspective-[2000px] w-full max-w-md aspect-square flex items-center justify-center">
              {/* Enhanced Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100/30 to-transparent rounded-full blur-3xl -z-10" />
              <VisualComponent />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================
   ISOMETRIC 3D VISUALS (PREMIUM FLOATING STYLE)
   ========================================= */

// 1. Branding: Floating Cards with Premium Effects
const IsometricBranding = () => (
  <motion.div
    className="relative w-64 h-64 preserve-3d"
    whileHover={{ rotateY: 5, rotateX: -5 }}
    transition={{ duration: 0.4 }}
  >
    {/* Back Card (Color Palette) */}
    <motion.div
      className="
        absolute top-0 right-0 w-48 h-56 
        bg-white rounded-2xl 
        shadow-premium-xl border border-slate-100 
        transform translate-x-8 -translate-y-8 rotate-12 
        p-4 flex flex-col gap-2
        hover:shadow-premium-2xl
        transition-shadow duration-300
      "
      whileHover={{ y: -5 }}
    >
      <div className="flex-1 bg-slate-800 rounded-lg opacity-90"></div>
      <div className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg"></div>
      <div className="flex-1 bg-slate-200 rounded-lg"></div>
    </motion.div>

    {/* Front Card (Identity) */}
    <motion.div
      className="
        absolute bottom-0 left-0 w-48 h-56 
        bg-slate-900 rounded-2xl 
        shadow-premium-2xl 
        p-6 flex flex-col justify-between 
        border border-slate-700
        hover:shadow-glow-intense
        transition-all duration-300
      "
      whileHover={{ y: -10, rotate: -2 }}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-glow"></div>
      <div className="space-y-3">
        <div className="h-2 w-full bg-slate-700 rounded"></div>
        <div className="h-2 w-2/3 bg-slate-700 rounded"></div>
      </div>
    </motion.div>
  </motion.div>
);

// 2. Website: Premium Tilted Browser
const IsometricWebsite = () => (
  <motion.div
    className="relative w-full max-w-sm"
    whileHover={{ rotateY: 0, rotateX: 0, scale: 1.03 }}
    initial={{ rotateY: -12, rotateX: 10 }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
  >
    <div
      className="
      bg-white rounded-2xl 
      shadow-premium-2xl 
      border border-slate-200 
      overflow-hidden 
      ring-1 ring-slate-900/5
    "
    >
      {/* Browser Bar */}
      <div className="bg-slate-50 border-b border-slate-100 p-3 flex gap-2 items-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
          <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors cursor-pointer"></div>
        </div>
        <div className="flex-1 h-5 bg-slate-100 rounded-full mx-4"></div>
      </div>
      {/* Content */}
      <div className="p-6 space-y-4 bg-gradient-to-b from-white to-slate-50/50">
        <div className="flex justify-between items-center">
          <div className="w-8 h-8 bg-slate-900 rounded"></div>
          <div className="flex gap-2">
            <div className="w-12 h-2 bg-slate-100 rounded"></div>
            <div className="w-12 h-2 bg-slate-100 rounded"></div>
          </div>
        </div>
        <div className="h-24 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg w-full"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"></div>
          <div className="h-16 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"></div>
        </div>
      </div>
    </div>
    {/* Enhanced Reflection/Shadow */}
    <div className="absolute -bottom-12 left-4 right-4 h-8 bg-gradient-to-b from-black/10 to-transparent blur-2xl rounded-[100%]"></div>
  </motion.div>
);

// 3. Content: Premium Floating Layers
const IsometricContent = () => (
  <motion.div
    className="relative w-48 h-64 flex items-center justify-center"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    {/* Back Layer */}
    <motion.div
      className="absolute w-40 h-52 bg-slate-100 rounded-2xl transform -rotate-12 translate-x-[-20px] shadow-premium-lg border border-slate-200"
      whileHover={{ rotate: -8 }}
    />

    {/* Middle Layer */}
    <motion.div
      className="absolute w-40 h-52 bg-slate-200 rounded-2xl transform -rotate-6 translate-x-[-10px] shadow-premium-lg border border-slate-300"
      whileHover={{ rotate: -3 }}
    />

    {/* Front Layer (Main Phone) */}
    <motion.div
      className="
        absolute w-40 h-52 
        bg-white border-4 border-slate-900 
        rounded-2xl shadow-premium-2xl 
        transform rotate-0 
        overflow-hidden
      "
      whileHover={{ scale: 1.08, rotate: -3 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-4 bg-slate-900 w-full mb-2"></div>
      <div className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-sm"></div>
          <div className="h-2 w-16 bg-slate-100 rounded"></div>
        </div>
        <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-sm" />
        </div>

        <div className="flex gap-2">
          <div className="w-4 h-4 bg-slate-100 rounded hover:bg-slate-200 transition-colors"></div>
          <div className="w-4 h-4 bg-slate-100 rounded hover:bg-slate-200 transition-colors"></div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// 4. Growth: Premium Tilted Bar Chart
const IsometricGrowth = () => (
  <motion.div
    className="relative w-64 h-56 flex items-end justify-center gap-3"
    initial={{ rotateX: 20, rotateY: -20, rotateZ: 5 }}
    whileHover={{ rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1.05 }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
  >
    {[
      { height: "h-16", color: "bg-slate-200" },
      { height: "h-24", color: "bg-slate-300" },
      { height: "h-32", color: "bg-slate-400" },
      {
        height: "h-48",
        color: "bg-gradient-to-t from-yellow-500 to-yellow-400",
        isHero: true,
      },
    ].map((bar, i) => (
      <motion.div
        key={i}
        className={`
          w-8 ${bar.height} ${bar.color} 
          rounded-t-lg shadow-premium-md
          ${bar.isHero ? "shadow-glow" : ""}
        `}
        whileHover={{ y: -5, scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {bar.isHero && (
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500 text-xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✦
          </motion.div>
        )}
      </motion.div>
    ))}

    {/* Ground Shadow */}
    <div className="absolute -bottom-8 w-full h-8 bg-black/15 blur-xl rounded-full transform scale-x-125"></div>
  </motion.div>
);

/* =========================================
   SUMMARY / COMBINATION SECTION
   ========================================= */
const CombinedServicesSummary = () => {
  const scenarios = [
    {
      title: "Idea Stage",
      desc: "Branding → Website → Launch",
      detail:
        "We take your raw idea and transform it into a credible, launch-ready startup foundation.",
      icon: Lightbulb,
      gradient: "from-blue-50 to-blue-100/60",
      border: "border-blue-200/50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Going Online",
      desc: "Refresh → Website → Setup",
      detail:
        "We modernize your business identity and bring it online with professional clarity.",
      icon: Store,
      gradient: "from-purple-50 to-purple-100/60",
      border: "border-purple-200/50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Scale Up",
      desc: "UI/UX → Content → Growth",
      detail:
        "We refine your product presence and prepare your brand for serious growth.",
      icon: Rocket,
      gradient: "from-amber-50 to-amber-100/60",
      border: "border-amber-200/50",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <section className="py-28 px-6 bg-gradient-to-b from-slate-50 via-white to-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 heading-section"
        >
          Combined for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
            Real Impact
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 mb-16 max-w-2xl mx-auto text-body leading-relaxed"
        >
          Our services are not sold separately. They are combined strategically
          based on your stage to produce real business outcomes — not just good
          looking deliverables.
        </motion.p>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-8">
          {scenarios.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`
                  relative
                  p-10 rounded-3xl 
                  bg-gradient-to-br ${s.gradient}
                  border ${s.border}
                  shadow-premium-md
                  hover:shadow-premium-xl
                  transition-all duration-300
                  text-left
                  overflow-hidden
                `}
              >
                {/* Soft glow */}
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-white/40 rounded-full blur-3xl pointer-events-none" />

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center mb-6 shadow-sm`}
                >
                  <Icon className={`w-6 h-6 ${s.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 mb-2 text-lg">
                  {s.title}
                </h3>

                {/* Flow */}
                <p className="text-sm font-semibold text-slate-700 mb-3 font-mono">
                  {s.desc}
                </p>

                {/* Detail */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {s.detail}
                </p>

                {/* Bottom accent */}
                <div className="mt-6 h-[2px] w-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
