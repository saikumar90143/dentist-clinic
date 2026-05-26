'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Users,
  Award,
  Stethoscope,
  Star,
} from 'lucide-react';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

const stats = [
  {
    id: 1,
    icon: Users,
    value: 15000,
    suffix: '+',
    label: 'Patients Treated',
    subLabel: 'Happy smiles crafted over two decades',
    color: 'from-teal-500 to-teal-700',
    iconBg: 'rgba(13,148,136,0.15)',
    iconColor: '#0d9488',
    borderColor: 'rgba(13,148,136,0.3)',
    glowColor: 'rgba(13,148,136,0.12)',
  },
  {
    id: 2,
    icon: Award,
    value: 20,
    suffix: '+',
    label: 'Years of Excellence',
    subLabel: 'Trusted expertise since 2004',
    color: 'from-blue-400 to-blue-600',
    iconBg: 'rgba(59,130,246,0.15)',
    iconColor: '#3b82f6',
    borderColor: 'rgba(59,130,246,0.3)',
    glowColor: 'rgba(59,130,246,0.10)',
  },
  {
    id: 3,
    icon: Stethoscope,
    value: 5000,
    suffix: '+',
    label: 'Successful Procedures',
    subLabel: 'Implants, cosmetics & advanced care',
    color: 'from-teal-400 to-blue-500',
    iconBg: 'rgba(13,148,136,0.15)',
    iconColor: '#14b8a6',
    borderColor: 'rgba(20,184,166,0.3)',
    glowColor: 'rgba(20,184,166,0.10)',
  },
  {
    id: 4,
    icon: Star,
    value: 4.9,
    suffix: '/5.0',
    label: 'Average Rating',
    subLabel: 'Based on 1,200+ Google reviews',
    color: 'from-gold-500 to-gold-400',
    iconBg: 'rgba(245,158,11,0.15)',
    iconColor: '#f59e0b',
    borderColor: 'rgba(245,158,11,0.3)',
    glowColor: 'rgba(245,158,11,0.10)',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as any,
    },
  },
};

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-32"
      style={{
        background: 'linear-gradient(135deg, #f0fdfa 0%, #f8fafc 40%, #eff6ff 100%)',
      }}
    >
      {/* Subtle background mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(13,148,136,0.06) 0%, transparent 60%),
                            radial-gradient(circle at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 60%),
                            radial-gradient(circle at 60% 80%, rgba(245,158,11,0.04) 0%, transparent 50%)`,
        }}
      />

      {/* Top decorative line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(13,148,136,0.3), rgba(59,130,246,0.3), transparent)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" as any }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              background: 'rgba(13,148,136,0.1)',
              border: '1px solid rgba(13,148,136,0.25)',
              color: '#0d9488',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#0d9488' }}
            />
            Our Track Record
          </motion.div>

          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#0f172a' }}
          >
            Numbers That{' '}
            <span className="gradient-text">Speak for Themselves</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#475569' }}
          >
            Two decades of excellence reflected in every smile we've crafted and every
            life we've transformed in New Delhi.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="relative group rounded-2xl overflow-hidden cursor-default"
                style={{
                  background: `linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)`,
                  border: `1px solid ${stat.borderColor}`,
                  boxShadow: `0 4px 24px ${stat.glowColor}, 0 1px 4px rgba(0,0,0,0.06)`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Top accent bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}
                />

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${stat.glowColor} 0%, transparent 70%)`,
                  }}
                />

                <div className="relative p-7">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: stat.iconBg,
                      border: `1px solid ${stat.borderColor}`,
                    }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: stat.iconColor }}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Counter value */}
                  <div
                    className={`font-display text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text`}
                    style={{ WebkitTextFillColor: 'transparent' }}
                  >
                    <AnimatedCounter
                      from={0}
                      to={stat.value}
                      duration={2.2}
                      suffix={stat.suffix}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                  </div>

                  {/* Label */}
                  <p
                    className="text-base font-bold mb-1"
                    style={{ color: '#0f172a' }}
                  >
                    {stat.label}
                  </p>

                  {/* Sub-description */}
                  <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>
                    {stat.subLabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom trust bar */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>
            ✓ ISO Certified &nbsp;·&nbsp; ✓ NABH Accredited &nbsp;·&nbsp; ✓ Award-Winning Team &nbsp;·&nbsp; ✓ 24/7 Emergency Care
          </p>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), rgba(13,148,136,0.2), transparent)',
        }}
      />
    </section>
  );
}

