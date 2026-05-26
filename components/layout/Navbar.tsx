'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  AlertCircle,
  MessageCircle,
  Sparkles,
  Shield,
  Smile,
  Zap,
  Activity,
  Eye,
  Star,
  Heart,
  Layers,
  Scissors,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasMega: true },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const services = [
  {
    label: 'Dental Implants',
    href: '/services/dental-implants',
    icon: Sparkles,
    desc: 'Permanent tooth replacement',
  },
  {
    label: 'Smile Designing',
    href: '/services/smile-designing',
    icon: Smile,
    desc: 'Full smile makeovers',
  },
  {
    label: 'Teeth Whitening',
    href: '/services/teeth-whitening',
    icon: Star,
    desc: 'Brighten your smile instantly',
  },
  {
    label: 'Invisible Braces',
    href: '/services/invisible-braces',
    icon: Shield,
    desc: 'Clear aligner therapy',
  },
  {
    label: 'Root Canal Treatment',
    href: '/services/root-canal',
    icon: Activity,
    desc: 'Pain-free endodontics',
  },
  {
    label: 'Dental Veneers',
    href: '/services/dental-veneers',
    icon: Layers,
    desc: 'Porcelain perfection',
  },
  {
    label: 'Gum Treatment',
    href: '/services/gum-treatment',
    icon: Heart,
    desc: 'Periodontal care',
  },
  {
    label: 'Pediatric Dentistry',
    href: '/services/pediatric-dentistry',
    icon: Zap,
    desc: "Children's dental health",
  },
  {
    label: 'Dental Crowns',
    href: '/services/dental-crowns',
    icon: Eye,
    desc: 'Cap & restore damaged teeth',
  },
  {
    label: 'Tooth Extraction',
    href: '/services/tooth-extraction',
    icon: Scissors,
    desc: 'Safe & comfortable removal',
  },
];

/* ─────────────────────────────────────────────
   Tooth SVG Logo Icon
───────────────────────────────────────────── */
function ToothIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M13 2C8 2 2 7 2 13c0 4 1.5 7 3 9.5C7.5 26 8 29 8 33c0 3 1 7 3.5 7s3-3 4-6 2-5 4.5-5 3.5 2 4.5 5 1.5 6 4 6 3.5-4 3.5-7c0-4 .5-7 3-10.5 1.5-2.5 3-5.5 3-9.5C38 7 32 2 27 2c-3 0-5 1.5-7 1.5S16 2 13 2Z"
        fill="url(#toothGrad)"
        stroke="url(#toothGradStroke)"
        strokeWidth="1.5"
      />
      <path
        d="M15 10c-1.5 1-2.5 3-2.5 5"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="toothGrad" x1="2" y1="2" x2="38" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="toothGradStroke" x1="2" y1="2" x2="38" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5eead4" />
          <stop offset="1" stopColor="#0f766e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Main Navbar
