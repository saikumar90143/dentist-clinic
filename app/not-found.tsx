import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 – Page Not Found | SmileCraft Dental Clinic',
  description: 'The page you were looking for could not be found. Return to SmileCraft Dental Clinic homepage.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center" style={{ fontFamily: 'var(--font-inter)', background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdfa 100%)' }}>
      {/* Animated tooth */}
      <div className="text-8xl mb-6" style={{ animation: 'float 3s ease-in-out infinite' }}>🦷</div>

      {/* 404 */}
      <div className="text-8xl md:text-9xl font-bold mb-2" style={{
        fontFamily: 'var(--font-playfair)',
        background: 'linear-gradient(135deg, #0d9488, #3b82f6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        404
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#0f172a' }}>
        Oops! This Page Went Missing
      </h1>
      <p className="max-w-md mb-8" style={{ color: '#64748b' }}>
        The page you&apos;re looking for seems to have been extracted without anaesthesia. Don&apos;t worry — let&apos;s get you back to a healthier smile.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <Link href="/" className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
          🏠 Back to Home
        </Link>
        <Link href="/services" className="px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-90"
          style={{ background: '#f0fdfa', color: '#0d9488', border: '1px solid #99f6e4' }}>
          🦷 Our Services
        </Link>
        <Link href="/contact" className="px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-90"
          style={{ background: '#f8fafc', color: '#334155', border: '1px solid #e2e8f0' }}>
          📞 Contact Us
        </Link>
      </div>

      <p className="text-sm" style={{ color: '#94a3b8' }}>
        Need help? Call us: <a href="tel:+919876543210" className="font-semibold" style={{ color: '#0d9488' }}>+91-9876543210</a>
      </p>
    </div>
  );
}
