'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '@/components/shared/SectionHeader';

type ToothZone = 'crown' | 'enamel' | 'dentin' | 'pulp' | 'root' | 'ligament' | 'bone' | null;

const zoneInfo: Record<string, { name: string; description: string; problems: string[]; treatment: string; color: string }> = {
  crown: {
    name: 'Crown',
    description: 'The crown is the visible portion of the tooth above the gum line. It is covered by enamel, the hardest substance in the human body.',
    problems: ['Tooth decay (cavities)', 'Chipping or cracking', 'Discoloration', 'Fractures'],
    treatment: 'Fillings, Crowns, Veneers, or Teeth Whitening at SmileCraft',
    color: '#f0fdfa',
  },
  enamel: {
    name: 'Enamel',
    description: 'Enamel is the outermost layer of the tooth — the hardest biological substance. It protects the inner layers but can erode due to acid.',
    problems: ['Enamel erosion from acidic foods', 'Sensitivity', 'Discoloration', 'Hairline cracks'],
    treatment: 'Fluoride treatments, Veneers, Bonding at SmileCraft',
    color: '#ccfbf1',
  },
  dentin: {
    name: 'Dentin',
    description: 'Dentin lies beneath the enamel and is a yellowish, porous tissue. When exposed, it causes sensitivity as it contains tiny tubules leading to the nerve.',
    problems: ['Sensitivity to hot/cold/sweet', 'Cavity progression', 'Darkening of tooth color'],
    treatment: 'Desensitizing treatments, Fillings, Root Canal if needed at SmileCraft',
    color: '#fef3c7',
  },
  pulp: {
    name: 'Dental Pulp',
    description: 'The pulp is the innermost living part of the tooth containing nerves and blood vessels. Infection here causes intense pain.',
    problems: ['Severe toothache', 'Dental abscess', 'Pulpitis', 'Nerve death'],
    treatment: 'Root Canal Treatment (RCT) by our specialists at SmileCraft',
    color: '#fecaca',
  },
  root: {
    name: 'Root',
    description: 'The root anchors the tooth in the jawbone. It extends below the gum line and is covered by cementum, not enamel.',
    problems: ['Root fractures', 'Root resorption', 'Root exposure (recession)', 'Root infection'],
    treatment: 'Root Canal, Extraction & Implant if needed at SmileCraft',
    color: '#dbeafe',
  },
  ligament: {
    name: 'Periodontal Ligament',
    description: 'A fibrous tissue connecting the root to the jawbone, acting as a shock absorber. Gum disease attacks this ligament.',
    problems: ['Periodontal disease', 'Bone loss', 'Tooth loosening', 'Gum recession'],
    treatment: 'Gum Surgery & Laser Therapy by Dr. Sunita at SmileCraft',
    color: '#f3e8ff',
  },
  bone: {
    name: 'Alveolar Bone',
    description: 'The jawbone (alveolar bone) surrounds and supports the tooth roots. Bone loss from gum disease can lead to tooth loss.',
    problems: ['Bone loss from periodontitis', 'Bone resorption after extraction', 'Reduced implant site'],
    treatment: 'Bone Grafting before Implants, Periodontal Surgery at SmileCraft',
    color: '#e0f2fe',
  },
};

