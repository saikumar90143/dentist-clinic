"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Sparkles, Camera, RefreshCcw, CalendarDays, ChevronRight, CheckCircle2, Zap } from "lucide-react";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────────────────── */
type Phase = "idle" | "preview" | "analyzing" | "result";

/* ─── Animated Gear / AI Graphic ────────────────────────────────────── */
function AIGraphic() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-8">
      {/* Outer orbit */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Spinning orbit ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-dashed"
          style={{ borderColor: "rgba(13,148,136,0.3)" }}
        />
        {/* Spinning orbit ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border-2 border-dashed"
          style={{ borderColor: "rgba(59,130,246,0.2)" }}
        />
        {/* Orbiting dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-lg"
            style={{ background: "var(--color-teal-500)" }}
          />
        </motion.div>
        {/* Orbiting dot 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4"
        >
          <div
            className="absolute bottom-0 right-0 w-2 h-2 rounded-full"
            style={{ background: "var(--color-blue-500)" }}
          />
        </motion.div>

        {/* Center brain/AI icon */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl text-4xl"
          style={{ background: "linear-gradient(135deg, var(--color-teal-600), var(--color-blue-500))" }}
        >
          🧠
        </motion.div>
      </div>

      {/* Floating sparkle dots */}
      {[
        { top: "10%", left: "10%", delay: 0 },
        { top: "20%", right: "8%", delay: 0.5 },
        { bottom: "15%", left: "15%", delay: 1 },
        { bottom: "20%", right: "12%", delay: 0.7 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={pos as React.CSSProperties}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2, delay: pos.delay as number, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4" style={{ color: "var(--color-teal-400)" }} />
        </motion.div>
      ))}

      <div className="mt-6 text-center space-y-2">
        <p className="font-semibold" style={{ color: "var(--color-navy-900)" }}>
          AI-Powered Smile Analysis
        </p>
        <p className="text-slate-500 text-sm max-w-xs">
          Our neural network is trained on 50,000+ smile transformations
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-3">
          {["Tooth Alignment", "Shade Analysis", "Symmetry Score", "Gum Health"].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs font-medium border"
              style={{
                background: "rgba(13,148,136,0.07)",
                borderColor: "rgba(13,148,136,0.2)",
                color: "var(--color-teal-700)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Progress Bar ───────────────────────────────────────────────────── */
function ProgressBar({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const steps = [
    "Detecting facial landmarks…",
    "Analyzing tooth structure…",
    "Applying enhancement model…",
    "Generating your smile preview…",
  ];
  const [stepIndex, setStepIndex] = useState(0);

  // Auto-advance progress
  useState(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1.5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        // Update step label
        if (next > 25 && stepIndex === 0) setStepIndex(1);
        else if (next > 55 && stepIndex === 1) setStepIndex(2);
        else if (next > 80 && stepIndex === 2) setStepIndex(3);
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex flex-col items-center justify-center h-full py-8 px-6 space-y-6">
      {/* Spinning gear animation */}
      <div className="relative w-24 h-24">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 flex items-center justify-center text-5xl"
        >
          ⚙️
        </motion.div>
        <motion.div
          className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          ✨
        </motion.div>
      </div>

      <div className="w-full space-y-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium" style={{ color: "var(--color-teal-700)" }}>
            {steps[stepIndex]}
          </span>
          <span className="font-bold" style={{ color: "var(--color-teal-600)" }}>
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress track */}
        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--color-teal-500), var(--color-blue-500))",
            }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Step indicators */}
        <div className="grid grid-cols-4 gap-1 mt-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                background: i <= stepIndex
                  ? "linear-gradient(90deg, var(--color-teal-500), var(--color-blue-500))"
                  : "#e2e8f0",
              }}
            />
          ))}
        </div>
      </div>

      <p className="text-slate-500 text-xs text-center">
        Our AI is working its magic on your smile ✨
      </p>
    </div>
  );
}

