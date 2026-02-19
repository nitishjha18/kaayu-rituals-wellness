import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import { allProducts, collections } from '@/data/collections';
import ProductCard from '@/components/ProductCard';
import { useKaayuToast } from '@/context/ToastContext';

import heroGlow from '@/assets/hero-glow.jpg';
import heroHair from '@/assets/hero-hair.jpg';
import heroWellness from '@/assets/hero-wellness.jpg';
import brandStory from '@/assets/brand-story.jpg';
import editorialCta from '@/assets/editorial-cta.jpg';
import founderImg from '@/assets/founder.jpg';
import ingredientKumkumadi from '@/assets/ingredient-kumkumadi.jpg';
import ingredientAshwagandha from '@/assets/ingredient-ashwagandha.jpg';
import ingredientBhringraj from '@/assets/ingredient-bhringraj.jpg';
import collectionInnerWellness from '@/assets/collection-inner-wellness.jpg';
import collectionRootRise from '@/assets/collection-root-rise.jpg';
import collectionSacredSkin from '@/assets/collection-sacred-skin.jpg';
import collectionHerbalTeas from '@/assets/collection-herbal-teas.jpg';

const heroSlides = [
  { image: heroGlow, eyebrow: 'SACRED SKIN COLLECTION', title: 'Glow & Radiance', sub: 'Kumkumadi · Turmeric · Saffron · Rose', link: '/collection/sacred-skin' },
  { image: heroHair, eyebrow: 'ROOT & RISE COLLECTION', title: 'Root & Rise Hair', sub: 'Bhringraj · Amla · Brahmi · Castor Oil', link: '/collection/root-rise' },
  { image: heroWellness, eyebrow: 'INNER WELLNESS COLLECTION', title: 'Inner Wellness', sub: 'Ashwagandha · Shatavari · Brahmi · Triphala', link: '/collection/inner-wellness' },
];

const collectionTiles = [
  { name: 'Inner Wellness', tagline: 'Balance, Vitality & Inner Strength', image: collectionInnerWellness, slug: 'inner-wellness' },
  { name: 'Root & Rise Hair', tagline: 'Strengthen, Nourish & Revive', image: collectionRootRise, slug: 'root-rise' },
  { name: 'Sacred Skin', tagline: 'Glow, Clarity & Radiance', image: collectionSacredSkin, slug: 'sacred-skin' },
  { name: 'Herbal Teas', tagline: 'Sip. Restore. Thrive.', image: collectionHerbalTeas, slug: 'herbal-teas' },
];

const ingredients = [
  { name: 'Kumkumadi', origin: 'Rajasthan', benefit: 'Brightens, evens tone', image: ingredientKumkumadi },
  { name: 'Ashwagandha', origin: 'Madhya Pradesh', benefit: 'Reduces stress', image: ingredientAshwagandha },
  { name: 'Bhringraj', origin: 'Kerala', benefit: 'Strengthens roots', image: ingredientBhringraj },
];

const testimonials = [
  { title: 'Life Changing Hair Serum', body: 'After just 3 weeks of using the Snehrasa Hair Serum, my hair feels stronger and looks visibly healthier. The texture improvement is incredible.', name: 'Priya S.', product: 'Root & Rise Hair', rating: 5 },
  { title: 'Finally Glowing Skin', body: 'The Kumkumadi Face Oil gave me the glow I\'ve been chasing for years. My skin looks radiant and the dark spots have significantly faded.', name: 'Ananya R.', product: 'Sacred Skin', rating: 5 },
  { title: 'Stress Gone, Energy Back', body: 'Ashwagandha capsules have been a game-changer for my daily energy. I feel calmer, more focused, and genuinely well-rested.', name: 'Rahul M.', product: 'Inner Wellness', rating: 5 },
  { title: 'Addicted to the Herbal Teas', body: 'The Chamomile Sleep Ritual tea is my nightly companion now. I fall asleep faster and wake up feeling refreshed. Pure magic in a cup.', name: 'Sneha P.', product: 'Herbal Teas', rating: 5 },
];

