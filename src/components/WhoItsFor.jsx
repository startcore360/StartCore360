import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PROFILES = [
  {
    title: "First-Time Founders",
    situation: "Have an idea but no execution path",
    why: "Need structure, guidance, and delivery",
    icon: "💡",
  },
  {
    title: "Small Businesses Going Online",
    situation: "Offline or informal presence",
    why: "Want a professional digital foundation",
    icon: "🏪",
  },
  {
    title: "Early-Stage Startups",
    situation: "Have something built but lack polish or consistency",
    why: "Need credibility before growth",
    icon: "🚀",
  },
  {
    title: "Solo Founders",
    situation: "Don't want to manage multiple vendors",
    why: "Prefer one accountable partner",
    icon: "👤",
  },
];

const ProfileCard = ({
  title,
  situation,
  why,
  icon,
  index,
  scrollYProgress,
}) => {
  const start = index * 0.15;
  const end = start + 0.35;

  const y = useTransform(scrollYProgress, [start, end], [60, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  let initialX = 0;
  if (isMobile) {
    initialX = index % 2 === 0 ? 80 : -80;
  } else {
    initialX = index % 2 === 0 ? -120 : 120;
  }

  return (
    <motion.div
      initial={{ x: initialX, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{ y, opacity }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      }}
      className="
        group
        relative
        rounded-3xl
        border border-slate-200/80
        bg-white/90
        backdrop-blur-sm
        p-8
        sm:p-10
        shadow-premium-lg
        transition-all duration-500
        hover:shadow-premium-2xl
        hover:border-yellow-200/60
        overflow-hidden
      "
    >
      {/* Subtle gradient overlay on hover */}
      <div
        className="
        absolute inset-0 
        bg-gradient-to-br from-yellow-50/0 to-yellow-100/0
        group-hover:from-yellow-50/50 group-hover:to-yellow-100/30
        transition-all duration-500
        pointer-events-none
      "
      />

      {/* Glow effect */}
      <div
        className="
        absolute -top-20 -right-20 w-40 h-40 
        bg-yellow-300/0 group-hover:bg-yellow-300/20
        rounded-full blur-3xl
        transition-all duration-500
        pointer-events-none
      "
      />

      <div className="relative z-10">
        {/* Icon Badge */}
        <motion.div
          className="
            w-14 h-14 mb-6
            rounded-2xl
            bg-gradient-to-br from-yellow-100 to-yellow-50
            flex items-center justify-center
            text-2xl
            shadow-sm
            group-hover:shadow-md
            transition-all duration-300
          "
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          {icon}
        </motion.div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 heading-section">
          {title}
        </h3>

        <div className="space-y-4 text-slate-700">
          <p className="flex items-start gap-3">
            <span
              className="
              mt-1.5 w-2 h-2 rounded-full 
              bg-gradient-to-r from-yellow-400 to-yellow-500
              flex-shrink-0
            "
            />
            <span>
              <span className="font-semibold text-slate-900">Situation:</span>{" "}
              {situation}
            </span>
          </p>
          <p className="flex items-start gap-3">
            <span
              className="
              mt-1.5 w-2 h-2 rounded-full 
              bg-gradient-to-r from-yellow-400 to-yellow-500
              flex-shrink-0
            "
            />
            <span>
              <span className="font-semibold text-slate-900">Why we help:</span>{" "}
              {why}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const WhoItsFor = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 30%"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="who-its-for"
      className="relative bg-gradient-to-b from-white via-slate-50/50 to-white pt-20 pb-28 sm:pt-24 sm:pb-36 px-4 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-yellow-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-slate-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          {/* Section Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="
              inline-block mb-6
              py-1.5 px-4 
              rounded-full 
              bg-yellow-100/80 
              text-yellow-700 
              text-sm font-semibold
              border border-yellow-200/50
            "
          >
            WHO IT'S FOR
          </motion.span>

          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 heading-display">
            Who Start Core 360{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-500">
              Is Built For
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed text-body">
            This page helps you decide if we're the right execution partner for
            your startup.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
          {PROFILES.map((profile, index) => (
            <ProfileCard
              key={profile.title}
              {...profile}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