/* ─── Result Panel ───────────────────────────────────────────────────── */
function ResultPanel({ imageUrl }: { imageUrl: string }) {
  const [activeTab, setActiveTab] = useState<"before" | "after">("after");

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="w-5 h-5" style={{ color: "var(--color-teal-600)" }} />
        <h3 className="font-bold text-slate-800">Your Smile Transformation Preview</h3>
      </div>

      {/* Tab switcher */}
      <div
        className="flex rounded-xl p-1 mb-4 gap-1"
        style={{ background: "#f1f5f9" }}
      >
        {(["before", "after"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all duration-250"
            style={
              activeTab === tab
                ? {
                    background: "white",
                    color: "var(--color-teal-700)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }
                : { color: "#64748b" }
            }
          >
            {tab === "after" ? "✨ " : "📷 "}{tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Image display */}
      <div className="relative rounded-2xl overflow-hidden flex-1 min-h-[220px] bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={activeTab === "after" ? "Enhanced smile" : "Original photo"}
              className="w-full h-full object-cover"
              style={
                activeTab === "after"
                  ? {
                      filter: "brightness(1.12) contrast(1.08) saturate(1.15)",
                    }
                  : {}
              }
            />

            {/* After overlay effects */}
            {activeTab === "after" && (
              <>
                {/* Teal glow overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 70%, rgba(13,148,136,0.18) 0%, transparent 65%)",
                  }}
                />
                {/* Sparkle overlays */}
                {[
                  { top: "12%", left: "18%", size: "text-xl", delay: 0 },
                  { top: "8%", right: "20%", size: "text-2xl", delay: 0.3 },
                  { bottom: "20%", left: "10%", size: "text-lg", delay: 0.6 },
                  { bottom: "15%", right: "15%", size: "text-xl", delay: 0.9 },
                ].map((s, i) => (
                  <motion.span
                    key={i}
                    className={`absolute ${s.size} pointer-events-none`}
                    style={s as React.CSSProperties}
                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                    transition={{ duration: 2, delay: s.delay as number, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                ))}
                {/* Enhanced label */}
                <div
                  className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5"
                  style={{ background: "linear-gradient(135deg, var(--color-teal-600), var(--color-blue-500))" }}
                >
                  <Sparkles className="w-3 h-3" />
                  Enhanced Smile
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {[
          { label: "Brightness", value: "+28%", icon: "☀️" },
          { label: "Symmetry", value: "94%", icon: "✨" },
          { label: "Confidence", value: "High", icon: "💫" },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-xl p-3 text-center border"
            style={{ background: "rgba(13,148,136,0.05)", borderColor: "rgba(13,148,136,0.15)" }}
          >
            <div className="text-lg mb-0.5">{m.icon}</div>
            <div className="font-bold text-sm" style={{ color: "var(--color-teal-700)" }}>{m.value}</div>
            <div className="text-slate-500 text-xs">{m.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        href="/book-appointment"
        className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
        style={{ background: "linear-gradient(135deg, var(--color-teal-600), var(--color-blue-500))" }}
      >
        <CalendarDays className="w-4 h-4" />
        Book Smile Consultation
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function AISmileAssessment() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setPhase("preview");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleAnalyze = () => setPhase("analyzing");

  const handleReset = () => {
    setPhase("idle");
    setImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-slate-100"
      style={{ background: "white" }}>
      {/* Background gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, var(--color-teal-500), var(--color-blue-500))" }}
      />

      <div className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border"
                style={{
                  background: "rgba(13,148,136,0.08)",
                  borderColor: "rgba(13,148,136,0.25)",
                  color: "var(--color-teal-700)",
                }}
              >
                <Zap className="w-3 h-3" />
                AI-Powered
              </span>
            </div>
            <h3 className="text-2xl font-bold font-display" style={{ color: "var(--color-navy-900)" }}>
              See Your Future Smile
            </h3>
            <p className="text-slate-500 text-sm mt-1.5 max-w-sm">
              Upload a selfie and our AI will show you a preview of your smile transformation
            </p>
          </div>
          {(phase === "preview" || phase === "result") && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200"
            >
              <RefreshCcw className="w-4 h-4" />
              Reset
            </button>
          )}
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Upload panel */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
              📷 Your Photo
            </p>

            {/* Drop zone or preview */}
            <AnimatePresence mode="wait">
              {phase === "idle" ? (
                <motion.div
                  key="dropzone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-h-[280px] relative"
                >
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className="h-full min-h-[280px] rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 border-2 border-dashed"
                    style={{
                      borderColor: isDragging
                        ? "var(--color-teal-500)"
                        : "rgba(13,148,136,0.35)",
                      background: isDragging
                        ? "rgba(13,148,136,0.06)"
                        : "rgba(13,148,136,0.02)",
                    }}
                  >
                    <motion.div
                      animate={isDragging ? { scale: 1.15 } : { scale: 1 }}
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-md"
                      style={{ background: "linear-gradient(135deg, var(--color-teal-100), rgba(59,130,246,0.1))" }}
                    >
                      📸
                    </motion.div>

                    <div className="text-center px-4">
                      <p className="font-semibold text-slate-700 mb-1">Upload Your Smile Photo</p>
                      <p className="text-slate-400 text-sm">
                        {isDragging ? "Drop to upload!" : "Drag & drop or click to browse"}
                      </p>
                      <p className="text-slate-400 text-xs mt-1">JPG, PNG, WEBP · Max 10MB</p>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-md"
                      style={{ background: "linear-gradient(135deg, var(--color-teal-600), var(--color-blue-500))" }}>
                      <Camera className="w-4 h-4" />
                      Choose Photo
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleInputChange}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="photo-preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 relative rounded-2xl overflow-hidden min-h-[280px] bg-slate-100"
                >
                  {imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt="Uploaded smile"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Overlay label */}
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                    style={{ background: "rgba(0,0,0,0.55)" }}>
                    📷 Original
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Analyze button (shown only in preview phase) */}
            {phase === "preview" && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                onClick={handleAnalyze}
                className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 shadow-lg"
                style={{ background: "linear-gradient(135deg, var(--color-teal-600), var(--color-blue-500))" }}
              >
                <Sparkles className="w-4 h-4" />
                Analyze My Smile with AI
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            )}

            {/* Tips */}
            {phase === "idle" && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Tips for best results
                </p>
                {[
                  "Natural smile, good lighting",
                  "Face forward, no heavy filters",
                  "Close-up selfie works best",
                ].map((tip) => (
                  <div key={tip} className="flex items-center gap-2 text-slate-500 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--color-teal-500)" }} />
                    {tip}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: AI panel */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
              ✨ AI Preview
            </p>

            <div
              className="flex-1 min-h-[280px] rounded-2xl overflow-hidden"
              style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
            >
              <AnimatePresence mode="wait">
                {phase === "idle" && (
                  <motion.div
                    key="ai-graphic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative h-full"
                  >
                    <AIGraphic />
                  </motion.div>
                )}

                {phase === "preview" && (
                  <motion.div
                    key="ai-waiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center gap-4 p-8 text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-md"
                      style={{ background: "linear-gradient(135deg, var(--color-teal-100), rgba(59,130,246,0.1))" }}
                    >
                      🤖
                    </motion.div>
                    <div>
                      <p className="font-semibold text-slate-700">Ready to Analyze!</p>
                      <p className="text-slate-400 text-sm mt-1">
                        Click &lsquo;Analyze My Smile&rsquo; to see your transformation
                      </p>
                    </div>
                  </motion.div>
                )}

                {phase === "analyzing" && (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full p-6"
                  >
                    <ProgressBar onComplete={() => setPhase("result")} />
                  </motion.div>
                )}

                {phase === "result" && imageUrl && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="h-full p-5"
                  >
                    <ResultPanel imageUrl={imageUrl} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-slate-400 text-center mt-6">
          🔒 Privacy first — photos are processed locally and never stored. This is a visual mockup for educational purposes.
        </p>
      </div>
    </div>
  );
}
