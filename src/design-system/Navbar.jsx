import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/Logo/logo.png";

const NavItem = React.memo(({ label, active, onClick, isMobile }) => (
  <li
    role="menuitem"
    tabIndex={0}
    aria-current={active ? "page" : undefined}
    onClick={onClick}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
    className={`
        relative
        cursor-pointer
        min-h-[44px]
        px-3 py-3
        text-sm font-medium
        transition-colors
        ${active ? "text-slate-900" : "text-slate-600 hover:text-slate-900"}
      `}
  >
    {label}
    <span
      className={`
          absolute left-1/2 -translate-x-1/2 bottom-1
          h-[2px] w-5 rounded-full
          transition-opacity
          ${active ? "bg-yellow-400 opacity-100" : "opacity-0"}
        `}
    />
  </li>
));

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const firstItemRef = useRef(null);
  const location = useLocation();

  const navItems = useMemo(
    () => [
      { label: "Home", path: "home" },
      { label: "How it works", path: "how-it-works" },
      { label: "Who It’s For", path: "who-its-for" },
      { label: "Services", path: "services" },
      { label: "Contact us", path: "contact" },
    ],
    []
  );

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
      if (e.key === "Tab" && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll(
          'a,button,[tabindex="0"]'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    firstItemRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const onNavClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -120; // navbar height
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }, []);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const handler = () => {
      const sections = navItems.map((n) => document.getElementById(n.path));
      const scrollPos = window.scrollY + 140;

      sections.forEach((sec) => {
        if (
          sec &&
          scrollPos >= sec.offsetTop &&
          scrollPos < sec.offsetTop + sec.offsetHeight
        ) {
          setActiveId(sec.id);
        }
      });
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [navItems]);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto mt-4 sm:mt-8 max-w-7xl px-2">
        <nav
          role="navigation"
          aria-label="Primary"
          className={`
            flex items-center justify-between
            rounded-[20px]
            backdrop-blur-md
            border border-white/40
            px-4 py-2 md:px-6 md:py-3
            transition-all duration-300
            ${
              isScrolled
                ? "bg-white/50 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                : "bg-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
            }
          `}
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={logo}
              alt="Start Core 360 logo"
              className="h-9 w-9 md:h-10 md:w-10 select-none"
            />
            <p className="text-sm md:text-base font-semibold text-slate-900">
              Start Core 360
            </p>
          </div>

          <ul role="menubar" className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                label={item.label}
                active={activeId === item.path}
                onClick={() => {
                  setActiveId(item.path);
                  scrollToSection(item.path);
                  onNavClick();
                }}
              />
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button className="group relative overflow-hidden rounded-full bg-slate-900 px-5 py-2 min-h-[44px] text-sm font-semibold text-white shadow-md transition-all hover:shadow-xl active:scale-95">
              <span className="relative z-10">Get Started</span>
            </button>

            <button
              className="md:hidden flex flex-col gap-[3px] p-3 min-h-[44px]"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span
                className={`h-[2px] w-5 bg-slate-900 transition-all ${
                  isMenuOpen ? "rotate-45 translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`h-[2px] w-5 bg-slate-900 transition-all ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-5 bg-slate-900 transition-all ${
                  isMenuOpen ? "-rotate-45 -translate-y-[5px]" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        <div
          ref={menuRef}
          className={`
            md:hidden
            fixed left-1/2 top-[88px]
            w-[92%]
            -translate-x-1/2
            rounded-2xl
            bg-white/80
            backdrop-blur-xl
            border border-white/40
            shadow-2xl
            transition-all duration-300
            ${
              isMenuOpen
                ? "opacity-100 scale-100"
                : "pointer-events-none opacity-0 scale-95"
            }
          `}
        >
          <ul className="flex flex-col divide-y divide-slate-200/50">
            {navItems.map((item, i) => (
              <NavItem
                key={item.path}
                label={item.label}
                active={activeId === item.path}
                onClick={() => {
                  setActiveId(item.path);
                  scrollToSection(item.path);
                  onNavClick();
                }}
                isMobile
                ref={i === 0 ? firstItemRef : null}
              />
            ))}
          </ul>

          <div className="px-6 py-4">
            <button className="w-full min-h-[44px] rounded-full bg-slate-900 text-sm font-semibold text-white">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
