'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials, googleRating, totalReviews } from '@/lib/data/testimonials';
import SectionHeader from '@/components/shared/SectionHeader';

export default function GoogleReviews() {
  const displayReviews = testimonials.slice(0, 4);

  return (
    <section className="section-padding" style={{ background: '#f8fafc' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Google Reviews"
          title={`${googleRating} Stars on Google`}
          subtitle={`${totalReviews.toLocaleString()} verified patient reviews. We're proud of every smile we've created.`}
          centered
        />

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col items-center mb-10"
        >
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={32} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>
          <div className="text-5xl font-bold mb-1" style={{ color: '#0f172a' }}>{googleRating}</div>
          <p style={{ color: '#64748b' }}>{totalReviews.toLocaleString()} Google Reviews</p>

          {/* Google logo styled */}
          <div className="mt-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#4285f4' }}>G</div>
            <span className="text-sm font-medium" style={{ color: '#334155' }}>Verified on Google</span>
          </div>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl p-5 card-hover"
              style={{ background: 'white', border: '1px solid #e2e8f0' }}
            >
              {/* Google G */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#4285f4' }}>G</div>
              </div>

              <p className="text-sm leading-relaxed mb-4 line-clamp-4" style={{ color: '#334155' }}>
                &ldquo;{review.review}&rdquo;
              </p>

              <div className="border-t pt-3" style={{ borderColor: '#f1f5f9' }}>
                <div className="font-semibold text-sm" style={{ color: '#0f172a' }}>{review.name}</div>
                <div className="text-xs" style={{ color: '#94a3b8' }}>{review.location} · {review.date}</div>
                <div className="text-xs mt-1 font-medium" style={{ color: '#0d9488' }}>{review.treatment}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://g.co/kgs/smilecraftdental"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-90 text-white"
            style={{ background: '#4285f4' }}
          >
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs font-bold" style={{ color: '#4285f4' }}>G</div>
            See All {totalReviews.toLocaleString()} Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
