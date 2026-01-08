import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WHAT_WE_DO_STEPS = [
  {
    title: "Understanding the Business",
    description:
      "We start by understanding your idea, how the business works, who it is for, and what the end goal is.",
    visual: "lightbulb",
  },
  {
    title: "Building the Brand Foundation",
    description:
      "We define a clear brand system — logo, colors, typography, and visual rules — so everything stays consistent.",
    visual: "palette",
  },
  {
    title: "Designing & Building the Website",
    description:
      "We design and build a responsive website that works as the main platform for your startup.",
    visual: "browser",
  },
  {
    title: "Establishing Online Presence",
    description:
      "We set up and align key online channels so your startup looks clear and trustworthy everywhere.",
    visual: "network",
  },
  {
    title: "Launch & Long-Term Growth",
    description:
      "We launch the startup properly and continue supporting it with updates and improvements as it grows.",
    visual: "rocket",
  },
];

const WhatWeDoSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  const renderVisual = (visual, scrollYProgress, start, end) => {
    const elementScale = useTransform(
      scrollYProgress,
      [start, start + 0.2, end - 0.2, end],
      isMobile ? [0.85, 1, 1, 0.85] : [0.7, 1, 1, 0.7]
    );

    const elementRotate = useTransform(
      scrollYProgress,
      [start, end],
      isMobile ? [-6, 6] : [-12, 12]
    );

    if (visual === "lightbulb") {
      return (
        <div
          className="relative w-full h-full flex items-center justify-center"
          role="img"
          aria-label="Lightbulb representing understanding"
        >
          {[...Array(isMobile ? 6 : 10)].map((_, i) => {
            const rayRotate = useTransform(
              scrollYProgress,
              [start, end],
              [i * 36, i * 36 + 220]
            );
            return (
              <motion.div
                key={i}
                style={{ rotate: rayRotate }}
                className="absolute w-1 sm:w-2 h-28 sm:h-36 bg-gradient-to-t from-yellow-400 to-transparent rounded-full opacity-60"
              />
            );
          })}
          <motion.div style={{ scale: elementScale }}>
            <div className="w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-2xl" />
            <div className="w-20 sm:w-24 h-12 sm:h-16 mx-auto mt-2 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-b-3xl" />
          </motion.div>
        </div>
      );
    }

    if (visual === "palette") {
      return (
        <div
          className="relative w-full h-full flex items-center justify-center"
          role="img"
          aria-label="Color palette representing branding"
        >
          {[
            "from-yellow-400 to-yellow-500",
            "from-slate-800 to-slate-900",
            "from-gray-200 to-gray-300",
            "from-yellow-300 to-amber-400",
          ].map((color, i) => {
            const swatchY = useTransform(
              scrollYProgress,
              [start, end],
              [`${-30 + i * 15}%`, `${30 - i * 15}%`]
            );
            return (
              <motion.div
                key={i}
                style={{ y: swatchY, rotate: elementRotate }}
                className="absolute"
              >
                <div
                  className={`w-20 sm:w-28 h-28 sm:h-36 rounded-2xl bg-gradient-to-br ${color} shadow-2xl`}
                />
              </motion.div>
            );
          })}
        </div>
      );
    }

    if (visual === "browser") {
      return (
        <motion.div
          style={{ scale: elementScale }}
          className="w-72 sm:w-80 h-56 sm:h-64 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
          role="img"
          aria-label="Browser window representing website development"
        >
          <div className="h-10 bg-slate-800 flex gap-2 px-4 items-center">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="p-4 sm:p-6 space-y-3">
            {[...Array(6)].map((_, i) => {
              const lineScale = useTransform(
                scrollYProgress,
                [start + i * 0.05, start + i * 0.1],
                [0, 1]
              );
              return (
                <motion.div
                  key={i}
                  style={{ scaleX: lineScale, transformOrigin: "left" }}
                  className="h-3 sm:h-4 bg-yellow-400/30 rounded"
                />
              );
            })}
          </div>
        </motion.div>
      );
    }

    if (visual === "network") {
      return (
        <div
          className="relative w-full h-full flex items-center justify-center"
          role="img"
          aria-label="Network diagram representing online presence"
        >
          <motion.div style={{ scale: elementScale }}>
            <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl" />
          </motion.div>
          {[...Array(isMobile ? 5 : 8)].map((_, i) => {
            const rotate = useTransform(
              scrollYProgress,
              [start, end],
              [i * 45, i * 45 + 360]
            );
            return (
              <motion.div key={i} style={{ rotate }} className="absolute">
                <div
                  className="w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-slate-800 shadow-xl"
                  style={{
                    transform: `translateY(${isMobile ? "-110px" : "-160px"})`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      );
    }

    if (visual === "rocket") {
      return (
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          role="img"
          aria-label="Rocket representing launch and growth"
        >
          {[...Array(isMobile ? 25 : 50)].map((_, i) => {
            const starY = useTransform(
              scrollYProgress,
              [start, end],
              [`${Math.random() * 100}%`, `-80%`]
            );
            return (
              <motion.div
                key={i}
                style={{ y: starY, left: `${Math.random() * 100}%` }}
                className="absolute w-1 h-1 bg-white rounded-full opacity-50"
              />
            );
          })}

          <motion.div
            style={{
              y: useTransform(
                scrollYProgress,
                [start, end],
                isMobile ? ["20%", "-90%"] : ["40%", "-130%"]
              ),
              rotate: useTransform(
                scrollYProgress,
                [start, end],
                isMobile ? [-1, 1] : [-2, 2]
              ),
              scale: elementScale,
            }}
            className="relative flex flex-col items-center"
          >
            <div className="w-0 h-0 border-l-[36px] sm:border-l-[48px] border-r-[36px] sm:border-r-[48px] border-b-[56px] sm:border-b-[72px] border-transparent border-b-yellow-400" />

            <div className="relative w-20 sm:w-24 h-44 sm:h-56 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-b-full shadow-2xl">
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-slate-900 border-4 border-yellow-200" />
            </div>

            <div className="relative mt-2 flex items-center justify-center">
              <motion.div className="w-8 sm:w-12 h-28 sm:h-36 bg-gradient-to-t from-yellow-500 via-orange-400 to-transparent rounded-full" />
              <motion.div className="absolute w-14 sm:w-20 h-36 sm:h-48 bg-yellow-400/20 blur-2xl rounded-full" />
            </div>
          </motion.div>
        </div>
      );
    }

    return null;
  };

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative w-full"
      aria-labelledby="how-it-works-heading"
    >
      {/* FIXED: Reduced padding from pt-24 to pt-16 and pb-12 to pb-6 */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-6 text-center">
        <h2
          id="how-it-works-heading"
          className="text-4xl sm:text-5xl font-black text-slate-900"
        >
          How We Build and Launch Startups
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-slate-600">
          A clear, structured process from idea to launch.
        </p>
      </div>

      <div
        className="relative"
        style={{ height: `${WHAT_WE_DO_STEPS.length * 60}vh` }}
      >
        <div className="sticky top-0 h-[100vh] w-full overflow-hidden flex items-center">
          {WHAT_WE_DO_STEPS.map((step, index) => {
            const start = index / WHAT_WE_DO_STEPS.length;
            const end = (index + 1) / WHAT_WE_DO_STEPS.length;
            const opacity = useTransform(
              scrollYProgress,
              [start, start + 0.08, end - 0.08, end],
              [0, 1, 1, 0]
            );

            const isReverse = index % 2 !== 0;

            return (
              <motion.div
                key={index}
                style={{ opacity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {!isReverse && (
                      <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                        <h3 className="text-3xl sm:text-5xl font-black text-slate-900">
                          {step.title}
                        </h3>
                        <p className="text-base sm:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0">
                          {step.description}
                        </p>
                      </div>
                    )}

                    <div className="h-[420px] sm:h-[520px] flex items-center justify-center">
                      {renderVisual(step.visual, scrollYProgress, start, end)}
                    </div>

                    {isReverse && (
                      <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                        <h3 className="text-3xl sm:text-5xl font-black text-slate-900">
                          {step.title}
                        </h3>
                        <p className="text-base sm:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0">
                          {step.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
