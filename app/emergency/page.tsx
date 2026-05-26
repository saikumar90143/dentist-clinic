import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '24/7 Emergency Dental Care in New Delhi | SmileCraft',
  description: 'Dental emergency in Delhi? SmileCraft provides 24/7 emergency dental care in Connaught Place. Severe toothache, broken tooth, knocked-out tooth — call us NOW.',
  alternates: { canonical: 'https://smilecraftdental.com/emergency' },
};

const emergencyTypes = [
  { icon: '😩', title: 'Severe Toothache', desc: 'Unbearable pain that won\'t go away, often caused by abscess or deep decay.' },
  { icon: '🦷', title: 'Knocked Out Tooth', desc: 'Act within 30 minutes! Keep the tooth moist and come to us immediately.' },
  { icon: '💔', title: 'Broken Tooth', desc: 'A chipped or broken tooth can damage nerves. We restore it same-day.' },
  { icon: '👑', title: 'Lost Crown or Filling', desc: 'Exposed tooth structure can be painful. We replace it the same day.' },
  { icon: '🦠', title: 'Dental Abscess', desc: 'A pus-filled infection that can spread rapidly. Needs immediate treatment.' },
  { icon: '😰', title: 'Jaw Pain / Lockjaw', desc: 'TMJ disorders or jaw injuries need prompt professional evaluation.' },
  { icon: '🩸', title: 'Oral Bleeding', desc: 'Unexplained or uncontrolled bleeding from gums or after surgery.' },
  { icon: '😖', title: 'Dental Trauma', desc: 'Injuries to teeth, gums, jaw after an accident or fall.' },
];

const steps = [
  { step: '1', title: 'Stay Calm', desc: 'Call our emergency number immediately. We\'ll guide you over the phone.' },
  { step: '2', title: 'Handle the tooth', desc: 'For knocked-out teeth: hold by crown, rinse gently, store in milk or saliva.' },
  { step: '3', title: 'Come to us', desc: 'We\'re at Connaught Place, New Delhi. Emergency parking available.' },
  { step: '4', title: 'Get treated', desc: 'We\'ll assess and treat you immediately. Zero waiting for emergencies.' },
];

export default function EmergencyPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #7f1d1d 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            Available Right Now — 24/7
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            🚨 Dental Emergency?<br />Call Us RIGHT NOW
          </h1>
          <p className="text-lg opacity-80 mb-8">Don&apos;t wait. Every minute matters in a dental emergency. Our team is ready for you 24 hours a day, 7 days a week.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 text-white"
              style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid white' }}>
              📞 +91-9876543210
            </a>
            <a href="https://wa.me/919876543210?text=EMERGENCY:%20I%20need%20immediate%20dental%20help"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              style={{ background: '#25d366', color: 'white' }}>
              💬 WhatsApp SOS
            </a>
          </div>
        </div>
      </section>

      {/* Emergency types */}
      <section className="py-16" style={{ background: '#f8fafc' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>
            Emergency Types We Handle
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {emergencyTypes.map((type) => (
              <div key={type.title} className="p-5 rounded-2xl card-hover" style={{ background: 'white', border: '1px solid #fecaca' }}>
                <div className="text-3xl mb-3">{type.icon}</div>
                <h3 className="font-bold mb-1 text-sm" style={{ color: '#0f172a' }}>{type.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to do */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>
            What To Do While Coming to Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="text-center p-5 rounded-2xl" style={{ background: '#f8fafc' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-3"
                  style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                  {s.step}
                </div>
                <h3 className="font-bold mb-1 text-sm" style={{ color: '#0f172a' }}>{s.title}</h3>
                <p className="text-xs" style={{ color: '#64748b' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency pricing & location */}
      <section className="py-16" style={{ background: '#f8fafc' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <h3 className="font-bold text-lg mb-4" style={{ color: '#0f172a' }}>Emergency Consultation: FREE</h3>
              <p className="text-sm mb-4" style={{ color: '#64748b' }}>Initial emergency consultation is always free. Treatment costs depend on the procedure needed.</p>
              <ul className="space-y-2">
                {['No appointment needed', 'Priority treatment', 'Pain relief guaranteed', 'Insurance accepted'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: '#334155' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#ef4444' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <h3 className="font-bold text-lg mb-4" style={{ color: '#0f172a' }}>Find Us</h3>
              <p className="text-sm mb-2 font-medium" style={{ color: '#0d9488' }}>📍 42 Connaught Circus, New Delhi – 110001</p>
              <p className="text-sm mb-2" style={{ color: '#64748b' }}>Near Rajiv Chowk Metro Station (Gate 5)</p>
              <p className="text-sm font-semibold" style={{ color: '#ef4444' }}>⏱ We see emergency patients within 30 minutes of arrival</p>
              <a href="/contact" className="mt-4 block text-center py-3 rounded-xl font-semibold text-white" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
