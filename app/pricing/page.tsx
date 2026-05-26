'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { membershipPlans, treatmentPrices } from '@/lib/data/pricing';
import { CheckCircle, Star, Crown } from 'lucide-react';

const planIcons: Record<string, React.ReactNode> = {
  shield: <span className="text-3xl">🛡️</span>,
  star: <Star size={28} fill="white" color="white" />,
  crown: <Crown size={28} color="white" />,
};

export default function PricingPage() {
  const [tab, setTab] = useState<'plans' | 'treatments'>('plans');

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 60%, #0f172a 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'rgba(13,148,136,0.3)', border: '1px solid rgba(13,148,136,0.5)', color: '#5eead4' }}>Transparent Pricing</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Simple, Transparent Pricing</h1>
          <p className="text-lg opacity-80">No hidden fees. No surprises. Just honest dental care.</p>
          <div className="mt-8 inline-flex rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <button onClick={() => setTab('plans')} className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all" style={{ background: tab === 'plans' ? 'white' : 'transparent', color: tab === 'plans' ? '#0d9488' : 'white' }}>Membership Plans</button>
            <button onClick={() => setTab('treatments')} className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all" style={{ background: tab === 'treatments' ? 'white' : 'transparent', color: tab === 'treatments' ? '#0d9488' : 'white' }}>Treatment Prices</button>
          </div>
        </div>
      </section>

      {tab === 'plans' ? (
        <section className="py-16" style={{ background: '#f8fafc' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {membershipPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="rounded-3xl overflow-hidden shadow-premium"
                  style={{
                    transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                    border: plan.popular ? '2px solid #f59e0b' : '1px solid #e2e8f0',
                  }}
                >
                  {plan.popular && (
                    <div className="text-center py-2 text-xs font-bold text-white" style={{ background: 'linear-gradient(90deg, #f59e0b, #fbbf24)' }}>
                      ⭐ MOST POPULAR
                    </div>
                  )}
                  <div className={`p-8 bg-gradient-to-br ${plan.color} text-white`}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.15)' }}>
                      {planIcons[plan.icon]}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm opacity-70 mb-4">{plan.description}</p>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="opacity-70 pb-1">{plan.period}</span>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm" style={{ color: '#334155' }}>
                          <CheckCircle size={15} style={{ color: '#0d9488', flexShrink: 0, marginTop: 1 }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a href="/contact" className="block w-full text-center py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
                      Get Started
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl text-center" style={{ background: '#f0fdfa', border: '1px solid #99f6e4' }}>
              <h3 className="font-bold mb-2" style={{ color: '#0f172a' }}>💳 0% Interest EMI Available on All Treatments</h3>
              <p className="text-sm" style={{ color: '#475569' }}>EMI options available through HDFC, ICICI, Axis, Kotak & more. Minimum treatment value: ₹5,000</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16" style={{ background: '#f8fafc' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl overflow-hidden shadow-premium" style={{ background: 'white' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: 'linear-gradient(135deg, #0f172a, #0d4f4a)', color: 'white' }}>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Treatment</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold">Price Range</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold hidden md:table-cell">Duration</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold hidden lg:table-cell">EMI Option</th>
                  </tr>
                </thead>
                <tbody>
                  {treatmentPrices.map((t, i) => (
                    <tr key={t.treatment} style={{ background: i % 2 === 0 ? 'white' : '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <td className="px-6 py-4 font-medium text-sm" style={{ color: '#0f172a' }}>{t.treatment}</td>
                      <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#0d9488' }}>
                        {t.minPrice === 0 ? 'Free' : `₹${t.minPrice.toLocaleString('en-IN')} – ₹${t.maxPrice.toLocaleString('en-IN')}`}
                        <span className="ml-1 text-xs font-normal" style={{ color: '#94a3b8' }}>/ {t.unit}</span>
                      </td>
                      <td className="px-6 py-4 text-sm hidden md:table-cell" style={{ color: '#475569' }}>{t.duration}</td>
                      <td className="px-6 py-4 text-sm hidden lg:table-cell" style={{ color: t.emi ? '#f59e0b' : '#94a3b8' }}>
                        {t.emi || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-4 text-center" style={{ color: '#94a3b8' }}>
              *Prices are indicative and may vary based on complexity. Final pricing after consultation. All prices inclusive of GST.
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 text-center" style={{ background: 'white' }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>Not Sure What You Need?</h2>
          <p className="mb-6" style={{ color: '#64748b' }}>Book a free consultation and get an exact treatment plan and quote.</p>
          <a href="/contact" className="inline-block px-8 py-4 rounded-xl font-bold text-white hover:opacity-90" style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
            Book Free Consultation
          </a>
        </div>
      </section>
    </div>
  );
}
