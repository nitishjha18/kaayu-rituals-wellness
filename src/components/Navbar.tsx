import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const collections = [
  { name: 'Inner Wellness', tagline: 'Balance, Vitality & Inner Strength', slug: 'inner-wellness' },
  { name: 'Root & Rise Hair', tagline: 'Strengthen, Nourish & Revive', slug: 'root-rise' },
  { name: 'Sacred Skin (Vaarnikaa)', tagline: 'Glow, Clarity & Radiance', slug: 'sacred-skin' },
  { name: 'Herbal Teas', tagline: 'Sip. Restore. Thrive.', slug: 'herbal-teas' },
];

const Navbar = ({ onSearchOpen }: { onSearchOpen: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeout = useRef<number>();
  const location = useLocation();
  const { openCart, count } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout.current);
    dropdownTimeout.current = window.setTimeout(() => setDropdownOpen(true), 100);
  };
  const handleDropdownLeave = () => {
    clearTimeout(dropdownTimeout.current);
    dropdownTimeout.current = window.setTimeout(() => setDropdownOpen(false), 200);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-[1000] bg-kaayu-bg transition-shadow duration-300 ${scrolled ? 'shadow-[0_2px_8px_rgba(24,90,66,0.08)]' : ''}`}>
      <div className="kaayu-container flex items-center justify-between h-[72px]">
        {/* LEFT NAV */}
        <div className="flex items-center gap-8" style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 500 }}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'text-kaayu-accent font-semibold' : 'text-kaayu-text'} hover:text-kaayu-accent transition-colors`}>
            Home
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'text-kaayu-accent font-semibold' : 'text-kaayu-text'} hover:text-kaayu-accent transition-colors`}>
            Discover Kaayu
          </Link>
          <div className="relative" onMouseEnter={handleDropdownEnter} onMouseLeave={handleDropdownLeave}>
            <button className="flex items-center gap-1 text-kaayu-text hover:text-kaayu-accent transition-colors">
              Shop Rituals
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {/* Dropdown */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-kaayu-bg border-t-2 border-kaayu-accent pt-6 pb-8 px-8 transition-all duration-200 ${dropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
              style={{ boxShadow: 'var(--shadow-hover)' }}>
              <div className="grid grid-cols-4 gap-6">
                {collections.map(c => (
                  <Link key={c.slug} to={`/collection/${c.slug}`}
                    className="group text-center" onClick={() => setDropdownOpen(false)}>
                    <h4 className="font-heading text-lg text-kaayu-text group-hover:text-kaayu-accent transition-colors">{c.name}</h4>
                    <p className="text-[13px] text-kaayu-meadow mt-1">{c.tagline}</p>
                    <span className="text-kaayu-accent text-sm mt-2 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'text-kaayu-accent font-semibold' : 'text-kaayu-text'} hover:text-kaayu-accent transition-colors`}>
            Contact
          </Link>
        </div>

        {/* CENTER LOGO */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <div className="font-heading text-2xl font-bold text-kaayu-primary tracking-wider">
            KAAYU<span className="text-kaayu-accent">.</span>
          </div>
        </Link>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-5">
          <button onClick={onSearchOpen} className="text-kaayu-text hover:text-kaayu-accent transition-colors" aria-label="Search">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <button className="text-kaayu-text hover:text-kaayu-accent transition-colors" aria-label="Account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
          <button onClick={openCart} className="text-kaayu-text hover:text-kaayu-accent transition-colors relative" aria-label="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-kaayu-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
