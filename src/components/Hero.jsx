import React, { useState, useEffect, useRef } from "react";

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
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/20 via-white/40 to-slate-50/60 pointer-events-none" />

      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: bgOpacity }}
      />

      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-slate-900/5 blur-2xl rounded-full" />
      </div> */}

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
          <span className="inline-flex items-baseline gap-3">
            <span>We</span>
            <span
              className="relative inline-flex items-baseline"
              aria-hidden="true"
            >
              <span
                className={`
                  text-yellow-500
                  transition-all
                  duration-300
                  ease-out
                  inline-block min-w-[120px] sm:min-w-[255px]
                  ${
                    isAnimating
                      ? "opacity-0 -translate-y-4 scale-95"
                      : "opacity-100 translate-y-0 scale-100"
                  }
                `}
              >
                {mounted ? words[currentWordIndex] : words[0]}
              </span>
            </span>
          </span>

          <span className="block mt-3">
            Startups with{" "}
            <span className="relative inline-block">
              360° Support
              <span className="absolute bottom-2 left-0 right-0 h-4 bg-yellow-400/30 -z-10 rounded-sm"></span>
            </span>
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed mb-14 max-w-3xl mx-auto">
          From brand identity to website development and launch, we help
          founders turn ideas into complete, professional, and scalable
          startups.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative overflow-hidden rounded-full bg-slate-900 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all hover:shadow-2xl hover:scale-105 active:scale-100">
            <span className="relative z-10">Start Your Startup</span>
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button className="rounded-full border-2 border-slate-300 bg-transparent px-8 py-4 text-lg font-semibold text-slate-700 transition-all hover:border-slate-900 hover:bg-slate-50 active:scale-95">
            View Our Process
          </button>
        </div>
        <div className="mt-12 sm:mt-20 transition-all duration-700 ease-out opacity-100 translate-y-0">
          <div className="grid grid-cols-3 sm:flex sm:flex-row items-start justify-center gap-4 sm:gap-12 text-slate-600">
            {/* Item 1 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3 cursor-default">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-yellow-100 flex items-center justify-center transition-transform sm:group-hover:scale-110">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-[11px] sm:text-sm font-semibold text-slate-900 leading-tight">
                  End-to-End Execution
                </p>
                <p className="text-[9px] sm:text-xs text-slate-500">
                  From idea to launch
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3 cursor-default">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-yellow-100 flex items-center justify-center transition-transform sm:group-hover:scale-110">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-[11px] sm:text-sm font-semibold text-slate-900 leading-tight">
                  Fast Delivery
                </p>
                <p className="text-[9px] sm:text-xs text-slate-500">
                  Rapid launch
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3 cursor-default">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-yellow-100 flex items-center justify-center transition-transform sm:group-hover:scale-110">
                <svg
                  className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-[11px] sm:text-sm font-semibold text-slate-900 leading-tight">
                  Long-Term Partner
                </p>
                <p className="text-[9px] sm:text-xs text-slate-500">
                  We grow with you
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;
