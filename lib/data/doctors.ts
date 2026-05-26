export interface Doctor {
  id: string;
  slug: string;
  name: string;
  title: string;
  specialization: string;
  experience: number;
  qualifications: string[];
  bio: string;
  image: string;
  rating: number;
  reviewCount: number;
  languages: string[];
  availability: string[];
  certifications: string[];
  achievements: string[];
  timeline: Array<{ year: string; event: string }>;
}

export const doctors: Doctor[] = [
  {
    id: '1',
    slug: 'dr-rajesh-sharma',
    name: 'Dr. Rajesh Sharma',
    title: 'Chief Dental Officer & Implantologist',
    specialization: 'Dental Implants & Oral Surgery',
    experience: 20,
    qualifications: ['BDS – Maulana Azad Institute', 'MDS (Oral Surgery) – AIIMS Delhi', 'Fellowship – International Team for Implantology'],
    bio: 'Dr. Rajesh Sharma is a pioneer in dental implantology with over 20 years of experience. He has performed more than 5,000 successful implant procedures and is trained at leading institutes across India, USA, and Germany.',
    image: '/images/doctors/dr-rajesh.jpg',
    rating: 4.9,
    reviewCount: 847,
    languages: ['Hindi', 'English', 'Punjabi'],
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    certifications: ['ITI Fellow', 'ICOI Diplomate', 'ADA Member'],
    achievements: ['Best Implantologist – Delhi 2023', 'Published 12 research papers', 'Trained 200+ dentists'],
    timeline: [
      { year: '2004', event: 'Completed BDS from Maulana Azad Institute' },
      { year: '2006', event: 'MDS in Oral Surgery from AIIMS Delhi' },
      { year: '2008', event: 'Implantology Fellowship in Germany' },
      { year: '2010', event: 'Founded SmileCraft Dental Clinic' },
      { year: '2019', event: 'ITI Fellow Certification' },
      { year: '2023', event: 'Named Best Implantologist in Delhi' },
    ],
  },
  {
    id: '2',
    slug: 'dr-priya-verma',
    name: 'Dr. Priya Verma',
    title: 'Cosmetic Dentist & Smile Designer',
    specialization: 'Cosmetic Dentistry & Smile Design',
    experience: 14,
    qualifications: ['BDS – Manipal University', 'MDS (Prosthodontics) – KLE University', 'Aesthetic Dentistry Diploma – NYU'],
    bio: 'Dr. Priya Verma is an internationally trained cosmetic dentist known for creating stunning smile transformations. Her artistic eye and technical expertise have made her the go-to expert for veneers, smile designing, and full-mouth rehabilitation.',
    image: '/images/doctors/dr-priya.jpg',
    rating: 4.9,
    reviewCount: 623,
    languages: ['Hindi', 'English', 'Marathi'],
    availability: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    certifications: ['American Academy of Cosmetic Dentistry', 'Digital Smile Design Certified'],
    achievements: ['Celebrity Smile Designer', '500+ smile makeovers', 'AACD Member'],
    timeline: [
      { year: '2010', event: 'BDS from Manipal University with Gold Medal' },
      { year: '2012', event: 'MDS in Prosthodontics from KLE University' },
      { year: '2014', event: 'Aesthetic Dentistry Program – NYU, New York' },
      { year: '2015', event: 'Joined SmileCraft as Cosmetic Dentist' },
      { year: '2020', event: 'Digital Smile Design Master Certification' },
      { year: '2023', event: '500th Smile Makeover milestone' },
    ],
  },
  {
    id: '3',
    slug: 'dr-amit-joshi',
    name: 'Dr. Amit Joshi',
    title: 'Orthodontist & Clear Aligner Expert',
    specialization: 'Orthodontics & Pediatric Dentistry',
    experience: 12,
    qualifications: ['BDS – Bangalore University', 'MDS (Orthodontics) – SDM College', 'Invisalign Certified Platinum Provider'],
    bio: 'Dr. Amit Joshi is a Platinum Certified Invisalign provider with over 800 clear aligner cases to his credit. His gentle approach with children and teenagers makes him one of the most loved doctors at SmileCraft.',
    image: '/images/doctors/dr-amit.jpg',
    rating: 4.8,
    reviewCount: 512,
    languages: ['Hindi', 'English', 'Kannada'],
    availability: ['Monday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'],
    certifications: ['Invisalign Platinum Provider', 'Indian Orthodontic Society Member'],
    achievements: ['800+ Invisalign cases', 'Invisalign Platinum Provider', 'Kids Dentist of the Year 2022'],
    timeline: [
      { year: '2012', event: 'BDS from Bangalore University' },
      { year: '2014', event: 'MDS in Orthodontics from SDM College' },
      { year: '2016', event: 'Joined SmileCraft as Senior Orthodontist' },
      { year: '2018', event: 'Invisalign Gold Provider Certification' },
      { year: '2021', event: 'Upgraded to Platinum Provider status' },
      { year: '2022', event: 'Kids Dentist of the Year Award' },
    ],
  },
  {
    id: '4',
    slug: 'dr-sunita-patel',
    name: 'Dr. Sunita Patel',
    title: 'Periodontist & Gum Specialist',
    specialization: 'Periodontics & Gum Disease Treatment',
    experience: 16,
    qualifications: ['BDS – Gujarat University', 'MDS (Periodontics) – GDC Ahmedabad', 'Laser Dentistry Certified'],
    bio: 'Dr. Sunita Patel is a leading periodontist specializing in laser gum therapy and complex periodontal surgeries. Her expertise in non-surgical approaches has helped thousands of patients preserve their natural teeth.',
    image: '/images/doctors/dr-sunita.jpg',
    rating: 4.9,
    reviewCount: 389,
    languages: ['Hindi', 'English', 'Gujarati'],
    availability: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
    certifications: ['Indian Society of Periodontology', 'Laser Dentistry Certification – World Federation'],
    achievements: ['Laser Gum Therapy Pioneer', '1,000+ periodontal surgeries', 'Best Periodontist 2022'],
    timeline: [
      { year: '2008', event: 'BDS from Gujarat University' },
      { year: '2010', event: 'MDS in Periodontics from GDC Ahmedabad' },
      { year: '2012', event: 'Laser Dentistry Certification' },
      { year: '2014', event: 'Joined SmileCraft as Senior Periodontist' },
      { year: '2019', event: 'Introduced Laser Gum Therapy to clinic' },
      { year: '2022', event: 'Best Periodontist Award' },
    ],
  },
];
