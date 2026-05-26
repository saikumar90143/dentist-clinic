'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs, faqCategories } from '@/lib/data/faqs';
import { ChevronDown, Search } from 'lucide-react';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === 'All' || f.category === activeCategory;
    const matchSearch = search === '' || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 60%, #0f172a 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'rgba(13,148,136,0.3)', border: '1px solid rgba(13,148,136,0.5)', color: '#5eead4' }}>FAQ</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Frequently Asked Questions</h1>
          <p className="text-lg opacity-80 mb-8">Find answers to all your dental questions right here.</p>
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }} />
            <input
              type="text" placeholder="Search questions..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
            />
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <section className="py-8 sticky top-16 z-10" style={{ background: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: activeCategory === cat ? '#0d9488' : '#f8fafc',
                  color: activeCategory === cat ? 'white' : '#475569',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? '#0d9488' : '#e2e8f0',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0f172a' }}>No results found</h3>
              <p style={{ color: '#64748b' }}>Try a different search term or category</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: openId === faq.id ? '1px solid #0d9488' : '1px solid #e2e8f0',
                    background: openId === faq.id ? '#f0fdfa' : 'white',
                  }}
                >
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full flex items-start justify-between gap-4 p-5 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5"
                        style={{ background: '#f0fdfa', color: '#0d9488' }}>{faq.category}</span>
                      <span className="font-semibold text-sm" style={{ color: '#0f172a' }}>{faq.question}</span>
                    </div>
                    <motion.div animate={{ rotate: openId === faq.id ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                      <ChevronDown size={18} style={{ color: '#0d9488' }} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
                        <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: '#475569' }}>{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-16 text-center" style={{ background: '#f8fafc' }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>Still Have Questions?</h2>
          <p className="mb-6" style={{ color: '#64748b' }}>Our team is ready to answer any specific questions you have about your dental care.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://wa.me/919876543210" className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: '#25d366' }}>💬 WhatsApp Us</a>
            <a href="tel:+919876543210" className="px-6 py-3 rounded-xl font-semibold" style={{ background: '#f0fdfa', color: '#0d9488', border: '1px solid #99f6e4' }}>📞 Call Us</a>
            <a href="/contact" className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>📅 Book Consultation</a>
          </div>
        </div>
      </section>
    </div>
  );
}
