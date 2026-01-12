import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Store, Rocket, User } from "lucide-react";

const PROFILES = [
  {
    tag: "Idea Stage",
    title: "First-Time Founders",
    desc: "You have an idea and need a trusted execution partner.",
    points: [
      "Brand foundation",
      "Website & presence",
      "Launch planning",
      "Ongoing support",
    ],
    icon: Lightbulb,
  },
  {
    tag: "Business Growth",
    title: "Growing Businesses",
    desc: "Your business needs a stronger digital identity.",
    points: [
      "Brand refresh",
      "Modern website",
      "Content strategy",
      "Social setup",
    ],
    icon: Store,
  },
  {
    tag: "Product Stage",
    title: "Early-Stage Startups",
    desc: "Your product exists but needs positioning.",
    points: [
      "Brand positioning",
      "Website polish",
      "Investor-ready look",
      "Growth base",
    ],
    icon: Rocket,
  },
  {
    tag: "Solo Journey",
    title: "Solo Founders",
    desc: "You want one reliable execution partner.",
    points: [
      "Full execution",
      "Single accountability",
      "Design & dev",
      "Long-term support",
    ],
    icon: User,
  },
];

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const headerAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const WhoItsFor = () => {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.1, // ✅ FIXED for mobile
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="who-its-for"
      className="relative bg-gradient-to-b from-white via-slate-50/50 to-white pt-20 pb-28 sm:pt-24 sm:pb-36 px-4 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-yellow-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-slate-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerAnim}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="inline-block mb-6 py-1.5 px-4 rounded-full bg-yellow-100/80 text-yellow-700 text-sm font-semibold border border-yellow-200/50">
            WHO IT'S FOR
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
            Who Start Core 360{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
              Is Built For
            </span>
          </h2>

          <p className="text-slate-600 text-lg">
            Start Core 360 partners with founders and businesses who want real
            execution, not just services.
          </p>

          <div className="mt-6 flex justify-center">
            <span className="h-[2px] w-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full" />
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {PROFILES.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={i}
                variants={card}
                whileHover={
                  !isMobile
                    ? {
                        y: -8,
                        boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.08)",
                        transition: { duration: 0.3, ease: "easeOut" },
                      }
                    : {}
                }
                whileTap={isMobile ? { scale: 0.98 } : {}}
                className="
                  group
                  rounded-2xl
                  border border-slate-200
                  bg-white
                  p-6 sm:p-7
                  shadow-sm
                  hover:shadow-xl
                  transition-shadow duration-300
                  relative
                  overflow-hidden
                "
              >
                {/* Card hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-yellow-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-5 group-hover:bg-yellow-200 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-yellow-600" />
                  </div>

                  <p className="text-sm font-medium text-yellow-600 mb-1">
                    {p.tag}
                  </p>

                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {p.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                    {p.desc}
                  </p>

                  <ul className="space-y-2 text-sm text-slate-700">
                    {p.points.map((pt, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          delay: 0.2 + i * 0.12 + idx * 0.05,
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                        {pt}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile hint */}
      </div>
    </section>
  );
};

export default WhoItsFor;
