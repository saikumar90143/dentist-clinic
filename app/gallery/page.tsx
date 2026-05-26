'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const cases = [
  { id: '1', treatment: 'Smile Designing + Veneers', doctor: 'Dr. Priya Verma', category: 'Smile Design', beforeColor: '#94a3b8', afterColor: '#0d9488' },
  { id: '2', treatment: 'Invisible Braces (Invisalign)', doctor: 'Dr. Amit Joshi', category: 'Braces', beforeColor: '#f59e0b', afterColor: '#3b82f6' },
  { id: '3', treatment: 'Teeth Whitening', doctor: 'Dr. Priya Verma', category: 'Whitening', beforeColor: '#78716c', afterColor: '#14b8a6' },
  { id: '4', treatment: 'Dental Implants', doctor: 'Dr. Rajesh Sharma', category: 'Implants', beforeColor: '#64748b', afterColor: '#0f766e' },
  { id: '5', treatment: 'Gum Surgery + Smile Design', doctor: 'Dr. Sunita Patel', category: 'Smile Design', beforeColor: '#e07979', afterColor: '#0d9488' },
  { id: '6', treatment: 'Full Mouth Rehabilitation', doctor: 'Dr. Rajesh Sharma', category: 'Implants', beforeColor: '#6b7280', afterColor: '#1d4ed8' },
  { id: '7', treatment: 'Porcelain Veneers', doctor: 'Dr. Priya Verma', category: 'Veneers', beforeColor: '#a8a29e', afterColor: '#14b8a6' },
  { id: '8', treatment: 'Zoom Whitening', doctor: 'Dr. Priya Verma', category: 'Whitening', beforeColor: '#92400e', afterColor: '#0d9488' },
  { id: '9', treatment: 'Metal Braces → Perfect Smile', doctor: 'Dr. Amit Joshi', category: 'Braces', beforeColor: '#71717a', afterColor: '#2563eb' },
  { id: '10', treatment: 'Composite Bonding', doctor: 'Dr. Priya Verma', category: 'Smile Design', beforeColor: '#a3a3a3', afterColor: '#0f766e' },
  { id: '11', treatment: 'Kids Orthodontics', doctor: 'Dr. Amit Joshi', category: 'Braces', beforeColor: '#f97316', afterColor: '#3b82f6' },
  { id: '12', treatment: 'Single Tooth Implant', doctor: 'Dr. Rajesh Sharma', category: 'Implants', beforeColor: '#78716c', afterColor: '#0d9488' },
];

const categories = ['All', 'Smile Design', 'Veneers', 'Whitening', 'Braces', 'Implants'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? cases : cases.filter((c) => c.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 60%, #0f172a 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'rgba(13,148,136,0.3)', border: '1px solid rgba(13,148,136,0.5)', color: '#5eead4' }}>
            Real Results
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Smile Gallery
          </h1>
          <p className="text-lg opacity-80">Real patients. Real results. See the transformations we&apos;ve created.</p>
        </div>
      </section>

      {/* Category filter */}
      <section className="py-6 sticky top-16 z-10" style={{ background: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{ background: activeCategory === cat ? '#0d9488' : '#f8fafc', color: activeCategory === cat ? 'white' : '#475569', border: '1px solid', borderColor: activeCategory === cat ? '#0d9488' : '#e2e8f0' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-12" style={{ background: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c, index) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="rounded-2xl overflow-hidden shadow-premium card-hover"
                style={{ background: 'white' }}
              >
                {/* Before/After */}
                <div className="grid grid-cols-2 h-44">
                  <div className="flex flex-col items-center justify-center p-4 relative" style={{ background: c.beforeColor + '22' }}>
                    <div className="text-4xl mb-2">😐</div>
                    <div className="text-xs font-bold px-2 py-0.5 rounded text-white absolute top-2 left-2" style={{ background: '#64748b' }}>BEFORE</div>
                    <p className="text-xs text-center" style={{ color: '#64748b' }}>Before Treatment</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 relative" style={{ background: c.afterColor + '22' }}>
                    <div className="text-4xl mb-2">😁</div>
                    <div className="text-xs font-bold px-2 py-0.5 rounded text-white absolute top-2 right-2" style={{ background: c.afterColor }}>AFTER</div>
                    <p className="text-xs text-center font-semibold" style={{ color: c.afterColor }}>✨ After SmileCraft</p>
                  </div>
                </div>
                <div className="p-4 border-t" style={{ borderColor: '#f1f5f9' }}>
                  <h3 className="font-bold text-sm mb-1" style={{ color: '#0f172a' }}>{c.treatment}</h3>
                  <p className="text-xs" style={{ color: '#64748b' }}>by {c.doctor}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>Start Your Transformation</h2>
          <p className="text-white opacity-80 mb-6">Book a free smile assessment and see your potential result before treatment begins.</p>
          <a href="/contact" className="inline-block px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all" style={{ background: 'white', color: '#0d9488' }}>
            Book Free Smile Assessment
          </a>
        </div>
      </section>
    </div>
  );
}
