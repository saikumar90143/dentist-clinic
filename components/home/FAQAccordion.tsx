'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/lib/data/faqs';
import SectionHeader from '@/components/shared/SectionHeader';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const displayFaqs = faqs.slice(0, 8);

  return (
    <section className="section-padding" style={{ background: 'white' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Have questions? We have answers. Browse our most common questions or contact us directly."
          centered
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl overflow-hidden"
              style={{
                border: openId === faq.id ? '1px solid #0d9488' : '1px solid #e2e8f0',
                background: openId === faq.id ? '#f0fdfa' : 'white',
              }}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-start justify-between gap-4 p-5 text-left transition-colors"
              >
                <span className="font-semibold text-sm leading-relaxed" style={{ color: '#0f172a' }}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 mt-0.5"
                >
                  <ChevronDown size={18} style={{ color: '#0d9488' }} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#475569' }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="mb-4" style={{ color: '#64748b' }}>Still have questions? We&apos;re here to help.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/faq"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}
            >
              View All FAQs
            </a>
            <a
              href="https://wa.me/919876543210"
              className="px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-90"
              style={{ background: '#f0fdfa', color: '#0d9488', border: '1px solid #99f6e4' }}
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
