import React from "react";
import logo from "../assets/Logo/logo.png";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto mt-8 max-w-7xl px-2">
        <nav
          className="
            flex items-center justify-between
            rounded-[20px]
            bg-white/1
            backdrop-blur-md
            shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            border border-white/40
            px-6 py-3
          "
        >
          {/* Left: Logo gap (intentional) */}
          <div className="flex items-center gap-2">
            {/* <div className="h-8 w-8" /> */}
            <img src={logo} className="h-10 w-10" />
          </div>

          {/* Center: Navigation links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {[
              "Features",
              "Testimonials",
              "Highlights",
              "Pricing",
              "FAQ",
              "Blog",
            ].map((item) => (
              <li
                key={item}
                className="
                p-2
                rounded-full
                  cursor-pointer
                  transition-colors
                  hover:text-slate-900
                  hover:bg-slate-50
                "
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Right: Auth buttons */}
          <div className="flex items-center gap-4">
            <button
              className="
                text-sm font-medium text-slate-700
                hover:text-slate-900
                transition-colors
                 hover:bg-slate-50
                 p-2
                rounded-full
              "
            >
              Sign in
            </button>

            <button
              className="
              group
              relative
              overflow-hidden
                rounded-full
                bg-slate-900
                px-5 py-2
                text-sm font-semibold text-white
                shadow-md
                transition-all
                hover:shadow-2xl
                active:scale-95
              "
            >
              <span className="relative z-10">Sign up</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
