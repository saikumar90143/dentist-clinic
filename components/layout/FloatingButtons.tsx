'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, X, MessageCircle } from 'lucide-react';

/* ─────────────────────────────────────────────
   WhatsApp SVG Icon
───────────────────────────────────────────── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Tooltip label that appears beside the button
───────────────────────────────────────────── */
function ButtonTooltip({ label }: { label: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: 8, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 8, scale: 0.9 }}
      transition={{ duration: 0.18 }}
      className="absolute right-full mr-3 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none"
      style={{
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      }}
    >
      {label}
      {/* Arrow */}
      <span
        className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-[6px] border-transparent"
        style={{ borderLeftColor: '#0f172a' }}
        aria-hidden="true"
      />
    </motion.span>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function FloatingButtons() {
  const [visible, setVisible] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const [mobileBannerDismissed, setMobileBannerDismissed] = useState(false);

  /* Slide-in after mount */
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(timer);
  }, []);

  /* Check localStorage for dismissal */
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('sc_mobile_bar_dismissed');
      if (dismissed === 'true') setMobileBannerDismissed(true);
    } catch {
      /* ignore */
    }
  }, []);

  const dismissMobileBanner = () => {
    setMobileBannerDismissed(true);
    try {
      localStorage.setItem('sc_mobile_bar_dismissed', 'true');
    } catch {
      /* ignore */
    }
  };

  const floatingButtons = [
    {
      id: 'call',
      label: 'Call Us Now',
      href: 'tel:+919876543210',
      bgColor: '#0d9488',
      hoverBg: '#0f766e',
      shadow: 'rgba(13,148,136,0.45)',
      icon: <Phone className="w-5 h-5" />,
      external: false,
      order: 2, /* rendered top, so appears above WhatsApp */
    },
    {
      id: 'whatsapp',
      label: 'Chat on WhatsApp',
      href: 'https://wa.me/919876543210?text=Hi%20SmileCraft%2C%20I%20would%20like%20to%20book%20an%20appointment',
      bgColor: '#25d366',
      hoverBg: '#1da851',
      shadow: 'rgba(37,211,102,0.45)',
      icon: <WhatsAppIcon className="w-5 h-5" />,
      external: true,
      order: 1, /* rendered bottom */
    },
  ];

  return (
    <>
      {/* ─── Desktop & Tablet FABs (bottom-right stack) ─── */}
      <div
        className="fixed bottom-6 right-5 z-40 flex flex-col-reverse gap-3 hidden sm:flex"
        role="complementary"
        aria-label="Quick contact buttons"
      >
        <AnimatePresence>
          {visible &&
            floatingButtons.map((btn, i) => (
              <motion.div
                key={btn.id}
                initial={{ opacity: 0, x: 60, scale: 0.7 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.7 }}
                transition={{
                  type: "spring" as any,
                  stiffness: 320,
                  damping: 22,
                  delay: i * 0.12,
                }}
                className="relative flex items-center justify-end"
              >
                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredBtn === btn.id && (
                    <ButtonTooltip label={btn.label} />
                  )}
                </AnimatePresence>

                {/* FAB button */}
                <motion.a
                  href={btn.href}
                  target={btn.external ? '_blank' : undefined}
                  rel={btn.external ? 'noopener noreferrer' : undefined}
                  aria-label={btn.label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring" as any, stiffness: 400, damping: 20 }}
                  onHoverStart={() => setHoveredBtn(btn.id)}
                  onHoverEnd={() => setHoveredBtn(null)}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white cursor-pointer"
                  style={{
                    backgroundColor: btn.bgColor,
                    boxShadow: `0 8px 28px ${btn.shadow}`,
                  }}
                >
                  {btn.icon}

                  {/* Pulse ring — WhatsApp only */}
                  {btn.id === 'whatsapp' && (
                    <span
                      className="absolute inset-0 rounded-2xl animate-ping opacity-30"
                      style={{ backgroundColor: btn.bgColor }}
                      aria-hidden="true"
                    />
                  )}
                </motion.a>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* ─── Mobile FABs (bottom-right, smaller) ─── */}
      <div
        className="fixed bottom-[80px] right-4 z-40 flex flex-col-reverse gap-2.5 sm:hidden"
        role="complementary"
        aria-label="Quick contact buttons"
      >
        <AnimatePresence>
          {visible &&
            floatingButtons.map((btn, i) => (
              <motion.a
                key={btn.id}
                href={btn.href}
                target={btn.external ? '_blank' : undefined}
                rel={btn.external ? 'noopener noreferrer' : undefined}
                aria-label={btn.label}
                initial={{ opacity: 0, x: 50, scale: 0.6 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.6 }}
                transition={{
                  type: "spring" as any,
                  stiffness: 320,
                  damping: 22,
                  delay: i * 0.1,
                }}
                whileTap={{ scale: 0.93 }}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white relative"
                style={{
                  backgroundColor: btn.bgColor,
                  boxShadow: `0 6px 20px ${btn.shadow}`,
                }}
              >
                {btn.icon}
                {btn.id === 'whatsapp' && (
                  <span
                    className="absolute inset-0 rounded-xl animate-ping opacity-25"
                    style={{ backgroundColor: btn.bgColor }}
                    aria-hidden="true"
                  />
                )}
              </motion.a>
            ))}
        </AnimatePresence>
      </div>

      {/* ─── Sticky Mobile Bottom Bar (Book Appointment) ─── */}
      <AnimatePresence>
        {visible && !mobileBannerDismissed && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring" as any, stiffness: 280, damping: 26, delay: 0.6 }}
            className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
            role="complementary"
            aria-label="Book appointment bar"
          >
            {/* Gradient fade above bar */}
            <div
              className="h-6 w-full pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(15,23,42,0.5), transparent)',
              }}
              aria-hidden="true"
            />

            {/* Bar content */}
            <div
              className="flex items-center gap-2 px-4 py-3 relative"
              style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                boxShadow: '0 -8px 32px rgba(13,148,136,0.4)',
              }}
            >
              {/* Left: phone quick-dial */}
              <a
                href="tel:+919876543210"
                aria-label="Call us"
                className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
              >
                <Phone className="w-5 h-5 text-white" />
              </a>

              {/* Center: Book CTA */}
              <Link
                href="/contact#book"
                className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold text-teal-700 active:scale-95 transition-transform"
                style={{ backgroundColor: '#ffffff' }}
              >
                <Calendar className="w-4 h-4" />
                Book Free Consultation
              </Link>

              {/* Right: WhatsApp */}
              <a
                href="https://wa.me/919876543210?text=Hi%20SmileCraft%2C%20I%20would%20like%20to%20book%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
                style={{ backgroundColor: '#25d366' }}
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
              </a>

              {/* Dismiss button */}
              <button
                onClick={dismissMobileBanner}
                aria-label="Dismiss booking bar"
                className="absolute -top-3 right-3 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Safe-area spacer for phones with home bar */}
            <div
              className="w-full"
              style={{
                background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
                height: 'env(safe-area-inset-bottom, 0px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Scroll-to-top FAB (appears after scroll) ─── */}
      <ScrollToTopButton visible={visible} />
    </>
  );
}

/* ─────────────────────────────────────────────
   Scroll-to-top sub-component
───────────────────────────────────────────── */
function ScrollToTopButton({ visible }: { visible: boolean }) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && showScroll && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring" as any, stiffness: 350, damping: 24 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-5 z-40 w-10 h-10 rounded-xl hidden sm:flex items-center justify-center text-white"
          style={{
            backgroundColor: 'rgba(15,23,42,0.85)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
