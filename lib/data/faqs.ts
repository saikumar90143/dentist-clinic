export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Is dental treatment painful?',
    answer: 'At SmileCraft, we prioritize your comfort above all else. We use advanced local anesthetics and sedation options that make most procedures completely painless. Our "no-pain guarantee" means if you feel discomfort at any point, we stop and address it immediately.',
    category: 'General',
  },
  {
    id: '2',
    question: 'How long does a dental implant procedure take?',
    answer: 'The implant placement itself takes 60-90 minutes per implant. However, the entire process from implant placement to final crown takes 3-6 months to allow for proper osseointegration (fusion with the jawbone). In some cases, we can place immediate implants and temporary crowns on the same day.',
    category: 'Implants',
  },
  {
    id: '3',
    question: 'Do you offer EMI or payment plans?',
    answer: 'Yes! We offer flexible 0% interest EMI options on treatments above ₹5,000 through leading banks and our in-house payment plan. We also accept all major insurance plans and can help you maximize your dental benefits. Our financial counselors will work with you to find the best payment option.',
    category: 'Payment',
  },
  {
    id: '4',
    question: 'How often should I visit the dentist?',
    answer: 'We recommend a routine check-up and professional cleaning every 6 months for most patients. If you have ongoing dental issues, gum disease, or are undergoing treatment, more frequent visits may be recommended. Regular check-ups help catch problems early when they\'re easier and less expensive to treat.',
    category: 'General',
  },
  {
    id: '5',
    question: 'Are invisible braces (Invisalign) suitable for me?',
    answer: 'Invisalign works for a wide range of alignment issues including crowding, spacing, and bite problems. However, very complex orthodontic cases may still require traditional braces. Dr. Amit offers a free consultation including a 3D scan to determine if you are a suitable candidate and show you a virtual preview of your results.',
    category: 'Orthodontics',
  },
  {
    id: '6',
    question: 'How do I know if I need a root canal?',
    answer: 'Common signs that may indicate a root canal is needed include: severe toothache, prolonged sensitivity to hot/cold, darkening of the tooth, swelling or tenderness in gums near the tooth, or a persistent pimple on the gum. However, sometimes there are no obvious symptoms. Regular X-rays during your check-up help us detect issues early.',
    category: 'Treatment',
  },
  {
    id: '7',
    question: 'How long does teeth whitening last?',
    answer: 'Professional laser whitening results typically last 1-3 years with proper care. The longevity depends on your diet and lifestyle habits. Avoiding strongly pigmented foods and drinks (tea, coffee, red wine), not smoking, and using the take-home maintenance kit we provide will help extend your results.',
    category: 'Cosmetic',
  },
  {
    id: '8',
    question: 'Do you handle dental emergencies?',
    answer: 'Yes! SmileCraft has a 24/7 emergency line for dental emergencies. Whether it\'s a knocked-out tooth, severe toothache, broken crown, or dental trauma, call our emergency number and our team will see you as quickly as possible — often within the same hour.',
    category: 'Emergency',
  },
  {
    id: '9',
    question: 'What is your sterilization protocol?',
    answer: 'We follow strict hospital-grade sterilization protocols. All instruments are autoclave-sterilized between every patient. We use disposable items wherever possible. Our operatories are disinfected between each appointment using hospital-grade disinfectants. Our sterilization logs are available for patient review.',
    category: 'Safety',
  },
  {
    id: '10',
    question: 'Can I book an appointment online?',
    answer: 'Yes! You can book appointments through our website, WhatsApp, or by calling us. Our online booking system shows real-time availability and allows you to choose your preferred doctor and appointment time. You\'ll receive an SMS and email confirmation along with reminders.',
    category: 'Appointments',
  },
  {
    id: '11',
    question: 'Do you provide veneers for discolored teeth?',
    answer: 'Yes, porcelain veneers are an excellent solution for permanently discolored teeth that don\'t respond well to whitening. Our e.max veneers are ultra-thin (as thin as a contact lens) and highly natural-looking. They can also correct chips, cracks, minor misalignment, and uneven teeth in one procedure.',
    category: 'Cosmetic',
  },
  {
    id: '12',
    question: 'Is SmileCraft ISO certified?',
    answer: 'Yes, SmileCraft Dental Clinic is ISO 9001:2015 certified and NABH accredited. We adhere to the highest standards of quality and patient safety. Our certifications are displayed in our reception area and available for verification.',
    category: 'General',
  },
];

export const faqCategories = ['All', 'General', 'Treatment', 'Cosmetic', 'Implants', 'Orthodontics', 'Payment', 'Emergency', 'Safety', 'Appointments'];
