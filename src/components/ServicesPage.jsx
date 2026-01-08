import React, { useEffect, useRef, useState } from "react";
import CursorGlow from "../design-system/CursorGlow";

/* =========================================
   MAIN PAGE COMPONENT
   ========================================= */
const ServicesPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-yellow-200">
      <PageHero />
      <CursorGlow />

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

      {/* 4. Launch & Growth - Floating 3D Bars (Simple, No Text) */}
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
    <section ref={ref} className="pt-48 pb-10 px-6 sm:px-8">
      <div
        className={`
          max-w-5xl mx-auto text-center
          transition-all duration-1000 ease-out
          ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }
        `}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold tracking-wide mb-6">
          END-TO-END EXECUTION
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
          Services Designed to <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600">
            Build and Launch Properly
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-4 leading-relaxed">
          We don't sell disconnected tasks. We combine these services based on
          your stage to ensure your startup looks professional and trustworthy
          from day one.
        </p>
      </div>
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
        <div
          className={`
          grid md:grid-cols-2 gap-12 lg:gap-20 items-center
          transition-all duration-1000
          ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        `}
        >
          {/* Text Side */}
          <div className={`${isReverse ? "md:order-2" : "md:order-1"}`}>
            <div className="w-12 h-1 bg-yellow-400 mb-6"></div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">
              {title}
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {description}
            </p>

            <ul className="space-y-4">
              {outcomes.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Side */}
          <div
            className={`
            ${isReverse ? "md:order-1" : "md:order-2"}
            relative flex justify-center items-center
          `}
          >
            {/* UPDATED: Removed the "card" container (bg-slate-50, border). 
                Now just a clean perspective wrapper.
            */}
            <div className="perspective-[2000px] w-full max-w-md aspect-square flex items-center justify-center">
              {/* Subtle Glow behind the object instead of a box */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 to-transparent rounded-full blur-3xl -z-10" />

              <VisualComponent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================
   ISOMETRIC 3D VISUALS (FLOATING STYLE)
   ========================================= */

// 1. Branding: Floating Cards with Tilt
const IsometricBranding = () => (
  <div className="relative w-64 h-64 transform transition-transform duration-700 hover:scale-105 rotate-y-12 rotate-x-12 preserve-3d">
    {/* Back Card (Color Palette) */}
    <div className="absolute top-0 right-0 w-48 h-56 bg-white rounded-xl shadow-2xl border border-slate-100 transform translate-x-8 -translate-y-8 rotate-12 p-4 flex flex-col gap-2">
      <div className="flex-1 bg-slate-800 rounded-lg opacity-90"></div>
      <div className="flex-1 bg-yellow-400 rounded-lg"></div>
      <div className="flex-1 bg-slate-200 rounded-lg"></div>
    </div>

    {/* Front Card (Identity) */}
    <div className="absolute bottom-0 left-0 w-48 h-56 bg-slate-900 rounded-xl shadow-2xl p-6 flex flex-col justify-between transform transition-transform hover:translate-y-[-10px] border border-slate-700">
      <div className="w-10 h-10 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/20"></div>
      <div className="space-y-3">
        <div className="h-2 w-full bg-slate-700 rounded"></div>
        <div className="h-2 w-2/3 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
);

// 2. Website: Tilted Browser
const IsometricWebsite = () => (
  <div className="relative w-full max-w-sm transform rotate-y-[-12deg] rotate-x-[10deg] transition-transform duration-700 hover:rotate-0 hover:scale-105">
    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden ring-1 ring-slate-900/5">
      {/* Browser Bar */}
      <div className="bg-slate-50 border-b border-slate-100 p-3 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
        <div className="w-3 h-3 rounded-full bg-green-400"></div>
      </div>
      {/* Content */}
      <div className="p-6 space-y-4 bg-white/50">
        <div className="flex justify-between items-center">
          <div className="w-8 h-8 bg-slate-900 rounded"></div>
          <div className="flex gap-2">
            <div className="w-12 h-2 bg-slate-100 rounded"></div>
            <div className="w-12 h-2 bg-slate-100 rounded"></div>
          </div>
        </div>
        <div className="h-24 bg-slate-100 rounded-lg w-full"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-16 bg-slate-50 rounded-lg"></div>
          <div className="h-16 bg-slate-50 rounded-lg"></div>
        </div>
      </div>
    </div>
    {/* Reflection/Shadow underneath */}
    <div className="absolute -bottom-12 left-4 right-4 h-6 bg-black/10 blur-2xl rounded-[100%]"></div>
  </div>
);

// 3. Content: Floating Layers
const IsometricContent = () => (
  <div className="relative w-48 h-64 flex items-center justify-center">
    {/* Back Layer */}
    <div className="absolute w-40 h-52 bg-slate-100 rounded-2xl transform -rotate-12 translate-x-[-20px] shadow-lg border border-slate-200"></div>

    {/* Middle Layer */}
    <div className="absolute w-40 h-52 bg-slate-200 rounded-2xl transform -rotate-6 translate-x-[-10px] shadow-lg border border-slate-300"></div>

    {/* Front Layer (Main Phone) */}
    <div className="absolute w-40 h-52 bg-white border-4 border-slate-900 rounded-2xl shadow-2xl transform rotate-0 transition-transform hover:scale-110 hover:-rotate-3 overflow-hidden">
      <div className="h-4 bg-slate-900 w-full mb-2"></div>
      <div className="p-3 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
          <div className="h-2 w-16 bg-slate-100 rounded"></div>
        </div>
        <div className="aspect-square bg-slate-50 rounded-lg flex items-center justify-center text-xl">
          🚀
        </div>
        <div className="flex gap-2">
          <div className="w-4 h-4 bg-slate-100 rounded"></div>
          <div className="w-4 h-4 bg-slate-100 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

// 4. Growth: Tilted Bar Chart (Clean, No Text)
const IsometricGrowth = () => (
  <div className="relative w-64 h-56 flex items-end justify-center gap-3 transform rotate-x-[20deg] rotate-y-[-20deg] rotate-z-[5deg] transition-all duration-700 hover:rotate-0 hover:scale-105">
    {/* Bar 1 */}
    <div className="w-8 h-16 bg-slate-200 rounded-t-lg shadow-sm transform translate-z-0"></div>

    {/* Bar 2 */}
    <div className="w-8 h-24 bg-slate-300 rounded-t-lg shadow-sm transform translate-z-10"></div>

    {/* Bar 3 */}
    <div className="w-8 h-32 bg-slate-400 rounded-t-lg shadow-md transform translate-z-20"></div>

    {/* Bar 4 (Hero) */}
    <div className="w-8 h-48 bg-yellow-400 rounded-t-lg shadow-xl relative transform translate-z-30">
      {/* Simple sparkle icon */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500 animate-bounce text-xl">
        ✦
      </div>
    </div>

    {/* Ground Shadow */}
    <div className="absolute -bottom-8 w-full h-8 bg-black/20 blur-xl rounded-full transform scale-x-125"></div>
  </div>
);

/* =========================================
   SUMMARY / COMBINATION SECTION
   ========================================= */
const CombinedServicesSummary = () => {
  const scenarios = [
    {
      title: "Idea Stage",
      desc: "Branding → Website → Launch",
      color: "bg-blue-50 border-blue-100",
    },
    {
      title: "Going Online",
      desc: "Refresh → Web → Setup",
      color: "bg-purple-50 border-purple-100",
    },
    {
      title: "Scale Up",
      desc: "UI/UX → Content → Growth",
      color: "bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-6">
          Combined for Impact
        </h2>
        <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
          We don't sell these as isolated services. We mix and match them to
          build exactly what you need.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${s.color}`}>
              <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600 font-mono">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
