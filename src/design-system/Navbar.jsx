import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Logo/logo.webp";

const NavItem = React.memo(({ label, active, onClick, isMobile }) => (
  <motion.li
    role="menuitem"
    tabIndex={0}
    aria-current={active ? "page" : undefined}
    onClick={onClick}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
    whileHover={{ y: -1 }}
    className={`
      relative
      cursor-pointer
      min-h-[44px]
      px-3 py-3
      text-sm font-medium
      transition-colors duration-200
      ${active ? "text-slate-900" : "text-slate-600 hover:text-slate-900"}
    `}
  >
    {label}
    <motion.span
      initial={false}
      animate={{
        scaleX: active ? 1 : 0,
        opacity: active ? 1 : 0,
      }}
      transition={{ duration: 0.2 }}
      className="
        absolute left-1/2 -translate-x-1/2 bottom-1
        h-[2px] w-5 rounded-full
        bg-gradient-to-r from-yellow-400 to-yellow-500
        origin-center
      "
    />
  </motion.li>
));

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const firstItemRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const location = useLocation();

  const navItems = useMemo(
    () => [
      { label: "Home", path: "home" },
      { label: "How it works", path: "how-it-works" },
      { label: "Who It's For", path: "who-its-for" },
      { label: "Services", path: "services" },
      { label: "Contact us", path: "contact" },
    ],
    []
  );

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(currentY > 10);

          if (currentY > lastScrollY.current && currentY > 120) {
            setIsHidden(true);
          } else {
            setIsHidden(false);
          }

          lastScrollY.current = currentY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
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

    const yOffset = -10;
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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isHidden ? -100 : 0,
        opacity: isHidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 z-50 w-full"
    >
      <div className="mx-auto mt-4 sm:mt-6 max-w-7xl px-2">
        <nav
          role="navigation"
          aria-label="Primary"
          className={`
            flex items-center justify-between
            rounded-2xl
            backdrop-blur-xl
            border
            px-4 py-2.5 md:px-6 md:py-3
            transition-all duration-300
            ${
              isScrolled
                ? "bg-white/80 border-slate-200/60 shadow-premium-xl"
                : "bg-white/40 border-white/50 shadow-premium-lg"
            }
          `}
        >
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={logo}
              alt="Start Core 360 logo"
              width="40"
              height="40"
              loading="eager"
              decoding="async"
              // className="h-9 w-9 md:h-10 md:w-10 select-none"
            />

            <p className="text-sm md:text-base font-semibold text-slate-900">
              Start Core 360
            </p>
          </motion.div>

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
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection("contact")}
              className="
                group relative overflow-hidden 
                rounded-full bg-slate-900 
                px-5 py-2.5 min-h-[44px] 
                text-sm font-semibold text-white 
                shadow-premium-lg
                transition-all duration-300
                glow-button
              "
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <button
              className="md:hidden flex flex-col gap-[3px] p-3 min-h-[44px]"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <motion.span
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 5 : 0,
                }}
                className="h-[2px] w-5 bg-slate-900 rounded-full"
              />
              <motion.span
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                className="h-[2px] w-5 bg-slate-900 rounded-full"
              />
              <motion.span
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -5 : 0,
                }}
                className="h-[2px] w-5 bg-slate-900 rounded-full"
              />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="
                md:hidden
                fixed left-1/2 top-[88px]
                w-[92%]
                -translate-x-1/2
                rounded-2xl
                bg-white/95
                backdrop-blur-xl
                border border-slate-200/60
                shadow-premium-2xl
              "
            >
              <ul className="flex flex-col divide-y divide-slate-100">
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
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="
                    w-full min-h-[44px] 
                    rounded-full 
                    bg-slate-900 
                    text-sm font-semibold text-white
                    shadow-premium-lg
                    glow-button
                  "
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
