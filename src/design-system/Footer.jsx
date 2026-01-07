import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 px-4 pt-20 pb-8">
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
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all"
                aria-label="LinkedIn"
              >
                in
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all"
                aria-label="Twitter"
              >
                x
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-slate-900 transition-all"
                aria-label="Instagram"
              >
                ig
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wide">
              Navigate
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">
                Home
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Services
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Start Your Startup
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Blog
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wide">
              Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">
                Process
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Case Studies
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                FAQs
              </li>
            </ul>
          </div>

          {/* Get Started */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wide">
              Get Started
            </h4>
            <p className="text-sm text-slate-400 mb-6 max-w-sm">
              If you’re ready to build something properly, start by telling us
              about your idea.
            </p>
            <button
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
                hover:scale-105
                hover:shadow-lg
                active:scale-100
              "
            >
              Start Your Startup
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-700/60 mb-6" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Start Core 360. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
