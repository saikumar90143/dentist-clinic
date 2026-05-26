'use client';

import { useState, FormEvent } from 'react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');

    /* Simulate API call */
    await new Promise((res) => setTimeout(res, 1200));
    setStatus('success');
    setEmail('');
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 px-5 py-3 rounded-xl" style={{ backgroundColor: 'rgba(13,148,136,0.15)', border: '1px solid rgba(13,148,136,0.3)' }}>
        <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#14b8a6' }} />
        <span className="text-sm font-semibold" style={{ color: '#f8fafc' }}>
          You&apos;re subscribed! Thank you. 🎉
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full md:max-w-md"
      noValidate
    >
      <div className="relative flex-1">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500/60 transition-all"
          style={{
            backgroundColor: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#f8fafc',
          }}
          aria-label="Email address for newsletter"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #0d9488, #0f766e)',
          boxShadow: '0 4px 20px rgba(13,148,136,0.35)',
        }}
      >
        {status === 'loading' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            Subscribe
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