const Index = () => {
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroFade, setHeroFade] = useState(true);
  const [paused, setPaused] = useState(false);
  const scrollRowRef = useRef<HTMLDivElement>(null);
  const { showToast } = useKaayuToast();

  const s2Ref = useScrollAnimation();
  const s3Ref = useScrollAnimation();
  const s4Ref = useScrollAnimation();
  const s6Ref = useScrollAnimation();
  const s7Ref = useScrollAnimation();
  const s9Ref = useScrollAnimation();
  const s10Ref = useScrollAnimation();
  const s12Ref = useScrollAnimation();
  const s13Ref = useScrollAnimation();

  const stat1 = useCountUp(98);
  const stat2 = useCountUp(96);
  const stat3 = useCountUp(94);

  // Hero autoplay
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setHeroFade(false);
      setTimeout(() => {
        setHeroIdx(prev => (prev + 1) % heroSlides.length);
        setHeroFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  // Drag scroll for product row
  useEffect(() => {
    const el = scrollRowRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    const onDown = (e: MouseEvent) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const onUp = () => { isDown = false; };
    const onMove = (e: MouseEvent) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); };
    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseleave', onUp);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mousemove', onMove);
    return () => { el.removeEventListener('mousedown', onDown); el.removeEventListener('mouseleave', onUp); el.removeEventListener('mouseup', onUp); el.removeEventListener('mousemove', onMove); };
  }, []);

  const slide = heroSlides[heroIdx];
  const featuredProducts = allProducts.filter(p => p.badge).slice(0, 6);
  if (featuredProducts.length < 6) featuredProducts.push(...allProducts.filter(p => !p.badge).slice(0, 6 - featuredProducts.length));

  return (
    <main>
      {/* S1 HERO */}
      <section className="relative h-[580px] overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className={`absolute inset-0 transition-opacity duration-500 ${heroFade ? 'opacity-100' : 'opacity-0'}`}>
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(24,90,66,0.70) 0%, rgba(24,90,66,0.30) 60%, transparent 100%)' }} />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="kaayu-container">
            <div className={`max-w-[550px] transition-all duration-500 ${heroFade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="kaayu-eyebrow block mb-4">{slide.eyebrow}</span>
              <h1 className="font-heading text-[64px] font-bold text-white leading-[1.1] mb-4">{slide.title}</h1>
              <p className="font-body text-lg text-white/80 mb-6">{slide.sub}</p>
              <div className="flex gap-3 mb-8">
                {['AYUSH', 'GMP', 'ISO'].map(c => (
                  <span key={c} className="text-white/80 text-xs border border-white/30 rounded px-3 py-1 font-body">{c} Certified</span>
                ))}
              </div>
              <Link to={slide.link} className="btn-kaayu-primary">Shop Now</Link>
            </div>
          </div>
        </div>
        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => { setHeroFade(false); setTimeout(() => { setHeroIdx(i); setHeroFade(true); }, 300); }}
              className={`w-3 h-3 rounded-full transition-colors ${i === heroIdx ? 'bg-kaayu-accent' : 'bg-white/40'}`} />
          ))}
        </div>
      </section>

      {/* S2 TRUST STRIP */}
      <section ref={s2Ref} className="bg-kaayu-primary h-20 flex items-center">
        <div className="kaayu-container flex items-center justify-between w-full">
          {[
            { icon: '🌿', text: 'Ethically Sourced' },
            { icon: '✗', text: 'Cruelty Free' },
            { icon: 'V', text: 'Vegan' },
            { icon: '🔍', text: 'Transparent Ingredients' },
          ].map((item, i) => (
            <div key={i} className="fade-up flex items-center gap-2 text-white font-body text-[13px] font-semibold uppercase tracking-wider">
              <span>{item.icon}</span> {item.text}
              {i < 3 && <span className="ml-8 text-kaayu-accent/40">|</span>}
            </div>
          ))}
        </div>
      </section>

      {/* S3 BRAND STORY */}
      <section ref={s3Ref} className="kaayu-section">
        <div className="kaayu-container flex gap-0">
          <div className="w-1/2 fade-up">
            <img src={brandStory} alt="Brand ritual" className="w-full h-[500px] object-cover" />
          </div>
          <div className="w-1/2 bg-kaayu-bg flex items-center" style={{ padding: '80px 60px' }}>
            <div className="fade-up" data-delay="0.2">
              <span className="kaayu-eyebrow block mb-4">OUR PHILOSOPHY</span>
              <h2 className="kaayu-h2 text-kaayu-text mb-6">A Healing Ritual.<br />Not Just a Product.</h2>
              <p className="font-body text-lg text-kaayu-text/80 leading-relaxed mb-8">
                At Kaayu Rituals, we believe wellness isn't a trend — it's a tradition. Our formulations draw from centuries of Ayurvedic wisdom, combining rare botanicals with modern scientific validation to create rituals that truly transform.
              </p>
              <Link to="/about" className="btn-kaayu-secondary">Discover Kaayu</Link>
            </div>
          </div>
        </div>
      </section>

      {/* S4 CHOOSE YOUR RITUAL */}
      <section ref={s4Ref} className="kaayu-section bg-white">
        <div className="kaayu-container">
          <h2 className="kaayu-h2 text-center text-kaayu-text mb-16 fade-up">Choose Your Ritual</h2>
          <div className="grid grid-cols-4 gap-6">
            {collectionTiles.map((tile, i) => (
              <Link key={tile.slug} to={`/collection/${tile.slug}`}
                className="fade-up relative h-[320px] rounded overflow-hidden group cursor-pointer"
                data-delay={`${i * 0.1}`}>
                <img src={tile.image} alt={tile.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                <div className="absolute inset-0 bg-kaayu-primary/40 group-hover:bg-kaayu-primary/65 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-2xl text-white mb-1">{tile.name}</h3>
                  <p className="font-body text-sm text-white/70">{tile.tagline}</p>
                  <span className="text-kaayu-accent text-sm mt-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* S5 MOST-LOVED RITUALS */}
      <section className="kaayu-section bg-kaayu-bg">
        <div className="kaayu-container">
          <div className="flex items-center justify-between mb-12">
            <h2 className="kaayu-h2 text-kaayu-text">Most-Loved Rituals</h2>
            <Link to="/collection/inner-wellness" className="text-kaayu-accent font-body font-semibold hover:text-kaayu-olive transition-colors">
              View All →
            </Link>
          </div>
          <div ref={scrollRowRef} className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab pb-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* S6 INGREDIENT SPOTLIGHT */}
      <section ref={s6Ref} className="kaayu-section bg-kaayu-primary">
        <div className="kaayu-container">
          <h2 className="kaayu-h2 text-white text-center mb-16 fade-up">Ingredient Spotlight</h2>
          <div className="grid grid-cols-3 gap-12">
            {ingredients.map((ing, i) => (
              <div key={ing.name} className="fade-up text-center" data-delay={`${i * 0.15}`}>
                <div className="w-[180px] h-[180px] rounded-full overflow-hidden mx-auto border-2 border-kaayu-accent mb-6">
                  <img src={ing.image} alt={ing.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-heading text-2xl text-white mb-2">{ing.name}</h3>
                <span className="text-kaayu-accent text-[13px] font-body block mb-2">{ing.origin}</span>
                <p className="text-white/70 font-body text-base">{ing.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S7 FOUNDER */}
      <section ref={s7Ref} className="kaayu-section bg-kaayu-bg">
        <div className="kaayu-container flex gap-16 items-center">
          <div className="w-[45%] fade-up">
            <div className="border-2 border-kaayu-accent rounded overflow-hidden shadow-lg">
              <img src={founderImg} alt="Preeti Choudhary" className="w-full h-auto" />
            </div>
            <div className="mt-6 bg-white p-6 rounded shadow-sm">
              <p className="font-heading italic text-base text-kaayu-accent leading-relaxed">
                "It's not just a brand — it's a purpose. Every product carries the wisdom of generations and the precision of modern science."
              </p>
              <span className="text-kaayu-text font-body text-sm mt-3 block">— Preeti Choudhary</span>
            </div>
          </div>
          <div className="w-[55%] fade-up" data-delay="0.2">
            <span className="kaayu-eyebrow block mb-4">MEET THE FOUNDER</span>
            <h2 className="font-heading text-[42px] font-bold text-kaayu-text mb-3">Preeti Choudhary</h2>
            <p className="font-body text-base text-kaayu-meadow mb-6">Microbiologist · Healthcare & Wellness · 18+ Years Experience</p>
            <p className="font-body text-base text-kaayu-text/80 leading-relaxed mb-4">
              With over 18 years in healthcare and microbiology, Preeti founded Kaayu Rituals to bridge the gap between ancient Ayurvedic wisdom and modern wellness needs.
            </p>
            <p className="font-body text-base text-kaayu-text/80 leading-relaxed mb-4">
              Her deep understanding of botanical science, combined with a passion for holistic health, drives every formulation — ensuring each product is both authentic and effective.
            </p>
            <p className="font-body text-base text-kaayu-text/80 leading-relaxed mb-8">
              Every ingredient is sourced with intention, every formula tested rigorously, and every ritual designed to bring meaningful wellness into everyday life.
            </p>
            <Link to="/about" className="btn-kaayu-secondary">Read Our Story</Link>
          </div>
        </div>
      </section>

      {/* S8 STATS BAR */}
      <section className="bg-kaayu-primary h-[160px] flex items-center">
        <div className="kaayu-container flex items-center justify-between w-full">
          {[
            { ref: stat1, label: 'Noticed Visible Improvement' },
            { ref: stat2, label: 'Would Recommend to a Friend' },
            { ref: stat3, label: 'Repurchase Rate' },
          ].map((stat, i) => (
            <div key={i} className="flex-1 text-center flex flex-col items-center">
              <span ref={stat.ref} className="font-heading text-[72px] font-bold text-kaayu-accent leading-none">0%</span>
              <span className="font-body text-white/70 text-sm mt-2">{stat.label}</span>
              {i < 2 && <div className="hidden" />}
            </div>
          ))}
        </div>
      </section>

      {/* S9 HOW IT WORKS */}
      <section ref={s9Ref} className="kaayu-section bg-white">
        <div className="kaayu-container text-center">
          <h2 className="kaayu-h2 text-kaayu-text mb-16 fade-up">Your Ritual in 3 Steps</h2>
          <div className="grid grid-cols-3 gap-16 relative">
            {/* Dashed connector */}
            <div className="absolute top-6 left-[20%] right-[20%] border-t-2 border-dashed border-kaayu-accent/50" />
            {[
              { num: '1', title: 'Choose Your Ritual', body: 'Explore our curated collections and find the ritual that speaks to your wellness goals.' },
              { num: '2', title: 'Follow Your Formula', body: 'Each product comes with a guided ritual — simple steps designed for real, lasting results.' },
              { num: '3', title: 'Feel the Difference', body: 'Experience the transformation. Most customers notice visible improvements within 30 days.' },
            ].map((step, i) => (
              <div key={i} className="fade-up relative z-10" data-delay={`${i * 0.15}`}>
                <div className="w-12 h-12 rounded-full bg-kaayu-accent text-white font-heading text-xl flex items-center justify-center mx-auto mb-6">
                  {step.num}
                </div>
                <h3 className="font-heading text-2xl text-kaayu-text mb-3">{step.title}</h3>
                <p className="font-body text-base text-kaayu-meadow">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S10 TESTIMONIALS */}
      <section ref={s10Ref} className="kaayu-section bg-kaayu-bg">
        <div className="kaayu-container">
          <h2 className="kaayu-h2 text-kaayu-text text-center mb-16 fade-up">What Our Community Says</h2>
          <div className="grid grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="fade-up bg-white p-6 rounded shadow-[var(--shadow-card)]" data-delay={`${i * 0.1}`}>
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="star-filled">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <h4 className="font-body text-base font-semibold text-kaayu-text mb-2">{t.title}</h4>
                <p className="font-body text-[15px] text-kaayu-meadow leading-relaxed mb-4">{t.body}</p>
                <span className="font-body text-[13px] text-kaayu-accent italic">{t.name}</span>
                <span className="block mt-2 text-xs text-kaayu-primary bg-kaayu-bg px-2 py-0.5 rounded inline-block">{t.product}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S11 CERTIFICATIONS */}
      <section className="bg-white py-16">
        <div className="kaayu-container flex items-center justify-center gap-16">
          {['ISO 9001', 'GMP', 'AYUSH', 'Cruelty Free', 'FSSAI'].map(cert => (
            <div key={cert} className="text-center group cursor-default">
              <div className="w-10 h-10 mx-auto mb-2 flex items-center justify-center text-kaayu-primary/40 group-hover:text-kaayu-primary group-hover:scale-105 transition-all">
                <span className="font-body text-xs font-bold">{cert}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* S12 EDITORIAL CTA */}
      <section ref={s12Ref} className="relative h-[480px] overflow-hidden">
        <img src={editorialCta} alt="Rituals over routines" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-kaayu-primary/55 flex items-center justify-center">
          <div className="text-center max-w-[700px] fade-up">
            <h2 className="font-heading text-[56px] font-bold text-white mb-4">Rituals Over Routines</h2>
            <p className="font-body text-lg text-white/80 mb-8">
              Transform your daily habits into meaningful wellness rituals with Kaayu's authentic Ayurvedic blends.
            </p>
            <div className="flex gap-3 justify-center mb-8">
              {['🌿 Plant-Based', '✓ AYUSH Certified', '🧪 Lab Tested', '♻ Sustainable'].map(pill => (
                <span key={pill} className="text-white text-sm font-body bg-white/15 px-4 py-2 rounded-full">{pill}</span>
              ))}
            </div>
            <Link to="/collection/inner-wellness" className="btn-kaayu-gold">Shop All Rituals</Link>
          </div>
        </div>
      </section>

      {/* S13 NEWSLETTER */}
      <section ref={s13Ref} className="kaayu-section bg-kaayu-bg">
        <div className="max-w-[600px] mx-auto text-center fade-up">
          <h2 className="font-heading text-[42px] font-bold text-kaayu-text mb-4">Join the Wellness Circle</h2>
          <p className="font-body text-base text-kaayu-meadow mb-8">
            Get exclusive rituals, early access to new launches, and Ayurvedic wellness tips delivered to your inbox.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); showToast('Subscribed! 🌿'); }} className="flex gap-3">
            <input type="email" placeholder="Enter your email"
              className="flex-1 px-5 py-4 border border-kaayu-accent bg-white rounded font-body text-base text-kaayu-text placeholder:text-kaayu-meadow/60 focus:border-kaayu-primary focus:outline-none transition-colors" required />
            <button type="submit" className="btn-kaayu-primary whitespace-nowrap">Subscribe</button>
          </form>
          <p className="font-body text-sm text-kaayu-meadow mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </main>
  );
};

export default Index;
