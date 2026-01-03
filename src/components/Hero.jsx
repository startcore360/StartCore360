import React, { useState, useEffect } from "react";

function Hero() {
  const words = ["Build", "Design", "Launch", "Scale", "Grow"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Headline with Dynamic Word */}
        <h1 className="text-6xl md:text-7xl lg:text-6xl font-bold text-slate-900 leading-tight mb-8">
          We{" "}
          <span className="relative inline-block">
            <span
              className={`
        inline-block
        text-yellow-500
        transition-all duration-300
        ${
          isAnimating
            ? "opacity-0 -translate-y-4 scale-95"
            : "opacity-100 translate-y-0 scale-100"
        }
      `}
              style={{ minWidth: "200px" }}
            >
              {words[currentWordIndex]}
            </span>
          </span>{" "}
          <span className="block mt-2">
            Startups with{" "}
            <span className="relative inline-block">
              360° Support
              <span className="absolute bottom-2 left-0 right-0 h-4 bg-yellow-400/30 -z-10"></span>
            </span>
          </span>
        </h1>

        {/* Supporting Text */}
        <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-12 max-w-4xl mx-auto">
          From brand identity to website and launch, we help turn ideas into
          complete, professional startups.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            className="
              group
              relative
              overflow-hidden
              rounded-full
              bg-slate-900
              px-8 py-4
              text-lg font-semibold text-white
              shadow-xl
              transition-all
              hover:shadow-2xl
              hover:scale-105
              active:scale-100
            "
          >
            <span className="relative z-10">Start Your Startup</span>
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>

          <button
            className="
              rounded-full
              border-2 border-slate-300
              bg-transparent
              px-8 py-4
              text-lg font-semibold text-slate-700
              transition-all
              hover:border-slate-900
              hover:bg-slate-50
              active:scale-95
            "
          >
            View Our Process
          </button>
        </div>

        {/* Trust Indicators */}
        {/* <div className="mt-20 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>360° Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
            <span>Idea to Launch</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span>First-Time Founders</span>
          </div>
        </div> */}
      </div>

      {/* Scroll Indicator */}
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
