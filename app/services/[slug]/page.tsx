import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { services } from '@/lib/data/services';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.title} in New Delhi | SmileCraft Dental Clinic`,
    description: service.longDescription,
    alternates: { canonical: `https://smilecraftdental.com/services/${slug}` },
  };
}

const serviceSteps: Record<string, Array<{ step: string; title: string; desc: string }>> = {
  default: [
    { step: '01', title: 'Initial Consultation', desc: 'Comprehensive examination, X-rays, and detailed discussion of your dental goals and treatment options.' },
    { step: '02', title: 'Personalised Treatment Plan', desc: 'Our specialist creates a customised plan tailored to your specific needs, preferences, and budget.' },
    { step: '03', title: 'Treatment Procedure', desc: 'State-of-the-art treatment performed by our expert team with maximum comfort and precision.' },
    { step: '04', title: 'Recovery & Follow-up', desc: 'Post-treatment care instructions, follow-up appointments, and ongoing support for best results.' },
  ],
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== slug && s.category === service.category).slice(0, 3);
  const steps = serviceSteps[slug] || serviceSteps.default;

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 60%, #0f172a 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'rgba(13,148,136,0.3)', border: '1px solid rgba(13,148,136,0.5)', color: '#5eead4' }}>
            {service.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>{service.title}</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">{service.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="glass px-4 py-2 rounded-xl text-sm">⏱ {service.duration}</div>
            <div className="glass px-4 py-2 rounded-xl text-sm">💰 {service.price}</div>
            <div className="glass px-4 py-2 rounded-xl text-sm">✅ {service.category}</div>
          </div>
        </div>
      </section>

      {/* Long description */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>
                About {service.title}
              </h2>
              <p className="leading-relaxed mb-6" style={{ color: '#334155' }}>{service.longDescription}</p>

              <h3 className="text-xl font-bold mb-4" style={{ color: '#0f172a' }}>What&apos;s Included</h3>
              <ul className="space-y-3">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#0d9488' }}>
                      <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span style={{ color: '#334155' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar */}
            <div>
              <div className="rounded-2xl p-6 sticky top-24" style={{ background: 'linear-gradient(135deg, #0f172a, #0d4f4a)', color: 'white' }}>
                <h3 className="font-bold text-lg mb-4">Book This Treatment</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Starting Price</span>
                    <span className="font-semibold" style={{ color: '#14b8a6' }}>{service.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>Duration</span>
                    <span className="font-semibold">{service.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>EMI Available</span>
                    <span className="font-semibold" style={{ color: '#fbbf24' }}>0% Interest</span>
                  </div>
                </div>
                <a href="/contact" className="block w-full text-center py-3 rounded-xl font-semibold transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
                  Book Free Consultation
                </a>
                <a href="https://wa.me/919876543210" className="block w-full text-center py-3 rounded-xl font-semibold mt-3 transition-all hover:opacity-90"
                  style={{ background: 'rgba(37,211,102,0.2)', border: '1px solid rgba(37,211,102,0.4)', color: '#4ade80' }}>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16" style={{ background: '#f8fafc' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="flex gap-4 p-5 rounded-2xl" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
                <div className="text-2xl font-bold flex-shrink-0 w-10" style={{ color: '#0d9488' }}>{s.step}</div>
                <div>
                  <h4 className="font-bold mb-1" style={{ color: '#0f172a' }}>{s.title}</h4>
                  <p className="text-sm" style={{ color: '#64748b' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      {related.length > 0 && (
        <section className="py-16" style={{ background: 'white' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>Related Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((s) => (
                <a key={s.id} href={`/services/${s.slug}`} className="p-5 rounded-2xl block card-hover" style={{ border: '1px solid #e2e8f0' }}>
                  <div className="font-bold mb-1" style={{ color: '#0f172a' }}>{s.title}</div>
                  <div className="text-sm mb-2" style={{ color: '#64748b' }}>{s.description.substring(0, 70)}...</div>
                  <div className="text-sm font-semibold" style={{ color: '#0d9488' }}>{s.price}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
