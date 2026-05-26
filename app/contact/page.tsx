import type { Metadata } from 'next';
import AppointmentBooking from '@/components/special/AppointmentBooking';

export const metadata: Metadata = {
  title: 'Contact & Book Appointment | SmileCraft Dental Clinic New Delhi',
  description: 'Book an appointment at SmileCraft Dental Clinic in Connaught Place, New Delhi. Call, WhatsApp, or book online. Emergency dental care available 24/7.',
  alternates: { canonical: 'https://smilecraftdental.com/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 60%, #0f172a 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4" style={{ background: 'rgba(13,148,136,0.3)', border: '1px solid rgba(13,148,136,0.5)', color: '#5eead4' }}>
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Contact & Book Appointment
          </h1>
          <p className="text-lg opacity-80">We&apos;re here for you — Mon–Sat 9am–8pm, Sun 10am–4pm, Emergency 24/7</p>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="py-10" style={{ background: '#f8fafc' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <a href="tel:+919876543210" className="p-6 rounded-2xl text-center card-hover block" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-bold mb-1" style={{ color: '#0f172a' }}>Call Us</h3>
              <p className="text-sm font-semibold" style={{ color: '#0d9488' }}>+91-9876543210</p>
              <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>Available 9am–8pm</p>
            </a>
            <a href="https://wa.me/919876543210" className="p-6 rounded-2xl text-center card-hover block" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-bold mb-1" style={{ color: '#0f172a' }}>WhatsApp</h3>
              <p className="text-sm font-semibold" style={{ color: '#25d366' }}>Chat with us</p>
              <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>Typical reply: 15 mins</p>
            </a>
            <a href="mailto:hello@smilecraftdental.com" className="p-6 rounded-2xl text-center card-hover block" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <div className="text-3xl mb-2">📧</div>
              <h3 className="font-bold mb-1" style={{ color: '#0f172a' }}>Email</h3>
              <p className="text-sm font-semibold" style={{ color: '#3b82f6' }}>hello@smilecraftdental.com</p>
              <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>Reply within 24 hours</p>
            </a>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Appointment Booking */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>
                Book Your Appointment
              </h2>
              <AppointmentBooking />
            </div>

            {/* Contact form + info */}
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>
                Send a Message
              </h2>
              <ContactForm />

              {/* Hours */}
              <div className="mt-8 p-6 rounded-2xl" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <h3 className="font-bold mb-4" style={{ color: '#0f172a' }}>Opening Hours</h3>
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ['Monday – Friday', '9:00 AM – 8:00 PM'],
                      ['Saturday', '9:00 AM – 6:00 PM'],
                      ['Sunday', '10:00 AM – 4:00 PM'],
                      ['Emergency', '24 / 7'],
                    ].map(([day, time]) => (
                      <tr key={day} className="border-b last:border-0" style={{ borderColor: '#e2e8f0' }}>
                        <td className="py-2 font-medium" style={{ color: '#0f172a' }}>{day}</td>
                        <td className="py-2 text-right font-semibold" style={{ color: day === 'Emergency' ? '#ef4444' : '#0d9488' }}>{time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16" style={{ background: 'white' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>
            Find Us
          </h2>
          <div className="rounded-3xl overflow-hidden" style={{ height: 400 }}>
            <iframe
              src="https://maps.google.com/maps?q=Connaught+Place+New+Delhi&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SmileCraft Dental Clinic Location"
            />
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm" style={{ color: '#64748b' }}>
            <span>📍</span>
            <span>42 Connaught Circus, Connaught Place, New Delhi – 110001</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" placeholder="Your Name *" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid #e2e8f0', color: '#0f172a' }} />
        <input type="tel" placeholder="Phone Number *" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid #e2e8f0', color: '#0f172a' }} />
      </div>
      <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid #e2e8f0', color: '#0f172a' }} />
      <select className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ border: '1px solid #e2e8f0', color: '#64748b' }}>
        <option value="">Select Service of Interest</option>
        {['Dental Implants', 'Teeth Whitening', 'Smile Designing', 'Invisible Braces', 'Root Canal', 'Veneers', 'Kids Dentistry', 'Emergency Care', 'General Check-up'].map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <textarea rows={4} placeholder="Your message or any specific concerns..." className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ border: '1px solid #e2e8f0', color: '#0f172a' }} />
      <button className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #0d9488, #3b82f6)' }}>
        Send Message →
      </button>
    </div>
  );
}
