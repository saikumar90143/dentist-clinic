import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import DoctorsPreview from '@/components/home/DoctorsPreview';
import BeforeAfterSlider from '@/components/home/BeforeAfterSlider';
import VideoTestimonials from '@/components/home/VideoTestimonials';
import InsuranceLogos from '@/components/home/InsuranceLogos';
import EmergencyBanner from '@/components/home/EmergencyBanner';
import GoogleReviews from '@/components/home/GoogleReviews';
import FAQAccordion from '@/components/home/FAQAccordion';
import AppointmentBooking from '@/components/special/AppointmentBooking';
import LeadCaptureFunnel from '@/components/special/LeadCaptureFunnel';
import CostEstimator from '@/components/special/CostEstimator';
import ToothAnatomyViewer from '@/components/special/ToothAnatomyViewer';

export const metadata: Metadata = {
  title: 'SmileCraft Dental Clinic | Best Dentist in New Delhi — Implants, Smile Design & More',
  description:
    'SmileCraft Dental Clinic — Award-winning dental care in Connaught Place, New Delhi. Expert dental implants, smile designing, invisible braces, teeth whitening & emergency care. 15,000+ satisfied patients. Book your free consultation today.',
  alternates: { canonical: 'https://smilecraftdental.com' },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      {/* Smart Booking + Lead Funnel */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdfa 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-3" style={{ background: '#f0fdfa', color: '#0d9488', border: '1px solid #99f6e4' }}>
              Smart Booking
            </span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair)', color: '#0f172a' }}>
              Book Your Appointment
            </h2>
            <p className="mt-3 max-w-2xl mx-auto" style={{ color: '#64748b' }}>
              Choose your preferred slot instantly, or let us guide you to the right treatment.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <AppointmentBooking />
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#0f172a', fontFamily: 'var(--font-playfair)' }}>
                🔍 Find Your Perfect Treatment
              </h3>
              <p className="text-sm mb-6" style={{ color: '#64748b' }}>Answer 5 quick questions and we&apos;ll recommend the best treatment for you.</p>
              <LeadCaptureFunnel />
            </div>
          </div>
        </div>
      </section>

      <ServicesPreview />
      <WhyChooseUs />
      <DoctorsPreview />
      <BeforeAfterSlider />

      <CostEstimator />
      <VideoTestimonials />
      <InsuranceLogos />
      <EmergencyBanner />
      <GoogleReviews />
      <ToothAnatomyViewer />
      <FAQAccordion />

      {/* Final CTA */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, #0d9488 0%, #3b82f6 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Ready for Your Perfect Smile?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join 15,000+ happy patients who chose SmileCraft. Your dream smile is one click away.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a
              href="/contact"
              className="px-8 py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 hover:scale-105"
              style={{ background: 'white', color: '#0d9488' }}
            >
              📅 Book Free Appointment
            </a>
            <a
              href="https://wa.me/919876543210"
              className="px-8 py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.4)', color: 'white' }}
            >
              💬 WhatsApp Us Now
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 opacity-80 text-sm">
            {['✓ Free First Consultation', '✓ No Hidden Charges', '✓ 0% EMI Available', '✓ 24/7 Emergency Care'].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
