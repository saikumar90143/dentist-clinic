import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import ExitIntentPopup from '@/components/layout/ExitIntentPopup';
import NewsletterPopup from '@/components/shared/NewsletterPopup';
import AIChatAssistant from '@/components/layout/AIChatAssistant';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SmileCraft Dental Clinic | Premium Dental Care in New Delhi',
    template: '%s | SmileCraft Dental Clinic',
  },
  description:
    'SmileCraft Dental Clinic in Connaught Place, New Delhi — Award-winning dental care with 20+ years of experience. Dental implants, smile design, invisible braces, and more. Book your free consultation today.',
  keywords: [
    'dental clinic Delhi',
    'best dentist New Delhi',
    'dental implants Delhi',
    'teeth whitening Delhi',
    'invisible braces Delhi',
    'smile designing Delhi',
    'cosmetic dentistry Delhi',
    'SmileCraft Dental',
    'dentist Connaught Place',
    'root canal treatment Delhi',
  ],
  authors: [{ name: 'SmileCraft Dental Clinic' }],
  creator: 'SmileCraft Dental Clinic',
  publisher: 'SmileCraft Dental Clinic',
  metadataBase: new URL('https://smilecraftdental.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://smilecraftdental.com',
    siteName: 'SmileCraft Dental Clinic',
    title: 'SmileCraft Dental Clinic | Premium Dental Care in New Delhi',
    description:
      'Award-winning dental clinic in Connaught Place, New Delhi. Expert dental implants, cosmetic dentistry, smile design, and emergency care. 15,000+ satisfied patients.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SmileCraft Dental Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmileCraft Dental Clinic | Premium Dental Care in New Delhi',
    description: 'Award-winning dental clinic in Connaught Place, New Delhi.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'SmileCraft Dental Clinic',
  image: 'https://smilecraftdental.com/images/clinic.jpg',
  description:
    'Premium dental clinic in Connaught Place, New Delhi offering dental implants, cosmetic dentistry, smile design, and emergency dental care.',
  url: 'https://smilecraftdental.com',
  telephone: '+91-9876543210',
  email: 'hello@smilecraftdental.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '42 Connaught Circus',
    addressLocality: 'New Delhi',
    postalCode: '110001',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.6329,
    longitude: 77.2195,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '10:00',
      closes: '16:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1247',
  },
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, EMI',
  medicalSpecialty: [
    'Dental Implants',
    'Cosmetic Dentistry',
    'Orthodontics',
    'Periodontics',
    'Endodontics',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
        <ExitIntentPopup />
        <NewsletterPopup />
        <AIChatAssistant />
      </body>
    </html>
  );
}
