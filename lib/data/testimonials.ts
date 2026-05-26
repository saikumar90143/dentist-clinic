export interface Testimonial {
  id: string;
  name: string;
  location: string;
  treatment: string;
  rating: number;
  review: string;
  date: string;
  avatar: string;
  isVideo?: boolean;
  videoThumbnail?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ananya Mehta',
    location: 'South Delhi',
    treatment: 'Smile Designing + Veneers',
    rating: 5,
    review: "SmileCraft completely transformed my life! Dr. Priya's work on my smile is absolutely incredible. I walk into every meeting now with so much more confidence. The entire team made me feel so comfortable throughout the process. Best investment I've ever made!",
    date: 'March 2024',
    avatar: '/images/testimonials/ananya.jpg',
    isVideo: true,
    videoThumbnail: '/images/testimonials/video-thumb-1.jpg',
  },
  {
    id: '2',
    name: 'Rohit Kapoor',
    location: 'Gurugram',
    treatment: 'Dental Implants',
    rating: 5,
    review: "I was terrified of getting implants after reading horror stories online, but Dr. Rajesh made the entire process completely painless and stress-free. 6 months later, my implants feel just like my natural teeth. Absolutely world-class care!",
    date: 'February 2024',
    avatar: '/images/testimonials/rohit.jpg',
    isVideo: true,
    videoThumbnail: '/images/testimonials/video-thumb-2.jpg',
  },
  {
    id: '3',
    name: 'Preethi Nair',
    location: 'Noida',
    treatment: 'Invisible Braces',
    rating: 5,
    review: "As a lawyer, I couldn't have traditional braces. Dr. Amit's Invisalign treatment was perfect — nobody noticed I was wearing them! My teeth are perfectly aligned now and I couldn't be happier. The digital preview before treatment was so reassuring.",
    date: 'January 2024',
    avatar: '/images/testimonials/preethi.jpg',
  },
  {
    id: '4',
    name: 'Sameer Khan',
    location: 'East Delhi',
    treatment: 'Root Canal + Crown',
    rating: 5,
    review: "Had a terrible toothache on a Sunday night. Called SmileCraft's emergency line and Dr. Rajesh saw me within the hour. The root canal was completely pain-free. The clinic is modern, clean, and the staff is incredibly professional.",
    date: 'April 2024',
    avatar: '/images/testimonials/sameer.jpg',
  },
  {
    id: '5',
    name: 'Deepika Sharma',
    location: 'Dwarka, Delhi',
    treatment: 'Teeth Whitening',
    rating: 5,
    review: "Got laser teeth whitening done before my wedding and my teeth are now several shades brighter. Everyone complimented my smile in the wedding photos! The procedure was quick and there was zero sensitivity. Highly recommend SmileCraft!",
    date: 'December 2023',
    avatar: '/images/testimonials/deepika.jpg',
    isVideo: true,
    videoThumbnail: '/images/testimonials/video-thumb-3.jpg',
  },
  {
    id: '6',
    name: 'Vikram Nanda',
    location: 'Faridabad',
    treatment: 'Gum Surgery',
    rating: 5,
    review: "Dr. Sunita saved my teeth! I had severe gum disease and was told elsewhere that I'd lose several teeth. Her laser gum therapy cleared the infection completely. The healing was so fast compared to traditional surgery. Eternally grateful!",
    date: 'November 2023',
    avatar: '/images/testimonials/vikram.jpg',
  },
  {
    id: '7',
    name: 'Meera Iyer',
    location: 'Vasant Kunj, Delhi',
    treatment: "Kids' Dentistry",
    rating: 5,
    review: "My 7-year-old used to be terrified of dentists. After visiting SmileCraft, she actually ASKS to go to the dentist! Dr. Amit is amazing with kids — patient, gentle, and he makes it fun. The entire team is so kind to children.",
    date: 'October 2023',
    avatar: '/images/testimonials/meera.jpg',
  },
  {
    id: '8',
    name: 'Arjun Bhatia',
    location: 'Rohini, Delhi',
    treatment: 'Dental Implants',
    rating: 5,
    review: "Lost two front teeth in an accident. SmileCraft's team handled everything from the initial trauma to the final implant placement. The implants look completely natural. The care and attention to detail here is unmatched in Delhi.",
    date: 'September 2023',
    avatar: '/images/testimonials/arjun.jpg',
  },
];

export const googleRating = 4.9;
export const totalReviews = 1247;
