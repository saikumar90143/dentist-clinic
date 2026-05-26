"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Star, Clock, Zap, Heart, Shield, Smile, Baby, Scissors, Sparkles, AlertTriangle } from "lucide-react";
import { services, Service } from "@/lib/data/services";

/* ─── Icon map ─────────────────────────────────────── */
const ServiceIcon = ({ iconKey, className }: { iconKey: string; className?: string }) => {
  const cls = className ?? "w-7 h-7";

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
          <path d="M12 2 L12 5" />
          <path d="M12 19 L12 22" />
          <path d="M4.22 4.22 L6.34 6.34" />
          <path d="M17.66 17.66 L19.78 19.78" />
          <path d="M2 12 L5 12" />
          <path d="M19 12 L22 12" />
          <path d="M4.22 19.78 L6.34 17.66" />
          <path d="M17.66 6.34 L19.78 4.22" />
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

/* ─── Category colour map ───────────────────────────── */
const categoryColors: Record<string, string> = {
  Restorative: "from-teal-500 to-teal-700",
  Cosmetic: "from-blue-500 to-teal-500",
  Orthodontics: "from-purple-500 to-blue-500",
  Periodontics: "from-green-500 to-teal-600",
  Preventive: "from-pink-400 to-rose-500",
  Emergency: "from-red-500 to-orange-500",
};

const categoryBg: Record<string, string> = {
  Restorative: "bg-teal-50 text-teal-700",
  Cosmetic: "bg-blue-50 text-blue-700",
  Orthodontics: "bg-purple-50 text-purple-700",
  Periodontics: "bg-green-50 text-green-700",
  Preventive: "bg-pink-50 text-rose-700",
  Emergency: "bg-red-50 text-red-700",
};

/* ─── Single Service Card ───────────────────────────── */
const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const gradientClass = categoryColors[service.category] ?? "from-teal-500 to-blue-500";
  const badgeClass = categoryBg[service.category] ?? "bg-teal-50 text-teal-700";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" as any }}
      whileHover={{ y: -8, transition: { duration: 0.28, ease: "easeOut" as any } }}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-teal-100 transition-shadow duration-300"
    >
      {/* Gradient top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${gradientClass} group-hover:h-1.5 transition-all duration-300`} />

      {/* Popular badge */}
      {service.popular && (
        <div className="absolute top-5 right-4 z-10">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)" }}>
            <Star className="w-3 h-3 fill-white" />
            Popular
          </span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        {/* Icon container */}
        <motion.div
          whileHover={{ rotate: 12, scale: 1.12 }}
          transition={{ type: "spring" as any, stiffness: 260, damping: 18 }}
          className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradientClass} text-white mb-4 shadow-md`}
        >
          <ServiceIcon iconKey={service.icon} className="w-6 h-6" />
        </motion.div>

        {/* Category badge */}
        <span className={`inline-block self-start px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase mb-2 ${badgeClass}`}>
          {service.category}
        </span>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors duration-200 leading-snug">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">
          {service.description}
        </p>

        {/* Duration pill */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>{service.duration}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
          {/* Price */}
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium mb-0.5">Starting from</p>
            <p className="text-sm font-bold" style={{ color: "var(--color-teal-600)" }}>
              {service.price}
            </p>
          </div>

          {/* Learn More */}
          <Link
            href={`/services/${service.slug}`}
            className="flex items-center gap-1 text-xs font-semibold rounded-lg px-3 py-1.5 transition-all duration-200 text-teal-700 bg-teal-50 hover:bg-teal-600 hover:text-white"
          >
            Learn More
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Component ────────────────────────────────── */
export default function ServicesPreview() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>
      {/* Decorative background blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "var(--color-teal-500)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "var(--color-blue-500)" }}
      />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as any }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border"
            style={{
              background: "rgba(13,148,136,0.08)",
              borderColor: "rgba(13,148,136,0.2)",
              color: "var(--color-teal-700)",
            }}>
            <Zap className="w-4 h-4" />
            Our Services
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight font-display">
            World-Class{" "}
            <span className="gradient-text">Dental Treatments</span>
          </h2>

          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            From routine check-ups to complete smile transformations — every treatment
            delivered with precision, care, and cutting-edge technology.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.8, ease: "easeOut" as any }}
          className="flex justify-center mt-14"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, var(--color-teal-600), var(--color-blue-500))" }}
          >
            View All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