───────────────────────────────────────────── */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);

  /* scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close mega on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        megaRef.current &&
        !megaRef.current.contains(e.target as Node) &&
        megaTriggerRef.current &&
        !megaTriggerRef.current.contains(e.target as Node)
      ) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* close mobile drawer on route change */
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  /* lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-slate-200/80'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 xl:gap-8 h-16 lg:h-20">
            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 flex-shrink-0 group"
              aria-label="SmileCraft Dental Clinic Home"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-teal-400/30 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                <ToothIcon className="w-9 h-9 lg:w-10 lg:h-10 relative z-10 drop-shadow-sm" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className={cn(
                    'text-lg lg:text-xl font-bold tracking-tight transition-colors duration-300',
                    scrolled ? 'text-teal-600' : 'text-teal-400'
                  )}
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  SmileCraft
                </span>
                <span
                  className={cn(
                    'text-[10px] lg:text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-300',
                    scrolled ? 'text-amber-500' : 'text-amber-400'
                  )}
                >
                  Dental
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
              {navLinks.map((link) =>
                link.hasMega ? (
                  /* Services with mega dropdown */
                  <div key={link.label} className="relative">
                    <button
                      ref={megaTriggerRef}
                      onClick={() => setMegaOpen((p) => !p)}
                      onKeyDown={(e) => e.key === 'Escape' && setMegaOpen(false)}
                      aria-expanded={megaOpen}
                      aria-haspopup="true"
                      className={cn(
                        'flex items-center gap-1 px-2 xl:px-4 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-teal-500',
                        isActive(link.href)
                          ? scrolled
                            ? 'text-teal-600 bg-teal-50'
                            : 'text-teal-300 bg-white/10'
                          : scrolled
                          ? 'text-slate-700 hover:text-teal-600 hover:bg-teal-50/80'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-300',
                          megaOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    {/* Mega Dropdown */}
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          ref={megaRef}
                          initial={{ opacity: 0, y: 12, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] bg-white rounded-2xl shadow-2xl shadow-black/15 border border-slate-100 overflow-hidden"
                        >
                          {/* Mega header */}
                          <div
                            className="px-6 py-4 border-b border-slate-100"
                            style={{ background: 'linear-gradient(135deg, #f0fdfa, #f8fafc)' }}
                          >
                            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest">
                              Our Services
                            </p>
                            <p className="text-sm text-slate-500 mt-0.5">
                              World-class dental care for every smile
                            </p>
                          </div>
                          {/* Services grid */}
                          <div className="grid grid-cols-2 gap-0.5 p-3">
                            {services.map((svc) => {
                              const Icon = svc.icon;
                              return (
                                <Link
                                  key={svc.href}
                                  href={svc.href}
                                  onClick={() => setMegaOpen(false)}
                                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-teal-50 group/svc transition-colors duration-150"
                                >
                                  <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0 group-hover/svc:bg-teal-600 transition-colors duration-200">
                                    <Icon className="w-4 h-4 text-teal-600 group-hover/svc:text-white transition-colors duration-200" />
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold text-slate-800 group-hover/svc:text-teal-700 transition-colors">
                                      {svc.label}
                                    </p>
                                    <p className="text-xs text-slate-500 truncate">{svc.desc}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                          {/* CTA row */}
                          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                              All treatments by certified specialists
                            </span>
                            <Link
                              href="/services"
                              onClick={() => setMegaOpen(false)}
                              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                            >
                              View all services →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      'px-2 xl:px-4 py-2 rounded-lg text-[13px] xl:text-sm font-medium transition-all duration-200',
                      isActive(link.href)
                        ? scrolled
                          ? 'text-teal-600 bg-teal-50'
                          : 'text-teal-300 bg-white/10'
                        : scrolled
                        ? 'text-slate-700 hover:text-teal-600 hover:bg-teal-50/80'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* ── Desktop Right ── */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Emergency badge */}
              <a
                href="tel:+919876543210"
                className="emergency-badge hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-bold"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                Emergency 24/7
              </a>

              {/* Phone */}
              <a
                href="tel:+919876543210"
                className={cn(
                  'flex items-center gap-2 text-sm font-semibold transition-colors duration-200',
                  scrolled ? 'text-slate-700 hover:text-teal-600' : 'text-white/90 hover:text-white'
                )}
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Book Now CTA */}
              <Link
                href="/contact"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] xl:text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-md whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #0d9488, #0f766e)',
                  boxShadow: '0 4px 15px rgba(13,148,136,0.2)',
                }}
              >
                <MessageCircle className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                Book Now
              </Link>
            </div>

            {/* ── Mobile right ── */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href="tel:+919876543210"
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  scrolled ? 'text-teal-600' : 'text-white'
                )}
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                )}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring" as any, stiffness: 300, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col overflow-y-auto"
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-5 py-4 border-b border-slate-100"
                style={{ background: 'linear-gradient(135deg, #f0fdfa, #f8fafc)' }}
              >
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <ToothIcon className="w-8 h-8" />
                  <div>
                    <p
                      className="text-base font-bold text-teal-600 leading-none"
                      style={{ fontFamily: 'var(--font-playfair), serif' }}
                    >
                      SmileCraft
                    </p>
                    <p className="text-[10px] font-semibold text-amber-500 tracking-widest uppercase">
                      Dental
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Emergency strip */}
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 py-3 text-white text-sm font-bold emergency-badge"
              >
                <AlertCircle className="w-4 h-4" />
                Emergency Dental Care — 24/7 Available
              </a>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-4">
                <ul className="space-y-1">
                  {navLinks.map((link, i) =>
                    link.hasMega ? (
                      <li key={link.label}>
                        <button
                          onClick={() => setMobileServicesOpen((p) => !p)}
                          className={cn(
                            'w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                            isActive(link.href)
                              ? 'text-teal-600 bg-teal-50'
                              : 'text-slate-700 hover:text-teal-600 hover:bg-teal-50/60'
                          )}
                        >
                          {link.label}
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 transition-transform duration-300',
                              mobileServicesOpen && 'rotate-180'
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden ml-3 mt-1 space-y-0.5"
                            >
                              {services.map((svc) => {
                                const Icon = svc.icon;
                                return (
                                  <li key={svc.href}>
                                    <Link
                                      href={svc.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                                    >
                                      <Icon className="w-4 h-4 text-teal-500 flex-shrink-0" />
                                      {svc.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    ) : (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            'flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                            isActive(link.href)
                              ? 'text-teal-600 bg-teal-50'
                              : 'text-slate-700 hover:text-teal-600 hover:bg-teal-50/60'
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    )
                  )}
                </ul>
              </nav>

              {/* Drawer footer CTAs */}
              <div className="p-4 border-t border-slate-100 space-y-3">
                <a
                  href="tel:+919876543210"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-teal-600 text-teal-600 font-semibold text-sm hover:bg-teal-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +91-9876543210
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg, #0d9488, #0f766e)' }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Book Appointment
                </Link>
                <a
                  href="https://wa.me/919876543210?text=Hi%20SmileCraft%2C%20I%20would%20like%20to%20book%20an%20appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold text-sm"
                  style={{ background: '#25d366' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
