import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useKaayuToast } from '@/context/ToastContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import contactHero from '@/assets/contact-hero.jpg';

const Contact = () => {
  const { showToast } = useKaayuToast();
  const s2Ref = useScrollAnimation();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Message sent! We\'ll respond within 24 hours 🌿');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <main>
      {/* S1 HERO */}
      <section className="relative h-[380px] overflow-hidden">
        <img src={contactHero} alt="Contact" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(24,90,66,0.60)' }} />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 className="font-heading text-[60px] font-bold text-white leading-[1.1] mb-4">
              We're Here for Your<br />Ritual Journey
            </h1>
            <p className="font-body text-lg text-white/75">Reach out — we respond within 24 hours</p>
          </div>
        </div>
      </section>

      {/* S2 CONTACT SPLIT */}
      <section ref={s2Ref} className="kaayu-section bg-kaayu-bg">
        <div className="kaayu-container flex gap-20">
          {/* LEFT */}
          <div className="w-[40%] fade-up">
            <h2 className="font-heading text-[40px] font-bold text-kaayu-text mb-8">Reach Us</h2>
            <div className="space-y-5 mb-8">
              {[
                { icon: '📍', text: 'E-37 Radha Kunj, Brij Vihar, Chander Nagar, Ghaziabad 201011' },
                { icon: '📍', text: '26 New Arya Nagar, Meerut Road, Ghaziabad UP 201301' },
                { icon: '📞', text: '+91 120-4182651' },
                { icon: '✉', text: 'hello@kaayurituals.com' },
                { icon: '🕐', text: 'Mon–Sat, 10am–6pm IST' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 font-body text-base text-kaayu-text">
                  <span className="text-kaayu-accent shrink-0 text-xl">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            <div className="w-full h-[1px] bg-kaayu-accent/30 mb-6" />
            <div className="flex gap-3 mb-8">
              {['FB', 'IG'].map(s => (
                <a key={s} href="#" className="w-10 h-10 rounded-full bg-kaayu-primary flex items-center justify-center text-white text-xs font-bold hover:bg-kaayu-accent transition-colors">
                  {s}
                </a>
              ))}
            </div>
            <Link to="/collection/inner-wellness" className="btn-kaayu-primary">Explore the Products</Link>
          </div>

          {/* RIGHT - Form */}
          <div className="w-[60%] fade-up" data-delay="0.2">
            <h2 className="font-heading text-[40px] font-bold text-kaayu-text mb-3">Got Questions?</h2>
            <p className="font-body text-base text-kaayu-meadow mb-8">
              Fill in the form below and our team will get back to you within 24 hours.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" placeholder="Full Name" required
                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-4 border border-kaayu-accent/50 bg-white rounded font-body text-base text-kaayu-text placeholder:text-kaayu-meadow/60 focus:border-kaayu-primary focus:border-2 focus:outline-none transition-colors" />
              <div className="grid grid-cols-2 gap-5">
                <input type="email" placeholder="Email Address" required
                  value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="px-5 py-4 border border-kaayu-accent/50 bg-white rounded font-body text-base text-kaayu-text placeholder:text-kaayu-meadow/60 focus:border-kaayu-primary focus:border-2 focus:outline-none transition-colors" />
                <input type="tel" placeholder="Phone Number"
                  value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="px-5 py-4 border border-kaayu-accent/50 bg-white rounded font-body text-base text-kaayu-text placeholder:text-kaayu-meadow/60 focus:border-kaayu-primary focus:border-2 focus:outline-none transition-colors" />
              </div>
              <textarea placeholder="Your Message" required rows={6}
                value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-4 border border-kaayu-accent/50 bg-white rounded font-body text-base text-kaayu-text placeholder:text-kaayu-meadow/60 focus:border-kaayu-primary focus:border-2 focus:outline-none transition-colors resize-none" />
              <button type="submit" className="btn-kaayu-primary">✈ Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* S3 TRUST STRIP */}
      <section className="bg-kaayu-primary h-[80px] flex items-center">
        <div className="kaayu-container flex items-center justify-between w-full">
          {[
            { icon: '✓', title: 'AYUSH Certified Brand' },
            { icon: '🌿', title: '100% Plant-Based' },
            { icon: '🚚', title: 'Ships Across India & UK' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-white font-body">
              <span className="text-2xl">{item.icon}</span>
              <span className="font-heading text-lg">{item.title}</span>
              {i < 2 && <span className="ml-12 text-kaayu-accent/30">|</span>}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Contact;
