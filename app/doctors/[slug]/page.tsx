import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { doctors } from '@/lib/data/doctors';
import { Star, CheckCircle, MapPin, Languages, Calendar, Award } from 'lucide-react';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) return { title: 'Doctor Not Found' };
  return {
    title: `${doctor.name} | ${doctor.specialization} | SmileCraft Delhi`,
    description: doctor.bio,
    alternates: { canonical: `https://smilecraftdental.com/doctors/${slug}` },
  };
}

export default async function DoctorPage({ params }: Props) {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) notFound();

  const initials = doctor.name.split(' ').filter((_, i) => i > 0).map((n) => n[0]).join('');

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 60%, #0f172a 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="w-40 h-40 rounded-full flex-shrink-0 flex items-center justify-center text-4xl font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)', border: '4px solid rgba(255,255,255,0.2)' }}>
              {initials}
            </div>
            <div className="text-white text-center md:text-left">
              <p className="text-sm font-medium mb-2" style={{ color: '#5eead4' }}>{doctor.specialization}</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>{doctor.name}</h1>
              <p className="text-lg opacity-80 mb-4">{doctor.title}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="flex items-center gap-1 glass px-3 py-1 rounded-full text-sm">
                  <Star size={14} fill="#f59e0b" color="#f59e0b" />
                  <span>{doctor.rating} ({doctor.reviewCount} reviews)</span>
                </div>
                <div className="glass px-3 py-1 rounded-full text-sm">{doctor.experience}+ Years Experience</div>
                {doctor.certifications.slice(0, 1).map((c) => (
                  <div key={c} className="glass px-3 py-1 rounded-full text-sm">{c}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* Bio */}
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>About Dr. {doctor.name.split(' ')[1]}</h2>
              <p className="leading-relaxed" style={{ color: '#334155' }}>{doctor.bio}</p>
            </div>

            {/* Qualifications */}
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0f172a' }}>Qualifications</h3>
              <div className="space-y-2">
                {doctor.qualifications.map((q) => (
                  <div key={q} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <CheckCircle size={16} style={{ color: '#0d9488', flexShrink: 0, marginTop: 2 }} />
                    <span className="text-sm" style={{ color: '#334155' }}>{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-xl font-bold mb-6" style={{ color: '#0f172a' }}>Career Timeline</h3>
              <div className="relative pl-6 border-l-2" style={{ borderColor: '#0d9488' }}>
                {doctor.timeline.map((item, i) => (
                  <div key={i} className="relative mb-6 last:mb-0">
                    <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full border-2 border-white"
                      style={{ background: '#0d9488' }} />
                    <div className="text-xs font-bold mb-1" style={{ color: '#0d9488' }}>{item.year}</div>
                    <p className="text-sm" style={{ color: '#334155' }}>{item.event}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0f172a' }}>Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {doctor.achievements.map((a) => (
                  <div key={a} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#f0fdfa', border: '1px solid #99f6e4' }}>
                    <Award size={16} style={{ color: '#0d9488', flexShrink: 0 }} />
                    <span className="text-sm font-medium" style={{ color: '#0f172a' }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick info */}
            <div className="rounded-2xl p-6" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <h3 className="font-bold mb-4" style={{ color: '#0f172a' }}>Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2" style={{ color: '#475569' }}>
                  <Calendar size={14} style={{ color: '#0d9488' }} />
                  <span>Available: {doctor.availability.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: '#475569' }}>
                  <Languages size={14} style={{ color: '#0d9488' }} />
                  <span>{doctor.languages.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: '#475569' }}>
                  <MapPin size={14} style={{ color: '#0d9488' }} />
                  <span>Connaught Place, New Delhi</span>
                </div>
              </div>
            </div>

            {/* Book CTA */}
            <div className="rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #0f172a, #0d4f4a)' }}>
              <h3 className="font-bold mb-2">Book with {doctor.name.split(' ')[1]}</h3>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />)}
                <span className="text-xs ml-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{doctor.rating} ({doctor.reviewCount})</span>
              </div>
              <a href="/contact" className="block w-full text-center py-3 rounded-xl font-semibold mb-3 transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
                Book Appointment
              </a>
              <a href="https://wa.me/919876543210" className="block w-full text-center py-3 rounded-xl font-semibold transition-all hover:opacity-90"
                style={{ background: 'rgba(37,211,102,0.2)', border: '1px solid rgba(37,211,102,0.4)', color: '#4ade80' }}>
                WhatsApp
              </a>
            </div>

            {/* Certifications */}
            <div className="rounded-2xl p-6" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <h3 className="font-bold mb-3" style={{ color: '#0f172a' }}>Certifications</h3>
              <div className="space-y-2">
                {doctor.certifications.map((c) => (
                  <div key={c} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: '#f0fdfa', color: '#0d9488' }}>
                    🏅 {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
