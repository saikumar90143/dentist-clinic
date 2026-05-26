"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ArrowRight, Images, ChevronLeft, ChevronRight, GripVertical } from "lucide-react";

/* ─── Transformation case data ─────────────────────── */
interface TransformCase {
  id: number;
  label: string;
  procedure: string;
  duration: string;
  beforeEmoji: string;
  afterEmoji: string;
  beforeGradient: string;
  afterGradient: string;
  beforeBg: string;
  afterBg: string;
  highlight: string;
}

const cases: TransformCase[] = [
  {
    id: 1,
    label: "Case 1: Smile Designing + Veneers",
    procedure: "12 e.max Porcelain Veneers",
    duration: "2 Sessions · 3 Weeks",
    beforeEmoji: "😬",
    afterEmoji: "😁",
    beforeGradient: "from-slate-600 via-slate-700 to-slate-800",
    afterGradient: "from-teal-400 via-teal-500 to-cyan-400",
    beforeBg: "#334155",
    afterBg: "#0d9488",
    highlight: "#0d9488",
  },
  {
    id: 2,
    label: "Case 2: Invisible Braces",
    procedure: "Clear Aligner Therapy · Invisalign",
    duration: "14 Months · 28 Aligners",
    beforeEmoji: "😕",
    afterEmoji: "🤩",
    beforeGradient: "from-gray-500 via-gray-600 to-zinc-700",
    afterGradient: "from-blue-400 via-blue-500 to-indigo-500",
    beforeBg: "#4b5563",
    afterBg: "#3b82f6",
    highlight: "#3b82f6",
  },
  {
    id: 3,
    label: "Case 3: Teeth Whitening",
    procedure: "Laser Whitening · 8 Shades Brighter",
    duration: "Single 60-min Session",
    beforeEmoji: "😶",
    afterEmoji: "😍",
    beforeGradient: "from-yellow-700 via-amber-800 to-stone-700",
    afterGradient: "from-amber-300 via-yellow-400 to-teal-400",
    beforeBg: "#92400e",
    afterBg: "#f59e0b",
    highlight: "#f59e0b",
  },
];

