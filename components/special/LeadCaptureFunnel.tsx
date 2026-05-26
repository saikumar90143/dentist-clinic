'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    question: 'How urgent is your dental concern?',
    options: [
      { id: 'emergency', label: 'Emergency – Need help TODAY', icon: '🚨', color: '#ef4444' },
      { id: 'urgent', label: 'Urgent – Within this week', icon: '⚡', color: '#f59e0b' },
      { id: 'planned', label: 'Planned – Within a month', icon: '📅', color: '#3b82f6' },
      { id: 'exploring', label: 'Just exploring options', icon: '🔍', color: '#8b5cf6' },
    ],
  },
  {
    id: 2,
    question: "What's your main dental concern?",
    options: [
      { id: 'pain', label: 'Tooth Pain', icon: '😖', color: '#ef4444' },
      { id: 'crooked', label: 'Crooked Teeth', icon: '😬', color: '#f59e0b' },
      { id: 'missing', label: 'Missing Tooth', icon: '🕳️', color: '#6366f1' },
      { id: 'yellow', label: 'Yellow / Stained', icon: '😐', color: '#f59e0b' },
      { id: 'gum', label: 'Gum Issues', icon: '🩸', color: '#ec4899' },
      { id: 'makeover', label: 'Full Smile Makeover', icon: '✨', color: '#0d9488' },
    ],
  },
  {
    id: 3,
    question: 'Rate your pain level (if any)',
    isPainScale: true,
  },
  {
    id: 4,
    question: 'When would you prefer to visit?',
    options: [
      { id: 'morning', label: 'Morning (9am – 12pm)', icon: '🌅', color: '#f59e0b' },
      { id: 'afternoon', label: 'Afternoon (12pm – 4pm)', icon: '☀️', color: '#f97316' },
      { id: 'evening', label: 'Evening (4pm – 8pm)', icon: '🌆', color: '#8b5cf6' },
      { id: 'weekend', label: 'Weekend only', icon: '🗓️', color: '#0d9488' },
    ],
  },
  {
    id: 5,
    question: "Almost done! Share your contact details",
    isContact: true,
  },
];

const recommendations: Record<string, string> = {
  pain: 'Root Canal Treatment or Extraction based on severity.',
  crooked: 'Invisible Braces or Traditional Braces for alignment.',
  missing: 'Dental Implants — the best permanent tooth replacement.',
  yellow: 'Professional Laser Teeth Whitening.',
  gum: 'Laser Gum Therapy with Dr. Sunita Patel.',
  makeover: 'Smile Designing with Dr. Priya Verma.',
};

export default function LeadCaptureFunnel() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [painLevel, setPainLevel] = useState(0);
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleOption = (stepId: number, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [stepId]: optionId }));
    if (stepId < 5) setTimeout(() => setStep(stepId + 1), 300);
  };

  const handleSubmit = () => {
    if (!contact.name || !contact.phone) return;
    setSubmitted(true);
  };

  const painEmojis = ['😌', '🙂', '😐', '😕', '😟', '😩', '😫', '😭', '🤯', '💀', '☠️'];

  if (submitted) {
    const concern = answers[2] || 'general';
    return (
      <div className="rounded-3xl p-8 text-center shadow-premium" style={{ background: 'linear-gradient(135deg, #0f172a, #0d4f4a)', color: 'white' }}>
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-2">Your Consultation is Confirmed!</h3>
        <p className="mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Based on your concern, we recommend: <strong style={{ color: '#14b8a6' }}>{recommendations[concern] || 'A full dental check-up.'}</strong>
        </p>
        <div className="rounded-2xl p-4 mb-6" style={{ background: 'rgba(13,148,136,0.2)', border: '1px solid rgba(13,148,136,0.4)' }}>
          <p className="font-semibold">{contact.name}, we'll call you at {contact.phone} within 2 hours!</p>
        </div>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Or call us directly: <a href="tel:+919876543210" className="underline text-teal-400">+91-9876543210</a></p>
      </div>
    );
  }

  const currentStep = steps[step - 1];

  return (
    <div className="rounded-3xl overflow-hidden shadow-premium" style={{ background: 'linear-gradient(135deg, #0f172a, #0d4f4a)' }}>
      {/* Progress */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>Step {step} of 5</span>
          <span className="text-sm font-medium" style={{ color: '#14b8a6' }}>{Math.round((step / 5) * 100)}% complete</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #0d9488, #3b82f6)' }}
            animate={{ width: `${(step / 5) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="px-8 pb-8"
        >
          <h3 className="text-xl font-bold text-white mb-6">{currentStep.question}</h3>

          {currentStep.options && (
            <div className="grid grid-cols-2 gap-3">
              {currentStep.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleOption(step, opt.id)}
                  className="flex items-start gap-3 p-4 rounded-2xl text-left transition-all hover:scale-105"
                  style={{
                    background: answers[step] === opt.id ? `${opt.color}33` : 'rgba(255,255,255,0.07)',
                    border: `1px solid ${answers[step] === opt.id ? opt.color : 'rgba(255,255,255,0.1)'}`,
                    color: 'white',
                  }}
                >
                  <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          )}

          {currentStep.isPainScale && (
            <div>
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">{painEmojis[painLevel]}</div>
                <div className="text-3xl font-bold text-white">{painLevel}/10</div>
                <p style={{ color: 'rgba(255,255,255,0.6)' }} className="text-sm">
                  {painLevel === 0 ? 'No pain' : painLevel < 4 ? 'Mild pain' : painLevel < 7 ? 'Moderate pain' : 'Severe pain'}
                </p>
              </div>
              <input
                type="range" min={0} max={10} value={painLevel}
                onChange={(e) => setPainLevel(Number(e.target.value))}
                className="w-full mb-6 accent-teal-500"
              />
              <div className="flex justify-between text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <span>0 – No pain</span><span>5 – Moderate</span><span>10 – Severe</span>
              </div>
              <button
                onClick={() => { setAnswers((p) => ({ ...p, [step]: painLevel.toString() })); setStep(step + 1); }}
                className="mt-6 w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-white"
                style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}
              >
                Continue <ArrowRight size={16} />
              </button>
            </div>
          )}

          {currentStep.isContact && (
            <div className="space-y-4">
              <input
                type="text" placeholder="Your Full Name *"
                value={contact.name} onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 outline-none"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
              />
              <input
                type="tel" placeholder="WhatsApp Number *"
                value={contact.phone} onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 outline-none"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
              />
              <input
                type="email" placeholder="Email Address (optional)"
                value={contact.email} onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/40 outline-none"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
              />
              <button
                onClick={handleSubmit}
                disabled={!contact.name || !contact.phone}
                className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-white transition-all disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}
              >
                <CheckCircle size={18} /> Get My Free Consultation
              </button>
              <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                🔒 Your information is 100% secure and private
              </p>
            </div>
          )}

          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              ← Back
            </button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
