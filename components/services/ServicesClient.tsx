"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Sparkles,
  Smile,
  Baby,
  AlertTriangle,
  Heart,
  Filter,
} from "lucide-react";
import { services, serviceCategories, Service } from "@/lib/data/services";

/* ─── Service Icon Map ─────────────────────────────────── */
const ServiceIcon = ({ iconKey, className }: { iconKey: string; className?: string }) => {
  const cls = className ?? "w-6 h-6";
  switch (iconKey) {
    case "implant":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M12 2 C9 2, 7 4, 7 7 L7 10 C7 11.1 7.9 12 9 12 L15 12 C16.1 12 17 11.1 17 10 L17 7 C17 4 15 2 12 2Z" />
          <rect x="10" y="12" width="4" height="7" rx="1" />
          <path d="M9 19 L15 19 C15 21 13.7 22 12 22 C10.3 22 9 21 9 19Z" />
        </svg>
      );
    case "root-canal":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M8 3 C6 3, 4.5 4.5, 4.5 6.5 C4.5 8, 5.5 9, 6 10 L7 14" />
          <path d="M16 3 C18 3, 19.5 4.5, 19.5 6.5 C19.5 8, 18.5 9, 18 10 L17 14" />
          <path d="M12 3 L12 18" />
          <path d="M7 14 C7 16, 9 17, 9 19 C9 21, 10 22, 12 22 C14 22, 15 21, 15 19 C15 17, 17 16, 17 14 L7 14Z" />
        </svg>
      );
    case "whitening":
      return <Sparkles className={cls} />;
    case "smile":
      return <Smile className={cls} />;
    case "braces":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <rect x="3" y="9" width="4" height="6" rx="1" />
          <rect x="10" y="8" width="4" height="8" rx="1" />
          <rect x="17" y="9" width="4" height="6" rx="1" />
          <path d="M7 12 L10 12" />
          <path d="M14 12 L17 12" />
        </svg>
      );
    case "kids":
      return <Baby className={cls} />;
    case "gum":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M4 14 C4 10, 8 6, 12 6 C16 6, 20 10, 20 14" />
          <path d="M4 14 C4 18, 7 20, 9 20" />
          <path d="M20 14 C20 18, 17 20, 15 20" />
          <path d="M9 20 L9 17 C9 16, 10 15, 12 15 C14 15, 15 16, 15 17 L15 20" />
        </svg>
      );
    case "cosmetic":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2 L12 5" /><path d="M12 19 L12 22" />
          <path d="M4.22 4.22 L6.34 6.34" /><path d="M17.66 17.66 L19.78 19.78" />
          <path d="M2 12 L5 12" /><path d="M19 12 L22 12" />
          <path d="M4.22 19.78 L6.34 17.66" /><path d="M17.66 6.34 L19.78 4.22" />
        </svg>
      );
    case "veneer":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M7 3 C5 3, 4 5, 4 8 L5 18 C5.5 20, 7 21, 9 21 C11 21, 12 19.5, 12 19.5 C12 19.5, 13 21, 15 21 C17 21, 18.5 20, 19 18 L20 8 C20 5, 19 3, 17 3 Z" />
          <path d="M7 3 L9 8 L12 6 L15 8 L17 3" />
        </svg>
      );
    case "emergency":
      return <AlertTriangle className={cls} />;
    default:
      return <Heart className={cls} />;
  }
};

/* ─── Color Maps ──────────────────────────────────────── */
const categoryGradient: Record<string, string> = {
  Restorative: "from-teal-500 to-teal-700",
  Cosmetic: "from-blue-500 to-teal-500",
  Orthodontics: "from-purple-500 to-blue-500",
  Periodontics: "from-green-500 to-teal-600",
  Preventive: "from-pink-400 to-rose-500",
  Emergency: "from-red-500 to-orange-500",
};

const categoryBadge: Record<string, { bg: string; text: string }> = {
  Restorative: { bg: "rgba(13,148,136,0.08)", text: "#0f766e" },
  Cosmetic: { bg: "rgba(59,130,246,0.08)", text: "#1d4ed8" },
  Orthodontics: { bg: "rgba(168,85,247,0.08)", text: "#7e22ce" },
  Periodontics: { bg: "rgba(34,197,94,0.08)", text: "#15803d" },
  Preventive: { bg: "rgba(236,72,153,0.08)", text: "#be185d" },
  Emergency: { bg: "rgba(239,68,68,0.08)", text: "#b91c1c" },
};

