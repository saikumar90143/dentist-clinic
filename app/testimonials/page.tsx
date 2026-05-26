'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials, googleRating, totalReviews } from '@/lib/data/testimonials';
import { Star, Play } from 'lucide-react';

export default function TestimonialsPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoTestimonials = testimonials.filter((t) => t.isVideo);

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 60%, #0f172a 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'rgba(13,148,136,0.3)', border: '1px solid rgba(13,148,136,0.5)', color: '#5eead4' }}>
            Patient Stories
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Real Patients, Real Results</h1>
          <p className="text-lg opacity-80">Hear from thousands of patients who transformed their smiles at SmileCraft.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10" style={{ background: '#f8fafc' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: googleRating.toString(), suffix: '★', label: 'Google Rating', color: '#f59e0b' },
              { value: totalReviews.toLocaleString(), suffix: '', label: 'Verified Reviews', color: '#0d9488' },
              { value: '98', suffix: '%', label: 'Recommend Us', color: '#3b82f6' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl shadow-premium" style={{ background: 'white' }}>
                <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}{stat.suffix}</div>
                <div className="text-sm" style={{ color: '#64748b' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video testimonials */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>Video Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoTestimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl overflow-hidden cursor-pointer card-hover"
                onClick={() => setActiveVideo(t.id)}
                style={{ border: '1px solid #e2e8f0' }}
              >
                <div className="h-48 relative flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, #0d948822, #3b82f622)` }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white"
                    style={{ background: 'rgba(13,148,136,0.9)' }}>
                    <Play size={24} fill="white" />
                  </div>
                  <div className="absolute bottom-2 left-3 text-xs font-semibold text-white px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(0,0,0,0.6)' }}>{t.treatment}</div>
                </div>
                <div className="p-4">
                  <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#f59e0b" color="#f59e0b" />)}</div>
                  <div className="font-bold text-sm" style={{ color: '#0f172a' }}>{t.name}</div>
                  <div className="text-xs" style={{ color: '#94a3b8' }}>{t.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All written testimonials */}
      <section className="py-16" style={{ background: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>Patient Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-2xl card-hover"
                style={{ background: 'white', border: '1px solid #e2e8f0' }}
              >
                <div className="flex gap-0.5 mb-3">{[...Array(t.rating)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}</div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#334155' }}>&ldquo;{t.review}&rdquo;</p>
                <div className="border-t pt-3" style={{ borderColor: '#f1f5f9' }}>
                  <div className="font-bold text-sm" style={{ color: '#0f172a' }}>{t.name}</div>
                  <div className="text-xs" style={{ color: '#94a3b8' }}>{t.location} · {t.date}</div>
                  <div className="text-xs mt-1 font-medium" style={{ color: '#0d9488' }}>{t.treatment}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Be Our Next Success Story</h2>
          <p className="text-white opacity-80 mb-6">Join thousands of happy patients who chose SmileCraft for their dental care.</p>
          <a href="/contact" className="inline-block px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105" style={{ background: 'white', color: '#0d9488' }}>
            Book Your Free Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
