import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Hero() {
  const words = ["Build", "Design", "Launch", "Scale", "Grow"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  const heroRef = useRef(null);
  const heroVisibleRef = useRef(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        heroVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      const timeout = setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 350);

      return () => clearTimeout(timeout);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -120;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const isPausedRef = useRef(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const PARTICLE_COUNT = isMobile ? 110 : 190;
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [bgOpacity, setBgOpacity] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
    let lastTime = 0;
    const now = performance.now();
    if (now - lastTime < 33) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastTime = now;

    const animate = () => {
      if (isPausedRef.current || !heroVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(250, 204, 21, 0.8)";

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [PARTICLE_COUNT, prefersReducedMotion]);

  useEffect(() => {
    const onScroll = () => {
      isPausedRef.current = window.scrollY > window.innerHeight;
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      setBgOpacity(1 - progress * 0.6);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      isPausedRef.current = document.hidden;
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + i * 0.1,
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
  };

  const features = [
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      title: "End-to-End Execution",
      subtitle: "From idea to launch",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      ),
      title: "Fast Delivery",
      subtitle: "Rapid launch",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      ),
      title: "Long-Term Partner",
      subtitle: "We grow with you",
    },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="
        relative
        min-h-[100svh]
        pt-24 sm:pt-28
        pb-24 sm:pb-28
        flex
        items-center
        justify-center
        px-4
        overflow-hidden
      "
    >
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 via-white/50 to-slate-50/70 pointer-events-none" />

      {/* Premium Ambient Glow Effects */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-10 left-1/4 w-96 h-96 bg-yellow-200/25 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-yellow-300/15 rounded-full blur-3xl pointer-events-none animate-float-slow"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-1/3 right-10 w-64 h-64 bg-slate-200/30 rounded-full blur-3xl pointer-events-none"
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: bgOpacity }}
      />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={badgeVariants} className="mb-8"></motion.div>
        {/* Main Heading with Enhanced Word Animation */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8 heading-display"
        >
          <span className="inline-flex items-baseline gap-3">
            <span>We</span>
            <span
              className="relative inline-flex items-baseline"
              aria-hidden="true"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="
                    text-transparent bg-clip-text 
                    bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500
                    inline-block min-w-[120px] sm:min-w-[255px]
                    drop-shadow-sm
                  "
                >
                  {mounted ? words[currentWordIndex] : words[0]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>

          <span className="block mt-3">
            Startups with{" "}
            <span className="relative inline-block">
              <span className="relative z-10">360° Support</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.4, 0, 0.2, 1] }}
                className="absolute bottom-2 left-0 right-0 h-4 bg-gradient-to-r from-yellow-300/40 to-yellow-400/30 -z-10 rounded-sm origin-left"
              />
            </span>
          </span>
        </motion.h1>
        {/* Subtitle with refined typography */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-14 max-w-3xl mx-auto text-body"
        >
          From brand identity to website development and launch, we help
          founders turn ideas into complete, professional, and scalable
          startups.
        </motion.p>
        {/* Enhanced CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection("contact")}
            className="
              group relative overflow-hidden 
              rounded-full bg-slate-900 
              px-8 py-4 text-lg font-semibold text-white 
              shadow-premium-xl
              transition-all duration-300
              glow-button
            "
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Startup
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection("how-it-works")}
            className="
              rounded-full 
              border-2 border-slate-200 
              bg-white/80 backdrop-blur-sm
              px-8 py-4 text-lg font-semibold text-slate-700 
              transition-all duration-300
              hover:border-slate-300 hover:bg-white/50
              hover:shadow-premium-lg
            "
          >
            View Our Process
          </motion.button>
        </motion.div>
        {/* Enhanced Feature Pills */}
        <div className="mt-12 sm:mt-20">
          <div className="grid grid-cols-3 sm:flex sm:flex-row items-start justify-center gap-4 sm:gap-12 text-slate-600">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={featureVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="
                  flex flex-col sm:flex-row items-center sm:items-start 
                  text-center sm:text-left gap-1.5 sm:gap-3 
                  cursor-default
                  p-3 rounded-2xl
                  transition-all duration-300
                  hover:bg-white/60 hover:shadow-premium-md
                "
              >
                <div
                  className="
                  w-10 h-10 sm:w-12 sm:h-12 
                  rounded-full bg-gradient-to-br from-yellow-100 to-yellow-50
                  flex items-center justify-center 
                  shadow-sm
                  transition-transform duration-300
                  group-hover:scale-110
                "
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {feature.icon}
                  </svg>
                </div>

                <div>
                  <p className="text-[11px] sm:text-sm font-semibold text-slate-900 leading-tight">
                    {feature.title}
                  </p>
                  <p className="text-[9px] sm:text-xs text-slate-500">
                    {feature.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs uppercase tracking-wider font-medium">
            Scroll
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-3 bg-slate-400 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
