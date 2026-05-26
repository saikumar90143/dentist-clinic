"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, CreditCard, Zap, BadgeCheck } from "lucide-react";

/* ─── Data ────────────────────────────────────────────── */
const insurers = [
  {
    name: "Star Health",
    abbr: "SH",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fca5a5",
  },
  {
    name: "HDFC ERGO",
    abbr: "HE",
    color: "#1d4ed8",
    bg: "#eff6ff",
    border: "#93c5fd",
  },
  {
    name: "Bajaj Allianz",
    abbr: "BA",
    color: "#b45309",
    bg: "#fffbeb",
    border: "#fcd34d",
  },
  {
    name: "Care Health",
    abbr: "CH",
    color: "#15803d",
    bg: "#f0fdf4",
    border: "#86efac",
  },
  {
    name: "Niva Bupa",
    abbr: "NB",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#c4b5fd",
  },
  {
    name: "ICICI Lombard",
    abbr: "IL",
    color: "#b91c1c",
    bg: "#fff1f2",
    border: "#fda4af",
  },
  {
    name: "New India Assurance",
    abbr: "NI",
    color: "#0369a1",
    bg: "#f0f9ff",
    border: "#7dd3fc",
  },
  {
    name: "United India",
    abbr: "UI",
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#5eead4",
  },
];

const trustBadges = [
  { icon: CreditCard, label: "EMI Available", sub: "All major banks" },
  { icon: Zap, label: "0% Interest", sub: "Up to 24 months" },
  { icon: ShieldCheck, label: "Cashless Claims", sub: "Direct settlement" },
  { icon: BadgeCheck, label: "Quick Approval", sub: "Same day" },
];

/* ─── Insurance Logo Card ──────────────────────────────── */
function LogoCard({ insurer }: { insurer: typeof insurers[0] }) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-3 px-5 py-3.5 rounded-xl border mx-3 select-none min-w-[180px] group hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-default"
      style={{
        background: "white",
        borderColor: insurer.border,
      }}
    >
      {/* Logo Avatar */}
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: insurer.bg, color: insurer.color, border: `1.5px solid ${insurer.border}` }}
      >
        {insurer.abbr}
      </div>
      {/* Name */}
      <div>
        <p className="text-sm font-bold text-slate-800 leading-tight whitespace-nowrap">{insurer.name}</p>
        <p className="text-[10px] text-slate-400 font-medium">Insurance Partner</p>
      </div>
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────── */
export default function InsuranceLogos() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  // Duplicate for seamless loop
  const loopedInsurers = [...insurers, ...insurers, ...insurers];

  return (
    <section ref={ref} className="relative py-20 overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #0d9488 0, #0d9488 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as any }}
          className="text-center mb-12"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border"
            style={{
              background: "rgba(13,148,136,0.08)",
              borderColor: "rgba(13,148,136,0.2)",
              color: "var(--color-teal-700)",
            }}
          >
            <ShieldCheck className="w-4 h-4" />
            Insurance Accepted
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight font-display">
            We Accept All Major{" "}
            <span className="gradient-text">Insurance Plans</span>
          </h2>

          <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
            Cashless treatment with direct claim settlement. Our billing team handles all the paperwork so you can focus on your recovery.
          </p>
        </motion.div>
      </div>

      {/* Marquee Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative mb-12"
      >
        {/* Edge fade overlays */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #f8fafc, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #f8fafc, transparent)" }}
        />

        {/* Scrolling track */}
        <div className="overflow-hidden py-2">
          <div
            className="flex items-center"
            style={{
              animation: "marquee-scroll 35s linear infinite",
            }}
          >
            {loopedInsurers.map((insurer, i) => (
              <LogoCard key={`${insurer.abbr}-${i}`} insurer={insurer} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* CSS Keyframe injected via style tag */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${(100 / 3).toFixed(4)}%); }
        }
      `}</style>

      {/* Trust Badges Row */}
      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" as any }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {trustBadges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.55 + i * 0.08, duration: 0.45, type: "spring" as any, stiffness: 200 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col items-center text-center p-5 rounded-2xl border border-slate-200 bg-white hover:border-teal-300 hover:shadow-lg hover:shadow-teal-50 transition-all duration-300 cursor-default"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(13,148,136,0.08)" }}
              >
                <badge.icon className="w-5 h-5" style={{ color: "var(--color-teal-600)" }} />
              </div>
              <p className="text-sm font-bold text-slate-800 mb-0.5">{badge.label}</p>
              <p className="text-xs text-slate-500">{badge.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-center text-xs text-slate-400 mt-6"
        >
          Don't see your insurer?{" "}
          <a
            href="tel:+919876543210"
            className="font-semibold underline decoration-dotted hover:text-teal-600 transition-colors"
            style={{ color: "var(--color-teal-600)" }}
          >
            Call us — we likely accept it.
          </a>
        </motion.p>
      </div>
    </section>
  );
}

