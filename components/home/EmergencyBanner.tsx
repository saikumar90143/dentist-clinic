"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MessageCircle, AlertCircle, Clock } from "lucide-react";

export default function EmergencyBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-4 sm:py-0">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" as any }}
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #dc2626 0%, #ea580c 40%, #dc2626 70%, #b91c1c 100%)",
        }}
      >
        {/* Animated noise/grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "150px 150px",
          }}
        />

        {/* Glow blobs */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none bg-orange-400" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none bg-red-800" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-96 h-full opacity-10 blur-3xl pointer-events-none bg-yellow-400" />

        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left: Icon + Text */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-6 flex-1">
              {/* Pulsing emergency icon */}
              <div className="relative flex-shrink-0">
                {/* Outer pulse rings */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                  animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" as any }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                  animate={{ scale: [1, 1.3, 1.3], opacity: [0.8, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" as any, delay: 0.3 }}
                />

                {/* Icon circle */}
                <motion.div
                  className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-2 border-white/30"
                  style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>
              </div>

              {/* Text content */}
              <div className="text-center sm:text-left">
                {/* Available Now badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" as any }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 border border-white/20"
                  style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-wide">
                    Available Now · 24/7
                  </span>
                  <Clock className="w-3.5 h-3.5 text-white/70" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-2"
                >
                  Dental Emergency?{" "}
                  <span className="text-yellow-300">We're Available 24/7</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="text-red-100 text-sm sm:text-base max-w-xl leading-relaxed"
                >
                  Severe toothache, broken tooth, lost crown, dental trauma — call us{" "}
                  <span className="font-bold text-white underline decoration-yellow-300">NOW</span>. Our emergency
                  specialists are on call around the clock, every day of the year.
                </motion.p>
              </div>
            </div>

            {/* Right: CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" as any }}
              className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto lg:w-auto flex-shrink-0"
            >
              {/* Call CTA */}
              <motion.a
                href="tel:+919876543210"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring" as any, stiffness: 300, damping: 20 }}
                className="group flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-bold text-red-700 text-base shadow-xl transition-all duration-300 hover:shadow-2xl"
                style={{
                  background: "white",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-12"
                  style={{ background: "linear-gradient(135deg, #dc2626, #ea580c)" }}
                >
                  <Phone className="w-4 h-4 text-white fill-white" />
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 leading-none mb-0.5">
                    Emergency Line
                  </div>
                  <div className="text-base font-bold text-slate-900">Call Emergency Line</div>
                </div>
              </motion.a>

              {/* WhatsApp CTA */}
              <motion.a
                href="https://wa.me/919876543210?text=Dental%20Emergency!%20I%20need%20urgent%20help."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring" as any, stiffness: 300, damping: 20 }}
                className="group flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-bold text-sm border border-white/30 text-white transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* WhatsApp SVG Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                  style={{ background: "#25d366" }}
                >
                  <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-white/60 leading-none mb-0.5">
                    Instant Reply
                  </div>
                  <div className="text-base font-bold">WhatsApp Now</div>
                </div>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Animated bottom shimmer line */}
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <motion.div
            className="h-full w-1/3"
            style={{ background: "rgba(255,255,255,0.4)" }}
            animate={{ x: ["-100%", "300%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />
        </div>
      </motion.div>
    </section>
  );
}

