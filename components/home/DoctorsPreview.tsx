"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Star, Globe2, CalendarCheck, Award, ChevronRight, Users } from "lucide-react";
import { doctors, Doctor } from "@/lib/data/doctors";

/* ─── Gradient configs per doctor ──────────────────── */
const doctorGradients = [
  {
    ring: "from-teal-400 via-teal-600 to-blue-500",
    avatar: "from-teal-500 to-blue-600",
    btn: "from-teal-600 to-teal-700",
    glow: "rgba(13,148,136,0.25)",
    accent: "#0d9488",
  },
  {
    ring: "from-blue-400 via-purple-500 to-pink-400",
    avatar: "from-blue-500 to-purple-600",
    btn: "from-blue-600 to-blue-700",
    glow: "rgba(59,130,246,0.25)",
    accent: "#3b82f6",
  },
  {
    ring: "from-emerald-400 via-teal-500 to-cyan-400",
    avatar: "from-emerald-500 to-teal-600",
    btn: "from-emerald-600 to-teal-700",
    glow: "rgba(16,185,129,0.25)",
    accent: "#10b981",
  },
];

/* ─── Star rating renderer ─────────────────────────── */
const StarRating = ({ rating, count }: { rating: number; count: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < full
                ? "text-amber-400 fill-amber-400"
                : half && i === full
                ? "text-amber-400 fill-amber-200"
                : "text-slate-200 fill-slate-200"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-slate-700">{rating}</span>
      <span className="text-xs text-slate-400">({count} reviews)</span>
    </div>
  );
};

/* ─── Initials avatar ──────────────────────────────── */
const DoctorAvatar = ({
  name,
  gradientClass,
}: {
  name: string;
  gradientClass: string;
}) => {
  const initials = name
    .replace("Dr. ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`w-full h-full rounded-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}
    >
      <span className="text-white text-3xl font-bold tracking-tight select-none font-display">
        {initials}
      </span>
    </div>
  );
};

/* ─── Single Doctor Card ───────────────────────────── */
const DoctorCard = ({
  doctor,
  index,
}: {
  doctor: Doctor;
  index: number;
}) => {
  const config = doctorGradients[index % doctorGradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.14, ease: "easeOut" as any }}
      whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" as any } }}
      className="group relative flex flex-col rounded-3xl bg-white border border-slate-100 overflow-hidden
                 shadow-md hover:shadow-2xl transition-shadow duration-400"
      style={{ "--glow": config.glow } as React.CSSProperties}
    >
      {/* Top gradient strip */}
      <div
        className={`h-28 w-full bg-gradient-to-br ${config.ring} opacity-10 absolute top-0 left-0`}
      />

      {/* Card content */}
      <div className="relative pt-8 px-6 pb-6 flex flex-col items-center text-center">
        {/* Avatar with gradient ring */}
        <div className="relative mb-5">
          {/* Rotating gradient ring */}
          <div
            className={`absolute -inset-1 rounded-full bg-gradient-to-r ${config.ring} opacity-80`}
            style={{ padding: 2 }}
          />
          <div
            className={`relative w-28 h-28 rounded-full p-[3px] bg-gradient-to-r ${config.ring}`}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
              <DoctorAvatar name={doctor.name} gradientClass={config.avatar} />
            </div>
          </div>

          {/* Experience badge */}
          <div
            className="absolute -bottom-1 -right-1 flex items-center gap-1 px-2.5 py-1 rounded-full
                        text-white text-[11px] font-bold shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${config.accent}, ${config.accent}cc)`,
            }}
          >
            <Award className="w-3 h-3" />
            {doctor.experience}Y
          </div>
        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-slate-900 mb-1 leading-tight font-display">
          {doctor.name}
        </h3>

        {/* Title */}
        <p
          className="text-sm font-semibold mb-1"
          style={{ color: config.accent }}
        >
          {doctor.title}
        </p>

        {/* Specialization */}
        <p className="text-xs text-slate-500 mb-4">{doctor.specialization}</p>

        {/* Star rating */}
        <div className="mb-4">
          <StarRating rating={doctor.rating} count={doctor.reviewCount} />
        </div>

        {/* Languages */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-5">
          <Globe2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: config.accent }} />
          <span>{doctor.languages.join(" · ")}</span>
        </div>

        {/* Qualifications chips */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
          {doctor.qualifications.slice(0, 2).map((q) => {
            const short = q.split("–")[0].trim();
            return (
              <span
                key={q}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600"
              >
                {short}
              </span>
            );
          })}
        </div>

        {/* Book button */}
        <Link
          href={`/doctors/${doctor.slug}`}
          className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl
                     text-white text-sm font-bold transition-all duration-250
                     hover:opacity-90 hover:shadow-lg group"
          style={{
            background: `linear-gradient(135deg, ${config.accent}, ${config.accent}bb)`,
          }}
        >
          <CalendarCheck className="w-4 h-4" />
          Book with {doctor.name.split(" ")[1]}
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

/* ─── Main Component ────────────────────────────────── */
export default function DoctorsPreview() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const previewDoctors = doctors.slice(0, 3);

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #0c3d39 50%, #0f172a 100%)" }}
    >
      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "var(--color-teal-500)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: "var(--color-blue-500)" }}
      />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" as any }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border"
            style={{
              background: "rgba(13,148,136,0.15)",
              borderColor: "rgba(13,148,136,0.3)",
              color: "#2dd4bf",
            }}
          >
            <Users className="w-4 h-4" />
            Our Specialists
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight font-display">
            Meet Our{" "}
            <span className="gradient-text">Expert Team</span>
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Our board-certified specialists bring decades of international training and a
            genuine passion for transforming smiles.
          </p>
        </motion.div>

        {/* Doctors grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {previewDoctors.map((doctor, i) => (
            <DoctorCard key={doctor.id} doctor={doctor} index={i} />
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.7, ease: "easeOut" as any }}
          className="flex flex-wrap justify-center gap-10 mt-14 mb-10"
        >
          {[
            { value: "50+", label: "Years Combined Experience" },
            { value: "10,000+", label: "Happy Patients" },
            { value: "4.9★", label: "Average Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold gradient-text mb-1">{stat.value}</p>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Meet all doctors link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="flex justify-center"
        >
          <Link
            href="/doctors"
            className="group inline-flex items-center gap-2.5 border border-teal-500/40 text-teal-400
                       px-8 py-3.5 rounded-full font-semibold text-sm
                       hover:bg-teal-600 hover:text-white hover:border-teal-600
                       transition-all duration-300"
          >
            Meet All Doctors
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Arrow icon import helper (used in Meet All Doctors)
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

