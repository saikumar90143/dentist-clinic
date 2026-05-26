"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Clock, CheckCircle } from "lucide-react";

const STORAGE_KEY = "smilecraft_exit_popup_dismissed";
const DISMISS_DAYS = 7;

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shouldShow = useCallback((): boolean => {
    if (typeof window === "undefined") return false;
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) return true;
    const dismissedAt = parseInt(dismissed, 10);
    const now = Date.now();
    const daysSinceDismissed = (now - dismissedAt) / (1000 * 60 * 60 * 24);
    return daysSinceDismissed >= DISMISS_DAYS;
  }, []);

  const dismissPopup = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!shouldShow()) return;

    let triggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered) return;
      // Only trigger when mouse leaves from the top of the viewport
      if (e.clientY <= 0) {
        triggered = true;
        // Small delay to avoid flickering
        setTimeout(() => setIsVisible(true), 200);
      }
    };

    // Wait 3 seconds before enabling the listener so it doesn't trigger immediately
    const enableTimer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(enableTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldShow]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setTimeout(() => setIsVisible(false), 3000);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as any, damping: 22, stiffness: 280, delay: 0.05 },
    },
    exit: {
      opacity: 0,
      y: 60,
      scale: 0.94,
      transition: { duration: 0.22, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={dismissPopup}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(8px)" }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glass background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.97) 0%, rgba(240,253,250,0.98) 100%)",
              }}
            />

            {/* Decorative blobs */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #0d9488, #3b82f6)" }}
            />
            <div
              className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full opacity-15"
              style={{ background: "radial-gradient(circle, #f59e0b, #0d9488)" }}
            />

            <div className="relative p-8">
              {/* Close button */}
              <button
                onClick={dismissPopup}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              {!submitted ? (
                <>
                  {/* Top badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(13,148,136,0.12)",
                        color: "#0d9488",
                        border: "1px solid rgba(13,148,136,0.25)",
                      }}
                    >
                      <Gift size={12} />
                      FREE OFFER
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(245,158,11,0.12)",
                        color: "#d97706",
                        border: "1px solid rgba(245,158,11,0.25)",
                      }}
                    >
                      <Clock size={11} />
                      Limited Slots
                    </span>
                  </div>

                  {/* Headline */}
                  <h2
                    className="font-display text-3xl font-bold leading-tight mb-2"
                    style={{ color: "#0f172a" }}
                  >
                    Wait! Before You Go...
                  </h2>

                  {/* Sub-headline */}
                  <p
                    className="text-xl font-semibold mb-3"
                    style={{
                      background: "linear-gradient(135deg, #0d9488, #3b82f6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Get Your FREE Dental Consultation
                  </p>

                  {/* Description */}
                  <div
                    className="flex items-start gap-2 p-3 rounded-xl mb-6 text-sm"
                    style={{
                      background: "rgba(245,158,11,0.08)",
                      border: "1px solid rgba(245,158,11,0.2)",
                      color: "#92400e",
                    }}
                  >
                    <Clock size={15} className="mt-0.5 shrink-0" style={{ color: "#d97706" }} />
                    <span>
                      <strong>Only 5 slots left this week!</strong> Claim your complimentary
                      consultation with our senior dentist — worth ₹1,500, completely free.
                    </span>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          background: "#f8fafc",
                          border: "1.5px solid #e2e8f0",
                          color: "#0f172a",
                          fontFamily: "inherit",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#0d9488";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#e2e8f0";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                        style={{
                          background: "#f8fafc",
                          border: "1.5px solid #e2e8f0",
                          color: "#0f172a",
                          fontFamily: "inherit",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#0d9488";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.1)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#e2e8f0";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition-all duration-200 relative overflow-hidden"
                      style={{
                        background: isSubmitting
                          ? "#64748b"
                          : "linear-gradient(135deg, #0d9488, #0f766e)",
                        boxShadow: isSubmitting
                          ? "none"
                          : "0 8px 25px rgba(13,148,136,0.35)",
                      }}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -1 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
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
                          Claiming your slot...
                        </span>
                      ) : (
                        "✨ Claim Free Consultation"
                      )}
                    </motion.button>
                  </form>

                  {/* No thanks */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={dismissPopup}
                      className="text-xs transition-colors duration-200"
                      style={{ color: "#94a3b8" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#64748b")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                    >
                      No thanks, I don&apos;t want a free consultation
                    </button>
                  </div>

                  {/* Trust signals */}
                  <div className="mt-5 pt-4 flex items-center justify-center gap-4" style={{ borderTop: "1px solid #e2e8f0" }}>
                    {["15,000+ Patients", "4.9★ Rating", "No Spam"].map((text) => (
                      <span key={text} className="text-xs" style={{ color: "#64748b" }}>
                        ✓ {text}
                      </span>
                    ))}
                  </div>
                </>
              ) : (
                /* Success state */
                <motion.div
                  className="text-center py-6"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" as any, damping: 20, stiffness: 260 }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(13,148,136,0.12)" }}
                  >
                    <CheckCircle size={36} style={{ color: "#0d9488" }} />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "#0f172a" }}>
                    You&apos;re All Set!
                  </h3>
                  <p className="text-sm mb-1" style={{ color: "#64748b" }}>
                    We&apos;ve reserved your free consultation slot.
                  </p>
                  <p className="text-sm" style={{ color: "#64748b" }}>
                    Our team will call you within{" "}
                    <strong style={{ color: "#0d9488" }}>24 hours</strong> to confirm.
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
