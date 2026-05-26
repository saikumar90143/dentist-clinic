"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, XCircle, Award, Sparkles } from "lucide-react";

/* ─── Data ────────────────────────────────────────────── */
const reasons = [
  {
    icon: "🏆",
    title: "20+ Years of Excellence",
    desc: "Over two decades of trusted dental care serving the NCR region",
  },
  {
    icon: "🌍",
    title: "Internationally Trained Specialists",
    desc: "Our doctors are trained at leading institutions across Europe & USA",
  },
  {
    icon: "💎",
    title: "Swiss & Nobel Implant Systems",
    desc: "Only FDA-approved, world-class implant brands used at SmileCraft",
  },
  {
    icon: "🛡️",
    title: "Zero-Pain Treatment Guarantee",
    desc: "Advanced sedation ensures every procedure is completely painless",
  },
  {
    icon: "📱",
    title: "Digital Smile Preview",
    desc: "See your transformed smile digitally before treatment even begins",
  },
  {
    icon: "✅",
    title: "ISO & NABH Certified",
    desc: "Highest standards of quality and patient safety, independently verified",
  },
  {
    icon: "💳",
    title: "0% EMI Payment Options",
    desc: "Flexible, interest-free installment plans across leading banks",
  },
  {
    icon: "🚨",
    title: "24/7 Emergency Care",
    desc: "Round-the-clock emergency dental line — we're always there for you",
  },
];

const features = [
  "Internationally Trained Specialists",
  "Digital Smile Preview",
  "Zero-Pain Guarantee",
  "Nobel / Swiss Implant Systems",
  "ISO & NABH Accreditation",
  "0% EMI Payment Plans",
  "24/7 Emergency Line",
  "Same-Day Appointments",
];

/* ─── Animation Variants ───────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" as any } },
};

const tableVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" as any, delay: 0.3 },
  },
};

const rowVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
};

const rowItemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

/* ─── Main Component ───────────────────────────────────── */
export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f0fdfa 50%, #f8fafc 100%)" }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "var(--color-teal-500)" }}
      />
      <div
        className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "var(--color-blue-500)" }}
      />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as any }}
          className="text-center mb-16"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border"
            style={{
              background: "rgba(13,148,136,0.08)",
              borderColor: "rgba(13,148,136,0.2)",
              color: "var(--color-teal-700)",
            }}
          >
            <Award className="w-4 h-4" />
            Why SmileCraft
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight font-display">
            The SmileCraft{" "}
            <span className="gradient-text">Difference</span>
          </h2>

          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            We don't just treat teeth — we transform lives. Here's what sets us apart from every other clinic in Delhi.
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Reasons List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="space-y-5"
          >
            {reasons.map((reason, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                className="group flex items-start gap-4 p-4 rounded-2xl border border-slate-100 bg-white/70 backdrop-blur-sm hover:border-teal-200 hover:shadow-lg hover:shadow-teal-50 transition-all duration-300 cursor-default"
              >
                {/* Emoji Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(13,148,136,0.08)" }}
                >
                  {reason.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-800 mb-0.5 group-hover:text-teal-700 transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{reason.desc}</p>
                </div>

                {/* Check */}
                <CheckCircle2
                  className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: "var(--color-teal-600)" }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Comparison Table */}
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="sticky top-8"
          >
            {/* Table container with glassmorphism */}
            <div
              className="rounded-3xl overflow-hidden border shadow-2xl"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderColor: "rgba(13,148,136,0.15)",
                boxShadow: "0 30px 80px rgba(13,148,136,0.12), 0 0 0 1px rgba(13,148,136,0.08)",
              }}
            >
              {/* Table Header */}
              <div
                className="grid grid-cols-3 text-center"
                style={{ background: "linear-gradient(135deg, var(--color-teal-600), var(--color-teal-700))" }}
              >
                <div className="col-span-1 px-4 py-5 text-left">
                  <span className="text-xs font-semibold uppercase tracking-widest text-teal-100 opacity-80">
                    Feature
                  </span>
                </div>
                <div className="px-4 py-5 flex flex-col items-center justify-center border-l border-teal-500/30">
                  <Sparkles className="w-4 h-4 text-yellow-300 mb-1" />
                  <span className="text-sm font-bold text-white">SmileCraft</span>
                </div>
                <div className="px-4 py-5 flex flex-col items-center justify-center border-l border-teal-500/30">
                  <span className="text-xs text-teal-200 font-medium">Typical Clinic</span>
                </div>
              </div>

              {/* Table Rows */}
              <motion.div
                variants={rowVariants}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="divide-y divide-slate-100"
              >
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    variants={rowItemVariants}
                    className="grid grid-cols-3 items-center hover:bg-teal-50/50 transition-colors duration-200"
                  >
                    {/* Feature name */}
                    <div className="px-4 py-3.5 col-span-1">
                      <span className="text-xs font-medium text-slate-700 leading-snug">{feature}</span>
                    </div>

                    {/* SmileCraft: ✓ */}
                    <div className="px-4 py-3.5 flex justify-center border-l border-slate-100">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-50">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      </div>
                    </div>

                    {/* Typical clinic: ✗ */}
                    <div className="px-4 py-3.5 flex justify-center border-l border-slate-100">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-red-50">
                        <XCircle className="w-4 h-4 text-red-400" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Table Footer CTA */}
              <div
                className="px-6 py-5 text-center"
                style={{ background: "linear-gradient(to right, rgba(13,148,136,0.04), rgba(59,130,246,0.04))" }}
              >
                <p className="text-xs text-slate-500 mb-3">
                  Experience the SmileCraft difference for yourself
                </p>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, var(--color-teal-600), var(--color-teal-700))",
                    boxShadow: "0 4px 20px rgba(13,148,136,0.3)",
                  }}
                >
                  Book Free Consultation
                </a>
              </div>
            </div>

            {/* Floating trust badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.5, type: "spring" as any, stiffness: 200 }}
              className="flex items-center justify-center gap-3 mt-6"
            >
              <div className="flex -space-x-2">
                {["A", "R", "P", "S", "V"].map((initial, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, var(--color-teal-${500 + i * 100 > 700 ? 600 : 500 + i * 100}), var(--color-teal-700))`,
                      zIndex: 5 - i,
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                <span className="font-bold text-slate-800">10,000+ patients</span> trust SmileCraft
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

