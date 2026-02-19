import { Link } from 'react-router-dom';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import aboutHero from '@/assets/about-hero.jpg';
import founderImg from '@/assets/founder.jpg';
import collectionInnerWellness from '@/assets/collection-inner-wellness.jpg';
import collectionRootRise from '@/assets/collection-root-rise.jpg';
import collectionSacredSkin from '@/assets/collection-sacred-skin.jpg';
import collectionHerbalTeas from '@/assets/collection-herbal-teas.jpg';

const About = () => {
  const s2Ref = useScrollAnimation();
  const s3Ref = useScrollAnimation();
  const s4Ref = useScrollAnimation();
  const s5Ref = useScrollAnimation();
  const s7Ref = useScrollAnimation();

  const collectionTiles = [
    { name: 'Inner Wellness', tagline: 'Balance, Vitality & Inner Strength', image: collectionInnerWellness, slug: 'inner-wellness' },
    { name: 'Root & Rise Hair', tagline: 'Strengthen, Nourish & Revive', image: collectionRootRise, slug: 'root-rise' },
    { name: 'Sacred Skin', tagline: 'Glow, Clarity & Radiance', image: collectionSacredSkin, slug: 'sacred-skin' },
    { name: 'Herbal Teas', tagline: 'Sip. Restore. Thrive.', image: collectionHerbalTeas, slug: 'herbal-teas' },
  ];

  return (
    <main>
      {/* S1 HERO */}
      <section className="relative h-[500px] overflow-hidden">
        <img src={aboutHero} alt="About Kaayu" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(24,90,66,0.65)' }} />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <span className="kaayu-eyebrow text-kaayu-accent block mb-4">OUR STORY</span>
            <h1 className="font-heading text-[72px] font-bold text-white leading-[1.1] mb-4">
              Rooted in Tradition.<br />Guided by Science.
            </h1>
            <p className="font-body text-lg text-white/75 max-w-[600px] mx-auto">
              A modern Ayurvedic wellness brand born from 18+ years of healthcare expertise and a deep love for botanical science.
            </p>
          </div>
        </div>
      </section>

      {/* S2 FOUNDER EDITORIAL */}
      <section ref={s2Ref} className="kaayu-section bg-kaayu-bg">
        <div className="kaayu-container flex gap-20 items-start">
          <div className="w-[45%] fade-up">
            <div className="border-2 border-kaayu-accent rounded overflow-hidden shadow-lg">
              <img src={founderImg} alt="Preeti Choudhary" className="w-full" />
            </div>
            <div className="mt-6 bg-white p-6 rounded shadow-sm">
              <p className="font-heading italic text-[17px] text-kaayu-accent leading-relaxed">
                "It's not just a brand but a purpose — born from a microbiologist's passion to bring authentic Ayurvedic healing to modern lives."
              </p>
              <span className="text-kaayu-text font-body text-sm mt-3 block">— Preeti Choudhary</span>
            </div>
          </div>
          <div className="w-[55%] fade-up" data-delay="0.2">
            <span className="kaayu-eyebrow block mb-4">FOUNDER & CEO</span>
            <h2 className="font-heading text-[52px] font-bold text-kaayu-text mb-3">Preeti Choudhary</h2>
            <p className="font-body text-base text-kaayu-meadow mb-8">Healthcare & Microbiology · 18+ Years</p>
            <p className="font-body text-base text-kaayu-text/80 leading-relaxed mb-4">
              Preeti's journey into Ayurveda began in her grandmother's kitchen, where ancient remedies were an everyday reality. Armed with a degree in microbiology and nearly two decades in healthcare, she set out to validate these traditions through rigorous scientific methods.
            </p>
            <p className="font-body text-base text-kaayu-text/80 leading-relaxed mb-4">
              Every Kaayu formula undergoes extensive lab testing — blending time-tested Ayurvedic wisdom with modern bioavailability research to ensure products that genuinely work.
            </p>
            <p className="font-body text-base text-kaayu-text/80 leading-relaxed mb-8">
              Her vision is simple: make authentic Ayurvedic wellness accessible, effective, and beautiful for the modern world.
            </p>
            <div className="w-[60px] h-[2px] bg-kaayu-accent mb-8" />
            <div className="flex gap-3">
              {['Microbiologist', '18+ Years', 'Founder & CEO'].map(cred => (
                <span key={cred} className="border border-kaayu-primary text-kaayu-primary font-body text-sm px-4 py-2 rounded-full">{cred}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S3 TIMELINE */}
      <section ref={s3Ref} className="kaayu-section bg-white">
        <div className="kaayu-container text-center">
          <h2 className="kaayu-h2 text-kaayu-text mb-16 fade-up">Our Journey</h2>
          <div className="relative flex justify-between max-w-[900px] mx-auto">
            <div className="absolute top-7 left-[10%] right-[10%] border-t-2 border-dashed border-kaayu-accent/50" />
            {[
              { year: '2020', title: 'The Spark', desc: 'Preeti begins formulating Ayurvedic blends in her home lab.' },
              { year: '2021', title: 'The Formula', desc: 'First products perfected after 500+ hours of R&D testing.' },
              { year: '2022', title: 'AYUSH Certified', desc: 'Official AYUSH certification received. GMP manufacturing begins.' },
              { year: '2024', title: 'Growing Global', desc: 'Expanding to UK market. 10,000+ happy customers worldwide.' },
            ].map((node, i) => (
              <div key={i} className="fade-up relative z-10 text-center w-[180px]" data-delay={`${i * 0.15}`}>
                <div className="w-14 h-14 rounded-full bg-kaayu-accent text-white font-heading text-lg font-bold flex items-center justify-center mx-auto mb-4">
                  {node.year}
                </div>
                <h4 className="font-heading text-xl text-kaayu-text mb-2">{node.title}</h4>
                <p className="font-body text-sm text-kaayu-meadow">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S4 SCIENCE */}
      <section ref={s4Ref} className="kaayu-section bg-white">
        <div className="kaayu-container flex gap-16 items-center">
          <div className="w-1/2 fade-up">
            <span className="kaayu-eyebrow block mb-4">SCIENCE MEETS TRADITION</span>
            <h2 className="font-heading text-[44px] font-bold text-kaayu-text mb-6">Modern Testing.<br />Ancient Wisdom.</h2>
            <p className="font-body text-base text-kaayu-text/80 leading-relaxed mb-4">
              Every Kaayu product is backed by rigorous 3-stage testing — ensuring purity, potency, and consistency in every batch.
            </p>
            <p className="font-body text-base text-kaayu-text/80 leading-relaxed mb-4">
              We source only the finest botanicals from trusted farms across India, working directly with growers who share our commitment to quality.
            </p>
            <p className="font-body text-base text-kaayu-text/80 leading-relaxed mb-8">
              The result? Products you can trust — certified by AYUSH, GMP, and ISO standards.
            </p>
            <div className="space-y-4">
              {[
                { icon: '🧪', text: '500+ Hours of R&D Testing' },
                { icon: '🌿', text: '30+ Rare Botanical Ingredients' },
                { icon: '✓', text: '3-Stage Quality Assurance' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 font-body text-base text-kaayu-text">
                  <span className="text-xl">{stat.icon}</span> {stat.text}
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 fade-up grid grid-cols-2 gap-4" data-delay="0.2">
            {[aboutHero, founderImg, collectionInnerWellness, collectionSacredSkin].map((img, i) => (
              <div key={i} className="h-[220px] overflow-hidden rounded border border-kaayu-accent/30 hover:border-kaayu-accent transition-colors">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S5 COLLECTIONS */}
      <section ref={s5Ref} className="kaayu-section bg-white">
        <div className="kaayu-container">
          <h2 className="kaayu-h2 text-center text-kaayu-text mb-16 fade-up">What We Create</h2>
          <div className="grid grid-cols-4 gap-6">
            {collectionTiles.map((tile, i) => (
              <Link key={tile.slug} to={`/collection/${tile.slug}`}
                className="fade-up relative h-[300px] rounded overflow-hidden group" data-delay={`${i * 0.1}`}>
                <img src={tile.image} alt={tile.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                <div className="absolute inset-0 bg-kaayu-primary/40 group-hover:bg-kaayu-primary/65 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-heading text-xl text-white">{tile.name}</h3>
                  <p className="font-body text-xs text-white/70 mt-1">{tile.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* S6 CERTIFICATIONS */}
      <section className="kaayu-section bg-kaayu-primary">
        <div className="kaayu-container flex items-center justify-center gap-20">
          {['ISO 9001', 'GMP', 'AYUSH', 'Cruelty Free', 'FSSAI'].map(cert => (
            <div key={cert} className="text-center group cursor-default hover:scale-110 transition-transform">
              <div className="w-16 h-16 rounded-full border-2 border-kaayu-accent flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-body text-xs font-bold">{cert}</span>
              </div>
              <span className="text-kaayu-accent text-xs font-body">{cert}</span>
            </div>
          ))}
        </div>
      </section>

      {/* S7 VALUES */}
      <section ref={s7Ref} className="kaayu-section bg-kaayu-bg">
        <div className="kaayu-container grid grid-cols-4 gap-8">
          {[
            { icon: '♻', title: 'Sustainability', desc: 'Eco-conscious packaging and responsibly sourced ingredients.' },
            { icon: '🐰', title: 'Cruelty-Free', desc: 'Never tested on animals. Certified cruelty-free always.' },
            { icon: 'V', title: 'Vegan', desc: '100% plant-based formulations with no animal-derived ingredients.' },
            { icon: '🔍', title: 'Transparency', desc: 'Every ingredient listed, every process documented.' },
          ].map((val, i) => (
            <div key={i} className="fade-up text-center" data-delay={`${i * 0.1}`}>
              <div className="text-4xl mb-4 text-kaayu-primary">{val.icon}</div>
              <h4 className="font-heading text-xl text-kaayu-text mb-2">{val.title}</h4>
              <p className="font-body text-sm text-kaayu-meadow">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;
