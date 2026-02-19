// Collections data for Kaayu Rituals
import collectionInnerWellness from '@/assets/collection-inner-wellness.jpg';
import collectionRootRise from '@/assets/collection-root-rise.jpg';
import collectionSacredSkin from '@/assets/collection-sacred-skin.jpg';
import collectionHerbalTeas from '@/assets/collection-herbal-teas.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  rating: number;
  reviews: number;
  badge?: 'bestseller' | 'new';
  concern?: string;
  image: string;
  collection: string;
  description?: string;
  sizes?: string[];
  ingredients?: { name: string; sanskrit?: string; benefit: string }[];
  howToUse?: string[];
}

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroImage: string;
  ingredients: string[];
  steps: string[];
  faqs: { question: string; answer: string }[];
  products: Product[];
}

export const collections: Record<string, Collection> = {
  'inner-wellness': {
    slug: 'inner-wellness',
    name: 'Inner Wellness',
    tagline: 'Balance, Vitality & Inner Strength',
    description: 'Our Inner Wellness collection harnesses the power of time-tested Ayurvedic herbs to support your body\'s natural balance. Each formula is crafted with precision to promote vitality, reduce stress, and strengthen your inner foundation.',
    heroImage: collectionInnerWellness,
    ingredients: ['Ashwagandha', 'Shatavari', 'Brahmi', 'Triphala'],
    steps: [
      'Take 1–2 capsules daily with warm water',
      'Maintain consistency for 30–90 days',
      'Pair with a balanced diet for best results'
    ],
    faqs: [
      { question: 'Are these products AYUSH certified?', answer: 'Yes, all our Inner Wellness products are AYUSH certified, GMP manufactured, and ISO compliant. Every batch undergoes rigorous quality testing.' },
      { question: 'How long before I see results?', answer: 'Most customers notice improvements within 30–45 days of consistent use. For optimal results, we recommend a 90-day ritual cycle.' },
      { question: 'Can I take these daily?', answer: 'Absolutely. Our formulations are designed for daily use. However, we always recommend consulting your healthcare provider if you have specific health conditions.' }
    ],
    products: [
      { id: 'iw-1', name: 'Ashwagandha Rasayana Capsules', price: 899, priceFormatted: '₹899', rating: 4.8, reviews: 124, badge: 'bestseller', concern: 'Stress & Vitality', image: collectionInnerWellness, collection: 'inner-wellness', sizes: ['30 caps', '60 caps', '90 caps'], ingredients: [{ name: 'Ashwagandha', sanskrit: 'Withania Somnifera', benefit: 'Reduces cortisol, boosts energy' }], howToUse: ['Take 1-2 capsules daily', 'Best with warm water after meals', 'Continue for 30-90 days'] },
      { id: 'iw-2', name: 'Brahmi Mind Clarity', price: 799, priceFormatted: '₹799', rating: 4.6, reviews: 89, badge: 'new', concern: 'Focus & Memory', image: collectionInnerWellness, collection: 'inner-wellness' },
      { id: 'iw-3', name: 'Shatavari Women Wellness', price: 950, priceFormatted: '₹950', rating: 4.9, reviews: 156, badge: 'bestseller', concern: 'Hormonal Balance', image: collectionInnerWellness, collection: 'inner-wellness' },
      { id: 'iw-4', name: 'Triphala Gut Cleanse', price: 699, priceFormatted: '₹699', rating: 4.5, reviews: 78, concern: 'Digestion', image: collectionInnerWellness, collection: 'inner-wellness' }
    ]
  },
  'root-rise': {
    slug: 'root-rise',
    name: 'Root & Rise Hair',
    tagline: 'Strengthen, Nourish & Revive',
    description: 'Rooted in centuries-old Ayurvedic hair care wisdom, our Root & Rise collection combines potent botanicals to strengthen hair from root to tip. Experience the transformative power of nature\'s finest ingredients.',
    heroImage: collectionRootRise,
    ingredients: ['Bhringraj', 'Amla', 'Brahmi', 'Castor Oil'],
    steps: [
      'Apply oil generously to scalp and hair',
      'Massage gently for 10 minutes in circular motions',
      'Leave for at least 2 hours or overnight for best results'
    ],
    faqs: [
      { question: 'How often should I oil my hair?', answer: 'We recommend oiling 2–3 times per week for optimal results. Consistency is key to seeing visible improvements in hair strength and growth.' },
      { question: 'Is it safe for colour-treated hair?', answer: 'Yes, our formulations are gentle and free from harsh chemicals. They work beautifully with colour-treated hair without causing any stripping or fading.' },
      { question: 'When will I see results?', answer: 'Most customers notice reduced hair fall within 3–4 weeks. Visible growth and improved texture typically appear after 6–8 weeks of regular use.' }
    ],
    products: [
      { id: 'rr-1', name: 'Dravarasa Hair Growth Oil', price: 750, priceFormatted: '₹750', rating: 4.9, reviews: 203, badge: 'bestseller', concern: 'Hair Growth', image: collectionRootRise, collection: 'root-rise', sizes: ['50ml', '100ml', '200ml'], ingredients: [{ name: 'Bhringraj', sanskrit: 'Eclipta Alba', benefit: 'Strengthens roots, promotes growth' }], howToUse: ['Apply to scalp', 'Massage 10 minutes', 'Leave 2+ hours'] },
      { id: 'rr-2', name: 'Snehrasa Hair Serum', price: 650, priceFormatted: '₹650', rating: 4.7, reviews: 134, badge: 'new', concern: 'Shine & Repair', image: collectionRootRise, collection: 'root-rise' },
      { id: 'rr-3', name: 'Bhringraj Scalp Oil', price: 599, priceFormatted: '₹599', rating: 4.6, reviews: 98, concern: 'Scalp Health', image: collectionRootRise, collection: 'root-rise' }
    ]
  },
  'sacred-skin': {
    slug: 'sacred-skin',
    name: 'Sacred Skin (Vaarnikaa)',
    tagline: 'Glow, Clarity & Radiance',
    description: 'Inspired by ancient royal beauty rituals, our Sacred Skin collection features the legendary Kumkumadi blend and other precious botanicals to reveal your skin\'s natural radiance.',
    heroImage: collectionSacredSkin,
    ingredients: ['Kumkumadi', 'Turmeric', 'Saffron', 'Rose'],
    steps: [
      'Cleanse face thoroughly with lukewarm water',
      'Apply 2–3 drops on damp skin, massage upward',
      'Use consistently AM & PM for best results'
    ],
    faqs: [
      { question: 'Is it suitable for sensitive skin?', answer: 'Yes, our formulations are dermatologically tested and free from harsh chemicals. We recommend a patch test for extremely sensitive skin types.' },
      { question: 'Will it cause breakouts?', answer: 'Our oils are non-comedogenic and carefully formulated to not clog pores. Many customers with oily skin report improved clarity after consistent use.' },
      { question: 'How soon will I see a glow?', answer: 'Many customers notice an immediate natural glow after the first use. For lasting results like even skin tone and reduced dark spots, allow 4–6 weeks.' }
    ],
    products: [
      { id: 'ss-1', name: 'Kumkumadi Brightening Face Oil', price: 1299, priceFormatted: '₹1,299', rating: 4.9, reviews: 245, badge: 'bestseller', concern: 'Brightening', image: collectionSacredSkin, collection: 'sacred-skin', sizes: ['15ml', '30ml', '50ml'], ingredients: [{ name: 'Kumkumadi', sanskrit: 'Crocus Sativus Blend', benefit: 'Brightens, evens tone' }], howToUse: ['Cleanse face', 'Apply 2-3 drops on damp skin', 'Massage upward, use AM & PM'] },
      { id: 'ss-2', name: 'Turmeric Glow Serum', price: 999, priceFormatted: '₹999', rating: 4.7, reviews: 167, badge: 'new', concern: 'Anti-Aging', image: collectionSacredSkin, collection: 'sacred-skin' },
      { id: 'ss-3', name: 'Saffron Night Cream', price: 1450, priceFormatted: '₹1,450', rating: 4.8, reviews: 189, concern: 'Night Repair', image: collectionSacredSkin, collection: 'sacred-skin' }
    ]
  },
  'herbal-teas': {
    slug: 'herbal-teas',
    name: 'Herbal Teas',
    tagline: 'Sip. Restore. Thrive.',
    description: 'Our Herbal Tea collection brings the healing wisdom of Ayurveda to your daily cup. Each blend is carefully crafted with premium botanicals to support immunity, digestion, calm, and restful sleep.',
    heroImage: collectionHerbalTeas,
    ingredients: ['Tulsi', 'Ginger', 'Ashwagandha', 'Chamomile'],
    steps: [
      'Boil 200ml of fresh water',
      'Steep tea bag or loose leaves for 4–5 minutes',
      'Sip warm — add honey if desired'
    ],
    faqs: [
      { question: 'Are these teas caffeine-free?', answer: 'Yes, all our herbal teas are 100% caffeine-free. They are made from pure Ayurvedic herbs and botanicals.' },
      { question: 'Can I drink them daily?', answer: 'Absolutely! Our teas are designed for daily consumption. Most customers enjoy 2–3 cups throughout the day for optimal benefits.' },
      { question: 'Are they safe during pregnancy?', answer: 'While our teas are made from natural ingredients, we recommend consulting your healthcare provider before use during pregnancy or nursing.' }
    ],
    products: [
      { id: 'ht-1', name: 'Tulsi Immunity Blend', price: 399, priceFormatted: '₹399', rating: 4.8, reviews: 312, badge: 'bestseller', concern: 'Immunity', image: collectionHerbalTeas, collection: 'herbal-teas', sizes: ['25 bags', '50 bags'], ingredients: [{ name: 'Tulsi', sanskrit: 'Ocimum Sanctum', benefit: 'Boosts immunity, reduces stress' }], howToUse: ['Boil 200ml water', 'Steep 4-5 min', 'Sip warm'] },
      { id: 'ht-2', name: 'Ginger Digestive Brew', price: 349, priceFormatted: '₹349', rating: 4.6, reviews: 187, concern: 'Digestion', image: collectionHerbalTeas, collection: 'herbal-teas' },
      { id: 'ht-3', name: 'Ashwagandha Calm Tea', price: 449, priceFormatted: '₹449', rating: 4.7, reviews: 156, badge: 'new', concern: 'Stress Relief', image: collectionHerbalTeas, collection: 'herbal-teas' },
      { id: 'ht-4', name: 'Chamomile Sleep Ritual', price: 399, priceFormatted: '₹399', rating: 4.9, reviews: 234, concern: 'Sleep', image: collectionHerbalTeas, collection: 'herbal-teas' }
    ]
  }
};

export const allProducts: Product[] = Object.values(collections).flatMap(c => c.products);

export const getProduct = (id: string): Product | undefined => allProducts.find(p => p.id === id);
export const getCollection = (slug: string): Collection | undefined => collections[slug];
