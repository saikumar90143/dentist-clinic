'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, ChevronDown } from 'lucide-react';

/* ─── Particle dots scattered across the hero ─── */
const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${Math.floor(Math.random() * 100)}%`,
  left: `${Math.floor(Math.random() * 100)}%`,
  size: Math.random() < 0.5 ? 1 : 2,
  delay: i * 0.07,
  duration: 2.5 + Math.random() * 3,
}));

/* ─── Stagger container variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeOut" as any },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" as any },
  }),
};

/* ─── Floating stat cards data ─── */
const floatingStats = [
  { value: '15K+', label: 'Happy Patients', icon: '😊' },
  { value: '20+', label: 'Years Experience', icon: '🏆' },
  { value: '5K+', label: 'Procedures Done', icon: '🦷' },
  { value: '4.9★', label: 'Google Rating', icon: '⭐' },
];

/* ─── WhatsApp SVG icon ─── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 50%, #0f172a 100%)',
      }}
    >
      {/* ── SVG tooth pattern overlay ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="tooth-pattern"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            {/* Simple tooth silhouette */}
            <path
              d="M40 6 C28 6 20 14 20 22 C20 28 22 32 24 36 C26 42 26 56 28 64 C30 72 34 74 40 74 C46 74 50 72 52 64 C54 56 54 42 56 36 C58 32 60 28 60 22 C60 14 52 6 40 6 Z"
              fill="white"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tooth-pattern)" />
      </svg>

      {/* ── Animated blobs ── */}
      <div
        className="animate-blob absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(13,148,136,0.7) 0%, rgba(13,148,136,0.2) 60%, transparent 80%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="animate-blob-delay absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.7) 0%, rgba(59,130,246,0.2) 60%, transparent 80%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="animate-blob-delay-2 absolute -bottom-32 left-1/3 w-[450px] h-[450px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.6) 0%, rgba(59,130,246,0.2) 60%, transparent 80%)',
          filter: 'blur(60px)',
        }}
      />

      {/* ── Particle dots ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted && PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
            }}
            animate={{ opacity: [0.15, 0.7, 0.15], scale: [1, 1.4, 1] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-48">
        <motion.div
          className="max-w-5xl mx-auto text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Emergency badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-4">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase"
              style={{
                background: 'linear-gradient(135deg, rgba(239,68,68,0.9), rgba(220,38,38,0.9))',
                border: '1px solid rgba(239,68,68,0.4)',
                color: '#fff',
                boxShadow: '0 0 20px rgba(239,68,68,0.3)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block" />
              Emergency Available 24/7
            </div>
          </motion.div>

          {/* Award badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-8">
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fbbf24',
                backdropFilter: 'blur(8px)',
              }}
            >
              🏆 Rated #1 Dental Clinic in Delhi
            </div>
          </motion.div>

          {/* Main headline — word-by-word stagger */}
          <motion.h1
            className="font-display font-bold leading-tight mb-6"
            style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
          >
            {/* Line 1: "Creating Confident" — teal gradient */}
            <span className="block">
              {['Creating', 'Confident'].map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-4 gradient-text"
                >
                  {word}
                </motion.span>
              ))}
            </span>

            {/* Line 2: " Smiles with" — white */}
            <span className="block" style={{ color: '#fff' }}>
              {['Smiles', 'with'].map((word, i) => (
                <motion.span
                  key={word}
                  custom={i + 2}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </span>

            {/* Line 3: "Advanced Dental Care" — soft white */}
            <span className="block" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {['Advanced', 'Dental', 'Care'].map((word, i) => (
                <motion.span
                  key={word}
                  custom={i + 4}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: 'rgba(203,213,225,0.9)' }}
          >
            Experience world-class dental care in the heart of New Delhi. Our expert team of specialists
            delivers beautiful, healthy smiles with cutting-edge technology and a gentle touch.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12"
          >
            {/* Book Appointment */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="shadow-teal group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0d9488, #0f766e)',
              }}
            >
              {/* Shimmer */}
              <span className="shimmer absolute inset-0 rounded-full" />
              <Calendar className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Book Free Appointment</span>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white"
              style={{
                background: '#25d366',
                boxShadow: '0 8px 30px rgba(37,211,102,0.35)',
              }}
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp Us
            </motion.a>

            {/* Call button — glass */}
            <motion.a
              href="tel:+919876543210"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Phone className="w-4 h-4" />
              Call: +91-98765 43210
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {[
              '✓ 15,000+ Patients',
              '✓ 20 Years Experience',
              '✓ 4.9★ Google',
              '✓ ISO Certified',
            ].map((item) => (
              <span
                key={item}
                className="text-sm font-medium"
                style={{ color: 'rgba(94,234,212,0.9)' }}
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Floating stats cards at the bottom ── */}
      <div className="absolute bottom-0 left-0 right-0 pb-6 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" as any }}
          >
            {floatingStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`glass rounded-2xl p-4 text-center ${
                  i % 2 === 0 ? 'animate-float' : 'animate-float-delay'
                }`}
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: "spring" as any, stiffness: 300, damping: 20 }}
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div
                  className="font-display text-xl font-bold gradient-text"
                >
                  {stat.value}
                </div>
                <div className="text-xs font-medium mt-0.5" style={{ color: 'rgba(203,213,225,0.8)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown
            className="w-5 h-5"
            style={{ color: 'rgba(13,148,136,0.7)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
