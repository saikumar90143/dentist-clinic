export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
  icon: string;
}

export interface TreatmentPrice {
  treatment: string;
  minPrice: number;
  maxPrice: number;
  unit: string;
  duration: string;
  emi?: string;
}

export const membershipPlans: PricingPlan[] = [
  {
    id: '1',
    name: 'Basic Care',
    price: '₹2,999',
    period: '/year',
    description: 'Essential preventive care for individuals',
    features: [
      '2 professional cleanings per year',
      '2 dental check-up appointments',
      '10% discount on all treatments',
      'Priority appointment booking',
      'Emergency consultation (1 free)',
      'Digital X-rays included',
    ],
    color: 'from-slate-600 to-slate-800',
    icon: 'shield',
  },
  {
    id: '2',
    name: 'Smart Smile',
    price: '₹5,999',
    period: '/year',
    description: 'Comprehensive care for smile-conscious patients',
    features: [
      '4 professional cleanings per year',
      'Unlimited dental check-ups',
      '20% discount on all treatments',
      'Free teeth whitening session',
      'Emergency consultations (unlimited)',
      'Digital X-rays included',
      'Free fluoride treatment',
      'Priority WhatsApp support',
    ],
    popular: true,
    color: 'from-teal-600 to-teal-800',
    icon: 'star',
  },
  {
    id: '3',
    name: 'Premium Family',
    price: '₹12,999',
    period: '/year',
    description: 'Complete family dental care — up to 4 members',
    features: [
      'Covers up to 4 family members',
      'Unlimited cleanings & check-ups',
      '30% discount on all treatments',
      'Free smile assessment for all',
      '24/7 emergency hotline access',
      'Free annual OPG X-ray',
      'Kids\' dental education program',
      'Dedicated relationship manager',
      'Corporate dental health records',
    ],
    color: 'from-blue-600 to-blue-800',
    icon: 'crown',
  },
];

export const treatmentPrices: TreatmentPrice[] = [
  { treatment: 'Dental Consultation', minPrice: 500, maxPrice: 500, unit: 'per visit', duration: '30 mins', },
  { treatment: 'Teeth Cleaning (Scaling)', minPrice: 800, maxPrice: 2000, unit: 'per session', duration: '45 mins', },
  { treatment: 'Teeth Whitening', minPrice: 8000, maxPrice: 20000, unit: 'per session', duration: '60 mins', emi: '₹700/month' },
  { treatment: 'Dental Implant', minPrice: 25000, maxPrice: 60000, unit: 'per implant', duration: '90 mins', emi: '₹2,100/month' },
  { treatment: 'Root Canal Treatment', minPrice: 5000, maxPrice: 12000, unit: 'per tooth', duration: '60 mins', emi: '₹450/month' },
  { treatment: 'Porcelain Veneer', minPrice: 12000, maxPrice: 20000, unit: 'per tooth', duration: '2 sessions', emi: '₹1,050/month' },
  { treatment: 'Smile Designing', minPrice: 30000, maxPrice: 150000, unit: 'complete', duration: 'Multiple sessions', emi: '₹2,500/month' },
  { treatment: 'Invisible Braces', minPrice: 45000, maxPrice: 120000, unit: 'complete treatment', duration: '12-18 months', emi: '₹3,800/month' },
  { treatment: 'Metal Braces', minPrice: 20000, maxPrice: 40000, unit: 'complete treatment', duration: '18-24 months', emi: '₹1,700/month' },
  { treatment: 'Dental Crown', minPrice: 5000, maxPrice: 18000, unit: 'per tooth', duration: '2 sessions', emi: '₹450/month' },
  { treatment: 'Tooth Extraction', minPrice: 500, maxPrice: 3000, unit: 'per tooth', duration: '30 mins', },
  { treatment: 'Gum Surgery', minPrice: 10000, maxPrice: 35000, unit: 'per quadrant', duration: '90 mins', emi: '₹850/month' },
  { treatment: 'Kids\' Dental Treatment', minPrice: 500, maxPrice: 8000, unit: 'per visit', duration: '30-45 mins', },
  { treatment: 'Emergency Consultation', minPrice: 0, maxPrice: 0, unit: 'free', duration: 'Immediate', },
];
