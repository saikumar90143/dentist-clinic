"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, X, Star, Quote, Volume2, VolumeX } from "lucide-react";
import { testimonials, Testimonial } from "@/lib/data/testimonials";

/* ─── Video thumbnail gradient palettes ─────────────────────────────── */
const videoGradients = [
  "from-teal-400 via-teal-600 to-blue-700",
  "from-blue-500 via-indigo-600 to-purple-700",
  "from-emerald-400 via-teal-500 to-cyan-600",
];

const patientEmojis = ["😊", "😁", "🦷"];

/* ─── 3 testimonials that have isVideo flag ─────────────────────────── */
const videoTestimonials = testimonials.filter((t) => t.isVideo).slice(0, 3);
/* ─── 3 text testimonials (non-video) ───────────────────────────────── */
const textTestimonials = testimonials.filter((t) => !t.isVideo).slice(0, 3);

/* ─── Star Rating helper ─────────────────────────────────────────────── */
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className="w-3.5 h-3.5"
        style={{
          fill: i < rating ? "var(--color-gold-500)" : "transparent",
          color: i < rating ? "var(--color-gold-500)" : "#cbd5e1",
        }}
      />
    ))}
  </div>
);

/* ─── Video Modal ────────────────────────────────────────────────────── */
interface VideoModalProps {
  testimonial: Testimonial | null;
  onClose: () => void;
}

