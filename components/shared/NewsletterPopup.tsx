"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, CheckCircle, Sparkles } from "lucide-react";

const STORAGE_KEY = "smilecraft_newsletter_dismissed";
const DISMISS_DAYS = 14;
const SHOW_AFTER_MS = 30_000; // 30 seconds

// Decorative SVG tooth icon used as accent art
function ToothIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 64 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 4C10 4 4 10 4 18C4 26 8 32 8 40C8 56 12 76 20 76C24 76 26 68 28 60C29 56 30 54 32 54C34 54 35 56 36 60C38 68 40 76 44 76C52 76 56 56 56 40C56 32 60 26 60 18C60 10 54 4 48 4C42 4 38 8 32 8C26 8 22 4 16 4Z"
        strokeWidth="3"
        strokeLinejoin="round"
        stroke="currentColor"
        fill="none"
      />
    </svg>
  );
}

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shouldShow = useCallback((): boolean => {
    if (typeof window === "undefined") return false;
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) return true;
    const dismissedAt = parseInt(dismissed, 10);
    const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
    return daysSince >= DISMISS_DAYS;
  }, []);

  const dismissPopup = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!shouldShow()) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, SHOW_AFTER_MS);

    return () => clearTimeout(timer);
  }, [shouldShow]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setIsSubmitting(false);
    setSubmitted(true);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setTimeout(() => setIsVisible(false), 3500);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.35 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.88, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as any, damping: 20, stiffness: 260, delay: 0.05 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.22, ease: "easeIn" },
    },
  };

  const toothVariants = {
    animate: {
      rotate: [0, 8, -6, 4, 0],
      y: [0, -6, 0, -3, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={dismissPopup}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(15, 23, 42, 0.72)", backdropFilter: "blur(6px)" }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Teal gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(145deg, #0d9488 0%, #0f766e 40%, #134e4a 100%)",
              }}
            />

            {/* Decorative tooth icons */}
            <motion.div
              className="absolute top-3 right-6 opacity-15"
              variants={toothVariants}
              animate="animate"
            >
              <ToothIcon className="w-14 h-14 text-white" />
            </motion.div>
            <motion.div
              className="absolute -bottom-2 left-4 opacity-10"
              variants={toothVariants}
              animate="animate"
              style={{ animationDelay: "1.5s" }}
            >
              <ToothIcon className="w-20 h-20 text-white" />
            </motion.div>
            <motion.div
              className="absolute top-1/2 -left-3 opacity-[0.07]"
              animate={{ rotate: [0, 360], transition: { duration: 20, repeat: Infinity, ease: "linear" } }}
            >
              <ToothIcon className="w-24 h-24 text-white" />
            </motion.div>

            {/* Shimmer overlay */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s linear infinite",
              }}
            />

            {/* Close button */}
            <button
              onClick={dismissPopup}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
              aria-label="Close newsletter popup"
            >
              <X size={16} />
            </button>

            <div className="relative z-10 p-7">
              {!submitted ? (
                <>
                  {/* Discount badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <motion.div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{ background: "#f59e0b", color: "#0f172a" }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Sparkles size={11} />
                      EXCLUSIVE OFFER
                    </motion.div>
                  </div>

                  {/* Headline */}
                  <h2 className="font-display text-3xl font-bold text-white leading-tight mb-2">
                    Get{" "}
                    <span
                      style={{
                        background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      20% Off
                    </span>{" "}
                    Your First Treatment
                  </h2>

                  <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.78)" }}>
                    Subscribe to our newsletter and unlock an exclusive 20% discount on your first
                    dental treatment. Plus, get oral health tips straight to your inbox.
                  </p>

                  {/* Perks */}
                  <ul className="space-y-1.5 mb-5">
                    {[
                      "20% off your first treatment",
                      "Monthly oral health tips & guides",
                      "Early access to special offers",
                    ].map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.85)" }}>
                        <CheckCircle size={13} style={{ color: "#5eead4", flexShrink: 0 }} />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="relative">
                      <Mail
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      />
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.12)",
                          border: "1.5px solid rgba(255,255,255,0.2)",
                          color: "white",
                          fontFamily: "inherit",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                          e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                          e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                        }}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200"
                      style={{
                        background: isSubmitting
                          ? "rgba(255,255,255,0.3)"
                          : "linear-gradient(135deg, #f59e0b, #d97706)",
                        color: isSubmitting ? "rgba(255,255,255,0.7)" : "#0f172a",
                        boxShadow: isSubmitting ? "none" : "0 6px 20px rgba(245,158,11,0.4)",
                      }}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -1 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Subscribing...
                        </span>
                      ) : (
                        "🎁 Claim My 20% Discount"
                      )}
                    </motion.button>
                  </form>

                  <p className="mt-3 text-center text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" as any, damping: 18, stiffness: 250 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  >
                    <CheckCircle size={36} className="text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">Welcome Aboard!</h3>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                    Your 20% discount coupon has been sent to your email. See you at SmileCraft! 😊
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
