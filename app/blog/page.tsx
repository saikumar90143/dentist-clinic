'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { blogPosts, blogCategories } from '@/lib/data/blog-posts';

const categoryColors: Record<string, string> = {
  'Dental Health': '#0d9488', 'Cosmetic': '#8b5cf6', 'Implants': '#3b82f6',
  'Orthodontics': '#f59e0b', 'Gum Health': '#ef4444', default: '#64748b',
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const featured = blogPosts.filter((p) => p.featured);
  const filtered = activeCategory === 'All' ? blogPosts : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 60%, #0f172a 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'rgba(13,148,136,0.3)', border: '1px solid rgba(13,148,136,0.5)', color: '#5eead4' }}>
            Dental Tips & News
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Dental Health Blog
          </h1>
          <p className="text-lg opacity-80">Expert advice, dental tips, and the latest news from our specialists.</p>
        </div>
      </section>

      {/* Featured posts */}
      {featured.length > 0 && (
        <section className="py-12" style={{ background: '#f8fafc' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-6" style={{ color: '#0f172a' }}>Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((post, index) => {
                const catColor = categoryColors[post.category] || categoryColors.default;
                return (
                  <motion.a
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl overflow-hidden card-hover block shadow-premium"
                    style={{ background: 'white' }}
                  >
                    <div className="h-44 flex items-center justify-center text-4xl" style={{ background: `linear-gradient(135deg, ${catColor}22, ${catColor}44)` }}>🦷</div>
                    <div className="p-5">
                      <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full" style={{ background: catColor }}>{post.category}</span>
                      <h3 className="font-bold mt-2 mb-1 leading-tight" style={{ color: '#0f172a' }}>{post.title}</h3>
                      <p className="text-xs mb-3 line-clamp-2" style={{ color: '#64748b' }}>{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs" style={{ color: '#94a3b8' }}>
                        <span>{post.author.split(' ').slice(0, 2).join(' ')}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Category filter */}
      <section className="py-6 sticky top-16 z-10" style={{ background: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {blogCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background: activeCategory === cat ? '#0d9488' : '#f8fafc',
                  color: activeCategory === cat ? 'white' : '#475569',
                  border: '1px solid', borderColor: activeCategory === cat ? '#0d9488' : '#e2e8f0',
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All posts */}
      <section className="py-12" style={{ background: '#f8fafc' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, index) => {
              const catColor = categoryColors[post.category] || categoryColors.default;
              return (
                <motion.a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl overflow-hidden card-hover block"
                  style={{ background: 'white', border: '1px solid #e2e8f0' }}
                >
                  <div className="h-36 flex items-center justify-center text-3xl" style={{ background: `linear-gradient(135deg, ${catColor}11, ${catColor}33)` }}>🦷</div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-white px-2 py-0.5 rounded-full" style={{ background: catColor }}>{post.category}</span>
                    <h3 className="font-bold mt-2 mb-1 text-sm leading-tight" style={{ color: '#0f172a' }}>{post.title}</h3>
                    <p className="text-xs mb-3 line-clamp-2" style={{ color: '#64748b' }}>{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs" style={{ color: '#94a3b8' }}>
                      <span>{post.author.split(' ').slice(0, 2).join(' ')}</span>
                      <span>{post.date} · {post.readTime}</span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 text-center" style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>Get Dental Tips in Your Inbox</h2>
          <p className="text-white opacity-80 mb-6">Monthly dental health tips, special offers, and news from our specialists.</p>
          <div className="flex max-w-md mx-auto gap-3">
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }} />
            <button className="px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90" style={{ background: 'white', color: '#0d9488' }}>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