/* ─── Draggable Before/After Slider ────────────────── */
const BeforeAfterSlider = ({ tc }: { tc: TransformCase }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5); // 0 = full before, 1 = full after
  const sliderPercent = useTransform(x, [0, 1], ["0%", "100%"]);
  const afterClip = useTransform(x, [0, 1], ["100%", "0%"]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.buttons === 0) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      x.set(ratio);
    },
    [x]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      animate(x, ratio, { duration: 0.25, ease: "easeOut" as any });
    },
    [x]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden cursor-col-resize select-none"
      style={{ height: 340, touchAction: "none" }}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
    >
      {/* BEFORE panel — full width underneath */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${tc.beforeGradient} flex flex-col items-center justify-center`}
      >
        <div className="text-center px-8">
          <div className="text-6xl mb-4">{tc.beforeEmoji}</div>
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-2">
            Before Treatment
          </p>
          <p className="text-white/60 text-sm leading-relaxed font-medium">
            Patient Smile<br />Before Treatment
          </p>
          {/* Tooth-like wavy line decoration */}
          <div className="mt-4 flex justify-center gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-4 rounded-t-full"
                style={{
                  height: i % 2 === 0 ? 20 : 16,
                  background: "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        </div>

        {/* BEFORE label */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-widest text-white bg-black/40 backdrop-blur-sm">
            BEFORE
          </span>
        </div>
      </div>

      {/* AFTER panel — clipped from the right based on slider */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ right: afterClip }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${tc.afterGradient} flex flex-col items-center justify-center`}
          style={{ width: containerRef.current?.offsetWidth ?? "100vw" }}
        >
          <div className="text-center px-8">
            <div className="text-6xl mb-4">{tc.afterEmoji}</div>
            <p className="text-white/70 text-xs uppercase tracking-widest font-semibold mb-2">
              After Treatment ✨
            </p>
            <p className="text-white font-semibold text-sm leading-relaxed">
              After SmileCraft<br />Treatment ✨
            </p>
            {/* Bright tooth row */}
            <div className="mt-4 flex justify-center gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 rounded-t-full"
                  style={{
                    height: i % 2 === 0 ? 20 : 16,
                    background: "rgba(255,255,255,0.75)",
                    boxShadow: "0 0 8px rgba(255,255,255,0.5)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* AFTER label */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-widest text-white bg-white/20 backdrop-blur-sm border border-white/30">
              AFTER
            </span>
          </div>
        </div>
      </motion.div>

      {/* Drag handle line */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 z-20 pointer-events-none"
        style={{ left: sliderPercent, x: "-50%" }}
      >
        <div className="absolute inset-0 w-0.5 mx-auto bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />

        {/* Handle knob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
          <GripVertical className="w-4 h-4 text-slate-400" />
        </div>
      </motion.div>

      {/* Drag hint (shows first time) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-white bg-black/30 backdrop-blur-sm">
          <GripVertical className="w-3 h-3" />
          Drag to compare
        </span>
      </div>
    </div>
  );
};

/* ─── Main Component ────────────────────────────────── */
export default function BeforeAfterSliderSection() {
  const [activeCase, setActiveCase] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const tc = cases[activeCase];

  const goPrev = () => setActiveCase((p) => (p - 1 + cases.length) % cases.length);
  const goNext = () => setActiveCase((p) => (p + 1) % cases.length);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "#f8fafc" }}
    >
      {/* Decorative background elements */}
      <div
        className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: "var(--color-teal-500)" }}
      />
      <div
        className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
        style={{ background: "var(--color-blue-500)" }}
      />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
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
            <Images className="w-4 h-4" />
            Real Results
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-5 leading-tight font-display">
            Smile{" "}
            <span className="gradient-text">Transformations</span>
          </h2>

          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Drag the slider to reveal stunning real-patient smile transformations.
            Every smile tells a story of renewed confidence.
          </p>
        </motion.div>

        {/* Main slider card */}
        <motion.div
          key={activeCase}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" as any }}
          className="max-w-3xl mx-auto"
        >
          <div
            className="rounded-3xl bg-white border border-slate-100 shadow-xl overflow-hidden"
          >
            {/* Case header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b border-slate-100"
              style={{ borderBottomColor: `${tc.highlight}22` }}
            >
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-0.5">
                  {tc.procedure}
                </p>
                <h3 className="font-bold text-slate-800 text-base">{tc.label}</h3>
              </div>
              <span
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                style={{ background: tc.highlight }}
              >
                {tc.duration}
              </span>
            </div>

            {/* Slider */}
            <div className="p-4">
              <BeforeAfterSlider key={activeCase} tc={tc} />
            </div>

            {/* Quick stats row */}
            <div
              className="flex divide-x divide-slate-100 border-t border-slate-100"
            >
              {[
                { label: "Treatment", value: tc.procedure.split("·")[0].trim() },
                { label: "Duration", value: tc.duration },
                { label: "Sessions", value: tc.duration.split("·")[0].trim() },
              ].map((stat) => (
                <div key={stat.label} className="flex-1 text-center py-3.5 px-2">
                  <p className="text-xs text-slate-400 mb-0.5">{stat.label}</p>
                  <p className="text-xs font-bold text-slate-700">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-5 mt-8">
          {/* Prev button */}
          <button
            onClick={goPrev}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center
                       hover:border-teal-400 hover:bg-teal-50 transition-all duration-200 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5 text-slate-500" />
          </button>

          {/* Case tabs */}
          <div className="flex gap-3">
            {cases.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActiveCase(i)}
                className="flex flex-col items-center gap-1.5 group"
              >
                {/* Dot indicator */}
                <motion.div
                  animate={{
                    width: i === activeCase ? 32 : 8,
                    backgroundColor: i === activeCase ? tc.highlight : "#cbd5e1",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" as any }}
                  className="h-2 rounded-full"
                />
                {/* Label (visible only on sm+) */}
                <span
                  className={`hidden sm:block text-[10px] font-semibold transition-colors duration-200 ${
                    i === activeCase ? "text-slate-700" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  Case {c.id}
                </span>
              </button>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={goNext}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center
                       hover:border-teal-400 hover:bg-teal-50 transition-all duration-200 shadow-sm"
          >
            <ChevronRight className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* All cases pill tabs */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {cases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveCase(i)}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                i === activeCase
                  ? "text-white border-transparent shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-teal-300"
              }`}
              style={
                i === activeCase
                  ? { background: tc.highlight, borderColor: tc.highlight }
                  : {}
              }
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-semibold text-sm
                       shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, var(--color-teal-600), var(--color-blue-500))" }}
          >
            <Images className="w-4 h-4" />
            View Full Gallery
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