function VideoModal({ testimonial, onClose }: VideoModalProps) {
  if (!testimonial) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: "spring" as any, damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Video embed placeholder */}
          <div className="relative aspect-video w-full bg-slate-950">
            <iframe
              src="about:blank"
              className="w-full h-full"
              title={`${testimonial.name} testimonial video`}
              allowFullScreen
            />
            {/* Overlay for placeholder state */}
            <div className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0d9488 0%, #3b82f6 100%)" }}
            >
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                <Play className="w-10 h-10 text-white fill-white ml-1" />
              </div>
              <p className="text-white/80 text-sm font-medium">Video Testimonial</p>
              <p className="text-white font-bold text-lg mt-1">{testimonial.name}</p>
              <span className="mt-2 px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ background: "rgba(255,255,255,0.2)" }}>
                {testimonial.treatment}
              </span>
            </div>
          </div>

          {/* Patient info */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-bold text-white"
                style={{ background: "linear-gradient(135deg, var(--color-teal-600), var(--color-blue-500))" }}
              >
                {testimonial.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold text-white">{testimonial.name}</h4>
                  <StarRating rating={testimonial.rating} />
                </div>
                <p className="text-slate-400 text-sm mb-1">{testimonial.location} · {testimonial.date}</p>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                  style={{ background: "rgba(13,148,136,0.2)", color: "var(--color-teal-400)" }}>
                  {testimonial.treatment}
                </span>
                <p className="text-slate-300 text-sm mt-3 leading-relaxed">{testimonial.review}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Video Card ─────────────────────────────────────────────────────── */
interface VideoCardProps {
  testimonial: Testimonial;
  index: number;
  onClick: () => void;
}

function VideoCard({ testimonial, index, onClick }: VideoCardProps) {
  const [hovered, setHovered] = useState(false);
  const gradient = videoGradients[index % videoGradients.length];
  const emoji = patientEmojis[index % patientEmojis.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" as any }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow duration-300"
      style={{ aspectRatio: "16/10" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Gradient thumbnail */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />

      {/* Animated overlay on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-black/30"
      />

      {/* Decorative circles */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 blur-lg" />
      <div className="absolute bottom-8 left-6 w-24 h-24 rounded-full bg-white/5 blur-xl" />

      {/* Emoji */}
      <div className="absolute top-5 left-5 text-4xl">{emoji}</div>

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: hovered ? 1.15 : 1 }}
          transition={{ type: "spring" as any, stiffness: 280, damping: 20 }}
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
        >
          <Play
            className="w-7 h-7 ml-1"
            style={{ color: "var(--color-teal-600)", fill: "var(--color-teal-600)" }}
          />
        </motion.div>
      </div>

      {/* Muted icon */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
        <VolumeX className="w-4 h-4 text-white/70" />
      </div>

      {/* Bottom info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-white font-bold text-sm leading-tight">{testimonial.name}</p>
            <p className="text-white/70 text-xs mt-0.5">{testimonial.location}</p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
            style={{ background: "rgba(13,148,136,0.85)" }}>
            {testimonial.treatment}
          </span>
        </div>
        <StarRating rating={testimonial.rating} />
      </div>

      {/* Duration badge */}
      <div className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
        style={{ background: "rgba(0,0,0,0.5)" }}>
        ▶ Watch Story
      </div>
    </motion.div>
  );
}

/* ─── Text Testimonial Card ──────────────────────────────────────────── */
function TextTestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.4 + index * 0.1, ease: "easeOut" as any }}
      className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col"
    >
      {/* Quote icon */}
      <div
        className="absolute top-4 right-5 opacity-10"
        style={{ color: "var(--color-teal-600)" }}
      >
        <Quote className="w-10 h-10" />
      </div>

      {/* Stars */}
      <StarRating rating={testimonial.rating} />

      {/* Review text */}
      <p className="text-slate-600 text-sm leading-relaxed mt-3 flex-1 line-clamp-4">
        &ldquo;{testimonial.review}&rdquo;
      </p>

      {/* Divider */}
      <div className="border-t border-slate-100 mt-4 pt-4 flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white text-sm"
          style={{ background: "linear-gradient(135deg, var(--color-teal-500), var(--color-blue-500))" }}
        >
          {testimonial.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-slate-800 text-sm truncate">{testimonial.name}</p>
          <p className="text-slate-400 text-xs">{testimonial.treatment}</p>
        </div>
        <div className="ml-auto text-right flex-shrink-0">
          <p className="text-slate-400 text-xs">{testimonial.date}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<Testimonial | null>(null);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "var(--color-teal-500)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "var(--color-blue-500)" }}
      />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" as any }}
          className="text-center mb-14"
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border"
            style={{
              background: "rgba(13,148,136,0.08)",
              borderColor: "rgba(13,148,136,0.2)",
              color: "var(--color-teal-700)",
            }}
          >
            <span className="text-base">🎬</span>
            Patient Stories
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight font-display"
            style={{ color: "var(--color-navy-900)" }}>
            Real Patients,{" "}
            <span className="gradient-text">Real Results</span>
          </h2>

          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Hear directly from our patients about their smile transformation journeys
            at SmileCraft Dental Clinic.
          </p>
        </motion.div>

        {/* Video testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {videoTestimonials.map((t, i) => (
            <VideoCard
              key={t.id}
              testimonial={t}
              index={i}
              onClick={() => setActiveVideo(t)}
            />
          ))}
        </div>

        {/* Divider with label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="flex-1 border-t border-slate-200" />
          <span className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium text-slate-500 border border-slate-200 bg-white">
            ⭐ Written Reviews
          </span>
          <div className="flex-1 border-t border-slate-200" />
        </motion.div>

        {/* Text testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {textTestimonials.map((t, i) => (
            <TextTestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>

        {/* Overall rating bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.7 }}
          className="mt-12 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6"
          style={{ background: "linear-gradient(135deg, var(--color-navy-900), #0d4f4a)" }}
        >
          <div className="text-center sm:text-left">
            <div className="flex items-end gap-2 justify-center sm:justify-start">
              <span className="text-6xl font-bold text-white leading-none">4.9</span>
              <div className="mb-2">
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white/60 text-sm">out of 5</span>
              </div>
            </div>
            <p className="text-white/70 text-sm mt-1">Based on 1,247+ verified reviews</p>
          </div>

          <div className="flex-1 w-full sm:w-auto space-y-2">
            {[
              { label: "5 stars", pct: 94 },
              { label: "4 stars", pct: 4 },
              { label: "3 stars", pct: 1 },
              { label: "2 stars", pct: 1 },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3">
                <span className="text-white/60 text-xs w-14 text-right flex-shrink-0">{row.label}</span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${row.pct}%` } : {}}
                    transition={{ duration: 1, delay: 0.9, ease: "easeOut" as any }}
                    className="h-full rounded-full"
                    style={{ background: "var(--color-gold-500)" }}
                  />
                </div>
                <span className="text-white/50 text-xs w-8 flex-shrink-0">{row.pct}%</span>
              </div>
            ))}
          </div>

          <div className="sm:ml-4 text-center flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(13,148,136,0.3)" }}>
                <Volume2 className="w-4 h-4 text-teal-400" />
              </div>
              <span className="text-white text-sm font-medium">Google Reviews</span>
            </div>
            <p className="text-white/50 text-xs">Independently verified</p>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal testimonial={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  );
}

