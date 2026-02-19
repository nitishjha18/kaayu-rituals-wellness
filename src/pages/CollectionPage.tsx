import { useParams, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { getCollection, collections } from '@/data/collections';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useKaayuToast } from '@/context/ToastContext';
import ProductCard from '@/components/ProductCard';

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const collection = slug ? getCollection(slug) : undefined;
  const [sortBy, setSortBy] = useState('featured');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { showToast } = useKaayuToast();

  const s2Ref = useScrollAnimation();
  const s4Ref = useScrollAnimation();
  const s5Ref = useScrollAnimation();
  const s6Ref = useScrollAnimation();

  if (!collection) return <Navigate to="/" replace />;

  const sortedProducts = [...collection.products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'bestseller') return (b.badge === 'bestseller' ? 1 : 0) - (a.badge === 'bestseller' ? 1 : 0);
    return 0;
  });

  const otherCollections = Object.values(collections).filter(c => c.slug !== slug).slice(0, 3);

  return (
    <main>
      {/* S1 HERO */}
      <section className="relative h-[420px] overflow-hidden">
        <img src={collection.heroImage} alt={collection.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(24,90,66,0.85) 0%, rgba(24,90,66,0.50) 50%, transparent 100%)' }} />
        <div className="absolute inset-0 flex items-center">
          <div className="kaayu-container">
            <div className="max-w-[550px]">
              <h1 className="font-heading text-[64px] font-bold text-white leading-[1.1] mb-3">{collection.name}</h1>
              <p className="font-body text-lg text-white/80 mb-4">{collection.tagline}</p>
              <div className="flex gap-3 mb-4">
                {['AYUSH', 'GMP', 'ISO'].map(c => (
                  <span key={c} className="text-white/70 text-xs border border-white/30 rounded px-2 py-1 font-body">{c}</span>
                ))}
              </div>
              <p className="font-body italic text-base text-kaayu-accent">Rituals for the Modern Soul</p>
            </div>
          </div>
        </div>
      </section>

      {/* S2 INTRO */}
      <section ref={s2Ref} className="bg-kaayu-bg py-10">
        <div className="max-w-[800px] mx-auto text-center px-8 fade-up">
          <h2 className="kaayu-h2 text-kaayu-text mb-4">{collection.name}</h2>
          <p className="font-body text-lg text-kaayu-meadow mb-6">{collection.description}</p>
          <div className="flex gap-3 justify-center">
            {collection.ingredients.map(ing => (
              <span key={ing} className="border border-kaayu-primary text-kaayu-primary font-body text-sm px-4 py-2 rounded-full">{ing}</span>
            ))}
          </div>
        </div>
      </section>

      {/* S3 PRODUCT GRID */}
      <section className="kaayu-section bg-white">
        <div className="kaayu-container">
          <div className="flex items-center justify-between mb-10">
            <button onClick={() => showToast('Filters coming soon 🌿')}
              className="btn-kaayu-secondary text-sm py-2 px-5">Filters</button>
            <span className="font-body text-sm text-kaayu-meadow">{collection.products.length} products</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="border border-kaayu-primary rounded px-4 py-2 font-body text-sm text-kaayu-text bg-white focus:outline-none">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="bestseller">Bestsellers</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {sortedProducts.map(product => (
              <div key={product.id} className="flex justify-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S4 RITUAL GUIDE */}
      <section ref={s4Ref} className="bg-kaayu-primary py-16">
        <div className="kaayu-container">
          <div className="flex items-center justify-center gap-8 relative">
            <div className="absolute top-6 left-[15%] right-[15%] border-t-2 border-dashed border-kaayu-accent/50" />
            {collection.steps.map((step, i) => (
              <div key={i} className="fade-up relative z-10 text-center max-w-[280px]" data-delay={`${i * 0.15}`}>
                <div className="w-12 h-12 rounded-full bg-kaayu-accent text-white font-heading text-xl flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <p className="font-body text-base text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S5 FAQ */}
      <section ref={s5Ref} className="kaayu-section bg-kaayu-bg">
        <div className="max-w-[800px] mx-auto px-8">
          <h2 className="kaayu-h2 text-kaayu-text text-center mb-12 fade-up">Frequently Asked</h2>
          {collection.faqs.map((faq, i) => (
            <div key={i} className="fade-up border-b border-kaayu-accent/30" data-delay={`${i * 0.1}`}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left">
                <span className="font-heading text-lg text-kaayu-text">{faq.question}</span>
                <span className={`w-8 h-8 rounded-full border border-kaayu-primary flex items-center justify-center text-kaayu-primary transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                <p className="font-body text-base text-kaayu-meadow">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* S6 RELATED */}
      <section ref={s6Ref} className="kaayu-section bg-white">
        <div className="kaayu-container">
          <h2 className="kaayu-h2 text-center text-kaayu-text mb-12 fade-up">Explore Other Rituals</h2>
          <div className="grid grid-cols-3 gap-6">
            {otherCollections.map((c, i) => (
              <Link key={c.slug} to={`/collection/${c.slug}`}
                className="fade-up relative h-[280px] rounded overflow-hidden group" data-delay={`${i * 0.1}`}>
                <img src={c.heroImage} alt={c.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                <div className="absolute inset-0 bg-kaayu-primary/40 group-hover:bg-kaayu-primary/65 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-heading text-xl text-white">{c.name}</h3>
                  <p className="font-body text-xs text-white/70 mt-1">{c.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CollectionPage;