/* ─── Service Card ─────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" as any },
  }),
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const gradient = categoryGradient[service.category] ?? "from-teal-500 to-blue-500";
  const badge = categoryBadge[service.category] ?? { bg: "rgba(13,148,136,0.08)", text: "#0f766e" };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.25 } }}
      layout
      whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" as any } }}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-teal-100/60 transition-shadow duration-300"
    >
      {/* Top accent */}
      <div className={`h-1 w-full bg-gradient-to-r ${gradient} group-hover:h-1.5 transition-all duration-300`} />

      {/* Popular badge */}
      {service.popular && (
        <div className="absolute top-5 right-4 z-10">
          <span
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)" }}
          >
            <Star className="w-3 h-3 fill-white" />
            Popular
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring" as any, stiffness: 260, damping: 18 }}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient} text-white mb-4 shadow-md`}
        >
          <ServiceIcon iconKey={service.icon} className="w-7 h-7" />
        </motion.div>

        {/* Category badge */}
        <span
          className="inline-block self-start px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-3"
          style={{ background: badge.bg, color: badge.text, border: `1px solid ${badge.bg}` }}
        >
          {service.category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 group-hover:text-teal-700 transition-colors duration-200 leading-snug"
          style={{ color: "#0f172a" }}>
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#64748b" }}>
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-1.5 mb-5">
          {service.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2 text-xs" style={{ color: "#475569" }}>
              <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "#0d9488" }} />
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* Meta row */}
        <div className="flex items-center gap-1.5 text-xs mb-5" style={{ color: "#94a3b8" }}>
          <Clock className="w-3.5 h-3.5" />
          <span>{service.duration}</span>
        </div>

        {/* Divider + Price + CTA */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-medium mb-0.5" style={{ color: "#94a3b8" }}>
              Starting from
            </p>
            <p className="text-sm font-bold" style={{ color: "#0d9488" }}>
              {service.price}
            </p>
          </div>
          <Link
            href="/contact"
            className="flex items-center gap-1.5 text-xs font-semibold rounded-xl px-4 py-2 transition-all duration-200 text-white shrink-0 hover:shadow-lg hover:shadow-teal-200"
            style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)" }}
          >
            Book Now
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Client Component ────────────────────────────── */
export default function ServicesClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-60px 0px" });

  const filtered = activeCategory === "All"
    ? services
    : services.filter((s) => s.category === activeCategory);

  return (
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>
      {/* Background blobs */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "var(--color-teal-500)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl pointer-events-none"
        style={{ background: "var(--color-blue-500)" }}
      />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={headerRef}
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
              color: "#0f766e",
            }}
          >
            <Zap className="w-4 h-4" />
            World-Class Treatments
          </span>

          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-5 leading-tight" style={{ color: "#0f172a" }}>
            Everything Your{" "}
            <span className="gradient-text">Smile Needs</span>
          </h2>

          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: "#64748b" }}>
            From routine check-ups to complete smile transformations — every treatment delivered with precision,
            care, and cutting-edge technology.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          <Filter className="w-4 h-4 shrink-0" style={{ color: "#94a3b8" }} />
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-250 focus:outline-none"
              style={
                activeCategory === cat
                  ? {
                      background: "linear-gradient(135deg, #0d9488, #0f766e)",
                      color: "#fff",
                      boxShadow: "0 8px 20px rgba(13,148,136,0.35)",
                    }
                  : {
                      background: "#fff",
                      color: "#475569",
                      border: "1.5px solid #e2e8f0",
                    }
              }
            >
              {activeCategory === cat && (
                <motion.span
                  layoutId="activePill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(135deg, #0d9488, #0f766e)", zIndex: -1 }}
                  transition={{ type: "spring" as any, stiffness: 350, damping: 30 }}
                />
              )}
              {cat}
              {cat !== "All" && (
                <span
                  className="ml-1.5 text-xs"
                  style={{ opacity: 0.7 }}
                >
                  ({services.filter((s) => s.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Count display */}
        <motion.p
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm mb-8"
          style={{ color: "#94a3b8" }}
        >
          Showing{" "}
          <span className="font-semibold" style={{ color: "#0d9488" }}>
            {filtered.length}
          </span>{" "}
          {filtered.length === 1 ? "service" : "services"}
          {activeCategory !== "All" && ` in ${activeCategory}`}
        </motion.p>

        {/* Services grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 p-8 rounded-3xl"
          style={{
            background: "linear-gradient(135deg, rgba(13,148,136,0.06), rgba(59,130,246,0.06))",
            border: "1px solid rgba(13,148,136,0.12)",
          }}
        >
          <div className="text-center sm:text-left">
            <p className="font-bold text-xl" style={{ color: "#0f172a" }}>
              Not sure which treatment you need?
            </p>
            <p className="text-sm mt-1" style={{ color: "#64748b" }}>
              Book a free consultation — our specialists will create your personalised treatment plan.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm text-white hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}
          >
            Book Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

