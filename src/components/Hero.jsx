import React, { useState, useEffect, useRef } from "react";

function Hero() {
  const words = ["Build", "Design", "Launch", "Scale", "Grow"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const heroRef = useRef(null);

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

    const animate = () => {
      if (isPausedRef.current) {
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
        min-h-screen
        flex
        items-center
        justify-center
        px-4
        pt-28
        sm:pt-32
        pb-20
        overflow-hidden
      "
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ opacity: bgOpacity }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-slate-900/5 blur-2xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8">
          <span className="inline-flex items-baseline gap-3">
            <span>We</span>
            <span className="relative inline-flex items-baseline">
              <span
                className={`
                  inline-block
                  text-yellow-500
                  transition-all
                  duration-300
                  ease-out
                  ${
                    isAnimating
                      ? "opacity-0 -translate-y-4 scale-95"
                      : "opacity-100 translate-y-0 scale-100"
                  }
                `}
                style={{
                  minWidth:
                    typeof window !== "undefined" && window.innerWidth < 640
                      ? "120px"
                      : "255px",
                }}
              >
                {words[currentWordIndex]}
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
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
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
