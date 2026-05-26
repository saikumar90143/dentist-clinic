import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | SmileCraft Dental Clinic',
  description: 'Privacy policy for SmileCraft Dental Clinic. Learn how we collect, use, and protect your personal and health information.',
  alternates: { canonical: 'https://smilecraftdental.com/privacy' },
};

const sections = [
  {
    title: '1. Introduction',
    content: `SmileCraft Dental Clinic ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (smilecraftdental.com) or use our services.

Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.`,
  },
  {
    title: '2. Information We Collect',
    content: `We may collect the following types of information:

**Personal Information:** Name, email address, phone number, and address when you fill out contact forms or book appointments.

**Health Information:** Dental history, treatment records, and health-related information you provide during consultations or through our online forms. This information is considered sensitive and is handled with the highest level of care.

**Usage Data:** IP address, browser type, pages visited, and time spent on our website, collected through cookies and similar technologies.

**Communications:** Records of your interactions with us via email, WhatsApp, or phone.`,
  },
  {
    title: '3. How We Use Your Information',
    content: `We use the information we collect to:

• Schedule and manage dental appointments
• Provide dental care and send treatment reminders
• Send promotional communications (with your consent)
• Improve our website and services
• Comply with legal obligations
• Send appointment confirmations and follow-up messages
• Process insurance claims
• Respond to inquiries and support requests`,
  },
  {
    title: '4. Information Sharing and Disclosure',
    content: `We do NOT sell or rent your personal information to third parties. We may share your information only in the following circumstances:

• **Healthcare Providers:** With other dentists or specialists involved in your care, with your consent
• **Insurance Companies:** To process claims, with your authorization
• **Service Providers:** With trusted vendors who help us operate our website and business, under strict confidentiality agreements
• **Legal Requirements:** When required by law, court order, or governmental authority
• **Business Transfer:** In connection with a merger or acquisition, with appropriate protections`,
  },
  {
    title: '5. Data Security',
    content: `We implement industry-standard security measures to protect your personal and health information:

• SSL/TLS encryption for all data transmitted through our website
• Secure, encrypted storage of patient records
• Access controls limiting who can view patient information
• Regular security audits and updates
• Staff training on data privacy and security

However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.`,
  },
  {
    title: '6. Your Rights',
    content: `You have the right to:

• **Access** your personal information we hold
• **Correct** inaccurate or incomplete information
• **Delete** your information (subject to legal obligations)
• **Withdraw consent** for marketing communications at any time
• **Data portability** — receive your data in a structured format
• **Lodge a complaint** with the relevant data protection authority

To exercise these rights, contact us at privacy@smilecraftdental.com`,
  },
  {
    title: '7. Cookies Policy',
    content: `Our website uses cookies to enhance your experience. Types of cookies we use:

• **Essential cookies:** Required for the website to function properly
• **Analytics cookies:** Help us understand how visitors use our site (Google Analytics)
• **Marketing cookies:** Used to show relevant advertisements

You can control cookie settings through your browser preferences. Disabling certain cookies may affect website functionality.`,
  },
  {
    title: '8. Contact for Privacy Concerns',
    content: `If you have questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please contact:

**SmileCraft Dental Clinic**
Privacy Officer
42 Connaught Circus, Connaught Place
New Delhi – 110001

Email: privacy@smilecraftdental.com
Phone: +91-9876543210

We will respond to your request within 30 days.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Hero */}
      <section className="pt-32 pb-16" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 60%, #0f172a 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Privacy Policy</h1>
          <p className="opacity-70">Last updated: January 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16" style={{ background: '#f8fafc' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 shadow-premium" style={{ background: 'white' }}>
            {sections.map((section) => (
              <div key={section.title} className="mb-10 last:mb-0">
                <h2 className="text-xl font-bold mb-4" style={{ color: '#0f172a', fontFamily: 'var(--font-playfair)' }}>
                  {section.title}
                </h2>
                <div className="leading-relaxed text-sm" style={{ color: '#334155' }}>
                  {section.content.split('\n').map((line, i) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <h3 key={i} className="font-bold mt-3 mb-1" style={{ color: '#0f172a' }}>{line.slice(2, -2)}</h3>;
                    }
                    if (line.startsWith('• **')) {
                      const [boldPart, rest] = line.slice(4).split('**');
                      return <p key={i} className="mb-1">• <strong>{boldPart}</strong>{rest}</p>;
                    }
                    if (line.startsWith('• ')) {
                      return <p key={i} className="mb-1">{line}</p>;
                    }
                    if (line.trim() === '') return <br key={i} />;
                    return <p key={i} className="mb-2">{line}</p>;
                  })}
                </div>
                <div className="mt-6 border-b" style={{ borderColor: '#f1f5f9' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
