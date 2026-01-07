import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PROFILES = [
  {
    title: "First-Time Founders",
    situation: "Have an idea but no execution path",
    why: "Need structure, guidance, and delivery",
  },
  {
    title: "Small Businesses Going Online",
    situation: "Offline or informal presence",
    why: "Want a professional digital foundation",
  },
  {
    title: "Early-Stage Startups",
    situation: "Have something built but lack polish or consistency",
    why: "Need credibility before growth",
  },
  {
    title: "Solo Founders",
    situation: "Don’t want to manage multiple vendors",
    why: "Prefer one accountable partner",
  },
];

const ProfileCard = ({ title, situation, why, index, scrollYProgress }) => {
  const start = index * 0.15;
  const end = start + 0.35;

  const y = useTransform(scrollYProgress, [start, end], [60, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-8
        sm:p-10
      "
    >
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5">
        {title}
      </h3>

      <div className="space-y-4 text-slate-700">
        <p>
          <span className="font-semibold text-slate-900">Situation:</span>{" "}
          {situation}
        </p>
        <p>
          <span className="font-semibold text-slate-900">Why we help:</span>{" "}
          {why}
        </p>
      </div>
    </motion.div>
  );
};

const WhoItsFor = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="who-its-for"
      className="relative bg-white py-28 sm:py-36 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6">
            Who Start Core 360 Is Built For
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed">
            This page helps you decide if we’re the right execution partner for
            your startup.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 sm:gap-16">
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
