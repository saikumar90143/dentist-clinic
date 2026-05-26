export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: '10-signs-you-need-to-see-a-dentist',
    title: '10 Warning Signs You Need to See a Dentist Immediately',
    excerpt: 'Many dental problems develop silently. Learn the 10 critical warning signs that indicate you need professional dental care right away.',
    content: `Dental problems rarely announce themselves with fanfare, but your mouth often gives subtle signals that something is wrong. Ignoring these signs can turn a small issue into a costly, painful problem.

**1. Persistent Toothache**
A toothache that lasts more than 2 days is a red flag. It could indicate infection, a cracked tooth, or an abscess that needs immediate treatment.

**2. Bleeding Gums**
Gums that bleed when you brush or floss are not normal. This is often the first sign of gingivitis — the earliest stage of gum disease — which is highly treatable if caught early.

**3. Tooth Sensitivity**
Sharp pain when consuming hot, cold, or sweet foods could indicate worn enamel, a cavity, or an exposed root.

**4. Bad Breath That Doesn't Go Away**
Chronic bad breath despite good hygiene can indicate gum disease, an infection, or even systemic health issues.

**5. Loose Teeth**
Adult teeth should never feel loose. This is a serious sign of advanced gum disease or bone loss.

**6. Mouth Sores That Don't Heal**
Most mouth sores heal within 2 weeks. Those that persist should be evaluated by your dentist as they can rarely be a sign of oral cancer.

**7. Jaw Pain or Clicking**
TMJ disorders are increasingly common. If your jaw clicks, pops, or causes pain, see your dentist for evaluation.

**8. Visible Holes or Dark Spots**
These are often visible cavities that need filling before they grow larger and reach the nerve.

**9. White Spots on Teeth**
White, chalky spots on teeth can be early signs of demineralization — the beginning of a cavity.

**10. Dry Mouth**
Saliva protects your teeth. Chronic dry mouth increases your cavity risk significantly and should be discussed with your dentist.

If you notice any of these signs, don't wait. Book an appointment at SmileCraft Dental Clinic today for a comprehensive evaluation.`,
    author: 'Dr. Rajesh Sharma',
    authorRole: 'Chief Dental Officer',
    date: 'May 15, 2024',
    readTime: '5 min read',
    category: 'Dental Health',
    tags: ['dental care', 'oral health', 'warning signs', 'dentist'],
    image: '/images/blog/dental-warning-signs.jpg',
    featured: true,
  },
  {
    id: '2',
    slug: 'complete-guide-to-dental-implants',
    title: 'The Complete Guide to Dental Implants: Everything You Need to Know',
    excerpt: 'Considering dental implants? This comprehensive guide covers the procedure, costs, recovery, and everything else you need to make an informed decision.',
    content: `Dental implants are widely considered the gold standard for replacing missing teeth. But there\'s a lot of misinformation out there. This guide gives you the facts.

**What Are Dental Implants?**
A dental implant is a titanium post surgically placed into the jawbone to act as an artificial tooth root. A crown is then attached to give the appearance and function of a natural tooth.

**The Implant Process: Step by Step**
1. Initial consultation and CT scan
2. Bone grafting (if needed)
3. Implant placement surgery
4. Healing period (3-6 months)
5. Abutment placement
6. Final crown attachment

**Cost in India**
Dental implants in India range from ₹25,000 to ₹60,000 per implant depending on the brand, material, and clinic. At SmileCraft, we use Nobel Biocare and Straumann implants.

**Recovery**
Most patients return to work within 2-3 days. Some swelling and discomfort for 3-5 days is normal and manageable with prescribed medication.

**Longevity**
With proper care, dental implants can last a lifetime. They are the longest-lasting tooth replacement solution available.`,
    author: 'Dr. Rajesh Sharma',
    authorRole: 'Implantologist',
    date: 'April 28, 2024',
    readTime: '8 min read',
    category: 'Implants',
    tags: ['dental implants', 'tooth replacement', 'oral surgery'],
    image: '/images/blog/dental-implants-guide.jpg',
    featured: true,
  },
  {
    id: '3',
    slug: 'invisible-braces-vs-traditional-braces',
    title: 'Invisible Braces vs Traditional Braces: Which Is Right for You?',
    excerpt: 'Clear aligners or metal braces? We break down the pros, cons, costs, and suitability of each option to help you make the right choice.',
    content: `The choice between invisible braces and traditional metal braces is one of the most common questions we get. Here\'s a detailed comparison.

**Aesthetics**
- Invisible: Nearly undetectable, perfect for professionals
- Traditional: Noticeable metal brackets and wires

**Comfort**
- Invisible: Smooth plastic, no wire poking
- Traditional: Can cause irritation initially

**Effectiveness**
- Invisible: Excellent for mild to moderate cases
- Traditional: Better for complex cases

**Cost**
- Invisible: ₹45,000 – ₹1,20,000
- Traditional: ₹20,000 – ₹40,000

**Duration**
- Invisible: 12-18 months typically
- Traditional: 18-24 months typically

**Our Recommendation**
For most adults and teenagers with mild to moderate alignment issues, invisible braces offer superior comfort and aesthetics. Book a free consultation with Dr. Amit to get a 3D preview of your results.`,
    author: 'Dr. Amit Joshi',
    authorRole: 'Orthodontist',
    date: 'April 10, 2024',
    readTime: '6 min read',
    category: 'Orthodontics',
    tags: ['invisible braces', 'Invisalign', 'orthodontics', 'clear aligners'],
    image: '/images/blog/braces-comparison.jpg',
  },
  {
    id: '4',
    slug: 'foods-that-damage-your-teeth',
    title: '15 Everyday Foods That Are Slowly Destroying Your Teeth',
    excerpt: 'Some surprising foods in your daily diet could be damaging your enamel. Learn what to avoid and what to eat instead for optimal dental health.',
    content: `You might be doing everything right with your oral hygiene routine, but certain foods you eat every day could be quietly damaging your teeth.

**The Worst Offenders:**

1. **Citrus Fruits** — High acidity erodes enamel
2. **Carbonated Drinks** — Even diet soda is acidic
3. **Ice** — Chewing ice causes micro-fractures
4. **Dried Fruits** — Sticky and high in sugar
5. **Sports Drinks** — Worse than regular juice for teeth
6. **Alcohol** — Dries out mouth, reducing protective saliva
7. **Hard Candies** — Double threat: sugar + hard
8. **Crackers** — Refined carbs feed cavity-causing bacteria
9. **Vinegar-based foods** — Highly acidic
10. **Pickles** — Vinegar + sugar combination

**Better Alternatives:**
- Cheese, milk, and yogurt strengthen enamel
- Crunchy vegetables like carrots and celery clean teeth naturally
- Green and black tea suppress bacterial growth
- Water is always the best drink for your teeth

Make small swaps and your teeth will thank you!`,
    author: 'Dr. Priya Verma',
    authorRole: 'Cosmetic Dentist',
    date: 'March 22, 2024',
    readTime: '4 min read',
    category: 'Dental Health',
    tags: ['diet', 'enamel', 'cavity prevention', 'oral health'],
    image: '/images/blog/foods-teeth.jpg',
  },
  {
    id: '5',
    slug: 'gum-disease-silent-killer',
    title: 'Gum Disease: The Silent Killer Affecting 90% of Indian Adults',
    excerpt: 'Gum disease is India\'s most prevalent dental condition — and most people don\'t know they have it. Learn the stages, symptoms, and how to reverse it.',
    content: `Studies show that over 90% of Indian adults have some form of gum disease. It ranges from mild gingivitis to severe periodontitis that can lead to tooth loss and even affect your overall health.

**The Stages of Gum Disease:**

**Stage 1: Gingivitis**
- Gums that bleed when brushing
- Red, swollen gums
- Completely reversible with professional cleaning

**Stage 2: Early Periodontitis**
- Pockets forming between teeth and gums
- Bone loss begins
- Requires deep cleaning treatment

**Stage 3: Moderate Periodontitis**
- Increased bone and tissue loss
- Teeth may shift
- Surgical treatment may be needed

**Stage 4: Severe Periodontitis**
- Significant bone and tissue loss
- High risk of tooth loss
- Complex surgical treatment required

**The Systemic Link**
Recent research shows strong links between gum disease and heart disease, diabetes, Alzheimer\'s, and pregnancy complications. Healthy gums = healthy body.

**Treatment at SmileCraft**
Dr. Sunita specializes in laser gum therapy — a minimally invasive, faster-healing alternative to traditional gum surgery.`,
    author: 'Dr. Sunita Patel',
    authorRole: 'Periodontist',
    date: 'March 5, 2024',
    readTime: '7 min read',
    category: 'Gum Health',
    tags: ['gum disease', 'periodontitis', 'gingivitis', 'oral health'],
    image: '/images/blog/gum-disease.jpg',
    featured: true,
  },
  {
    id: '6',
    slug: 'teeth-whitening-myths',
    title: '8 Teeth Whitening Myths You Need to Stop Believing',
    excerpt: 'From DIY hacks to whitening toothpastes, there\'s a lot of misinformation about teeth whitening. We debunk the most common myths.',
    content: `Social media is full of teeth whitening "hacks" — from activated charcoal to lemon juice. Most of them range from ineffective to actively harmful.

**Myth 1: Activated Charcoal Whitens Teeth**
Fact: It\'s too abrasive and strips enamel over time, making teeth DARKER.

**Myth 2: Whitening Toothpaste Works Like Professional Whitening**
Fact: These toothpastes only remove surface stains, not intrinsic discoloration.

**Myth 3: Baking Soda Is Safe to Use Daily**
Fact: Daily use erodes enamel due to abrasiveness.

**Myth 4: Whitening Damages Teeth**
Fact: Professional whitening with proper concentration gels is completely safe.

**Myth 5: Results Are Permanent**
Fact: Results last 1-3 years. Maintenance is needed.

**Myth 6: All Whitening Treatments Are the Same**
Fact: Laser whitening works significantly faster and better than strips or trays.

**Myth 7: Oil Pulling Whitens Teeth**
Fact: There\'s no scientific evidence for this claim.

**Myth 8: Whitening Works on Crowns and Veneers**
Fact: These restorations don\'t respond to bleaching agents.

**The Bottom Line**
Only professional, dentist-supervised whitening is safe AND effective. Book a consultation at SmileCraft to learn which option is best for you.`,
    author: 'Dr. Priya Verma',
    authorRole: 'Cosmetic Dentist',
    date: 'February 18, 2024',
    readTime: '5 min read',
    category: 'Cosmetic',
    tags: ['teeth whitening', 'myths', 'cosmetic dentistry', 'oral care'],
    image: '/images/blog/whitening-myths.jpg',
  },
];

export const blogCategories = ['All', 'Dental Health', 'Cosmetic', 'Implants', 'Orthodontics', 'Gum Health', 'Kids Dental'];
