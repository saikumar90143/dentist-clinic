'use client';

import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Award,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/services' },
  { label: 'Photo Gallery', href: '/gallery' },
  { label: 'Meet Our Doctors', href: '/doctors' },
  { label: 'Patient Testimonials', href: '/testimonials' },
  { label: 'Pricing & Plans', href: '/pricing' },
  { label: 'Dental Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Book Appointment', href: '/contact#book' },
];

const serviceLinks = [
  { label: 'Dental Implants', href: '/services/dental-implants' },
  { label: 'Smile Designing', href: '/services/smile-designing' },
  { label: 'Teeth Whitening', href: '/services/teeth-whitening' },
  { label: 'Invisible Braces', href: '/services/invisible-braces' },
  { label: 'Root Canal Treatment', href: '/services/root-canal-treatment' },
  { label: 'Veneers', href: '/services/veneers' },
  { label: 'Gum Surgery', href: '/services/gum-surgery' },
  { label: 'Kids Dentistry', href: '/services/kids-dentistry' },
  { label: 'Cosmetic Dentistry', href: '/services/cosmetic-dentistry' },
  { label: 'Emergency Dentistry', href: '/services/emergency-dentistry' },
];

/* Social icons as SVG paths — lucide doesn't have brand icons */
function SocialSVG({ path, color }: { path: string; color: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      {path === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
      {path === 'instagram' && <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>}
      {path === 'twitter' && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />}
      {path === 'youtube' && <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.5C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill={color} stroke="none" />
      </>}
      {path === 'linkedin' && <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>}
    </svg>
  );
}

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com/smilecraftdental', path: 'facebook', color: '#1877f2' },
  { label: 'Instagram', href: 'https://instagram.com/smilecraftdental', path: 'instagram', color: '#e1306c' },
  { label: 'Twitter', href: 'https://twitter.com/smilecraftdental', path: 'twitter', color: '#1da1f2' },
  { label: 'YouTube', href: 'https://youtube.com/@smilecraftdental', path: 'youtube', color: '#ff0000' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/smilecraftdental', path: 'linkedin', color: '#0a66c2' },
];

const trustBadges = [
  {
    icon: Award,
    title: 'ISO 9001:2015',
    subtitle: 'Certified Clinic',
  },
  {
    icon: CheckCircle,
    title: 'NABH Accredited',
    subtitle: 'Quality Standards',
  },
  {
    icon: Star,
    title: '4.9 ★ Rating',
    subtitle: '1,200+ Google Reviews',
  },
];

/* ─────────────────────────────────────────────
   Tooth SVG Logo Icon (server-safe duplicate)
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
        fill="url(#footerToothGrad)"
        stroke="url(#footerToothStroke)"
        strokeWidth="1.5"
      />
      <path
        d="M15 10c-1.5 1-2.5 3-2.5 5"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="footerToothGrad" x1="2" y1="2" x2="38" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="footerToothStroke" x1="2" y1="2" x2="38" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5eead4" />
          <stop offset="1" stopColor="#0f766e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Newsletter — client island
───────────────────────────────────────────── */
import NewsletterForm from '@/components/layout/NewsletterForm';

/* ─────────────────────────────────────────────
   Footer (Server Component — no hooks needed)
───────────────────────────────────────────── */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" style={{ backgroundColor: '#0f172a', color: '#e2e8f0' }}>
      {/* ── Teal gradient divider ── */}
      <div
        className="h-1.5 w-full"
        style={{
          background: 'linear-gradient(90deg, #0d9488 0%, #3b82f6 50%, #f59e0b 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Trust badges strip ── */}
      <div
        className="border-b"
        style={{ borderColor: 'rgba(255,255,255,0.07)', backgroundColor: '#0a1020' }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
            {trustBadges.map(({ icon: Icon, title, subtitle }) => (
              <div key={title} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(13,148,136,0.2)', border: '1px solid rgba(13,148,136,0.3)' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#14b8a6' }} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: '#f8fafc' }}>
                    {title}
                  </p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>
                    {subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main footer columns ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Column 1: Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group" aria-label="SmileCraft Home">
              <ToothIcon className="w-10 h-10 group-hover:scale-105 transition-transform duration-300" />
              <div>
                <p
                  className="text-xl font-bold leading-none"
                  style={{ color: '#14b8a6', fontFamily: 'var(--font-playfair), serif' }}
                >
                  SmileCraft
                </p>
                <p
                  className="text-[10px] font-semibold tracking-[0.25em] uppercase leading-none mt-0.5"
                  style={{ color: '#f59e0b' }}
                >
                  Dental
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
              Premium dental care rooted in compassion and excellence. Transforming smiles
              for over 20 years at the heart of Connaught Place, New Delhi.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map(({ label, href, path, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${label}`}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <SocialSVG path={path} color={color} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Quick Links ── */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: '#14b8a6' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-sm transition-colors duration-200 group"
                    style={{ color: '#94a3b8' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#14b8a6')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = '#94a3b8')
                    }
                  >
                    <ArrowRight
                      className="w-3 h-3 flex-shrink-0 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200"
                      style={{ color: '#14b8a6' }}
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Services ── */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: '#14b8a6' }}
            >
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-sm transition-colors duration-200 group"
                    style={{ color: '#94a3b8' }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#14b8a6')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = '#94a3b8')
                    }
                  >
                    <ArrowRight
                      className="w-3 h-3 flex-shrink-0 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200"
                      style={{ color: '#14b8a6' }}
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact + Map ── */}
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: '#14b8a6' }}
            >
              Get In Touch
            </h3>

            <ul className="space-y-4 mb-6">
              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#14b8a6' }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#e2e8f0' }}>
                    42 Connaught Circus
                  </p>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>
                    Connaught Place, New Delhi — 110001
                  </p>
                </div>
              </li>
              {/* Phone */}
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-sm transition-colors duration-200 group"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#14b8a6')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                  <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <span>+91-9876543210</span>
                </a>
              </li>
              {/* Email */}
              <li>
                <a
                  href="mailto:hello@smilecraftdental.com"
                  className="flex items-center gap-3 text-sm transition-colors duration-200"
                  style={{ color: '#94a3b8' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#14b8a6')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                >
                  <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#14b8a6' }} />
                  <span>hello@smilecraftdental.com</span>
                </a>
              </li>
              {/* Hours */}
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#14b8a6' }} />
                <div className="text-xs space-y-0.5" style={{ color: '#94a3b8' }}>
                  <p>
                    <span style={{ color: '#e2e8f0' }} className="font-medium">Mon – Sat:</span>{' '}
                    9:00 AM – 8:00 PM
                  </p>
                  <p>
                    <span style={{ color: '#e2e8f0' }} className="font-medium">Sunday:</span>{' '}
                    10:00 AM – 4:00 PM
                  </p>
                  <p className="font-semibold" style={{ color: '#ef4444' }}>
                    Emergency: 24 / 7
                  </p>
                </div>
              </li>
            </ul>

            {/* Google Maps mini embed */}
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <iframe
                title="SmileCraft Dental Clinic location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.892!2d77.2195!3d28.6329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzU4LjQiTiA3N8KwMTMnMTAuMiJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="140"
                style={{ border: 0, display: 'block', filter: 'grayscale(20%) contrast(1.05)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* ── Newsletter ── */}
        <div
          className="mt-14 lg:mt-16 p-6 lg:p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(13,148,136,0.15), rgba(59,130,246,0.1))',
            border: '1px solid rgba(13,148,136,0.2)',
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-bold mb-1" style={{ color: '#f8fafc' }}>
                Stay Informed. Stay Healthy.
              </h4>
              <p className="text-sm" style={{ color: '#94a3b8' }}>
                Get dental tips, exclusive offers & appointment reminders in your inbox.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.07)', backgroundColor: '#0a1020' }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-center sm:text-left" style={{ color: '#64748b' }}>
              © {currentYear} SmileCraft Dental Clinic. All rights reserved.
              <span className="mx-2">·</span>
              Designed with{' '}
              <span style={{ color: '#ef4444' }} aria-label="love">
                ♥
              </span>{' '}
              for brighter smiles.
            </p>
            <nav aria-label="Legal navigation">
              <ul className="flex items-center gap-4 text-xs" style={{ color: '#64748b' }}>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-teal-400 transition-colors duration-200"
                    style={{ color: '#64748b' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#14b8a6')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li style={{ color: '#334155' }} aria-hidden="true">
                  ·
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-teal-400 transition-colors duration-200"
                    style={{ color: '#64748b' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#14b8a6')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
                  >
                    Terms of Service
                  </Link>
                </li>
                <li style={{ color: '#334155' }} aria-hidden="true">
                  ·
                </li>
                <li>
                  <Link
                    href="/sitemap"
                    className="hover:text-teal-400 transition-colors duration-200"
                    style={{ color: '#64748b' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#14b8a6')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
