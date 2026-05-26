'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { doctors } from '@/lib/data/doctors';
import { Star, CheckCircle, Calendar, Globe, Award } from 'lucide-react';

export default function DoctorsPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 60%, #0f172a 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'rgba(13,148,136,0.3)', border: '1px solid rgba(13,148,136,0.5)', color: '#5eead4' }}>
            Our Team
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Meet Our Expert Specialists
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Internationally trained, award-winning dental specialists dedicated to your perfect smile.
          </p>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16" style={{ background: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {doctors.map((doctor, index) => {
              const initials = doctor.name.split(' ').filter((_, i) => i > 0).map((n) => n[0]).join('');
              return (
                <motion.div
                  key={doctor.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-3xl overflow-hidden card-hover shadow-premium"
                  style={{ background: 'white', border: '1px solid #e2e8f0' }}
                >
                  {/* Top gradient banner */}
                  <div className="h-24 relative" style={{ background: 'linear-gradient(135deg, #0f172a, #0d4f4a)' }}>
                    <div className="absolute bottom-0 left-6 translate-y-1/2 w-20 h-20 rounded-full border-4 border-white flex items-center justify-center text-2xl font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
                      {initials}
                    </div>
                  </div>

                  <div className="pt-14 px-6 pb-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h2 className="text-xl font-bold" style={{ color: '#0f172a' }}>{doctor.name}</h2>
                        <p className="text-sm" style={{ color: '#0d9488' }}>{doctor.title}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-semibold">
                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                        <span>{doctor.rating}</span>
                        <span style={{ color: '#94a3b8' }}>({doctor.reviewCount})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: '#f0fdfa', color: '#0d9488' }}>
                        {doctor.experience}+ Yrs Experience
                      </span>
                      {doctor.certifications.slice(0, 1).map((c) => (
                        <span key={c} className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: '#eff6ff', color: '#3b82f6' }}>{c}</span>
                      ))}
                    </div>

                    <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: '#475569' }}>{doctor.bio}</p>

                    <div className="flex items-center gap-2 text-xs mb-1" style={{ color: '#64748b' }}>
                      <Globe size={12} />
                      <span>{doctor.languages.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs mb-4" style={{ color: '#64748b' }}>
                      <Calendar size={12} />
                      <span>{doctor.availability.join(', ')}</span>
                    </div>

                    <div className="flex gap-3">
                      <a href={`/doctors/${doctor.slug}`} className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 text-white"
                        style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
                        View Profile
                      </a>
                      <a href="/contact" className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                        style={{ background: '#f0fdfa', color: '#0d9488', border: '1px solid #99f6e4' }}>
                        Book Appointment
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>
            Why Our Doctors Stand Apart
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🎓', label: 'International Training', desc: 'Trained in USA, Germany & India' },
              { icon: '🏆', label: 'Award Winning', desc: 'Multiple national recognition' },
              { icon: '📚', label: 'Research Active', desc: '30+ published papers' },
              { icon: '❤️', label: 'Patient Focused', desc: 'Gentle & compassionate care' },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-2xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-bold text-sm mb-1" style={{ color: '#0f172a' }}>{item.label}</div>
                <div className="text-xs" style={{ color: '#64748b' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
