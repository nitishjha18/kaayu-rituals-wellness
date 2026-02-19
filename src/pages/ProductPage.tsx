import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getProduct, allProducts, collections } from '@/data/collections';
import { useCart } from '@/context/CartContext';
import { useKaayuToast } from '@/context/ToastContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ProductCard from '@/components/ProductCard';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProduct(id) : undefined;
  const { addItem } = useCart();
  const { showToast } = useKaayuToast();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [stickyVisible, setStickyVisible] = useState(false);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const s4Ref = useScrollAnimation();

  useEffect(() => {
    if (!ctaRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <Navigate to="/" replace />;

  const collection = product.collection ? collections[product.collection] : undefined;
  const sizes = product.sizes || ['Standard'];
  const relatedProducts = allProducts.filter(p => p.collection === product.collection && p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, priceFormatted: product.priceFormatted, image: product.image, size: sizes[selectedSize] });
    }
    showToast('Added to Cart ✓');
  };

  const tabs = ['Description', 'Key Ingredients', 'How to Use', 'Reviews'];

  return (
    <main>
      {/* BREADCRUMB */}
      <div className="kaayu-container py-4">
        <div className="font-body text-[13px] text-kaayu-meadow flex gap-2">
          <Link to="/" className="hover:text-kaayu-accent transition-colors">Home</Link>
          <span className="text-kaayu-accent">/</span>
          {collection && (
            <>
              <Link to={`/collection/${product.collection}`} className="hover:text-kaayu-accent transition-colors">{collection.name}</Link>
              <span className="text-kaayu-accent">/</span>
            </>
          )}
          <span className="text-kaayu-text">{product.name}</span>
        </div>
      </div>

      {/* PRODUCT HERO */}
      <section className="kaayu-container pb-16">
        <div className="flex gap-16">
          {/* LEFT - Images */}
          <div className="w-1/2">
            <div className="h-[520px] rounded overflow-hidden bg-kaayu-bg">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* RIGHT - Details */}
          <div className="w-1/2">
            <div className="flex gap-2 mb-3">
              {['AYUSH', 'GMP', 'ISO'].map(c => (
                <span key={c} className="text-kaayu-primary text-[10px] border border-kaayu-primary rounded px-2 py-0.5 font-body font-semibold">{c}</span>
              ))}
            </div>
            {collection && (
              <Link to={`/collection/${product.collection}`} className="text-kaayu-accent font-body text-sm mb-2 inline-block hover:text-kaayu-olive transition-colors">
                {collection.name} →
              </Link>
            )}
            <h1 className="font-heading text-[42px] font-bold text-kaayu-text mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24"
                    fill={i <= Math.floor(product.rating) ? 'currentColor' : 'none'}
                    stroke="currentColor" strokeWidth="2" className="star-filled">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="font-body text-sm text-kaayu-meadow">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <p className="font-body text-[32px] font-bold text-kaayu-primary mb-4">{product.priceFormatted}</p>
            <div className="w-full h-[1px] bg-kaayu-accent/30 mb-6" />

            {/* Size */}
            <div className="mb-6">
              <span className="font-body text-sm font-semibold text-kaayu-text mb-3 block">Size</span>
              <div className="flex gap-3">
                {sizes.map((size, i) => (
                  <button key={size} onClick={() => setSelectedSize(i)}
                    className={`px-5 py-2.5 rounded font-body text-sm transition-colors ${i === selectedSize
                      ? 'bg-kaayu-primary text-white'
                      : 'border border-kaayu-primary text-kaayu-primary hover:bg-kaayu-primary/5'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="mb-6">
              <span className="font-body text-sm font-semibold text-kaayu-text mb-3 block">Quantity</span>
              <div className="flex items-center border border-kaayu-primary rounded inline-flex h-11">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-full flex items-center justify-center text-kaayu-primary hover:bg-kaayu-primary/5 transition-colors">−</button>
                <span className="w-11 h-full flex items-center justify-center font-body font-semibold text-kaayu-text border-x border-kaayu-primary">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-11 h-full flex items-center justify-center text-kaayu-primary hover:bg-kaayu-primary/5 transition-colors">+</button>
              </div>
            </div>

            <button ref={ctaRef} onClick={handleAdd}
              className="btn-kaayu-primary w-full h-14 text-base mb-3">
              🛒 Add to Cart
            </button>
            <button className="btn-kaayu-secondary w-full mb-6">Add to Wishlist ♡</button>

            <div className="flex gap-6 font-body text-sm text-kaayu-meadow">
              <span>🔒 Secure Payment</span>
              <span>🚚 Free Ship ₹999+</span>
              <span>↩ Easy Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="kaayu-container pb-16">
        <div className="flex border-b border-kaayu-accent/30 mb-10">
          {tabs.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)}
              className={`font-body text-base py-4 px-6 transition-colors ${i === activeTab
                ? 'text-kaayu-primary font-semibold border-b-2 border-kaayu-accent'
                : 'text-kaayu-meadow hover:text-kaayu-text'}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 0 && (
          <div className="max-w-[900px]">
            <p className="font-body text-base text-kaayu-text/80 leading-relaxed mb-4">
              {product.name} is crafted with the finest Ayurvedic ingredients, following traditional formulations validated by modern science. Each batch is tested for purity, potency, and safety.
            </p>
            <p className="font-body text-base text-kaayu-text/80 leading-relaxed mb-4">
              This product is part of our {collection?.name} collection — designed to bring meaningful wellness into your daily ritual. AYUSH certified, GMP manufactured, and ISO compliant.
            </p>
            {product.concern && (
              <div className="mt-6 bg-kaayu-bg p-6 rounded">
                <h4 className="font-heading text-lg text-kaayu-text mb-2">Primary Concern</h4>
                <p className="font-body text-base text-kaayu-meadow">{product.concern}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 1 && (
          <div className="bg-kaayu-bg p-8 rounded">
            <div className="grid grid-cols-3 gap-6">
              {(product.ingredients || collection?.ingredients.map(name => ({ name, benefit: 'Traditional Ayurvedic botanical' })) || []).map((ing, i) => {
                const ingredient = typeof ing === 'string' ? { name: ing, benefit: 'Traditional botanical' } : ing;
                return (
                  <div key={i} className="bg-white p-6 rounded shadow-sm text-center">
                    <div className="w-[100px] h-[100px] rounded-full bg-kaayu-bg mx-auto mb-4 overflow-hidden">
                      <img src={product.image} alt={ingredient.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-heading text-lg text-kaayu-text">{ingredient.name}</h4>
                    {'sanskrit' in ingredient && (ingredient as { sanskrit?: string }).sanskrit && (
                      <span className="text-kaayu-accent text-sm italic block mt-1">{(ingredient as { sanskrit?: string }).sanskrit}</span>
                    )}
                    <p className="font-body text-sm text-kaayu-meadow mt-2">{ingredient.benefit}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="bg-kaayu-bg p-8 rounded max-w-[700px]">
            {(product.howToUse || collection?.steps || []).map((step, i) => (
              <div key={i} className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-kaayu-accent text-white font-heading flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <p className="font-body text-base text-kaayu-text pt-2">{step}</p>
              </div>
            ))}
            <div className="mt-6 bg-kaayu-primary p-5 rounded border-l-4 border-kaayu-accent">
              <p className="font-body text-sm text-white">💡 <strong>Ritual Tip:</strong> Use consistently for 30–90 days for best results.</p>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div className="bg-white">
            <div className="text-center mb-10">
              <span className="font-heading text-[72px] font-bold text-kaayu-accent">{product.rating}</span>
              <p className="font-body text-sm text-kaayu-meadow mt-2">Based on {product.reviews} reviews</p>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                { name: 'Verified Buyer', text: 'Amazing product! Noticed results within 2 weeks. Highly recommend to anyone looking for natural wellness.' },
                { name: 'Happy Customer', text: 'The quality is exceptional. You can tell this is made with care. Will definitely repurchase.' },
                { name: 'Wellness Lover', text: 'Finally found a brand that delivers on its promises. The ritual approach makes the experience so much better.' },
              ].map((review, i) => (
                <div key={i} className="bg-kaayu-bg p-6 rounded">
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map(s => (
                      <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="star-filled">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-body text-sm text-kaayu-text/80 mb-3">{review.text}</p>
                  <span className="font-body text-xs text-kaayu-accent">{review.name}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button className="btn-kaayu-secondary">Write a Review</button>
            </div>
          </div>
        )}
      </section>

      {/* COMPLETE THE RITUAL */}
      <section ref={s4Ref} className="kaayu-section bg-white">
        <div className="kaayu-container">
          <h2 className="kaayu-h2 text-center text-kaayu-text mb-12 fade-up">Complete the Ritual</h2>
          <div className="flex gap-8 justify-center">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL BAND */}
      <section className="bg-kaayu-primary h-[200px] flex items-center">
        <div className="kaayu-container text-center">
          <h3 className="font-heading text-4xl text-white mb-3">Discover All Collections</h3>
          <Link to="/collection/inner-wellness" className="font-body text-base text-kaayu-accent hover:text-white transition-colors">
            Explore All Collections →
          </Link>
        </div>
      </section>

      {/* STICKY ADD TO CART */}
      {stickyVisible && (
        <div className="fixed bottom-0 left-0 right-0 bg-kaayu-primary z-[1500] shadow-2xl py-4"
          style={{ animation: 'slideUp 0.3s ease' }}>
          <div className="kaayu-container flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={product.image} alt="" className="w-12 h-12 rounded object-cover" />
              <div>
                <h4 className="font-body text-sm font-semibold text-white">{product.name}</h4>
                <span className="font-body text-lg font-bold text-kaayu-accent">{product.priceFormatted}</span>
              </div>
            </div>
            <button onClick={handleAdd} className="btn-kaayu-gold">🛒 Add to Cart</button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </main>
  );
};

export default ProductPage;
