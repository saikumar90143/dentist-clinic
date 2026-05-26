import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About SmileCraft Dental Clinic | Our Story, Mission & Team',
  description: 'Learn about SmileCraft Dental Clinic — founded in 2010 in Connaught Place, New Delhi. ISO & NABH certified. 20+ years of excellence with internationally trained specialists.',
  alternates: { canonical: 'https://smilecraftdental.com/about' },
};

const milestones = [
  { year: '2010', event: 'SmileCraft founded by Dr. Rajesh Sharma in Connaught Place', icon: '🏥' },
  { year: '2012', event: 'Expanded to 2,500 sq ft facility with 8 treatment chairs', icon: '🏗️' },
  { year: '2014', event: 'Introduced Laser Dentistry unit', icon: '🔬' },
  { year: '2016', event: 'ISO 9001:2015 Certification achieved', icon: '🏆' },
  { year: '2018', event: 'NABH Accreditation — first dental clinic in the area', icon: '✅' },
  { year: '2020', event: 'Introduced Digital Smile Design technology', icon: '💻' },
  { year: '2022', event: 'Crossed 10,000 satisfied patients milestone', icon: '🎉' },
  { year: '2024', event: 'Rated #1 Dental Clinic in Delhi by patients', icon: '⭐' },
];

const values = [
  { icon: '❤️', title: 'Patient First', desc: 'Every decision we make prioritizes the comfort, safety, and satisfaction of our patients.' },
  { icon: '🎯', title: 'Excellence', desc: 'We never compromise on quality — from the materials we use to the care we provide.' },
  { icon: '🤝', title: 'Integrity', desc: 'Transparent pricing, honest recommendations, and ethical dental practice always.' },
  { icon: '🚀', title: 'Innovation', desc: 'Continuously adopting the latest dental technology to give you better outcomes.' },
];

const certifications = [
  { name: 'ISO 9001:2015 Certified', body: 'Bureau Veritas', icon: '🏅' },
  { name: 'NABH Accredited', body: 'National Accreditation Board for Hospitals', icon: '🏆' },
  { name: 'AACD Member', body: 'American Academy of Cosmetic Dentistry', icon: '🦷' },
  { name: 'ITI Fellow', body: 'International Team for Implantology', icon: '🔬' },
];

const facilities = [
  { icon: '🏥', label: '2,500 sq ft facility' },
  { icon: '🪑', label: '8 treatment chairs' },
  { icon: '📡', label: 'Digital X-ray suite' },
  { icon: '🔬', label: 'OPG Machine' },
  { icon: '💡', label: 'Laser dentistry unit' },
  { icon: '💻', label: 'Digital Smile Design' },
  { icon: '🧪', label: 'In-house lab' },
  { icon: '🌡️', label: 'HEPA air filtration' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 60%, #0f172a 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'rgba(13,148,136,0.3)', border: '1px solid rgba(13,148,136,0.5)', color: '#5eead4' }}>
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            About SmileCraft Dental Clinic
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Creating beautiful, healthy smiles in New Delhi since 2010. Internationally trained specialists. Award-winning care. Your smile is our mission.
          </p>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>
                Our Mission
              </h2>
              <p className="text-lg font-semibold mb-4" style={{ color: '#0d9488' }}>
                &ldquo;Creating Beautiful Smiles, Changing Lives&rdquo;
              </p>
              <p className="leading-relaxed mb-4" style={{ color: '#334155' }}>
                SmileCraft Dental Clinic was founded in 2010 by Dr. Rajesh Sharma with a simple but powerful vision: to make world-class dental care accessible to everyone in New Delhi, delivered with compassion, transparency, and clinical excellence.
              </p>
              <p className="leading-relaxed" style={{ color: '#334155' }}>
                Over 14 years, we have grown from a small practice to one of Delhi&apos;s most trusted dental clinics, with a team of 4 internationally trained specialists and over 15,000 happy patients. But our values have never changed — every patient who walks through our doors is treated like family.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {facilities.map((f) => (
                <div key={f.label} className="p-4 rounded-2xl flex items-center gap-3" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-sm font-medium" style={{ color: '#0f172a' }}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16" style={{ background: '#f8fafc' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-10 text-center" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>Our Journey</h2>
          <div className="relative pl-8 border-l-2" style={{ borderColor: '#0d9488' }}>
            {milestones.map((m, i) => (
              <div key={i} className="relative mb-8 last:mb-0">
                <div className="absolute -left-[29px] top-0 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-xs"
                  style={{ background: '#0d9488' }}>✓</div>
                <div className="text-xs font-bold mb-1" style={{ color: '#0d9488' }}>{m.year}</div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{m.icon}</span>
                  <p className="text-sm" style={{ color: '#334155' }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="p-6 rounded-2xl text-center" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-bold mb-2" style={{ color: '#0f172a' }}>{v.title}</h3>
                <p className="text-sm" style={{ color: '#64748b' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16" style={{ background: '#f8fafc' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>Certifications & Accreditations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {certifications.map((c) => (
              <div key={c.name} className="p-5 rounded-2xl text-center" style={{ background: 'white', border: '2px solid #f0fdfa' }}>
                <div className="text-4xl mb-2">{c.icon}</div>
                <div className="font-bold text-sm mb-1" style={{ color: '#0f172a' }}>{c.name}</div>
                <div className="text-xs" style={{ color: '#64748b' }}>{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sterilization */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(135deg, #0f172a, #0d4f4a)', color: 'white' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>🔬 Hospital-Grade Sterilization</h2>
            <p className="opacity-80 mb-6">Your safety is our top priority. We follow strict infection control protocols that exceed industry standards.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Hospital-grade autoclave sterilization', 'Instrument tracking system (ITS)', 'Disposable items used wherever possible', 'HEPA air filtration in all operatories', 'UV sterilization of surfaces', 'Daily sterilization logs available for review'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#14b8a6' }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-16 text-center" style={{ background: '#f8fafc' }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>Meet Our Specialists</h2>
          <p className="mb-6" style={{ color: '#64748b' }}>Get to know our internationally trained team of dental experts.</p>
          <a href="/doctors" className="inline-block px-8 py-4 rounded-xl font-bold text-white hover:opacity-90" style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
            Meet Our Doctors →
          </a>
        </div>
      </section>
    </div>
  );
}
