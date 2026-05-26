'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

export default function CostEstimator() {
  const [treatment, setTreatment] = useState('');
  const [complexity, setComplexity] = useState(1);
  const [units, setUnits] = useState(1);

  const treatments: Record<string, { min: number; max: number; label: string; unitLabel?: string; maxUnits?: number }> = {
    implants: { min: 25000, max: 60000, label: 'Dental Implants', unitLabel: 'Number of implants', maxUnits: 8 },
    whitening: { min: 8000, max: 20000, label: 'Teeth Whitening', unitLabel: 'Shade improvement (1-10)', maxUnits: 10 },
    braces: { min: 45000, max: 120000, label: 'Invisible Braces', unitLabel: 'Complexity level (1-3)', maxUnits: 3 },
    'metal-braces': { min: 20000, max: 40000, label: 'Metal Braces', unitLabel: 'Complexity level (1-3)', maxUnits: 3 },
    'root-canal': { min: 5000, max: 12000, label: 'Root Canal', unitLabel: 'Number of teeth', maxUnits: 4 },
    veneers: { min: 12000, max: 20000, label: 'Porcelain Veneers', unitLabel: 'Number of teeth', maxUnits: 8 },
    smile: { min: 30000, max: 150000, label: 'Smile Designing', unitLabel: 'Complexity level (1-3)', maxUnits: 3 },
  };

  const current = treatment ? treatments[treatment] : null;
  const estimate = current ? {
    min: Math.round((current.min * units * (1 + complexity * 0.15)) / 1000) * 1000,
    max: Math.round((current.max * units * (1 + complexity * 0.15)) / 1000) * 1000,
  } : null;

  const emi = estimate ? Math.round(estimate.min / 24 / 100) * 100 : 0;

  return (
    <section className="section-padding" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdfa 100%)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Cost Estimator"
          title="Estimate Your Treatment Cost"
          subtitle="Get an instant estimate for your dental treatment. Book a free consultation for exact pricing."
          centered
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Controls */}
          <div className="rounded-3xl p-8 shadow-premium" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: '#0f172a' }}>Select Your Treatment</h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {Object.entries(treatments).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => { setTreatment(key); setUnits(1); setComplexity(1); }}
                  className="p-3 rounded-xl text-left text-sm font-medium transition-all"
                  style={{
                    background: treatment === key ? 'linear-gradient(135deg, #0d9488, #3b82f6)' : '#f8fafc',
                    color: treatment === key ? 'white' : '#334155',
                    border: treatment === key ? 'none' : '1px solid #e2e8f0',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {current && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: '#475569' }}>
                      {current.unitLabel}: <strong style={{ color: '#0d9488' }}>{units}</strong>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={current.maxUnits || 5}
                      value={units}
                      onChange={(e) => setUnits(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                    <div className="flex justify-between text-xs mt-1" style={{ color: '#94a3b8' }}>
                      <span>1</span><span>{current.maxUnits || 5}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block" style={{ color: '#475569' }}>
                      Case complexity: <strong style={{ color: '#0d9488' }}>{['Simple', 'Moderate', 'Complex'][complexity - 1]}</strong>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={3}
                      value={complexity}
                      onChange={(e) => setComplexity(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                    <div className="flex justify-between text-xs mt-1" style={{ color: '#94a3b8' }}>
                      <span>Simple</span><span>Moderate</span><span>Complex</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!treatment && (
              <p className="text-sm text-center py-4" style={{ color: '#94a3b8' }}>
                ← Select a treatment to see estimated costs
              </p>
            )}
          </div>

          {/* Right: Estimate */}
          <div className="rounded-3xl p-8 shadow-premium text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 100%)' }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #14b8a6, transparent 60%)' }} />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Your Estimated Cost</h3>
              <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>*Indicative pricing. Final cost may vary.</p>

              <AnimatePresence mode="wait">
                {estimate ? (
                  <motion.div key="estimate" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold mb-1" style={{ background: 'linear-gradient(135deg, #14b8a6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        ₹{estimate.min.toLocaleString('en-IN')} –
                      </div>
                      <div className="text-4xl font-bold" style={{ background: 'linear-gradient(135deg, #14b8a6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        ₹{estimate.max.toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* EMI */}
                    <div className="rounded-2xl p-4 mb-6" style={{ background: 'rgba(13,148,136,0.2)', border: '1px solid rgba(13,148,136,0.4)' }}>
                      <p className="text-sm font-medium" style={{ color: '#5eead4' }}>0% EMI Available</p>
                      <p className="text-2xl font-bold">≈ ₹{emi.toLocaleString('en-IN')}/month</p>
                      <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>For 24 months via partner banks</p>
                    </div>

                    {/* Inclusions */}
                    <div className="space-y-2 mb-6">
                      {['Free consultation included', 'No hidden charges', 'Insurance accepted', 'Flexible EMI options'].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                          <CheckCircle size={14} style={{ color: '#14b8a6', flexShrink: 0 }} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                    <div className="text-6xl mb-4">🦷</div>
                    <p style={{ color: 'rgba(255,255,255,0.5)' }}>Select a treatment to see your estimate</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <a
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}
              >
                Get Exact Quote <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