export default function ToothAnatomyViewer() {
  const [activeZone, setActiveZone] = useState<ToothZone>(null);
  const info = activeZone ? zoneInfo[activeZone] : null;

  return (
    <section className="section-padding" style={{ background: '#f8fafc' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Dental Education"
          title="Interactive Tooth Anatomy"
          subtitle="Click on any part of the tooth to learn about it, common problems, and treatments."
          centered
        />

        <div className="mt-12 flex flex-col lg:flex-row gap-8 items-center">
          {/* SVG Tooth */}
          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
            <svg
              viewBox="0 0 220 380"
              className="w-64 h-auto"
              style={{ filter: 'drop-shadow(0 10px 30px rgba(13,148,136,0.15))' }}
            >
              {/* Alveolar Bone */}
              <g onClick={() => setActiveZone('bone')} className="tooth-zone cursor-pointer" style={{ opacity: activeZone === 'bone' ? 0.9 : 1 }}>
                <rect x="10" y="280" width="200" height="90" rx="10" fill={activeZone === 'bone' ? '#bae6fd' : '#e0f2fe'} stroke="#38bdf8" strokeWidth="2" />
                <text x="110" y="330" textAnchor="middle" fontSize="11" fill="#0284c7" fontWeight="600">Alveolar Bone</text>
              </g>

              {/* Periodontal Ligament */}
              <g onClick={() => setActiveZone('ligament')} className="tooth-zone cursor-pointer">
                <rect x="60" y="200" width="14" height="100" rx="3" fill={activeZone === 'ligament' ? '#c4b5fd' : '#e9d5ff'} stroke="#a78bfa" strokeWidth="1.5" />
                <rect x="146" y="200" width="14" height="100" rx="3" fill={activeZone === 'ligament' ? '#c4b5fd' : '#e9d5ff'} stroke="#a78bfa" strokeWidth="1.5" />
              </g>

              {/* Root */}
              <g onClick={() => setActiveZone('root')} className="tooth-zone cursor-pointer">
                <path d="M74 195 L74 295 Q85 320 100 330 Q120 310 130 280 L130 195 Z"
                  fill={activeZone === 'root' ? '#93c5fd' : '#bfdbfe'} stroke="#60a5fa" strokeWidth="2" />
                <text x="102" y="270" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="500">Root</text>
              </g>

              {/* Pulp */}
              <g onClick={() => setActiveZone('pulp')} className="tooth-zone cursor-pointer">
                <path d="M90 80 L90 220 Q100 240 110 235 Q120 240 120 220 L120 80 Z"
                  fill={activeZone === 'pulp' ? '#f87171' : '#fca5a5'} stroke="#ef4444" strokeWidth="1.5" />
                <text x="105" y="160" textAnchor="middle" fontSize="9" fill="#991b1b" fontWeight="600">Pulp</text>
              </g>

              {/* Dentin */}
              <g onClick={() => setActiveZone('dentin')} className="tooth-zone cursor-pointer">
                <path d="M70 60 Q70 20 110 10 Q150 20 150 60 L150 200 Q125 225 110 220 Q85 225 70 200 Z"
                  fill={activeZone === 'dentin' ? '#fde68a' : '#fef3c7'} stroke="#fbbf24" strokeWidth="2" />
                <text x="110" y="190" textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="500">Dentin</text>
              </g>

              {/* Enamel */}
              <g onClick={() => setActiveZone('enamel')} className="tooth-zone cursor-pointer">
                <path d="M76 60 Q76 28 110 18 Q144 28 144 60 L144 110 Q110 118 76 110 Z"
                  fill={activeZone === 'enamel' ? '#99f6e4' : '#ccfbf1'} stroke="#2dd4bf" strokeWidth="2" />
                <text x="110" y="80" textAnchor="middle" fontSize="10" fill="#0f766e" fontWeight="600">Enamel</text>
              </g>

              {/* Crown (top visible) */}
              <g onClick={() => setActiveZone('crown')} className="tooth-zone cursor-pointer">
                <path d="M80 60 Q65 25 75 5 Q90 -5 110 8 Q130 -5 145 5 Q155 25 140 60 Q110 72 80 60 Z"
                  fill={activeZone === 'crown' ? '#5eead4' : '#ccfbf1'} stroke="#0d9488" strokeWidth="2.5" />
                <text x="110" y="35" textAnchor="middle" fontSize="10" fill="#0f766e" fontWeight="700">Crown</text>
              </g>

              {/* Gum line indicator */}
              <line x1="40" y1="195" x2="180" y2="195" stroke="#64748b" strokeWidth="1.5" strokeDasharray="6,4" />
              <text x="185" y="198" fontSize="9" fill="#64748b">Gum line</text>

              {/* Active zone glow */}
              {activeZone && (
                <circle
                  cx="110" cy="100"
                  r="90"
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="1"
                  opacity="0.3"
                  strokeDasharray="5,5"
                />
              )}
            </svg>
          </div>

          {/* Info Panel */}
          <div className="flex-1 min-h-[340px]">
            <AnimatePresence mode="wait">
              {info ? (
                <motion.div
                  key={activeZone}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="rounded-3xl p-8 h-full shadow-premium"
                  style={{ background: 'white', border: '1px solid #e2e8f0' }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4"
                    style={{ background: info.color, color: '#0f172a' }}>
                    🦷 {info.name}
                  </div>

                  <p className="mb-5 leading-relaxed" style={{ color: '#334155' }}>{info.description}</p>

                  <div className="mb-5">
                    <h4 className="font-bold text-sm mb-2" style={{ color: '#ef4444' }}>⚠️ Common Problems</h4>
                    <ul className="space-y-1">
                      {info.problems.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm" style={{ color: '#475569' }}>
                          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: '#ef4444' }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl p-4" style={{ background: '#f0fdfa', border: '1px solid #99f6e4' }}>
                    <h4 className="font-bold text-sm mb-1" style={{ color: '#0d9488' }}>✅ Treatment at SmileCraft</h4>
                    <p className="text-sm" style={{ color: '#134e4a' }}>{info.treatment}</p>
                  </div>

                  <a href="/contact" className="inline-flex items-center gap-2 mt-4 text-sm font-semibold" style={{ color: '#0d9488' }}>
                    Book a Consultation →
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-3xl p-8 h-full flex flex-col items-center justify-center text-center shadow-premium"
                  style={{ background: 'white', border: '1px solid #e2e8f0' }}
                >
                  <div className="text-6xl mb-4">👆</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#0f172a' }}>Click on the Tooth</h3>
                  <p style={{ color: '#64748b' }}>Select any part of the tooth diagram on the left to learn about its anatomy, common problems, and available treatments.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Zone buttons for mobile */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center lg:hidden">
          {Object.keys(zoneInfo).map((zone) => (
            <button
              key={zone}
              onClick={() => setActiveZone(zone as ToothZone)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: activeZone === zone ? '#0d9488' : '#f0fdfa',
                color: activeZone === zone ? 'white' : '#0d9488',
                border: '1px solid #99f6e4',
              }}
            >
              {zoneInfo[zone].name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
