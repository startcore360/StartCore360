import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      className="bg-slate-900 text-slate-300 px-4 pt-20 pb-8"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Grid */}
        <div className="grid gap-14 md:grid-cols-4 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold text-white mb-4">
              Start Core 360
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm mb-6">
              We help founders turn ideas into real, working startups through
              structured execution, thoughtful design, and long-term support.
            </p>

            {/* Social */}
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/company/startcore360"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/startcore360"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Twitter / X"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/startcore360"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer navigation">
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wide">
              Navigate
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none focus:text-yellow-400"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none focus:text-yellow-400"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none focus:text-yellow-400"
                >
                  Start Your Startup
                </button>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-white transition-colors cursor-pointer block focus:outline-none focus:text-yellow-400"
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources navigation">
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wide">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("how-it-works")}
                  className="hover:text-white transition-colors cursor-pointer text-left focus:outline-none focus:text-yellow-400"
                >
                  Process
                </button>
              </li>
              <li>
                <a
                  href="/case-studies"
                  className="hover:text-white transition-colors cursor-pointer block focus:outline-none focus:text-yellow-400"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-white transition-colors cursor-pointer block focus:outline-none focus:text-yellow-400"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </nav>

          {/* Get Started */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wide">
              Get Started
            </h4>
            <p className="text-sm text-slate-400 mb-6 max-w-sm leading-relaxed">
              If you're ready to build something properly, start by telling us
              about your idea.
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-yellow-400
                px-6
                py-3
                text-sm
                font-semibold
                text-slate-900
                transition-all
                hover:bg-yellow-300
                hover:scale-105
                hover:shadow-lg
                active:scale-100
                focus:outline-none
                focus:ring-4
                focus:ring-yellow-400/50
              "
              aria-label="Navigate to contact form"
            >
              Start Your Startup
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-700/60 mb-6" role="separator" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Start Core 360. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="hover:text-slate-300 transition-colors cursor-pointer focus:outline-none focus:text-yellow-400"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:text-slate-300 transition-colors cursor-pointer focus:outline-none focus:text-yellow-400"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
